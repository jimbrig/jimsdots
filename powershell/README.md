# Powershell Dotfiles

This directory holds my personalized Powershell profile, aliases, functions, modules, and scripts I use on a day-to-day basis on Windows 10.

## Reference



## Profile

File: `profile.ps1`

```powerhshell
# Current User, All Hosts Powershell 7 Profile

# import modules
# Import-Module posh-git
# Import-Module oh-my-posh
# Import-Module Microsoft.PowerShell.Utility
# Import-Module PSWindowsUpdate
# Import-Module ZLocation
# Import-Module Boxstarter.WinConfig

# trust PSGallery
Set-PSRepository -Name PSGallery -InstallationPolicy Trusted

# load functions then aliases
$psdir = (Split-Path -parent $profile)
Get-ChildItem "${psdir}\functions.ps1" | ForEach-Object { .$_ }
Get-ChildItem "${psdir}\aliases.ps1" | ForEach-Object { .$_ }

# edit prompt
Write-Host “Custom PowerShell Environment Loaded”
Write-Host -Foreground Green "`n[ZLocation] knows about $((Get-ZLocation).Keys.Count) locations.`n"

## winget auto-completion - https://github.com/microsoft/winget-cli/blob/master/doc/Completion.md#powershell

Register-ArgumentCompleter -Native -CommandName winget -ScriptBlock {
  param($wordToComplete, $commandAst, $cursorPosition)
  [Console]::InputEncoding = [Console]::OutputEncoding = $OutputEncoding = [System.Text.Utf8Encoding]::new()
  $Local:word = $wordToComplete.Replace('"', '""')
  $Local:ast = $commandAst.ToString().Replace('"', '""')
  winget complete --word="$Local:word" --commandline "$Local:ast" --position $cursorPosition | ForEach-Object {
    [System.Management.Automation.CompletionResult]::new($_, $_, 'ParameterValue', $_)
  }
}

## Github Autocompletion
# using namespace System.Management.Automation
# using namespace System.Management.Automation.Language
Register-ArgumentCompleter -Native -CommandName 'gh' -ScriptBlock {
  param($wordToComplete, $commandAst, $cursorPosition)
  $commandElements = $commandAst.CommandElements
  $command = @(
    'gh'
    for ($i = 1; $i -lt $commandElements.Count; $i++) {
      $element = $commandElements[$i]
      if ($element -isnot [StringConstantExpressionAst] -or
        $element.StringConstantType -ne [StringConstantType]::BareWord -or
        $element.Value.StartsWith('-')) {
        break
      }
      $element.Value
    }
  ) -join ';'
  $completions = @(switch ($command) {
      'gh' {
        [CompletionResult]::new('--help', 'help', [CompletionResultType]::ParameterName, 'Show help for command')
        [CompletionResult]::new('--version', 'version', [CompletionResultType]::ParameterName, 'Show gh version')
        [CompletionResult]::new('alias', 'alias', [CompletionResultType]::ParameterValue, 'Create command shortcuts')
        [CompletionResult]::new('api', 'api', [CompletionResultType]::ParameterValue, 'Make an authenticated GitHub API request')
        [CompletionResult]::new('auth', 'auth', [CompletionResultType]::ParameterValue, 'Login, logout, and refresh your authentication')
        [CompletionResult]::new('completion', 'completion', [CompletionResultType]::ParameterValue, 'Generate shell completion scripts')
        [CompletionResult]::new('config', 'config', [CompletionResultType]::ParameterValue, 'Manage configuration for gh')
        [CompletionResult]::new('credits', 'credits', [CompletionResultType]::ParameterValue, 'View credits for this tool')
        [CompletionResult]::new('environment', 'environment', [CompletionResultType]::ParameterValue, 'Environment variables that can be used with gh')
        [CompletionResult]::new('gist', 'gist', [CompletionResultType]::ParameterValue, 'Manage gists')
        [CompletionResult]::new('help', 'help', [CompletionResultType]::ParameterValue, 'Help about any command')
        [CompletionResult]::new('issue', 'issue', [CompletionResultType]::ParameterValue, 'Manage issues')
        [CompletionResult]::new('pr', 'pr', [CompletionResultType]::ParameterValue, 'Manage pull requests')
        [CompletionResult]::new('reference', 'reference', [CompletionResultType]::ParameterValue, 'A comprehensive reference of all gh commands')
        [CompletionResult]::new('release', 'release', [CompletionResultType]::ParameterValue, 'Manage GitHub releases')
        [CompletionResult]::new('repo', 'repo', [CompletionResultType]::ParameterValue, 'Create, clone, fork, and view repositories')
        [CompletionResult]::new('secret', 'secret', [CompletionResultType]::ParameterValue, 'Manage GitHub secrets')
        [CompletionResult]::new('ssh-key', 'ssh-key', [CompletionResultType]::ParameterValue, 'Manage SSH keys')
        [CompletionResult]::new('version', 'version', [CompletionResultType]::ParameterValue, '')
        break
      }
      'gh;alias' {
        [CompletionResult]::new('delete', 'delete', [CompletionResultType]::ParameterValue, 'Delete an alias')
        [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List your aliases')
        [CompletionResult]::new('set', 'set', [CompletionResultType]::ParameterValue, 'Create a shortcut for a gh command')
        break
      }
      'gh;alias;delete' {
        break
      }
      'gh;alias;list' {
        break
      }
      'gh;alias;set' {
        [CompletionResult]::new('-s', 's', [CompletionResultType]::ParameterName, 'Declare an alias to be passed through a shell interpreter')
        [CompletionResult]::new('--shell', 'shell', [CompletionResultType]::ParameterName, 'Declare an alias to be passed through a shell interpreter')
        break
      }
      'gh;api' {
        [CompletionResult]::new('--cache', 'cache', [CompletionResultType]::ParameterName, 'Cache the response, e.g. "3600s", "60m", "1h"')
        [CompletionResult]::new('-F', 'F', [CompletionResultType]::ParameterName, 'Add a typed parameter in `key=value` format')
        [CompletionResult]::new('--field', 'field', [CompletionResultType]::ParameterName, 'Add a typed parameter in `key=value` format')
        [CompletionResult]::new('-H', 'H', [CompletionResultType]::ParameterName, 'Add a HTTP request header in `key:value` format')
        [CompletionResult]::new('--header', 'header', [CompletionResultType]::ParameterName, 'Add a HTTP request header in `key:value` format')
        [CompletionResult]::new('--hostname', 'hostname', [CompletionResultType]::ParameterName, 'The GitHub hostname for the request (default "github.com")')
        [CompletionResult]::new('-i', 'i', [CompletionResultType]::ParameterName, 'Include HTTP response headers in the output')
        [CompletionResult]::new('--include', 'include', [CompletionResultType]::ParameterName, 'Include HTTP response headers in the output')
        [CompletionResult]::new('--input', 'input', [CompletionResultType]::ParameterName, 'The `file` to use as body for the HTTP request')
        [CompletionResult]::new('-q', 'q', [CompletionResultType]::ParameterName, 'Query to select values from the response using jq syntax')
        [CompletionResult]::new('--jq', 'jq', [CompletionResultType]::ParameterName, 'Query to select values from the response using jq syntax')
        [CompletionResult]::new('-X', 'X', [CompletionResultType]::ParameterName, 'The HTTP method for the request')
        [CompletionResult]::new('--method', 'method', [CompletionResultType]::ParameterName, 'The HTTP method for the request')
        [CompletionResult]::new('--paginate', 'paginate', [CompletionResultType]::ParameterName, 'Make additional HTTP requests to fetch all pages of results')
        [CompletionResult]::new('-p', 'p', [CompletionResultType]::ParameterName, 'Opt into GitHub API previews')
        [CompletionResult]::new('--preview', 'preview', [CompletionResultType]::ParameterName, 'Opt into GitHub API previews')
        [CompletionResult]::new('-f', 'f', [CompletionResultType]::ParameterName, 'Add a string parameter in `key=value` format')
        [CompletionResult]::new('--raw-field', 'raw-field', [CompletionResultType]::ParameterName, 'Add a string parameter in `key=value` format')
        [CompletionResult]::new('--silent', 'silent', [CompletionResultType]::ParameterName, 'Do not print the response body')
        [CompletionResult]::new('-t', 't', [CompletionResultType]::ParameterName, 'Format the response using a Go template')
        [CompletionResult]::new('--template', 'template', [CompletionResultType]::ParameterName, 'Format the response using a Go template')
        break
      }
      'gh;auth' {
        [CompletionResult]::new('git-credential', 'git-credential', [CompletionResultType]::ParameterValue, 'Implements git credential helper protocol')
        [CompletionResult]::new('login', 'login', [CompletionResultType]::ParameterValue, 'Authenticate with a GitHub host')
        [CompletionResult]::new('logout', 'logout', [CompletionResultType]::ParameterValue, 'Log out of a GitHub host')
        [CompletionResult]::new('refresh', 'refresh', [CompletionResultType]::ParameterValue, 'Refresh stored authentication credentials')
        [CompletionResult]::new('status', 'status', [CompletionResultType]::ParameterValue, 'View authentication status')
        break
      }
      'gh;auth;git-credential' {
        break
      }
      'gh;auth;login' {
        [CompletionResult]::new('-h', 'h', [CompletionResultType]::ParameterName, 'The hostname of the GitHub instance to authenticate with')
        [CompletionResult]::new('--hostname', 'hostname', [CompletionResultType]::ParameterName, 'The hostname of the GitHub instance to authenticate with')
        [CompletionResult]::new('-s', 's', [CompletionResultType]::ParameterName, 'Additional authentication scopes for gh to have')
        [CompletionResult]::new('--scopes', 'scopes', [CompletionResultType]::ParameterName, 'Additional authentication scopes for gh to have')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open a browser to authenticate')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open a browser to authenticate')
        [CompletionResult]::new('--with-token', 'with-token', [CompletionResultType]::ParameterName, 'Read token from standard input')
        break
      }
      'gh;auth;logout' {
        [CompletionResult]::new('-h', 'h', [CompletionResultType]::ParameterName, 'The hostname of the GitHub instance to log out of')
        [CompletionResult]::new('--hostname', 'hostname', [CompletionResultType]::ParameterName, 'The hostname of the GitHub instance to log out of')
        break
      }
      'gh;auth;refresh' {
        [CompletionResult]::new('-h', 'h', [CompletionResultType]::ParameterName, 'The GitHub host to use for authentication')
        [CompletionResult]::new('--hostname', 'hostname', [CompletionResultType]::ParameterName, 'The GitHub host to use for authentication')
        [CompletionResult]::new('-s', 's', [CompletionResultType]::ParameterName, 'Additional authentication scopes for gh to have')
        [CompletionResult]::new('--scopes', 'scopes', [CompletionResultType]::ParameterName, 'Additional authentication scopes for gh to have')
        break
      }
      'gh;auth;status' {
        [CompletionResult]::new('-h', 'h', [CompletionResultType]::ParameterName, 'Check a specific hostname''s auth status')
        [CompletionResult]::new('--hostname', 'hostname', [CompletionResultType]::ParameterName, 'Check a specific hostname''s auth status')
        [CompletionResult]::new('-t', 't', [CompletionResultType]::ParameterName, 'Display the auth token')
        [CompletionResult]::new('--show-token', 'show-token', [CompletionResultType]::ParameterName, 'Display the auth token')
        break
      }
      'gh;completion' {
        [CompletionResult]::new('--help', 'help', [CompletionResultType]::ParameterName, 'Show help for command')
        [CompletionResult]::new('-s', 's', [CompletionResultType]::ParameterName, 'Shell type: {bash|zsh|fish|powershell}')
        [CompletionResult]::new('--shell', 'shell', [CompletionResultType]::ParameterName, 'Shell type: {bash|zsh|fish|powershell}')
        break
      }
      'gh;config' {
        [CompletionResult]::new('get', 'get', [CompletionResultType]::ParameterValue, 'Print the value of a given configuration key')
        [CompletionResult]::new('set', 'set', [CompletionResultType]::ParameterValue, 'Update configuration with a value for the given key')
        break
      }
      'gh;config;get' {
        [CompletionResult]::new('-h', 'h', [CompletionResultType]::ParameterName, 'Get per-host setting')
        [CompletionResult]::new('--host', 'host', [CompletionResultType]::ParameterName, 'Get per-host setting')
        break
      }
      'gh;config;set' {
        [CompletionResult]::new('-h', 'h', [CompletionResultType]::ParameterName, 'Set per-host setting')
        [CompletionResult]::new('--host', 'host', [CompletionResultType]::ParameterName, 'Set per-host setting')
        break
      }
      'gh;credits' {
        [CompletionResult]::new('-s', 's', [CompletionResultType]::ParameterName, 'Print a static version of the credits')
        [CompletionResult]::new('--static', 'static', [CompletionResultType]::ParameterName, 'Print a static version of the credits')
        break
      }
      'gh;environment' {
        break
      }
      'gh;gist' {
        [CompletionResult]::new('clone', 'clone', [CompletionResultType]::ParameterValue, 'Clone a gist locally')
        [CompletionResult]::new('create', 'create', [CompletionResultType]::ParameterValue, 'Create a new gist')
        [CompletionResult]::new('delete', 'delete', [CompletionResultType]::ParameterValue, 'Delete a gist')
        [CompletionResult]::new('edit', 'edit', [CompletionResultType]::ParameterValue, 'Edit one of your gists')
        [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List your gists')
        [CompletionResult]::new('view', 'view', [CompletionResultType]::ParameterValue, 'View a gist')
        break
      }
      'gh;gist;clone' {
        break
      }
      'gh;gist;create' {
        [CompletionResult]::new('-d', 'd', [CompletionResultType]::ParameterName, 'A description for this gist')
        [CompletionResult]::new('--desc', 'desc', [CompletionResultType]::ParameterName, 'A description for this gist')
        [CompletionResult]::new('-f', 'f', [CompletionResultType]::ParameterName, 'Provide a filename to be used when reading from STDIN')
        [CompletionResult]::new('--filename', 'filename', [CompletionResultType]::ParameterName, 'Provide a filename to be used when reading from STDIN')
        [CompletionResult]::new('-p', 'p', [CompletionResultType]::ParameterName, 'List the gist publicly (default: private)')
        [CompletionResult]::new('--public', 'public', [CompletionResultType]::ParameterName, 'List the gist publicly (default: private)')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open the web browser with created gist')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open the web browser with created gist')
        break
      }
      'gh;gist;delete' {
        break
      }
      'gh;gist;edit' {
        [CompletionResult]::new('-a', 'a', [CompletionResultType]::ParameterName, 'Add a new file to the gist')
        [CompletionResult]::new('--add', 'add', [CompletionResultType]::ParameterName, 'Add a new file to the gist')
        [CompletionResult]::new('-f', 'f', [CompletionResultType]::ParameterName, 'Select a file to edit')
        [CompletionResult]::new('--filename', 'filename', [CompletionResultType]::ParameterName, 'Select a file to edit')
        break
      }
      'gh;gist;list' {
        [CompletionResult]::new('-L', 'L', [CompletionResultType]::ParameterName, 'Maximum number of gists to fetch')
        [CompletionResult]::new('--limit', 'limit', [CompletionResultType]::ParameterName, 'Maximum number of gists to fetch')
        [CompletionResult]::new('--public', 'public', [CompletionResultType]::ParameterName, 'Show only public gists')
        [CompletionResult]::new('--secret', 'secret', [CompletionResultType]::ParameterName, 'Show only secret gists')
        break
      }
      'gh;gist;view' {
        [CompletionResult]::new('-f', 'f', [CompletionResultType]::ParameterName, 'Display a single file from the gist')
        [CompletionResult]::new('--filename', 'filename', [CompletionResultType]::ParameterName, 'Display a single file from the gist')
        [CompletionResult]::new('--files', 'files', [CompletionResultType]::ParameterName, 'List file names from the gist')
        [CompletionResult]::new('-r', 'r', [CompletionResultType]::ParameterName, 'Print raw instead of rendered gist contents')
        [CompletionResult]::new('--raw', 'raw', [CompletionResultType]::ParameterName, 'Print raw instead of rendered gist contents')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open gist in the browser')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open gist in the browser')
        break
      }
      'gh;help' {
        break
      }
      'gh;issue' {
        [CompletionResult]::new('close', 'close', [CompletionResultType]::ParameterValue, 'Close issue')
        [CompletionResult]::new('comment', 'comment', [CompletionResultType]::ParameterValue, 'Create a new issue comment')
        [CompletionResult]::new('create', 'create', [CompletionResultType]::ParameterValue, 'Create a new issue')
        [CompletionResult]::new('delete', 'delete', [CompletionResultType]::ParameterValue, 'Delete issue')
        [CompletionResult]::new('edit', 'edit', [CompletionResultType]::ParameterValue, 'Edit an issue')
        [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List and filter issues in this repository')
        [CompletionResult]::new('reopen', 'reopen', [CompletionResultType]::ParameterValue, 'Reopen issue')
        [CompletionResult]::new('status', 'status', [CompletionResultType]::ParameterValue, 'Show status of relevant issues')
        [CompletionResult]::new('view', 'view', [CompletionResultType]::ParameterValue, 'View an issue')
        break
      }
      'gh;issue;close' {
        break
      }
      'gh;issue;comment' {
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'Supply a body. Will prompt for one otherwise.')
        [CompletionResult]::new('--body', 'body', [CompletionResultType]::ParameterName, 'Supply a body. Will prompt for one otherwise.')
        [CompletionResult]::new('-e', 'e', [CompletionResultType]::ParameterName, 'Add body using editor')
        [CompletionResult]::new('--editor', 'editor', [CompletionResultType]::ParameterName, 'Add body using editor')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Add body in browser')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Add body in browser')
        break
      }
      'gh;issue;create' {
        [CompletionResult]::new('-a', 'a', [CompletionResultType]::ParameterName, 'Assign people by their `login`. Use "@me" to self-assign.')
        [CompletionResult]::new('--assignee', 'assignee', [CompletionResultType]::ParameterName, 'Assign people by their `login`. Use "@me" to self-assign.')
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'Supply a body. Will prompt for one otherwise.')
        [CompletionResult]::new('--body', 'body', [CompletionResultType]::ParameterName, 'Supply a body. Will prompt for one otherwise.')
        [CompletionResult]::new('-F', 'F', [CompletionResultType]::ParameterName, 'Read body text from `file`')
        [CompletionResult]::new('--body-file', 'body-file', [CompletionResultType]::ParameterName, 'Read body text from `file`')
        [CompletionResult]::new('-l', 'l', [CompletionResultType]::ParameterName, 'Add labels by `name`')
        [CompletionResult]::new('--label', 'label', [CompletionResultType]::ParameterName, 'Add labels by `name`')
        [CompletionResult]::new('-m', 'm', [CompletionResultType]::ParameterName, 'Add the issue to a milestone by `name`')
        [CompletionResult]::new('--milestone', 'milestone', [CompletionResultType]::ParameterName, 'Add the issue to a milestone by `name`')
        [CompletionResult]::new('-p', 'p', [CompletionResultType]::ParameterName, 'Add the issue to projects by `name`')
        [CompletionResult]::new('--project', 'project', [CompletionResultType]::ParameterName, 'Add the issue to projects by `name`')
        [CompletionResult]::new('--recover', 'recover', [CompletionResultType]::ParameterName, 'Recover input from a failed run of create')
        [CompletionResult]::new('-t', 't', [CompletionResultType]::ParameterName, 'Supply a title. Will prompt for one otherwise.')
        [CompletionResult]::new('--title', 'title', [CompletionResultType]::ParameterName, 'Supply a title. Will prompt for one otherwise.')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open the browser to create an issue')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open the browser to create an issue')
        break
      }
      'gh;issue;delete' {
        break
      }
      'gh;issue;edit' {
        [CompletionResult]::new('--add-assignee', 'add-assignee', [CompletionResultType]::ParameterName, 'Add assigned users by their `login`. Use "@me" to assign yourself.')
        [CompletionResult]::new('--add-label', 'add-label', [CompletionResultType]::ParameterName, 'Add labels by `name`')
        [CompletionResult]::new('--add-project', 'add-project', [CompletionResultType]::ParameterName, 'Add the issue to projects by `name`')
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'Set the new body.')
        [CompletionResult]::new('--body', 'body', [CompletionResultType]::ParameterName, 'Set the new body.')
        [CompletionResult]::new('-m', 'm', [CompletionResultType]::ParameterName, 'Edit the milestone the issue belongs to by `name`')
        [CompletionResult]::new('--milestone', 'milestone', [CompletionResultType]::ParameterName, 'Edit the milestone the issue belongs to by `name`')
        [CompletionResult]::new('--remove-assignee', 'remove-assignee', [CompletionResultType]::ParameterName, 'Remove assigned users by their `login`. Use "@me" to unassign yourself.')
        [CompletionResult]::new('--remove-label', 'remove-label', [CompletionResultType]::ParameterName, 'Remove labels by `name`')
        [CompletionResult]::new('--remove-project', 'remove-project', [CompletionResultType]::ParameterName, 'Remove the issue from projects by `name`')
        [CompletionResult]::new('-t', 't', [CompletionResultType]::ParameterName, 'Set the new title.')
        [CompletionResult]::new('--title', 'title', [CompletionResultType]::ParameterName, 'Set the new title.')
        break
      }
      'gh;issue;list' {
        [CompletionResult]::new('-a', 'a', [CompletionResultType]::ParameterName, 'Filter by assignee')
        [CompletionResult]::new('--assignee', 'assignee', [CompletionResultType]::ParameterName, 'Filter by assignee')
        [CompletionResult]::new('-A', 'A', [CompletionResultType]::ParameterName, 'Filter by author')
        [CompletionResult]::new('--author', 'author', [CompletionResultType]::ParameterName, 'Filter by author')
        [CompletionResult]::new('-l', 'l', [CompletionResultType]::ParameterName, 'Filter by labels')
        [CompletionResult]::new('--label', 'label', [CompletionResultType]::ParameterName, 'Filter by labels')
        [CompletionResult]::new('-L', 'L', [CompletionResultType]::ParameterName, 'Maximum number of issues to fetch')
        [CompletionResult]::new('--limit', 'limit', [CompletionResultType]::ParameterName, 'Maximum number of issues to fetch')
        [CompletionResult]::new('--mention', 'mention', [CompletionResultType]::ParameterName, 'Filter by mention')
        [CompletionResult]::new('-m', 'm', [CompletionResultType]::ParameterName, 'Filter by milestone `number` or `title`')
        [CompletionResult]::new('--milestone', 'milestone', [CompletionResultType]::ParameterName, 'Filter by milestone `number` or `title`')
        [CompletionResult]::new('-s', 's', [CompletionResultType]::ParameterName, 'Filter by state: {open|closed|all}')
        [CompletionResult]::new('--state', 'state', [CompletionResultType]::ParameterName, 'Filter by state: {open|closed|all}')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open the browser to list the issue(s)')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open the browser to list the issue(s)')
        break
      }
      'gh;issue;reopen' {
        break
      }
      'gh;issue;status' {
        break
      }
      'gh;issue;view' {
        [CompletionResult]::new('-c', 'c', [CompletionResultType]::ParameterName, 'View issue comments')
        [CompletionResult]::new('--comments', 'comments', [CompletionResultType]::ParameterName, 'View issue comments')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open an issue in the browser')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open an issue in the browser')
        break
      }
      'gh;pr' {
        [CompletionResult]::new('checkout', 'checkout', [CompletionResultType]::ParameterValue, 'Check out a pull request in git')
        [CompletionResult]::new('checks', 'checks', [CompletionResultType]::ParameterValue, 'Show CI status for a single pull request')
        [CompletionResult]::new('close', 'close', [CompletionResultType]::ParameterValue, 'Close a pull request')
        [CompletionResult]::new('comment', 'comment', [CompletionResultType]::ParameterValue, 'Create a new pr comment')
        [CompletionResult]::new('create', 'create', [CompletionResultType]::ParameterValue, 'Create a pull request')
        [CompletionResult]::new('diff', 'diff', [CompletionResultType]::ParameterValue, 'View changes in a pull request')
        [CompletionResult]::new('edit', 'edit', [CompletionResultType]::ParameterValue, 'Edit a pull request')
        [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List and filter pull requests in this repository')
        [CompletionResult]::new('merge', 'merge', [CompletionResultType]::ParameterValue, 'Merge a pull request')
        [CompletionResult]::new('ready', 'ready', [CompletionResultType]::ParameterValue, 'Mark a pull request as ready for review')
        [CompletionResult]::new('reopen', 'reopen', [CompletionResultType]::ParameterValue, 'Reopen a pull request')
        [CompletionResult]::new('review', 'review', [CompletionResultType]::ParameterValue, 'Add a review to a pull request')
        [CompletionResult]::new('status', 'status', [CompletionResultType]::ParameterValue, 'Show status of relevant pull requests')
        [CompletionResult]::new('view', 'view', [CompletionResultType]::ParameterValue, 'View a pull request')
        break
      }
      'gh;pr;checkout' {
        [CompletionResult]::new('--detach', 'detach', [CompletionResultType]::ParameterName, 'Checkout PR with a detached HEAD')
        [CompletionResult]::new('-f', 'f', [CompletionResultType]::ParameterName, 'Reset the existing local branch to the latest state of the pull request')
        [CompletionResult]::new('--force', 'force', [CompletionResultType]::ParameterName, 'Reset the existing local branch to the latest state of the pull request')
        [CompletionResult]::new('--recurse-submodules', 'recurse-submodules', [CompletionResultType]::ParameterName, 'Update all submodules after checkout')
        break
      }
      'gh;pr;checks' {
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open the web browser to show details about checks')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open the web browser to show details about checks')
        break
      }
      'gh;pr;close' {
        [CompletionResult]::new('-d', 'd', [CompletionResultType]::ParameterName, 'Delete the local and remote branch after close')
        [CompletionResult]::new('--delete-branch', 'delete-branch', [CompletionResultType]::ParameterName, 'Delete the local and remote branch after close')
        break
      }
      'gh;pr;comment' {
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'Supply a body. Will prompt for one otherwise.')
        [CompletionResult]::new('--body', 'body', [CompletionResultType]::ParameterName, 'Supply a body. Will prompt for one otherwise.')
        [CompletionResult]::new('-e', 'e', [CompletionResultType]::ParameterName, 'Add body using editor')
        [CompletionResult]::new('--editor', 'editor', [CompletionResultType]::ParameterName, 'Add body using editor')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Add body in browser')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Add body in browser')
        break
      }
      'gh;pr;create' {
        [CompletionResult]::new('-a', 'a', [CompletionResultType]::ParameterName, 'Assign people by their `login`. Use "@me" to self-assign.')
        [CompletionResult]::new('--assignee', 'assignee', [CompletionResultType]::ParameterName, 'Assign people by their `login`. Use "@me" to self-assign.')
        [CompletionResult]::new('-B', 'B', [CompletionResultType]::ParameterName, 'The `branch` into which you want your code merged')
        [CompletionResult]::new('--base', 'base', [CompletionResultType]::ParameterName, 'The `branch` into which you want your code merged')
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'Body for the pull request')
        [CompletionResult]::new('--body', 'body', [CompletionResultType]::ParameterName, 'Body for the pull request')
        [CompletionResult]::new('-F', 'F', [CompletionResultType]::ParameterName, 'Read body text from `file`')
        [CompletionResult]::new('--body-file', 'body-file', [CompletionResultType]::ParameterName, 'Read body text from `file`')
        [CompletionResult]::new('-d', 'd', [CompletionResultType]::ParameterName, 'Mark pull request as a draft')
        [CompletionResult]::new('--draft', 'draft', [CompletionResultType]::ParameterName, 'Mark pull request as a draft')
        [CompletionResult]::new('-f', 'f', [CompletionResultType]::ParameterName, 'Do not prompt for title/body and just use commit info')
        [CompletionResult]::new('--fill', 'fill', [CompletionResultType]::ParameterName, 'Do not prompt for title/body and just use commit info')
        [CompletionResult]::new('-H', 'H', [CompletionResultType]::ParameterName, 'The `branch` that contains commits for your pull request (default: current branch)')
        [CompletionResult]::new('--head', 'head', [CompletionResultType]::ParameterName, 'The `branch` that contains commits for your pull request (default: current branch)')
        [CompletionResult]::new('-l', 'l', [CompletionResultType]::ParameterName, 'Add labels by `name`')
        [CompletionResult]::new('--label', 'label', [CompletionResultType]::ParameterName, 'Add labels by `name`')
        [CompletionResult]::new('-m', 'm', [CompletionResultType]::ParameterName, 'Add the pull request to a milestone by `name`')
        [CompletionResult]::new('--milestone', 'milestone', [CompletionResultType]::ParameterName, 'Add the pull request to a milestone by `name`')
        [CompletionResult]::new('--no-maintainer-edit', 'no-maintainer-edit', [CompletionResultType]::ParameterName, 'Disable maintainer''s ability to modify pull request')
        [CompletionResult]::new('-p', 'p', [CompletionResultType]::ParameterName, 'Add the pull request to projects by `name`')
        [CompletionResult]::new('--project', 'project', [CompletionResultType]::ParameterName, 'Add the pull request to projects by `name`')
        [CompletionResult]::new('--recover', 'recover', [CompletionResultType]::ParameterName, 'Recover input from a failed run of create')
        [CompletionResult]::new('-r', 'r', [CompletionResultType]::ParameterName, 'Request reviews from people or teams by their `handle`')
        [CompletionResult]::new('--reviewer', 'reviewer', [CompletionResultType]::ParameterName, 'Request reviews from people or teams by their `handle`')
        [CompletionResult]::new('-t', 't', [CompletionResultType]::ParameterName, 'Title for the pull request')
        [CompletionResult]::new('--title', 'title', [CompletionResultType]::ParameterName, 'Title for the pull request')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open the web browser to create a pull request')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open the web browser to create a pull request')
        break
      }
      'gh;pr;diff' {
        [CompletionResult]::new('--color', 'color', [CompletionResultType]::ParameterName, 'Use color in diff output: {always|never|auto}')
        break
      }
      'gh;pr;edit' {
        [CompletionResult]::new('--add-assignee', 'add-assignee', [CompletionResultType]::ParameterName, 'Add assigned users by their `login`. Use "@me" to assign yourself.')
        [CompletionResult]::new('--add-label', 'add-label', [CompletionResultType]::ParameterName, 'Add labels by `name`')
        [CompletionResult]::new('--add-project', 'add-project', [CompletionResultType]::ParameterName, 'Add the pull request to projects by `name`')
        [CompletionResult]::new('--add-reviewer', 'add-reviewer', [CompletionResultType]::ParameterName, 'Add reviewers by their `login`.')
        [CompletionResult]::new('-B', 'B', [CompletionResultType]::ParameterName, 'Change the base `branch` for this pull request')
        [CompletionResult]::new('--base', 'base', [CompletionResultType]::ParameterName, 'Change the base `branch` for this pull request')
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'Set the new body.')
        [CompletionResult]::new('--body', 'body', [CompletionResultType]::ParameterName, 'Set the new body.')
        [CompletionResult]::new('-m', 'm', [CompletionResultType]::ParameterName, 'Edit the milestone the pull request belongs to by `name`')
        [CompletionResult]::new('--milestone', 'milestone', [CompletionResultType]::ParameterName, 'Edit the milestone the pull request belongs to by `name`')
        [CompletionResult]::new('--remove-assignee', 'remove-assignee', [CompletionResultType]::ParameterName, 'Remove assigned users by their `login`. Use "@me" to unassign yourself.')
        [CompletionResult]::new('--remove-label', 'remove-label', [CompletionResultType]::ParameterName, 'Remove labels by `name`')
        [CompletionResult]::new('--remove-project', 'remove-project', [CompletionResultType]::ParameterName, 'Remove the pull request from projects by `name`')
        [CompletionResult]::new('--remove-reviewer', 'remove-reviewer', [CompletionResultType]::ParameterName, 'Remove reviewers by their `login`.')
        [CompletionResult]::new('-t', 't', [CompletionResultType]::ParameterName, 'Set the new title.')
        [CompletionResult]::new('--title', 'title', [CompletionResultType]::ParameterName, 'Set the new title.')
        break
      }
      'gh;pr;list' {
        [CompletionResult]::new('-a', 'a', [CompletionResultType]::ParameterName, 'Filter by assignee')
        [CompletionResult]::new('--assignee', 'assignee', [CompletionResultType]::ParameterName, 'Filter by assignee')
        [CompletionResult]::new('-B', 'B', [CompletionResultType]::ParameterName, 'Filter by base branch')
        [CompletionResult]::new('--base', 'base', [CompletionResultType]::ParameterName, 'Filter by base branch')
        [CompletionResult]::new('-l', 'l', [CompletionResultType]::ParameterName, 'Filter by labels')
        [CompletionResult]::new('--label', 'label', [CompletionResultType]::ParameterName, 'Filter by labels')
        [CompletionResult]::new('-L', 'L', [CompletionResultType]::ParameterName, 'Maximum number of items to fetch')
        [CompletionResult]::new('--limit', 'limit', [CompletionResultType]::ParameterName, 'Maximum number of items to fetch')
        [CompletionResult]::new('-s', 's', [CompletionResultType]::ParameterName, 'Filter by state: {open|closed|merged|all}')
        [CompletionResult]::new('--state', 'state', [CompletionResultType]::ParameterName, 'Filter by state: {open|closed|merged|all}')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open the browser to list the pull requests')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open the browser to list the pull requests')
        break
      }
      'gh;pr;merge' {
        [CompletionResult]::new('--auto', 'auto', [CompletionResultType]::ParameterName, 'Automatically merge only after necessary requirements are met')
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'Body `text` for the merge commit')
        [CompletionResult]::new('--body', 'body', [CompletionResultType]::ParameterName, 'Body `text` for the merge commit')
        [CompletionResult]::new('-d', 'd', [CompletionResultType]::ParameterName, 'Delete the local and remote branch after merge')
        [CompletionResult]::new('--delete-branch', 'delete-branch', [CompletionResultType]::ParameterName, 'Delete the local and remote branch after merge')
        [CompletionResult]::new('--disable-auto', 'disable-auto', [CompletionResultType]::ParameterName, 'Disable auto-merge for this pull request')
        [CompletionResult]::new('-m', 'm', [CompletionResultType]::ParameterName, 'Merge the commits with the base branch')
        [CompletionResult]::new('--merge', 'merge', [CompletionResultType]::ParameterName, 'Merge the commits with the base branch')
        [CompletionResult]::new('-r', 'r', [CompletionResultType]::ParameterName, 'Rebase the commits onto the base branch')
        [CompletionResult]::new('--rebase', 'rebase', [CompletionResultType]::ParameterName, 'Rebase the commits onto the base branch')
        [CompletionResult]::new('-s', 's', [CompletionResultType]::ParameterName, 'Squash the commits into one commit and merge it into the base branch')
        [CompletionResult]::new('--squash', 'squash', [CompletionResultType]::ParameterName, 'Squash the commits into one commit and merge it into the base branch')
        break
      }
      'gh;pr;ready' {
        break
      }
      'gh;pr;reopen' {
        break
      }
      'gh;pr;review' {
        [CompletionResult]::new('-a', 'a', [CompletionResultType]::ParameterName, 'Approve pull request')
        [CompletionResult]::new('--approve', 'approve', [CompletionResultType]::ParameterName, 'Approve pull request')
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'Specify the body of a review')
        [CompletionResult]::new('--body', 'body', [CompletionResultType]::ParameterName, 'Specify the body of a review')
        [CompletionResult]::new('-c', 'c', [CompletionResultType]::ParameterName, 'Comment on a pull request')
        [CompletionResult]::new('--comment', 'comment', [CompletionResultType]::ParameterName, 'Comment on a pull request')
        [CompletionResult]::new('-r', 'r', [CompletionResultType]::ParameterName, 'Request changes on a pull request')
        [CompletionResult]::new('--request-changes', 'request-changes', [CompletionResultType]::ParameterName, 'Request changes on a pull request')
        break
      }
      'gh;pr;status' {
        break
      }
      'gh;pr;view' {
        [CompletionResult]::new('-c', 'c', [CompletionResultType]::ParameterName, 'View pull request comments')
        [CompletionResult]::new('--comments', 'comments', [CompletionResultType]::ParameterName, 'View pull request comments')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open a pull request in the browser')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open a pull request in the browser')
        break
      }
      'gh;reference' {
        break
      }
      'gh;release' {
        [CompletionResult]::new('create', 'create', [CompletionResultType]::ParameterValue, 'Create a new release')
        [CompletionResult]::new('delete', 'delete', [CompletionResultType]::ParameterValue, 'Delete a release')
        [CompletionResult]::new('download', 'download', [CompletionResultType]::ParameterValue, 'Download release assets')
        [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List releases in a repository')
        [CompletionResult]::new('upload', 'upload', [CompletionResultType]::ParameterValue, 'Upload assets to a release')
        [CompletionResult]::new('view', 'view', [CompletionResultType]::ParameterValue, 'View information about a release')
        break
      }
      'gh;release;create' {
        [CompletionResult]::new('-d', 'd', [CompletionResultType]::ParameterName, 'Save the release as a draft instead of publishing it')
        [CompletionResult]::new('--draft', 'draft', [CompletionResultType]::ParameterName, 'Save the release as a draft instead of publishing it')
        [CompletionResult]::new('-n', 'n', [CompletionResultType]::ParameterName, 'Release notes')
        [CompletionResult]::new('--notes', 'notes', [CompletionResultType]::ParameterName, 'Release notes')
        [CompletionResult]::new('-F', 'F', [CompletionResultType]::ParameterName, 'Read release notes from `file`')
        [CompletionResult]::new('--notes-file', 'notes-file', [CompletionResultType]::ParameterName, 'Read release notes from `file`')
        [CompletionResult]::new('-p', 'p', [CompletionResultType]::ParameterName, 'Mark the release as a prerelease')
        [CompletionResult]::new('--prerelease', 'prerelease', [CompletionResultType]::ParameterName, 'Mark the release as a prerelease')
        [CompletionResult]::new('--target', 'target', [CompletionResultType]::ParameterName, 'Target `branch` or full commit SHA (default: main branch)')
        [CompletionResult]::new('-t', 't', [CompletionResultType]::ParameterName, 'Release title')
        [CompletionResult]::new('--title', 'title', [CompletionResultType]::ParameterName, 'Release title')
        break
      }
      'gh;release;delete' {
        [CompletionResult]::new('-y', 'y', [CompletionResultType]::ParameterName, 'Skip the confirmation prompt')
        [CompletionResult]::new('--yes', 'yes', [CompletionResultType]::ParameterName, 'Skip the confirmation prompt')
        break
      }
      'gh;release;download' {
        [CompletionResult]::new('-D', 'D', [CompletionResultType]::ParameterName, 'The directory to download files into')
        [CompletionResult]::new('--dir', 'dir', [CompletionResultType]::ParameterName, 'The directory to download files into')
        [CompletionResult]::new('-p', 'p', [CompletionResultType]::ParameterName, 'Download only assets that match a glob pattern')
        [CompletionResult]::new('--pattern', 'pattern', [CompletionResultType]::ParameterName, 'Download only assets that match a glob pattern')
        break
      }
      'gh;release;list' {
        [CompletionResult]::new('-L', 'L', [CompletionResultType]::ParameterName, 'Maximum number of items to fetch')
        [CompletionResult]::new('--limit', 'limit', [CompletionResultType]::ParameterName, 'Maximum number of items to fetch')
        break
      }
      'gh;release;upload' {
        [CompletionResult]::new('--clobber', 'clobber', [CompletionResultType]::ParameterName, 'Overwrite existing assets of the same name')
        break
      }
      'gh;release;view' {
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open the release in the browser')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open the release in the browser')
        break
      }
      'gh;repo' {
        [CompletionResult]::new('clone', 'clone', [CompletionResultType]::ParameterValue, 'Clone a repository locally')
        [CompletionResult]::new('create', 'create', [CompletionResultType]::ParameterValue, 'Create a new repository')
        [CompletionResult]::new('credits', 'credits', [CompletionResultType]::ParameterValue, 'View credits for a repository')
        [CompletionResult]::new('fork', 'fork', [CompletionResultType]::ParameterValue, 'Create a fork of a repository')
        [CompletionResult]::new('garden', 'garden', [CompletionResultType]::ParameterValue, 'Explore a git repository as a garden')
        [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List repositories owned by user or organization')
        [CompletionResult]::new('view', 'view', [CompletionResultType]::ParameterValue, 'View a repository')
        break
      }
      'gh;repo;clone' {
        break
      }
      'gh;repo;create' {
        [CompletionResult]::new('-y', 'y', [CompletionResultType]::ParameterName, 'Skip the confirmation prompt')
        [CompletionResult]::new('--confirm', 'confirm', [CompletionResultType]::ParameterName, 'Skip the confirmation prompt')
        [CompletionResult]::new('-d', 'd', [CompletionResultType]::ParameterName, 'Description of the repository')
        [CompletionResult]::new('--description', 'description', [CompletionResultType]::ParameterName, 'Description of the repository')
        [CompletionResult]::new('--enable-issues', 'enable-issues', [CompletionResultType]::ParameterName, 'Enable issues in the new repository')
        [CompletionResult]::new('--enable-wiki', 'enable-wiki', [CompletionResultType]::ParameterName, 'Enable wiki in the new repository')
        [CompletionResult]::new('-h', 'h', [CompletionResultType]::ParameterName, 'Repository home page `URL`')
        [CompletionResult]::new('--homepage', 'homepage', [CompletionResultType]::ParameterName, 'Repository home page `URL`')
        [CompletionResult]::new('--internal', 'internal', [CompletionResultType]::ParameterName, 'Make the new repository internal')
        [CompletionResult]::new('--private', 'private', [CompletionResultType]::ParameterName, 'Make the new repository private')
        [CompletionResult]::new('--public', 'public', [CompletionResultType]::ParameterName, 'Make the new repository public')
        [CompletionResult]::new('-t', 't', [CompletionResultType]::ParameterName, 'The `name` of the organization team to be granted access')
        [CompletionResult]::new('--team', 'team', [CompletionResultType]::ParameterName, 'The `name` of the organization team to be granted access')
        [CompletionResult]::new('-p', 'p', [CompletionResultType]::ParameterName, 'Make the new repository based on a template `repository`')
        [CompletionResult]::new('--template', 'template', [CompletionResultType]::ParameterName, 'Make the new repository based on a template `repository`')
        break
      }
      'gh;repo;credits' {
        [CompletionResult]::new('-s', 's', [CompletionResultType]::ParameterName, 'Print a static version of the credits')
        [CompletionResult]::new('--static', 'static', [CompletionResultType]::ParameterName, 'Print a static version of the credits')
        break
      }
      'gh;repo;fork' {
        [CompletionResult]::new('--clone', 'clone', [CompletionResultType]::ParameterName, 'Clone the fork {true|false}')
        [CompletionResult]::new('--remote', 'remote', [CompletionResultType]::ParameterName, 'Add remote for fork {true|false}')
        [CompletionResult]::new('--remote-name', 'remote-name', [CompletionResultType]::ParameterName, 'Specify a name for a fork''s new remote.')
        break
      }
      'gh;repo;garden' {
        break
      }
      'gh;repo;list' {
        [CompletionResult]::new('--archived', 'archived', [CompletionResultType]::ParameterName, 'Show only archived repositories')
        [CompletionResult]::new('--fork', 'fork', [CompletionResultType]::ParameterName, 'Show only forks')
        [CompletionResult]::new('-l', 'l', [CompletionResultType]::ParameterName, 'Filter by primary coding language')
        [CompletionResult]::new('--language', 'language', [CompletionResultType]::ParameterName, 'Filter by primary coding language')
        [CompletionResult]::new('-L', 'L', [CompletionResultType]::ParameterName, 'Maximum number of repositories to list')
        [CompletionResult]::new('--limit', 'limit', [CompletionResultType]::ParameterName, 'Maximum number of repositories to list')
        [CompletionResult]::new('--no-archived', 'no-archived', [CompletionResultType]::ParameterName, 'Omit archived repositories')
        [CompletionResult]::new('--private', 'private', [CompletionResultType]::ParameterName, 'Show only private repositories')
        [CompletionResult]::new('--public', 'public', [CompletionResultType]::ParameterName, 'Show only public repositories')
        [CompletionResult]::new('--source', 'source', [CompletionResultType]::ParameterName, 'Show only non-forks')
        break
      }
      'gh;repo;view' {
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'View a specific branch of the repository')
        [CompletionResult]::new('--branch', 'branch', [CompletionResultType]::ParameterName, 'View a specific branch of the repository')
        [CompletionResult]::new('-w', 'w', [CompletionResultType]::ParameterName, 'Open a repository in the browser')
        [CompletionResult]::new('--web', 'web', [CompletionResultType]::ParameterName, 'Open a repository in the browser')
        break
      }
      'gh;secret' {
        [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'List secrets')
        [CompletionResult]::new('remove', 'remove', [CompletionResultType]::ParameterValue, 'Remove an organization or repository secret')
        [CompletionResult]::new('set', 'set', [CompletionResultType]::ParameterValue, 'Create or update secrets')
        break
      }
      'gh;secret;list' {
        [CompletionResult]::new('-o', 'o', [CompletionResultType]::ParameterName, 'List secrets for an organization')
        [CompletionResult]::new('--org', 'org', [CompletionResultType]::ParameterName, 'List secrets for an organization')
        break
      }
      'gh;secret;remove' {
        [CompletionResult]::new('-o', 'o', [CompletionResultType]::ParameterName, 'List secrets for an organization')
        [CompletionResult]::new('--org', 'org', [CompletionResultType]::ParameterName, 'List secrets for an organization')
        break
      }
      'gh;secret;set' {
        [CompletionResult]::new('-b', 'b', [CompletionResultType]::ParameterName, 'A value for the secret. Reads from STDIN if not specified.')
        [CompletionResult]::new('--body', 'body', [CompletionResultType]::ParameterName, 'A value for the secret. Reads from STDIN if not specified.')
        [CompletionResult]::new('-o', 'o', [CompletionResultType]::ParameterName, 'List secrets for an organization')
        [CompletionResult]::new('--org', 'org', [CompletionResultType]::ParameterName, 'List secrets for an organization')
        [CompletionResult]::new('-r', 'r', [CompletionResultType]::ParameterName, 'List of repository names for `selected` visibility')
        [CompletionResult]::new('--repos', 'repos', [CompletionResultType]::ParameterName, 'List of repository names for `selected` visibility')
        [CompletionResult]::new('-v', 'v', [CompletionResultType]::ParameterName, 'Set visibility for an organization secret: `all`, `private`, or `selected`')
        [CompletionResult]::new('--visibility', 'visibility', [CompletionResultType]::ParameterName, 'Set visibility for an organization secret: `all`, `private`, or `selected`')
        break
      }
      'gh;ssh-key' {
        [CompletionResult]::new('add', 'add', [CompletionResultType]::ParameterValue, 'Add an SSH key to your GitHub account')
        [CompletionResult]::new('list', 'list', [CompletionResultType]::ParameterValue, 'Lists SSH keys in your GitHub account')
        break
      }
      'gh;ssh-key;add' {
        [CompletionResult]::new('-t', 't', [CompletionResultType]::ParameterName, 'Title for the new key')
        [CompletionResult]::new('--title', 'title', [CompletionResultType]::ParameterName, 'Title for the new key')
        break
      }
      'gh;ssh-key;list' {
        break
      }
      'gh;version' {
        break
      }
    })
  $completions.Where{ $_.CompletionText -like "$wordToComplete*" } |
  Sort-Object -Property ListItemText
}


```

