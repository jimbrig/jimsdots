# Keep

*See [OrkoHunter/keep (github.com)](https://github.com/OrkoHunter/keep)*

*Keep* is a personalized, *meta CLI toolkit* that stores and manages shell commands and snippets through GitHub gists. Keep is built with Python and therefore is installed with pip:

```powershell
pip install keep
```

To initialize keep run:

```powershell
keep init
```

which will setup the `~/.keep` directory and initialize your backup gist on GitHub.

***

My Keep `commands.json` backup GitHub Gist is located at: <https://gist.github.com/jimbrig/da88cb0d6ad1ff9037ce4e209728adfa>

Note that the Gist's ID is: `da88cb0d6ad1ff9037ce4e209728adfa`.

Note: the [.keep](./.keep) folder is hard-linked to my actual `~/.keep` configuration folder and `.credentials` is encrypted via `git-crypt`.