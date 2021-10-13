# Firefox Search Engines

[TOC]

This directory houses all search engine related files and configurations I use across my devices on Firefox (Developer Edition).

## Customized Search Engines

See <about:preferences#search>.

![image-20211013021021394](C:\Users\jimmy\AppData\Roaming\Typora\typora-user-images\image-20211013021021394.png)

![image-20211013021117626](C:\Users\jimmy\AppData\Roaming\Typora\typora-user-images\image-20211013021117626.png)

![image-20211013020209450](C:\Users\jimmy\AppData\Roaming\Typora\typora-user-images\image-20211013020209450.png)



## Files

### [all-browser-engines.json](all-browser-engines.json)

My custom search engines exported as `JSON` using the [firefox-search-engines-helper](https://github.com/soufianesakhi/firefox-search-engines-helper) extension.

### [search.json.mozlz4](search.json.mozlz4)

*For more information, see [Add or remove a search engine in Firefox](https://support.mozilla.org/en-US/kb/add-or-remove-search-engine-firefox).*

The default `json.mozlz4` specific file utilized by the browser. 
This file stores user-installed search engines.

Stored under the Profile Directory at: `%APPDATA%\Mozilla\Firefox\Profiles\gu64ib7f.dev-edition-default\search.json.mozlz4`

- Open directly using the [File URI (file:///)](file:///C:/Users/jimmy/AppData/Roaming/Mozilla/Firefox/Profiles/gu64ib7f.dev-edition-default/search.json.mozlz4)

### [search.json.mozlz4.bak](search.json.mozlz4.bak)

Latest backed up search file using the [firefox-search-engines-helper](https://github.com/soufianesakhi/firefox-search-engines-helper) extension.

## Extension

I manage all of my search settings and custom search providers via the [firefox-search-engines-helper](https://github.com/soufianesakhi/firefox-search-engines-helper) extension.
