# Firefox Developer Edition

[TOC]

## Installation

## Setup

## Firefox Profile

- Profiles Path: `APPDATA%\Mozilla\Firefox\Profiles` - [Link](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/)
  - Developer Profile: [gu64ib7f.dev-edition-default](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/)

## Working with profiles

- [Profile Manager - Create, remove or switch Firefox profiles](https://support.mozilla.org/en-US/kb/profile-manager-create-remove-switch-firefox-profiles) explains how to do things like, create a new profile, set a new default profile, and delete an old profile.
- [Recover user data missing after Firefox update](https://support.mozilla.org/en-US/kb/recover-user-data-missing-after-firefox-update) explains how to use the Profile Manager to switch profiles, if multiple profiles exist. 
- [Back up and restore information in Firefox profiles](https://support.mozilla.org/en-US/kb/back-and-restore-information-firefox-profiles) explains how to back up and restore a profile. It also explains how to  move your profile information to a different location on your hard drive or to another computer.
- [Recovering important data from an old profile](https://support.mozilla.org/en-US/kb/recovering-important-data-from-an-old-profile) explains how to copy files to a new profile and includes a list of files that store information useful for recovery.

## Information Stored in Profile

*Source: <http://mzl.la/1BAQULj>*

*Note: This is not a complete list. Only important information is described.*

### Bookmarks, Downloads and Browsing History:

- [places.sqlite](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/places.sqlite):
	- This file contains all your Firefox bookmarks and lists of all the files you've downloaded and websites you’ve visited.
- [bookmarkbackups](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/bookmarkbackups):
  - This folder stores bookmark backup files, which can be used to restore your bookmarks.
- [favicons.sqlite](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/favicons.sqlite):
  - This file contains all of the favicons for your Firefox bookmarks.

For more information, see [Bookmarks in Firefox](https://support.mozilla.org/en-US/kb/bookmarks-firefox) and [Restore bookmarks from backup or move them to another computer](https://support.mozilla.org/en-US/kb/restore-bookmarks-from-backup-or-move-them).

### Passwords

- Your passwords are stored in these two files:
    - [key4.db](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/key4.db)
    - [logins.json](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/logins.json)

*For more information, see [Password Manager - Remember, delete and edit logins and passwords in Firefox](https://support.mozilla.org/en-US/kb/password-manager-remember-delete-edit-logins).*

### Site-specific preferences

- [permissions.sqlite](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/permissions.sqlite)
- [content-prefs.sqlite](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/content-prefs.sqlite)

These two files store many of your Firefox permissions (for instance, which  sites are allowed to display popups) or zoom levels that are set on a  site-by-site basis (see [Font size and zoom - increase the size of web pages](https://support.mozilla.org/en-US/kb/font-size-and-zoom-increase-size-of-web-pages)).

### Search engines

  -  [search.json.mozlz4](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/search.json.mozlz4)
      -  This file stores user-installed search engines. For more information, see [Add or remove a search engine in Firefox](https://support.mozilla.org/en-US/kb/add-or-remove-search-engine-firefox).
      -  **NOTE:** I manage my search engines through the browser extension [firefox-search-engines-helper](https://github.com/soufianesakhi/firefox-search-engines-helper) which allows me to export/import the engines as pure `JSON` as opposed to the `.json.mozlz4` Mozilla specific format. 
          -  See my custom search engines here: [all-browser-engines.json](search/all-browser-engines.json)
          -  For more information navigate to the [search directory](search/)

### Personal Dictionary

  - [persdict.dat](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/persdict.dat):
      - This file stores any custom words you have added to Firefox's dictionary. For more information, see [How do I use the Firefox spell checker?](https://support.mozilla.org/en-US/kb/how-do-i-use-firefox-spell-checker).

### Autocomplete History

- [formhistory.sqlite](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/formhistory.sqlite):
	- This file remembers what you have searched for in the Firefox search bar and what information you’ve entered into forms on websites. For more information, see [Control whether Firefox automatically fills in forms](https://support.mozilla.org/en-US/kb/control-whether-firefox-automatically-fills-forms).

### Cookies

- [cookies.sqlite](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/cookie.sqlite):
    - A [cookie](https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer) is a bit of information stored on your computer by a website you’ve  visited. Usually, this is something like your site preferences or login  status. Cookies are all stored in this file.

### DOM Storage

`DOM` Storage is designed to provide a larger, more secure, and easier-to-use alternative to storing information in cookies.

- [webappsstore.sqlite](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/webappstore.sqlite):
  - Information is stored in this file for websites
  
- [chromeappsstore.sqlite](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/chromeappstore.sqlite):
    - This file stores information for [about:*](http://kb.mozillazine.org/About_protocol_links) pages.

### Extensions

- [extensions/](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/extensions/):

  - This folder, if it exists, stores files for any [extensions](https://addons.mozilla.org/firefox/extensions/) you have installed. To learn more about Firefox extensions and other add-ons, see [Find and install add-ons to add features to Firefox](https://support.mozilla.org/en-US/kb/find-and-install-add-ons-add-features-to-firefox).

### Security Certificate Settings

- [cert9.db](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/cert9.db):
  - This file stores all your security certificate settings and any SSL certificates you have imported into Firefox.

### Security Device Settings

- [pkcs11.txt](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/pkcs11.txt):
  - This file stores security module configuration.
  
### Download Actions

- [handlers.json](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/handlers.json):
	- This file stores your preferences that tell Firefox what to do when it comes across a particular type of file. 
		- For example, these are the settings that tell Firefox to open a PDF file with Acrobat Reader when you click on it. For more information, see [Change what Firefox does when you click on or download a file](https://support.mozilla.org/en-US/kb/change-firefox-behavior-when-open-file).

### Stored Session

- [sessionstore.jsonlz4](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/sessionstore.jsonlz4):
	- This file stores the currently open tabs and windows. 
		- For more information, see [Restore previous session - Configure when Firefox shows your most recent tabs and windows](https://support.mozilla.org/en-US/kb/restore-previous-session).

### Toolbar Customizations:

- [xulstore.json](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/xulstore.json):
	- This file stores toolbar and window size/position settings. 
		- For more information, see [Customize Firefox controls, buttons and toolbars](https://support.mozilla.org/en-US/kb/customize-firefox-controls-buttons-and-toolbars).

### User Preferences

- [prefs.js](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/prefs.js):
	- This file stores customized user preference settings, such as changes you make in Firefox Settings dialogs. 
	- *NOTE: The optional `user.js` file, if one exists,  will override any modified preferences.*

### Containers

- [containers.json](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/containers.json):
	- This file stores the details of containers used by the [Container Tabs feature](https://support.mozilla.org/en-US/kb/containers), including those created by extensions such as [Facebook Container](https://support.mozilla.org/en-US/kb/facebook-container-prevent-facebook-tracking).

***

Reference:  [Where Firefox Stores Profile User Data](https://support.mozilla.org/en-US/kb/profiles-where-firefox-stores-user-data#w_finding-your-profile-without-opening-firefox)

