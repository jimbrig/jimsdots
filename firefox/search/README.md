# Firefox Search Engines

[TOC]

This directory houses all search engine related files and configurations I use across my devices on Firefox (Developer Edition).

## Customized Search Engines

See <firefox://about:preferences#search>.

![image](https://user-images.githubusercontent.com/32652297/137078020-c8454bb7-e492-4f5d-8237-fa7ea9a06daf.png)
![image](https://user-images.githubusercontent.com/32652297/137077972-4001c422-8d7c-4d30-a015-ab427a622b0f.png)
![image](https://user-images.githubusercontent.com/32652297/137078099-0fbadc95-c88c-4e4b-b3c8-a206257d3c07.png)

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
