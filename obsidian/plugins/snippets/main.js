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

const DEFAULT_VARIANTS = {
    'python': {
        template: 'python3 -c "{{src}}"',
        showModal: true,
        appendOutputContents: true,
        showRunButtonInPreview: true,
    },
    'sh': {
        template: '{{src}}',
        showModal: true,
        appendOutputContents: true,
        showRunButtonInPreview: true,
    }
};

var consts = {
    variants: DEFAULT_VARIANTS
};

function extract(src, lineNumber, variants = consts.variants) {

    function is(line, target) {
        let str = line.trim();
        return str.toUpperCase() === target.toUpperCase();
    }

    let lines = src.split('\n');
    let begin = null;
    let end = null;
    let lang = null;

    function fenceOpeningWithKey(line) {
        for (var key of Object.keys(variants)) {
            if (is(line, '```' + key)) {
                return key
            }
        }
        return null
    }


    for (let i = lineNumber; i >= 0; i--) {

        let key = fenceOpeningWithKey(lines[i]);
        if (key) {
            begin = i;
            lang = key;
            break
        } else if (i !== lineNumber && is(lines[i], '```')) {
            begin = null;
            lang = null;
            break
        }
    }

    for (let i = lineNumber; i < lines.length; i++) {
        if (i !== begin && is(lines[i], '```')) {
            end = i;
            break
        }
    }

    if ((begin != null) && (end != null)) {
        return {
            lang: lang,
            text: lines.slice(begin + 1, end).join('\n'),
            begin: begin,
            end: end,
        };
    }
    return null

}

var extract_1 = extract;

var path = require('path');
var DEFAULT_SETTINGS = {
    variants: consts.variants
};
var RunSnippets = /** @class */ (function (_super) {
    __extends(RunSnippets, _super);
    function RunSnippets(app, pluginManifest) {
        return _super.call(this, app, pluginManifest) || this;
    }
    RunSnippets.prototype.loadSettings = function () {
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
    RunSnippets.prototype.saveSettings = function () {
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
    RunSnippets.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Loading Snippets-plugin");
                        return [4 /*yield*/, this.loadSettings()];
                    case 1:
                        _a.sent();
                        this.addSettingTab(new RunSnippetsSettingsTab(this.app, this));
                        this.addCommand({
                            id: "snippets-plugin",
                            name: "Run",
                            callback: function () { return _this.runSnippet(); },
                            hotkeys: [
                                {
                                    modifiers: ["Mod", "Shift"],
                                    key: "Enter",
                                },
                            ],
                        });
                        this.registerInterval(window.setInterval(this.injectButtons.bind(this), 1000));
                        return [2 /*return*/];
                }
            });
        });
    };
    RunSnippets.prototype.injectButtons = function () {
        this.addRunButtons();
    };
    RunSnippets.prototype.get_vars = function () {
        var active_view = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
        if (active_view == null) {
            throw new Error("Active view is null");
        }
        var vaultPath = this.app.vault.adapter.basePath;
        var folder = active_view.file.parent.path;
        var fileName = active_view.file.name;
        return {
            vault_path: vaultPath,
            folder: folder,
            file_name: fileName,
            file_path: path.join(vaultPath, folder, fileName),
            python: 'python3 -c'
        };
    };
    /**
     * Adds buttons for the preview mode
     */
    RunSnippets.prototype.addRunButtons = function () {
        var vars = this.get_vars();
        var variants = this.settings.variants;
        document.querySelectorAll("pre > code").forEach(function (codeBlock) {
            var pre = codeBlock.parentNode;
            var hasButton = pre.parentNode.classList.contains("has-run-button");
            // Already has a button
            if (hasButton) {
                return;
            }
            function definedVariant(classList, variants) {
                for (var _i = 0, _a = Object.keys(variants); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (classList.contains("language-" + key)) {
                        return key;
                    }
                }
                return null;
            }
            var lang = definedVariant(pre.classList, variants);
            // No variant defined for this language
            if (lang == null) {
                return;
            }
            // @ts-ignore
            var variant = variants[lang];
            // Not active in preview
            if (!variant.showRunButtonInPreview) {
                return;
            }
            pre.parentNode.classList.add("has-run-button");
            var button = document.createElement("button");
            button.className = "run-code-button";
            button.type = "button";
            button.innerText = "Run";
            var src = codeBlock.innerText;
            var command = apply_template(src, variant.template, vars);
            function runCommand(command) {
                var exec = require("child_process").exec;
                button.innerText = "Running";
                exec(command, function (error, stdout, stderr) {
                    if (error) {
                        console.error("error: " + error.message);
                        if (variant.showModal) {
                            new obsidian.Notice(error.message);
                        }
                        button.innerText = "error";
                        return;
                    }
                    if (stderr) {
                        console.error("stderr: " + stderr);
                        if (variant.showModal) {
                            new obsidian.Notice(stderr);
                        }
                        button.innerText = "error";
                        return;
                    }
                    console.debug("stdout: " + stdout);
                    if (variant.showModal) {
                        new obsidian.Notice(stdout);
                    }
                    button.innerText = "Run";
                });
            }
            button.addEventListener("click", function () {
                runCommand(command);
            });
            pre.appendChild(button);
        });
    };
    /**
     * rus a snippet, when the cursor is on top of it
     */
    RunSnippets.prototype.runSnippet = function () {
        var vars = this.get_vars();
        var variants = this.settings.variants;
        var view = this.app.workspace.activeLeaf.view;
        if (view instanceof obsidian.MarkdownView) {
            var editor_1 = view.sourceMode.cmEditor;
            var document_1 = editor_1.getDoc().getValue();
            var line = editor_1.getCursor().line;
            var match = extract_1(document_1, line, variants);
            if (match !== null) {
                var targetLine_1 = match.end + 1;
                var lang = match.lang;
                // @ts-ignore
                var variant_1 = variants[lang];
                var command = apply_template(match.text, variant_1.template, vars);
                var exec = require("child_process").exec;
                exec(command, function (error, stdout, stderr) {
                    if (error) {
                        console.error("error: " + error.message);
                        if (variant_1.appendOutputContents) {
                            writeResult(editor_1, error, targetLine_1);
                        }
                        if (variant_1.showModal) {
                            new obsidian.Notice(error.message);
                        }
                        return;
                    }
                    if (stderr) {
                        console.error("stderr: " + stderr);
                        if (variant_1.appendOutputContents) {
                            writeResult(editor_1, stderr, targetLine_1);
                        }
                        if (variant_1.showModal) {
                            new obsidian.Notice(stderr);
                        }
                        return;
                    }
                    console.debug("stdout: " + stdout);
                    if (variant_1.appendOutputContents) {
                        writeResult(editor_1, stdout, targetLine_1);
                    }
                    if (variant_1.showModal) {
                        new obsidian.Notice(stdout);
                    }
                });
            }
        }
    };
    return RunSnippets;
}(obsidian.Plugin));
function writeResult(editor, result, outputLine) {
    var output = "\n```output\n" + result + "    \n```\n";
    editor.getDoc().replaceRange(output, { line: outputLine, ch: 0 });
}
function apply_template(src, template, vars) {
    var result = template.replace('{{src}}', src);
    result = result.replace('{{vault_path}}', vars.vault_path);
    result = result.replace('{{folder}}', vars.folder);
    result = result.replace('{{file_name}}', vars.file_name);
    result = result.replace('{{file_path}}', vars.file_path);
    return result;
}
var RunSnippetsSettingsTab = /** @class */ (function (_super) {
    __extends(RunSnippetsSettingsTab, _super);
    function RunSnippetsSettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    RunSnippetsSettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var settings = this.plugin.settings;
        containerEl.empty();
        this.containerEl.createEl("h3", {
            text: "Snippets",
        });
        new obsidian.Setting(containerEl)
            .setName('Code fences')
            .setDesc('config for each language')
            .addTextArea(function (text) {
            text
                .setPlaceholder(JSON.stringify(consts.variants, null, 2))
                .setValue(JSON.stringify(_this.plugin.settings.variants, null, 2) || '')
                .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                var newValue, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            newValue = JSON.parse(value);
                            this.plugin.settings.variants = newValue;
                            return [4 /*yield*/, this.plugin.saveSettings()];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            text.inputEl.rows = 12;
            text.inputEl.cols = 60;
        });
        this.containerEl.createEl("h4", {
            text: "This plugin is experimental",
        });
    };
    return RunSnippetsSettingsTab;
}(obsidian.PluginSettingTab));

module.exports = RunSnippets;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9jb25zdHMuanMiLCJzcmMvZXh0cmFjdC5qcyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBmdW5jdGlvbigpIHtcclxuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3Jlc3QocywgZSkge1xyXG4gICAgdmFyIHQgPSB7fTtcclxuICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSAmJiBlLmluZGV4T2YocCkgPCAwKVxyXG4gICAgICAgIHRbcF0gPSBzW3BdO1xyXG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBwID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzKTsgaSA8IHAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDAgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHMsIHBbaV0pKVxyXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICAgICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2NyZWF0ZUJpbmRpbmcgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xyXG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIG9bazJdID0gbVtrXTtcclxufSk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIG8pIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobywgcCkpIF9fY3JlYXRlQmluZGluZyhvLCBtLCBwKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHByaXZhdGVNYXApIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBnZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcHJpdmF0ZU1hcC5nZXQocmVjZWl2ZXIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZFNldChyZWNlaXZlciwgcHJpdmF0ZU1hcCwgdmFsdWUpIHtcclxuICAgIGlmICghcHJpdmF0ZU1hcC5oYXMocmVjZWl2ZXIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcImF0dGVtcHRlZCB0byBzZXQgcHJpdmF0ZSBmaWVsZCBvbiBub24taW5zdGFuY2VcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlTWFwLnNldChyZWNlaXZlciwgdmFsdWUpO1xyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbiIsImNvbnN0IERFRkFVTFRfVkFSSUFOVFMgPSB7XG4gICAgJ3B5dGhvbic6IHtcbiAgICAgICAgdGVtcGxhdGU6ICdweXRob24zIC1jIFwie3tzcmN9fVwiJyxcbiAgICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgICAgICBhcHBlbmRPdXRwdXRDb250ZW50czogdHJ1ZSxcbiAgICAgICAgc2hvd1J1bkJ1dHRvbkluUHJldmlldzogdHJ1ZSxcbiAgICB9LFxuICAgICdzaCc6IHtcbiAgICAgICAgdGVtcGxhdGU6ICd7e3NyY319JyxcbiAgICAgICAgc2hvd01vZGFsOiB0cnVlLFxuICAgICAgICBhcHBlbmRPdXRwdXRDb250ZW50czogdHJ1ZSxcbiAgICAgICAgc2hvd1J1bkJ1dHRvbkluUHJldmlldzogdHJ1ZSxcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHZhcmlhbnRzOiBERUZBVUxUX1ZBUklBTlRTXG59XG4iLCJjb25zdCBERUZBVUxUID0gcmVxdWlyZSgnLi9jb25zdHMnKTtcblxuZnVuY3Rpb24gZXh0cmFjdChzcmMsIGxpbmVOdW1iZXIsIHZhcmlhbnRzID0gREVGQVVMVC52YXJpYW50cykge1xuXG4gICAgZnVuY3Rpb24gaXMobGluZSwgdGFyZ2V0KSB7XG4gICAgICAgIGxldCBzdHIgPSBsaW5lLnRyaW0oKVxuICAgICAgICByZXR1cm4gc3RyLnRvVXBwZXJDYXNlKCkgPT09IHRhcmdldC50b1VwcGVyQ2FzZSgpO1xuICAgIH1cblxuICAgIGxldCBsaW5lcyA9IHNyYy5zcGxpdCgnXFxuJylcbiAgICBsZXQgYmVnaW4gPSBudWxsXG4gICAgbGV0IGVuZCA9IG51bGxcbiAgICBsZXQgbGFuZyA9IG51bGxcblxuICAgIGZ1bmN0aW9uIGZlbmNlT3BlbmluZ1dpdGhLZXkobGluZSkge1xuICAgICAgICBmb3IgKHZhciBrZXkgb2YgT2JqZWN0LmtleXModmFyaWFudHMpKSB7XG4gICAgICAgICAgICBpZiAoaXMobGluZSwgJ2BgYCcgKyBrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuXG5cbiAgICBmb3IgKGxldCBpID0gbGluZU51bWJlcjsgaSA+PSAwOyBpLS0pIHtcblxuICAgICAgICBsZXQga2V5ID0gZmVuY2VPcGVuaW5nV2l0aEtleShsaW5lc1tpXSlcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgYmVnaW4gPSBpO1xuICAgICAgICAgICAgbGFuZyA9IGtleVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfSBlbHNlIGlmIChpICE9PSBsaW5lTnVtYmVyICYmIGlzKGxpbmVzW2ldLCAnYGBgJykpIHtcbiAgICAgICAgICAgIGJlZ2luID0gbnVsbFxuICAgICAgICAgICAgbGFuZyA9IG51bGxcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gbGluZU51bWJlcjsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpICE9PSBiZWdpbiAmJiBpcyhsaW5lc1tpXSwgJ2BgYCcpKSB7XG4gICAgICAgICAgICBlbmQgPSBpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICgoYmVnaW4gIT0gbnVsbCkgJiYgKGVuZCAhPSBudWxsKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGFuZzogbGFuZyxcbiAgICAgICAgICAgIHRleHQ6IGxpbmVzLnNsaWNlKGJlZ2luICsgMSwgZW5kKS5qb2luKCdcXG4nKSxcbiAgICAgICAgICAgIGJlZ2luOiBiZWdpbixcbiAgICAgICAgICAgIGVuZDogZW5kLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0cmFjdFxuIiwiaW1wb3J0IFwiLi9zdHlsZXMuc2Nzc1wiO1xuXG52YXIgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGV4dHJhY3QgZnJvbSBcIi4vZXh0cmFjdFwiXG5cbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBydW5uZXIgZnJvbSBcIi4vcnVubmVyXCJcblxuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IERFRkFVTFQgZnJvbSBcIi4vY29uc3RzXCJcblxuaW1wb3J0IHtcbiAgICBQbHVnaW4sXG4gICAgUGx1Z2luTWFuaWZlc3QsXG4gICAgTWFya2Rvd25WaWV3LFxuICAgIEFwcCxcbiAgICBNb2RhbCxcbiAgICBOb3RpY2UsXG4gICAgUGx1Z2luU2V0dGluZ1RhYixcbiAgICBTZXR0aW5nLFxufSBmcm9tIFwib2JzaWRpYW5cIjtcblxuXG5pbnRlcmZhY2UgUnVuU25pcHBldHNTZXR0aW5ncyB7XG4gICAgdmFyaWFudHM6IHN0cmluZztcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogUnVuU25pcHBldHNTZXR0aW5ncyA9IHtcbiAgICB2YXJpYW50czogREVGQVVMVC52YXJpYW50c1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1blNuaXBwZXRzIGV4dGVuZHMgUGx1Z2luIHtcbiAgICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luTWFuaWZlc3Q6IFBsdWdpbk1hbmlmZXN0KSB7XG4gICAgICAgIHN1cGVyKGFwcCwgcGx1Z2luTWFuaWZlc3QpO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcbiAgICB9XG5cbiAgICBhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgLy8gVGhpcyBmaWVsZCBzdG9yZXMgeW91ciBwbHVnaW4gc2V0dGluZ3MuXG4gICAgc2V0dGluZ3M6IFJ1blNuaXBwZXRzU2V0dGluZ3M7XG5cbiAgICBhc3luYyBvbmxvYWQoKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJMb2FkaW5nIFNuaXBwZXRzLXBsdWdpblwiKTtcbiAgICAgICAgYXdhaXQgdGhpcy5sb2FkU2V0dGluZ3MoKTtcblxuICAgICAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IFJ1blNuaXBwZXRzU2V0dGluZ3NUYWIodGhpcy5hcHAsIHRoaXMpKTtcblxuICAgICAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgICAgICAgaWQ6IFwic25pcHBldHMtcGx1Z2luXCIsXG4gICAgICAgICAgICBuYW1lOiBcIlJ1blwiLFxuICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHRoaXMucnVuU25pcHBldCgpLFxuICAgICAgICAgICAgaG90a2V5czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbXCJNb2RcIiwgXCJTaGlmdFwiXSxcbiAgICAgICAgICAgICAgICAgICAga2V5OiBcIkVudGVyXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVnaXN0ZXJJbnRlcnZhbChcbiAgICAgICAgICAgIHdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLmluamVjdEJ1dHRvbnMuYmluZCh0aGlzKSwgMTAwMClcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBpbmplY3RCdXR0b25zKCkge1xuICAgICAgICB0aGlzLmFkZFJ1bkJ1dHRvbnMoKTtcbiAgICB9XG5cbiAgICBnZXRfdmFycygpOiBQcm9taXNlPFN0cmluZz4ge1xuICAgICAgICBsZXQgYWN0aXZlX3ZpZXcgPSBhcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcbiAgICAgICAgaWYgKGFjdGl2ZV92aWV3ID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkFjdGl2ZSB2aWV3IGlzIG51bGxcIik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdmF1bHRQYXRoID0gdGhpcy5hcHAudmF1bHQuYWRhcHRlci5iYXNlUGF0aDtcbiAgICAgICAgbGV0IGZvbGRlciA9IGFjdGl2ZV92aWV3LmZpbGUucGFyZW50LnBhdGg7XG4gICAgICAgIGxldCBmaWxlTmFtZSA9IGFjdGl2ZV92aWV3LmZpbGUubmFtZVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YXVsdF9wYXRoOiB2YXVsdFBhdGgsXG4gICAgICAgICAgICBmb2xkZXI6IGZvbGRlcixcbiAgICAgICAgICAgIGZpbGVfbmFtZTogZmlsZU5hbWUsXG4gICAgICAgICAgICBmaWxlX3BhdGg6IHBhdGguam9pbih2YXVsdFBhdGgsIGZvbGRlciwgZmlsZU5hbWUpLFxuICAgICAgICAgICAgcHl0aG9uOiAncHl0aG9uMyAtYydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYnV0dG9ucyBmb3IgdGhlIHByZXZpZXcgbW9kZVxuICAgICAqL1xuICAgIGFkZFJ1bkJ1dHRvbnMoKSB7XG5cblxuICAgICAgICBsZXQgdmFycyA9IHRoaXMuZ2V0X3ZhcnMoKTtcbiAgICAgICAgbGV0IHZhcmlhbnRzID0gdGhpcy5zZXR0aW5ncy52YXJpYW50c1xuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJwcmUgPiBjb2RlXCIpLmZvckVhY2goZnVuY3Rpb24gKGNvZGVCbG9jaykge1xuICAgICAgICAgICAgY29uc3QgcHJlID0gY29kZUJsb2NrLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBsZXQgaGFzQnV0dG9uID0gcHJlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGFzLXJ1bi1idXR0b25cIik7XG5cbiAgICAgICAgICAgIC8vIEFscmVhZHkgaGFzIGEgYnV0dG9uXG4gICAgICAgICAgICBpZiAoaGFzQnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBkZWZpbmVkVmFyaWFudChjbGFzc0xpc3QsIHZhcmlhbnRzKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IG9mIE9iamVjdC5rZXlzKHZhcmlhbnRzKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKGBsYW5ndWFnZS0ke2tleX1gKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGxhbmcgPSBkZWZpbmVkVmFyaWFudChwcmUuY2xhc3NMaXN0LCB2YXJpYW50cylcblxuICAgICAgICAgICAgLy8gTm8gdmFyaWFudCBkZWZpbmVkIGZvciB0aGlzIGxhbmd1YWdlXG4gICAgICAgICAgICBpZiAobGFuZyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgbGV0IHZhcmlhbnQgPSB2YXJpYW50c1tsYW5nXVxuXG4gICAgICAgICAgICAvLyBOb3QgYWN0aXZlIGluIHByZXZpZXdcbiAgICAgICAgICAgIGlmICghdmFyaWFudC5zaG93UnVuQnV0dG9uSW5QcmV2aWV3KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwcmUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKFwiaGFzLXJ1bi1idXR0b25cIik7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSBcInJ1bi1jb2RlLWJ1dHRvblwiO1xuICAgICAgICAgICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgICAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwiUnVuXCI7XG5cbiAgICAgICAgICAgIGxldCBzcmMgPSBjb2RlQmxvY2suaW5uZXJUZXh0O1xuXG4gICAgICAgICAgICBsZXQgY29tbWFuZCA9IGFwcGx5X3RlbXBsYXRlKHNyYywgdmFyaWFudC50ZW1wbGF0ZSwgdmFycylcblxuICAgICAgICAgICAgZnVuY3Rpb24gcnVuQ29tbWFuZChjb21tYW5kOiBzdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7ZXhlY30gPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcbiAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJSdW5uaW5nXCI7XG4gICAgICAgICAgICAgICAgZXhlYyhjb21tYW5kLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgZXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYW50LnNob3dNb2RhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2UoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJlcnJvclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHN0ZGVycjogJHtzdGRlcnJ9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFudC5zaG93TW9kYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHN0ZGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJlcnJvclwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoYHN0ZG91dDogJHtzdGRvdXR9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhbnQuc2hvd01vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKHN0ZG91dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwiUnVuXCI7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bkNvbW1hbmQoY29tbWFuZCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJlLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJ1cyBhIHNuaXBwZXQsIHdoZW4gdGhlIGN1cnNvciBpcyBvbiB0b3Agb2YgaXRcbiAgICAgKi9cbiAgICBydW5TbmlwcGV0KCkge1xuICAgICAgICBsZXQgdmFycyA9IHRoaXMuZ2V0X3ZhcnMoKTtcbiAgICAgICAgbGV0IHZhcmlhbnRzID0gdGhpcy5zZXR0aW5ncy52YXJpYW50c1xuXG4gICAgICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3O1xuICAgICAgICBpZiAodmlldyBpbnN0YW5jZW9mIE1hcmtkb3duVmlldykge1xuXG4gICAgICAgICAgICBjb25zdCBlZGl0b3IgPSB2aWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XG5cbiAgICAgICAgICAgIGxldCBkb2N1bWVudCA9IGVkaXRvci5nZXREb2MoKS5nZXRWYWx1ZSgpXG4gICAgICAgICAgICBsZXQgbGluZSA9IGVkaXRvci5nZXRDdXJzb3IoKS5saW5lXG5cbiAgICAgICAgICAgIGxldCBtYXRjaCA9IGV4dHJhY3QoZG9jdW1lbnQsIGxpbmUsIHZhcmlhbnRzKVxuXG4gICAgICAgICAgICBpZiAobWF0Y2ggIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0TGluZSA9IG1hdGNoLmVuZCArIDFcbiAgICAgICAgICAgICAgICBsZXQgbGFuZyA9IG1hdGNoLmxhbmdcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgbGV0IHZhcmlhbnQgPSB2YXJpYW50c1tsYW5nXVxuICAgICAgICAgICAgICAgIGxldCBjb21tYW5kID0gYXBwbHlfdGVtcGxhdGUobWF0Y2gudGV4dCwgdmFyaWFudC50ZW1wbGF0ZSwgdmFycylcblxuICAgICAgICAgICAgICAgIGNvbnN0IHtleGVjfSA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuICAgICAgICAgICAgICAgIGV4ZWMoY29tbWFuZCwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFudC5hcHBlbmRPdXRwdXRDb250ZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlUmVzdWx0KGVkaXRvciwgZXJyb3IsIHRhcmdldExpbmUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFudC5zaG93TW9kYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgTm90aWNlKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYHN0ZGVycjogJHtzdGRlcnJ9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFudC5hcHBlbmRPdXRwdXRDb250ZW50cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRlUmVzdWx0KGVkaXRvciwgc3RkZXJyLCB0YXJnZXRMaW5lKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhcmlhbnQuc2hvd01vZGFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IE5vdGljZShzdGRlcnIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoYHN0ZG91dDogJHtzdGRvdXR9YCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YXJpYW50LmFwcGVuZE91dHB1dENvbnRlbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cml0ZVJlc3VsdChlZGl0b3IsIHN0ZG91dCwgdGFyZ2V0TGluZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFyaWFudC5zaG93TW9kYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBOb3RpY2Uoc3Rkb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHdyaXRlUmVzdWx0KGVkaXRvciwgcmVzdWx0OiBzdHJpbmcsIG91dHB1dExpbmU6IG51bWJlcikge1xuXG4gICAgbGV0IG91dHB1dCA9IGBcXG5cXGBcXGBcXGBvdXRwdXRcbiR7cmVzdWx0fSAgICBcblxcYFxcYFxcYFxuYFxuICAgIGVkaXRvci5nZXREb2MoKS5yZXBsYWNlUmFuZ2Uob3V0cHV0LCB7bGluZTogb3V0cHV0TGluZSwgY2g6IDB9KTtcblxufVxuXG5mdW5jdGlvbiBhcHBseV90ZW1wbGF0ZShzcmM6IHN0cmluZywgdGVtcGxhdGU6IHN0cmluZywgdmFyczogb2JqZWN0KSB7XG4gICAgbGV0IHJlc3VsdCA9IHRlbXBsYXRlLnJlcGxhY2UoJ3t7c3JjfX0nLCBzcmMpXG4gICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoJ3t7dmF1bHRfcGF0aH19JywgdmFycy52YXVsdF9wYXRoKVxuICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKCd7e2ZvbGRlcn19JywgdmFycy5mb2xkZXIpXG4gICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UoJ3t7ZmlsZV9uYW1lfX0nLCB2YXJzLmZpbGVfbmFtZSlcbiAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZSgne3tmaWxlX3BhdGh9fScsIHZhcnMuZmlsZV9wYXRoKVxuICAgIHJldHVybiByZXN1bHRcbn1cblxuXG5jbGFzcyBSdW5TbmlwcGV0c1NldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gICAgcGx1Z2luOiBSdW5TbmlwcGV0cztcblxuICAgIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IFJ1blNuaXBwZXRzKSB7XG4gICAgICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcbiAgICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cbiAgICB9XG5cbiAgICBkaXNwbGF5KCk6IHZvaWQge1xuICAgICAgICBjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcbiAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB0aGlzLnBsdWdpbi5zZXR0aW5ncztcbiAgICAgICAgY29udGFpbmVyRWwuZW1wdHkoKTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDNcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJTbmlwcGV0c1wiLFxuICAgICAgICB9KTtcblxuXG4gICAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAgICAgLnNldE5hbWUoJ0NvZGUgZmVuY2VzJylcbiAgICAgICAgICAgIC5zZXREZXNjKCdjb25maWcgZm9yIGVhY2ggbGFuZ3VhZ2UnKVxuICAgICAgICAgICAgLmFkZFRleHRBcmVhKHRleHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0UGxhY2Vob2xkZXIoSlNPTi5zdHJpbmdpZnkoREVGQVVMVC52YXJpYW50cywgbnVsbCwgMikpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0VmFsdWUoSlNPTi5zdHJpbmdpZnkodGhpcy5wbHVnaW4uc2V0dGluZ3MudmFyaWFudHMsIG51bGwsIDIpIHx8ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnZhcmlhbnRzID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIHRleHQuaW5wdXRFbC5yb3dzID0gMTI7XG4gICAgICAgICAgICAgICAgICAgIHRleHQuaW5wdXRFbC5jb2xzID0gNjA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lckVsLmNyZWF0ZUVsKFwiaDRcIiwge1xuICAgICAgICAgICAgdGV4dDogXCJUaGlzIHBsdWdpbiBpcyBleHBlcmltZW50YWxcIixcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cbiJdLCJuYW1lcyI6WyJERUZBVUxUIiwiTWFya2Rvd25WaWV3IiwiTm90aWNlIiwiZXh0cmFjdCIsIlBsdWdpbiIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FB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
