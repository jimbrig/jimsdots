'use strict';

var obsidian = require('obsidian');
var path = require('path');
var os = require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var obsidian__default = /*#__PURE__*/_interopDefaultLegacy(obsidian);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

const DEFAULT_WEEK_FORMAT = "gggg-[W]ww";
const DEFAULT_WORDS_PER_DOT = 250;
const VIEW_TYPE_CALENDAR = "calendar";
const TRIGGER_ON_OPEN = "calendar:open";

var DEFAULT_DAILY_NOTE_FORMAT = "YYYY-MM-DD";
var DEFAULT_WEEKLY_NOTE_FORMAT = "gggg-[W]ww";
var DEFAULT_MONTHLY_NOTE_FORMAT = "YYYY-MM";

/**
 * Read the user settings for the `daily-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getDailyNoteSettings() {
    var _a, _b, _c, _d, _e, _f;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var _g = window.app, internalPlugins = _g.internalPlugins, plugins = _g.plugins;
        var dailyNoteSettings = (_b = (_a = internalPlugins.getPluginById("daily-notes")) === null || _a === void 0 ? void 0 : _a.instance) === null || _b === void 0 ? void 0 : _b.options;
        var periodicNotesSettings = (_d = (_c = plugins.getPlugin("periodic-notes")) === null || _c === void 0 ? void 0 : _c.settings) === null || _d === void 0 ? void 0 : _d.daily;
        var settings = periodicNotesSettings || dailyNoteSettings || {};
        return {
            format: settings.format || DEFAULT_DAILY_NOTE_FORMAT,
            folder: ((_e = settings.folder) === null || _e === void 0 ? void 0 : _e.trim()) || "",
            template: ((_f = settings.template) === null || _f === void 0 ? void 0 : _f.trim()) || "",
        };
    }
    catch (err) {
        console.info("No custom daily note settings found!", err);
    }
}
/**
 * Read the user settings for the `weekly-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getWeeklyNoteSettings() {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var pluginManager = window.app.plugins;
        var calendarSettings = (_a = pluginManager.getPlugin("calendar")) === null || _a === void 0 ? void 0 : _a.options;
        var periodicNotesSettings = (_c = (_b = pluginManager.getPlugin("periodic-notes")) === null || _b === void 0 ? void 0 : _b.settings) === null || _c === void 0 ? void 0 : _c.weekly;
        if (periodicNotesSettings) {
            return {
                format: periodicNotesSettings.format || DEFAULT_WEEKLY_NOTE_FORMAT,
                folder: ((_d = periodicNotesSettings.folder) === null || _d === void 0 ? void 0 : _d.trim()) || "",
                template: ((_e = periodicNotesSettings.template) === null || _e === void 0 ? void 0 : _e.trim()) || "",
            };
        }
        var settings = calendarSettings || {};
        return {
            format: settings.weeklyNoteFormat || DEFAULT_WEEKLY_NOTE_FORMAT,
            folder: ((_f = settings.weeklyNoteFolder) === null || _f === void 0 ? void 0 : _f.trim()) || "",
            template: ((_g = settings.weeklyNoteTemplate) === null || _g === void 0 ? void 0 : _g.trim()) || "",
        };
    }
    catch (err) {
        console.info("No custom weekly note settings found!", err);
    }
}
/**
 * Read the user settings for the `periodic-notes` plugin
 * to keep behavior of creating a new note in-sync.
 */
function getMonthlyNoteSettings() {
    var _a, _b, _c, _d;
    try {
        var settings = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((_b = (_a = window.app.plugins.getPlugin("periodic-notes")) === null || _a === void 0 ? void 0 : _a.settings) === null || _b === void 0 ? void 0 : _b.monthly) || {};
        return {
            format: settings.format || DEFAULT_MONTHLY_NOTE_FORMAT,
            folder: ((_c = settings.folder) === null || _c === void 0 ? void 0 : _c.trim()) || "",
            template: ((_d = settings.template) === null || _d === void 0 ? void 0 : _d.trim()) || "",
        };
    }
    catch (err) {
        console.info("No custom monthly note settings found!", err);
    }
}

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

/**
 * dateUID is a way of weekly identifying daily/weekly/monthly notes.
 * They are prefixed with the granularity to avoid ambiguity.
 */
function getDateUID(date, granularity) {
    if (granularity === void 0) { granularity = "day"; }
    var ts = date.clone().startOf(granularity).format();
    return granularity + "-" + ts;
}
function removeEscapedCharacters(format) {
    return format.replace(/\[[^\]]*\]/g, ""); // remove everything within brackets
}
/**
 * XXX: When parsing dates that contain both week numbers and months,
 * Moment choses to ignore the week numbers. For the week dateUID, we
 * want the opposite behavior. Strip the MMM from the format to patch.
 */
function isFormatAmbiguous(format, granularity) {
    if (granularity === "week") {
        var cleanFormat = removeEscapedCharacters(format);
        return /w/i.test(cleanFormat) && /M{1,4}/.test(cleanFormat);
    }
    return false;
}
function getDateFromFile(file, granularity) {
    var getSettings = {
        day: getDailyNoteSettings,
        week: getWeeklyNoteSettings,
        month: getMonthlyNoteSettings,
    };
    var format = getSettings[granularity]().format.split("/").pop();
    var noteDate = window.moment(file.basename, format, true);
    if (!noteDate.isValid()) {
        return null;
    }
    if (isFormatAmbiguous(format, granularity)) {
        if (granularity === "week") {
            var cleanFormat = removeEscapedCharacters(format);
            if (/w/i.test(cleanFormat)) {
                return window.moment(file.basename, 
                // If format contains week, remove month formatting
                format.replace(/M{1,4}/g, ""), false);
            }
        }
    }
    return noteDate;
}

function ensureFolderExists(path$1) {
    return __awaiter(this, void 0, void 0, function () {
        var dirs, dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dirs = path$1.split("/");
                    dirs.pop(); // remove basename
                    dir = "";
                    _a.label = 1;
                case 1:
                    if (!dirs.length) return [3 /*break*/, 4];
                    dir = path__default['default'].join(dir, dirs.shift()).replace(/\\/g, "/");
                    if (!!window.app.vault.getAbstractFileByPath(dir)) return [3 /*break*/, 3];
                    return [4 /*yield*/, window.app.vault.createFolder(dir)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getNotePath(directory, filename) {
    return __awaiter(this, void 0, void 0, function () {
        var path$1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!filename.endsWith(".md")) {
                        filename += ".md";
                    }
                    path$1 = obsidian__default['default'].normalizePath(path__default['default'].join(directory, filename));
                    return [4 /*yield*/, ensureFolderExists(path$1)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, path$1];
            }
        });
    });
}
function getTemplateContents(template) {
    return __awaiter(this, void 0, void 0, function () {
        var app, metadataCache, vault, templatePath, templateFile, contents, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = window.app;
                    metadataCache = app.metadataCache, vault = app.vault;
                    templatePath = obsidian__default['default'].normalizePath(template);
                    if (templatePath === "/") {
                        return [2 /*return*/, Promise.resolve("")];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    templateFile = metadataCache.getFirstLinkpathDest(templatePath, "");
                    return [4 /*yield*/, vault.cachedRead(templateFile)];
                case 2:
                    contents = _a.sent();
                    return [2 /*return*/, contents];
                case 3:
                    err_1 = _a.sent();
                    console.error("Failed to read the daily note template '" + templatePath + "'", err_1);
                    new obsidian__default['default'].Notice("Failed to read the daily note template");
                    return [2 /*return*/, ""];
                case 4: return [2 /*return*/];
            }
        });
    });
}

var DailyNotesFolderMissingError = /** @class */ (function (_super) {
    __extends(DailyNotesFolderMissingError, _super);
    function DailyNotesFolderMissingError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DailyNotesFolderMissingError;
}(Error));
/**
 * This function mimics the behavior of the daily-notes plugin
 * so it will replace {{date}}, {{title}}, and {{time}} with the
 * formatted timestamp.
 *
 * Note: it has an added bonus that it's not 'today' specific.
 */
function createDailyNote(date) {
    return __awaiter(this, void 0, void 0, function () {
        var app, vault, moment, _a, template, format, folder, templateContents, filename, normalizedPath, createdFile, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    app = window.app;
                    vault = app.vault;
                    moment = window.moment;
                    _a = getDailyNoteSettings(), template = _a.template, format = _a.format, folder = _a.folder;
                    return [4 /*yield*/, getTemplateContents(template)];
                case 1:
                    templateContents = _b.sent();
                    filename = date.format(format);
                    return [4 /*yield*/, getNotePath(folder, filename)];
                case 2:
                    normalizedPath = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, vault.create(normalizedPath, templateContents
                            .replace(/{{\s*(date|time)\s*:(.*?)}}/gi, function (_, _timeOrDate, momentFormat) {
                            return date.format(momentFormat.trim());
                        })
                            .replace(/{{\s*date\s*}}/gi, filename)
                            .replace(/{{\s*time\s*}}/gi, moment().format("HH:mm"))
                            .replace(/{{\s*title\s*}}/gi, filename))];
                case 4:
                    createdFile = _b.sent();
                    return [2 /*return*/, createdFile];
                case 5:
                    err_1 = _b.sent();
                    console.error("Failed to create file: '" + normalizedPath + "'", err_1);
                    new obsidian__default['default'].Notice("Unable to create new file.");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getDailyNote(date, dailyNotes) {
    var _a;
    return (_a = dailyNotes[getDateUID(date, "day")]) !== null && _a !== void 0 ? _a : null;
}
function getAllDailyNotes() {
    /**
     * Find all daily notes in the daily note folder
     */
    var vault = window.app.vault;
    var folder = getDailyNoteSettings().folder;
    var dailyNotesFolder = vault.getAbstractFileByPath(obsidian__default['default'].normalizePath(folder));
    if (!dailyNotesFolder) {
        throw new DailyNotesFolderMissingError("Failed to find daily notes folder");
    }
    var dailyNotes = {};
    obsidian__default['default'].Vault.recurseChildren(dailyNotesFolder, function (note) {
        if (note instanceof obsidian__default['default'].TFile) {
            var date = getDateFromFile(note, "day");
            if (date) {
                var dateString = getDateUID(date, "day");
                dailyNotes[dateString] = note;
            }
        }
    });
    return dailyNotes;
}

var WeeklyNotesFolderMissingError = /** @class */ (function (_super) {
    __extends(WeeklyNotesFolderMissingError, _super);
    function WeeklyNotesFolderMissingError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WeeklyNotesFolderMissingError;
}(Error));
function getDaysOfWeek() {
    var moment = window.moment;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var weekStart = moment.localeData()._week.dow;
    var daysOfWeek = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ];
    while (weekStart) {
        daysOfWeek.push(daysOfWeek.shift());
        weekStart--;
    }
    return daysOfWeek;
}
function getDayOfWeekNumericalValue(dayOfWeekName) {
    return getDaysOfWeek().indexOf(dayOfWeekName.toLowerCase());
}
function createWeeklyNote(date) {
    return __awaiter(this, void 0, void 0, function () {
        var vault, _a, template, format, folder, templateContents, filename, normalizedPath, createdFile, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    vault = window.app.vault;
                    _a = getWeeklyNoteSettings(), template = _a.template, format = _a.format, folder = _a.folder;
                    return [4 /*yield*/, getTemplateContents(template)];
                case 1:
                    templateContents = _b.sent();
                    filename = date.format(format);
                    return [4 /*yield*/, getNotePath(folder, filename)];
                case 2:
                    normalizedPath = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, vault.create(normalizedPath, templateContents
                            .replace(/{{\s*(date|time)\s*:(.*?)}}/gi, function (_, _timeOrDate, momentFormat) {
                            return date.format(momentFormat.trim());
                        })
                            .replace(/{{\s*title\s*}}/gi, filename)
                            .replace(/{{\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s*:(.*?)}}/gi, function (_, dayOfWeek, momentFormat) {
                            var day = getDayOfWeekNumericalValue(dayOfWeek);
                            return date.weekday(day).format(momentFormat.trim());
                        }))];
                case 4:
                    createdFile = _b.sent();
                    return [2 /*return*/, createdFile];
                case 5:
                    err_1 = _b.sent();
                    console.error("Failed to create file: '" + normalizedPath + "'", err_1);
                    new obsidian__default['default'].Notice("Unable to create new file.");
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getWeeklyNote(date, weeklyNotes) {
    var _a;
    return (_a = weeklyNotes[getDateUID(date, "week")]) !== null && _a !== void 0 ? _a : null;
}
function getAllWeeklyNotes() {
    var vault = window.app.vault;
    var folder = getWeeklyNoteSettings().folder;
    var weeklyNotesFolder = vault.getAbstractFileByPath(obsidian__default['default'].normalizePath(folder));
    if (!weeklyNotesFolder) {
        throw new WeeklyNotesFolderMissingError("Failed to find weekly notes folder");
    }
    var weeklyNotes = {};
    obsidian__default['default'].Vault.recurseChildren(weeklyNotesFolder, function (note) {
        if (note instanceof obsidian__default['default'].TFile) {
            var date = getDateFromFile(note, "week");
            if (date) {
                var dateString = getDateUID(date, "week");
                weeklyNotes[dateString] = note;
            }
        }
    });
    return weeklyNotes;
}

/** @class */ ((function (_super) {
    __extends(MonthlyNotesFolderMissingError, _super);
    function MonthlyNotesFolderMissingError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MonthlyNotesFolderMissingError;
})(Error));

function appHasDailyNotesPluginLoaded() {
    var _a, _b;
    var app = window.app;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var dailyNotesPlugin = app.internalPlugins.plugins["daily-notes"];
    if (dailyNotesPlugin && dailyNotesPlugin.enabled) {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var periodicNotes = app.plugins.getPlugin("periodic-notes");
    return periodicNotes && ((_b = (_a = periodicNotes.settings) === null || _a === void 0 ? void 0 : _a.daily) === null || _b === void 0 ? void 0 : _b.enabled);
}
var appHasDailyNotesPluginLoaded_1 = appHasDailyNotesPluginLoaded;
var createDailyNote_1 = createDailyNote;
var createWeeklyNote_1 = createWeeklyNote;
var getAllDailyNotes_1 = getAllDailyNotes;
var getAllWeeklyNotes_1 = getAllWeeklyNotes;
var getDailyNote_1 = getDailyNote;
var getDailyNoteSettings_1 = getDailyNoteSettings;
var getDateFromFile_1 = getDateFromFile;
var getDateUID_1 = getDateUID;
var getWeeklyNote_1 = getWeeklyNote;
var getWeeklyNoteSettings_1 = getWeeklyNoteSettings;

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function not_equal(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function children(element) {
    return Array.from(element.childNodes);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

const subscriber_queue = [];
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const weekdays = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
const defaultSettings = Object.freeze({
    shouldConfirmBeforeCreate: true,
    weekStart: "locale",
    wordsPerDot: DEFAULT_WORDS_PER_DOT,
    showWeeklyNote: false,
    weeklyNoteFormat: "",
    weeklyNoteTemplate: "",
    weeklyNoteFolder: "",
    localeOverride: "system-default",
});
function appHasPeriodicNotesPluginLoaded() {
    var _a, _b;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const periodicNotes = window.app.plugins.getPlugin("periodic-notes");
    return periodicNotes && ((_b = (_a = periodicNotes.settings) === null || _a === void 0 ? void 0 : _a.weekly) === null || _b === void 0 ? void 0 : _b.enabled);
}
class CalendarSettingsTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        this.containerEl.empty();
        if (!appHasDailyNotesPluginLoaded_1()) {
            this.containerEl.createDiv("settings-banner", (banner) => {
                banner.createEl("h3", {
                    text: "⚠️ Daily Notes plugin not enabled",
                });
                banner.createEl("p", {
                    cls: "setting-item-description",
                    text: "The calendar is best used in conjunction with either the Daily Notes plugin or the Periodic Notes plugin (available in the Community Plugins catalog).",
                });
            });
        }
        this.containerEl.createEl("h3", {
            text: "General Settings",
        });
        this.addDotThresholdSetting();
        this.addWeekStartSetting();
        this.addConfirmCreateSetting();
        this.addShowWeeklyNoteSetting();
        if (this.plugin.options.showWeeklyNote &&
            !appHasPeriodicNotesPluginLoaded()) {
            this.containerEl.createEl("h3", {
                text: "Weekly Note Settings",
            });
            this.containerEl.createEl("p", {
                cls: "setting-item-description",
                text: "Note: Weekly Note settings are moving. You are encouraged to install the 'Periodic Notes' plugin to keep the functionality in the future.",
            });
            this.addWeeklyNoteFormatSetting();
            this.addWeeklyNoteTemplateSetting();
            this.addWeeklyNoteFolderSetting();
        }
        this.containerEl.createEl("h3", {
            text: "Advanced Settings",
        });
        this.addLocaleOverrideSetting();
    }
    addDotThresholdSetting() {
        new obsidian.Setting(this.containerEl)
            .setName("Words per dot")
            .setDesc("How many words should be represented by a single dot?")
            .addText((textfield) => {
            textfield.setPlaceholder(String(DEFAULT_WORDS_PER_DOT));
            textfield.inputEl.type = "number";
            textfield.setValue(String(this.plugin.options.wordsPerDot));
            textfield.onChange(async (value) => {
                this.plugin.writeOptions(() => ({
                    wordsPerDot: value !== "" ? Number(value) : undefined,
                }));
            });
        });
    }
    addWeekStartSetting() {
        const { moment } = window;
        const localizedWeekdays = moment.weekdays();
        const localeWeekStartNum = window._bundledLocaleWeekSpec.dow;
        const localeWeekStart = moment.weekdays()[localeWeekStartNum];
        new obsidian.Setting(this.containerEl)
            .setName("Start week on:")
            .setDesc("Choose what day of the week to start. Select 'Locale default' to use the default specified by moment.js")
            .addDropdown((dropdown) => {
            dropdown.addOption("locale", `Locale default (${localeWeekStart})`);
            localizedWeekdays.forEach((day, i) => {
                dropdown.addOption(weekdays[i], day);
            });
            dropdown.setValue(this.plugin.options.weekStart);
            dropdown.onChange(async (value) => {
                this.plugin.writeOptions(() => ({
                    weekStart: value,
                }));
            });
        });
    }
    addConfirmCreateSetting() {
        new obsidian.Setting(this.containerEl)
            .setName("Confirm before creating new note")
            .setDesc("Show a confirmation modal before creating a new note")
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.options.shouldConfirmBeforeCreate);
            toggle.onChange(async (value) => {
                this.plugin.writeOptions(() => ({
                    shouldConfirmBeforeCreate: value,
                }));
            });
        });
    }
    addShowWeeklyNoteSetting() {
        new obsidian.Setting(this.containerEl)
            .setName("Show week number")
            .setDesc("Enable this to add a column with the week number")
            .addToggle((toggle) => {
            toggle.setValue(this.plugin.options.showWeeklyNote);
            toggle.onChange(async (value) => {
                this.plugin.writeOptions(() => ({ showWeeklyNote: value }));
                this.display(); // show/hide weekly settings
            });
        });
    }
    addWeeklyNoteFormatSetting() {
        new obsidian.Setting(this.containerEl)
            .setName("Weekly note format")
            .setDesc("For more syntax help, refer to format reference")
            .addText((textfield) => {
            textfield.setValue(this.plugin.options.weeklyNoteFormat);
            textfield.setPlaceholder(DEFAULT_WEEK_FORMAT);
            textfield.onChange(async (value) => {
                this.plugin.writeOptions(() => ({ weeklyNoteFormat: value }));
            });
        });
    }
    addWeeklyNoteTemplateSetting() {
        new obsidian.Setting(this.containerEl)
            .setName("Weekly note template")
            .setDesc("Choose the file you want to use as the template for your weekly notes")
            .addText((textfield) => {
            textfield.setValue(this.plugin.options.weeklyNoteTemplate);
            textfield.onChange(async (value) => {
                this.plugin.writeOptions(() => ({ weeklyNoteTemplate: value }));
            });
        });
    }
    addWeeklyNoteFolderSetting() {
        new obsidian.Setting(this.containerEl)
            .setName("Weekly note folder")
            .setDesc("New weekly notes will be placed here")
            .addText((textfield) => {
            textfield.setValue(this.plugin.options.weeklyNoteFolder);
            textfield.onChange(async (value) => {
                this.plugin.writeOptions(() => ({ weeklyNoteFolder: value }));
            });
        });
    }
    addLocaleOverrideSetting() {
        var _a;
        const { moment } = window;
        const sysLocale = (_a = navigator.language) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        new obsidian.Setting(this.containerEl)
            .setName("Override locale:")
            .setDesc("Set this if you want to use a locale different from the default")
            .addDropdown((dropdown) => {
            dropdown.addOption("system-default", `Same as system (${sysLocale})`);
            moment.locales().forEach((locale) => {
                dropdown.addOption(locale, locale);
            });
            dropdown.setValue(this.plugin.options.localeOverride);
            dropdown.onChange(async (value) => {
                this.plugin.writeOptions(() => ({
                    localeOverride: value,
                }));
            });
        });
    }
}

const classList = (obj) => {
    return Object.entries(obj)
        .filter(([_k, v]) => !!v)
        .map(([k, _k]) => k);
};
function clamp(num, lowerBound, upperBound) {
    return Math.min(Math.max(lowerBound, num), upperBound);
}
function partition(arr, predicate) {
    const pass = [];
    const fail = [];
    arr.forEach((elem) => {
        if (predicate(elem)) {
            pass.push(elem);
        }
        else {
            fail.push(elem);
        }
    });
    return [pass, fail];
}
/**
 * Lookup the dateUID for a given file. It compares the filename
 * to the daily and weekly note formats to find a match.
 *
 * @param file
 */
function getDateUIDFromFile(file) {
    if (!file) {
        return null;
    }
    // TODO: I'm not checking the path!
    let date = getDateFromFile_1(file, "day");
    if (date) {
        return getDateUID_1(date, "day");
    }
    date = getDateFromFile_1(file, "week");
    if (date) {
        return getDateUID_1(date, "week");
    }
    return null;
}
function getWordCount(text) {
    const spaceDelimitedChars = /A-Za-z\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC/
        .source;
    const nonSpaceDelimitedWords = /\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u4E00-\u9FD5/
        .source;
    const pattern = new RegExp([
        `(?:[0-9]+(?:(?:,|\\.)[0-9]+)*|[\\-${spaceDelimitedChars}])+`,
        nonSpaceDelimitedWords,
    ].join("|"), "g");
    return (text.match(pattern) || []).length;
}

function createDailyNotesStore() {
    let hasError = false;
    const store = writable(null);
    return Object.assign({ reindex: () => {
            try {
                const dailyNotes = getAllDailyNotes_1();
                store.set(dailyNotes);
                hasError = false;
            }
            catch (err) {
                if (!hasError) {
                    // Avoid error being shown multiple times
                    console.log("[Calendar] Failed to find daily notes folder", err);
                }
                store.set({});
                hasError = true;
            }
        } }, store);
}
function createWeeklyNotesStore() {
    let hasError = false;
    const store = writable(null);
    return Object.assign({ reindex: () => {
            try {
                const weeklyNotes = getAllWeeklyNotes_1();
                store.set(weeklyNotes);
                hasError = false;
            }
            catch (err) {
                if (!hasError) {
                    // Avoid error being shown multiple times
                    console.log("[Calendar] Failed to find weekly notes folder", err);
                }
                store.set({});
                hasError = true;
            }
        } }, store);
}
const settings = writable(defaultSettings);
const dailyNotes = createDailyNotesStore();
const weeklyNotes = createWeeklyNotesStore();
function createSelectedFileStore() {
    const store = writable(null);
    return Object.assign({ setFile: (file) => {
            const id = getDateUIDFromFile(file);
            store.set(id);
        } }, store);
}
const activeFile = createSelectedFileStore();

class ConfirmationModal extends obsidian.Modal {
    constructor(app, config) {
        super(app);
        const { cta, onAccept, text, title } = config;
        this.contentEl.createEl("h2", { text: title });
        this.contentEl.createEl("p", { text });
        this.contentEl
            .createEl("button", { text: "Never mind" })
            .addEventListener("click", () => this.close());
        this.contentEl
            .createEl("button", {
            cls: "mod-cta",
            text: cta,
        })
            .addEventListener("click", async (e) => {
            await onAccept(e);
            this.close();
        });
    }
}
function createConfirmationDialog({ cta, onAccept, text, title, }) {
    new ConfirmationModal(window.app, { cta, onAccept, text, title }).open();
}

/**
 * Create a Daily Note for a given date.
 */
async function tryToCreateDailyNote(date, inNewSplit, settings, cb) {
    const { workspace } = window.app;
    const { format } = getDailyNoteSettings_1();
    const filename = date.format(format);
    const createFile = async () => {
        const dailyNote = await createDailyNote_1(date);
        const leaf = inNewSplit
            ? workspace.splitActiveLeaf()
            : workspace.getUnpinnedLeaf();
        await leaf.openFile(dailyNote);
        cb === null || cb === void 0 ? void 0 : cb(dailyNote);
    };
    if (settings.shouldConfirmBeforeCreate) {
        createConfirmationDialog({
            cta: "Create",
            onAccept: createFile,
            text: `File ${filename} does not exist. Would you like to create it?`,
            title: "New Daily Note",
        });
    }
    else {
        await createFile();
    }
}

/**
 * Create a Weekly Note for a given date.
 */
async function tryToCreateWeeklyNote(date, inNewSplit, settings, cb) {
    const { workspace } = window.app;
    const { format } = getWeeklyNoteSettings_1();
    const filename = date.format(format);
    const createFile = async () => {
        const dailyNote = await createWeeklyNote_1(date);
        const leaf = inNewSplit
            ? workspace.splitActiveLeaf()
            : workspace.getUnpinnedLeaf();
        await leaf.openFile(dailyNote);
        cb === null || cb === void 0 ? void 0 : cb(dailyNote);
    };
    if (settings.shouldConfirmBeforeCreate) {
        createConfirmationDialog({
            cta: "Create",
            onAccept: createFile,
            text: `File ${filename} does not exist. Would you like to create it?`,
            title: "New Weekly Note",
        });
    }
    else {
        await createFile();
    }
}

function noop$1() { }
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function is_promise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}
function run$1(fn) {
    return fn();
}
function blank_object$1() {
    return Object.create(null);
}
function run_all$1(fns) {
    fns.forEach(run$1);
}
function is_function$1(thing) {
    return typeof thing === 'function';
}
function safe_not_equal$1(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function not_equal$1(a, b) {
    return a != a ? b == b : a !== b;
}
function is_empty$1(obj) {
    return Object.keys(obj).length === 0;
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach$1(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function children$1(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}

let current_component$1;
function set_current_component$1(component) {
    current_component$1 = component;
}
function get_current_component$1() {
    if (!current_component$1)
        throw new Error('Function called outside component initialization');
    return current_component$1;
}

const dirty_components$1 = [];
const binding_callbacks$1 = [];
const render_callbacks$1 = [];
const flush_callbacks$1 = [];
const resolved_promise$1 = Promise.resolve();
let update_scheduled$1 = false;
function schedule_update$1() {
    if (!update_scheduled$1) {
        update_scheduled$1 = true;
        resolved_promise$1.then(flush$1);
    }
}
function add_render_callback$1(fn) {
    render_callbacks$1.push(fn);
}
let flushing$1 = false;
const seen_callbacks$1 = new Set();
function flush$1() {
    if (flushing$1)
        return;
    flushing$1 = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components$1.length; i += 1) {
            const component = dirty_components$1[i];
            set_current_component$1(component);
            update$1(component.$$);
        }
        set_current_component$1(null);
        dirty_components$1.length = 0;
        while (binding_callbacks$1.length)
            binding_callbacks$1.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks$1.length; i += 1) {
            const callback = render_callbacks$1[i];
            if (!seen_callbacks$1.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks$1.add(callback);
                callback();
            }
        }
        render_callbacks$1.length = 0;
    } while (dirty_components$1.length);
    while (flush_callbacks$1.length) {
        flush_callbacks$1.pop()();
    }
    update_scheduled$1 = false;
    flushing$1 = false;
    seen_callbacks$1.clear();
}
function update$1($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all$1($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback$1);
    }
}
const outroing$1 = new Set();
let outros$1;
function group_outros() {
    outros$1 = {
        r: 0,
        c: [],
        p: outros$1 // parent group
    };
}
function check_outros() {
    if (!outros$1.r) {
        run_all$1(outros$1.c);
    }
    outros$1 = outros$1.p;
}
function transition_in$1(block, local) {
    if (block && block.i) {
        outroing$1.delete(block);
        block.i(local);
    }
}
function transition_out$1(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing$1.has(block))
            return;
        outroing$1.add(block);
        outros$1.c.push(() => {
            outroing$1.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}

function handle_promise(promise, info) {
    const token = info.token = {};
    function update(type, index, key, value) {
        if (info.token !== token)
            return;
        info.resolved = value;
        let child_ctx = info.ctx;
        if (key !== undefined) {
            child_ctx = child_ctx.slice();
            child_ctx[key] = value;
        }
        const block = type && (info.current = type)(child_ctx);
        let needs_flush = false;
        if (info.block) {
            if (info.blocks) {
                info.blocks.forEach((block, i) => {
                    if (i !== index && block) {
                        group_outros();
                        transition_out$1(block, 1, 1, () => {
                            info.blocks[i] = null;
                        });
                        check_outros();
                    }
                });
            }
            else {
                info.block.d(1);
            }
            block.c();
            transition_in$1(block, 1);
            block.m(info.mount(), info.anchor);
            needs_flush = true;
        }
        info.block = block;
        if (info.blocks)
            info.blocks[index] = block;
        if (needs_flush) {
            flush$1();
        }
    }
    if (is_promise(promise)) {
        const current_component = get_current_component$1();
        promise.then(value => {
            set_current_component$1(current_component);
            update(info.then, 1, info.value, value);
            set_current_component$1(null);
        }, error => {
            set_current_component$1(current_component);
            update(info.catch, 2, info.error, error);
            set_current_component$1(null);
            if (!info.hasCatch) {
                throw error;
            }
        });
        // if we previously had a then/catch block, destroy it
        if (info.current !== info.pending) {
            update(info.pending, 0);
            return true;
        }
    }
    else {
        if (info.current !== info.then) {
            update(info.then, 1, info.value, promise);
            return true;
        }
        info.resolved = promise;
    }
}
function outro_and_destroy_block(block, lookup) {
    transition_out$1(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in$1(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}
function create_component$1(block) {
    block && block.c();
}
function mount_component$1(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback$1(() => {
        const new_on_destroy = on_mount.map(run$1).filter(is_function$1);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all$1(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback$1);
}
function destroy_component$1(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all$1($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty$1(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components$1.push(component);
        schedule_update$1();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init$1(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component$1;
    set_current_component$1(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop$1,
        not_equal,
        bound: blank_object$1(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object$1(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty$1(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all$1($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children$1(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach$1);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in$1(component.$$.fragment);
        mount_component$1(component, options.target, options.anchor);
        flush$1();
    }
    set_current_component$1(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent$1 {
    $destroy() {
        destroy_component$1(this, 1);
        this.$destroy = noop$1;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty$1($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

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

var extendStatics$1 = function(d, b) {
    extendStatics$1 = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics$1(d, b);
};

function __extends$1(d, b) {
    extendStatics$1(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * dateUID is a way of weekly identifying daily/weekly/monthly notes.
 * They are prefixed with the granularity to avoid ambiguity.
 */
function getDateUID$1(date, granularity) {
    if (granularity === void 0) { granularity = "day"; }
    var ts = date.clone().startOf(granularity).format();
    return granularity + "-" + ts;
}

/** @class */ ((function (_super) {
    __extends$1(DailyNotesFolderMissingError, _super);
    function DailyNotesFolderMissingError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DailyNotesFolderMissingError;
})(Error));

/** @class */ ((function (_super) {
    __extends$1(WeeklyNotesFolderMissingError, _super);
    function WeeklyNotesFolderMissingError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WeeklyNotesFolderMissingError;
})(Error));

/** @class */ ((function (_super) {
    __extends$1(MonthlyNotesFolderMissingError, _super);
    function MonthlyNotesFolderMissingError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MonthlyNotesFolderMissingError;
})(Error));
var getDateUID_1$1 = getDateUID$1;

/* src\components\Dot.svelte generated by Svelte v3.31.0 */

function add_css() {
	var style = element("style");
	style.id = "svelte-1widvzq-style";
	style.textContent = ".dot.svelte-1widvzq,.hollow.svelte-1widvzq{display:inline-block;height:6px;width:6px;margin:0 1px}.filled.svelte-1widvzq{fill:var(--color-dot)}.active.filled.svelte-1widvzq{fill:var(--text-on-accent)}.hollow.svelte-1widvzq{fill:none;stroke:var(--color-dot)}.active.hollow.svelte-1widvzq{fill:none;stroke:var(--text-on-accent)}";
	append(document.head, style);
}

// (14:0) {:else}
function create_else_block(ctx) {
	let svg;
	let circle;
	let svg_class_value;

	return {
		c() {
			svg = svg_element("svg");
			circle = svg_element("circle");
			attr(circle, "cx", "3");
			attr(circle, "cy", "3");
			attr(circle, "r", "2");
			attr(svg, "class", svg_class_value = "" + (null_to_empty(`hollow ${/*className*/ ctx[0]}`) + " svelte-1widvzq"));
			attr(svg, "viewBox", "0 0 6 6");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			toggle_class(svg, "active", /*isActive*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, circle);
		},
		p(ctx, dirty) {
			if (dirty & /*className*/ 1 && svg_class_value !== (svg_class_value = "" + (null_to_empty(`hollow ${/*className*/ ctx[0]}`) + " svelte-1widvzq"))) {
				attr(svg, "class", svg_class_value);
			}

			if (dirty & /*className, isActive*/ 5) {
				toggle_class(svg, "active", /*isActive*/ ctx[2]);
			}
		},
		d(detaching) {
			if (detaching) detach$1(svg);
		}
	};
}

// (6:0) {#if isFilled}
function create_if_block(ctx) {
	let svg;
	let circle;
	let svg_class_value;

	return {
		c() {
			svg = svg_element("svg");
			circle = svg_element("circle");
			attr(circle, "cx", "3");
			attr(circle, "cy", "3");
			attr(circle, "r", "2");
			attr(svg, "class", svg_class_value = "" + (null_to_empty(`dot filled ${/*className*/ ctx[0]}`) + " svelte-1widvzq"));
			attr(svg, "viewBox", "0 0 6 6");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			toggle_class(svg, "active", /*isActive*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, svg, anchor);
			append(svg, circle);
		},
		p(ctx, dirty) {
			if (dirty & /*className*/ 1 && svg_class_value !== (svg_class_value = "" + (null_to_empty(`dot filled ${/*className*/ ctx[0]}`) + " svelte-1widvzq"))) {
				attr(svg, "class", svg_class_value);
			}

			if (dirty & /*className, isActive*/ 5) {
				toggle_class(svg, "active", /*isActive*/ ctx[2]);
			}
		},
		d(detaching) {
			if (detaching) detach$1(svg);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;

	function select_block_type(ctx, dirty) {
		if (/*isFilled*/ ctx[1]) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, [dirty]) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		i: noop$1,
		o: noop$1,
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach$1(if_block_anchor);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { className = "" } = $$props;
	let { isFilled } = $$props;
	let { isActive } = $$props;

	$$self.$$set = $$props => {
		if ("className" in $$props) $$invalidate(0, className = $$props.className);
		if ("isFilled" in $$props) $$invalidate(1, isFilled = $$props.isFilled);
		if ("isActive" in $$props) $$invalidate(2, isActive = $$props.isActive);
	};

	return [className, isFilled, isActive];
}

class Dot extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1widvzq-style")) add_css();
		init$1(this, options, instance, create_fragment, safe_not_equal$1, { className: 0, isFilled: 1, isActive: 2 });
	}
}

/* src\components\MetadataResolver.svelte generated by Svelte v3.31.0 */

const get_default_slot_changes_1 = dirty => ({});
const get_default_slot_context_1 = ctx => ({ metadata: null });
const get_default_slot_changes = dirty => ({ metadata: dirty & /*metadata*/ 1 });
const get_default_slot_context = ctx => ({ metadata: /*resolvedMeta*/ ctx[3] });

// (11:0) {:else}
function create_else_block$1(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], get_default_slot_context_1);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, get_default_slot_changes_1, get_default_slot_context_1);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out$1(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (7:0) {#if metadata}
function create_if_block$1(ctx) {
	let await_block_anchor;
	let promise;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 3,
		blocks: [,,,]
	};

	handle_promise(promise = /*metadata*/ ctx[0], info);

	return {
		c() {
			await_block_anchor = empty();
			info.block.c();
		},
		m(target, anchor) {
			insert(target, await_block_anchor, anchor);
			info.block.m(target, info.anchor = anchor);
			info.mount = () => await_block_anchor.parentNode;
			info.anchor = await_block_anchor;
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			info.ctx = ctx;

			if (dirty & /*metadata*/ 1 && promise !== (promise = /*metadata*/ ctx[0]) && handle_promise(promise, info)) ; else {
				const child_ctx = ctx.slice();
				child_ctx[3] = info.resolved;
				info.block.p(child_ctx, dirty);
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(info.block);
			current = true;
		},
		o(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				transition_out$1(block);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(await_block_anchor);
			info.block.d(detaching);
			info.token = null;
			info = null;
		}
	};
}

// (1:0) <svelte:options immutable />    <script lang="ts">;  export let metadata;  </script>    {#if metadata}
function create_catch_block(ctx) {
	return {
		c: noop$1,
		m: noop$1,
		p: noop$1,
		i: noop$1,
		o: noop$1,
		d: noop$1
	};
}

// (8:37)       <slot metadata="{resolvedMeta}
function create_then_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], get_default_slot_context);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope, metadata*/ 3) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, get_default_slot_changes, get_default_slot_context);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out$1(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (1:0) <svelte:options immutable />    <script lang="ts">;  export let metadata;  </script>    {#if metadata}
function create_pending_block(ctx) {
	return {
		c: noop$1,
		m: noop$1,
		p: noop$1,
		i: noop$1,
		o: noop$1,
		d: noop$1
	};
}

function create_fragment$1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$1, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*metadata*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out$1(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in$1(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(if_block);
			current = true;
		},
		o(local) {
			transition_out$1(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach$1(if_block_anchor);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	
	let { metadata } = $$props;

	$$self.$$set = $$props => {
		if ("metadata" in $$props) $$invalidate(0, metadata = $$props.metadata);
		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	return [metadata, $$scope, slots];
}

class MetadataResolver extends SvelteComponent$1 {
	constructor(options) {
		super();
		init$1(this, options, instance$1, create_fragment$1, not_equal$1, { metadata: 0 });
	}
}

function isMacOS() {
    return os.platform() === "darwin";
}
function isMetaPressed(e) {
    return isMacOS() ? e.metaKey : e.ctrlKey;
}
function getDaysOfWeek$1(..._args) {
    return window.moment.weekdaysShort(true);
}
function isWeekend(date) {
    return date.isoWeekday() === 6 || date.isoWeekday() === 7;
}
function getStartOfWeek(days) {
    return days[0].weekday(0);
}
/**
 * Generate a 2D array of daily information to power
 * the calendar view.
 */
function getMonth(displayedMonth, ..._args) {
    const locale = window.moment().locale();
    const month = [];
    let week;
    const startOfMonth = displayedMonth.clone().locale(locale).date(1);
    const startOffset = startOfMonth.weekday();
    let date = startOfMonth.clone().subtract(startOffset, "days");
    for (let _day = 0; _day < 42; _day++) {
        if (_day % 7 === 0) {
            week = {
                days: [],
                weekNum: date.week(),
            };
            month.push(week);
        }
        week.days.push(date);
        date = date.clone().add(1, "days");
    }
    return month;
}

/* src\components\Day.svelte generated by Svelte v3.31.0 */

function add_css$1() {
	var style = element("style");
	style.id = "svelte-q3wqg9-style";
	style.textContent = ".day.svelte-q3wqg9{background-color:var(--color-background-day);border-radius:4px;color:var(--color-text-day);cursor:pointer;font-size:0.8em;height:100%;padding:4px;position:relative;text-align:center;transition:background-color 0.1s ease-in, color 0.1s ease-in;vertical-align:baseline}.day.svelte-q3wqg9:hover{background-color:var(--interactive-hover)}.day.active.svelte-q3wqg9:hover{background-color:var(--interactive-accent-hover)}.adjacent-month.svelte-q3wqg9{opacity:0.25}.today.svelte-q3wqg9{color:var(--color-text-today)}.day.svelte-q3wqg9:active,.active.svelte-q3wqg9,.active.today.svelte-q3wqg9{color:var(--text-on-accent);background-color:var(--interactive-accent)}.dot-container.svelte-q3wqg9{display:flex;flex-wrap:wrap;justify-content:center;line-height:6px;min-height:6px}";
	append(document.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

// (36:8) {#each metadata.dots as dot}
function create_each_block(ctx) {
	let dot;
	let current;
	const dot_spread_levels = [/*dot*/ ctx[11]];
	let dot_props = {};

	for (let i = 0; i < dot_spread_levels.length; i += 1) {
		dot_props = assign(dot_props, dot_spread_levels[i]);
	}

	dot = new Dot({ props: dot_props });

	return {
		c() {
			create_component$1(dot.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(dot, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const dot_changes = (dirty & /*metadata*/ 128)
			? get_spread_update(dot_spread_levels, [get_spread_object(/*dot*/ ctx[11])])
			: {};

			dot.$set(dot_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(dot.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(dot.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(dot, detaching);
		}
	};
}

// (22:2) <MetadataResolver metadata="{metadata}" let:metadata>
function create_default_slot(ctx) {
	let div1;
	let t0_value = /*date*/ ctx[0].format("D") + "";
	let t0;
	let t1;
	let div0;
	let div1_class_value;
	let current;
	let mounted;
	let dispose;
	let each_value = /*metadata*/ ctx[7].dots;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out$1(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	let div1_levels = [
		{
			class: div1_class_value = `day ${/*metadata*/ ctx[7].classes.join(" ")}`
		},
		/*metadata*/ ctx[7].dataAttributes || {}
	];

	let div1_data = {};

	for (let i = 0; i < div1_levels.length; i += 1) {
		div1_data = assign(div1_data, div1_levels[i]);
	}

	return {
		c() {
			div1 = element("div");
			t0 = text(t0_value);
			t1 = space();
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "dot-container svelte-q3wqg9");
			set_attributes(div1, div1_data);
			toggle_class(div1, "active", /*selectedId*/ ctx[6] === getDateUID_1$1(/*date*/ ctx[0], "day"));
			toggle_class(div1, "adjacent-month", !/*date*/ ctx[0].isSame(/*displayedMonth*/ ctx[5], "month"));
			toggle_class(div1, "today", /*date*/ ctx[0].isSame(/*today*/ ctx[4], "day"));
			toggle_class(div1, "svelte-q3wqg9", true);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, t0);
			append(div1, t1);
			append(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(div1, "click", function () {
						if (is_function$1(/*onClick*/ ctx[2] && /*click_handler*/ ctx[8])) (/*onClick*/ ctx[2] && /*click_handler*/ ctx[8]).apply(this, arguments);
					}),
					listen(div1, "contextmenu", function () {
						if (is_function$1(/*onContextMenu*/ ctx[3] && /*contextmenu_handler*/ ctx[9])) (/*onContextMenu*/ ctx[3] && /*contextmenu_handler*/ ctx[9]).apply(this, arguments);
					}),
					listen(div1, "pointerover", function () {
						if (is_function$1(/*onHover*/ ctx[1] && /*pointerover_handler*/ ctx[10])) (/*onHover*/ ctx[1] && /*pointerover_handler*/ ctx[10]).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*date*/ 1) && t0_value !== (t0_value = /*date*/ ctx[0].format("D") + "")) set_data(t0, t0_value);

			if (dirty & /*metadata*/ 128) {
				each_value = /*metadata*/ ctx[7].dots;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in$1(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in$1(each_blocks[i], 1);
						each_blocks[i].m(div0, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			set_attributes(div1, div1_data = get_spread_update(div1_levels, [
				(!current || dirty & /*metadata*/ 128 && div1_class_value !== (div1_class_value = `day ${/*metadata*/ ctx[7].classes.join(" ")}`)) && { class: div1_class_value },
				dirty & /*metadata*/ 128 && (/*metadata*/ ctx[7].dataAttributes || {})
			]));

			toggle_class(div1, "active", /*selectedId*/ ctx[6] === getDateUID_1$1(/*date*/ ctx[0], "day"));
			toggle_class(div1, "adjacent-month", !/*date*/ ctx[0].isSame(/*displayedMonth*/ ctx[5], "month"));
			toggle_class(div1, "today", /*date*/ ctx[0].isSame(/*today*/ ctx[4], "day"));
			toggle_class(div1, "svelte-q3wqg9", true);
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in$1(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out$1(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div1);
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all$1(dispose);
		}
	};
}

function create_fragment$2(ctx) {
	let td;
	let metadataresolver;
	let current;

	metadataresolver = new MetadataResolver({
			props: {
				metadata: /*metadata*/ ctx[7],
				$$slots: {
					default: [
						create_default_slot,
						({ metadata }) => ({ 7: metadata }),
						({ metadata }) => metadata ? 128 : 0
					]
				},
				$$scope: { ctx }
			}
		});

	return {
		c() {
			td = element("td");
			create_component$1(metadataresolver.$$.fragment);
		},
		m(target, anchor) {
			insert(target, td, anchor);
			mount_component$1(metadataresolver, td, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const metadataresolver_changes = {};
			if (dirty & /*metadata*/ 128) metadataresolver_changes.metadata = /*metadata*/ ctx[7];

			if (dirty & /*$$scope, metadata, selectedId, date, displayedMonth, today, onClick, onContextMenu, onHover*/ 16639) {
				metadataresolver_changes.$$scope = { dirty, ctx };
			}

			metadataresolver.$set(metadataresolver_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(metadataresolver.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(metadataresolver.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(td);
			destroy_component$1(metadataresolver);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	
	
	let { date } = $$props;
	let { metadata } = $$props;
	let { onHover } = $$props;
	let { onClick } = $$props;
	let { onContextMenu } = $$props;
	let { today } = $$props;
	let { displayedMonth = null } = $$props;
	let { selectedId = null } = $$props;
	const click_handler = e => onClick(date, isMetaPressed(e));
	const contextmenu_handler = e => onContextMenu(date, e);
	const pointerover_handler = e => onHover(date, e.target, isMetaPressed(e));

	$$self.$$set = $$props => {
		if ("date" in $$props) $$invalidate(0, date = $$props.date);
		if ("metadata" in $$props) $$invalidate(7, metadata = $$props.metadata);
		if ("onHover" in $$props) $$invalidate(1, onHover = $$props.onHover);
		if ("onClick" in $$props) $$invalidate(2, onClick = $$props.onClick);
		if ("onContextMenu" in $$props) $$invalidate(3, onContextMenu = $$props.onContextMenu);
		if ("today" in $$props) $$invalidate(4, today = $$props.today);
		if ("displayedMonth" in $$props) $$invalidate(5, displayedMonth = $$props.displayedMonth);
		if ("selectedId" in $$props) $$invalidate(6, selectedId = $$props.selectedId);
	};

	return [
		date,
		onHover,
		onClick,
		onContextMenu,
		today,
		displayedMonth,
		selectedId,
		metadata,
		click_handler,
		contextmenu_handler,
		pointerover_handler
	];
}

class Day extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-q3wqg9-style")) add_css$1();

		init$1(this, options, instance$2, create_fragment$2, not_equal$1, {
			date: 0,
			metadata: 7,
			onHover: 1,
			onClick: 2,
			onContextMenu: 3,
			today: 4,
			displayedMonth: 5,
			selectedId: 6
		});
	}
}

/* src\components\Arrow.svelte generated by Svelte v3.31.0 */

function add_css$2() {
	var style = element("style");
	style.id = "svelte-gbeivq-style";
	style.textContent = ".arrow.svelte-gbeivq.svelte-gbeivq{align-items:center;cursor:pointer;display:flex;justify-content:center;width:24px}.right.svelte-gbeivq.svelte-gbeivq{transform:rotate(180deg)}.arrow.svelte-gbeivq svg.svelte-gbeivq{color:var(--color-arrow);height:16px;width:16px}";
	append(document.head, style);
}

function create_fragment$3(ctx) {
	let div;
	let svg;
	let path;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			svg = svg_element("svg");
			path = svg_element("path");
			attr(path, "fill", "currentColor");
			attr(path, "d", "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z");
			attr(svg, "focusable", "false");
			attr(svg, "role", "img");
			attr(svg, "xmlns", "http://www.w3.org/2000/svg");
			attr(svg, "viewBox", "0 0 320 512");
			attr(svg, "class", "svelte-gbeivq");
			attr(div, "class", "arrow svelte-gbeivq");
			attr(div, "aria-label", /*tooltip*/ ctx[1]);
			toggle_class(div, "right", /*direction*/ ctx[2] === "right");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, svg);
			append(svg, path);

			if (!mounted) {
				dispose = listen(div, "click", function () {
					if (is_function$1(/*onClick*/ ctx[0])) /*onClick*/ ctx[0].apply(this, arguments);
				});

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;

			if (dirty & /*tooltip*/ 2) {
				attr(div, "aria-label", /*tooltip*/ ctx[1]);
			}

			if (dirty & /*direction*/ 4) {
				toggle_class(div, "right", /*direction*/ ctx[2] === "right");
			}
		},
		i: noop$1,
		o: noop$1,
		d(detaching) {
			if (detaching) detach$1(div);
			mounted = false;
			dispose();
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let { onClick } = $$props;
	let { tooltip } = $$props;
	let { direction } = $$props;

	$$self.$$set = $$props => {
		if ("onClick" in $$props) $$invalidate(0, onClick = $$props.onClick);
		if ("tooltip" in $$props) $$invalidate(1, tooltip = $$props.tooltip);
		if ("direction" in $$props) $$invalidate(2, direction = $$props.direction);
	};

	return [onClick, tooltip, direction];
}

class Arrow extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-gbeivq-style")) add_css$2();
		init$1(this, options, instance$3, create_fragment$3, safe_not_equal$1, { onClick: 0, tooltip: 1, direction: 2 });
	}
}

/* src\components\Nav.svelte generated by Svelte v3.31.0 */

function add_css$3() {
	var style = element("style");
	style.id = "svelte-1elemso-style";
	style.textContent = ".nav.svelte-1elemso{align-items:center;display:flex;margin:0.6em 0 1em;padding:0 8px;width:100%}.title.svelte-1elemso{color:var(--color-text-title);font-size:1.5em;margin:0}.month.svelte-1elemso{font-weight:500;text-transform:capitalize}.year.svelte-1elemso{color:var(--interactive-accent)}.right-nav.svelte-1elemso{display:flex;justify-content:center;margin-left:auto}.reset-button.svelte-1elemso{border-radius:4px;color:var(--text-muted);font-size:0.7em;font-weight:600;letter-spacing:1px;margin:0 4px;padding:0px 4px;text-transform:uppercase}";
	append(document.head, style);
}

function create_fragment$4(ctx) {
	let div2;
	let h3;
	let span0;
	let t0_value = /*displayedMonth*/ ctx[0].format("MMM") + "";
	let t0;
	let t1;
	let span1;
	let t2_value = /*displayedMonth*/ ctx[0].format("YYYY") + "";
	let t2;
	let t3;
	let div1;
	let arrow0;
	let t4;
	let div0;
	let t6;
	let arrow1;
	let current;
	let mounted;
	let dispose;

	arrow0 = new Arrow({
			props: {
				direction: "left",
				onClick: /*decrementDisplayedMonth*/ ctx[3],
				tooltip: "Previous Month"
			}
		});

	arrow1 = new Arrow({
			props: {
				direction: "right",
				onClick: /*incrementDisplayedMonth*/ ctx[2],
				tooltip: "Next Month"
			}
		});

	return {
		c() {
			div2 = element("div");
			h3 = element("h3");
			span0 = element("span");
			t0 = text(t0_value);
			t1 = space();
			span1 = element("span");
			t2 = text(t2_value);
			t3 = space();
			div1 = element("div");
			create_component$1(arrow0.$$.fragment);
			t4 = space();
			div0 = element("div");
			div0.textContent = `${/*todayDisplayStr*/ ctx[4]}`;
			t6 = space();
			create_component$1(arrow1.$$.fragment);
			attr(span0, "class", "month svelte-1elemso");
			attr(span1, "class", "year svelte-1elemso");
			attr(h3, "class", "title svelte-1elemso");
			attr(div0, "class", "reset-button svelte-1elemso");
			attr(div1, "class", "right-nav svelte-1elemso");
			attr(div2, "class", "nav svelte-1elemso");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, h3);
			append(h3, span0);
			append(span0, t0);
			append(h3, t1);
			append(h3, span1);
			append(span1, t2);
			append(div2, t3);
			append(div2, div1);
			mount_component$1(arrow0, div1, null);
			append(div1, t4);
			append(div1, div0);
			append(div1, t6);
			mount_component$1(arrow1, div1, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(h3, "click", function () {
						if (is_function$1(/*resetDisplayedMonth*/ ctx[1])) /*resetDisplayedMonth*/ ctx[1].apply(this, arguments);
					}),
					listen(div0, "click", function () {
						if (is_function$1(/*resetDisplayedMonth*/ ctx[1])) /*resetDisplayedMonth*/ ctx[1].apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			if ((!current || dirty & /*displayedMonth*/ 1) && t0_value !== (t0_value = /*displayedMonth*/ ctx[0].format("MMM") + "")) set_data(t0, t0_value);
			if ((!current || dirty & /*displayedMonth*/ 1) && t2_value !== (t2_value = /*displayedMonth*/ ctx[0].format("YYYY") + "")) set_data(t2, t2_value);
			const arrow0_changes = {};
			if (dirty & /*decrementDisplayedMonth*/ 8) arrow0_changes.onClick = /*decrementDisplayedMonth*/ ctx[3];
			arrow0.$set(arrow0_changes);
			const arrow1_changes = {};
			if (dirty & /*incrementDisplayedMonth*/ 4) arrow1_changes.onClick = /*incrementDisplayedMonth*/ ctx[2];
			arrow1.$set(arrow1_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(arrow0.$$.fragment, local);
			transition_in$1(arrow1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(arrow0.$$.fragment, local);
			transition_out$1(arrow1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div2);
			destroy_component$1(arrow0);
			destroy_component$1(arrow1);
			mounted = false;
			run_all$1(dispose);
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	
	let { displayedMonth } = $$props;
	let { today } = $$props;
	let { resetDisplayedMonth } = $$props;
	let { incrementDisplayedMonth } = $$props;
	let { decrementDisplayedMonth } = $$props;

	// Get the word 'Today' but localized to the current language
	const todayDisplayStr = today.calendar().split(/\d|\s/)[0];

	$$self.$$set = $$props => {
		if ("displayedMonth" in $$props) $$invalidate(0, displayedMonth = $$props.displayedMonth);
		if ("today" in $$props) $$invalidate(5, today = $$props.today);
		if ("resetDisplayedMonth" in $$props) $$invalidate(1, resetDisplayedMonth = $$props.resetDisplayedMonth);
		if ("incrementDisplayedMonth" in $$props) $$invalidate(2, incrementDisplayedMonth = $$props.incrementDisplayedMonth);
		if ("decrementDisplayedMonth" in $$props) $$invalidate(3, decrementDisplayedMonth = $$props.decrementDisplayedMonth);
	};

	return [
		displayedMonth,
		resetDisplayedMonth,
		incrementDisplayedMonth,
		decrementDisplayedMonth,
		todayDisplayStr,
		today
	];
}

class Nav extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1elemso-style")) add_css$3();

		init$1(this, options, instance$4, create_fragment$4, safe_not_equal$1, {
			displayedMonth: 0,
			today: 5,
			resetDisplayedMonth: 1,
			incrementDisplayedMonth: 2,
			decrementDisplayedMonth: 3
		});
	}
}

/* src\components\WeekNum.svelte generated by Svelte v3.31.0 */

function add_css$4() {
	var style = element("style");
	style.id = "svelte-egt0yd-style";
	style.textContent = "td.svelte-egt0yd{border-right:1px solid var(--background-modifier-border)}.week-num.svelte-egt0yd{background-color:var(--color-background-weeknum);border-radius:4px;color:var(--color-text-weeknum);cursor:pointer;font-size:0.65em;height:100%;padding:4px;text-align:center;transition:background-color 0.1s ease-in, color 0.1s ease-in;vertical-align:baseline}.week-num.svelte-egt0yd:hover{background-color:var(--interactive-hover)}.week-num.active.svelte-egt0yd:hover{background-color:var(--interactive-accent-hover)}.active.svelte-egt0yd{color:var(--text-on-accent);background-color:var(--interactive-accent)}.dot-container.svelte-egt0yd{display:flex;flex-wrap:wrap;justify-content:center;line-height:6px;min-height:6px}";
	append(document.head, style);
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[11] = list[i];
	return child_ctx;
}

// (35:8) {#each metadata.dots as dot}
function create_each_block$1(ctx) {
	let dot;
	let current;
	const dot_spread_levels = [/*dot*/ ctx[11]];
	let dot_props = {};

	for (let i = 0; i < dot_spread_levels.length; i += 1) {
		dot_props = assign(dot_props, dot_spread_levels[i]);
	}

	dot = new Dot({ props: dot_props });

	return {
		c() {
			create_component$1(dot.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(dot, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const dot_changes = (dirty & /*metadata*/ 64)
			? get_spread_update(dot_spread_levels, [get_spread_object(/*dot*/ ctx[11])])
			: {};

			dot.$set(dot_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(dot.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(dot.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(dot, detaching);
		}
	};
}

// (24:2) <MetadataResolver metadata="{metadata}" let:metadata>
function create_default_slot$1(ctx) {
	let div1;
	let t0;
	let t1;
	let div0;
	let div1_class_value;
	let current;
	let mounted;
	let dispose;
	let each_value = /*metadata*/ ctx[6].dots;
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out$1(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div1 = element("div");
			t0 = text(/*weekNum*/ ctx[0]);
			t1 = space();
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "dot-container svelte-egt0yd");
			attr(div1, "class", div1_class_value = "" + (null_to_empty(`week-num ${/*metadata*/ ctx[6].classes.join(" ")}`) + " svelte-egt0yd"));
			toggle_class(div1, "active", /*selectedId*/ ctx[5] === getDateUID_1$1(/*days*/ ctx[1][0], "week"));
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, t0);
			append(div1, t1);
			append(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div0, null);
			}

			current = true;

			if (!mounted) {
				dispose = [
					listen(div1, "click", function () {
						if (is_function$1(/*onClick*/ ctx[3] && /*click_handler*/ ctx[8])) (/*onClick*/ ctx[3] && /*click_handler*/ ctx[8]).apply(this, arguments);
					}),
					listen(div1, "contextmenu", function () {
						if (is_function$1(/*onContextMenu*/ ctx[4] && /*contextmenu_handler*/ ctx[9])) (/*onContextMenu*/ ctx[4] && /*contextmenu_handler*/ ctx[9]).apply(this, arguments);
					}),
					listen(div1, "pointerover", function () {
						if (is_function$1(/*onHover*/ ctx[2] && /*pointerover_handler*/ ctx[10])) (/*onHover*/ ctx[2] && /*pointerover_handler*/ ctx[10]).apply(this, arguments);
					})
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (!current || dirty & /*weekNum*/ 1) set_data(t0, /*weekNum*/ ctx[0]);

			if (dirty & /*metadata*/ 64) {
				each_value = /*metadata*/ ctx[6].dots;
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in$1(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in$1(each_blocks[i], 1);
						each_blocks[i].m(div0, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (!current || dirty & /*metadata*/ 64 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`week-num ${/*metadata*/ ctx[6].classes.join(" ")}`) + " svelte-egt0yd"))) {
				attr(div1, "class", div1_class_value);
			}

			if (dirty & /*metadata, selectedId, getDateUID, days*/ 98) {
				toggle_class(div1, "active", /*selectedId*/ ctx[5] === getDateUID_1$1(/*days*/ ctx[1][0], "week"));
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in$1(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out$1(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div1);
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all$1(dispose);
		}
	};
}

function create_fragment$5(ctx) {
	let td;
	let metadataresolver;
	let current;

	metadataresolver = new MetadataResolver({
			props: {
				metadata: /*metadata*/ ctx[6],
				$$slots: {
					default: [
						create_default_slot$1,
						({ metadata }) => ({ 6: metadata }),
						({ metadata }) => metadata ? 64 : 0
					]
				},
				$$scope: { ctx }
			}
		});

	return {
		c() {
			td = element("td");
			create_component$1(metadataresolver.$$.fragment);
			attr(td, "class", "svelte-egt0yd");
		},
		m(target, anchor) {
			insert(target, td, anchor);
			mount_component$1(metadataresolver, td, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const metadataresolver_changes = {};
			if (dirty & /*metadata*/ 64) metadataresolver_changes.metadata = /*metadata*/ ctx[6];

			if (dirty & /*$$scope, metadata, selectedId, days, onClick, startOfWeek, onContextMenu, onHover, weekNum*/ 16639) {
				metadataresolver_changes.$$scope = { dirty, ctx };
			}

			metadataresolver.$set(metadataresolver_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(metadataresolver.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(metadataresolver.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(td);
			destroy_component$1(metadataresolver);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	
	
	let { weekNum } = $$props;
	let { days } = $$props;
	let { metadata } = $$props;
	let { onHover } = $$props;
	let { onClick } = $$props;
	let { onContextMenu } = $$props;
	let { selectedId = null } = $$props;
	let startOfWeek;
	const click_handler = e => onClick(startOfWeek, isMetaPressed(e));
	const contextmenu_handler = e => onContextMenu(days[0], e);
	const pointerover_handler = e => onHover(startOfWeek, e.target, isMetaPressed(e));

	$$self.$$set = $$props => {
		if ("weekNum" in $$props) $$invalidate(0, weekNum = $$props.weekNum);
		if ("days" in $$props) $$invalidate(1, days = $$props.days);
		if ("metadata" in $$props) $$invalidate(6, metadata = $$props.metadata);
		if ("onHover" in $$props) $$invalidate(2, onHover = $$props.onHover);
		if ("onClick" in $$props) $$invalidate(3, onClick = $$props.onClick);
		if ("onContextMenu" in $$props) $$invalidate(4, onContextMenu = $$props.onContextMenu);
		if ("selectedId" in $$props) $$invalidate(5, selectedId = $$props.selectedId);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*days*/ 2) {
			 $$invalidate(7, startOfWeek = getStartOfWeek(days));
		}
	};

	return [
		weekNum,
		days,
		onHover,
		onClick,
		onContextMenu,
		selectedId,
		metadata,
		startOfWeek,
		click_handler,
		contextmenu_handler,
		pointerover_handler
	];
}

class WeekNum extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-egt0yd-style")) add_css$4();

		init$1(this, options, instance$5, create_fragment$5, not_equal$1, {
			weekNum: 0,
			days: 1,
			metadata: 6,
			onHover: 2,
			onClick: 3,
			onContextMenu: 4,
			selectedId: 5
		});
	}
}

async function metadataReducer(promisedMetadata) {
    const meta = {
        dots: [],
        classes: [],
        dataAttributes: {},
    };
    const metas = await Promise.all(promisedMetadata);
    return metas.reduce((acc, meta) => ({
        classes: [...acc.classes, ...(meta.classes || [])],
        dataAttributes: Object.assign(acc.dataAttributes, meta.dataAttributes),
        dots: [...acc.dots, ...(meta.dots || [])],
    }), meta);
}
function getDailyMetadata(sources, date, ..._args) {
    return metadataReducer(sources.map((source) => source.getDailyMetadata(date)));
}
function getWeeklyMetadata(sources, date, ..._args) {
    return metadataReducer(sources.map((source) => source.getWeeklyMetadata(date)));
}

/* src\components\Calendar.svelte generated by Svelte v3.31.0 */

function add_css$5() {
	var style = element("style");
	style.id = "svelte-km7ymq-style";
	style.textContent = ".container.svelte-km7ymq{--color-background-heading:transparent;--color-background-day:transparent;--color-background-weeknum:transparent;--color-background-weekend:transparent;--color-dot:var(--text-muted);--color-arrow:var(--text-muted);--color-button:var(--text-muted);--color-text-title:var(--text-normal);--color-text-heading:var(--text-muted);--color-text-day:var(--text-normal);--color-text-today:var(--interactive-accent);--color-text-weeknum:var(--text-muted)}.container.svelte-km7ymq{padding:0 8px}th.svelte-km7ymq{text-align:center}.weekend.svelte-km7ymq{background-color:var(--color-background-weekend)}.calendar.svelte-km7ymq{border-collapse:collapse;width:100%}th.svelte-km7ymq{background-color:var(--color-background-heading);color:var(--color-text-heading);font-size:0.6em;letter-spacing:1px;padding:4px;text-transform:uppercase}";
	append(document.head, style);
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[17] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[20] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[23] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[26] = list[i];
	return child_ctx;
}

// (53:6) {#if showWeekNums}
function create_if_block_2(ctx) {
	let col;

	return {
		c() {
			col = element("col");
		},
		m(target, anchor) {
			insert(target, col, anchor);
		},
		d(detaching) {
			if (detaching) detach$1(col);
		}
	};
}

// (56:6) {#each month[1].days as date}
function create_each_block_3(ctx) {
	let col;

	return {
		c() {
			col = element("col");
			attr(col, "class", "svelte-km7ymq");
			toggle_class(col, "weekend", isWeekend(/*date*/ ctx[26]));
		},
		m(target, anchor) {
			insert(target, col, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*isWeekend, month*/ 16384) {
				toggle_class(col, "weekend", isWeekend(/*date*/ ctx[26]));
			}
		},
		d(detaching) {
			if (detaching) detach$1(col);
		}
	};
}

// (62:8) {#if showWeekNums}
function create_if_block_1(ctx) {
	let th;

	return {
		c() {
			th = element("th");
			th.textContent = "W";
			attr(th, "class", "svelte-km7ymq");
		},
		m(target, anchor) {
			insert(target, th, anchor);
		},
		d(detaching) {
			if (detaching) detach$1(th);
		}
	};
}

// (65:8) {#each daysOfWeek as dayOfWeek}
function create_each_block_2(ctx) {
	let th;
	let t_value = /*dayOfWeek*/ ctx[23] + "";
	let t;

	return {
		c() {
			th = element("th");
			t = text(t_value);
			attr(th, "class", "svelte-km7ymq");
		},
		m(target, anchor) {
			insert(target, th, anchor);
			append(th, t);
		},
		p(ctx, dirty) {
			if (dirty & /*daysOfWeek*/ 32768 && t_value !== (t_value = /*dayOfWeek*/ ctx[23] + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach$1(th);
		}
	};
}

// (73:10) {#if showWeekNums}
function create_if_block$2(ctx) {
	let weeknum;
	let current;

	const weeknum_spread_levels = [
		/*week*/ ctx[17],
		{
			metadata: getWeeklyMetadata(/*sources*/ ctx[8], /*week*/ ctx[17].days[0], /*today*/ ctx[10])
		},
		{ onClick: /*onClickWeek*/ ctx[7] },
		{
			onContextMenu: /*onContextMenuWeek*/ ctx[5]
		},
		{ onHover: /*onHoverWeek*/ ctx[3] },
		{ selectedId: /*selectedId*/ ctx[9] }
	];

	let weeknum_props = {};

	for (let i = 0; i < weeknum_spread_levels.length; i += 1) {
		weeknum_props = assign(weeknum_props, weeknum_spread_levels[i]);
	}

	weeknum = new WeekNum({ props: weeknum_props });

	return {
		c() {
			create_component$1(weeknum.$$.fragment);
		},
		m(target, anchor) {
			mount_component$1(weeknum, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const weeknum_changes = (dirty & /*month, getWeeklyMetadata, sources, today, onClickWeek, onContextMenuWeek, onHoverWeek, selectedId*/ 18344)
			? get_spread_update(weeknum_spread_levels, [
					dirty & /*month*/ 16384 && get_spread_object(/*week*/ ctx[17]),
					dirty & /*getWeeklyMetadata, sources, month, today*/ 17664 && {
						metadata: getWeeklyMetadata(/*sources*/ ctx[8], /*week*/ ctx[17].days[0], /*today*/ ctx[10])
					},
					dirty & /*onClickWeek*/ 128 && { onClick: /*onClickWeek*/ ctx[7] },
					dirty & /*onContextMenuWeek*/ 32 && {
						onContextMenu: /*onContextMenuWeek*/ ctx[5]
					},
					dirty & /*onHoverWeek*/ 8 && { onHover: /*onHoverWeek*/ ctx[3] },
					dirty & /*selectedId*/ 512 && { selectedId: /*selectedId*/ ctx[9] }
				])
			: {};

			weeknum.$set(weeknum_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(weeknum.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(weeknum.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component$1(weeknum, detaching);
		}
	};
}

// (83:10) {#each week.days as day (day.format())}
function create_each_block_1(key_1, ctx) {
	let first;
	let day;
	let current;

	day = new Day({
			props: {
				date: /*day*/ ctx[20],
				today: /*today*/ ctx[10],
				displayedMonth: /*displayedMonth*/ ctx[0],
				onClick: /*onClickDay*/ ctx[6],
				onContextMenu: /*onContextMenuDay*/ ctx[4],
				onHover: /*onHoverDay*/ ctx[2],
				metadata: getDailyMetadata(/*sources*/ ctx[8], /*day*/ ctx[20], /*today*/ ctx[10]),
				selectedId: /*selectedId*/ ctx[9]
			}
		});

	return {
		key: key_1,
		first: null,
		c() {
			first = empty();
			create_component$1(day.$$.fragment);
			this.first = first;
		},
		m(target, anchor) {
			insert(target, first, anchor);
			mount_component$1(day, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const day_changes = {};
			if (dirty & /*month*/ 16384) day_changes.date = /*day*/ ctx[20];
			if (dirty & /*today*/ 1024) day_changes.today = /*today*/ ctx[10];
			if (dirty & /*displayedMonth*/ 1) day_changes.displayedMonth = /*displayedMonth*/ ctx[0];
			if (dirty & /*onClickDay*/ 64) day_changes.onClick = /*onClickDay*/ ctx[6];
			if (dirty & /*onContextMenuDay*/ 16) day_changes.onContextMenu = /*onContextMenuDay*/ ctx[4];
			if (dirty & /*onHoverDay*/ 4) day_changes.onHover = /*onHoverDay*/ ctx[2];
			if (dirty & /*sources, month, today*/ 17664) day_changes.metadata = getDailyMetadata(/*sources*/ ctx[8], /*day*/ ctx[20], /*today*/ ctx[10]);
			if (dirty & /*selectedId*/ 512) day_changes.selectedId = /*selectedId*/ ctx[9];
			day.$set(day_changes);
		},
		i(local) {
			if (current) return;
			transition_in$1(day.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out$1(day.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(first);
			destroy_component$1(day, detaching);
		}
	};
}

// (71:6) {#each month as week (week.weekNum)}
function create_each_block$2(key_1, ctx) {
	let tr;
	let t0;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let t1;
	let current;
	let if_block = /*showWeekNums*/ ctx[1] && create_if_block$2(ctx);
	let each_value_1 = /*week*/ ctx[17].days;
	const get_key = ctx => /*day*/ ctx[20].format();

	for (let i = 0; i < each_value_1.length; i += 1) {
		let child_ctx = get_each_context_1(ctx, each_value_1, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
	}

	return {
		key: key_1,
		first: null,
		c() {
			tr = element("tr");
			if (if_block) if_block.c();
			t0 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t1 = space();
			this.first = tr;
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			if (if_block) if_block.m(tr, null);
			append(tr, t0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tr, null);
			}

			append(tr, t1);
			current = true;
		},
		p(ctx, dirty) {
			if (/*showWeekNums*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*showWeekNums*/ 2) {
						transition_in$1(if_block, 1);
					}
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					transition_in$1(if_block, 1);
					if_block.m(tr, t0);
				}
			} else if (if_block) {
				group_outros();

				transition_out$1(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (dirty & /*month, today, displayedMonth, onClickDay, onContextMenuDay, onHoverDay, getDailyMetadata, sources, selectedId*/ 18261) {
				const each_value_1 = /*week*/ ctx[17].days;
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, tr, outro_and_destroy_block, create_each_block_1, t1, get_each_context_1);
				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(if_block);

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in$1(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out$1(if_block);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out$1(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(tr);
			if (if_block) if_block.d();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

function create_fragment$6(ctx) {
	let div;
	let nav;
	let t0;
	let table;
	let colgroup;
	let t1;
	let t2;
	let thead;
	let tr;
	let t3;
	let t4;
	let tbody;
	let each_blocks = [];
	let each2_lookup = new Map();
	let current;

	nav = new Nav({
			props: {
				today: /*today*/ ctx[10],
				displayedMonth: /*displayedMonth*/ ctx[0],
				incrementDisplayedMonth: /*incrementDisplayedMonth*/ ctx[11],
				decrementDisplayedMonth: /*decrementDisplayedMonth*/ ctx[12],
				resetDisplayedMonth: /*resetDisplayedMonth*/ ctx[13]
			}
		});

	let if_block0 = /*showWeekNums*/ ctx[1] && create_if_block_2();
	let each_value_3 = /*month*/ ctx[14][1].days;
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks_2[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	let if_block1 = /*showWeekNums*/ ctx[1] && create_if_block_1();
	let each_value_2 = /*daysOfWeek*/ ctx[15];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	let each_value = /*month*/ ctx[14];
	const get_key = ctx => /*week*/ ctx[17].weekNum;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$2(ctx, each_value, i);
		let key = get_key(child_ctx);
		each2_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
	}

	return {
		c() {
			div = element("div");
			create_component$1(nav.$$.fragment);
			t0 = space();
			table = element("table");
			colgroup = element("colgroup");
			if (if_block0) if_block0.c();
			t1 = space();

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t2 = space();
			thead = element("thead");
			tr = element("tr");
			if (if_block1) if_block1.c();
			t3 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t4 = space();
			tbody = element("tbody");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(table, "class", "calendar svelte-km7ymq");
			attr(div, "id", "calendar-container");
			attr(div, "class", "container svelte-km7ymq");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component$1(nav, div, null);
			append(div, t0);
			append(div, table);
			append(table, colgroup);
			if (if_block0) if_block0.m(colgroup, null);
			append(colgroup, t1);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].m(colgroup, null);
			}

			append(table, t2);
			append(table, thead);
			append(thead, tr);
			if (if_block1) if_block1.m(tr, null);
			append(tr, t3);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(tr, null);
			}

			append(table, t4);
			append(table, tbody);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(tbody, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			const nav_changes = {};
			if (dirty & /*today*/ 1024) nav_changes.today = /*today*/ ctx[10];
			if (dirty & /*displayedMonth*/ 1) nav_changes.displayedMonth = /*displayedMonth*/ ctx[0];
			nav.$set(nav_changes);

			if (/*showWeekNums*/ ctx[1]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_2();
					if_block0.c();
					if_block0.m(colgroup, t1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*isWeekend, month*/ 16384) {
				each_value_3 = /*month*/ ctx[14][1].days;
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_3(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(colgroup, null);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_3.length;
			}

			if (/*showWeekNums*/ ctx[1]) {
				if (if_block1) ; else {
					if_block1 = create_if_block_1();
					if_block1.c();
					if_block1.m(tr, t3);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*daysOfWeek*/ 32768) {
				each_value_2 = /*daysOfWeek*/ ctx[15];
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tr, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_2.length;
			}

			if (dirty & /*month, today, displayedMonth, onClickDay, onContextMenuDay, onHoverDay, getDailyMetadata, sources, selectedId, getWeeklyMetadata, onClickWeek, onContextMenuWeek, onHoverWeek, showWeekNums*/ 18431) {
				const each_value = /*month*/ ctx[14];
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each2_lookup, tbody, outro_and_destroy_block, create_each_block$2, null, get_each_context$2);
				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in$1(nav.$$.fragment, local);

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in$1(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			transition_out$1(nav.$$.fragment, local);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out$1(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach$1(div);
			destroy_component$1(nav);
			if (if_block0) if_block0.d();
			destroy_each(each_blocks_2, detaching);
			if (if_block1) if_block1.d();
			destroy_each(each_blocks_1, detaching);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	
	
	let { localeData } = $$props;
	let { showWeekNums = false } = $$props;
	let { onHoverDay } = $$props;
	let { onHoverWeek } = $$props;
	let { onContextMenuDay } = $$props;
	let { onContextMenuWeek } = $$props;
	let { onClickDay } = $$props;
	let { onClickWeek } = $$props;
	let { sources = [] } = $$props;
	let { selectedId } = $$props;
	let { today = window.moment() } = $$props;
	let { displayedMonth = today } = $$props;
	let month;
	let daysOfWeek;

	function incrementDisplayedMonth() {
		$$invalidate(0, displayedMonth = displayedMonth.clone().add(1, "month"));
	}

	function decrementDisplayedMonth() {
		$$invalidate(0, displayedMonth = displayedMonth.clone().subtract(1, "month"));
	}

	function resetDisplayedMonth() {
		$$invalidate(0, displayedMonth = today.clone());
	}

	$$self.$$set = $$props => {
		if ("localeData" in $$props) $$invalidate(16, localeData = $$props.localeData);
		if ("showWeekNums" in $$props) $$invalidate(1, showWeekNums = $$props.showWeekNums);
		if ("onHoverDay" in $$props) $$invalidate(2, onHoverDay = $$props.onHoverDay);
		if ("onHoverWeek" in $$props) $$invalidate(3, onHoverWeek = $$props.onHoverWeek);
		if ("onContextMenuDay" in $$props) $$invalidate(4, onContextMenuDay = $$props.onContextMenuDay);
		if ("onContextMenuWeek" in $$props) $$invalidate(5, onContextMenuWeek = $$props.onContextMenuWeek);
		if ("onClickDay" in $$props) $$invalidate(6, onClickDay = $$props.onClickDay);
		if ("onClickWeek" in $$props) $$invalidate(7, onClickWeek = $$props.onClickWeek);
		if ("sources" in $$props) $$invalidate(8, sources = $$props.sources);
		if ("selectedId" in $$props) $$invalidate(9, selectedId = $$props.selectedId);
		if ("today" in $$props) $$invalidate(10, today = $$props.today);
		if ("displayedMonth" in $$props) $$invalidate(0, displayedMonth = $$props.displayedMonth);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*displayedMonth, localeData*/ 65537) {
			 $$invalidate(14, month = getMonth(displayedMonth, localeData));
		}

		if ($$self.$$.dirty & /*today, localeData*/ 66560) {
			 $$invalidate(15, daysOfWeek = getDaysOfWeek$1(today, localeData));
		}
	};

	return [
		displayedMonth,
		showWeekNums,
		onHoverDay,
		onHoverWeek,
		onContextMenuDay,
		onContextMenuWeek,
		onClickDay,
		onClickWeek,
		sources,
		selectedId,
		today,
		incrementDisplayedMonth,
		decrementDisplayedMonth,
		resetDisplayedMonth,
		month,
		daysOfWeek,
		localeData
	];
}

class Calendar extends SvelteComponent$1 {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-km7ymq-style")) add_css$5();

		init$1(this, options, instance$6, create_fragment$6, not_equal$1, {
			localeData: 16,
			showWeekNums: 1,
			onHoverDay: 2,
			onHoverWeek: 3,
			onContextMenuDay: 4,
			onContextMenuWeek: 5,
			onClickDay: 6,
			onClickWeek: 7,
			sources: 8,
			selectedId: 9,
			today: 10,
			displayedMonth: 0,
			incrementDisplayedMonth: 11,
			decrementDisplayedMonth: 12,
			resetDisplayedMonth: 13
		});
	}

	get incrementDisplayedMonth() {
		return this.$$.ctx[11];
	}

	get decrementDisplayedMonth() {
		return this.$$.ctx[12];
	}

	get resetDisplayedMonth() {
		return this.$$.ctx[13];
	}
}

const langToMomentLocale = {
    en: "en-gb",
    zh: "zh-cn",
    "zh-TW": "zh-tw",
    ru: "ru",
    ko: "ko",
    it: "it",
    id: "id",
    ro: "ro",
    "pt-BR": "pt-br",
    cz: "cs",
    da: "da",
    de: "de",
    es: "es",
    fr: "fr",
    no: "nn",
    pl: "pl",
    pt: "pt",
    tr: "tr",
    hi: "hi",
    nl: "nl",
    ar: "ar",
    ja: "ja",
};
const weekdays$1 = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
];
function overrideGlobalMomentWeekStart(weekStart) {
    const { moment } = window;
    const currentLocale = moment.locale();
    // Save the initial locale weekspec so that we can restore
    // it when toggling between the different options in settings.
    if (!window._bundledLocaleWeekSpec) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window._bundledLocaleWeekSpec = moment.localeData()._week;
    }
    if (weekStart === "locale") {
        moment.updateLocale(currentLocale, {
            week: window._bundledLocaleWeekSpec,
        });
    }
    else {
        moment.updateLocale(currentLocale, {
            week: {
                dow: weekdays$1.indexOf(weekStart) || 0,
            },
        });
    }
}
/**
 * Sets the locale used by the calendar. This allows the calendar to
 * default to the user's locale (e.g. Start Week on Sunday/Monday/Friday)
 *
 * @param localeOverride locale string (e.g. "en-US")
 */
function configureGlobalMomentLocale(localeOverride = "system-default", weekStart = "locale") {
    var _a;
    const obsidianLang = localStorage.getItem("language") || "en";
    const systemLang = (_a = navigator.language) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    let momentLocale = langToMomentLocale[obsidianLang];
    if (localeOverride !== "system-default") {
        momentLocale = localeOverride;
    }
    else if (systemLang.startsWith(obsidianLang)) {
        // If the system locale is more specific (en-gb vs en), use the system locale.
        momentLocale = systemLang;
    }
    const currentLocale = window.moment.locale(momentLocale);
    console.debug(`[Calendar] Trying to switch Moment.js global locale to ${momentLocale}, got ${currentLocale}`);
    overrideGlobalMomentWeekStart(weekStart);
    return currentLocale;
}

/* src/ui/Calendar.svelte generated by Svelte v3.32.3 */

function create_fragment$7(ctx) {
	let calendarbase;
	let updating_displayedMonth;
	let current;

	function calendarbase_displayedMonth_binding(value) {
		/*calendarbase_displayedMonth_binding*/ ctx[12](value);
	}

	let calendarbase_props = {
		sources: /*sources*/ ctx[1],
		today: /*today*/ ctx[9],
		onHoverDay: /*onHoverDay*/ ctx[2],
		onHoverWeek: /*onHoverWeek*/ ctx[3],
		onContextMenuDay: /*onContextMenuDay*/ ctx[6],
		onContextMenuWeek: /*onContextMenuWeek*/ ctx[7],
		onClickDay: /*onClickDay*/ ctx[4],
		onClickWeek: /*onClickWeek*/ ctx[5],
		localeData: /*today*/ ctx[9].localeData(),
		selectedId: /*$activeFile*/ ctx[10],
		showWeekNums: /*$settings*/ ctx[8].showWeeklyNote
	};

	if (/*displayedMonth*/ ctx[0] !== void 0) {
		calendarbase_props.displayedMonth = /*displayedMonth*/ ctx[0];
	}

	calendarbase = new Calendar({ props: calendarbase_props });
	binding_callbacks.push(() => bind(calendarbase, "displayedMonth", calendarbase_displayedMonth_binding));

	return {
		c() {
			create_component(calendarbase.$$.fragment);
		},
		m(target, anchor) {
			mount_component(calendarbase, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			const calendarbase_changes = {};
			if (dirty & /*sources*/ 2) calendarbase_changes.sources = /*sources*/ ctx[1];
			if (dirty & /*today*/ 512) calendarbase_changes.today = /*today*/ ctx[9];
			if (dirty & /*onHoverDay*/ 4) calendarbase_changes.onHoverDay = /*onHoverDay*/ ctx[2];
			if (dirty & /*onHoverWeek*/ 8) calendarbase_changes.onHoverWeek = /*onHoverWeek*/ ctx[3];
			if (dirty & /*onContextMenuDay*/ 64) calendarbase_changes.onContextMenuDay = /*onContextMenuDay*/ ctx[6];
			if (dirty & /*onContextMenuWeek*/ 128) calendarbase_changes.onContextMenuWeek = /*onContextMenuWeek*/ ctx[7];
			if (dirty & /*onClickDay*/ 16) calendarbase_changes.onClickDay = /*onClickDay*/ ctx[4];
			if (dirty & /*onClickWeek*/ 32) calendarbase_changes.onClickWeek = /*onClickWeek*/ ctx[5];
			if (dirty & /*today*/ 512) calendarbase_changes.localeData = /*today*/ ctx[9].localeData();
			if (dirty & /*$activeFile*/ 1024) calendarbase_changes.selectedId = /*$activeFile*/ ctx[10];
			if (dirty & /*$settings*/ 256) calendarbase_changes.showWeekNums = /*$settings*/ ctx[8].showWeeklyNote;

			if (!updating_displayedMonth && dirty & /*displayedMonth*/ 1) {
				updating_displayedMonth = true;
				calendarbase_changes.displayedMonth = /*displayedMonth*/ ctx[0];
				add_flush_callback(() => updating_displayedMonth = false);
			}

			calendarbase.$set(calendarbase_changes);
		},
		i(local) {
			if (current) return;
			transition_in(calendarbase.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(calendarbase.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(calendarbase, detaching);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let $settings;
	let $activeFile;
	component_subscribe($$self, settings, $$value => $$invalidate(8, $settings = $$value));
	component_subscribe($$self, activeFile, $$value => $$invalidate(10, $activeFile = $$value));
	
	
	let today;
	let { displayedMonth = today } = $$props;
	let { sources } = $$props;
	let { onHoverDay } = $$props;
	let { onHoverWeek } = $$props;
	let { onClickDay } = $$props;
	let { onClickWeek } = $$props;
	let { onContextMenuDay } = $$props;
	let { onContextMenuWeek } = $$props;

	function tick() {
		$$invalidate(9, today = window.moment());
	}

	function getToday(settings) {
		configureGlobalMomentLocale(settings.localeOverride, settings.weekStart);
		dailyNotes.reindex();
		weeklyNotes.reindex();
		return window.moment();
	}

	// 1 minute heartbeat to keep `today` reflecting the current day
	let heartbeat = setInterval(
		() => {
			tick();
			const isViewingCurrentMonth = displayedMonth.isSame(today, "day");

			if (isViewingCurrentMonth) {
				// if it's midnight on the last day of the month, this will
				// update the display to show the new month.
				$$invalidate(0, displayedMonth = today);
			}
		},
		1000 * 60
	);

	onDestroy(() => {
		clearInterval(heartbeat);
	});

	function calendarbase_displayedMonth_binding(value) {
		displayedMonth = value;
		$$invalidate(0, displayedMonth);
	}

	$$self.$$set = $$props => {
		if ("displayedMonth" in $$props) $$invalidate(0, displayedMonth = $$props.displayedMonth);
		if ("sources" in $$props) $$invalidate(1, sources = $$props.sources);
		if ("onHoverDay" in $$props) $$invalidate(2, onHoverDay = $$props.onHoverDay);
		if ("onHoverWeek" in $$props) $$invalidate(3, onHoverWeek = $$props.onHoverWeek);
		if ("onClickDay" in $$props) $$invalidate(4, onClickDay = $$props.onClickDay);
		if ("onClickWeek" in $$props) $$invalidate(5, onClickWeek = $$props.onClickWeek);
		if ("onContextMenuDay" in $$props) $$invalidate(6, onContextMenuDay = $$props.onContextMenuDay);
		if ("onContextMenuWeek" in $$props) $$invalidate(7, onContextMenuWeek = $$props.onContextMenuWeek);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*$settings*/ 256) {
			$$invalidate(9, today = getToday($settings));
		}
	};

	return [
		displayedMonth,
		sources,
		onHoverDay,
		onHoverWeek,
		onClickDay,
		onClickWeek,
		onContextMenuDay,
		onContextMenuWeek,
		$settings,
		today,
		$activeFile,
		tick,
		calendarbase_displayedMonth_binding
	];
}

class Calendar$1 extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$7, create_fragment$7, not_equal, {
			displayedMonth: 0,
			sources: 1,
			onHoverDay: 2,
			onHoverWeek: 3,
			onClickDay: 4,
			onClickWeek: 5,
			onContextMenuDay: 6,
			onContextMenuWeek: 7,
			tick: 11
		});
	}

	get tick() {
		return this.$$.ctx[11];
	}
}

function showFileMenu(app, file, position) {
    const fileMenu = new obsidian.Menu();
    fileMenu.addItem((item) => item
        .setTitle("Delete")
        .setIcon("trash")
        .onClick(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        app.fileManager.promptForFolderDeletion(file);
    }));
    app.workspace.trigger("file-menu", fileMenu, file, "calendar-context-menu", null);
    fileMenu.showAtPosition(position);
}

const getStreakClasses = (file) => {
    return classList({
        "has-note": !!file,
    });
};
const streakSource = {
    getDailyMetadata: async (date) => {
        const file = getDailyNote_1(date, get_store_value(dailyNotes));
        return {
            classes: getStreakClasses(file),
            dots: [],
        };
    },
    getWeeklyMetadata: async (date) => {
        const file = getWeeklyNote_1(date, get_store_value(weeklyNotes));
        return {
            classes: getStreakClasses(file),
            dots: [],
        };
    },
};

function getNoteTags(note) {
    var _a;
    if (!note) {
        return [];
    }
    const { metadataCache } = window.app;
    const frontmatter = (_a = metadataCache.getFileCache(note)) === null || _a === void 0 ? void 0 : _a.frontmatter;
    const tags = [];
    if (frontmatter) {
        const frontmatterTags = obsidian.parseFrontMatterTags(frontmatter) || [];
        tags.push(...frontmatterTags);
    }
    // strip the '#' at the beginning
    return tags.map((tag) => tag.substring(1));
}
function getFormattedTagAttributes(note) {
    const attrs = {};
    const tags = getNoteTags(note);
    const [emojiTags, nonEmojiTags] = partition(tags, (tag) => /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/.test(tag));
    if (nonEmojiTags) {
        attrs["data-tags"] = nonEmojiTags.join(" ");
    }
    if (emojiTags) {
        attrs["data-emoji-tag"] = emojiTags[0];
    }
    return attrs;
}
const customTagsSource = {
    getDailyMetadata: async (date) => {
        const file = getDailyNote_1(date, get_store_value(dailyNotes));
        return {
            dataAttributes: getFormattedTagAttributes(file),
            dots: [],
        };
    },
    getWeeklyMetadata: async (date) => {
        const file = getWeeklyNote_1(date, get_store_value(weeklyNotes));
        return {
            dataAttributes: getFormattedTagAttributes(file),
            dots: [],
        };
    },
};

async function getNumberOfRemainingTasks(note) {
    if (!note) {
        return 0;
    }
    const { vault } = window.app;
    const fileContents = await vault.cachedRead(note);
    return (fileContents.match(/(-|\*) \[ \]/g) || []).length;
}
async function getDotsForDailyNote(dailyNote) {
    if (!dailyNote) {
        return [];
    }
    const numTasks = await getNumberOfRemainingTasks(dailyNote);
    const dots = [];
    if (numTasks) {
        dots.push({
            className: "task",
            color: "default",
            isFilled: false,
        });
    }
    return dots;
}
const tasksSource = {
    getDailyMetadata: async (date) => {
        const file = getDailyNote_1(date, get_store_value(dailyNotes));
        const dots = await getDotsForDailyNote(file);
        return {
            dots,
        };
    },
    getWeeklyMetadata: async (date) => {
        const file = getWeeklyNote_1(date, get_store_value(weeklyNotes));
        const dots = await getDotsForDailyNote(file);
        return {
            dots,
        };
    },
};

const NUM_MAX_DOTS = 5;
async function getWordLengthAsDots(note) {
    const { wordsPerDot = DEFAULT_WORDS_PER_DOT } = get_store_value(settings);
    if (!note || wordsPerDot <= 0) {
        return 0;
    }
    const fileContents = await window.app.vault.cachedRead(note);
    const wordCount = getWordCount(fileContents);
    const numDots = wordCount / wordsPerDot;
    return clamp(Math.floor(numDots), 1, NUM_MAX_DOTS);
}
async function getDotsForDailyNote$1(dailyNote) {
    if (!dailyNote) {
        return [];
    }
    const numSolidDots = await getWordLengthAsDots(dailyNote);
    const dots = [];
    for (let i = 0; i < numSolidDots; i++) {
        dots.push({
            color: "default",
            isFilled: true,
        });
    }
    return dots;
}
const wordCountSource = {
    getDailyMetadata: async (date) => {
        const file = getDailyNote_1(date, get_store_value(dailyNotes));
        const dots = await getDotsForDailyNote$1(file);
        return {
            dots,
        };
    },
    getWeeklyMetadata: async (date) => {
        const file = getWeeklyNote_1(date, get_store_value(weeklyNotes));
        const dots = await getDotsForDailyNote$1(file);
        return {
            dots,
        };
    },
};

class CalendarView extends obsidian.ItemView {
    constructor(leaf) {
        super(leaf);
        this.openOrCreateDailyNote = this.openOrCreateDailyNote.bind(this);
        this.openOrCreateWeeklyNote = this.openOrCreateWeeklyNote.bind(this);
        this.onNoteSettingsUpdate = this.onNoteSettingsUpdate.bind(this);
        this.onFileCreated = this.onFileCreated.bind(this);
        this.onFileDeleted = this.onFileDeleted.bind(this);
        this.onFileModified = this.onFileModified.bind(this);
        this.onFileOpen = this.onFileOpen.bind(this);
        this.onHoverDay = this.onHoverDay.bind(this);
        this.onHoverWeek = this.onHoverWeek.bind(this);
        this.onContextMenuDay = this.onContextMenuDay.bind(this);
        this.onContextMenuWeek = this.onContextMenuWeek.bind(this);
        this.registerEvent(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.app.workspace.on("periodic-notes:settings-updated", this.onNoteSettingsUpdate));
        this.registerEvent(this.app.vault.on("create", this.onFileCreated));
        this.registerEvent(this.app.vault.on("delete", this.onFileDeleted));
        this.registerEvent(this.app.vault.on("modify", this.onFileModified));
        this.registerEvent(this.app.workspace.on("file-open", this.onFileOpen));
        this.settings = null;
        settings.subscribe((val) => {
            this.settings = val;
            // Refresh the calendar if settings change
            if (this.calendar) {
                this.calendar.tick();
            }
        });
    }
    getViewType() {
        return VIEW_TYPE_CALENDAR;
    }
    getDisplayText() {
        return "Calendar";
    }
    getIcon() {
        return "calendar-with-checkmark";
    }
    onClose() {
        if (this.calendar) {
            this.calendar.$destroy();
        }
        return Promise.resolve();
    }
    async onOpen() {
        // Integration point: external plugins can listen for `calendar:open`
        // to feed in additional sources.
        const sources = [
            customTagsSource,
            streakSource,
            wordCountSource,
            tasksSource,
        ];
        this.app.workspace.trigger(TRIGGER_ON_OPEN, sources);
        this.calendar = new Calendar$1({
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            target: this.contentEl,
            props: {
                onClickDay: this.openOrCreateDailyNote,
                onClickWeek: this.openOrCreateWeeklyNote,
                onHoverDay: this.onHoverDay,
                onHoverWeek: this.onHoverWeek,
                onContextMenuDay: this.onContextMenuDay,
                onContextMenuWeek: this.onContextMenuWeek,
                sources,
            },
        });
    }
    onHoverDay(date, targetEl, isMetaPressed) {
        if (!isMetaPressed) {
            return;
        }
        const { format } = getDailyNoteSettings_1();
        const note = getDailyNote_1(date, get_store_value(dailyNotes));
        this.app.workspace.trigger("link-hover", this, targetEl, date.format(format), note === null || note === void 0 ? void 0 : note.path);
    }
    onHoverWeek(date, targetEl, isMetaPressed) {
        if (!isMetaPressed) {
            return;
        }
        const note = getWeeklyNote_1(date, get_store_value(weeklyNotes));
        const { format } = getWeeklyNoteSettings_1();
        this.app.workspace.trigger("link-hover", this, targetEl, date.format(format), note === null || note === void 0 ? void 0 : note.path);
    }
    onContextMenuDay(date, event) {
        const note = getDailyNote_1(date, get_store_value(dailyNotes));
        if (!note) {
            // If no file exists for a given day, show nothing.
            return;
        }
        showFileMenu(this.app, note, {
            x: event.pageX,
            y: event.pageY,
        });
    }
    onContextMenuWeek(date, event) {
        const note = getWeeklyNote_1(date, get_store_value(weeklyNotes));
        if (!note) {
            // If no file exists for a given day, show nothing.
            return;
        }
        showFileMenu(this.app, note, {
            x: event.pageX,
            y: event.pageY,
        });
    }
    onNoteSettingsUpdate() {
        dailyNotes.reindex();
        weeklyNotes.reindex();
        this.updateActiveFile();
    }
    async onFileDeleted(file) {
        if (getDateFromFile_1(file, "day")) {
            dailyNotes.reindex();
            this.updateActiveFile();
        }
        if (getDateFromFile_1(file, "week")) {
            weeklyNotes.reindex();
            this.updateActiveFile();
        }
    }
    async onFileModified(file) {
        const date = getDateFromFile_1(file, "day") || getDateFromFile_1(file, "week");
        if (date && this.calendar) {
            this.calendar.tick();
        }
    }
    onFileCreated(file) {
        if (this.app.workspace.layoutReady && this.calendar) {
            if (getDateFromFile_1(file, "day")) {
                dailyNotes.reindex();
                this.calendar.tick();
            }
            if (getDateFromFile_1(file, "week")) {
                weeklyNotes.reindex();
                this.calendar.tick();
            }
        }
    }
    onFileOpen(_file) {
        if (this.app.workspace.layoutReady) {
            this.updateActiveFile();
        }
    }
    updateActiveFile() {
        const { view } = this.app.workspace.activeLeaf;
        let file = null;
        if (view instanceof obsidian.FileView) {
            file = view.file;
        }
        activeFile.setFile(file);
        if (this.calendar) {
            this.calendar.tick();
        }
    }
    revealActiveNote() {
        const { moment } = window;
        const { activeLeaf } = this.app.workspace;
        if (activeLeaf.view instanceof obsidian.FileView) {
            // Check to see if the active note is a daily-note
            let date = getDateFromFile_1(activeLeaf.view.file, "day");
            if (date) {
                this.calendar.$set({ displayedMonth: date });
                return;
            }
            // Check to see if the active note is a weekly-note
            const { format } = getWeeklyNoteSettings_1();
            date = moment(activeLeaf.view.file.basename, format, true);
            if (date.isValid()) {
                this.calendar.$set({ displayedMonth: date });
                return;
            }
        }
    }
    async openOrCreateWeeklyNote(date, inNewSplit) {
        const { workspace } = this.app;
        const startOfWeek = date.clone().startOf("week");
        const existingFile = getWeeklyNote_1(date, get_store_value(weeklyNotes));
        if (!existingFile) {
            // File doesn't exist
            tryToCreateWeeklyNote(startOfWeek, inNewSplit, this.settings, (file) => {
                activeFile.setFile(file);
            });
            return;
        }
        const leaf = inNewSplit
            ? workspace.splitActiveLeaf()
            : workspace.getUnpinnedLeaf();
        await leaf.openFile(existingFile);
        activeFile.setFile(existingFile);
    }
    async openOrCreateDailyNote(date, inNewSplit) {
        const { workspace } = this.app;
        const existingFile = getDailyNote_1(date, get_store_value(dailyNotes));
        if (!existingFile) {
            // File doesn't exist
            tryToCreateDailyNote(date, inNewSplit, this.settings, (dailyNote) => {
                activeFile.setFile(dailyNote);
            });
            return;
        }
        const leaf = inNewSplit
            ? workspace.splitActiveLeaf()
            : workspace.getUnpinnedLeaf();
        await leaf.openFile(existingFile);
        activeFile.setFile(existingFile);
    }
}

class CalendarPlugin extends obsidian.Plugin {
    onunload() {
        this.app.workspace
            .getLeavesOfType(VIEW_TYPE_CALENDAR)
            .forEach((leaf) => leaf.detach());
    }
    async onload() {
        this.register(settings.subscribe((value) => {
            this.options = value;
        }));
        this.registerView(VIEW_TYPE_CALENDAR, (leaf) => (this.view = new CalendarView(leaf)));
        this.addCommand({
            id: "show-calendar-view",
            name: "Open view",
            checkCallback: (checking) => {
                if (checking) {
                    return (this.app.workspace.getLeavesOfType(VIEW_TYPE_CALENDAR).length === 0);
                }
                this.initLeaf();
            },
        });
        this.addCommand({
            id: "open-weekly-note",
            name: "Open Weekly Note",
            checkCallback: (checking) => {
                if (checking) {
                    return !appHasPeriodicNotesPluginLoaded();
                }
                this.view.openOrCreateWeeklyNote(window.moment(), false);
            },
        });
        this.addCommand({
            id: "reveal-active-note",
            name: "Reveal active note",
            callback: () => this.view.revealActiveNote(),
        });
        await this.loadOptions();
        this.addSettingTab(new CalendarSettingsTab(this.app, this));
        if (this.app.workspace.layoutReady) {
            this.initLeaf();
        }
        else {
            this.registerEvent(this.app.workspace.on("layout-ready", this.initLeaf.bind(this)));
        }
    }
    initLeaf() {
        if (this.app.workspace.getLeavesOfType(VIEW_TYPE_CALENDAR).length) {
            return;
        }
        this.app.workspace.getRightLeaf(false).setViewState({
            type: VIEW_TYPE_CALENDAR,
        });
    }
    async loadOptions() {
        const options = await this.loadData();
        settings.update((old) => {
            return Object.assign(Object.assign({}, old), (options || {}));
        });
        await this.saveData(this.options);
    }
    async writeOptions(changeOpts) {
        settings.update((old) => (Object.assign(Object.assign({}, old), changeOpts(old))));
        await this.saveData(this.options);
    }
}

module.exports = CalendarPlugin;
