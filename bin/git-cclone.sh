#!/usr/bin/env bash
#/
#/ Usage: git cclone <repo-url> <cache-dir> <working-copy-dir> <ref> [<merge-ref>]
#/
#/ Clone a repository and leverage a local cache. Git submodules and
#/ Git LFS files are cached as well.
#/
#/ <ref> is checked out in the <working-copy-dir>. If a <merge-ref> is defined,
#/ then it is merged into the <ref> in the <working-copy-dir> after checkout.
#/
#/ <ref> and <merge-ref> are generally interpreted as branch heads unless they
#/ are prefixed with "tags/" or "pulls". Refs prefixed with "tags/" are used to
#/ checkout a tag (e.g. "tags/v1.0"). Refs prefixed with "pull/" are used to
#/ checkout a GitHub pull request head (e.g. "pull/3/head") or merge (e.g.
#/ "pull/3/merge") commit.
#/
#/ Attention the <working-copy-dir> is always purged!
#/
#/ Known issues:
#/  - only one level of Submodules are processed
#/  - "include.path" global/system Git configs do not work in the working copy
#/
#/ Examples:
#/
#/   Clone and checkout the master branch:
#/   $ git cclone http://myrepo.git cache repo master
#/
#/   Clone and checkout a feature branch and merge in the master branch:
#/   $ git cclone http://myrepo.git cache repo feat master
#/
#/   Clone and checkout a tag:
#/   $ git cclone <repo-url> <cache-dir> <working-copy-dir> tags/<tag-name>
#/
#/   Clone and checkout a PR head:
#/   $ git cclone <repo-url> <cache-dir> <working-copy-dir> pull/<pr-id>/head
#/
#/   Clone and checkout a PR merge:
#/   $ git cclone <repo-url> <cache-dir> <working-copy-dir> pull/<pr-id>/merge
#/

CCLONE_VERSION='v0.0.5'

# Abort the script if a single command fails.
set -e

if [ "$#" -lt 4 ]; then
    grep '^#/' < "$0" | cut -c 4-
    exit 2
fi

# Check if $DEBUG variable is defined (e.g. with "export DEBUG=1")
# If it is defined, then print all commands executed by this script
# and all internal commands executed by Git.
if [[ -n "$DEBUG" ]]; then
    set -x
    export GIT_TRACE=1
    QUIET_FLAG=''
else
    QUIET_FLAG='--quiet'
fi

function realpath_wrapper() {
    if command -v realpath >/dev/null; then
        realpath "$1"
    else
        # realpath is not available, use this workaround (e.g on macOS)
        [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
    fi
}

# Helper functions to print output
function log {
    echo ''
    echo ">>> $1"
}

function err {
    echo "ERROR: $1"
}

# Helper function that retries a command if it failed.
# This is useful for Git commands that perform network requests as
# network requests can always fail.
function git_retry {
    local retries=7   # longest continuous wait should be 64s (2**6)
    local count=1     # first try after 4s, if needed
    local ret=1       # make command overwrite this
    while [ $count -lt $retries ]; do
        set +e
        git "$@"
        ret=$?
        set -e
        if [ $ret -eq 0 ]; then
            break
        fi
        count=$((count+1))
        local delay=$((2**count))
        sleep $delay
    done
    if [ $ret -gt 0 ]; then
        err "git failed with exit code '$ret'"
        exit $ret
    fi
}

GIT_REMOTE=$1
GIT_CACHE=$(realpath_wrapper "$2")
WORKING_COPY=$(realpath_wrapper "$3")
MAIN_REF=$4
MERGE_REF=$5

SHARED_CONFIG="$GIT_CACHE/shared-config"
MAIN_REF_SHA1=""
SECONDS=0

if [[ -n "$MAIN_REF" && $MAIN_REF != pull/* && $MAIN_REF != tags/* ]]; then
    MAIN_REF="heads/$MAIN_REF"
fi

if [[ -n "$MERGE_REF" && $MERGE_REF != pull/* && $MERGE_REF != tags/* ]]; then
    MERGE_REF="heads/$MERGE_REF"
fi

log "Cached Clone $CCLONE_VERSION"
echo "Start date:   $(date)"
echo "Cache:        $GIT_CACHE"
echo "Working Copy: $WORKING_COPY"
git --version
git lfs version

mkdir -p "$GIT_CACHE"
pushd "$GIT_CACHE" >/dev/null

    # Create cache if it does not exist yet
    if [ -z "$(ls -A . 2>/dev/null)" ]; then
        log 'Initializing Cache'

        git init $QUIET_FLAG --bare .

        # We create the shared-config only on cache creation to avoid problems
        # if multiple parallel cclone run share the same cache.
        cat <<EOM >"$SHARED_CONFIG"
            [core]
                # Enable file system cache on Windows (no effect on OS X/Linux)
                # c.f. https://groups.google.com/forum/#!topic/git-for-windows/9WrSosaa4A8
                fscache = true

                # Enable long path support for Windows (no effect on OS X/Linux)
                # Git uses the proper API to create long paths on Windows.
                # However, many Windows applications use an outdated API that
                # only support paths up to a length of 260 characters. As a
                # result these applications would not be able to work with the
                # longer paths properly. Keep that in mind if you run into path
                # trouble!
                # c.f. https://msdn.microsoft.com/en-us/library/aa365247(VS.85).aspx
                longpaths = true

            [gc]
                # Disable automatic garbage collection as this could take time.
                auto = 0

            [lfs]
                batch = true
                concurrentTransfers = 10
                storage = $GIT_CACHE/lfs

                # If the Git LFS locking feature is used, then Git LFS will set
                # lockable files to "readonly" by default. This is implemented
                # with a Git LFS "post-checkout" hook. Git LFS can skip this
                # hook if no file is locked. However, Git LFS needs to traverse
                # the entire tree to find all ".gitattributes" and check for
                # locked files. In a large tree this can take a while. Instruct
                # Git LFS to not set lockable files to "readonly" as this is
                # not necessary for a CI system.
                setLockableReadonly = false

            [lfs "transfer"]
                maxretries = 10

            [filter "lfs"]
                clean = git-lfs clean -- %f
                smudge = git-lfs smudge -- %f
                process = git-lfs filter-process
                required = true
EOM
        git config --local include.path "$SHARED_CONFIG"
    fi

    log "Updating Cache"
    main_remote_name=$(echo "$GIT_REMOTE" | git hash-object --stdin)
    main_ref_spec="refs/$MAIN_REF:refs/remotes/$main_remote_name/$MAIN_REF"
    if [[ -n "$MERGE_REF" ]]; then
        merge_ref_spec="refs/$MERGE_REF:refs/remotes/$main_remote_name/$MERGE_REF"
    fi
    git_retry fetch --force --no-tags "$GIT_REMOTE" "$main_ref_spec" "$merge_ref_spec"
    MAIN_REF_SHA1=$(git rev-parse "refs/remotes/$main_remote_name/$MAIN_REF")
    if [[ -n "$MERGE_REF" ]]; then
        MERGE_REF_SHA1=$(git rev-parse "refs/remotes/$main_remote_name/$MERGE_REF")
    fi
    # $MERGE_REF_SHA1 has intentionally no double quotes to allow it to be empty
    git lfs fetch "$GIT_REMOTE" "$MAIN_REF_SHA1" $MERGE_REF_SHA1

popd >/dev/null

if ! rm -rf "$WORKING_COPY"; then
    err "Cleaning the working directory failed. Maybe another application is still using it?"
    exit 1
fi

log "Preparing Checkout"
mkdir -p "$WORKING_COPY"
pushd "$WORKING_COPY" >/dev/null

    git clone $QUIET_FLAG --reference "$GIT_CACHE" --no-checkout "$GIT_CACHE" .
    git config --local include.path "$SHARED_CONFIG"
    git checkout $QUIET_FLAG --force --detach "$MAIN_REF_SHA1"

    git submodule sync --recursive
    git submodule--helper list |
        while read -r mode sm_sha1 stage sm_path
        do
            # We clone the working copy with the local cache path to avoid
            # unnecessary additional network calls. However, since the working
            # copy does not know its true repository URL, it would not be able
            # to reconstruct relative submodule URLs (e.g. '../sub.git').
            # Set the parent repo URL here to fix this.
            git remote set-url origin "$GIT_REMOTE"
            git submodule $QUIET_FLAG init -- "$sm_path"

            sm_name=$(git submodule--helper name "$sm_path")
            sm_relpath=$(git submodule--helper relative-path "$sm_name" '')
            sm_url=$(git config "submodule.$sm_name.url")
            sm_remote_name=$(echo "$sm_url" | git hash-object --stdin)
            sm_gitdir=".git/modules/$sm_name"
            mkdir -p "$(dirname "$sm_gitdir")"

            pushd "$GIT_CACHE" >/dev/null
                # Fetch the submodule only if the submodule commit is not
                # already in the cache
                if ! git cat-file -e "$sm_sha1^{commit}" 2>/dev/null; then
                    log "Updating Cache (Submodule '$sm_path')"
                    git_retry fetch --force --no-tags "$sm_url" \
                            "refs/heads/*:refs/remotes/$sm_remote_name/heads/*"
                    git lfs fetch "$sm_url" "$sm_sha1"
                fi
            popd >/dev/null

            log "Preparing Checkout (Submodule '$sm_path')"
            git clone \
              $QUIET_FLAG \
              --reference "$GIT_CACHE" \
              --separate-git-dir="$sm_gitdir" \
              --no-checkout \
              "$GIT_CACHE" "$sm_relpath"
            git config --local include.path "$SHARED_CONFIG"
            git --git-dir="$sm_gitdir" --work-tree="$sm_relpath" \
                checkout $QUIET_FLAG --force --detach "$sm_sha1"
        done

    if [[ -n "$MERGE_REF" ]]; then
        log "Merging"
        git merge --no-edit -m "cached clone temporary merge" "$MERGE_REF_SHA1"
    fi

popd >/dev/null

log "Runtime (sec): $SECONDS"
log "Success!"
