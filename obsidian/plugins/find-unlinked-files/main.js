'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var DeleteFilesModal = /** @class */ (function (_super) {
    __extends(DeleteFilesModal, _super);
    function DeleteFilesModal(app, filesToDelete) {
        var _this = _super.call(this, app) || this;
        _this.filesToDelete = filesToDelete;
        return _this;
    }
    DeleteFilesModal.prototype.onOpen = function () {
        var _this = this;
        var _a = this, contentEl = _a.contentEl, titleEl = _a.titleEl;
        titleEl.setText('Move ' + this.filesToDelete.length + ' files to system trash?');
        contentEl
            .createEl("button", { text: "Cancel" })
            .addEventListener("click", function () { return _this.close(); });
        contentEl
            .setAttr("margin", "auto");
        contentEl
            .createEl("button", {
            cls: "mod-cta",
            text: "Confirm"
        })
            .addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, _a, file;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.filesToDelete;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        file = _a[_i];
                        return [4 /*yield*/, this.app.vault.trash(file, true)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.close();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    DeleteFilesModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return DeleteFilesModal;
}(obsidian.Modal));

var SettingsTab = /** @class */ (function (_super) {
    __extends(SettingsTab, _super);
    function SettingsTab(app, plugin, defaultSettings) {
        var _this = _super.call(this, app, plugin) || this;
        _this.defaultSettings = defaultSettings;
        _this.plugin = plugin;
        return _this;
    }
    SettingsTab.prototype.formatPath = function (path, addDirectorySlash) {
        if (path.length == 0)
            return path;
        path = obsidian.normalizePath(path);
        if (addDirectorySlash)
            return path + "/";
        else
            return path;
    };
    SettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: this.plugin.manifest.name });
        containerEl.createEl("h4", { text: "Settings for find unlinked files" });
        new obsidian.Setting(containerEl)
            .setName('Output file name')
            .setDesc('Set name of output file (without file extension). Make sure no file exists with this name because it will be overwritten! If the name is empty, the default name is set.')
            .addText(function (cb) { return cb.onChange(function (value) {
            if (value.length == 0) {
                _this.plugin.settings.outputFileName = _this.defaultSettings.outputFileName;
            }
            else {
                _this.plugin.settings.outputFileName = value;
            }
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.outputFileName); });
        new obsidian.Setting(containerEl)
            .setName('Disable working links')
            .setDesc('Indent lines to disable the link and to clean up the graph view')
            .addToggle(function (cb) { return cb.onChange(function (value) {
            _this.plugin.settings.disableWorkingLinks = value;
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.disableWorkingLinks); });
        new obsidian.Setting(containerEl)
            .setName("Directories to ignore.")
            .setDesc("Add each directory path in a new line")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/Subdirectory")
            .setValue(_this.plugin.settings.directoriesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, true); });
            _this.plugin.settings.directoriesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Files to ignore.")
            .setDesc("Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.filesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.filesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Links to ignore.")
            .setDesc("Ignore files, which contain the given file as link. Add each file path in a new line (with file extension!). Set it to `*` to ignore files with links.")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.linksToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.linksToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("File types to ignore.")
            .setDesc("Add each file type separated by comma")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("docx,txt")
            .setValue(_this.plugin.settings.fileTypesToIgnore.join(","))
            .onChange(function (value) {
            var extensions = value.trim().split(",");
            _this.plugin.settings.fileTypesToIgnore = extensions;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Tags to ignore.")
            .setDesc("Ignore files, which contain the given tag. Add each tag separated by comma (without `#`)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("todo,unfinished")
            .setValue(_this.plugin.settings.tagsToIgnore.join(","))
            .onChange(function (value) {
            var tags = value.trim().split(",");
            _this.plugin.settings.tagsToIgnore = tags;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Filetypes to delete per command. See README.")
            .setDesc("Add each filetype separated by comma. ")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("jpg,png")
            .setValue(_this.plugin.settings.fileTypesToDelete.join(","))
            .onChange(function (value) {
            var extensions = value.trim().split(",");
            _this.plugin.settings.fileTypesToDelete = extensions;
            _this.plugin.saveSettings();
        }); });
        /// Settings for find unresolvedLinks
        containerEl.createEl("h4", { text: "Settings for find unresolved links" });
        new obsidian.Setting(containerEl)
            .setName('Output file name')
            .setDesc('Set name of output file (without file extension). Make sure no file exists with this name because it will be overwritten! If the name is empty, the default name is set.')
            .addText(function (cb) { return cb.onChange(function (value) {
            if (value.length == 0) {
                _this.plugin.settings.unresolvedLinksOutputFileName = _this.defaultSettings.unresolvedLinksOutputFileName;
            }
            else {
                _this.plugin.settings.unresolvedLinksOutputFileName = value;
            }
            _this.plugin.saveSettings();
        }).setValue(_this.plugin.settings.unresolvedLinksOutputFileName); });
        new obsidian.Setting(containerEl)
            .setName("Directories to ignore.")
            .setDesc("Ignore links in files in the specified directory. Add each directory path in a new line")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/Subdirectory")
            .setValue(_this.plugin.settings.unresolvedLinksDirectoriesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, true); });
            _this.plugin.settings.unresolvedLinksDirectoriesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Files to ignore.")
            .setDesc("Ignore links in the specified file. Add each file path in a new line (with file extension!)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.unresolvedLinksFilesToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.unresolvedLinksFilesToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Links to ignore.")
            .setDesc("Ignore files, which contain the given file as link. Add each file path in a new line (with file extension!). Set it to `*` to ignore files with links.")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("Directory/file.md")
            .setValue(_this.plugin.settings.unresolvedLinksLinksToIgnore.join("\n"))
            .onChange(function (value) {
            var paths = value.trim().split("\n").map(function (value) { return _this.formatPath(value, false); });
            _this.plugin.settings.unresolvedLinksLinksToIgnore = paths;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Filetypes to ignore.")
            .setDesc("Ignore links with the specified filetype. Add each filetype separated by comma")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("docx,txt")
            .setValue(_this.plugin.settings.unresolvedLinksFileTypesToIgnore.join(","))
            .onChange(function (value) {
            var extensions = value.trim().split(",");
            _this.plugin.settings.unresolvedLinksFileTypesToIgnore = extensions;
            _this.plugin.saveSettings();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Tags to ignore.")
            .setDesc("Ignore links in files, which contain the given tag. Add each tag separated by comma (without `#`)")
            .addTextArea(function (cb) { return cb
            .setPlaceholder("todo,unfinished")
            .setValue(_this.plugin.settings.unresolvedLinksTagsToIgnore.join(","))
            .onChange(function (value) {
            var tags = value.trim().split(",");
            _this.plugin.settings.unresolvedLinksTagsToIgnore = tags;
            _this.plugin.saveSettings();
        }); });
    };
    return SettingsTab;
}(obsidian.PluginSettingTab));

var Utils = /** @class */ (function () {
    /**
     * Checks for the given settings. Is used for `Find unlinked files` and `Find unresolved links`
     * @param app
     * @param filePath
     * @param tagsToIgnore
     * @param linksToIgnore
     * @param directoriesToIgnore
     * @param filesToIgnore
     */
    function Utils(app, filePath, tagsToIgnore, linksToIgnore, directoriesToIgnore, filesToIgnore) {
        this.app = app;
        this.filePath = filePath;
        this.tagsToIgnore = tagsToIgnore;
        this.linksToIgnore = linksToIgnore;
        this.directoriesToIgnore = directoriesToIgnore;
        this.filesToIgnore = filesToIgnore;
        this.fileCache = app.metadataCache.getCache(filePath);
    }
    Utils.prototype.hasTagsToIgnore = function () {
        var _this = this;
        var tags = obsidian.getAllTags(this.fileCache);
        return (tags === null || tags === void 0 ? void 0 : tags.find(function (tag) { return _this.tagsToIgnore.contains(tag.substring(1)); })) !== undefined;
    };
    Utils.prototype.hasLinksToIgnore = function () {
        var _this = this;
        var _a, _b;
        if ((((_a = this.fileCache) === null || _a === void 0 ? void 0 : _a.embeds) != null || ((_b = this.fileCache) === null || _b === void 0 ? void 0 : _b.links) != null) && this.linksToIgnore[0] == "*") {
            return true;
        }
        return obsidian.iterateCacheRefs(this.fileCache, function (cb) {
            var _a;
            var link = (_a = _this.app.metadataCache.getFirstLinkpathDest(cb.link, _this.filePath)) === null || _a === void 0 ? void 0 : _a.path;
            return _this.linksToIgnore.contains(link);
        });
    };
    Utils.prototype.isDirectoryToIgnore = function () {
        var _this = this;
        return this.directoriesToIgnore.find(function (value) { return _this.filePath.startsWith(value) && value.length != 0; }) !== undefined;
    };
    Utils.prototype.isFileToIgnore = function () {
        return this.filesToIgnore.contains(this.filePath);
    };
    Utils.prototype.isValid = function () {
        return !this.hasTagsToIgnore() && !this.hasLinksToIgnore() && !this.isDirectoryToIgnore() && !this.isFileToIgnore();
    };
    /**
     * Writes the text to the file and opens the file in a new pane if it is not opened yet
     * @param app
     * @param outputFileName name of the output file
     * @param text data to be written to the file
     */
    Utils.writeAndOpenFile = function (app, outputFileName, text) {
        return __awaiter(this, void 0, void 0, function () {
            var fileIsAlreadyOpened;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, app.vault.adapter.write(outputFileName, text)];
                    case 1:
                        _a.sent();
                        fileIsAlreadyOpened = false;
                        app.workspace.iterateAllLeaves(function (leaf) {
                            if (outputFileName.startsWith(leaf.getDisplayText())) {
                                fileIsAlreadyOpened = true;
                            }
                        });
                        if (!fileIsAlreadyOpened)
                            app.workspace.openLinkText(outputFileName, "/", true);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Utils;
}());

var DEFAULT_SETTINGS = {
    outputFileName: "unlinked files output",
    disableWorkingLinks: false,
    directoriesToIgnore: [],
    filesToIgnore: [],
    fileTypesToIgnore: [],
    linksToIgnore: [],
    tagsToIgnore: [],
    fileTypesToDelete: [],
    unresolvedLinksOutputFileName: "unresolved links output",
    unresolvedLinksDirectoriesToIgnore: [],
    unresolvedLinksFilesToIgnore: [],
    unresolvedLinksFileTypesToIgnore: [],
    unresolvedLinksLinksToIgnore: [],
    unresolvedLinksTagsToIgnore: [],
};
var FindUnlinkedFilesPlugin = /** @class */ (function (_super) {
    __extends(FindUnlinkedFilesPlugin, _super);
    function FindUnlinkedFilesPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FindUnlinkedFilesPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('loading ' + this.manifest.name + " plugin");
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addCommand({
                            id: 'find-unlinked-files',
                            name: 'Find unlinked files',
                            callback: function () { return _this.findUnlinkedFiles(); },
                        });
                        this.addCommand({
                            id: 'find-unresolved-link',
                            name: 'Find unresolved links',
                            callback: function () { return _this.findUnresolvedLinks(); },
                        });
                        this.addCommand({
                            id: "delete-unlinked-files",
                            name: "Delete unlinked files with certain extension. See README",
                            callback: function () { return _this.deleteUnlinkedFiles(); }
                        });
                        this.addSettingTab(new SettingsTab(this.app, this, DEFAULT_SETTINGS));
                        return [2 /*return*/];
                }
            });
        });
    };
    FindUnlinkedFilesPlugin.prototype.findUnlinkedFiles = function () {
        var _this = this;
        var outFileName = this.settings.outputFileName + ".md";
        var outFile;
        var files = this.app.vault.getFiles();
        var markdownFiles = this.app.vault.getMarkdownFiles();
        var links = [];
        markdownFiles.forEach(function (markFile) {
            if (markFile.path == outFileName) {
                outFile = markFile;
                return;
            }
            obsidian.iterateCacheRefs(_this.app.metadataCache.getFileCache(markFile), function (cb) {
                var txt = _this.app.metadataCache.getFirstLinkpathDest(obsidian.getLinkpath(cb.link), markFile.path);
                if (txt != null)
                    links.push(txt.path);
            });
        });
        var notLinkedFiles = files.filter(function (file) { return _this.isValid(file, links); });
        notLinkedFiles.remove(outFile);
        var text = "";
        var prefix;
        if (this.settings.disableWorkingLinks)
            prefix = "	";
        else
            prefix = "";
        notLinkedFiles.forEach(function (file) {
            text += prefix + "- [[" + _this.app.metadataCache.fileToLinktext(file, "/") + "]]\n";
        });
        Utils.writeAndOpenFile(this.app, outFileName, text);
    };
    FindUnlinkedFilesPlugin.prototype.deleteUnlinkedFiles = function () {
        var _this = this;
        var _a, _b;
        var links = (_b = (_a = this.app.metadataCache.getCache(this.settings.outputFileName + ".md")) === null || _a === void 0 ? void 0 : _a.links) !== null && _b !== void 0 ? _b : [];
        var filesToDelete = [];
        links.forEach(function (link) {
            var file = _this.app.metadataCache.getFirstLinkpathDest(link.link, "/");
            if (!file)
                return;
            if (_this.settings.fileTypesToDelete.contains(file.extension)) {
                filesToDelete.push(file);
            }
        });
        if (filesToDelete.length > 0)
            new DeleteFilesModal(this.app, filesToDelete).open();
    };
    FindUnlinkedFilesPlugin.prototype.findUnresolvedLinks = function () {
        var outFileName = this.settings.unresolvedLinksOutputFileName + ".md";
        var links = [];
        var unresolvedLinks = this.app.metadataCache.unresolvedLinks;
        for (var filePath in unresolvedLinks) {
            if (filePath == this.settings.unresolvedLinksOutputFileName + ".md")
                continue;
            var fileType = filePath.substring(filePath.lastIndexOf(".") + 1);
            var utils = new Utils(this.app, filePath, this.settings.unresolvedLinksTagsToIgnore, this.settings.unresolvedLinksLinksToIgnore, this.settings.unresolvedLinksDirectoriesToIgnore, this.settings.unresolvedLinksFilesToIgnore);
            if (!utils.isValid())
                continue;
            var _loop_1 = function (link) {
                var linkFileType = link.substring(link.lastIndexOf(".") + 1);
                console.log(linkFileType);
                if (this_1.settings.unresolvedLinksFileTypesToIgnore.contains(linkFileType))
                    return "continue";
                var formattedFilePath = filePath;
                if (fileType == "md") {
                    formattedFilePath = filePath.substring(0, filePath.lastIndexOf(".md"));
                }
                var unresolvedLink = { files: [formattedFilePath], link: link };
                if (links.contains(unresolvedLink))
                    return "continue";
                var duplication = links.find(function (e) { return e.link == link; });
                if (duplication) {
                    duplication.files.push(formattedFilePath);
                }
                else {
                    links.push(unresolvedLink);
                }
            };
            var this_1 = this;
            for (var link in unresolvedLinks[filePath]) {
                _loop_1(link);
            }
        }
        Utils.writeAndOpenFile(this.app, outFileName, __spreadArrays([
            "Don't forget that creating the file from here may create the file in the wrong directory!"
        ], links.map(function (e) { return "- [[" + e.link + "]] in [[" + e.files.join("]], [[") + "]]"; })).join("\n"));
    };
    /**
     * Checks if the given file in an unlinked file
     *
     * @param file file to check
     * @param links all links in the vault
     */
    FindUnlinkedFilesPlugin.prototype.isValid = function (file, links) {
        if (links.contains(file.path))
            return false;
        //filetypes to ignore by default
        if (file.extension == "css")
            return false;
        if (this.settings.fileTypesToIgnore.contains(file.extension))
            return false;
        var utils = new Utils(this.app, file.path, this.settings.tagsToIgnore, this.settings.linksToIgnore, this.settings.directoriesToIgnore, this.settings.filesToIgnore);
        if (!utils.isValid())
            return false;
        return true;
    };
    FindUnlinkedFilesPlugin.prototype.onunload = function () {
        console.log('unloading ' + this.manifest.name + " plugin");
    };
    FindUnlinkedFilesPlugin.prototype.loadSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [DEFAULT_SETTINGS];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        return [2 /*return*/];
                }
            });
        });
    };
    FindUnlinkedFilesPlugin.prototype.saveSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.saveData(this.settings)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FindUnlinkedFilesPlugin;
}(obsidian.Plugin));

module.exports = FindUnlinkedFilesPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9kZWxldGVGaWxlc01vZGFsLnRzIiwic3JjL3NldHRpbmdzVGFiLnRzIiwic3JjL3V0aWxzLnRzIiwic3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBNb2RhbCwgVEZpbGUgfSBmcm9tICdvYnNpZGlhbic7XG5cbmV4cG9ydCBjbGFzcyBEZWxldGVGaWxlc01vZGFsIGV4dGVuZHMgTW9kYWwge1xuXHRmaWxlc1RvRGVsZXRlOiBURmlsZVtdO1xuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgZmlsZXNUb0RlbGV0ZTogVEZpbGVbXSkge1xuXHRcdHN1cGVyKGFwcCk7XG5cdFx0dGhpcy5maWxlc1RvRGVsZXRlID0gZmlsZXNUb0RlbGV0ZTtcblx0fVxuXG5cdG9uT3BlbigpIHtcblx0XHRsZXQgeyBjb250ZW50RWwsIHRpdGxlRWwgfSA9IHRoaXM7XG5cdFx0dGl0bGVFbC5zZXRUZXh0KCdNb3ZlICcgKyB0aGlzLmZpbGVzVG9EZWxldGUubGVuZ3RoICsgJyBmaWxlcyB0byBzeXN0ZW0gdHJhc2g/Jyk7XG5cdFx0Y29udGVudEVsXG5cdFx0XHQuY3JlYXRlRWwoXCJidXR0b25cIiwgeyB0ZXh0OiBcIkNhbmNlbFwiIH0pXG5cdFx0XHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuY2xvc2UoKSk7XG5cdFx0Y29udGVudEVsXG5cdFx0XHQuc2V0QXR0cihcIm1hcmdpblwiLCBcImF1dG9cIik7XG5cblx0XHRjb250ZW50RWxcblx0XHRcdC5jcmVhdGVFbChcImJ1dHRvblwiLFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Y2xzOiBcIm1vZC1jdGFcIixcblx0XHRcdFx0XHR0ZXh0OiBcIkNvbmZpcm1cIlxuXHRcdFx0XHR9KVxuXHRcdFx0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoKSA9PiB7XG5cdFx0XHRcdGZvciAoY29uc3QgZmlsZSBvZiB0aGlzLmZpbGVzVG9EZWxldGUpIHtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLmFwcC52YXVsdC50cmFzaChmaWxlLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmNsb3NlKCk7XG5cdFx0XHR9KTtcblxuXHR9XG5cblx0b25DbG9zZSgpIHtcblx0XHRsZXQgeyBjb250ZW50RWwgfSA9IHRoaXM7XG5cdFx0Y29udGVudEVsLmVtcHR5KCk7XG5cdH1cbn1cbiIsImltcG9ydCB7IEFwcCwgbm9ybWFsaXplUGF0aCwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCBGaW5kVW5saW5rZWRGaWxlc1BsdWdpbiwgeyBTZXR0aW5ncyB9IGZyb20gJy4vbWFpbic7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICAgIHBsdWdpbjogRmluZFVubGlua2VkRmlsZXNQbHVnaW47XG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogRmluZFVubGlua2VkRmlsZXNQbHVnaW4sIHByaXZhdGUgZGVmYXVsdFNldHRpbmdzOiBTZXR0aW5ncykge1xuICAgICAgICBzdXBlcihhcHAsIHBsdWdpbik7XG4gICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgIH1cbiAgICBmb3JtYXRQYXRoKHBhdGg6IHN0cmluZywgYWRkRGlyZWN0b3J5U2xhc2g6IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgICAgICBpZiAocGF0aC5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiBwYXRoO1xuICAgICAgICBwYXRoID0gbm9ybWFsaXplUGF0aChwYXRoKTtcbiAgICAgICAgaWYgKGFkZERpcmVjdG9yeVNsYXNoKVxuICAgICAgICAgICAgcmV0dXJuIHBhdGggKyBcIi9cIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfVxuXG4gICAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IHsgY29udGFpbmVyRWwgfSA9IHRoaXM7XG4gICAgICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDJcIiwgeyB0ZXh0OiB0aGlzLnBsdWdpbi5tYW5pZmVzdC5uYW1lIH0pO1xuXG4gICAgICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDRcIiwgeyB0ZXh0OiBcIlNldHRpbmdzIGZvciBmaW5kIHVubGlua2VkIGZpbGVzXCIgfSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ091dHB1dCBmaWxlIG5hbWUnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1NldCBuYW1lIG9mIG91dHB1dCBmaWxlICh3aXRob3V0IGZpbGUgZXh0ZW5zaW9uKS4gTWFrZSBzdXJlIG5vIGZpbGUgZXhpc3RzIHdpdGggdGhpcyBuYW1lIGJlY2F1c2UgaXQgd2lsbCBiZSBvdmVyd3JpdHRlbiEgSWYgdGhlIG5hbWUgaXMgZW1wdHksIHRoZSBkZWZhdWx0IG5hbWUgaXMgc2V0LicpXG4gICAgICAgICAgICAuYWRkVGV4dChjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm91dHB1dEZpbGVOYW1lID0gdGhpcy5kZWZhdWx0U2V0dGluZ3Mub3V0cHV0RmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub3V0cHV0RmlsZU5hbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5vdXRwdXRGaWxlTmFtZSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ0Rpc2FibGUgd29ya2luZyBsaW5rcycpXG4gICAgICAgICAgICAuc2V0RGVzYygnSW5kZW50IGxpbmVzIHRvIGRpc2FibGUgdGhlIGxpbmsgYW5kIHRvIGNsZWFuIHVwIHRoZSBncmFwaCB2aWV3JylcbiAgICAgICAgICAgIC5hZGRUb2dnbGUoY2IgPT4gY2Iub25DaGFuZ2UodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVXb3JraW5nTGlua3MgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZVdvcmtpbmdMaW5rcykpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJEaXJlY3RvcmllcyB0byBpZ25vcmUuXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkFkZCBlYWNoIGRpcmVjdG9yeSBwYXRoIGluIGEgbmV3IGxpbmVcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkRpcmVjdG9yeS9TdWJkaXJlY3RvcnlcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlyZWN0b3JpZXNUb0lnbm9yZS5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiXFxuXCIpLm1hcCh2YWx1ZSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIHRydWUpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlyZWN0b3JpZXNUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJGaWxlcyB0byBpZ25vcmUuXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkFkZCBlYWNoIGZpbGUgcGF0aCBpbiBhIG5ldyBsaW5lICh3aXRoIGZpbGUgZXh0ZW5zaW9uISlcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkRpcmVjdG9yeS9maWxlLm1kXCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVzVG9JZ25vcmUuam9pbihcIlxcblwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIlxcblwiKS5tYXAodmFsdWUgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5maWxlc1RvSWdub3JlID0gcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkxpbmtzIHRvIGlnbm9yZS5cIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiSWdub3JlIGZpbGVzLCB3aGljaCBjb250YWluIHRoZSBnaXZlbiBmaWxlIGFzIGxpbmsuIEFkZCBlYWNoIGZpbGUgcGF0aCBpbiBhIG5ldyBsaW5lICh3aXRoIGZpbGUgZXh0ZW5zaW9uISkuIFNldCBpdCB0byBgKmAgdG8gaWdub3JlIGZpbGVzIHdpdGggbGlua3MuXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJEaXJlY3RvcnkvZmlsZS5tZFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5saW5rc1RvSWdub3JlLmpvaW4oXCJcXG5cIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCJcXG5cIikubWFwKHZhbHVlID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgZmFsc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubGlua3NUb0lnbm9yZSA9IHBhdGhzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJGaWxlIHR5cGVzIHRvIGlnbm9yZS5cIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiQWRkIGVhY2ggZmlsZSB0eXBlIHNlcGFyYXRlZCBieSBjb21tYVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZG9jeCx0eHRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmlsZVR5cGVzVG9JZ25vcmUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXh0ZW5zaW9ucyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVUeXBlc1RvSWdub3JlID0gZXh0ZW5zaW9ucztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiVGFncyB0byBpZ25vcmUuXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIklnbm9yZSBmaWxlcywgd2hpY2ggY29udGFpbiB0aGUgZ2l2ZW4gdGFnLiBBZGQgZWFjaCB0YWcgc2VwYXJhdGVkIGJ5IGNvbW1hICh3aXRob3V0IGAjYClcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcInRvZG8sdW5maW5pc2hlZFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50YWdzVG9JZ25vcmUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFncyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRhZ3NUb0lnbm9yZSA9IHRhZ3M7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkZpbGV0eXBlcyB0byBkZWxldGUgcGVyIGNvbW1hbmQuIFNlZSBSRUFETUUuXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIkFkZCBlYWNoIGZpbGV0eXBlIHNlcGFyYXRlZCBieSBjb21tYS4gXCIpXG4gICAgICAgICAgICAuYWRkVGV4dEFyZWEoY2IgPT4gY2JcbiAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoXCJqcGcscG5nXCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmZpbGVUeXBlc1RvRGVsZXRlLmpvaW4oXCIsXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGV4dGVuc2lvbnMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5maWxlVHlwZXNUb0RlbGV0ZSA9IGV4dGVuc2lvbnM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcblxuXG4gICAgICAgIC8vLyBTZXR0aW5ncyBmb3IgZmluZCB1bnJlc29sdmVkTGlua3NcbiAgICAgICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoNFwiLCB7IHRleHQ6IFwiU2V0dGluZ3MgZm9yIGZpbmQgdW5yZXNvbHZlZCBsaW5rc1wiIH0pO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ091dHB1dCBmaWxlIG5hbWUnKVxuICAgICAgICAgICAgLnNldERlc2MoJ1NldCBuYW1lIG9mIG91dHB1dCBmaWxlICh3aXRob3V0IGZpbGUgZXh0ZW5zaW9uKS4gTWFrZSBzdXJlIG5vIGZpbGUgZXhpc3RzIHdpdGggdGhpcyBuYW1lIGJlY2F1c2UgaXQgd2lsbCBiZSBvdmVyd3JpdHRlbiEgSWYgdGhlIG5hbWUgaXMgZW1wdHksIHRoZSBkZWZhdWx0IG5hbWUgaXMgc2V0LicpXG4gICAgICAgICAgICAuYWRkVGV4dChjYiA9PiBjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lID0gdGhpcy5kZWZhdWx0U2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICB9KS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NPdXRwdXRGaWxlTmFtZSkpO1xuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoXCJEaXJlY3RvcmllcyB0byBpZ25vcmUuXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIklnbm9yZSBsaW5rcyBpbiBmaWxlcyBpbiB0aGUgc3BlY2lmaWVkIGRpcmVjdG9yeS4gQWRkIGVhY2ggZGlyZWN0b3J5IHBhdGggaW4gYSBuZXcgbGluZVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L1N1YmRpcmVjdG9yeVwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NEaXJlY3Rvcmllc1RvSWdub3JlLmpvaW4oXCJcXG5cIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGF0aHMgPSB2YWx1ZS50cmltKCkuc3BsaXQoXCJcXG5cIikubWFwKHZhbHVlID0+IHRoaXMuZm9ybWF0UGF0aCh2YWx1ZSwgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NEaXJlY3Rvcmllc1RvSWdub3JlID0gcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkZpbGVzIHRvIGlnbm9yZS5cIilcbiAgICAgICAgICAgIC5zZXREZXNjKFwiSWdub3JlIGxpbmtzIGluIHRoZSBzcGVjaWZpZWQgZmlsZS4gQWRkIGVhY2ggZmlsZSBwYXRoIGluIGEgbmV3IGxpbmUgKHdpdGggZmlsZSBleHRlbnNpb24hKVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiRGlyZWN0b3J5L2ZpbGUubWRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZS5qb2luKFwiXFxuXCIpKVxuICAgICAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhdGhzID0gdmFsdWUudHJpbSgpLnNwbGl0KFwiXFxuXCIpLm1hcCh2YWx1ZSA9PiB0aGlzLmZvcm1hdFBhdGgodmFsdWUsIGZhbHNlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0ZpbGVzVG9JZ25vcmUgPSBwYXRocztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiTGlua3MgdG8gaWdub3JlLlwiKVxuICAgICAgICAgICAgLnNldERlc2MoXCJJZ25vcmUgZmlsZXMsIHdoaWNoIGNvbnRhaW4gdGhlIGdpdmVuIGZpbGUgYXMgbGluay4gQWRkIGVhY2ggZmlsZSBwYXRoIGluIGEgbmV3IGxpbmUgKHdpdGggZmlsZSBleHRlbnNpb24hKS4gU2V0IGl0IHRvIGAqYCB0byBpZ25vcmUgZmlsZXMgd2l0aCBsaW5rcy5cIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcIkRpcmVjdG9yeS9maWxlLm1kXCIpXG4gICAgICAgICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0xpbmtzVG9JZ25vcmUuam9pbihcIlxcblwiKSlcbiAgICAgICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXRocyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIlxcblwiKS5tYXAodmFsdWUgPT4gdGhpcy5mb3JtYXRQYXRoKHZhbHVlLCBmYWxzZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NMaW5rc1RvSWdub3JlID0gcGF0aHM7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgICAgICAuc2V0TmFtZShcIkZpbGV0eXBlcyB0byBpZ25vcmUuXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIklnbm9yZSBsaW5rcyB3aXRoIHRoZSBzcGVjaWZpZWQgZmlsZXR5cGUuIEFkZCBlYWNoIGZpbGV0eXBlIHNlcGFyYXRlZCBieSBjb21tYVwiKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKGNiID0+IGNiXG4gICAgICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiZG9jeCx0eHRcIilcbiAgICAgICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRmlsZVR5cGVzVG9JZ25vcmUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZXh0ZW5zaW9ucyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0ZpbGVUeXBlc1RvSWdub3JlID0gZXh0ZW5zaW9ucztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgICAgIC5zZXROYW1lKFwiVGFncyB0byBpZ25vcmUuXCIpXG4gICAgICAgICAgICAuc2V0RGVzYyhcIklnbm9yZSBsaW5rcyBpbiBmaWxlcywgd2hpY2ggY29udGFpbiB0aGUgZ2l2ZW4gdGFnLiBBZGQgZWFjaCB0YWcgc2VwYXJhdGVkIGJ5IGNvbW1hICh3aXRob3V0IGAjYClcIilcbiAgICAgICAgICAgIC5hZGRUZXh0QXJlYShjYiA9PiBjYlxuICAgICAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihcInRvZG8sdW5maW5pc2hlZFwiKVxuICAgICAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NUYWdzVG9JZ25vcmUuam9pbihcIixcIikpXG4gICAgICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGFncyA9IHZhbHVlLnRyaW0oKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZSA9IHRhZ3M7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBBcHAsIENhY2hlZE1ldGFkYXRhLCBnZXRBbGxUYWdzLCBpdGVyYXRlQ2FjaGVSZWZzIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5cbmV4cG9ydCBjbGFzcyBVdGlscyB7XG4gICAgcHJpdmF0ZSBmaWxlQ2FjaGU6IENhY2hlZE1ldGFkYXRhO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGZvciB0aGUgZ2l2ZW4gc2V0dGluZ3MuIElzIHVzZWQgZm9yIGBGaW5kIHVubGlua2VkIGZpbGVzYCBhbmQgYEZpbmQgdW5yZXNvbHZlZCBsaW5rc2BcbiAgICAgKiBAcGFyYW0gYXBwIFxuICAgICAqIEBwYXJhbSBmaWxlUGF0aCBcbiAgICAgKiBAcGFyYW0gdGFnc1RvSWdub3JlIFxuICAgICAqIEBwYXJhbSBsaW5rc1RvSWdub3JlIFxuICAgICAqIEBwYXJhbSBkaXJlY3Rvcmllc1RvSWdub3JlIFxuICAgICAqIEBwYXJhbSBmaWxlc1RvSWdub3JlIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGFwcDogQXBwLFxuICAgICAgICBwcml2YXRlIGZpbGVQYXRoOiBzdHJpbmcsXG4gICAgICAgIHByaXZhdGUgdGFnc1RvSWdub3JlOiBzdHJpbmdbXSxcbiAgICAgICAgcHJpdmF0ZSBsaW5rc1RvSWdub3JlOiBzdHJpbmdbXSxcbiAgICAgICAgcHJpdmF0ZSBkaXJlY3Rvcmllc1RvSWdub3JlOiBzdHJpbmdbXSxcbiAgICAgICAgcHJpdmF0ZSBmaWxlc1RvSWdub3JlOiBzdHJpbmdbXVxuICAgICkge1xuICAgICAgICB0aGlzLmZpbGVDYWNoZSA9IGFwcC5tZXRhZGF0YUNhY2hlLmdldENhY2hlKGZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc1RhZ3NUb0lnbm9yZSgpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgdGFncyA9IGdldEFsbFRhZ3ModGhpcy5maWxlQ2FjaGUpO1xuICAgICAgICByZXR1cm4gdGFncz8uZmluZCgodGFnKSA9PiB0aGlzLnRhZ3NUb0lnbm9yZS5jb250YWlucyh0YWcuc3Vic3RyaW5nKDEpKSkgIT09IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcHJpdmF0ZSBoYXNMaW5rc1RvSWdub3JlKCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoKHRoaXMuZmlsZUNhY2hlPy5lbWJlZHMgIT0gbnVsbCB8fCB0aGlzLmZpbGVDYWNoZT8ubGlua3MgIT0gbnVsbCkgJiYgdGhpcy5saW5rc1RvSWdub3JlWzBdID09IFwiKlwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpdGVyYXRlQ2FjaGVSZWZzKHRoaXMuZmlsZUNhY2hlLCBjYiA9PiB7XG4gICAgICAgICAgICBjb25zdCBsaW5rID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaXJzdExpbmtwYXRoRGVzdChjYi5saW5rLCB0aGlzLmZpbGVQYXRoKT8ucGF0aDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmxpbmtzVG9JZ25vcmUuY29udGFpbnMobGluayk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgaXNEaXJlY3RvcnlUb0lnbm9yZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0b3JpZXNUb0lnbm9yZS5maW5kKCh2YWx1ZSkgPT4gdGhpcy5maWxlUGF0aC5zdGFydHNXaXRoKHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggIT0gMCkgIT09IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcHJpdmF0ZSBpc0ZpbGVUb0lnbm9yZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsZXNUb0lnbm9yZS5jb250YWlucyh0aGlzLmZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaXNWYWxpZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmhhc1RhZ3NUb0lnbm9yZSgpICYmICF0aGlzLmhhc0xpbmtzVG9JZ25vcmUoKSAmJiAhdGhpcy5pc0RpcmVjdG9yeVRvSWdub3JlKCkgJiYgIXRoaXMuaXNGaWxlVG9JZ25vcmUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgdGhlIHRleHQgdG8gdGhlIGZpbGUgYW5kIG9wZW5zIHRoZSBmaWxlIGluIGEgbmV3IHBhbmUgaWYgaXQgaXMgbm90IG9wZW5lZCB5ZXRcbiAgICAgKiBAcGFyYW0gYXBwIFxuICAgICAqIEBwYXJhbSBvdXRwdXRGaWxlTmFtZSBuYW1lIG9mIHRoZSBvdXRwdXQgZmlsZVxuICAgICAqIEBwYXJhbSB0ZXh0IGRhdGEgdG8gYmUgd3JpdHRlbiB0byB0aGUgZmlsZVxuICAgICAqL1xuICAgIHN0YXRpYyBhc3luYyB3cml0ZUFuZE9wZW5GaWxlKGFwcDogQXBwLCBvdXRwdXRGaWxlTmFtZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgYXdhaXQgYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUob3V0cHV0RmlsZU5hbWUsIHRleHQpO1xuXG4gICAgICAgIGxldCBmaWxlSXNBbHJlYWR5T3BlbmVkID0gZmFsc2U7XG4gICAgICAgIGFwcC53b3Jrc3BhY2UuaXRlcmF0ZUFsbExlYXZlcyhsZWFmID0+IHtcbiAgICAgICAgICAgIGlmIChvdXRwdXRGaWxlTmFtZS5zdGFydHNXaXRoKGxlYWYuZ2V0RGlzcGxheVRleHQoKSkpIHtcbiAgICAgICAgICAgICAgICBmaWxlSXNBbHJlYWR5T3BlbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZmlsZUlzQWxyZWFkeU9wZW5lZClcbiAgICAgICAgICAgIGFwcC53b3Jrc3BhY2Uub3BlbkxpbmtUZXh0KG91dHB1dEZpbGVOYW1lLCBcIi9cIiwgdHJ1ZSk7XG4gICAgfVxufSIsImltcG9ydCB7IGdldExpbmtwYXRoLCBpdGVyYXRlQ2FjaGVSZWZzLCBQbHVnaW4sIFRGaWxlIH0gZnJvbSAnb2JzaWRpYW4nO1xyXG5pbXBvcnQgeyBEZWxldGVGaWxlc01vZGFsIH0gZnJvbSAnLi9kZWxldGVGaWxlc01vZGFsJztcclxuaW1wb3J0IHsgU2V0dGluZ3NUYWIgfSBmcm9tICcuL3NldHRpbmdzVGFiJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL3V0aWxzJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU2V0dGluZ3Mge1xyXG5cdG91dHB1dEZpbGVOYW1lOiBzdHJpbmc7XHJcblx0ZGlzYWJsZVdvcmtpbmdMaW5rczogYm9vbGVhbjtcclxuXHRkaXJlY3Rvcmllc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHRmaWxlc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHRmaWxlVHlwZXNUb0lnbm9yZTogc3RyaW5nW107XHJcblx0bGlua3NUb0lnbm9yZTogc3RyaW5nW107XHJcblx0dGFnc1RvSWdub3JlOiBzdHJpbmdbXTtcclxuXHRmaWxlVHlwZXNUb0RlbGV0ZTogc3RyaW5nW107XHJcblx0dW5yZXNvbHZlZExpbmtzRGlyZWN0b3JpZXNUb0lnbm9yZTogc3RyaW5nW107XHJcblx0dW5yZXNvbHZlZExpbmtzRmlsZXNUb0lnbm9yZTogc3RyaW5nW107XHJcblx0dW5yZXNvbHZlZExpbmtzRmlsZVR5cGVzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHVucmVzb2x2ZWRMaW5rc0xpbmtzVG9JZ25vcmU6IHN0cmluZ1tdO1xyXG5cdHVucmVzb2x2ZWRMaW5rc1RhZ3NUb0lnbm9yZTogc3RyaW5nW107XHJcblx0dW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWU6IHN0cmluZztcclxufVxyXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBTZXR0aW5ncyA9IHtcclxuXHRvdXRwdXRGaWxlTmFtZTogXCJ1bmxpbmtlZCBmaWxlcyBvdXRwdXRcIixcclxuXHRkaXNhYmxlV29ya2luZ0xpbmtzOiBmYWxzZSxcclxuXHRkaXJlY3Rvcmllc1RvSWdub3JlOiBbXSxcclxuXHRmaWxlc1RvSWdub3JlOiBbXSxcclxuXHRmaWxlVHlwZXNUb0lnbm9yZTogW10sXHJcblx0bGlua3NUb0lnbm9yZTogW10sXHJcblx0dGFnc1RvSWdub3JlOiBbXSxcclxuXHRmaWxlVHlwZXNUb0RlbGV0ZTogW10sXHJcblx0dW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWU6IFwidW5yZXNvbHZlZCBsaW5rcyBvdXRwdXRcIixcclxuXHR1bnJlc29sdmVkTGlua3NEaXJlY3Rvcmllc1RvSWdub3JlOiBbXSxcclxuXHR1bnJlc29sdmVkTGlua3NGaWxlc1RvSWdub3JlOiBbXSxcclxuXHR1bnJlc29sdmVkTGlua3NGaWxlVHlwZXNUb0lnbm9yZTogW10sXHJcblx0dW5yZXNvbHZlZExpbmtzTGlua3NUb0lnbm9yZTogW10sXHJcblx0dW5yZXNvbHZlZExpbmtzVGFnc1RvSWdub3JlOiBbXSxcclxufTtcclxuaW50ZXJmYWNlIFVucmVzb2x2ZWRMaW5rIHtcclxuXHRsaW5rOiBzdHJpbmc7XHJcblx0ZmlsZXM6IHN0cmluZ1tdO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbmRVbmxpbmtlZEZpbGVzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcclxuXHRzZXR0aW5nczogU2V0dGluZ3M7XHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ2xvYWRpbmcgJyArIHRoaXMubWFuaWZlc3QubmFtZSArIFwiIHBsdWdpblwiKTtcclxuXHRcdGF3YWl0IHRoaXMubG9hZFNldHRpbmdzKCk7XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogJ2ZpbmQtdW5saW5rZWQtZmlsZXMnLFxyXG5cdFx0XHRuYW1lOiAnRmluZCB1bmxpbmtlZCBmaWxlcycsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB0aGlzLmZpbmRVbmxpbmtlZEZpbGVzKCksXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiAnZmluZC11bnJlc29sdmVkLWxpbmsnLFxyXG5cdFx0XHRuYW1lOiAnRmluZCB1bnJlc29sdmVkIGxpbmtzJyxcclxuXHRcdFx0Y2FsbGJhY2s6ICgpID0+IHRoaXMuZmluZFVucmVzb2x2ZWRMaW5rcygpLFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xyXG5cdFx0XHRpZDogXCJkZWxldGUtdW5saW5rZWQtZmlsZXNcIixcclxuXHRcdFx0bmFtZTogXCJEZWxldGUgdW5saW5rZWQgZmlsZXMgd2l0aCBjZXJ0YWluIGV4dGVuc2lvbi4gU2VlIFJFQURNRVwiLFxyXG5cdFx0XHRjYWxsYmFjazogKCkgPT4gdGhpcy5kZWxldGVVbmxpbmtlZEZpbGVzKClcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTZXR0aW5nc1RhYih0aGlzLmFwcCwgdGhpcywgREVGQVVMVF9TRVRUSU5HUykpO1xyXG5cdH1cclxuXHRmaW5kVW5saW5rZWRGaWxlcygpIHtcclxuXHRcdGNvbnN0IG91dEZpbGVOYW1lID0gdGhpcy5zZXR0aW5ncy5vdXRwdXRGaWxlTmFtZSArIFwiLm1kXCI7XHJcblx0XHRsZXQgb3V0RmlsZTogVEZpbGU7XHJcblx0XHRjb25zdCBmaWxlcyA9IHRoaXMuYXBwLnZhdWx0LmdldEZpbGVzKCk7XHJcblx0XHRjb25zdCBtYXJrZG93bkZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG5cdFx0bGV0IGxpbmtzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuXHRcdG1hcmtkb3duRmlsZXMuZm9yRWFjaCgobWFya0ZpbGU6IFRGaWxlKSA9PiB7XHJcblx0XHRcdGlmIChtYXJrRmlsZS5wYXRoID09IG91dEZpbGVOYW1lKSB7XHJcblx0XHRcdFx0b3V0RmlsZSA9IG1hcmtGaWxlO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fSBpdGVyYXRlQ2FjaGVSZWZzKHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKG1hcmtGaWxlKSwgY2IgPT4ge1xyXG5cdFx0XHRcdGxldCB0eHQgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpcnN0TGlua3BhdGhEZXN0KGdldExpbmtwYXRoKGNiLmxpbmspLCBtYXJrRmlsZS5wYXRoKTtcclxuXHRcdFx0XHRpZiAodHh0ICE9IG51bGwpXHJcblx0XHRcdFx0XHRsaW5rcy5wdXNoKHR4dC5wYXRoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHRcdGNvbnN0IG5vdExpbmtlZEZpbGVzID0gZmlsZXMuZmlsdGVyKChmaWxlKSA9PiB0aGlzLmlzVmFsaWQoZmlsZSwgbGlua3MpKTtcclxuXHRcdG5vdExpbmtlZEZpbGVzLnJlbW92ZShvdXRGaWxlKTtcclxuXHJcblxyXG5cdFx0bGV0IHRleHQgPSBcIlwiO1xyXG5cdFx0bGV0IHByZWZpeDogc3RyaW5nO1xyXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MuZGlzYWJsZVdvcmtpbmdMaW5rcylcclxuXHRcdFx0cHJlZml4ID0gXCJcdFwiO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRwcmVmaXggPSBcIlwiO1xyXG5cdFx0bm90TGlua2VkRmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG5cdFx0XHR0ZXh0ICs9IHByZWZpeCArIFwiLSBbW1wiICsgdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChmaWxlLCBcIi9cIikgKyBcIl1dXFxuXCI7XHJcblx0XHR9KTtcclxuXHRcdFV0aWxzLndyaXRlQW5kT3BlbkZpbGUodGhpcy5hcHAsIG91dEZpbGVOYW1lLCB0ZXh0KTtcclxuXHJcblx0fVxyXG5cdGRlbGV0ZVVubGlua2VkRmlsZXMoKSB7XHJcblx0XHRjb25zdCBsaW5rcyA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Q2FjaGUodGhpcy5zZXR0aW5ncy5vdXRwdXRGaWxlTmFtZSArIFwiLm1kXCIpPy5saW5rcyA/PyBbXTtcclxuXHRcdGNvbnN0IGZpbGVzVG9EZWxldGU6IFRGaWxlW10gPSBbXTtcclxuXHRcdGxpbmtzLmZvckVhY2goKGxpbmspID0+IHtcclxuXHRcdFx0Y29uc3QgZmlsZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QobGluay5saW5rLCBcIi9cIik7XHJcblx0XHRcdGlmICghZmlsZSlcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdGlmICh0aGlzLnNldHRpbmdzLmZpbGVUeXBlc1RvRGVsZXRlLmNvbnRhaW5zKGZpbGUuZXh0ZW5zaW9uKSkge1xyXG5cdFx0XHRcdGZpbGVzVG9EZWxldGUucHVzaChmaWxlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRpZiAoZmlsZXNUb0RlbGV0ZS5sZW5ndGggPiAwKVxyXG5cdFx0XHRuZXcgRGVsZXRlRmlsZXNNb2RhbCh0aGlzLmFwcCwgZmlsZXNUb0RlbGV0ZSkub3BlbigpO1xyXG5cdH1cclxuXHRmaW5kVW5yZXNvbHZlZExpbmtzKCkge1xyXG5cdFx0Y29uc3Qgb3V0RmlsZU5hbWUgPSB0aGlzLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc091dHB1dEZpbGVOYW1lICsgXCIubWRcIjtcclxuXHRcdGNvbnN0IGxpbmtzOiBVbnJlc29sdmVkTGlua1tdID0gW107XHJcblx0XHRjb25zdCB1bnJlc29sdmVkTGlua3MgPSB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLnVucmVzb2x2ZWRMaW5rcztcclxuXHJcblx0XHRmb3IgKGxldCBmaWxlUGF0aCBpbiB1bnJlc29sdmVkTGlua3MpIHtcclxuXHRcdFx0aWYgKGZpbGVQYXRoID09IHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzT3V0cHV0RmlsZU5hbWUgKyBcIi5tZFwiKSBjb250aW51ZTtcclxuXHJcblx0XHRcdGNvbnN0IGZpbGVUeXBlID0gZmlsZVBhdGguc3Vic3RyaW5nKGZpbGVQYXRoLmxhc3RJbmRleE9mKFwiLlwiKSArIDEpO1xyXG5cclxuXHRcdFx0Y29uc3QgdXRpbHMgPSBuZXcgVXRpbHMoXHJcblx0XHRcdFx0dGhpcy5hcHAsXHJcblx0XHRcdFx0ZmlsZVBhdGgsXHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NUYWdzVG9JZ25vcmUsXHJcblx0XHRcdFx0dGhpcy5zZXR0aW5ncy51bnJlc29sdmVkTGlua3NMaW5rc1RvSWdub3JlLFxyXG5cdFx0XHRcdHRoaXMuc2V0dGluZ3MudW5yZXNvbHZlZExpbmtzRGlyZWN0b3JpZXNUb0lnbm9yZSxcclxuXHRcdFx0XHR0aGlzLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0ZpbGVzVG9JZ25vcmVcclxuXHRcdFx0KTtcclxuXHRcdFx0aWYgKCF1dGlscy5pc1ZhbGlkKCkpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0Zm9yIChjb25zdCBsaW5rIGluIHVucmVzb2x2ZWRMaW5rc1tmaWxlUGF0aF0pIHtcclxuXHRcdFx0XHRjb25zdCBsaW5rRmlsZVR5cGUgPSBsaW5rLnN1YnN0cmluZyhsaW5rLmxhc3RJbmRleE9mKFwiLlwiKSArIDEpO1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGxpbmtGaWxlVHlwZSk7XHJcblxyXG5cdFx0XHRcdGlmICh0aGlzLnNldHRpbmdzLnVucmVzb2x2ZWRMaW5rc0ZpbGVUeXBlc1RvSWdub3JlLmNvbnRhaW5zKGxpbmtGaWxlVHlwZSkpIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0XHRsZXQgZm9ybWF0dGVkRmlsZVBhdGggPSBmaWxlUGF0aDtcclxuXHRcdFx0XHRpZiAoZmlsZVR5cGUgPT0gXCJtZFwiKSB7XHJcblx0XHRcdFx0XHRmb3JtYXR0ZWRGaWxlUGF0aCA9IGZpbGVQYXRoLnN1YnN0cmluZygwLCBmaWxlUGF0aC5sYXN0SW5kZXhPZihcIi5tZFwiKSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNvbnN0IHVucmVzb2x2ZWRMaW5rOiBVbnJlc29sdmVkTGluayA9IHsgZmlsZXM6IFtmb3JtYXR0ZWRGaWxlUGF0aF0sIGxpbms6IGxpbmsgfTtcclxuXHRcdFx0XHRpZiAobGlua3MuY29udGFpbnModW5yZXNvbHZlZExpbmspKVxyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0Y29uc3QgZHVwbGljYXRpb24gPSBsaW5rcy5maW5kKChlKSA9PiBlLmxpbmsgPT0gbGluayk7XHJcblx0XHRcdFx0aWYgKGR1cGxpY2F0aW9uKSB7XHJcblx0XHRcdFx0XHRkdXBsaWNhdGlvbi5maWxlcy5wdXNoKGZvcm1hdHRlZEZpbGVQYXRoKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0bGlua3MucHVzaCh1bnJlc29sdmVkTGluayk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRVdGlscy53cml0ZUFuZE9wZW5GaWxlKFxyXG5cdFx0XHR0aGlzLmFwcCxcclxuXHRcdFx0b3V0RmlsZU5hbWUsXHJcblx0XHRcdFtcclxuXHRcdFx0XHRcIkRvbid0IGZvcmdldCB0aGF0IGNyZWF0aW5nIHRoZSBmaWxlIGZyb20gaGVyZSBtYXkgY3JlYXRlIHRoZSBmaWxlIGluIHRoZSB3cm9uZyBkaXJlY3RvcnkhXCIsXHJcblx0XHRcdFx0Li4ubGlua3MubWFwKChlKSA9PiBgLSBbWyR7ZS5saW5rfV1dIGluIFtbJHtlLmZpbGVzLmpvaW4oXCJdXSwgW1tcIil9XV1gKVxyXG5cdFx0XHRdLmpvaW4oXCJcXG5cIikpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gZmlsZSBpbiBhbiB1bmxpbmtlZCBmaWxlXHJcblx0ICogXHJcblx0ICogQHBhcmFtIGZpbGUgZmlsZSB0byBjaGVja1xyXG5cdCAqIEBwYXJhbSBsaW5rcyBhbGwgbGlua3MgaW4gdGhlIHZhdWx0XHJcblx0ICovXHJcblx0aXNWYWxpZChmaWxlOiBURmlsZSwgbGlua3M6IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcblx0XHRpZiAobGlua3MuY29udGFpbnMoZmlsZS5wYXRoKSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdC8vZmlsZXR5cGVzIHRvIGlnbm9yZSBieSBkZWZhdWx0XHJcblx0XHRpZiAoZmlsZS5leHRlbnNpb24gPT0gXCJjc3NcIilcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmZpbGVUeXBlc1RvSWdub3JlLmNvbnRhaW5zKGZpbGUuZXh0ZW5zaW9uKSlcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHJcblx0XHRjb25zdCB1dGlscyA9IG5ldyBVdGlscyhcclxuXHRcdFx0dGhpcy5hcHAsXHJcblx0XHRcdGZpbGUucGF0aCxcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy50YWdzVG9JZ25vcmUsXHJcblx0XHRcdHRoaXMuc2V0dGluZ3MubGlua3NUb0lnbm9yZSxcclxuXHRcdFx0dGhpcy5zZXR0aW5ncy5kaXJlY3Rvcmllc1RvSWdub3JlLFxyXG5cdFx0XHR0aGlzLnNldHRpbmdzLmZpbGVzVG9JZ25vcmUsXHJcblx0XHQpO1xyXG5cdFx0aWYgKCF1dGlscy5pc1ZhbGlkKCkpXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0b251bmxvYWQoKSB7XHJcblx0XHRjb25zb2xlLmxvZygndW5sb2FkaW5nICcgKyB0aGlzLm1hbmlmZXN0Lm5hbWUgKyBcIiBwbHVnaW5cIik7XHJcblx0fVxyXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG5cdH1cclxufVxyXG4iXSwibmFtZXMiOlsiTW9kYWwiLCJub3JtYWxpemVQYXRoIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJnZXRBbGxUYWdzIiwiaXRlcmF0ZUNhY2hlUmVmcyIsImdldExpbmtwYXRoIiwiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLElBQUksT0FBTyxDQUFDLEtBQUssVUFBVSxJQUFJLENBQUMsS0FBSyxJQUFJO0FBQzdDLFFBQVEsTUFBTSxJQUFJLFNBQVMsQ0FBQyxzQkFBc0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsK0JBQStCLENBQUMsQ0FBQztBQUNsRyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxF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
