'use strict';

var path = require('path');
var obsidian = require('obsidian');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

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

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {}
}

function cloneUnlessOtherwiseSpecified(value, options) {
	return (options.clone !== false && options.isMergeableObject(value))
		? deepmerge(emptyTarget(value), value, options)
		: value
}

function defaultArrayMerge(target, source, options) {
	return target.concat(source).map(function(element) {
		return cloneUnlessOtherwiseSpecified(element, options)
	})
}

function getMergeFunction(key, options) {
	if (!options.customMerge) {
		return deepmerge
	}
	var customMerge = options.customMerge(key);
	return typeof customMerge === 'function' ? customMerge : deepmerge
}

function getEnumerableOwnPropertySymbols(target) {
	return Object.getOwnPropertySymbols
		? Object.getOwnPropertySymbols(target).filter(function(symbol) {
			return target.propertyIsEnumerable(symbol)
		})
		: []
}

function getKeys(target) {
	return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))
}

function propertyIsOnObject(object, property) {
	try {
		return property in object
	} catch(_) {
		return false
	}
}

// Protects from prototype poisoning and unexpected merging up the prototype chain.
function propertyIsUnsafe(target, key) {
	return propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,
		&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,
			&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.
}

function mergeObject(target, source, options) {
	var destination = {};
	if (options.isMergeableObject(target)) {
		getKeys(target).forEach(function(key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
		});
	}
	getKeys(source).forEach(function(key) {
		if (propertyIsUnsafe(target, key)) {
			return
		}

		if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
		} else {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
		}
	});
	return destination
}

function deepmerge(target, source, options) {
	options = options || {};
	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
	options.isMergeableObject = options.isMergeableObject || isMergeableObject;
	// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
	// implementations can use it. The caller may not replace it.
	options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;

	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, options)
	} else if (sourceIsArray) {
		return options.arrayMerge(target, source, options)
	} else {
		return mergeObject(target, source, options)
	}
}

deepmerge.all = function deepmergeAll(array, options) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array')
	}

	return array.reduce(function(prev, next) {
		return deepmerge(prev, next, options)
	}, {})
};

var deepmerge_1 = deepmerge;

var cjs = deepmerge_1;

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

const WIN_SLASH = '\\\\/';
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;

/**
 * Posix glob regex
 */

const DOT_LITERAL = '\\.';
const PLUS_LITERAL = '\\+';
const QMARK_LITERAL = '\\?';
const SLASH_LITERAL = '\\/';
const ONE_CHAR = '(?=.)';
const QMARK = '[^/]';
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;

const POSIX_CHARS = {
  DOT_LITERAL,
  PLUS_LITERAL,
  QMARK_LITERAL,
  SLASH_LITERAL,
  ONE_CHAR,
  QMARK,
  END_ANCHOR,
  DOTS_SLASH,
  NO_DOT,
  NO_DOTS,
  NO_DOT_SLASH,
  NO_DOTS_SLASH,
  QMARK_NO_DOT,
  STAR,
  START_ANCHOR
};

/**
 * Windows glob regex
 */

const WINDOWS_CHARS = {
  ...POSIX_CHARS,

  SLASH_LITERAL: `[${WIN_SLASH}]`,
  QMARK: WIN_NO_SLASH,
  STAR: `${WIN_NO_SLASH}*?`,
  DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
  NO_DOT: `(?!${DOT_LITERAL})`,
  NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
  NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
  QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
  START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
  END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
};

/**
 * POSIX Bracket Regex
 */

const POSIX_REGEX_SOURCE = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};

var constants = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE,

  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,

  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    '***': '*',
    '**/**': '**',
    '**/**/**': '**'
  },

  // Digits
  CHAR_0: 48, /* 0 */
  CHAR_9: 57, /* 9 */

  // Alphabet chars.
  CHAR_UPPERCASE_A: 65, /* A */
  CHAR_LOWERCASE_A: 97, /* a */
  CHAR_UPPERCASE_Z: 90, /* Z */
  CHAR_LOWERCASE_Z: 122, /* z */

  CHAR_LEFT_PARENTHESES: 40, /* ( */
  CHAR_RIGHT_PARENTHESES: 41, /* ) */

  CHAR_ASTERISK: 42, /* * */

  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38, /* & */
  CHAR_AT: 64, /* @ */
  CHAR_BACKWARD_SLASH: 92, /* \ */
  CHAR_CARRIAGE_RETURN: 13, /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94, /* ^ */
  CHAR_COLON: 58, /* : */
  CHAR_COMMA: 44, /* , */
  CHAR_DOT: 46, /* . */
  CHAR_DOUBLE_QUOTE: 34, /* " */
  CHAR_EQUAL: 61, /* = */
  CHAR_EXCLAMATION_MARK: 33, /* ! */
  CHAR_FORM_FEED: 12, /* \f */
  CHAR_FORWARD_SLASH: 47, /* / */
  CHAR_GRAVE_ACCENT: 96, /* ` */
  CHAR_HASH: 35, /* # */
  CHAR_HYPHEN_MINUS: 45, /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60, /* < */
  CHAR_LEFT_CURLY_BRACE: 123, /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91, /* [ */
  CHAR_LINE_FEED: 10, /* \n */
  CHAR_NO_BREAK_SPACE: 160, /* \u00A0 */
  CHAR_PERCENT: 37, /* % */
  CHAR_PLUS: 43, /* + */
  CHAR_QUESTION_MARK: 63, /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62, /* > */
  CHAR_RIGHT_CURLY_BRACE: 125, /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93, /* ] */
  CHAR_SEMICOLON: 59, /* ; */
  CHAR_SINGLE_QUOTE: 39, /* ' */
  CHAR_SPACE: 32, /*   */
  CHAR_TAB: 9, /* \t */
  CHAR_UNDERSCORE: 95, /* _ */
  CHAR_VERTICAL_LINE: 124, /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, /* \uFEFF */

  SEP: path__default['default'].sep,

  /**
   * Create EXTGLOB_CHARS
   */

  extglobChars(chars) {
    return {
      '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
      '?': { type: 'qmark', open: '(?:', close: ')?' },
      '+': { type: 'plus', open: '(?:', close: ')+' },
      '*': { type: 'star', open: '(?:', close: ')*' },
      '@': { type: 'at', open: '(?:', close: ')' }
    };
  },

  /**
   * Create GLOB_CHARS
   */

  globChars(win32) {
    return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
  }
};

var utils = createCommonjsModule(function (module, exports) {


const win32 = process.platform === 'win32';
const {
  REGEX_BACKSLASH,
  REGEX_REMOVE_BACKSLASH,
  REGEX_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_GLOBAL
} = constants;

exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
exports.toPosixSlashes = str => str.replace(REGEX_BACKSLASH, '/');

exports.removeBackslashes = str => {
  return str.replace(REGEX_REMOVE_BACKSLASH, match => {
    return match === '\\' ? '' : match;
  });
};

exports.supportsLookbehinds = () => {
  const segs = process.version.slice(1).split('.').map(Number);
  if (segs.length === 3 && segs[0] >= 9 || (segs[0] === 8 && segs[1] >= 10)) {
    return true;
  }
  return false;
};

exports.isWindows = options => {
  if (options && typeof options.windows === 'boolean') {
    return options.windows;
  }
  return win32 === true || path__default['default'].sep === '\\';
};

exports.escapeLast = (input, char, lastIdx) => {
  const idx = input.lastIndexOf(char, lastIdx);
  if (idx === -1) return input;
  if (input[idx - 1] === '\\') return exports.escapeLast(input, char, idx - 1);
  return `${input.slice(0, idx)}\\${input.slice(idx)}`;
};

exports.removePrefix = (input, state = {}) => {
  let output = input;
  if (output.startsWith('./')) {
    output = output.slice(2);
    state.prefix = './';
  }
  return output;
};

exports.wrapOutput = (input, state = {}, options = {}) => {
  const prepend = options.contains ? '' : '^';
  const append = options.contains ? '' : '$';

  let output = `${prepend}(?:${input})${append}`;
  if (state.negated === true) {
    output = `(?:^(?!${output}).*$)`;
  }
  return output;
};
});

const {
  CHAR_ASTERISK,             /* * */
  CHAR_AT,                   /* @ */
  CHAR_BACKWARD_SLASH,       /* \ */
  CHAR_COMMA,                /* , */
  CHAR_DOT,                  /* . */
  CHAR_EXCLAMATION_MARK,     /* ! */
  CHAR_FORWARD_SLASH,        /* / */
  CHAR_LEFT_CURLY_BRACE,     /* { */
  CHAR_LEFT_PARENTHESES,     /* ( */
  CHAR_LEFT_SQUARE_BRACKET,  /* [ */
  CHAR_PLUS,                 /* + */
  CHAR_QUESTION_MARK,        /* ? */
  CHAR_RIGHT_CURLY_BRACE,    /* } */
  CHAR_RIGHT_PARENTHESES,    /* ) */
  CHAR_RIGHT_SQUARE_BRACKET  /* ] */
} = constants;

const isPathSeparator = code => {
  return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};

const depth = token => {
  if (token.isPrefix !== true) {
    token.depth = token.isGlobstar ? Infinity : 1;
  }
};

/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), and `negated` (true if the path starts with `!`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */

const scan = (input, options) => {
  const opts = options || {};

  const length = input.length - 1;
  const scanToEnd = opts.parts === true || opts.scanToEnd === true;
  const slashes = [];
  const tokens = [];
  const parts = [];

  let str = input;
  let index = -1;
  let start = 0;
  let lastIndex = 0;
  let isBrace = false;
  let isBracket = false;
  let isGlob = false;
  let isExtglob = false;
  let isGlobstar = false;
  let braceEscaped = false;
  let backslashes = false;
  let negated = false;
  let finished = false;
  let braces = 0;
  let prev;
  let code;
  let token = { value: '', depth: 0, isGlob: false };

  const eos = () => index >= length;
  const peek = () => str.charCodeAt(index + 1);
  const advance = () => {
    prev = code;
    return str.charCodeAt(++index);
  };

  while (index < length) {
    code = advance();
    let next;

    if (code === CHAR_BACKWARD_SLASH) {
      backslashes = token.backslashes = true;
      code = advance();

      if (code === CHAR_LEFT_CURLY_BRACE) {
        braceEscaped = true;
      }
      continue;
    }

    if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
      braces++;

      while (eos() !== true && (code = advance())) {
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          continue;
        }

        if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (braceEscaped !== true && code === CHAR_COMMA) {
          isBrace = token.isBrace = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }

          break;
        }

        if (code === CHAR_RIGHT_CURLY_BRACE) {
          braces--;

          if (braces === 0) {
            braceEscaped = false;
            isBrace = token.isBrace = true;
            finished = true;
            break;
          }
        }
      }

      if (scanToEnd === true) {
        continue;
      }

      break;
    }

    if (code === CHAR_FORWARD_SLASH) {
      slashes.push(index);
      tokens.push(token);
      token = { value: '', depth: 0, isGlob: false };

      if (finished === true) continue;
      if (prev === CHAR_DOT && index === (start + 1)) {
        start += 2;
        continue;
      }

      lastIndex = index + 1;
      continue;
    }

    if (opts.noext !== true) {
      const isExtglobChar = code === CHAR_PLUS
        || code === CHAR_AT
        || code === CHAR_ASTERISK
        || code === CHAR_QUESTION_MARK
        || code === CHAR_EXCLAMATION_MARK;

      if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
        isGlob = token.isGlob = true;
        isExtglob = token.isExtglob = true;
        finished = true;

        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }

            if (code === CHAR_RIGHT_PARENTHESES) {
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
    }

    if (code === CHAR_ASTERISK) {
      if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_QUESTION_MARK) {
      isGlob = token.isGlob = true;
      finished = true;

      if (scanToEnd === true) {
        continue;
      }
      break;
    }

    if (code === CHAR_LEFT_SQUARE_BRACKET) {
      while (eos() !== true && (next = advance())) {
        if (next === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          advance();
          continue;
        }

        if (next === CHAR_RIGHT_SQUARE_BRACKET) {
          isBracket = token.isBracket = true;
          isGlob = token.isGlob = true;
          finished = true;

          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
    }

    if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
      negated = token.negated = true;
      start++;
      continue;
    }

    if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
      isGlob = token.isGlob = true;

      if (scanToEnd === true) {
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_LEFT_PARENTHESES) {
            backslashes = token.backslashes = true;
            code = advance();
            continue;
          }

          if (code === CHAR_RIGHT_PARENTHESES) {
            finished = true;
            break;
          }
        }
        continue;
      }
      break;
    }

    if (isGlob === true) {
      finished = true;

      if (scanToEnd === true) {
        continue;
      }

      break;
    }
  }

  if (opts.noext === true) {
    isExtglob = false;
    isGlob = false;
  }

  let base = str;
  let prefix = '';
  let glob = '';

  if (start > 0) {
    prefix = str.slice(0, start);
    str = str.slice(start);
    lastIndex -= start;
  }

  if (base && isGlob === true && lastIndex > 0) {
    base = str.slice(0, lastIndex);
    glob = str.slice(lastIndex);
  } else if (isGlob === true) {
    base = '';
    glob = str;
  } else {
    base = str;
  }

  if (base && base !== '' && base !== '/' && base !== str) {
    if (isPathSeparator(base.charCodeAt(base.length - 1))) {
      base = base.slice(0, -1);
    }
  }

  if (opts.unescape === true) {
    if (glob) glob = utils.removeBackslashes(glob);

    if (base && backslashes === true) {
      base = utils.removeBackslashes(base);
    }
  }

  const state = {
    prefix,
    input,
    start,
    base,
    glob,
    isBrace,
    isBracket,
    isGlob,
    isExtglob,
    isGlobstar,
    negated
  };

  if (opts.tokens === true) {
    state.maxDepth = 0;
    if (!isPathSeparator(code)) {
      tokens.push(token);
    }
    state.tokens = tokens;
  }

  if (opts.parts === true || opts.tokens === true) {
    let prevIndex;

    for (let idx = 0; idx < slashes.length; idx++) {
      const n = prevIndex ? prevIndex + 1 : start;
      const i = slashes[idx];
      const value = input.slice(n, i);
      if (opts.tokens) {
        if (idx === 0 && start !== 0) {
          tokens[idx].isPrefix = true;
          tokens[idx].value = prefix;
        } else {
          tokens[idx].value = value;
        }
        depth(tokens[idx]);
        state.maxDepth += tokens[idx].depth;
      }
      if (idx !== 0 || value !== '') {
        parts.push(value);
      }
      prevIndex = i;
    }

    if (prevIndex && prevIndex + 1 < input.length) {
      const value = input.slice(prevIndex + 1);
      parts.push(value);

      if (opts.tokens) {
        tokens[tokens.length - 1].value = value;
        depth(tokens[tokens.length - 1]);
        state.maxDepth += tokens[tokens.length - 1].depth;
      }
    }

    state.slashes = slashes;
    state.parts = parts;
  }

  return state;
};

var scan_1 = scan;

/**
 * Constants
 */

const {
  MAX_LENGTH,
  POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1,
  REGEX_NON_SPECIAL_CHARS,
  REGEX_SPECIAL_CHARS_BACKREF,
  REPLACEMENTS
} = constants;

/**
 * Helpers
 */

const expandRange = (args, options) => {
  if (typeof options.expandRange === 'function') {
    return options.expandRange(...args, options);
  }

  args.sort();
  const value = `[${args.join('-')}]`;

  try {
    /* eslint-disable-next-line no-new */
    new RegExp(value);
  } catch (ex) {
    return args.map(v => utils.escapeRegex(v)).join('..');
  }

  return value;
};

/**
 * Create the message for a syntax error
 */

const syntaxError = (type, char) => {
  return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};

/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */

const parse = (input, options) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }

  input = REPLACEMENTS[input] || input;

  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;

  let len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  const bos = { type: 'bos', value: '', output: opts.prepend || '' };
  const tokens = [bos];

  const capture = opts.capture ? '' : '?:';
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const PLATFORM_CHARS = constants.globChars(win32);
  const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);

  const {
    DOT_LITERAL,
    PLUS_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  } = PLATFORM_CHARS;

  const globstar = (opts) => {
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const nodot = opts.dot ? '' : NO_DOT;
  const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
  let star = opts.bash === true ? globstar(opts) : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  // minimatch options support
  if (typeof opts.noext === 'boolean') {
    opts.noextglob = opts.noext;
  }

  const state = {
    input,
    index: -1,
    start: 0,
    dot: opts.dot === true,
    consumed: '',
    output: '',
    prefix: '',
    backtrack: false,
    negated: false,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: false,
    tokens
  };

  input = utils.removePrefix(input, state);
  len = input.length;

  const extglobs = [];
  const braces = [];
  const stack = [];
  let prev = bos;
  let value;

  /**
   * Tokenizing helpers
   */

  const eos = () => state.index === len - 1;
  const peek = state.peek = (n = 1) => input[state.index + n];
  const advance = state.advance = () => input[++state.index];
  const remaining = () => input.slice(state.index + 1);
  const consume = (value = '', num = 0) => {
    state.consumed += value;
    state.index += num;
  };
  const append = token => {
    state.output += token.output != null ? token.output : token.value;
    consume(token.value);
  };

  const negate = () => {
    let count = 1;

    while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
      advance();
      state.start++;
      count++;
    }

    if (count % 2 === 0) {
      return false;
    }

    state.negated = true;
    state.start++;
    return true;
  };

  const increment = type => {
    state[type]++;
    stack.push(type);
  };

  const decrement = type => {
    state[type]--;
    stack.pop();
  };

  /**
   * Push tokens onto the tokens array. This helper speeds up
   * tokenizing by 1) helping us avoid backtracking as much as possible,
   * and 2) helping us avoid creating extra tokens when consecutive
   * characters are plain text. This improves performance and simplifies
   * lookbehinds.
   */

  const push = tok => {
    if (prev.type === 'globstar') {
      const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
      const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'));

      if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = 'star';
        prev.value = '*';
        prev.output = star;
        state.output += prev.output;
      }
    }

    if (extglobs.length && tok.type !== 'paren' && !EXTGLOB_CHARS[tok.value]) {
      extglobs[extglobs.length - 1].inner += tok.value;
    }

    if (tok.value || tok.output) append(tok);
    if (prev && prev.type === 'text' && tok.type === 'text') {
      prev.value += tok.value;
      prev.output = (prev.output || '') + tok.value;
      return;
    }

    tok.prev = prev;
    tokens.push(tok);
    prev = tok;
  };

  const extglobOpen = (type, value) => {
    const token = { ...EXTGLOB_CHARS[value], conditions: 1, inner: '' };

    token.prev = prev;
    token.parens = state.parens;
    token.output = state.output;
    const output = (opts.capture ? '(' : '') + token.open;

    increment('parens');
    push({ type, value, output: state.output ? '' : ONE_CHAR });
    push({ type: 'paren', extglob: true, value: advance(), output });
    extglobs.push(token);
  };

  const extglobClose = token => {
    let output = token.close + (opts.capture ? ')' : '');

    if (token.type === 'negate') {
      let extglobStar = star;

      if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
        extglobStar = globstar(opts);
      }

      if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
        output = token.close = `)$))${extglobStar}`;
      }

      if (token.prev.type === 'bos' && eos()) {
        state.negatedExtglob = true;
      }
    }

    push({ type: 'paren', extglob: true, value, output });
    decrement('parens');
  };

  /**
   * Fast paths
   */

  if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
    let backslashes = false;

    let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
      if (first === '\\') {
        backslashes = true;
        return m;
      }

      if (first === '?') {
        if (esc) {
          return esc + first + (rest ? QMARK.repeat(rest.length) : '');
        }
        if (index === 0) {
          return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
        }
        return QMARK.repeat(chars.length);
      }

      if (first === '.') {
        return DOT_LITERAL.repeat(chars.length);
      }

      if (first === '*') {
        if (esc) {
          return esc + first + (rest ? star : '');
        }
        return star;
      }
      return esc ? m : `\\${m}`;
    });

    if (backslashes === true) {
      if (opts.unescape === true) {
        output = output.replace(/\\/g, '');
      } else {
        output = output.replace(/\\+/g, m => {
          return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
        });
      }
    }

    if (output === input && opts.contains === true) {
      state.output = input;
      return state;
    }

    state.output = utils.wrapOutput(output, state, options);
    return state;
  }

  /**
   * Tokenize input until we reach end-of-string
   */

  while (!eos()) {
    value = advance();

    if (value === '\u0000') {
      continue;
    }

    /**
     * Escaped characters
     */

    if (value === '\\') {
      const next = peek();

      if (next === '/' && opts.bash !== true) {
        continue;
      }

      if (next === '.' || next === ';') {
        continue;
      }

      if (!next) {
        value += '\\';
        push({ type: 'text', value });
        continue;
      }

      // collapse slashes to reduce potential for exploits
      const match = /^\\+/.exec(remaining());
      let slashes = 0;

      if (match && match[0].length > 2) {
        slashes = match[0].length;
        state.index += slashes;
        if (slashes % 2 !== 0) {
          value += '\\';
        }
      }

      if (opts.unescape === true) {
        value = advance() || '';
      } else {
        value += advance() || '';
      }

      if (state.brackets === 0) {
        push({ type: 'text', value });
        continue;
      }
    }

    /**
     * If we're inside a regex character class, continue
     * until we reach the closing bracket.
     */

    if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
      if (opts.posix !== false && value === ':') {
        const inner = prev.value.slice(1);
        if (inner.includes('[')) {
          prev.posix = true;

          if (inner.includes(':')) {
            const idx = prev.value.lastIndexOf('[');
            const pre = prev.value.slice(0, idx);
            const rest = prev.value.slice(idx + 2);
            const posix = POSIX_REGEX_SOURCE$1[rest];
            if (posix) {
              prev.value = pre + posix;
              state.backtrack = true;
              advance();

              if (!bos.output && tokens.indexOf(prev) === 1) {
                bos.output = ONE_CHAR;
              }
              continue;
            }
          }
        }
      }

      if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
        value = `\\${value}`;
      }

      if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
        value = `\\${value}`;
      }

      if (opts.posix === true && value === '!' && prev.value === '[') {
        value = '^';
      }

      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * If we're inside a quoted string, continue
     * until we reach the closing double quote.
     */

    if (state.quotes === 1 && value !== '"') {
      value = utils.escapeRegex(value);
      prev.value += value;
      append({ value });
      continue;
    }

    /**
     * Double quotes
     */

    if (value === '"') {
      state.quotes = state.quotes === 1 ? 0 : 1;
      if (opts.keepQuotes === true) {
        push({ type: 'text', value });
      }
      continue;
    }

    /**
     * Parentheses
     */

    if (value === '(') {
      increment('parens');
      push({ type: 'paren', value });
      continue;
    }

    if (value === ')') {
      if (state.parens === 0 && opts.strictBrackets === true) {
        throw new SyntaxError(syntaxError('opening', '('));
      }

      const extglob = extglobs[extglobs.length - 1];
      if (extglob && state.parens === extglob.parens + 1) {
        extglobClose(extglobs.pop());
        continue;
      }

      push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
      decrement('parens');
      continue;
    }

    /**
     * Square brackets
     */

    if (value === '[') {
      if (opts.nobracket === true || !remaining().includes(']')) {
        if (opts.nobracket !== true && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('closing', ']'));
        }

        value = `\\${value}`;
      } else {
        increment('brackets');
      }

      push({ type: 'bracket', value });
      continue;
    }

    if (value === ']') {
      if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      if (state.brackets === 0) {
        if (opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError('opening', '['));
        }

        push({ type: 'text', value, output: `\\${value}` });
        continue;
      }

      decrement('brackets');

      const prevValue = prev.value.slice(1);
      if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
        value = `/${value}`;
      }

      prev.value += value;
      append({ value });

      // when literal brackets are explicitly disabled
      // assume we should match with a regex character class
      if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
        continue;
      }

      const escaped = utils.escapeRegex(prev.value);
      state.output = state.output.slice(0, -prev.value.length);

      // when literal brackets are explicitly enabled
      // assume we should escape the brackets to match literal characters
      if (opts.literalBrackets === true) {
        state.output += escaped;
        prev.value = escaped;
        continue;
      }

      // when the user specifies nothing, try to match both
      prev.value = `(${capture}${escaped}|${prev.value})`;
      state.output += prev.value;
      continue;
    }

    /**
     * Braces
     */

    if (value === '{' && opts.nobrace !== true) {
      increment('braces');

      const open = {
        type: 'brace',
        value,
        output: '(',
        outputIndex: state.output.length,
        tokensIndex: state.tokens.length
      };

      braces.push(open);
      push(open);
      continue;
    }

    if (value === '}') {
      const brace = braces[braces.length - 1];

      if (opts.nobrace === true || !brace) {
        push({ type: 'text', value, output: value });
        continue;
      }

      let output = ')';

      if (brace.dots === true) {
        const arr = tokens.slice();
        const range = [];

        for (let i = arr.length - 1; i >= 0; i--) {
          tokens.pop();
          if (arr[i].type === 'brace') {
            break;
          }
          if (arr[i].type !== 'dots') {
            range.unshift(arr[i].value);
          }
        }

        output = expandRange(range, opts);
        state.backtrack = true;
      }

      if (brace.comma !== true && brace.dots !== true) {
        const out = state.output.slice(0, brace.outputIndex);
        const toks = state.tokens.slice(brace.tokensIndex);
        brace.value = brace.output = '\\{';
        value = output = '\\}';
        state.output = out;
        for (const t of toks) {
          state.output += (t.output || t.value);
        }
      }

      push({ type: 'brace', value, output });
      decrement('braces');
      braces.pop();
      continue;
    }

    /**
     * Pipes
     */

    if (value === '|') {
      if (extglobs.length > 0) {
        extglobs[extglobs.length - 1].conditions++;
      }
      push({ type: 'text', value });
      continue;
    }

    /**
     * Commas
     */

    if (value === ',') {
      let output = value;

      const brace = braces[braces.length - 1];
      if (brace && stack[stack.length - 1] === 'braces') {
        brace.comma = true;
        output = '|';
      }

      push({ type: 'comma', value, output });
      continue;
    }

    /**
     * Slashes
     */

    if (value === '/') {
      // if the beginning of the glob is "./", advance the start
      // to the current index, and don't add the "./" characters
      // to the state. This greatly simplifies lookbehinds when
      // checking for BOS characters like "!" and "." (not "./")
      if (prev.type === 'dot' && state.index === state.start + 1) {
        state.start = state.index + 1;
        state.consumed = '';
        state.output = '';
        tokens.pop();
        prev = bos; // reset "prev" to the first token
        continue;
      }

      push({ type: 'slash', value, output: SLASH_LITERAL });
      continue;
    }

    /**
     * Dots
     */

    if (value === '.') {
      if (state.braces > 0 && prev.type === 'dot') {
        if (prev.value === '.') prev.output = DOT_LITERAL;
        const brace = braces[braces.length - 1];
        prev.type = 'dots';
        prev.output += value;
        prev.value += value;
        brace.dots = true;
        continue;
      }

      if ((state.braces + state.parens) === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
        push({ type: 'text', value, output: DOT_LITERAL });
        continue;
      }

      push({ type: 'dot', value, output: DOT_LITERAL });
      continue;
    }

    /**
     * Question marks
     */

    if (value === '?') {
      const isGroup = prev && prev.value === '(';
      if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('qmark', value);
        continue;
      }

      if (prev && prev.type === 'paren') {
        const next = peek();
        let output = value;

        if (next === '<' && !utils.supportsLookbehinds()) {
          throw new Error('Node.js v10 or higher is required for regex lookbehinds');
        }

        if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
          output = `\\${value}`;
        }

        push({ type: 'text', value, output });
        continue;
      }

      if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
        push({ type: 'qmark', value, output: QMARK_NO_DOT });
        continue;
      }

      push({ type: 'qmark', value, output: QMARK });
      continue;
    }

    /**
     * Exclamation
     */

    if (value === '!') {
      if (opts.noextglob !== true && peek() === '(') {
        if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
          extglobOpen('negate', value);
          continue;
        }
      }

      if (opts.nonegate !== true && state.index === 0) {
        negate();
        continue;
      }
    }

    /**
     * Plus
     */

    if (value === '+') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        extglobOpen('plus', value);
        continue;
      }

      if ((prev && prev.value === '(') || opts.regex === false) {
        push({ type: 'plus', value, output: PLUS_LITERAL });
        continue;
      }

      if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
        push({ type: 'plus', value });
        continue;
      }

      push({ type: 'plus', value: PLUS_LITERAL });
      continue;
    }

    /**
     * Plain text
     */

    if (value === '@') {
      if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
        push({ type: 'at', extglob: true, value, output: '' });
        continue;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Plain text
     */

    if (value !== '*') {
      if (value === '$' || value === '^') {
        value = `\\${value}`;
      }

      const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
      if (match) {
        value += match[0];
        state.index += match[0].length;
      }

      push({ type: 'text', value });
      continue;
    }

    /**
     * Stars
     */

    if (prev && (prev.type === 'globstar' || prev.star === true)) {
      prev.type = 'star';
      prev.star = true;
      prev.value += value;
      prev.output = star;
      state.backtrack = true;
      state.globstar = true;
      consume(value);
      continue;
    }

    let rest = remaining();
    if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
      extglobOpen('star', value);
      continue;
    }

    if (prev.type === 'star') {
      if (opts.noglobstar === true) {
        consume(value);
        continue;
      }

      const prior = prev.prev;
      const before = prior.prev;
      const isStart = prior.type === 'slash' || prior.type === 'bos';
      const afterStar = before && (before.type === 'star' || before.type === 'globstar');

      if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
      const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
      if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
        push({ type: 'star', value, output: '' });
        continue;
      }

      // strip consecutive `/**/`
      while (rest.slice(0, 3) === '/**') {
        const after = input[state.index + 4];
        if (after && after !== '/') {
          break;
        }
        rest = rest.slice(3);
        consume('/**', 3);
      }

      if (prior.type === 'bos' && eos()) {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = globstar(opts);
        state.output = prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)');
        prev.value += value;
        state.globstar = true;
        state.output += prior.output + prev.output;
        consume(value);
        continue;
      }

      if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
        const end = rest[1] !== void 0 ? '|$' : '';

        state.output = state.output.slice(0, -(prior.output + prev.output).length);
        prior.output = `(?:${prior.output}`;

        prev.type = 'globstar';
        prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
        prev.value += value;

        state.output += prior.output + prev.output;
        state.globstar = true;

        consume(value + advance());

        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      if (prior.type === 'bos' && rest[0] === '/') {
        prev.type = 'globstar';
        prev.value += value;
        prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
        state.output = prev.output;
        state.globstar = true;
        consume(value + advance());
        push({ type: 'slash', value: '/', output: '' });
        continue;
      }

      // remove single star from output
      state.output = state.output.slice(0, -prev.output.length);

      // reset previous token to globstar
      prev.type = 'globstar';
      prev.output = globstar(opts);
      prev.value += value;

      // reset output with globstar
      state.output += prev.output;
      state.globstar = true;
      consume(value);
      continue;
    }

    const token = { type: 'star', value, output: star };

    if (opts.bash === true) {
      token.output = '.*?';
      if (prev.type === 'bos' || prev.type === 'slash') {
        token.output = nodot + token.output;
      }
      push(token);
      continue;
    }

    if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
      token.output = value;
      push(token);
      continue;
    }

    if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
      if (prev.type === 'dot') {
        state.output += NO_DOT_SLASH;
        prev.output += NO_DOT_SLASH;

      } else if (opts.dot === true) {
        state.output += NO_DOTS_SLASH;
        prev.output += NO_DOTS_SLASH;

      } else {
        state.output += nodot;
        prev.output += nodot;
      }

      if (peek() !== '*') {
        state.output += ONE_CHAR;
        prev.output += ONE_CHAR;
      }
    }

    push(token);
  }

  while (state.brackets > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'));
    state.output = utils.escapeLast(state.output, '[');
    decrement('brackets');
  }

  while (state.parens > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'));
    state.output = utils.escapeLast(state.output, '(');
    decrement('parens');
  }

  while (state.braces > 0) {
    if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'));
    state.output = utils.escapeLast(state.output, '{');
    decrement('braces');
  }

  if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
    push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
  }

  // rebuild the output if we had to backtrack at any point
  if (state.backtrack === true) {
    state.output = '';

    for (const token of state.tokens) {
      state.output += token.output != null ? token.output : token.value;

      if (token.suffix) {
        state.output += token.suffix;
      }
    }
  }

  return state;
};

/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */

parse.fastpaths = (input, options) => {
  const opts = { ...options };
  const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
  const len = input.length;
  if (len > max) {
    throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
  }

  input = REPLACEMENTS[input] || input;
  const win32 = utils.isWindows(options);

  // create constants based on platform, for windows or posix
  const {
    DOT_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOTS_SLASH,
    STAR,
    START_ANCHOR
  } = constants.globChars(win32);

  const nodot = opts.dot ? NO_DOTS : NO_DOT;
  const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
  const capture = opts.capture ? '' : '?:';
  const state = { negated: false, prefix: '' };
  let star = opts.bash === true ? '.*?' : STAR;

  if (opts.capture) {
    star = `(${star})`;
  }

  const globstar = (opts) => {
    if (opts.noglobstar === true) return star;
    return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
  };

  const create = str => {
    switch (str) {
      case '*':
        return `${nodot}${ONE_CHAR}${star}`;

      case '.*':
        return `${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*.*':
        return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '*/*':
        return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;

      case '**':
        return nodot + globstar(opts);

      case '**/*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;

      case '**/*.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;

      case '**/.*':
        return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;

      default: {
        const match = /^(.*?)\.(\w+)$/.exec(str);
        if (!match) return;

        const source = create(match[1]);
        if (!source) return;

        return source + DOT_LITERAL + match[2];
      }
    }
  };

  const output = utils.removePrefix(input, state);
  let source = create(output);

  if (source && opts.strictSlashes !== true) {
    source += `${SLASH_LITERAL}?`;
  }

  return source;
};

var parse_1 = parse;

const isObject = val => val && typeof val === 'object' && !Array.isArray(val);

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */

const picomatch = (glob, options, returnState = false) => {
  if (Array.isArray(glob)) {
    const fns = glob.map(input => picomatch(input, options, returnState));
    const arrayMatcher = str => {
      for (const isMatch of fns) {
        const state = isMatch(str);
        if (state) return state;
      }
      return false;
    };
    return arrayMatcher;
  }

  const isState = isObject(glob) && glob.tokens && glob.input;

  if (glob === '' || (typeof glob !== 'string' && !isState)) {
    throw new TypeError('Expected pattern to be a non-empty string');
  }

  const opts = options || {};
  const posix = utils.isWindows(options);
  const regex = isState
    ? picomatch.compileRe(glob, options)
    : picomatch.makeRe(glob, options, false, true);

  const state = regex.state;
  delete regex.state;

  let isIgnored = () => false;
  if (opts.ignore) {
    const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
    isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
  }

  const matcher = (input, returnObject = false) => {
    const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
    const result = { glob, state, regex, posix, input, output, match, isMatch };

    if (typeof opts.onResult === 'function') {
      opts.onResult(result);
    }

    if (isMatch === false) {
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (isIgnored(input)) {
      if (typeof opts.onIgnore === 'function') {
        opts.onIgnore(result);
      }
      result.isMatch = false;
      return returnObject ? result : false;
    }

    if (typeof opts.onMatch === 'function') {
      opts.onMatch(result);
    }
    return returnObject ? result : true;
  };

  if (returnState) {
    matcher.state = state;
  }

  return matcher;
};

/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */

picomatch.test = (input, regex, options, { glob, posix } = {}) => {
  if (typeof input !== 'string') {
    throw new TypeError('Expected input to be a string');
  }

  if (input === '') {
    return { isMatch: false, output: '' };
  }

  const opts = options || {};
  const format = opts.format || (posix ? utils.toPosixSlashes : null);
  let match = input === glob;
  let output = (match && format) ? format(input) : input;

  if (match === false) {
    output = format ? format(input) : input;
    match = output === glob;
  }

  if (match === false || opts.capture === true) {
    if (opts.matchBase === true || opts.basename === true) {
      match = picomatch.matchBase(input, regex, options, posix);
    } else {
      match = regex.exec(output);
    }
  }

  return { isMatch: Boolean(match), match, output };
};

/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */

picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
  const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
  return regex.test(path__default['default'].basename(input));
};

/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);

/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */

picomatch.parse = (pattern, options) => {
  if (Array.isArray(pattern)) return pattern.map(p => picomatch.parse(p, options));
  return parse_1(pattern, { ...options, fastpaths: false });
};

/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * { prefix: '!./',
 *   input: '!./foo/*.js',
 *   start: 3,
 *   base: 'foo',
 *   glob: '*.js',
 *   isBrace: false,
 *   isBracket: false,
 *   isGlob: true,
 *   isExtglob: false,
 *   isGlobstar: false,
 *   negated: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */

picomatch.scan = (input, options) => scan_1(input, options);

/**
 * Create a regular expression from a parsed glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const state = picomatch.parse('*.js');
 * // picomatch.compileRe(state[, options]);
 *
 * console.log(picomatch.compileRe(state));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `state` The object returned from the `.parse` method.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

picomatch.compileRe = (parsed, options, returnOutput = false, returnState = false) => {
  if (returnOutput === true) {
    return parsed.output;
  }

  const opts = options || {};
  const prepend = opts.contains ? '' : '^';
  const append = opts.contains ? '' : '$';

  let source = `${prepend}(?:${parsed.output})${append}`;
  if (parsed && parsed.negated === true) {
    source = `^(?!${source}).*$`;
  }

  const regex = picomatch.toRegex(source, options);
  if (returnState === true) {
    regex.state = parsed;
  }

  return regex;
};

picomatch.makeRe = (input, options, returnOutput = false, returnState = false) => {
  if (!input || typeof input !== 'string') {
    throw new TypeError('Expected a non-empty string');
  }

  const opts = options || {};
  let parsed = { negated: false, fastpaths: true };
  let prefix = '';
  let output;

  if (input.startsWith('./')) {
    input = input.slice(2);
    prefix = parsed.prefix = './';
  }

  if (opts.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
    output = parse_1.fastpaths(input, options);
  }

  if (output === undefined) {
    parsed = parse_1(input, options);
    parsed.prefix = prefix + (parsed.prefix || '');
  } else {
    parsed.output = output;
  }

  return picomatch.compileRe(parsed, options, returnOutput, returnState);
};

/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

picomatch.toRegex = (source, options) => {
  try {
    const opts = options || {};
    return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
  } catch (err) {
    if (options && options.debug === true) throw err;
    return /$^/;
  }
};

/**
 * Picomatch constants.
 * @return {Object}
 */

picomatch.constants = constants;

/**
 * Expose "picomatch"
 */

var picomatch_1 = picomatch;

var picomatch$1 = picomatch_1;

var LinkIndexer = /** @class */ (function (_super) {
    __extends(LinkIndexer, _super);
    function LinkIndexer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinkIndexer.prototype.onInit = function () { };
    LinkIndexer.prototype.onload = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var loadedSettings;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.loadData()];
                    case 1:
                        loadedSettings = _b.sent();
                        if (loadedSettings) {
                            this.settings = cjs(new LinkIndexerSettings(), loadedSettings);
                            this.settings.usedLinks = [];
                            (_a = loadedSettings.usedLinks) === null || _a === void 0 ? void 0 : _a.forEach(function (r) {
                                _this.settings.usedLinks.push(cjs(new UsedLinks(), r));
                            });
                        }
                        else {
                            this.settings = new LinkIndexerSettings();
                        }
                        this.reloadSettings();
                        this.addSettingTab(new LinkIndexerSettingTab(this.app, this));
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkIndexer.prototype.onunload = function () {
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
    LinkIndexer.prototype.reloadSettings = function () {
        var _this = this;
        this.removeOwnCommands();
        this.globalExcludes = [];
        this.settings.usedLinks.forEach(function (r) {
            _this.globalExcludes.push(r.path);
            _this.addCommand({
                id: "link-indexer:used-links:" + r.name,
                name: "Used links - " + r.name,
                callback: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.generateAllUsedLinksIndex(getPresetByName(this.settings.usedLinks, r.name))];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); },
            });
        });
    };
    LinkIndexer.prototype.removeOwnCommands = function () {
        var _this = this;
        // @ts-ignore
        this.app.commands.listCommands().map(function (c) { return c.id; }).filter(function (c) { return c.startsWith(_this.manifest.id); }).forEach(function (c) {
            // @ts-ignore
            _this.app.commands.removeCommand(c);
        });
    };
    LinkIndexer.prototype.generateAllUsedLinksIndex = function (preset) {
        return __awaiter(this, void 0, void 0, function () {
            var uniqueLinks, files, sortedLinks, separator, content, exist, p;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!preset) {
                            return [2 /*return*/, new obsidian.Notice(preset + " was not found. Try reloading Obsidian.")];
                        }
                        uniqueLinks = {};
                        files = this.app.vault.getMarkdownFiles();
                        files.forEach(function (f) {
                            if (_this.isExcluded(f, preset.excludeFromFilenames, preset.excludeFromGlobs))
                                return;
                            _this.grabLinks(uniqueLinks, f, _this.app.metadataCache.getFileCache(f).links, preset);
                            if (preset.includeEmbeds) {
                                _this.grabLinks(uniqueLinks, f, _this.app.metadataCache.getFileCache(f).embeds, preset);
                            }
                        });
                        sortedLinks = Object.entries(uniqueLinks).sort(function (a, b) { return b[1].count - a[1].count; });
                        separator = preset.strictLineBreaks ? '\n\n' : '\n';
                        content = sortedLinks.map(function (l) { return l[1].count + " " + l[1].link; }).join(separator);
                        return [4 /*yield*/, this.app.vault.adapter.exists(obsidian.normalizePath(preset.path), false)];
                    case 1:
                        exist = _a.sent();
                        if (exist) {
                            p = this.app.vault.getAbstractFileByPath(obsidian.normalizePath(preset.path));
                            this.app.vault.adapter.write(obsidian.normalizePath(preset.path), content);
                        }
                        else {
                            this.app.vault.create(preset.path, content);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LinkIndexer.prototype.isExcluded = function (f, filenamePatterns, globPatterns) {
        var isGloballyExcluded = this.globalExcludes.some(function (g) { return pathEqual(g, f.path); });
        var isFilenameExcluded = filenamePatterns.some(function (p) { return new RegExp(p).test(f.name); });
        var isGlobExcluded = picomatch$1.isMatch(f.path, globPatterns);
        return isGloballyExcluded || isFilenameExcluded || isGlobExcluded;
    };
    LinkIndexer.prototype.grabLinks = function (uniqueLinks, f, links, preset) {
        var _this = this;
        links === null || links === void 0 ? void 0 : links.forEach(function (l) {
            var link = obsidian.getLinkpath(l.link);
            var originFile = _this.app.metadataCache.getFirstLinkpathDest(link, f.path);
            if (originFile && (preset.nonexistentOnly || _this.isExcluded(originFile, preset.excludeToFilenames, preset.excludeToGlobs))) {
                return;
            }
            var origin = originFile ? originFile.path : link;
            if (uniqueLinks[origin]) {
                uniqueLinks[origin].count += 1;
            }
            else {
                var rawLink = originFile ? _this.app.metadataCache.fileToLinktext(originFile, preset.path, true) : link;
                uniqueLinks[origin] = {
                    count: 1,
                    link: preset.linkToFiles ? "[[" + rawLink + "]]" : rawLink
                };
            }
        });
    };
    return LinkIndexer;
}(obsidian.Plugin));
var UsedLinks = /** @class */ (function () {
    function UsedLinks() {
        this.strictLineBreaks = true;
        this.includeEmbeds = true;
        this.linkToFiles = true;
        this.nonexistentOnly = false;
        this.excludeToFilenames = [];
        this.excludeToGlobs = [];
        this.excludeFromFilenames = [];
        this.excludeFromGlobs = [];
        this.name = Date.now().toString();
        this.path = "./used_links" + this.name + ".md";
    }
    return UsedLinks;
}());
var LinkIndexerSettings = /** @class */ (function () {
    function LinkIndexerSettings() {
        this.usedLinks = [];
    }
    return LinkIndexerSettings;
}());
function getPresetByName(presets, name) {
    return presets.find(function (r) { return r.name === name; });
}
var LinkIndexerSettingTab = /** @class */ (function (_super) {
    __extends(LinkIndexerSettingTab, _super);
    function LinkIndexerSettingTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LinkIndexerSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var plugin = this.plugin;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Used links' });
        plugin.settings.usedLinks.forEach(function (report) {
            new obsidian.Setting(containerEl)
                .setName('Preset name')
                .setDesc('Allowed characters: ASCII letters, digits, underscores, spaces')
                .addText(function (text) {
                return text.setPlaceholder(report.name)
                    .setPlaceholder(report.name)
                    .setValue(report.name)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.name = value;
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName('All used links')
                .setDesc('Path to the note that will contain all found links sorted by their occurrences')
                .addText(function (text) {
                return text
                    .setPlaceholder(report.path)
                    .setValue(report.path)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.path = value;
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName('Include embeds')
                .setDesc('When disabled, only direct links are counted. Enable to include embedded (trascluded) links.')
                .addToggle(function (value) {
                return value
                    .setValue(report.includeEmbeds)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.includeEmbeds = value;
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName('Nonexistent files only')
                .setDesc('When disabled, links to both existing and nonexisting files are counted.')
                .addToggle(function (value) {
                return value
                    .setValue(report.nonexistentOnly)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.nonexistentOnly = value;
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName('Strict line breaks')
                .setDesc('Corresponds to the same Editor setting: "off" = one line break, "on" = two line breaks.')
                .addToggle(function (value) {
                return value
                    .setValue(report.strictLineBreaks)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.strictLineBreaks = value;
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName('Link to files')
                .setDesc('When "on" the output file will use wiki-links to files. Disable if you don\'t want to pollute graph with it.')
                .addToggle(function (value) {
                return value
                    .setValue(report.linkToFiles)
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.linkToFiles = value;
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName('Exclude links from files')
                .setDesc('Expects regex patterns. Checks for filename without path.')
                .addTextArea(function (text) {
                return text
                    .setValue(report.excludeFromFilenames.join('\n'))
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.excludeFromFilenames = value.split('\n').filter(function (v) { return v; });
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName('Exclude links from paths')
                .setDesc('Expects path globs. Checks for file path including filename.')
                .addTextArea(function (text) {
                return text
                    .setValue(report.excludeFromGlobs.join('\n'))
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.excludeFromGlobs = value.split('\n').filter(function (v) { return v; });
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName('Exclude links to files')
                .setDesc('Expects regex patterns. Checks for filename without path.')
                .addTextArea(function (text) {
                return text
                    .setValue(report.excludeToFilenames.join('\n'))
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.excludeToFilenames = value.split('\n').filter(function (v) { return v; });
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            new obsidian.Setting(containerEl)
                .setName('Exclude links to paths')
                .setDesc('Expects path globs. Checks for file path including filename.')
                .addTextArea(function (text) {
                return text
                    .setValue(report.excludeToGlobs.join('\n'))
                    .onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                report.excludeToGlobs = value.split('\n').filter(function (v) { return v; });
                                return [4 /*yield*/, this.saveData({ refreshUI: false })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            var deleteButton = new obsidian.Setting(containerEl).addButton(function (extra) {
                return extra.setButtonText('Delete preset').onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                    var index;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                index = plugin.settings.usedLinks.findIndex(function (r) { return r.name === report.name; });
                                if (!(index > -1)) return [3 /*break*/, 2];
                                plugin.settings.usedLinks.splice(index, 1);
                                return [4 /*yield*/, this.saveData()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); });
            });
            deleteButton.settingEl.style.borderBottom = '1px solid var(--text-accent)';
        });
        var addButton = new obsidian.Setting(containerEl).addButton(function (button) {
            return button.setButtonText('Add preset').onClick(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            plugin.settings.usedLinks.push(new UsedLinks());
                            return [4 /*yield*/, this.saveData()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        addButton.infoEl.remove();
        addButton.settingEl.style.justifyContent = 'center';
    };
    LinkIndexerSettingTab.prototype.saveData = function (options) {
        if (options === void 0) { options = { refreshUI: true }; }
        return __awaiter(this, void 0, void 0, function () {
            var plugin;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        plugin = this.plugin;
                        return [4 /*yield*/, plugin.saveData(plugin.settings)];
                    case 1:
                        _a.sent();
                        plugin.reloadSettings();
                        if (options.refreshUI)
                            this.display();
                        return [2 /*return*/];
                }
            });
        });
    };
    return LinkIndexerSettingTab;
}(obsidian.PluginSettingTab));
function pathEqual(a, b) {
    if (a === b)
        return true;
    return removeDots(obsidian.normalizePath(a)) === removeDots(obsidian.normalizePath(b));
}
function removeDots(value) {
    return value.replace(/\\/g, '/')
        .replace(/^\.\//, '')
        .replace(/\/\.\//, '/');
}

module.exports = LinkIndexer;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm5vZGVfbW9kdWxlcy9kZWVwbWVyZ2UvZGlzdC9janMuanMiLCJub2RlX21vZHVsZXMvcGljb21hdGNoL2xpYi9jb25zdGFudHMuanMiLCJub2RlX21vZHVsZXMvcGljb21hdGNoL2xpYi91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3NjYW4uanMiLCJub2RlX21vZHVsZXMvcGljb21hdGNoL2xpYi9wYXJzZS5qcyIsIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvbGliL3BpY29tYXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9waWNvbWF0Y2gvaW5kZXguanMiLCJzcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG52YXIgX19zZXRNb2R1bGVEZWZhdWx0ID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgXCJkZWZhdWx0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHYgfSk7XHJcbn0pIDogZnVuY3Rpb24obywgdikge1xyXG4gICAgb1tcImRlZmF1bHRcIl0gPSB2O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0U3Rhcihtb2QpIHtcclxuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XHJcbiAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoayAhPT0gXCJkZWZhdWx0XCIgJiYgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIF9fY3JlYXRlQmluZGluZyhyZXN1bHQsIG1vZCwgayk7XHJcbiAgICBfX3NldE1vZHVsZURlZmF1bHQocmVzdWx0LCBtb2QpO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpc01lcmdlYWJsZU9iamVjdCA9IGZ1bmN0aW9uIGlzTWVyZ2VhYmxlT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiBpc05vbk51bGxPYmplY3QodmFsdWUpXG5cdFx0JiYgIWlzU3BlY2lhbCh2YWx1ZSlcbn07XG5cbmZ1bmN0aW9uIGlzTm9uTnVsbE9iamVjdCh2YWx1ZSkge1xuXHRyZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGlzU3BlY2lhbCh2YWx1ZSkge1xuXHR2YXIgc3RyaW5nVmFsdWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG5cdHJldHVybiBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcblx0XHR8fCBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG5cdFx0fHwgaXNSZWFjdEVsZW1lbnQodmFsdWUpXG59XG5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iNWFjOTYzZmI3OTFkMTI5OGU3ZjM5NjIzNjM4M2JjOTU1ZjkxNmMxL3NyYy9pc29tb3JwaGljL2NsYXNzaWMvZWxlbWVudC9SZWFjdEVsZW1lbnQuanMjTDIxLUwyNVxudmFyIGNhblVzZVN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBjYW5Vc2VTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG5cbmZ1bmN0aW9uIGlzUmVhY3RFbGVtZW50KHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFXG59XG5cbmZ1bmN0aW9uIGVtcHR5VGFyZ2V0KHZhbCkge1xuXHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gW10gOiB7fVxufVxuXG5mdW5jdGlvbiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCh2YWx1ZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gKG9wdGlvbnMuY2xvbmUgIT09IGZhbHNlICYmIG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodmFsdWUpKVxuXHRcdD8gZGVlcG1lcmdlKGVtcHR5VGFyZ2V0KHZhbHVlKSwgdmFsdWUsIG9wdGlvbnMpXG5cdFx0OiB2YWx1ZVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0QXJyYXlNZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gdGFyZ2V0LmNvbmNhdChzb3VyY2UpLm1hcChmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0cmV0dXJuIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKGVsZW1lbnQsIG9wdGlvbnMpXG5cdH0pXG59XG5cbmZ1bmN0aW9uIGdldE1lcmdlRnVuY3Rpb24oa2V5LCBvcHRpb25zKSB7XG5cdGlmICghb3B0aW9ucy5jdXN0b21NZXJnZSkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2Vcblx0fVxuXHR2YXIgY3VzdG9tTWVyZ2UgPSBvcHRpb25zLmN1c3RvbU1lcmdlKGtleSk7XG5cdHJldHVybiB0eXBlb2YgY3VzdG9tTWVyZ2UgPT09ICdmdW5jdGlvbicgPyBjdXN0b21NZXJnZSA6IGRlZXBtZXJnZVxufVxuXG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlT3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc1xuXHRcdD8gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpLmZpbHRlcihmdW5jdGlvbihzeW1ib2wpIHtcblx0XHRcdHJldHVybiB0YXJnZXQucHJvcGVydHlJc0VudW1lcmFibGUoc3ltYm9sKVxuXHRcdH0pXG5cdFx0OiBbXVxufVxuXG5mdW5jdGlvbiBnZXRLZXlzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KS5jb25jYXQoZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKVxufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUlzT25PYmplY3Qob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdHJldHVybiBwcm9wZXJ0eSBpbiBvYmplY3Rcblx0fSBjYXRjaChfKSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cblxuLy8gUHJvdGVjdHMgZnJvbSBwcm90b3R5cGUgcG9pc29uaW5nIGFuZCB1bmV4cGVjdGVkIG1lcmdpbmcgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbmZ1bmN0aW9uIHByb3BlcnR5SXNVbnNhZmUodGFyZ2V0LCBrZXkpIHtcblx0cmV0dXJuIHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgLy8gUHJvcGVydGllcyBhcmUgc2FmZSB0byBtZXJnZSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHRoZSB0YXJnZXQgeWV0LFxuXHRcdCYmICEoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpIC8vIHVuc2FmZSBpZiB0aGV5IGV4aXN0IHVwIHRoZSBwcm90b3R5cGUgY2hhaW4sXG5cdFx0XHQmJiBPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0YXJnZXQsIGtleSkpIC8vIGFuZCBhbHNvIHVuc2FmZSBpZiB0aGV5J3JlIG5vbmVudW1lcmFibGUuXG59XG5cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHZhciBkZXN0aW5hdGlvbiA9IHt9O1xuXHRpZiAob3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh0YXJnZXQpKSB7XG5cdFx0Z2V0S2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodGFyZ2V0W2tleV0sIG9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9XG5cdGdldEtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdGlmIChwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSkge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0aWYgKHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdChzb3VyY2Vba2V5XSkpIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZGVzdGluYXRpb25cbn1cblxuZnVuY3Rpb24gZGVlcG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRvcHRpb25zLmFycmF5TWVyZ2UgPSBvcHRpb25zLmFycmF5TWVyZ2UgfHwgZGVmYXVsdEFycmF5TWVyZ2U7XG5cdG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QgPSBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0IHx8IGlzTWVyZ2VhYmxlT2JqZWN0O1xuXHQvLyBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCBpcyBhZGRlZCB0byBgb3B0aW9uc2Agc28gdGhhdCBjdXN0b20gYXJyYXlNZXJnZSgpXG5cdC8vIGltcGxlbWVudGF0aW9ucyBjYW4gdXNlIGl0LiBUaGUgY2FsbGVyIG1heSBub3QgcmVwbGFjZSBpdC5cblx0b3B0aW9ucy5jbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkO1xuXG5cdHZhciBzb3VyY2VJc0FycmF5ID0gQXJyYXkuaXNBcnJheShzb3VyY2UpO1xuXHR2YXIgdGFyZ2V0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcblx0dmFyIHNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2ggPSBzb3VyY2VJc0FycmF5ID09PSB0YXJnZXRJc0FycmF5O1xuXG5cdGlmICghc291cmNlQW5kVGFyZ2V0VHlwZXNNYXRjaCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSBpZiAoc291cmNlSXNBcnJheSkge1xuXHRcdHJldHVybiBvcHRpb25zLmFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9XG59XG5cbmRlZXBtZXJnZS5hbGwgPSBmdW5jdGlvbiBkZWVwbWVyZ2VBbGwoYXJyYXksIG9wdGlvbnMpIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignZmlyc3QgYXJndW1lbnQgc2hvdWxkIGJlIGFuIGFycmF5Jylcblx0fVxuXG5cdHJldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgbmV4dCkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2UocHJldiwgbmV4dCwgb3B0aW9ucylcblx0fSwge30pXG59O1xuXG52YXIgZGVlcG1lcmdlXzEgPSBkZWVwbWVyZ2U7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVlcG1lcmdlXzE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdGggPSByZXF1aXJlKCdwYXRoJyk7XG5jb25zdCBXSU5fU0xBU0ggPSAnXFxcXFxcXFwvJztcbmNvbnN0IFdJTl9OT19TTEFTSCA9IGBbXiR7V0lOX1NMQVNIfV1gO1xuXG4vKipcbiAqIFBvc2l4IGdsb2IgcmVnZXhcbiAqL1xuXG5jb25zdCBET1RfTElURVJBTCA9ICdcXFxcLic7XG5jb25zdCBQTFVTX0xJVEVSQUwgPSAnXFxcXCsnO1xuY29uc3QgUU1BUktfTElURVJBTCA9ICdcXFxcPyc7XG5jb25zdCBTTEFTSF9MSVRFUkFMID0gJ1xcXFwvJztcbmNvbnN0IE9ORV9DSEFSID0gJyg/PS4pJztcbmNvbnN0IFFNQVJLID0gJ1teL10nO1xuY29uc3QgRU5EX0FOQ0hPUiA9IGAoPzoke1NMQVNIX0xJVEVSQUx9fCQpYDtcbmNvbnN0IFNUQVJUX0FOQ0hPUiA9IGAoPzpefCR7U0xBU0hfTElURVJBTH0pYDtcbmNvbnN0IERPVFNfU0xBU0ggPSBgJHtET1RfTElURVJBTH17MSwyfSR7RU5EX0FOQ0hPUn1gO1xuY29uc3QgTk9fRE9UID0gYCg/ISR7RE9UX0xJVEVSQUx9KWA7XG5jb25zdCBOT19ET1RTID0gYCg/ISR7U1RBUlRfQU5DSE9SfSR7RE9UU19TTEFTSH0pYDtcbmNvbnN0IE5PX0RPVF9TTEFTSCA9IGAoPyEke0RPVF9MSVRFUkFMfXswLDF9JHtFTkRfQU5DSE9SfSlgO1xuY29uc3QgTk9fRE9UU19TTEFTSCA9IGAoPyEke0RPVFNfU0xBU0h9KWA7XG5jb25zdCBRTUFSS19OT19ET1QgPSBgW14uJHtTTEFTSF9MSVRFUkFMfV1gO1xuY29uc3QgU1RBUiA9IGAke1FNQVJLfSo/YDtcblxuY29uc3QgUE9TSVhfQ0hBUlMgPSB7XG4gIERPVF9MSVRFUkFMLFxuICBQTFVTX0xJVEVSQUwsXG4gIFFNQVJLX0xJVEVSQUwsXG4gIFNMQVNIX0xJVEVSQUwsXG4gIE9ORV9DSEFSLFxuICBRTUFSSyxcbiAgRU5EX0FOQ0hPUixcbiAgRE9UU19TTEFTSCxcbiAgTk9fRE9ULFxuICBOT19ET1RTLFxuICBOT19ET1RfU0xBU0gsXG4gIE5PX0RPVFNfU0xBU0gsXG4gIFFNQVJLX05PX0RPVCxcbiAgU1RBUixcbiAgU1RBUlRfQU5DSE9SXG59O1xuXG4vKipcbiAqIFdpbmRvd3MgZ2xvYiByZWdleFxuICovXG5cbmNvbnN0IFdJTkRPV1NfQ0hBUlMgPSB7XG4gIC4uLlBPU0lYX0NIQVJTLFxuXG4gIFNMQVNIX0xJVEVSQUw6IGBbJHtXSU5fU0xBU0h9XWAsXG4gIFFNQVJLOiBXSU5fTk9fU0xBU0gsXG4gIFNUQVI6IGAke1dJTl9OT19TTEFTSH0qP2AsXG4gIERPVFNfU0xBU0g6IGAke0RPVF9MSVRFUkFMfXsxLDJ9KD86WyR7V0lOX1NMQVNIfV18JClgLFxuICBOT19ET1Q6IGAoPyEke0RPVF9MSVRFUkFMfSlgLFxuICBOT19ET1RTOiBgKD8hKD86XnxbJHtXSU5fU0xBU0h9XSkke0RPVF9MSVRFUkFMfXsxLDJ9KD86WyR7V0lOX1NMQVNIfV18JCkpYCxcbiAgTk9fRE9UX1NMQVNIOiBgKD8hJHtET1RfTElURVJBTH17MCwxfSg/Olske1dJTl9TTEFTSH1dfCQpKWAsXG4gIE5PX0RPVFNfU0xBU0g6IGAoPyEke0RPVF9MSVRFUkFMfXsxLDJ9KD86WyR7V0lOX1NMQVNIfV18JCkpYCxcbiAgUU1BUktfTk9fRE9UOiBgW14uJHtXSU5fU0xBU0h9XWAsXG4gIFNUQVJUX0FOQ0hPUjogYCg/Ol58WyR7V0lOX1NMQVNIfV0pYCxcbiAgRU5EX0FOQ0hPUjogYCg/Olske1dJTl9TTEFTSH1dfCQpYFxufTtcblxuLyoqXG4gKiBQT1NJWCBCcmFja2V0IFJlZ2V4XG4gKi9cblxuY29uc3QgUE9TSVhfUkVHRVhfU09VUkNFID0ge1xuICBhbG51bTogJ2EtekEtWjAtOScsXG4gIGFscGhhOiAnYS16QS1aJyxcbiAgYXNjaWk6ICdcXFxceDAwLVxcXFx4N0YnLFxuICBibGFuazogJyBcXFxcdCcsXG4gIGNudHJsOiAnXFxcXHgwMC1cXFxceDFGXFxcXHg3RicsXG4gIGRpZ2l0OiAnMC05JyxcbiAgZ3JhcGg6ICdcXFxceDIxLVxcXFx4N0UnLFxuICBsb3dlcjogJ2EteicsXG4gIHByaW50OiAnXFxcXHgyMC1cXFxceDdFICcsXG4gIHB1bmN0OiAnXFxcXC0hXCIjJCUmXFwnKClcXFxcKissLi86Ozw9Pj9AW1xcXFxdXl9ge3x9ficsXG4gIHNwYWNlOiAnIFxcXFx0XFxcXHJcXFxcblxcXFx2XFxcXGYnLFxuICB1cHBlcjogJ0EtWicsXG4gIHdvcmQ6ICdBLVphLXowLTlfJyxcbiAgeGRpZ2l0OiAnQS1GYS1mMC05J1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE1BWF9MRU5HVEg6IDEwMjQgKiA2NCxcbiAgUE9TSVhfUkVHRVhfU09VUkNFLFxuXG4gIC8vIHJlZ3VsYXIgZXhwcmVzc2lvbnNcbiAgUkVHRVhfQkFDS1NMQVNIOiAvXFxcXCg/IVsqKz9eJHt9KHwpW1xcXV0pL2csXG4gIFJFR0VYX05PTl9TUEVDSUFMX0NIQVJTOiAvXlteQCFbXFxdLiwkKis/Xnt9KCl8XFxcXC9dKy8sXG4gIFJFR0VYX1NQRUNJQUxfQ0hBUlM6IC9bLSorPy5eJHt9KHwpW1xcXV0vLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTX0JBQ0tSRUY6IC8oXFxcXD8pKChcXFcpKFxcMyopKS9nLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTX0dMT0JBTDogLyhbLSorPy5eJHt9KHwpW1xcXV0pL2csXG4gIFJFR0VYX1JFTU9WRV9CQUNLU0xBU0g6IC8oPzpcXFsuKj9bXlxcXFxdXFxdfFxcXFwoPz0uKSkvZyxcblxuICAvLyBSZXBsYWNlIGdsb2JzIHdpdGggZXF1aXZhbGVudCBwYXR0ZXJucyB0byByZWR1Y2UgcGFyc2luZyB0aW1lLlxuICBSRVBMQUNFTUVOVFM6IHtcbiAgICAnKioqJzogJyonLFxuICAgICcqKi8qKic6ICcqKicsXG4gICAgJyoqLyoqLyoqJzogJyoqJ1xuICB9LFxuXG4gIC8vIERpZ2l0c1xuICBDSEFSXzA6IDQ4LCAvKiAwICovXG4gIENIQVJfOTogNTcsIC8qIDkgKi9cblxuICAvLyBBbHBoYWJldCBjaGFycy5cbiAgQ0hBUl9VUFBFUkNBU0VfQTogNjUsIC8qIEEgKi9cbiAgQ0hBUl9MT1dFUkNBU0VfQTogOTcsIC8qIGEgKi9cbiAgQ0hBUl9VUFBFUkNBU0VfWjogOTAsIC8qIFogKi9cbiAgQ0hBUl9MT1dFUkNBU0VfWjogMTIyLCAvKiB6ICovXG5cbiAgQ0hBUl9MRUZUX1BBUkVOVEhFU0VTOiA0MCwgLyogKCAqL1xuICBDSEFSX1JJR0hUX1BBUkVOVEhFU0VTOiA0MSwgLyogKSAqL1xuXG4gIENIQVJfQVNURVJJU0s6IDQyLCAvKiAqICovXG5cbiAgLy8gTm9uLWFscGhhYmV0aWMgY2hhcnMuXG4gIENIQVJfQU1QRVJTQU5EOiAzOCwgLyogJiAqL1xuICBDSEFSX0FUOiA2NCwgLyogQCAqL1xuICBDSEFSX0JBQ0tXQVJEX1NMQVNIOiA5MiwgLyogXFwgKi9cbiAgQ0hBUl9DQVJSSUFHRV9SRVRVUk46IDEzLCAvKiBcXHIgKi9cbiAgQ0hBUl9DSVJDVU1GTEVYX0FDQ0VOVDogOTQsIC8qIF4gKi9cbiAgQ0hBUl9DT0xPTjogNTgsIC8qIDogKi9cbiAgQ0hBUl9DT01NQTogNDQsIC8qICwgKi9cbiAgQ0hBUl9ET1Q6IDQ2LCAvKiAuICovXG4gIENIQVJfRE9VQkxFX1FVT1RFOiAzNCwgLyogXCIgKi9cbiAgQ0hBUl9FUVVBTDogNjEsIC8qID0gKi9cbiAgQ0hBUl9FWENMQU1BVElPTl9NQVJLOiAzMywgLyogISAqL1xuICBDSEFSX0ZPUk1fRkVFRDogMTIsIC8qIFxcZiAqL1xuICBDSEFSX0ZPUldBUkRfU0xBU0g6IDQ3LCAvKiAvICovXG4gIENIQVJfR1JBVkVfQUNDRU5UOiA5NiwgLyogYCAqL1xuICBDSEFSX0hBU0g6IDM1LCAvKiAjICovXG4gIENIQVJfSFlQSEVOX01JTlVTOiA0NSwgLyogLSAqL1xuICBDSEFSX0xFRlRfQU5HTEVfQlJBQ0tFVDogNjAsIC8qIDwgKi9cbiAgQ0hBUl9MRUZUX0NVUkxZX0JSQUNFOiAxMjMsIC8qIHsgKi9cbiAgQ0hBUl9MRUZUX1NRVUFSRV9CUkFDS0VUOiA5MSwgLyogWyAqL1xuICBDSEFSX0xJTkVfRkVFRDogMTAsIC8qIFxcbiAqL1xuICBDSEFSX05PX0JSRUFLX1NQQUNFOiAxNjAsIC8qIFxcdTAwQTAgKi9cbiAgQ0hBUl9QRVJDRU5UOiAzNywgLyogJSAqL1xuICBDSEFSX1BMVVM6IDQzLCAvKiArICovXG4gIENIQVJfUVVFU1RJT05fTUFSSzogNjMsIC8qID8gKi9cbiAgQ0hBUl9SSUdIVF9BTkdMRV9CUkFDS0VUOiA2MiwgLyogPiAqL1xuICBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFOiAxMjUsIC8qIH0gKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVDogOTMsIC8qIF0gKi9cbiAgQ0hBUl9TRU1JQ09MT046IDU5LCAvKiA7ICovXG4gIENIQVJfU0lOR0xFX1FVT1RFOiAzOSwgLyogJyAqL1xuICBDSEFSX1NQQUNFOiAzMiwgLyogICAqL1xuICBDSEFSX1RBQjogOSwgLyogXFx0ICovXG4gIENIQVJfVU5ERVJTQ09SRTogOTUsIC8qIF8gKi9cbiAgQ0hBUl9WRVJUSUNBTF9MSU5FOiAxMjQsIC8qIHwgKi9cbiAgQ0hBUl9aRVJPX1dJRFRIX05PQlJFQUtfU1BBQ0U6IDY1Mjc5LCAvKiBcXHVGRUZGICovXG5cbiAgU0VQOiBwYXRoLnNlcCxcblxuICAvKipcbiAgICogQ3JlYXRlIEVYVEdMT0JfQ0hBUlNcbiAgICovXG5cbiAgZXh0Z2xvYkNoYXJzKGNoYXJzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICchJzogeyB0eXBlOiAnbmVnYXRlJywgb3BlbjogJyg/Oig/ISg/OicsIGNsb3NlOiBgKSkke2NoYXJzLlNUQVJ9KWAgfSxcbiAgICAgICc/JzogeyB0eXBlOiAncW1hcmsnLCBvcGVuOiAnKD86JywgY2xvc2U6ICcpPycgfSxcbiAgICAgICcrJzogeyB0eXBlOiAncGx1cycsIG9wZW46ICcoPzonLCBjbG9zZTogJykrJyB9LFxuICAgICAgJyonOiB7IHR5cGU6ICdzdGFyJywgb3BlbjogJyg/OicsIGNsb3NlOiAnKSonIH0sXG4gICAgICAnQCc6IHsgdHlwZTogJ2F0Jywgb3BlbjogJyg/OicsIGNsb3NlOiAnKScgfVxuICAgIH07XG4gIH0sXG5cbiAgLyoqXG4gICAqIENyZWF0ZSBHTE9CX0NIQVJTXG4gICAqL1xuXG4gIGdsb2JDaGFycyh3aW4zMikge1xuICAgIHJldHVybiB3aW4zMiA9PT0gdHJ1ZSA/IFdJTkRPV1NfQ0hBUlMgOiBQT1NJWF9DSEFSUztcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHdpbjMyID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbmNvbnN0IHtcbiAgUkVHRVhfQkFDS1NMQVNILFxuICBSRUdFWF9SRU1PVkVfQkFDS1NMQVNILFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTLFxuICBSRUdFWF9TUEVDSUFMX0NIQVJTX0dMT0JBTFxufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmV4cG9ydHMuaXNPYmplY3QgPSB2YWwgPT4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG5leHBvcnRzLmhhc1JlZ2V4Q2hhcnMgPSBzdHIgPT4gUkVHRVhfU1BFQ0lBTF9DSEFSUy50ZXN0KHN0cik7XG5leHBvcnRzLmlzUmVnZXhDaGFyID0gc3RyID0+IHN0ci5sZW5ndGggPT09IDEgJiYgZXhwb3J0cy5oYXNSZWdleENoYXJzKHN0cik7XG5leHBvcnRzLmVzY2FwZVJlZ2V4ID0gc3RyID0+IHN0ci5yZXBsYWNlKFJFR0VYX1NQRUNJQUxfQ0hBUlNfR0xPQkFMLCAnXFxcXCQxJyk7XG5leHBvcnRzLnRvUG9zaXhTbGFzaGVzID0gc3RyID0+IHN0ci5yZXBsYWNlKFJFR0VYX0JBQ0tTTEFTSCwgJy8nKTtcblxuZXhwb3J0cy5yZW1vdmVCYWNrc2xhc2hlcyA9IHN0ciA9PiB7XG4gIHJldHVybiBzdHIucmVwbGFjZShSRUdFWF9SRU1PVkVfQkFDS1NMQVNILCBtYXRjaCA9PiB7XG4gICAgcmV0dXJuIG1hdGNoID09PSAnXFxcXCcgPyAnJyA6IG1hdGNoO1xuICB9KTtcbn07XG5cbmV4cG9ydHMuc3VwcG9ydHNMb29rYmVoaW5kcyA9ICgpID0+IHtcbiAgY29uc3Qgc2VncyA9IHByb2Nlc3MudmVyc2lvbi5zbGljZSgxKS5zcGxpdCgnLicpLm1hcChOdW1iZXIpO1xuICBpZiAoc2Vncy5sZW5ndGggPT09IDMgJiYgc2Vnc1swXSA+PSA5IHx8IChzZWdzWzBdID09PSA4ICYmIHNlZ3NbMV0gPj0gMTApKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuZXhwb3J0cy5pc1dpbmRvd3MgPSBvcHRpb25zID0+IHtcbiAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMud2luZG93cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMud2luZG93cztcbiAgfVxuICByZXR1cm4gd2luMzIgPT09IHRydWUgfHwgcGF0aC5zZXAgPT09ICdcXFxcJztcbn07XG5cbmV4cG9ydHMuZXNjYXBlTGFzdCA9IChpbnB1dCwgY2hhciwgbGFzdElkeCkgPT4ge1xuICBjb25zdCBpZHggPSBpbnB1dC5sYXN0SW5kZXhPZihjaGFyLCBsYXN0SWR4KTtcbiAgaWYgKGlkeCA9PT0gLTEpIHJldHVybiBpbnB1dDtcbiAgaWYgKGlucHV0W2lkeCAtIDFdID09PSAnXFxcXCcpIHJldHVybiBleHBvcnRzLmVzY2FwZUxhc3QoaW5wdXQsIGNoYXIsIGlkeCAtIDEpO1xuICByZXR1cm4gYCR7aW5wdXQuc2xpY2UoMCwgaWR4KX1cXFxcJHtpbnB1dC5zbGljZShpZHgpfWA7XG59O1xuXG5leHBvcnRzLnJlbW92ZVByZWZpeCA9IChpbnB1dCwgc3RhdGUgPSB7fSkgPT4ge1xuICBsZXQgb3V0cHV0ID0gaW5wdXQ7XG4gIGlmIChvdXRwdXQuc3RhcnRzV2l0aCgnLi8nKSkge1xuICAgIG91dHB1dCA9IG91dHB1dC5zbGljZSgyKTtcbiAgICBzdGF0ZS5wcmVmaXggPSAnLi8nO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnRzLndyYXBPdXRwdXQgPSAoaW5wdXQsIHN0YXRlID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCBwcmVwZW5kID0gb3B0aW9ucy5jb250YWlucyA/ICcnIDogJ14nO1xuICBjb25zdCBhcHBlbmQgPSBvcHRpb25zLmNvbnRhaW5zID8gJycgOiAnJCc7XG5cbiAgbGV0IG91dHB1dCA9IGAke3ByZXBlbmR9KD86JHtpbnB1dH0pJHthcHBlbmR9YDtcbiAgaWYgKHN0YXRlLm5lZ2F0ZWQgPT09IHRydWUpIHtcbiAgICBvdXRwdXQgPSBgKD86Xig/ISR7b3V0cHV0fSkuKiQpYDtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5jb25zdCB7XG4gIENIQVJfQVNURVJJU0ssICAgICAgICAgICAgIC8qICogKi9cbiAgQ0hBUl9BVCwgICAgICAgICAgICAgICAgICAgLyogQCAqL1xuICBDSEFSX0JBQ0tXQVJEX1NMQVNILCAgICAgICAvKiBcXCAqL1xuICBDSEFSX0NPTU1BLCAgICAgICAgICAgICAgICAvKiAsICovXG4gIENIQVJfRE9ULCAgICAgICAgICAgICAgICAgIC8qIC4gKi9cbiAgQ0hBUl9FWENMQU1BVElPTl9NQVJLLCAgICAgLyogISAqL1xuICBDSEFSX0ZPUldBUkRfU0xBU0gsICAgICAgICAvKiAvICovXG4gIENIQVJfTEVGVF9DVVJMWV9CUkFDRSwgICAgIC8qIHsgKi9cbiAgQ0hBUl9MRUZUX1BBUkVOVEhFU0VTLCAgICAgLyogKCAqL1xuICBDSEFSX0xFRlRfU1FVQVJFX0JSQUNLRVQsICAvKiBbICovXG4gIENIQVJfUExVUywgICAgICAgICAgICAgICAgIC8qICsgKi9cbiAgQ0hBUl9RVUVTVElPTl9NQVJLLCAgICAgICAgLyogPyAqL1xuICBDSEFSX1JJR0hUX0NVUkxZX0JSQUNFLCAgICAvKiB9ICovXG4gIENIQVJfUklHSFRfUEFSRU5USEVTRVMsICAgIC8qICkgKi9cbiAgQ0hBUl9SSUdIVF9TUVVBUkVfQlJBQ0tFVCAgLyogXSAqL1xufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IGlzUGF0aFNlcGFyYXRvciA9IGNvZGUgPT4ge1xuICByZXR1cm4gY29kZSA9PT0gQ0hBUl9GT1JXQVJEX1NMQVNIIHx8IGNvZGUgPT09IENIQVJfQkFDS1dBUkRfU0xBU0g7XG59O1xuXG5jb25zdCBkZXB0aCA9IHRva2VuID0+IHtcbiAgaWYgKHRva2VuLmlzUHJlZml4ICE9PSB0cnVlKSB7XG4gICAgdG9rZW4uZGVwdGggPSB0b2tlbi5pc0dsb2JzdGFyID8gSW5maW5pdHkgOiAxO1xuICB9XG59O1xuXG4vKipcbiAqIFF1aWNrbHkgc2NhbnMgYSBnbG9iIHBhdHRlcm4gYW5kIHJldHVybnMgYW4gb2JqZWN0IHdpdGggYSBoYW5kZnVsIG9mXG4gKiB1c2VmdWwgcHJvcGVydGllcywgbGlrZSBgaXNHbG9iYCwgYHBhdGhgICh0aGUgbGVhZGluZyBub24tZ2xvYiwgaWYgaXQgZXhpc3RzKSxcbiAqIGBnbG9iYCAodGhlIGFjdHVhbCBwYXR0ZXJuKSwgYW5kIGBuZWdhdGVkYCAodHJ1ZSBpZiB0aGUgcGF0aCBzdGFydHMgd2l0aCBgIWApLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwbSA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogY29uc29sZS5sb2cocG0uc2NhbignZm9vL2Jhci8qLmpzJykpO1xuICogeyBpc0dsb2I6IHRydWUsIGlucHV0OiAnZm9vL2Jhci8qLmpzJywgYmFzZTogJ2Zvby9iYXInLCBnbG9iOiAnKi5qcycgfVxuICogYGBgXG4gKiBAcGFyYW0ge1N0cmluZ30gYHN0cmBcbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0b2tlbnMgYW5kIHJlZ2V4IHNvdXJjZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmNvbnN0IHNjYW4gPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcbiAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG5cbiAgY29uc3QgbGVuZ3RoID0gaW5wdXQubGVuZ3RoIC0gMTtcbiAgY29uc3Qgc2NhblRvRW5kID0gb3B0cy5wYXJ0cyA9PT0gdHJ1ZSB8fCBvcHRzLnNjYW5Ub0VuZCA9PT0gdHJ1ZTtcbiAgY29uc3Qgc2xhc2hlcyA9IFtdO1xuICBjb25zdCB0b2tlbnMgPSBbXTtcbiAgY29uc3QgcGFydHMgPSBbXTtcblxuICBsZXQgc3RyID0gaW5wdXQ7XG4gIGxldCBpbmRleCA9IC0xO1xuICBsZXQgc3RhcnQgPSAwO1xuICBsZXQgbGFzdEluZGV4ID0gMDtcbiAgbGV0IGlzQnJhY2UgPSBmYWxzZTtcbiAgbGV0IGlzQnJhY2tldCA9IGZhbHNlO1xuICBsZXQgaXNHbG9iID0gZmFsc2U7XG4gIGxldCBpc0V4dGdsb2IgPSBmYWxzZTtcbiAgbGV0IGlzR2xvYnN0YXIgPSBmYWxzZTtcbiAgbGV0IGJyYWNlRXNjYXBlZCA9IGZhbHNlO1xuICBsZXQgYmFja3NsYXNoZXMgPSBmYWxzZTtcbiAgbGV0IG5lZ2F0ZWQgPSBmYWxzZTtcbiAgbGV0IGZpbmlzaGVkID0gZmFsc2U7XG4gIGxldCBicmFjZXMgPSAwO1xuICBsZXQgcHJldjtcbiAgbGV0IGNvZGU7XG4gIGxldCB0b2tlbiA9IHsgdmFsdWU6ICcnLCBkZXB0aDogMCwgaXNHbG9iOiBmYWxzZSB9O1xuXG4gIGNvbnN0IGVvcyA9ICgpID0+IGluZGV4ID49IGxlbmd0aDtcbiAgY29uc3QgcGVlayA9ICgpID0+IHN0ci5jaGFyQ29kZUF0KGluZGV4ICsgMSk7XG4gIGNvbnN0IGFkdmFuY2UgPSAoKSA9PiB7XG4gICAgcHJldiA9IGNvZGU7XG4gICAgcmV0dXJuIHN0ci5jaGFyQ29kZUF0KCsraW5kZXgpO1xuICB9O1xuXG4gIHdoaWxlIChpbmRleCA8IGxlbmd0aCkge1xuICAgIGNvZGUgPSBhZHZhbmNlKCk7XG4gICAgbGV0IG5leHQ7XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICBjb2RlID0gYWR2YW5jZSgpO1xuXG4gICAgICBpZiAoY29kZSA9PT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNFKSB7XG4gICAgICAgIGJyYWNlRXNjYXBlZCA9IHRydWU7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoYnJhY2VFc2NhcGVkID09PSB0cnVlIHx8IGNvZGUgPT09IENIQVJfTEVGVF9DVVJMWV9CUkFDRSkge1xuICAgICAgYnJhY2VzKys7XG5cbiAgICAgIHdoaWxlIChlb3MoKSAhPT0gdHJ1ZSAmJiAoY29kZSA9IGFkdmFuY2UoKSkpIHtcbiAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfQkFDS1dBUkRfU0xBU0gpIHtcbiAgICAgICAgICBiYWNrc2xhc2hlcyA9IHRva2VuLmJhY2tzbGFzaGVzID0gdHJ1ZTtcbiAgICAgICAgICBhZHZhbmNlKCk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9MRUZUX0NVUkxZX0JSQUNFKSB7XG4gICAgICAgICAgYnJhY2VzKys7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnJhY2VFc2NhcGVkICE9PSB0cnVlICYmIGNvZGUgPT09IENIQVJfRE9UICYmIChjb2RlID0gYWR2YW5jZSgpKSA9PT0gQ0hBUl9ET1QpIHtcbiAgICAgICAgICBpc0JyYWNlID0gdG9rZW4uaXNCcmFjZSA9IHRydWU7XG4gICAgICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcbiAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChicmFjZUVzY2FwZWQgIT09IHRydWUgJiYgY29kZSA9PT0gQ0hBUl9DT01NQSkge1xuICAgICAgICAgIGlzQnJhY2UgPSB0b2tlbi5pc0JyYWNlID0gdHJ1ZTtcbiAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfUklHSFRfQ1VSTFlfQlJBQ0UpIHtcbiAgICAgICAgICBicmFjZXMtLTtcblxuICAgICAgICAgIGlmIChicmFjZXMgPT09IDApIHtcbiAgICAgICAgICAgIGJyYWNlRXNjYXBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaXNCcmFjZSA9IHRva2VuLmlzQnJhY2UgPSB0cnVlO1xuICAgICAgICAgICAgZmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChjb2RlID09PSBDSEFSX0ZPUldBUkRfU0xBU0gpIHtcbiAgICAgIHNsYXNoZXMucHVzaChpbmRleCk7XG4gICAgICB0b2tlbnMucHVzaCh0b2tlbik7XG4gICAgICB0b2tlbiA9IHsgdmFsdWU6ICcnLCBkZXB0aDogMCwgaXNHbG9iOiBmYWxzZSB9O1xuXG4gICAgICBpZiAoZmluaXNoZWQgPT09IHRydWUpIGNvbnRpbnVlO1xuICAgICAgaWYgKHByZXYgPT09IENIQVJfRE9UICYmIGluZGV4ID09PSAoc3RhcnQgKyAxKSkge1xuICAgICAgICBzdGFydCArPSAyO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGFzdEluZGV4ID0gaW5kZXggKyAxO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubm9leHQgIT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGlzRXh0Z2xvYkNoYXIgPSBjb2RlID09PSBDSEFSX1BMVVNcbiAgICAgICAgfHwgY29kZSA9PT0gQ0hBUl9BVFxuICAgICAgICB8fCBjb2RlID09PSBDSEFSX0FTVEVSSVNLXG4gICAgICAgIHx8IGNvZGUgPT09IENIQVJfUVVFU1RJT05fTUFSS1xuICAgICAgICB8fCBjb2RlID09PSBDSEFSX0VYQ0xBTUFUSU9OX01BUks7XG5cbiAgICAgIGlmIChpc0V4dGdsb2JDaGFyID09PSB0cnVlICYmIHBlZWsoKSA9PT0gQ0hBUl9MRUZUX1BBUkVOVEhFU0VTKSB7XG4gICAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICAgIGlzRXh0Z2xvYiA9IHRva2VuLmlzRXh0Z2xvYiA9IHRydWU7XG4gICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChjb2RlID0gYWR2YW5jZSgpKSkge1xuICAgICAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfQkFDS1dBUkRfU0xBU0gpIHtcbiAgICAgICAgICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICAgICAgICAgIGNvZGUgPSBhZHZhbmNlKCk7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY29kZSA9PT0gQ0hBUl9SSUdIVF9QQVJFTlRIRVNFUykge1xuICAgICAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9BU1RFUklTSykge1xuICAgICAgaWYgKHByZXYgPT09IENIQVJfQVNURVJJU0spIGlzR2xvYnN0YXIgPSB0b2tlbi5pc0dsb2JzdGFyID0gdHJ1ZTtcbiAgICAgIGlzR2xvYiA9IHRva2VuLmlzR2xvYiA9IHRydWU7XG4gICAgICBmaW5pc2hlZCA9IHRydWU7XG5cbiAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZiAoY29kZSA9PT0gQ0hBUl9RVUVTVElPTl9NQVJLKSB7XG4gICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgZmluaXNoZWQgPSB0cnVlO1xuXG4gICAgICBpZiAoc2NhblRvRW5kID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKGNvZGUgPT09IENIQVJfTEVGVF9TUVVBUkVfQlJBQ0tFVCkge1xuICAgICAgd2hpbGUgKGVvcygpICE9PSB0cnVlICYmIChuZXh0ID0gYWR2YW5jZSgpKSkge1xuICAgICAgICBpZiAobmV4dCA9PT0gQ0hBUl9CQUNLV0FSRF9TTEFTSCkge1xuICAgICAgICAgIGJhY2tzbGFzaGVzID0gdG9rZW4uYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICAgIGFkdmFuY2UoKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0ID09PSBDSEFSX1JJR0hUX1NRVUFSRV9CUkFDS0VUKSB7XG4gICAgICAgICAgaXNCcmFja2V0ID0gdG9rZW4uaXNCcmFja2V0ID0gdHJ1ZTtcbiAgICAgICAgICBpc0dsb2IgPSB0b2tlbi5pc0dsb2IgPSB0cnVlO1xuICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgICAgIGlmIChzY2FuVG9FbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRzLm5vbmVnYXRlICE9PSB0cnVlICYmIGNvZGUgPT09IENIQVJfRVhDTEFNQVRJT05fTUFSSyAmJiBpbmRleCA9PT0gc3RhcnQpIHtcbiAgICAgIG5lZ2F0ZWQgPSB0b2tlbi5uZWdhdGVkID0gdHJ1ZTtcbiAgICAgIHN0YXJ0Kys7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAob3B0cy5ub3BhcmVuICE9PSB0cnVlICYmIGNvZGUgPT09IENIQVJfTEVGVF9QQVJFTlRIRVNFUykge1xuICAgICAgaXNHbG9iID0gdG9rZW4uaXNHbG9iID0gdHJ1ZTtcblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICB3aGlsZSAoZW9zKCkgIT09IHRydWUgJiYgKGNvZGUgPSBhZHZhbmNlKCkpKSB7XG4gICAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfTEVGVF9QQVJFTlRIRVNFUykge1xuICAgICAgICAgICAgYmFja3NsYXNoZXMgPSB0b2tlbi5iYWNrc2xhc2hlcyA9IHRydWU7XG4gICAgICAgICAgICBjb2RlID0gYWR2YW5jZSgpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvZGUgPT09IENIQVJfUklHSFRfUEFSRU5USEVTRVMpIHtcbiAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChpc0dsb2IgPT09IHRydWUpIHtcbiAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKHNjYW5Ub0VuZCA9PT0gdHJ1ZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdHMubm9leHQgPT09IHRydWUpIHtcbiAgICBpc0V4dGdsb2IgPSBmYWxzZTtcbiAgICBpc0dsb2IgPSBmYWxzZTtcbiAgfVxuXG4gIGxldCBiYXNlID0gc3RyO1xuICBsZXQgcHJlZml4ID0gJyc7XG4gIGxldCBnbG9iID0gJyc7XG5cbiAgaWYgKHN0YXJ0ID4gMCkge1xuICAgIHByZWZpeCA9IHN0ci5zbGljZSgwLCBzdGFydCk7XG4gICAgc3RyID0gc3RyLnNsaWNlKHN0YXJ0KTtcbiAgICBsYXN0SW5kZXggLT0gc3RhcnQ7XG4gIH1cblxuICBpZiAoYmFzZSAmJiBpc0dsb2IgPT09IHRydWUgJiYgbGFzdEluZGV4ID4gMCkge1xuICAgIGJhc2UgPSBzdHIuc2xpY2UoMCwgbGFzdEluZGV4KTtcbiAgICBnbG9iID0gc3RyLnNsaWNlKGxhc3RJbmRleCk7XG4gIH0gZWxzZSBpZiAoaXNHbG9iID09PSB0cnVlKSB7XG4gICAgYmFzZSA9ICcnO1xuICAgIGdsb2IgPSBzdHI7XG4gIH0gZWxzZSB7XG4gICAgYmFzZSA9IHN0cjtcbiAgfVxuXG4gIGlmIChiYXNlICYmIGJhc2UgIT09ICcnICYmIGJhc2UgIT09ICcvJyAmJiBiYXNlICE9PSBzdHIpIHtcbiAgICBpZiAoaXNQYXRoU2VwYXJhdG9yKGJhc2UuY2hhckNvZGVBdChiYXNlLmxlbmd0aCAtIDEpKSkge1xuICAgICAgYmFzZSA9IGJhc2Uuc2xpY2UoMCwgLTEpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChvcHRzLnVuZXNjYXBlID09PSB0cnVlKSB7XG4gICAgaWYgKGdsb2IpIGdsb2IgPSB1dGlscy5yZW1vdmVCYWNrc2xhc2hlcyhnbG9iKTtcblxuICAgIGlmIChiYXNlICYmIGJhY2tzbGFzaGVzID09PSB0cnVlKSB7XG4gICAgICBiYXNlID0gdXRpbHMucmVtb3ZlQmFja3NsYXNoZXMoYmFzZSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgc3RhdGUgPSB7XG4gICAgcHJlZml4LFxuICAgIGlucHV0LFxuICAgIHN0YXJ0LFxuICAgIGJhc2UsXG4gICAgZ2xvYixcbiAgICBpc0JyYWNlLFxuICAgIGlzQnJhY2tldCxcbiAgICBpc0dsb2IsXG4gICAgaXNFeHRnbG9iLFxuICAgIGlzR2xvYnN0YXIsXG4gICAgbmVnYXRlZFxuICB9O1xuXG4gIGlmIChvcHRzLnRva2VucyA9PT0gdHJ1ZSkge1xuICAgIHN0YXRlLm1heERlcHRoID0gMDtcbiAgICBpZiAoIWlzUGF0aFNlcGFyYXRvcihjb2RlKSkge1xuICAgICAgdG9rZW5zLnB1c2godG9rZW4pO1xuICAgIH1cbiAgICBzdGF0ZS50b2tlbnMgPSB0b2tlbnM7XG4gIH1cblxuICBpZiAob3B0cy5wYXJ0cyA9PT0gdHJ1ZSB8fCBvcHRzLnRva2VucyA9PT0gdHJ1ZSkge1xuICAgIGxldCBwcmV2SW5kZXg7XG5cbiAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBzbGFzaGVzLmxlbmd0aDsgaWR4KyspIHtcbiAgICAgIGNvbnN0IG4gPSBwcmV2SW5kZXggPyBwcmV2SW5kZXggKyAxIDogc3RhcnQ7XG4gICAgICBjb25zdCBpID0gc2xhc2hlc1tpZHhdO1xuICAgICAgY29uc3QgdmFsdWUgPSBpbnB1dC5zbGljZShuLCBpKTtcbiAgICAgIGlmIChvcHRzLnRva2Vucykge1xuICAgICAgICBpZiAoaWR4ID09PSAwICYmIHN0YXJ0ICE9PSAwKSB7XG4gICAgICAgICAgdG9rZW5zW2lkeF0uaXNQcmVmaXggPSB0cnVlO1xuICAgICAgICAgIHRva2Vuc1tpZHhdLnZhbHVlID0gcHJlZml4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRva2Vuc1tpZHhdLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZGVwdGgodG9rZW5zW2lkeF0pO1xuICAgICAgICBzdGF0ZS5tYXhEZXB0aCArPSB0b2tlbnNbaWR4XS5kZXB0aDtcbiAgICAgIH1cbiAgICAgIGlmIChpZHggIT09IDAgfHwgdmFsdWUgIT09ICcnKSB7XG4gICAgICAgIHBhcnRzLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgICAgcHJldkluZGV4ID0gaTtcbiAgICB9XG5cbiAgICBpZiAocHJldkluZGV4ICYmIHByZXZJbmRleCArIDEgPCBpbnB1dC5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gaW5wdXQuc2xpY2UocHJldkluZGV4ICsgMSk7XG4gICAgICBwYXJ0cy5wdXNoKHZhbHVlKTtcblxuICAgICAgaWYgKG9wdHMudG9rZW5zKSB7XG4gICAgICAgIHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgZGVwdGgodG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXSk7XG4gICAgICAgIHN0YXRlLm1heERlcHRoICs9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV0uZGVwdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGUuc2xhc2hlcyA9IHNsYXNoZXM7XG4gICAgc3RhdGUucGFydHMgPSBwYXJ0cztcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2NhbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIENvbnN0YW50c1xuICovXG5cbmNvbnN0IHtcbiAgTUFYX0xFTkdUSCxcbiAgUE9TSVhfUkVHRVhfU09VUkNFLFxuICBSRUdFWF9OT05fU1BFQ0lBTF9DSEFSUyxcbiAgUkVHRVhfU1BFQ0lBTF9DSEFSU19CQUNLUkVGLFxuICBSRVBMQUNFTUVOVFNcbn0gPSBjb25zdGFudHM7XG5cbi8qKlxuICogSGVscGVyc1xuICovXG5cbmNvbnN0IGV4cGFuZFJhbmdlID0gKGFyZ3MsIG9wdGlvbnMpID0+IHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zLmV4cGFuZFJhbmdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuZXhwYW5kUmFuZ2UoLi4uYXJncywgb3B0aW9ucyk7XG4gIH1cblxuICBhcmdzLnNvcnQoKTtcbiAgY29uc3QgdmFsdWUgPSBgWyR7YXJncy5qb2luKCctJyl9XWA7XG5cbiAgdHJ5IHtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3ICovXG4gICAgbmV3IFJlZ0V4cCh2YWx1ZSk7XG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0dXJuIGFyZ3MubWFwKHYgPT4gdXRpbHMuZXNjYXBlUmVnZXgodikpLmpvaW4oJy4uJyk7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgbWVzc2FnZSBmb3IgYSBzeW50YXggZXJyb3JcbiAqL1xuXG5jb25zdCBzeW50YXhFcnJvciA9ICh0eXBlLCBjaGFyKSA9PiB7XG4gIHJldHVybiBgTWlzc2luZyAke3R5cGV9OiBcIiR7Y2hhcn1cIiAtIHVzZSBcIlxcXFxcXFxcJHtjaGFyfVwiIHRvIG1hdGNoIGxpdGVyYWwgY2hhcmFjdGVyc2A7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBpbnB1dCBzdHJpbmcuXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cblxuY29uc3QgcGFyc2UgPSAoaW5wdXQsIG9wdGlvbnMpID0+IHtcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIHN0cmluZycpO1xuICB9XG5cbiAgaW5wdXQgPSBSRVBMQUNFTUVOVFNbaW5wdXRdIHx8IGlucHV0O1xuXG4gIGNvbnN0IG9wdHMgPSB7IC4uLm9wdGlvbnMgfTtcbiAgY29uc3QgbWF4ID0gdHlwZW9mIG9wdHMubWF4TGVuZ3RoID09PSAnbnVtYmVyJyA/IE1hdGgubWluKE1BWF9MRU5HVEgsIG9wdHMubWF4TGVuZ3RoKSA6IE1BWF9MRU5HVEg7XG5cbiAgbGV0IGxlbiA9IGlucHV0Lmxlbmd0aDtcbiAgaWYgKGxlbiA+IG1heCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW5wdXQgbGVuZ3RoOiAke2xlbn0sIGV4Y2VlZHMgbWF4aW11bSBhbGxvd2VkIGxlbmd0aDogJHttYXh9YCk7XG4gIH1cblxuICBjb25zdCBib3MgPSB7IHR5cGU6ICdib3MnLCB2YWx1ZTogJycsIG91dHB1dDogb3B0cy5wcmVwZW5kIHx8ICcnIH07XG4gIGNvbnN0IHRva2VucyA9IFtib3NdO1xuXG4gIGNvbnN0IGNhcHR1cmUgPSBvcHRzLmNhcHR1cmUgPyAnJyA6ICc/Oic7XG4gIGNvbnN0IHdpbjMyID0gdXRpbHMuaXNXaW5kb3dzKG9wdGlvbnMpO1xuXG4gIC8vIGNyZWF0ZSBjb25zdGFudHMgYmFzZWQgb24gcGxhdGZvcm0sIGZvciB3aW5kb3dzIG9yIHBvc2l4XG4gIGNvbnN0IFBMQVRGT1JNX0NIQVJTID0gY29uc3RhbnRzLmdsb2JDaGFycyh3aW4zMik7XG4gIGNvbnN0IEVYVEdMT0JfQ0hBUlMgPSBjb25zdGFudHMuZXh0Z2xvYkNoYXJzKFBMQVRGT1JNX0NIQVJTKTtcblxuICBjb25zdCB7XG4gICAgRE9UX0xJVEVSQUwsXG4gICAgUExVU19MSVRFUkFMLFxuICAgIFNMQVNIX0xJVEVSQUwsXG4gICAgT05FX0NIQVIsXG4gICAgRE9UU19TTEFTSCxcbiAgICBOT19ET1QsXG4gICAgTk9fRE9UX1NMQVNILFxuICAgIE5PX0RPVFNfU0xBU0gsXG4gICAgUU1BUkssXG4gICAgUU1BUktfTk9fRE9ULFxuICAgIFNUQVIsXG4gICAgU1RBUlRfQU5DSE9SXG4gIH0gPSBQTEFURk9STV9DSEFSUztcblxuICBjb25zdCBnbG9ic3RhciA9IChvcHRzKSA9PiB7XG4gICAgcmV0dXJuIGAoJHtjYXB0dXJlfSg/Oig/ISR7U1RBUlRfQU5DSE9SfSR7b3B0cy5kb3QgPyBET1RTX1NMQVNIIDogRE9UX0xJVEVSQUx9KS4pKj8pYDtcbiAgfTtcblxuICBjb25zdCBub2RvdCA9IG9wdHMuZG90ID8gJycgOiBOT19ET1Q7XG4gIGNvbnN0IHFtYXJrTm9Eb3QgPSBvcHRzLmRvdCA/IFFNQVJLIDogUU1BUktfTk9fRE9UO1xuICBsZXQgc3RhciA9IG9wdHMuYmFzaCA9PT0gdHJ1ZSA/IGdsb2JzdGFyKG9wdHMpIDogU1RBUjtcblxuICBpZiAob3B0cy5jYXB0dXJlKSB7XG4gICAgc3RhciA9IGAoJHtzdGFyfSlgO1xuICB9XG5cbiAgLy8gbWluaW1hdGNoIG9wdGlvbnMgc3VwcG9ydFxuICBpZiAodHlwZW9mIG9wdHMubm9leHQgPT09ICdib29sZWFuJykge1xuICAgIG9wdHMubm9leHRnbG9iID0gb3B0cy5ub2V4dDtcbiAgfVxuXG4gIGNvbnN0IHN0YXRlID0ge1xuICAgIGlucHV0LFxuICAgIGluZGV4OiAtMSxcbiAgICBzdGFydDogMCxcbiAgICBkb3Q6IG9wdHMuZG90ID09PSB0cnVlLFxuICAgIGNvbnN1bWVkOiAnJyxcbiAgICBvdXRwdXQ6ICcnLFxuICAgIHByZWZpeDogJycsXG4gICAgYmFja3RyYWNrOiBmYWxzZSxcbiAgICBuZWdhdGVkOiBmYWxzZSxcbiAgICBicmFja2V0czogMCxcbiAgICBicmFjZXM6IDAsXG4gICAgcGFyZW5zOiAwLFxuICAgIHF1b3RlczogMCxcbiAgICBnbG9ic3RhcjogZmFsc2UsXG4gICAgdG9rZW5zXG4gIH07XG5cbiAgaW5wdXQgPSB1dGlscy5yZW1vdmVQcmVmaXgoaW5wdXQsIHN0YXRlKTtcbiAgbGVuID0gaW5wdXQubGVuZ3RoO1xuXG4gIGNvbnN0IGV4dGdsb2JzID0gW107XG4gIGNvbnN0IGJyYWNlcyA9IFtdO1xuICBjb25zdCBzdGFjayA9IFtdO1xuICBsZXQgcHJldiA9IGJvcztcbiAgbGV0IHZhbHVlO1xuXG4gIC8qKlxuICAgKiBUb2tlbml6aW5nIGhlbHBlcnNcbiAgICovXG5cbiAgY29uc3QgZW9zID0gKCkgPT4gc3RhdGUuaW5kZXggPT09IGxlbiAtIDE7XG4gIGNvbnN0IHBlZWsgPSBzdGF0ZS5wZWVrID0gKG4gPSAxKSA9PiBpbnB1dFtzdGF0ZS5pbmRleCArIG5dO1xuICBjb25zdCBhZHZhbmNlID0gc3RhdGUuYWR2YW5jZSA9ICgpID0+IGlucHV0Wysrc3RhdGUuaW5kZXhdO1xuICBjb25zdCByZW1haW5pbmcgPSAoKSA9PiBpbnB1dC5zbGljZShzdGF0ZS5pbmRleCArIDEpO1xuICBjb25zdCBjb25zdW1lID0gKHZhbHVlID0gJycsIG51bSA9IDApID0+IHtcbiAgICBzdGF0ZS5jb25zdW1lZCArPSB2YWx1ZTtcbiAgICBzdGF0ZS5pbmRleCArPSBudW07XG4gIH07XG4gIGNvbnN0IGFwcGVuZCA9IHRva2VuID0+IHtcbiAgICBzdGF0ZS5vdXRwdXQgKz0gdG9rZW4ub3V0cHV0ICE9IG51bGwgPyB0b2tlbi5vdXRwdXQgOiB0b2tlbi52YWx1ZTtcbiAgICBjb25zdW1lKHRva2VuLnZhbHVlKTtcbiAgfTtcblxuICBjb25zdCBuZWdhdGUgPSAoKSA9PiB7XG4gICAgbGV0IGNvdW50ID0gMTtcblxuICAgIHdoaWxlIChwZWVrKCkgPT09ICchJyAmJiAocGVlaygyKSAhPT0gJygnIHx8IHBlZWsoMykgPT09ICc/JykpIHtcbiAgICAgIGFkdmFuY2UoKTtcbiAgICAgIHN0YXRlLnN0YXJ0Kys7XG4gICAgICBjb3VudCsrO1xuICAgIH1cblxuICAgIGlmIChjb3VudCAlIDIgPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBzdGF0ZS5uZWdhdGVkID0gdHJ1ZTtcbiAgICBzdGF0ZS5zdGFydCsrO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IGluY3JlbWVudCA9IHR5cGUgPT4ge1xuICAgIHN0YXRlW3R5cGVdKys7XG4gICAgc3RhY2sucHVzaCh0eXBlKTtcbiAgfTtcblxuICBjb25zdCBkZWNyZW1lbnQgPSB0eXBlID0+IHtcbiAgICBzdGF0ZVt0eXBlXS0tO1xuICAgIHN0YWNrLnBvcCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQdXNoIHRva2VucyBvbnRvIHRoZSB0b2tlbnMgYXJyYXkuIFRoaXMgaGVscGVyIHNwZWVkcyB1cFxuICAgKiB0b2tlbml6aW5nIGJ5IDEpIGhlbHBpbmcgdXMgYXZvaWQgYmFja3RyYWNraW5nIGFzIG11Y2ggYXMgcG9zc2libGUsXG4gICAqIGFuZCAyKSBoZWxwaW5nIHVzIGF2b2lkIGNyZWF0aW5nIGV4dHJhIHRva2VucyB3aGVuIGNvbnNlY3V0aXZlXG4gICAqIGNoYXJhY3RlcnMgYXJlIHBsYWluIHRleHQuIFRoaXMgaW1wcm92ZXMgcGVyZm9ybWFuY2UgYW5kIHNpbXBsaWZpZXNcbiAgICogbG9va2JlaGluZHMuXG4gICAqL1xuXG4gIGNvbnN0IHB1c2ggPSB0b2sgPT4ge1xuICAgIGlmIChwcmV2LnR5cGUgPT09ICdnbG9ic3RhcicpIHtcbiAgICAgIGNvbnN0IGlzQnJhY2UgPSBzdGF0ZS5icmFjZXMgPiAwICYmICh0b2sudHlwZSA9PT0gJ2NvbW1hJyB8fCB0b2sudHlwZSA9PT0gJ2JyYWNlJyk7XG4gICAgICBjb25zdCBpc0V4dGdsb2IgPSB0b2suZXh0Z2xvYiA9PT0gdHJ1ZSB8fCAoZXh0Z2xvYnMubGVuZ3RoICYmICh0b2sudHlwZSA9PT0gJ3BpcGUnIHx8IHRvay50eXBlID09PSAncGFyZW4nKSk7XG5cbiAgICAgIGlmICh0b2sudHlwZSAhPT0gJ3NsYXNoJyAmJiB0b2sudHlwZSAhPT0gJ3BhcmVuJyAmJiAhaXNCcmFjZSAmJiAhaXNFeHRnbG9iKSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCAtcHJldi5vdXRwdXQubGVuZ3RoKTtcbiAgICAgICAgcHJldi50eXBlID0gJ3N0YXInO1xuICAgICAgICBwcmV2LnZhbHVlID0gJyonO1xuICAgICAgICBwcmV2Lm91dHB1dCA9IHN0YXI7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBwcmV2Lm91dHB1dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXh0Z2xvYnMubGVuZ3RoICYmIHRvay50eXBlICE9PSAncGFyZW4nICYmICFFWFRHTE9CX0NIQVJTW3Rvay52YWx1ZV0pIHtcbiAgICAgIGV4dGdsb2JzW2V4dGdsb2JzLmxlbmd0aCAtIDFdLmlubmVyICs9IHRvay52YWx1ZTtcbiAgICB9XG5cbiAgICBpZiAodG9rLnZhbHVlIHx8IHRvay5vdXRwdXQpIGFwcGVuZCh0b2spO1xuICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3RleHQnICYmIHRvay50eXBlID09PSAndGV4dCcpIHtcbiAgICAgIHByZXYudmFsdWUgKz0gdG9rLnZhbHVlO1xuICAgICAgcHJldi5vdXRwdXQgPSAocHJldi5vdXRwdXQgfHwgJycpICsgdG9rLnZhbHVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRvay5wcmV2ID0gcHJldjtcbiAgICB0b2tlbnMucHVzaCh0b2spO1xuICAgIHByZXYgPSB0b2s7XG4gIH07XG5cbiAgY29uc3QgZXh0Z2xvYk9wZW4gPSAodHlwZSwgdmFsdWUpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IHsgLi4uRVhUR0xPQl9DSEFSU1t2YWx1ZV0sIGNvbmRpdGlvbnM6IDEsIGlubmVyOiAnJyB9O1xuXG4gICAgdG9rZW4ucHJldiA9IHByZXY7XG4gICAgdG9rZW4ucGFyZW5zID0gc3RhdGUucGFyZW5zO1xuICAgIHRva2VuLm91dHB1dCA9IHN0YXRlLm91dHB1dDtcbiAgICBjb25zdCBvdXRwdXQgPSAob3B0cy5jYXB0dXJlID8gJygnIDogJycpICsgdG9rZW4ub3BlbjtcblxuICAgIGluY3JlbWVudCgncGFyZW5zJyk7XG4gICAgcHVzaCh7IHR5cGUsIHZhbHVlLCBvdXRwdXQ6IHN0YXRlLm91dHB1dCA/ICcnIDogT05FX0NIQVIgfSk7XG4gICAgcHVzaCh7IHR5cGU6ICdwYXJlbicsIGV4dGdsb2I6IHRydWUsIHZhbHVlOiBhZHZhbmNlKCksIG91dHB1dCB9KTtcbiAgICBleHRnbG9icy5wdXNoKHRva2VuKTtcbiAgfTtcblxuICBjb25zdCBleHRnbG9iQ2xvc2UgPSB0b2tlbiA9PiB7XG4gICAgbGV0IG91dHB1dCA9IHRva2VuLmNsb3NlICsgKG9wdHMuY2FwdHVyZSA/ICcpJyA6ICcnKTtcblxuICAgIGlmICh0b2tlbi50eXBlID09PSAnbmVnYXRlJykge1xuICAgICAgbGV0IGV4dGdsb2JTdGFyID0gc3RhcjtcblxuICAgICAgaWYgKHRva2VuLmlubmVyICYmIHRva2VuLmlubmVyLmxlbmd0aCA+IDEgJiYgdG9rZW4uaW5uZXIuaW5jbHVkZXMoJy8nKSkge1xuICAgICAgICBleHRnbG9iU3RhciA9IGdsb2JzdGFyKG9wdHMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXh0Z2xvYlN0YXIgIT09IHN0YXIgfHwgZW9zKCkgfHwgL15cXCkrJC8udGVzdChyZW1haW5pbmcoKSkpIHtcbiAgICAgICAgb3V0cHV0ID0gdG9rZW4uY2xvc2UgPSBgKSQpKSR7ZXh0Z2xvYlN0YXJ9YDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuLnByZXYudHlwZSA9PT0gJ2JvcycgJiYgZW9zKCkpIHtcbiAgICAgICAgc3RhdGUubmVnYXRlZEV4dGdsb2IgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1c2goeyB0eXBlOiAncGFyZW4nLCBleHRnbG9iOiB0cnVlLCB2YWx1ZSwgb3V0cHV0IH0pO1xuICAgIGRlY3JlbWVudCgncGFyZW5zJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEZhc3QgcGF0aHNcbiAgICovXG5cbiAgaWYgKG9wdHMuZmFzdHBhdGhzICE9PSBmYWxzZSAmJiAhLyheWyohXXxbLygpW1xcXXt9XCJdKS8udGVzdChpbnB1dCkpIHtcbiAgICBsZXQgYmFja3NsYXNoZXMgPSBmYWxzZTtcblxuICAgIGxldCBvdXRwdXQgPSBpbnB1dC5yZXBsYWNlKFJFR0VYX1NQRUNJQUxfQ0hBUlNfQkFDS1JFRiwgKG0sIGVzYywgY2hhcnMsIGZpcnN0LCByZXN0LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGZpcnN0ID09PSAnXFxcXCcpIHtcbiAgICAgICAgYmFja3NsYXNoZXMgPSB0cnVlO1xuICAgICAgICByZXR1cm4gbTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcnN0ID09PSAnPycpIHtcbiAgICAgICAgaWYgKGVzYykge1xuICAgICAgICAgIHJldHVybiBlc2MgKyBmaXJzdCArIChyZXN0ID8gUU1BUksucmVwZWF0KHJlc3QubGVuZ3RoKSA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gcW1hcmtOb0RvdCArIChyZXN0ID8gUU1BUksucmVwZWF0KHJlc3QubGVuZ3RoKSA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUU1BUksucmVwZWF0KGNoYXJzLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChmaXJzdCA9PT0gJy4nKSB7XG4gICAgICAgIHJldHVybiBET1RfTElURVJBTC5yZXBlYXQoY2hhcnMubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpcnN0ID09PSAnKicpIHtcbiAgICAgICAgaWYgKGVzYykge1xuICAgICAgICAgIHJldHVybiBlc2MgKyBmaXJzdCArIChyZXN0ID8gc3RhciA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RhcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBlc2MgPyBtIDogYFxcXFwke219YDtcbiAgICB9KTtcblxuICAgIGlmIChiYWNrc2xhc2hlcyA9PT0gdHJ1ZSkge1xuICAgICAgaWYgKG9wdHMudW5lc2NhcGUgPT09IHRydWUpIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcXFwvZywgJycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0LnJlcGxhY2UoL1xcXFwrL2csIG0gPT4ge1xuICAgICAgICAgIHJldHVybiBtLmxlbmd0aCAlIDIgPT09IDAgPyAnXFxcXFxcXFwnIDogKG0gPyAnXFxcXCcgOiAnJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvdXRwdXQgPT09IGlucHV0ICYmIG9wdHMuY29udGFpbnMgPT09IHRydWUpIHtcbiAgICAgIHN0YXRlLm91dHB1dCA9IGlucHV0O1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHN0YXRlLm91dHB1dCA9IHV0aWxzLndyYXBPdXRwdXQob3V0cHV0LCBzdGF0ZSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFRva2VuaXplIGlucHV0IHVudGlsIHdlIHJlYWNoIGVuZC1vZi1zdHJpbmdcbiAgICovXG5cbiAgd2hpbGUgKCFlb3MoKSkge1xuICAgIHZhbHVlID0gYWR2YW5jZSgpO1xuXG4gICAgaWYgKHZhbHVlID09PSAnXFx1MDAwMCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVzY2FwZWQgY2hhcmFjdGVyc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnXFxcXCcpIHtcbiAgICAgIGNvbnN0IG5leHQgPSBwZWVrKCk7XG5cbiAgICAgIGlmIChuZXh0ID09PSAnLycgJiYgb3B0cy5iYXNoICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobmV4dCA9PT0gJy4nIHx8IG5leHQgPT09ICc7Jykge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIHZhbHVlICs9ICdcXFxcJztcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBjb2xsYXBzZSBzbGFzaGVzIHRvIHJlZHVjZSBwb3RlbnRpYWwgZm9yIGV4cGxvaXRzXG4gICAgICBjb25zdCBtYXRjaCA9IC9eXFxcXCsvLmV4ZWMocmVtYWluaW5nKCkpO1xuICAgICAgbGV0IHNsYXNoZXMgPSAwO1xuXG4gICAgICBpZiAobWF0Y2ggJiYgbWF0Y2hbMF0ubGVuZ3RoID4gMikge1xuICAgICAgICBzbGFzaGVzID0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICBzdGF0ZS5pbmRleCArPSBzbGFzaGVzO1xuICAgICAgICBpZiAoc2xhc2hlcyAlIDIgIT09IDApIHtcbiAgICAgICAgICB2YWx1ZSArPSAnXFxcXCc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMudW5lc2NhcGUgPT09IHRydWUpIHtcbiAgICAgICAgdmFsdWUgPSBhZHZhbmNlKCkgfHwgJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSArPSBhZHZhbmNlKCkgfHwgJyc7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZS5icmFja2V0cyA9PT0gMCkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgd2UncmUgaW5zaWRlIGEgcmVnZXggY2hhcmFjdGVyIGNsYXNzLCBjb250aW51ZVxuICAgICAqIHVudGlsIHdlIHJlYWNoIHRoZSBjbG9zaW5nIGJyYWNrZXQuXG4gICAgICovXG5cbiAgICBpZiAoc3RhdGUuYnJhY2tldHMgPiAwICYmICh2YWx1ZSAhPT0gJ10nIHx8IHByZXYudmFsdWUgPT09ICdbJyB8fCBwcmV2LnZhbHVlID09PSAnW14nKSkge1xuICAgICAgaWYgKG9wdHMucG9zaXggIT09IGZhbHNlICYmIHZhbHVlID09PSAnOicpIHtcbiAgICAgICAgY29uc3QgaW5uZXIgPSBwcmV2LnZhbHVlLnNsaWNlKDEpO1xuICAgICAgICBpZiAoaW5uZXIuaW5jbHVkZXMoJ1snKSkge1xuICAgICAgICAgIHByZXYucG9zaXggPSB0cnVlO1xuXG4gICAgICAgICAgaWYgKGlubmVyLmluY2x1ZGVzKCc6JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHByZXYudmFsdWUubGFzdEluZGV4T2YoJ1snKTtcbiAgICAgICAgICAgIGNvbnN0IHByZSA9IHByZXYudmFsdWUuc2xpY2UoMCwgaWR4KTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3QgPSBwcmV2LnZhbHVlLnNsaWNlKGlkeCArIDIpO1xuICAgICAgICAgICAgY29uc3QgcG9zaXggPSBQT1NJWF9SRUdFWF9TT1VSQ0VbcmVzdF07XG4gICAgICAgICAgICBpZiAocG9zaXgpIHtcbiAgICAgICAgICAgICAgcHJldi52YWx1ZSA9IHByZSArIHBvc2l4O1xuICAgICAgICAgICAgICBzdGF0ZS5iYWNrdHJhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICBhZHZhbmNlKCk7XG5cbiAgICAgICAgICAgICAgaWYgKCFib3Mub3V0cHV0ICYmIHRva2Vucy5pbmRleE9mKHByZXYpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgYm9zLm91dHB1dCA9IE9ORV9DSEFSO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoKHZhbHVlID09PSAnWycgJiYgcGVlaygpICE9PSAnOicpIHx8ICh2YWx1ZSA9PT0gJy0nICYmIHBlZWsoKSA9PT0gJ10nKSkge1xuICAgICAgICB2YWx1ZSA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgfVxuXG4gICAgICBpZiAodmFsdWUgPT09ICddJyAmJiAocHJldi52YWx1ZSA9PT0gJ1snIHx8IHByZXYudmFsdWUgPT09ICdbXicpKSB7XG4gICAgICAgIHZhbHVlID0gYFxcXFwke3ZhbHVlfWA7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLnBvc2l4ID09PSB0cnVlICYmIHZhbHVlID09PSAnIScgJiYgcHJldi52YWx1ZSA9PT0gJ1snKSB7XG4gICAgICAgIHZhbHVlID0gJ14nO1xuICAgICAgfVxuXG4gICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgYXBwZW5kKHsgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB3ZSdyZSBpbnNpZGUgYSBxdW90ZWQgc3RyaW5nLCBjb250aW51ZVxuICAgICAqIHVudGlsIHdlIHJlYWNoIHRoZSBjbG9zaW5nIGRvdWJsZSBxdW90ZS5cbiAgICAgKi9cblxuICAgIGlmIChzdGF0ZS5xdW90ZXMgPT09IDEgJiYgdmFsdWUgIT09ICdcIicpIHtcbiAgICAgIHZhbHVlID0gdXRpbHMuZXNjYXBlUmVnZXgodmFsdWUpO1xuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgIGFwcGVuZCh7IHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRG91YmxlIHF1b3Rlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnXCInKSB7XG4gICAgICBzdGF0ZS5xdW90ZXMgPSBzdGF0ZS5xdW90ZXMgPT09IDEgPyAwIDogMTtcbiAgICAgIGlmIChvcHRzLmtlZXBRdW90ZXMgPT09IHRydWUpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUgfSk7XG4gICAgICB9XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQYXJlbnRoZXNlc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnKCcpIHtcbiAgICAgIGluY3JlbWVudCgncGFyZW5zJyk7XG4gICAgICBwdXNoKHsgdHlwZTogJ3BhcmVuJywgdmFsdWUgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICcpJykge1xuICAgICAgaWYgKHN0YXRlLnBhcmVucyA9PT0gMCAmJiBvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihzeW50YXhFcnJvcignb3BlbmluZycsICcoJykpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHRnbG9iID0gZXh0Z2xvYnNbZXh0Z2xvYnMubGVuZ3RoIC0gMV07XG4gICAgICBpZiAoZXh0Z2xvYiAmJiBzdGF0ZS5wYXJlbnMgPT09IGV4dGdsb2IucGFyZW5zICsgMSkge1xuICAgICAgICBleHRnbG9iQ2xvc2UoZXh0Z2xvYnMucG9wKCkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdwYXJlbicsIHZhbHVlLCBvdXRwdXQ6IHN0YXRlLnBhcmVucyA/ICcpJyA6ICdcXFxcKScgfSk7XG4gICAgICBkZWNyZW1lbnQoJ3BhcmVucycpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3F1YXJlIGJyYWNrZXRzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICdbJykge1xuICAgICAgaWYgKG9wdHMubm9icmFja2V0ID09PSB0cnVlIHx8ICFyZW1haW5pbmcoKS5pbmNsdWRlcygnXScpKSB7XG4gICAgICAgIGlmIChvcHRzLm5vYnJhY2tldCAhPT0gdHJ1ZSAmJiBvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJ10nKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5jcmVtZW50KCdicmFja2V0cycpO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2JyYWNrZXQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmICh2YWx1ZSA9PT0gJ10nKSB7XG4gICAgICBpZiAob3B0cy5ub2JyYWNrZXQgPT09IHRydWUgfHwgKHByZXYgJiYgcHJldi50eXBlID09PSAnYnJhY2tldCcgJiYgcHJldi52YWx1ZS5sZW5ndGggPT09IDEpKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlLCBvdXRwdXQ6IGBcXFxcJHt2YWx1ZX1gIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlLmJyYWNrZXRzID09PSAwKSB7XG4gICAgICAgIGlmIChvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdvcGVuaW5nJywgJ1snKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSwgb3V0cHV0OiBgXFxcXCR7dmFsdWV9YCB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGRlY3JlbWVudCgnYnJhY2tldHMnKTtcblxuICAgICAgY29uc3QgcHJldlZhbHVlID0gcHJldi52YWx1ZS5zbGljZSgxKTtcbiAgICAgIGlmIChwcmV2LnBvc2l4ICE9PSB0cnVlICYmIHByZXZWYWx1ZVswXSA9PT0gJ14nICYmICFwcmV2VmFsdWUuaW5jbHVkZXMoJy8nKSkge1xuICAgICAgICB2YWx1ZSA9IGAvJHt2YWx1ZX1gO1xuICAgICAgfVxuXG4gICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgYXBwZW5kKHsgdmFsdWUgfSk7XG5cbiAgICAgIC8vIHdoZW4gbGl0ZXJhbCBicmFja2V0cyBhcmUgZXhwbGljaXRseSBkaXNhYmxlZFxuICAgICAgLy8gYXNzdW1lIHdlIHNob3VsZCBtYXRjaCB3aXRoIGEgcmVnZXggY2hhcmFjdGVyIGNsYXNzXG4gICAgICBpZiAob3B0cy5saXRlcmFsQnJhY2tldHMgPT09IGZhbHNlIHx8IHV0aWxzLmhhc1JlZ2V4Q2hhcnMocHJldlZhbHVlKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXNjYXBlZCA9IHV0aWxzLmVzY2FwZVJlZ2V4KHByZXYudmFsdWUpO1xuICAgICAgc3RhdGUub3V0cHV0ID0gc3RhdGUub3V0cHV0LnNsaWNlKDAsIC1wcmV2LnZhbHVlLmxlbmd0aCk7XG5cbiAgICAgIC8vIHdoZW4gbGl0ZXJhbCBicmFja2V0cyBhcmUgZXhwbGljaXRseSBlbmFibGVkXG4gICAgICAvLyBhc3N1bWUgd2Ugc2hvdWxkIGVzY2FwZSB0aGUgYnJhY2tldHMgdG8gbWF0Y2ggbGl0ZXJhbCBjaGFyYWN0ZXJzXG4gICAgICBpZiAob3B0cy5saXRlcmFsQnJhY2tldHMgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IGVzY2FwZWQ7XG4gICAgICAgIHByZXYudmFsdWUgPSBlc2NhcGVkO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gd2hlbiB0aGUgdXNlciBzcGVjaWZpZXMgbm90aGluZywgdHJ5IHRvIG1hdGNoIGJvdGhcbiAgICAgIHByZXYudmFsdWUgPSBgKCR7Y2FwdHVyZX0ke2VzY2FwZWR9fCR7cHJldi52YWx1ZX0pYDtcbiAgICAgIHN0YXRlLm91dHB1dCArPSBwcmV2LnZhbHVlO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQnJhY2VzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICd7JyAmJiBvcHRzLm5vYnJhY2UgIT09IHRydWUpIHtcbiAgICAgIGluY3JlbWVudCgnYnJhY2VzJyk7XG5cbiAgICAgIGNvbnN0IG9wZW4gPSB7XG4gICAgICAgIHR5cGU6ICdicmFjZScsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICBvdXRwdXQ6ICcoJyxcbiAgICAgICAgb3V0cHV0SW5kZXg6IHN0YXRlLm91dHB1dC5sZW5ndGgsXG4gICAgICAgIHRva2Vuc0luZGV4OiBzdGF0ZS50b2tlbnMubGVuZ3RoXG4gICAgICB9O1xuXG4gICAgICBicmFjZXMucHVzaChvcGVuKTtcbiAgICAgIHB1c2gob3Blbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUgPT09ICd9Jykge1xuICAgICAgY29uc3QgYnJhY2UgPSBicmFjZXNbYnJhY2VzLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAob3B0cy5ub2JyYWNlID09PSB0cnVlIHx8ICFicmFjZSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSwgb3V0cHV0OiB2YWx1ZSB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBvdXRwdXQgPSAnKSc7XG5cbiAgICAgIGlmIChicmFjZS5kb3RzID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGFyciA9IHRva2Vucy5zbGljZSgpO1xuICAgICAgICBjb25zdCByYW5nZSA9IFtdO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0b2tlbnMucG9wKCk7XG4gICAgICAgICAgaWYgKGFycltpXS50eXBlID09PSAnYnJhY2UnKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFycltpXS50eXBlICE9PSAnZG90cycpIHtcbiAgICAgICAgICAgIHJhbmdlLnVuc2hpZnQoYXJyW2ldLnZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvdXRwdXQgPSBleHBhbmRSYW5nZShyYW5nZSwgb3B0cyk7XG4gICAgICAgIHN0YXRlLmJhY2t0cmFjayA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChicmFjZS5jb21tYSAhPT0gdHJ1ZSAmJiBicmFjZS5kb3RzICE9PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IG91dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCBicmFjZS5vdXRwdXRJbmRleCk7XG4gICAgICAgIGNvbnN0IHRva3MgPSBzdGF0ZS50b2tlbnMuc2xpY2UoYnJhY2UudG9rZW5zSW5kZXgpO1xuICAgICAgICBicmFjZS52YWx1ZSA9IGJyYWNlLm91dHB1dCA9ICdcXFxceyc7XG4gICAgICAgIHZhbHVlID0gb3V0cHV0ID0gJ1xcXFx9JztcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gb3V0O1xuICAgICAgICBmb3IgKGNvbnN0IHQgb2YgdG9rcykge1xuICAgICAgICAgIHN0YXRlLm91dHB1dCArPSAodC5vdXRwdXQgfHwgdC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdicmFjZScsIHZhbHVlLCBvdXRwdXQgfSk7XG4gICAgICBkZWNyZW1lbnQoJ2JyYWNlcycpO1xuICAgICAgYnJhY2VzLnBvcCgpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGlwZXNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ3wnKSB7XG4gICAgICBpZiAoZXh0Z2xvYnMubGVuZ3RoID4gMCkge1xuICAgICAgICBleHRnbG9ic1tleHRnbG9icy5sZW5ndGggLSAxXS5jb25kaXRpb25zKys7XG4gICAgICB9XG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENvbW1hc1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnLCcpIHtcbiAgICAgIGxldCBvdXRwdXQgPSB2YWx1ZTtcblxuICAgICAgY29uc3QgYnJhY2UgPSBicmFjZXNbYnJhY2VzLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKGJyYWNlICYmIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdID09PSAnYnJhY2VzJykge1xuICAgICAgICBicmFjZS5jb21tYSA9IHRydWU7XG4gICAgICAgIG91dHB1dCA9ICd8JztcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdjb21tYScsIHZhbHVlLCBvdXRwdXQgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTbGFzaGVzXG4gICAgICovXG5cbiAgICBpZiAodmFsdWUgPT09ICcvJykge1xuICAgICAgLy8gaWYgdGhlIGJlZ2lubmluZyBvZiB0aGUgZ2xvYiBpcyBcIi4vXCIsIGFkdmFuY2UgdGhlIHN0YXJ0XG4gICAgICAvLyB0byB0aGUgY3VycmVudCBpbmRleCwgYW5kIGRvbid0IGFkZCB0aGUgXCIuL1wiIGNoYXJhY3RlcnNcbiAgICAgIC8vIHRvIHRoZSBzdGF0ZS4gVGhpcyBncmVhdGx5IHNpbXBsaWZpZXMgbG9va2JlaGluZHMgd2hlblxuICAgICAgLy8gY2hlY2tpbmcgZm9yIEJPUyBjaGFyYWN0ZXJzIGxpa2UgXCIhXCIgYW5kIFwiLlwiIChub3QgXCIuL1wiKVxuICAgICAgaWYgKHByZXYudHlwZSA9PT0gJ2RvdCcgJiYgc3RhdGUuaW5kZXggPT09IHN0YXRlLnN0YXJ0ICsgMSkge1xuICAgICAgICBzdGF0ZS5zdGFydCA9IHN0YXRlLmluZGV4ICsgMTtcbiAgICAgICAgc3RhdGUuY29uc3VtZWQgPSAnJztcbiAgICAgICAgc3RhdGUub3V0cHV0ID0gJyc7XG4gICAgICAgIHRva2Vucy5wb3AoKTtcbiAgICAgICAgcHJldiA9IGJvczsgLy8gcmVzZXQgXCJwcmV2XCIgdG8gdGhlIGZpcnN0IHRva2VuXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3NsYXNoJywgdmFsdWUsIG91dHB1dDogU0xBU0hfTElURVJBTCB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvdHNcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJy4nKSB7XG4gICAgICBpZiAoc3RhdGUuYnJhY2VzID4gMCAmJiBwcmV2LnR5cGUgPT09ICdkb3QnKSB7XG4gICAgICAgIGlmIChwcmV2LnZhbHVlID09PSAnLicpIHByZXYub3V0cHV0ID0gRE9UX0xJVEVSQUw7XG4gICAgICAgIGNvbnN0IGJyYWNlID0gYnJhY2VzW2JyYWNlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgcHJldi50eXBlID0gJ2RvdHMnO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSB2YWx1ZTtcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgYnJhY2UuZG90cyA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHN0YXRlLmJyYWNlcyArIHN0YXRlLnBhcmVucykgPT09IDAgJiYgcHJldi50eXBlICE9PSAnYm9zJyAmJiBwcmV2LnR5cGUgIT09ICdzbGFzaCcpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dDogRE9UX0xJVEVSQUwgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ2RvdCcsIHZhbHVlLCBvdXRwdXQ6IERPVF9MSVRFUkFMIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUXVlc3Rpb24gbWFya3NcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJz8nKSB7XG4gICAgICBjb25zdCBpc0dyb3VwID0gcHJldiAmJiBwcmV2LnZhbHVlID09PSAnKCc7XG4gICAgICBpZiAoIWlzR3JvdXAgJiYgb3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcgJiYgcGVlaygyKSAhPT0gJz8nKSB7XG4gICAgICAgIGV4dGdsb2JPcGVuKCdxbWFyaycsIHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmV2ICYmIHByZXYudHlwZSA9PT0gJ3BhcmVuJykge1xuICAgICAgICBjb25zdCBuZXh0ID0gcGVlaygpO1xuICAgICAgICBsZXQgb3V0cHV0ID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKG5leHQgPT09ICc8JyAmJiAhdXRpbHMuc3VwcG9ydHNMb29rYmVoaW5kcygpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb2RlLmpzIHYxMCBvciBoaWdoZXIgaXMgcmVxdWlyZWQgZm9yIHJlZ2V4IGxvb2tiZWhpbmRzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoKHByZXYudmFsdWUgPT09ICcoJyAmJiAhL1shPTw6XS8udGVzdChuZXh0KSkgfHwgKG5leHQgPT09ICc8JyAmJiAhLzwoWyE9XXxcXHcrPikvLnRlc3QocmVtYWluaW5nKCkpKSkge1xuICAgICAgICAgIG91dHB1dCA9IGBcXFxcJHt2YWx1ZX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVzaCh7IHR5cGU6ICd0ZXh0JywgdmFsdWUsIG91dHB1dCB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRzLmRvdCAhPT0gdHJ1ZSAmJiAocHJldi50eXBlID09PSAnc2xhc2gnIHx8IHByZXYudHlwZSA9PT0gJ2JvcycpKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAncW1hcmsnLCB2YWx1ZSwgb3V0cHV0OiBRTUFSS19OT19ET1QgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3FtYXJrJywgdmFsdWUsIG91dHB1dDogUU1BUksgfSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeGNsYW1hdGlvblxuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnIScpIHtcbiAgICAgIGlmIChvcHRzLm5vZXh0Z2xvYiAhPT0gdHJ1ZSAmJiBwZWVrKCkgPT09ICcoJykge1xuICAgICAgICBpZiAocGVlaygyKSAhPT0gJz8nIHx8ICEvWyE9PDpdLy50ZXN0KHBlZWsoMykpKSB7XG4gICAgICAgICAgZXh0Z2xvYk9wZW4oJ25lZ2F0ZScsIHZhbHVlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAob3B0cy5ub25lZ2F0ZSAhPT0gdHJ1ZSAmJiBzdGF0ZS5pbmRleCA9PT0gMCkge1xuICAgICAgICBuZWdhdGUoKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGx1c1xuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlID09PSAnKycpIHtcbiAgICAgIGlmIChvcHRzLm5vZXh0Z2xvYiAhPT0gdHJ1ZSAmJiBwZWVrKCkgPT09ICcoJyAmJiBwZWVrKDIpICE9PSAnPycpIHtcbiAgICAgICAgZXh0Z2xvYk9wZW4oJ3BsdXMnLCB2YWx1ZSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXYgJiYgcHJldi52YWx1ZSA9PT0gJygnKSB8fCBvcHRzLnJlZ2V4ID09PSBmYWxzZSkge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3BsdXMnLCB2YWx1ZSwgb3V0cHV0OiBQTFVTX0xJVEVSQUwgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHByZXYgJiYgKHByZXYudHlwZSA9PT0gJ2JyYWNrZXQnIHx8IHByZXYudHlwZSA9PT0gJ3BhcmVuJyB8fCBwcmV2LnR5cGUgPT09ICdicmFjZScpKSB8fCBzdGF0ZS5wYXJlbnMgPiAwKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAncGx1cycsIHZhbHVlIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHVzaCh7IHR5cGU6ICdwbHVzJywgdmFsdWU6IFBMVVNfTElURVJBTCB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYWluIHRleHRcbiAgICAgKi9cblxuICAgIGlmICh2YWx1ZSA9PT0gJ0AnKSB7XG4gICAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgcGVlaygpID09PSAnKCcgJiYgcGVlaygyKSAhPT0gJz8nKSB7XG4gICAgICAgIHB1c2goeyB0eXBlOiAnYXQnLCBleHRnbG9iOiB0cnVlLCB2YWx1ZSwgb3V0cHV0OiAnJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHB1c2goeyB0eXBlOiAndGV4dCcsIHZhbHVlIH0pO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxhaW4gdGV4dFxuICAgICAqL1xuXG4gICAgaWYgKHZhbHVlICE9PSAnKicpIHtcbiAgICAgIGlmICh2YWx1ZSA9PT0gJyQnIHx8IHZhbHVlID09PSAnXicpIHtcbiAgICAgICAgdmFsdWUgPSBgXFxcXCR7dmFsdWV9YDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWF0Y2ggPSBSRUdFWF9OT05fU1BFQ0lBTF9DSEFSUy5leGVjKHJlbWFpbmluZygpKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICB2YWx1ZSArPSBtYXRjaFswXTtcbiAgICAgICAgc3RhdGUuaW5kZXggKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBwdXNoKHsgdHlwZTogJ3RleHQnLCB2YWx1ZSB9KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJzXG4gICAgICovXG5cbiAgICBpZiAocHJldiAmJiAocHJldi50eXBlID09PSAnZ2xvYnN0YXInIHx8IHByZXYuc3RhciA9PT0gdHJ1ZSkpIHtcbiAgICAgIHByZXYudHlwZSA9ICdzdGFyJztcbiAgICAgIHByZXYuc3RhciA9IHRydWU7XG4gICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgcHJldi5vdXRwdXQgPSBzdGFyO1xuICAgICAgc3RhdGUuYmFja3RyYWNrID0gdHJ1ZTtcbiAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgIGNvbnN1bWUodmFsdWUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgbGV0IHJlc3QgPSByZW1haW5pbmcoKTtcbiAgICBpZiAob3B0cy5ub2V4dGdsb2IgIT09IHRydWUgJiYgL15cXChbXj9dLy50ZXN0KHJlc3QpKSB7XG4gICAgICBleHRnbG9iT3Blbignc3RhcicsIHZhbHVlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChwcmV2LnR5cGUgPT09ICdzdGFyJykge1xuICAgICAgaWYgKG9wdHMubm9nbG9ic3RhciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByaW9yID0gcHJldi5wcmV2O1xuICAgICAgY29uc3QgYmVmb3JlID0gcHJpb3IucHJldjtcbiAgICAgIGNvbnN0IGlzU3RhcnQgPSBwcmlvci50eXBlID09PSAnc2xhc2gnIHx8IHByaW9yLnR5cGUgPT09ICdib3MnO1xuICAgICAgY29uc3QgYWZ0ZXJTdGFyID0gYmVmb3JlICYmIChiZWZvcmUudHlwZSA9PT0gJ3N0YXInIHx8IGJlZm9yZS50eXBlID09PSAnZ2xvYnN0YXInKTtcblxuICAgICAgaWYgKG9wdHMuYmFzaCA9PT0gdHJ1ZSAmJiAoIWlzU3RhcnQgfHwgKHJlc3RbMF0gJiYgcmVzdFswXSAhPT0gJy8nKSkpIHtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzdGFyJywgdmFsdWUsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0JyYWNlID0gc3RhdGUuYnJhY2VzID4gMCAmJiAocHJpb3IudHlwZSA9PT0gJ2NvbW1hJyB8fCBwcmlvci50eXBlID09PSAnYnJhY2UnKTtcbiAgICAgIGNvbnN0IGlzRXh0Z2xvYiA9IGV4dGdsb2JzLmxlbmd0aCAmJiAocHJpb3IudHlwZSA9PT0gJ3BpcGUnIHx8IHByaW9yLnR5cGUgPT09ICdwYXJlbicpO1xuICAgICAgaWYgKCFpc1N0YXJ0ICYmIHByaW9yLnR5cGUgIT09ICdwYXJlbicgJiYgIWlzQnJhY2UgJiYgIWlzRXh0Z2xvYikge1xuICAgICAgICBwdXNoKHsgdHlwZTogJ3N0YXInLCB2YWx1ZSwgb3V0cHV0OiAnJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIHN0cmlwIGNvbnNlY3V0aXZlIGAvKiovYFxuICAgICAgd2hpbGUgKHJlc3Quc2xpY2UoMCwgMykgPT09ICcvKionKSB7XG4gICAgICAgIGNvbnN0IGFmdGVyID0gaW5wdXRbc3RhdGUuaW5kZXggKyA0XTtcbiAgICAgICAgaWYgKGFmdGVyICYmIGFmdGVyICE9PSAnLycpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXN0ID0gcmVzdC5zbGljZSgzKTtcbiAgICAgICAgY29uc3VtZSgnLyoqJywgMyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnYm9zJyAmJiBlb3MoKSkge1xuICAgICAgICBwcmV2LnR5cGUgPSAnZ2xvYnN0YXInO1xuICAgICAgICBwcmV2LnZhbHVlICs9IHZhbHVlO1xuICAgICAgICBwcmV2Lm91dHB1dCA9IGdsb2JzdGFyKG9wdHMpO1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBwcmV2Lm91dHB1dDtcbiAgICAgICAgc3RhdGUuZ2xvYnN0YXIgPSB0cnVlO1xuICAgICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnc2xhc2gnICYmIHByaW9yLnByZXYudHlwZSAhPT0gJ2JvcycgJiYgIWFmdGVyU3RhciAmJiBlb3MoKSkge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgLShwcmlvci5vdXRwdXQgKyBwcmV2Lm91dHB1dCkubGVuZ3RoKTtcbiAgICAgICAgcHJpb3Iub3V0cHV0ID0gYCg/OiR7cHJpb3Iub3V0cHV0fWA7XG5cbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi5vdXRwdXQgPSBnbG9ic3RhcihvcHRzKSArIChvcHRzLnN0cmljdFNsYXNoZXMgPyAnKScgOiAnfCQpJyk7XG4gICAgICAgIHByZXYudmFsdWUgKz0gdmFsdWU7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHByaW9yLm91dHB1dCArIHByZXYub3V0cHV0O1xuICAgICAgICBjb25zdW1lKHZhbHVlKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnc2xhc2gnICYmIHByaW9yLnByZXYudHlwZSAhPT0gJ2JvcycgJiYgcmVzdFswXSA9PT0gJy8nKSB7XG4gICAgICAgIGNvbnN0IGVuZCA9IHJlc3RbMV0gIT09IHZvaWQgMCA/ICd8JCcgOiAnJztcblxuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBzdGF0ZS5vdXRwdXQuc2xpY2UoMCwgLShwcmlvci5vdXRwdXQgKyBwcmV2Lm91dHB1dCkubGVuZ3RoKTtcbiAgICAgICAgcHJpb3Iub3V0cHV0ID0gYCg/OiR7cHJpb3Iub3V0cHV0fWA7XG5cbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi5vdXRwdXQgPSBgJHtnbG9ic3RhcihvcHRzKX0ke1NMQVNIX0xJVEVSQUx9fCR7U0xBU0hfTElURVJBTH0ke2VuZH0pYDtcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcblxuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gcHJpb3Iub3V0cHV0ICsgcHJldi5vdXRwdXQ7XG4gICAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcblxuICAgICAgICBjb25zdW1lKHZhbHVlICsgYWR2YW5jZSgpKTtcblxuICAgICAgICBwdXNoKHsgdHlwZTogJ3NsYXNoJywgdmFsdWU6ICcvJywgb3V0cHV0OiAnJyB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwcmlvci50eXBlID09PSAnYm9zJyAmJiByZXN0WzBdID09PSAnLycpIHtcbiAgICAgICAgcHJldi50eXBlID0gJ2dsb2JzdGFyJztcbiAgICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcbiAgICAgICAgcHJldi5vdXRwdXQgPSBgKD86Xnwke1NMQVNIX0xJVEVSQUx9fCR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfSlgO1xuICAgICAgICBzdGF0ZS5vdXRwdXQgPSBwcmV2Lm91dHB1dDtcbiAgICAgICAgc3RhdGUuZ2xvYnN0YXIgPSB0cnVlO1xuICAgICAgICBjb25zdW1lKHZhbHVlICsgYWR2YW5jZSgpKTtcbiAgICAgICAgcHVzaCh7IHR5cGU6ICdzbGFzaCcsIHZhbHVlOiAnLycsIG91dHB1dDogJycgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyByZW1vdmUgc2luZ2xlIHN0YXIgZnJvbSBvdXRwdXRcbiAgICAgIHN0YXRlLm91dHB1dCA9IHN0YXRlLm91dHB1dC5zbGljZSgwLCAtcHJldi5vdXRwdXQubGVuZ3RoKTtcblxuICAgICAgLy8gcmVzZXQgcHJldmlvdXMgdG9rZW4gdG8gZ2xvYnN0YXJcbiAgICAgIHByZXYudHlwZSA9ICdnbG9ic3Rhcic7XG4gICAgICBwcmV2Lm91dHB1dCA9IGdsb2JzdGFyKG9wdHMpO1xuICAgICAgcHJldi52YWx1ZSArPSB2YWx1ZTtcblxuICAgICAgLy8gcmVzZXQgb3V0cHV0IHdpdGggZ2xvYnN0YXJcbiAgICAgIHN0YXRlLm91dHB1dCArPSBwcmV2Lm91dHB1dDtcbiAgICAgIHN0YXRlLmdsb2JzdGFyID0gdHJ1ZTtcbiAgICAgIGNvbnN1bWUodmFsdWUpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgdG9rZW4gPSB7IHR5cGU6ICdzdGFyJywgdmFsdWUsIG91dHB1dDogc3RhciB9O1xuXG4gICAgaWYgKG9wdHMuYmFzaCA9PT0gdHJ1ZSkge1xuICAgICAgdG9rZW4ub3V0cHV0ID0gJy4qPyc7XG4gICAgICBpZiAocHJldi50eXBlID09PSAnYm9zJyB8fCBwcmV2LnR5cGUgPT09ICdzbGFzaCcpIHtcbiAgICAgICAgdG9rZW4ub3V0cHV0ID0gbm9kb3QgKyB0b2tlbi5vdXRwdXQ7XG4gICAgICB9XG4gICAgICBwdXNoKHRva2VuKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChwcmV2ICYmIChwcmV2LnR5cGUgPT09ICdicmFja2V0JyB8fCBwcmV2LnR5cGUgPT09ICdwYXJlbicpICYmIG9wdHMucmVnZXggPT09IHRydWUpIHtcbiAgICAgIHRva2VuLm91dHB1dCA9IHZhbHVlO1xuICAgICAgcHVzaCh0b2tlbik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdGUuaW5kZXggPT09IHN0YXRlLnN0YXJ0IHx8IHByZXYudHlwZSA9PT0gJ3NsYXNoJyB8fCBwcmV2LnR5cGUgPT09ICdkb3QnKSB7XG4gICAgICBpZiAocHJldi50eXBlID09PSAnZG90Jykge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gTk9fRE9UX1NMQVNIO1xuICAgICAgICBwcmV2Lm91dHB1dCArPSBOT19ET1RfU0xBU0g7XG5cbiAgICAgIH0gZWxzZSBpZiAob3B0cy5kb3QgPT09IHRydWUpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IE5PX0RPVFNfU0xBU0g7XG4gICAgICAgIHByZXYub3V0cHV0ICs9IE5PX0RPVFNfU0xBU0g7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXRlLm91dHB1dCArPSBub2RvdDtcbiAgICAgICAgcHJldi5vdXRwdXQgKz0gbm9kb3Q7XG4gICAgICB9XG5cbiAgICAgIGlmIChwZWVrKCkgIT09ICcqJykge1xuICAgICAgICBzdGF0ZS5vdXRwdXQgKz0gT05FX0NIQVI7XG4gICAgICAgIHByZXYub3V0cHV0ICs9IE9ORV9DSEFSO1xuICAgICAgfVxuICAgIH1cblxuICAgIHB1c2godG9rZW4pO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLmJyYWNrZXRzID4gMCkge1xuICAgIGlmIChvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB0aHJvdyBuZXcgU3ludGF4RXJyb3Ioc3ludGF4RXJyb3IoJ2Nsb3NpbmcnLCAnXScpKTtcbiAgICBzdGF0ZS5vdXRwdXQgPSB1dGlscy5lc2NhcGVMYXN0KHN0YXRlLm91dHB1dCwgJ1snKTtcbiAgICBkZWNyZW1lbnQoJ2JyYWNrZXRzJyk7XG4gIH1cblxuICB3aGlsZSAoc3RhdGUucGFyZW5zID4gMCkge1xuICAgIGlmIChvcHRzLnN0cmljdEJyYWNrZXRzID09PSB0cnVlKSB0aHJvdyBuZXcgU3ludGF4RXJyb3Ioc3ludGF4RXJyb3IoJ2Nsb3NpbmcnLCAnKScpKTtcbiAgICBzdGF0ZS5vdXRwdXQgPSB1dGlscy5lc2NhcGVMYXN0KHN0YXRlLm91dHB1dCwgJygnKTtcbiAgICBkZWNyZW1lbnQoJ3BhcmVucycpO1xuICB9XG5cbiAgd2hpbGUgKHN0YXRlLmJyYWNlcyA+IDApIHtcbiAgICBpZiAob3B0cy5zdHJpY3RCcmFja2V0cyA9PT0gdHJ1ZSkgdGhyb3cgbmV3IFN5bnRheEVycm9yKHN5bnRheEVycm9yKCdjbG9zaW5nJywgJ30nKSk7XG4gICAgc3RhdGUub3V0cHV0ID0gdXRpbHMuZXNjYXBlTGFzdChzdGF0ZS5vdXRwdXQsICd7Jyk7XG4gICAgZGVjcmVtZW50KCdicmFjZXMnKTtcbiAgfVxuXG4gIGlmIChvcHRzLnN0cmljdFNsYXNoZXMgIT09IHRydWUgJiYgKHByZXYudHlwZSA9PT0gJ3N0YXInIHx8IHByZXYudHlwZSA9PT0gJ2JyYWNrZXQnKSkge1xuICAgIHB1c2goeyB0eXBlOiAnbWF5YmVfc2xhc2gnLCB2YWx1ZTogJycsIG91dHB1dDogYCR7U0xBU0hfTElURVJBTH0/YCB9KTtcbiAgfVxuXG4gIC8vIHJlYnVpbGQgdGhlIG91dHB1dCBpZiB3ZSBoYWQgdG8gYmFja3RyYWNrIGF0IGFueSBwb2ludFxuICBpZiAoc3RhdGUuYmFja3RyYWNrID09PSB0cnVlKSB7XG4gICAgc3RhdGUub3V0cHV0ID0gJyc7XG5cbiAgICBmb3IgKGNvbnN0IHRva2VuIG9mIHN0YXRlLnRva2Vucykge1xuICAgICAgc3RhdGUub3V0cHV0ICs9IHRva2VuLm91dHB1dCAhPSBudWxsID8gdG9rZW4ub3V0cHV0IDogdG9rZW4udmFsdWU7XG5cbiAgICAgIGlmICh0b2tlbi5zdWZmaXgpIHtcbiAgICAgICAgc3RhdGUub3V0cHV0ICs9IHRva2VuLnN1ZmZpeDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59O1xuXG4vKipcbiAqIEZhc3QgcGF0aHMgZm9yIGNyZWF0aW5nIHJlZ3VsYXIgZXhwcmVzc2lvbnMgZm9yIGNvbW1vbiBnbG9iIHBhdHRlcm5zLlxuICogVGhpcyBjYW4gc2lnbmlmaWNhbnRseSBzcGVlZCB1cCBwcm9jZXNzaW5nIGFuZCBoYXMgdmVyeSBsaXR0bGUgZG93bnNpZGVcbiAqIGltcGFjdCB3aGVuIG5vbmUgb2YgdGhlIGZhc3QgcGF0aHMgbWF0Y2guXG4gKi9cblxucGFyc2UuZmFzdHBhdGhzID0gKGlucHV0LCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IG9wdHMgPSB7IC4uLm9wdGlvbnMgfTtcbiAgY29uc3QgbWF4ID0gdHlwZW9mIG9wdHMubWF4TGVuZ3RoID09PSAnbnVtYmVyJyA/IE1hdGgubWluKE1BWF9MRU5HVEgsIG9wdHMubWF4TGVuZ3RoKSA6IE1BWF9MRU5HVEg7XG4gIGNvbnN0IGxlbiA9IGlucHV0Lmxlbmd0aDtcbiAgaWYgKGxlbiA+IG1heCkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW5wdXQgbGVuZ3RoOiAke2xlbn0sIGV4Y2VlZHMgbWF4aW11bSBhbGxvd2VkIGxlbmd0aDogJHttYXh9YCk7XG4gIH1cblxuICBpbnB1dCA9IFJFUExBQ0VNRU5UU1tpbnB1dF0gfHwgaW5wdXQ7XG4gIGNvbnN0IHdpbjMyID0gdXRpbHMuaXNXaW5kb3dzKG9wdGlvbnMpO1xuXG4gIC8vIGNyZWF0ZSBjb25zdGFudHMgYmFzZWQgb24gcGxhdGZvcm0sIGZvciB3aW5kb3dzIG9yIHBvc2l4XG4gIGNvbnN0IHtcbiAgICBET1RfTElURVJBTCxcbiAgICBTTEFTSF9MSVRFUkFMLFxuICAgIE9ORV9DSEFSLFxuICAgIERPVFNfU0xBU0gsXG4gICAgTk9fRE9ULFxuICAgIE5PX0RPVFMsXG4gICAgTk9fRE9UU19TTEFTSCxcbiAgICBTVEFSLFxuICAgIFNUQVJUX0FOQ0hPUlxuICB9ID0gY29uc3RhbnRzLmdsb2JDaGFycyh3aW4zMik7XG5cbiAgY29uc3Qgbm9kb3QgPSBvcHRzLmRvdCA/IE5PX0RPVFMgOiBOT19ET1Q7XG4gIGNvbnN0IHNsYXNoRG90ID0gb3B0cy5kb3QgPyBOT19ET1RTX1NMQVNIIDogTk9fRE9UO1xuICBjb25zdCBjYXB0dXJlID0gb3B0cy5jYXB0dXJlID8gJycgOiAnPzonO1xuICBjb25zdCBzdGF0ZSA9IHsgbmVnYXRlZDogZmFsc2UsIHByZWZpeDogJycgfTtcbiAgbGV0IHN0YXIgPSBvcHRzLmJhc2ggPT09IHRydWUgPyAnLio/JyA6IFNUQVI7XG5cbiAgaWYgKG9wdHMuY2FwdHVyZSkge1xuICAgIHN0YXIgPSBgKCR7c3Rhcn0pYDtcbiAgfVxuXG4gIGNvbnN0IGdsb2JzdGFyID0gKG9wdHMpID0+IHtcbiAgICBpZiAob3B0cy5ub2dsb2JzdGFyID09PSB0cnVlKSByZXR1cm4gc3RhcjtcbiAgICByZXR1cm4gYCgke2NhcHR1cmV9KD86KD8hJHtTVEFSVF9BTkNIT1J9JHtvcHRzLmRvdCA/IERPVFNfU0xBU0ggOiBET1RfTElURVJBTH0pLikqPylgO1xuICB9O1xuXG4gIGNvbnN0IGNyZWF0ZSA9IHN0ciA9PiB7XG4gICAgc3dpdGNoIChzdHIpIHtcbiAgICAgIGNhc2UgJyonOlxuICAgICAgICByZXR1cm4gYCR7bm9kb3R9JHtPTkVfQ0hBUn0ke3N0YXJ9YDtcblxuICAgICAgY2FzZSAnLionOlxuICAgICAgICByZXR1cm4gYCR7RE9UX0xJVEVSQUx9JHtPTkVfQ0hBUn0ke3N0YXJ9YDtcblxuICAgICAgY2FzZSAnKi4qJzpcbiAgICAgICAgcmV0dXJuIGAke25vZG90fSR7c3Rhcn0ke0RPVF9MSVRFUkFMfSR7T05FX0NIQVJ9JHtzdGFyfWA7XG5cbiAgICAgIGNhc2UgJyovKic6XG4gICAgICAgIHJldHVybiBgJHtub2RvdH0ke3N0YXJ9JHtTTEFTSF9MSVRFUkFMfSR7T05FX0NIQVJ9JHtzbGFzaERvdH0ke3N0YXJ9YDtcblxuICAgICAgY2FzZSAnKionOlxuICAgICAgICByZXR1cm4gbm9kb3QgKyBnbG9ic3RhcihvcHRzKTtcblxuICAgICAgY2FzZSAnKiovKic6XG4gICAgICAgIHJldHVybiBgKD86JHtub2RvdH0ke2dsb2JzdGFyKG9wdHMpfSR7U0xBU0hfTElURVJBTH0pPyR7c2xhc2hEb3R9JHtPTkVfQ0hBUn0ke3N0YXJ9YDtcblxuICAgICAgY2FzZSAnKiovKi4qJzpcbiAgICAgICAgcmV0dXJuIGAoPzoke25vZG90fSR7Z2xvYnN0YXIob3B0cyl9JHtTTEFTSF9MSVRFUkFMfSk/JHtzbGFzaERvdH0ke3N0YXJ9JHtET1RfTElURVJBTH0ke09ORV9DSEFSfSR7c3Rhcn1gO1xuXG4gICAgICBjYXNlICcqKi8uKic6XG4gICAgICAgIHJldHVybiBgKD86JHtub2RvdH0ke2dsb2JzdGFyKG9wdHMpfSR7U0xBU0hfTElURVJBTH0pPyR7RE9UX0xJVEVSQUx9JHtPTkVfQ0hBUn0ke3N0YXJ9YDtcblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICBjb25zdCBtYXRjaCA9IC9eKC4qPylcXC4oXFx3KykkLy5leGVjKHN0cik7XG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybjtcblxuICAgICAgICBjb25zdCBzb3VyY2UgPSBjcmVhdGUobWF0Y2hbMV0pO1xuICAgICAgICBpZiAoIXNvdXJjZSkgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiBzb3VyY2UgKyBET1RfTElURVJBTCArIG1hdGNoWzJdO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBvdXRwdXQgPSB1dGlscy5yZW1vdmVQcmVmaXgoaW5wdXQsIHN0YXRlKTtcbiAgbGV0IHNvdXJjZSA9IGNyZWF0ZShvdXRwdXQpO1xuXG4gIGlmIChzb3VyY2UgJiYgb3B0cy5zdHJpY3RTbGFzaGVzICE9PSB0cnVlKSB7XG4gICAgc291cmNlICs9IGAke1NMQVNIX0xJVEVSQUx9P2A7XG4gIH1cblxuICByZXR1cm4gc291cmNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcbmNvbnN0IHNjYW4gPSByZXF1aXJlKCcuL3NjYW4nKTtcbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5jb25zdCBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3QgaXNPYmplY3QgPSB2YWwgPT4gdmFsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbCk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdGNoZXIgZnVuY3Rpb24gZnJvbSBvbmUgb3IgbW9yZSBnbG9iIHBhdHRlcm5zLiBUaGVcbiAqIHJldHVybmVkIGZ1bmN0aW9uIHRha2VzIGEgc3RyaW5nIHRvIG1hdGNoIGFzIGl0cyBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCByZXR1cm5zIHRydWUgaWYgdGhlIHN0cmluZyBpcyBhIG1hdGNoLiBUaGUgcmV0dXJuZWQgbWF0Y2hlclxuICogZnVuY3Rpb24gYWxzbyB0YWtlcyBhIGJvb2xlYW4gYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0aGF0LCB3aGVuIHRydWUsXG4gKiByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGFkZGl0aW9uYWwgaW5mb3JtYXRpb24uXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoKGdsb2JbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc3QgaXNNYXRjaCA9IHBpY29tYXRjaCgnKi4hKCphKScpO1xuICogY29uc29sZS5sb2coaXNNYXRjaCgnYS5hJykpOyAvLz0+IGZhbHNlXG4gKiBjb25zb2xlLmxvZyhpc01hdGNoKCdhLmInKSk7IC8vPT4gdHJ1ZVxuICogYGBgXG4gKiBAbmFtZSBwaWNvbWF0Y2hcbiAqIEBwYXJhbSB7U3RyaW5nfEFycmF5fSBgZ2xvYnNgIE9uZSBvciBtb3JlIGdsb2IgcGF0dGVybnMuXG4gKiBAcGFyYW0ge09iamVjdD19IGBvcHRpb25zYFxuICogQHJldHVybiB7RnVuY3Rpb249fSBSZXR1cm5zIGEgbWF0Y2hlciBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuY29uc3QgcGljb21hdGNoID0gKGdsb2IsIG9wdGlvbnMsIHJldHVyblN0YXRlID0gZmFsc2UpID0+IHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoZ2xvYikpIHtcbiAgICBjb25zdCBmbnMgPSBnbG9iLm1hcChpbnB1dCA9PiBwaWNvbWF0Y2goaW5wdXQsIG9wdGlvbnMsIHJldHVyblN0YXRlKSk7XG4gICAgY29uc3QgYXJyYXlNYXRjaGVyID0gc3RyID0+IHtcbiAgICAgIGZvciAoY29uc3QgaXNNYXRjaCBvZiBmbnMpIHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBpc01hdGNoKHN0cik7XG4gICAgICAgIGlmIChzdGF0ZSkgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIGFycmF5TWF0Y2hlcjtcbiAgfVxuXG4gIGNvbnN0IGlzU3RhdGUgPSBpc09iamVjdChnbG9iKSAmJiBnbG9iLnRva2VucyAmJiBnbG9iLmlucHV0O1xuXG4gIGlmIChnbG9iID09PSAnJyB8fCAodHlwZW9mIGdsb2IgIT09ICdzdHJpbmcnICYmICFpc1N0YXRlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIHBhdHRlcm4gdG8gYmUgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgcG9zaXggPSB1dGlscy5pc1dpbmRvd3Mob3B0aW9ucyk7XG4gIGNvbnN0IHJlZ2V4ID0gaXNTdGF0ZVxuICAgID8gcGljb21hdGNoLmNvbXBpbGVSZShnbG9iLCBvcHRpb25zKVxuICAgIDogcGljb21hdGNoLm1ha2VSZShnbG9iLCBvcHRpb25zLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgY29uc3Qgc3RhdGUgPSByZWdleC5zdGF0ZTtcbiAgZGVsZXRlIHJlZ2V4LnN0YXRlO1xuXG4gIGxldCBpc0lnbm9yZWQgPSAoKSA9PiBmYWxzZTtcbiAgaWYgKG9wdHMuaWdub3JlKSB7XG4gICAgY29uc3QgaWdub3JlT3B0cyA9IHsgLi4ub3B0aW9ucywgaWdub3JlOiBudWxsLCBvbk1hdGNoOiBudWxsLCBvblJlc3VsdDogbnVsbCB9O1xuICAgIGlzSWdub3JlZCA9IHBpY29tYXRjaChvcHRzLmlnbm9yZSwgaWdub3JlT3B0cywgcmV0dXJuU3RhdGUpO1xuICB9XG5cbiAgY29uc3QgbWF0Y2hlciA9IChpbnB1dCwgcmV0dXJuT2JqZWN0ID0gZmFsc2UpID0+IHtcbiAgICBjb25zdCB7IGlzTWF0Y2gsIG1hdGNoLCBvdXRwdXQgfSA9IHBpY29tYXRjaC50ZXN0KGlucHV0LCByZWdleCwgb3B0aW9ucywgeyBnbG9iLCBwb3NpeCB9KTtcbiAgICBjb25zdCByZXN1bHQgPSB7IGdsb2IsIHN0YXRlLCByZWdleCwgcG9zaXgsIGlucHV0LCBvdXRwdXQsIG1hdGNoLCBpc01hdGNoIH07XG5cbiAgICBpZiAodHlwZW9mIG9wdHMub25SZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9wdHMub25SZXN1bHQocmVzdWx0KTtcbiAgICB9XG5cbiAgICBpZiAoaXNNYXRjaCA9PT0gZmFsc2UpIHtcbiAgICAgIHJlc3VsdC5pc01hdGNoID0gZmFsc2U7XG4gICAgICByZXR1cm4gcmV0dXJuT2JqZWN0ID8gcmVzdWx0IDogZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlzSWdub3JlZChpbnB1dCkpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0cy5vbklnbm9yZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvcHRzLm9uSWdub3JlKHJlc3VsdCk7XG4gICAgICB9XG4gICAgICByZXN1bHQuaXNNYXRjaCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHJldHVybk9iamVjdCA/IHJlc3VsdCA6IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0cy5vbk1hdGNoID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvcHRzLm9uTWF0Y2gocmVzdWx0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJldHVybk9iamVjdCA/IHJlc3VsdCA6IHRydWU7XG4gIH07XG5cbiAgaWYgKHJldHVyblN0YXRlKSB7XG4gICAgbWF0Y2hlci5zdGF0ZSA9IHN0YXRlO1xuICB9XG5cbiAgcmV0dXJuIG1hdGNoZXI7XG59O1xuXG4vKipcbiAqIFRlc3QgYGlucHV0YCB3aXRoIHRoZSBnaXZlbiBgcmVnZXhgLiBUaGlzIGlzIHVzZWQgYnkgdGhlIG1haW5cbiAqIGBwaWNvbWF0Y2goKWAgZnVuY3Rpb24gdG8gdGVzdCB0aGUgaW5wdXQgc3RyaW5nLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaC50ZXN0KGlucHV0LCByZWdleFssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2gudGVzdCgnZm9vL2JhcicsIC9eKD86KFteL10qPylcXC8oW14vXSo/KSkkLykpO1xuICogLy8geyBpc01hdGNoOiB0cnVlLCBtYXRjaDogWyAnZm9vLycsICdmb28nLCAnYmFyJyBdLCBvdXRwdXQ6ICdmb28vYmFyJyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIFN0cmluZyB0byB0ZXN0LlxuICogQHBhcmFtIHtSZWdFeHB9IGByZWdleGBcbiAqIEByZXR1cm4ge09iamVjdH0gUmV0dXJucyBhbiBvYmplY3Qgd2l0aCBtYXRjaGluZyBpbmZvLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5waWNvbWF0Y2gudGVzdCA9IChpbnB1dCwgcmVnZXgsIG9wdGlvbnMsIHsgZ2xvYiwgcG9zaXggfSA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgaW5wdXQgdG8gYmUgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIGlmIChpbnB1dCA9PT0gJycpIHtcbiAgICByZXR1cm4geyBpc01hdGNoOiBmYWxzZSwgb3V0cHV0OiAnJyB9O1xuICB9XG5cbiAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IGZvcm1hdCA9IG9wdHMuZm9ybWF0IHx8IChwb3NpeCA/IHV0aWxzLnRvUG9zaXhTbGFzaGVzIDogbnVsbCk7XG4gIGxldCBtYXRjaCA9IGlucHV0ID09PSBnbG9iO1xuICBsZXQgb3V0cHV0ID0gKG1hdGNoICYmIGZvcm1hdCkgPyBmb3JtYXQoaW5wdXQpIDogaW5wdXQ7XG5cbiAgaWYgKG1hdGNoID09PSBmYWxzZSkge1xuICAgIG91dHB1dCA9IGZvcm1hdCA/IGZvcm1hdChpbnB1dCkgOiBpbnB1dDtcbiAgICBtYXRjaCA9IG91dHB1dCA9PT0gZ2xvYjtcbiAgfVxuXG4gIGlmIChtYXRjaCA9PT0gZmFsc2UgfHwgb3B0cy5jYXB0dXJlID09PSB0cnVlKSB7XG4gICAgaWYgKG9wdHMubWF0Y2hCYXNlID09PSB0cnVlIHx8IG9wdHMuYmFzZW5hbWUgPT09IHRydWUpIHtcbiAgICAgIG1hdGNoID0gcGljb21hdGNoLm1hdGNoQmFzZShpbnB1dCwgcmVnZXgsIG9wdGlvbnMsIHBvc2l4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWF0Y2ggPSByZWdleC5leGVjKG91dHB1dCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaXNNYXRjaDogQm9vbGVhbihtYXRjaCksIG1hdGNoLCBvdXRwdXQgfTtcbn07XG5cbi8qKlxuICogTWF0Y2ggdGhlIGJhc2VuYW1lIG9mIGEgZmlsZXBhdGguXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLm1hdGNoQmFzZShpbnB1dCwgZ2xvYlssIG9wdGlvbnNdKTtcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC5tYXRjaEJhc2UoJ2Zvby9iYXIuanMnLCAnKi5qcycpOyAvLyB0cnVlXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgaW5wdXRgIFN0cmluZyB0byB0ZXN0LlxuICogQHBhcmFtIHtSZWdFeHB8U3RyaW5nfSBgZ2xvYmAgR2xvYiBwYXR0ZXJuIG9yIHJlZ2V4IGNyZWF0ZWQgYnkgWy5tYWtlUmVdKCNtYWtlUmUpLlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLm1hdGNoQmFzZSA9IChpbnB1dCwgZ2xvYiwgb3B0aW9ucywgcG9zaXggPSB1dGlscy5pc1dpbmRvd3Mob3B0aW9ucykpID0+IHtcbiAgY29uc3QgcmVnZXggPSBnbG9iIGluc3RhbmNlb2YgUmVnRXhwID8gZ2xvYiA6IHBpY29tYXRjaC5tYWtlUmUoZ2xvYiwgb3B0aW9ucyk7XG4gIHJldHVybiByZWdleC50ZXN0KHBhdGguYmFzZW5hbWUoaW5wdXQpKTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmICoqYW55Kiogb2YgdGhlIGdpdmVuIGdsb2IgYHBhdHRlcm5zYCBtYXRjaCB0aGUgc3BlY2lmaWVkIGBzdHJpbmdgLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwaWNvbWF0Y2ggPSByZXF1aXJlKCdwaWNvbWF0Y2gnKTtcbiAqIC8vIHBpY29tYXRjaC5pc01hdGNoKHN0cmluZywgcGF0dGVybnNbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc29sZS5sb2cocGljb21hdGNoLmlzTWF0Y2goJ2EuYScsIFsnYi4qJywgJyouYSddKSk7IC8vPT4gdHJ1ZVxuICogY29uc29sZS5sb2cocGljb21hdGNoLmlzTWF0Y2goJ2EuYScsICdiLionKSk7IC8vPT4gZmFsc2VcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd8QXJyYXl9IHN0ciBUaGUgc3RyaW5nIHRvIHRlc3QuXG4gKiBAcGFyYW0ge1N0cmluZ3xBcnJheX0gcGF0dGVybnMgT25lIG9yIG1vcmUgZ2xvYiBwYXR0ZXJucyB0byB1c2UgZm9yIG1hdGNoaW5nLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBTZWUgYXZhaWxhYmxlIFtvcHRpb25zXSgjb3B0aW9ucykuXG4gKiBAcmV0dXJuIHtCb29sZWFufSBSZXR1cm5zIHRydWUgaWYgYW55IHBhdHRlcm5zIG1hdGNoIGBzdHJgXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5pc01hdGNoID0gKHN0ciwgcGF0dGVybnMsIG9wdGlvbnMpID0+IHBpY29tYXRjaChwYXR0ZXJucywgb3B0aW9ucykoc3RyKTtcblxuLyoqXG4gKiBQYXJzZSBhIGdsb2IgcGF0dGVybiB0byBjcmVhdGUgdGhlIHNvdXJjZSBzdHJpbmcgZm9yIGEgcmVndWxhclxuICogZXhwcmVzc2lvbi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiBjb25zdCByZXN1bHQgPSBwaWNvbWF0Y2gucGFyc2UocGF0dGVyblssIG9wdGlvbnNdKTtcbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBwYXR0ZXJuYFxuICogQHBhcmFtIHtPYmplY3R9IGBvcHRpb25zYFxuICogQHJldHVybiB7T2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCB3aXRoIHVzZWZ1bCBwcm9wZXJ0aWVzIGFuZCBvdXRwdXQgdG8gYmUgdXNlZCBhcyBhIHJlZ2V4IHNvdXJjZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5wYXJzZSA9IChwYXR0ZXJuLCBvcHRpb25zKSA9PiB7XG4gIGlmIChBcnJheS5pc0FycmF5KHBhdHRlcm4pKSByZXR1cm4gcGF0dGVybi5tYXAocCA9PiBwaWNvbWF0Y2gucGFyc2UocCwgb3B0aW9ucykpO1xuICByZXR1cm4gcGFyc2UocGF0dGVybiwgeyAuLi5vcHRpb25zLCBmYXN0cGF0aHM6IGZhbHNlIH0pO1xufTtcblxuLyoqXG4gKiBTY2FuIGEgZ2xvYiBwYXR0ZXJuIHRvIHNlcGFyYXRlIHRoZSBwYXR0ZXJuIGludG8gc2VnbWVudHMuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLnNjYW4oaW5wdXRbLCBvcHRpb25zXSk7XG4gKlxuICogY29uc3QgcmVzdWx0ID0gcGljb21hdGNoLnNjYW4oJyEuL2Zvby8qLmpzJyk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQpO1xuICogeyBwcmVmaXg6ICchLi8nLFxuICogICBpbnB1dDogJyEuL2Zvby8qLmpzJyxcbiAqICAgc3RhcnQ6IDMsXG4gKiAgIGJhc2U6ICdmb28nLFxuICogICBnbG9iOiAnKi5qcycsXG4gKiAgIGlzQnJhY2U6IGZhbHNlLFxuICogICBpc0JyYWNrZXQ6IGZhbHNlLFxuICogICBpc0dsb2I6IHRydWUsXG4gKiAgIGlzRXh0Z2xvYjogZmFsc2UsXG4gKiAgIGlzR2xvYnN0YXI6IGZhbHNlLFxuICogICBuZWdhdGVkOiB0cnVlIH1cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBpbnB1dGAgR2xvYiBwYXR0ZXJuIHRvIHNjYW4uXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtPYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IHdpdGhcbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLnNjYW4gPSAoaW5wdXQsIG9wdGlvbnMpID0+IHNjYW4oaW5wdXQsIG9wdGlvbnMpO1xuXG4vKipcbiAqIENyZWF0ZSBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBmcm9tIGEgcGFyc2VkIGdsb2IgcGF0dGVybi5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgcGljb21hdGNoID0gcmVxdWlyZSgncGljb21hdGNoJyk7XG4gKiBjb25zdCBzdGF0ZSA9IHBpY29tYXRjaC5wYXJzZSgnKi5qcycpO1xuICogLy8gcGljb21hdGNoLmNvbXBpbGVSZShzdGF0ZVssIG9wdGlvbnNdKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhwaWNvbWF0Y2guY29tcGlsZVJlKHN0YXRlKSk7XG4gKiAvLz0+IC9eKD86KD8hXFwuKSg/PS4pW14vXSo/XFwuanMpJC9cbiAqIGBgYFxuICogQHBhcmFtIHtTdHJpbmd9IGBzdGF0ZWAgVGhlIG9iamVjdCByZXR1cm5lZCBmcm9tIHRoZSBgLnBhcnNlYCBtZXRob2QuXG4gKiBAcGFyYW0ge09iamVjdH0gYG9wdGlvbnNgXG4gKiBAcmV0dXJuIHtSZWdFeHB9IFJldHVybnMgYSByZWdleCBjcmVhdGVkIGZyb20gdGhlIGdpdmVuIHBhdHRlcm4uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnBpY29tYXRjaC5jb21waWxlUmUgPSAocGFyc2VkLCBvcHRpb25zLCByZXR1cm5PdXRwdXQgPSBmYWxzZSwgcmV0dXJuU3RhdGUgPSBmYWxzZSkgPT4ge1xuICBpZiAocmV0dXJuT3V0cHV0ID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIHBhcnNlZC5vdXRwdXQ7XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgY29uc3QgcHJlcGVuZCA9IG9wdHMuY29udGFpbnMgPyAnJyA6ICdeJztcbiAgY29uc3QgYXBwZW5kID0gb3B0cy5jb250YWlucyA/ICcnIDogJyQnO1xuXG4gIGxldCBzb3VyY2UgPSBgJHtwcmVwZW5kfSg/OiR7cGFyc2VkLm91dHB1dH0pJHthcHBlbmR9YDtcbiAgaWYgKHBhcnNlZCAmJiBwYXJzZWQubmVnYXRlZCA9PT0gdHJ1ZSkge1xuICAgIHNvdXJjZSA9IGBeKD8hJHtzb3VyY2V9KS4qJGA7XG4gIH1cblxuICBjb25zdCByZWdleCA9IHBpY29tYXRjaC50b1JlZ2V4KHNvdXJjZSwgb3B0aW9ucyk7XG4gIGlmIChyZXR1cm5TdGF0ZSA9PT0gdHJ1ZSkge1xuICAgIHJlZ2V4LnN0YXRlID0gcGFyc2VkO1xuICB9XG5cbiAgcmV0dXJuIHJlZ2V4O1xufTtcblxucGljb21hdGNoLm1ha2VSZSA9IChpbnB1dCwgb3B0aW9ucywgcmV0dXJuT3V0cHV0ID0gZmFsc2UsIHJldHVyblN0YXRlID0gZmFsc2UpID0+IHtcbiAgaWYgKCFpbnB1dCB8fCB0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBub24tZW1wdHkgc3RyaW5nJyk7XG4gIH1cblxuICBjb25zdCBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgbGV0IHBhcnNlZCA9IHsgbmVnYXRlZDogZmFsc2UsIGZhc3RwYXRoczogdHJ1ZSB9O1xuICBsZXQgcHJlZml4ID0gJyc7XG4gIGxldCBvdXRwdXQ7XG5cbiAgaWYgKGlucHV0LnN0YXJ0c1dpdGgoJy4vJykpIHtcbiAgICBpbnB1dCA9IGlucHV0LnNsaWNlKDIpO1xuICAgIHByZWZpeCA9IHBhcnNlZC5wcmVmaXggPSAnLi8nO1xuICB9XG5cbiAgaWYgKG9wdHMuZmFzdHBhdGhzICE9PSBmYWxzZSAmJiAoaW5wdXRbMF0gPT09ICcuJyB8fCBpbnB1dFswXSA9PT0gJyonKSkge1xuICAgIG91dHB1dCA9IHBhcnNlLmZhc3RwYXRocyhpbnB1dCwgb3B0aW9ucyk7XG4gIH1cblxuICBpZiAob3V0cHV0ID09PSB1bmRlZmluZWQpIHtcbiAgICBwYXJzZWQgPSBwYXJzZShpbnB1dCwgb3B0aW9ucyk7XG4gICAgcGFyc2VkLnByZWZpeCA9IHByZWZpeCArIChwYXJzZWQucHJlZml4IHx8ICcnKTtcbiAgfSBlbHNlIHtcbiAgICBwYXJzZWQub3V0cHV0ID0gb3V0cHV0O1xuICB9XG5cbiAgcmV0dXJuIHBpY29tYXRjaC5jb21waWxlUmUocGFyc2VkLCBvcHRpb25zLCByZXR1cm5PdXRwdXQsIHJldHVyblN0YXRlKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgcmVndWxhciBleHByZXNzaW9uIGZyb20gdGhlIGdpdmVuIHJlZ2V4IHNvdXJjZSBzdHJpbmcuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IHBpY29tYXRjaCA9IHJlcXVpcmUoJ3BpY29tYXRjaCcpO1xuICogLy8gcGljb21hdGNoLnRvUmVnZXgoc291cmNlWywgb3B0aW9uc10pO1xuICpcbiAqIGNvbnN0IHsgb3V0cHV0IH0gPSBwaWNvbWF0Y2gucGFyc2UoJyouanMnKTtcbiAqIGNvbnNvbGUubG9nKHBpY29tYXRjaC50b1JlZ2V4KG91dHB1dCkpO1xuICogLy89PiAvXig/Oig/IVxcLikoPz0uKVteL10qP1xcLmpzKSQvXG4gKiBgYGBcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc291cmNlYCBSZWd1bGFyIGV4cHJlc3Npb24gc291cmNlIHN0cmluZy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBgb3B0aW9uc2BcbiAqIEByZXR1cm4ge1JlZ0V4cH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucGljb21hdGNoLnRvUmVnZXggPSAoc291cmNlLCBvcHRpb25zKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgb3B0cyA9IG9wdGlvbnMgfHwge307XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoc291cmNlLCBvcHRzLmZsYWdzIHx8IChvcHRzLm5vY2FzZSA/ICdpJyA6ICcnKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZGVidWcgPT09IHRydWUpIHRocm93IGVycjtcbiAgICByZXR1cm4gLyReLztcbiAgfVxufTtcblxuLyoqXG4gKiBQaWNvbWF0Y2ggY29uc3RhbnRzLlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5cbnBpY29tYXRjaC5jb25zdGFudHMgPSBjb25zdGFudHM7XG5cbi8qKlxuICogRXhwb3NlIFwicGljb21hdGNoXCJcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBpY29tYXRjaDtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9waWNvbWF0Y2gnKTtcbiIsImltcG9ydCBkZWVwbWVyZ2UgZnJvbSAnZGVlcG1lcmdlJztcbmltcG9ydCBwaWNvbWF0Y2ggZnJvbSAncGljb21hdGNoJztcbmltcG9ydCB7IFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZywgVmF1bHQsIG5vcm1hbGl6ZVBhdGgsIFRGaWxlLCBnZXRMaW5rcGF0aCwgUmVmZXJlbmNlQ2FjaGUsIE5vdGljZSB9IGZyb20gJ29ic2lkaWFuJztcblxuaW50ZXJmYWNlIEluZGV4Tm9kZSB7XG4gIGNvdW50OiBudW1iZXI7XG4gIGxpbms6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlua0luZGV4ZXIgZXh0ZW5kcyBQbHVnaW4ge1xuICBzZXR0aW5nczogTGlua0luZGV4ZXJTZXR0aW5ncztcbiAgdmF1bHQ6IFZhdWx0O1xuICBnbG9iYWxFeGNsdWRlczogc3RyaW5nW11cblxuICBvbkluaXQoKSB7fVxuXG4gIGFzeW5jIG9ubG9hZCgpIHtcbiAgICBjb25zdCBsb2FkZWRTZXR0aW5ncyA9IGF3YWl0IHRoaXMubG9hZERhdGEoKTtcbiAgICBpZiAobG9hZGVkU2V0dGluZ3MpIHtcbiAgICAgIHRoaXMuc2V0dGluZ3MgPSBkZWVwbWVyZ2UobmV3IExpbmtJbmRleGVyU2V0dGluZ3MoKSwgbG9hZGVkU2V0dGluZ3MpO1xuICAgICAgdGhpcy5zZXR0aW5ncy51c2VkTGlua3MgPSBbXTtcbiAgICAgIGxvYWRlZFNldHRpbmdzLnVzZWRMaW5rcz8uZm9yRWFjaCgocjogVXNlZExpbmtzKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0dGluZ3MudXNlZExpbmtzLnB1c2goZGVlcG1lcmdlKG5ldyBVc2VkTGlua3MoKSwgcikpXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBMaW5rSW5kZXhlclNldHRpbmdzKCk7XG4gICAgfVxuICAgIHRoaXMucmVsb2FkU2V0dGluZ3MoKTtcblxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgTGlua0luZGV4ZXJTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG4gIFxuICB9XG5cbiAgYXN5bmMgb251bmxvYWQoKSB7XG4gICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcbiAgfVxuXG4gIHJlbG9hZFNldHRpbmdzKCkge1xuICAgIHRoaXMucmVtb3ZlT3duQ29tbWFuZHMoKTtcbiAgICB0aGlzLmdsb2JhbEV4Y2x1ZGVzID0gW107XG4gICAgdGhpcy5zZXR0aW5ncy51c2VkTGlua3MuZm9yRWFjaCgocjogVXNlZExpbmtzKSA9PiB7XG4gICAgICB0aGlzLmdsb2JhbEV4Y2x1ZGVzLnB1c2goci5wYXRoKTtcbiAgICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICAgIGlkOiBgbGluay1pbmRleGVyOnVzZWQtbGlua3M6JHtyLm5hbWV9YCxcbiAgICAgICAgbmFtZTogYFVzZWQgbGlua3MgLSAke3IubmFtZX1gLFxuICAgICAgICBjYWxsYmFjazogYXN5bmMgKCkgPT4gYXdhaXQgdGhpcy5nZW5lcmF0ZUFsbFVzZWRMaW5rc0luZGV4KGdldFByZXNldEJ5TmFtZSh0aGlzLnNldHRpbmdzLnVzZWRMaW5rcywgci5uYW1lKSksXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZU93bkNvbW1hbmRzKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB0aGlzLmFwcC5jb21tYW5kcy5saXN0Q29tbWFuZHMoKS5tYXAoKGMpID0+IGMuaWQpLmZpbHRlcigoYykgPT4gYy5zdGFydHNXaXRoKHRoaXMubWFuaWZlc3QuaWQpKS5mb3JFYWNoKChjOiBzdHJpbmcpID0+IHtcbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuYXBwLmNvbW1hbmRzLnJlbW92ZUNvbW1hbmQoYyk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZW5lcmF0ZUFsbFVzZWRMaW5rc0luZGV4KHByZXNldDogVXNlZExpbmtzKSB7XG4gICAgaWYgKCFwcmVzZXQpIHtcbiAgICAgIHJldHVybiBuZXcgTm90aWNlKGAke3ByZXNldH0gd2FzIG5vdCBmb3VuZC4gVHJ5IHJlbG9hZGluZyBPYnNpZGlhbi5gKTtcbiAgICB9XG4gICAgY29uc3QgdW5pcXVlTGlua3M6IFJlY29yZDxzdHJpbmcsIEluZGV4Tm9kZT4gPSB7fTtcblxuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xuICAgIGZpbGVzLmZvckVhY2goKGYpID0+IHtcbiAgICAgIGlmICh0aGlzLmlzRXhjbHVkZWQoZiwgcHJlc2V0LmV4Y2x1ZGVGcm9tRmlsZW5hbWVzLCBwcmVzZXQuZXhjbHVkZUZyb21HbG9icykpIHJldHVybjtcbiAgICAgIHRoaXMuZ3JhYkxpbmtzKHVuaXF1ZUxpbmtzLCBmLCB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmKS5saW5rcywgcHJlc2V0KVxuICAgICAgaWYgKHByZXNldC5pbmNsdWRlRW1iZWRzKSB7XG4gICAgICAgIHRoaXMuZ3JhYkxpbmtzKHVuaXF1ZUxpbmtzLCBmLCB0aGlzLmFwcC5tZXRhZGF0YUNhY2hlLmdldEZpbGVDYWNoZShmKS5lbWJlZHMsIHByZXNldClcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBzb3J0ZWRMaW5rcyA9IE9iamVjdC5lbnRyaWVzKHVuaXF1ZUxpbmtzKS5zb3J0KChhLCBiKSA9PiBiWzFdLmNvdW50IC0gYVsxXS5jb3VudCk7XG4gICAgY29uc3Qgc2VwYXJhdG9yID0gcHJlc2V0LnN0cmljdExpbmVCcmVha3MgPyAnXFxuXFxuJyA6ICdcXG4nO1xuICAgIGNvbnN0IGNvbnRlbnQgPSBzb3J0ZWRMaW5rcy5tYXAoKGwpID0+IGAke2xbMV0uY291bnR9ICR7bFsxXS5saW5rfWApLmpvaW4oc2VwYXJhdG9yKTtcbiAgICBjb25zdCBleGlzdCA9IGF3YWl0IHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIuZXhpc3RzKG5vcm1hbGl6ZVBhdGgocHJlc2V0LnBhdGgpLCBmYWxzZSk7XG4gICAgaWYgKGV4aXN0KSB7XG4gICAgICBjb25zdCBwID0gdGhpcy5hcHAudmF1bHQuZ2V0QWJzdHJhY3RGaWxlQnlQYXRoKG5vcm1hbGl6ZVBhdGgocHJlc2V0LnBhdGgpKTtcbiAgICAgIHRoaXMuYXBwLnZhdWx0LmFkYXB0ZXIud3JpdGUobm9ybWFsaXplUGF0aChwcmVzZXQucGF0aCksIGNvbnRlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFwcC52YXVsdC5jcmVhdGUocHJlc2V0LnBhdGgsIGNvbnRlbnQpO1xuICAgIH1cbiAgfVxuXG4gIGlzRXhjbHVkZWQoZjogVEZpbGUsIGZpbGVuYW1lUGF0dGVybnM6IHN0cmluZ1tdLCBnbG9iUGF0dGVybnM6ICBzdHJpbmdbXSkge1xuICAgIGNvbnN0IGlzR2xvYmFsbHlFeGNsdWRlZCA9IHRoaXMuZ2xvYmFsRXhjbHVkZXMuc29tZSgoZykgPT4gcGF0aEVxdWFsKGcsIGYucGF0aCkpO1xuICAgIGNvbnN0IGlzRmlsZW5hbWVFeGNsdWRlZCA9IGZpbGVuYW1lUGF0dGVybnMuc29tZSgocCkgPT4gbmV3IFJlZ0V4cChwKS50ZXN0KGYubmFtZSkpO1xuICAgIGNvbnN0IGlzR2xvYkV4Y2x1ZGVkID0gcGljb21hdGNoLmlzTWF0Y2goZi5wYXRoLCBnbG9iUGF0dGVybnMpO1xuICAgIHJldHVybiBpc0dsb2JhbGx5RXhjbHVkZWQgfHwgaXNGaWxlbmFtZUV4Y2x1ZGVkIHx8IGlzR2xvYkV4Y2x1ZGVkO1xuICB9XG5cbiAgZ3JhYkxpbmtzKHVuaXF1ZUxpbmtzOiBSZWNvcmQ8c3RyaW5nLCBJbmRleE5vZGU+LCBmOiBURmlsZSwgbGlua3M6IFJlZmVyZW5jZUNhY2hlW10sIHByZXNldDogVXNlZExpbmtzKSB7XG4gICAgbGlua3M/LmZvckVhY2goKGwpID0+IHtcbiAgICAgIGNvbnN0IGxpbmsgPSBnZXRMaW5rcGF0aChsLmxpbmspO1xuICAgICAgY29uc3Qgb3JpZ2luRmlsZSA9IHRoaXMuYXBwLm1ldGFkYXRhQ2FjaGUuZ2V0Rmlyc3RMaW5rcGF0aERlc3QobGluaywgZi5wYXRoKTtcbiAgICAgIGlmIChvcmlnaW5GaWxlICYmIChwcmVzZXQubm9uZXhpc3RlbnRPbmx5IHx8IHRoaXMuaXNFeGNsdWRlZChvcmlnaW5GaWxlLCBwcmVzZXQuZXhjbHVkZVRvRmlsZW5hbWVzLCBwcmVzZXQuZXhjbHVkZVRvR2xvYnMpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvcmlnaW4gPSBvcmlnaW5GaWxlID8gb3JpZ2luRmlsZS5wYXRoIDogbGluaztcbiAgICAgIGlmICh1bmlxdWVMaW5rc1tvcmlnaW5dKSB7XG4gICAgICAgIHVuaXF1ZUxpbmtzW29yaWdpbl0uY291bnQgKz0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHJhd0xpbmsgPSBvcmlnaW5GaWxlID8gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChvcmlnaW5GaWxlLCBwcmVzZXQucGF0aCwgdHJ1ZSkgOiBsaW5rO1xuICAgICAgICB1bmlxdWVMaW5rc1tvcmlnaW5dID0ge1xuICAgICAgICAgIGNvdW50OiAxLFxuICAgICAgICAgIGxpbms6IHByZXNldC5saW5rVG9GaWxlcyA/IGBbWyR7cmF3TGlua31dXWAgOiByYXdMaW5rXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuY2xhc3MgVXNlZExpbmtzIHtcbiAgbmFtZTogc3RyaW5nO1xuICBwYXRoOiBzdHJpbmc7XG4gIHN0cmljdExpbmVCcmVha3MgPSB0cnVlO1xuICBpbmNsdWRlRW1iZWRzID0gdHJ1ZTtcbiAgbGlua1RvRmlsZXMgPSB0cnVlO1xuICBub25leGlzdGVudE9ubHkgPSBmYWxzZTtcbiAgZXhjbHVkZVRvRmlsZW5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICBleGNsdWRlVG9HbG9iczogc3RyaW5nW10gPSBbXTtcbiAgZXhjbHVkZUZyb21GaWxlbmFtZXM6IHN0cmluZ1tdID0gW107XG4gIGV4Y2x1ZGVGcm9tR2xvYnM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5uYW1lID0gRGF0ZS5ub3coKS50b1N0cmluZygpO1xuICAgIHRoaXMucGF0aCA9IGAuL3VzZWRfbGlua3Mke3RoaXMubmFtZX0ubWRgO1xuICB9XG59XG5cbmNsYXNzIExpbmtJbmRleGVyU2V0dGluZ3Mge1xuICB1c2VkTGlua3M6IFVzZWRMaW5rc1tdID0gW107XG59XG5cbnR5cGUgUHJlc2V0ID0gVXNlZExpbmtzO1xuXG5mdW5jdGlvbiBnZXRQcmVzZXRCeU5hbWUocHJlc2V0czogUHJlc2V0W10sIG5hbWU6IHN0cmluZyk6IFByZXNldCB7XG4gIHJldHVybiBwcmVzZXRzLmZpbmQoKHIpID0+IHIubmFtZSA9PT0gbmFtZSk7XG59XG5cbmNsYXNzIExpbmtJbmRleGVyU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuICBkaXNwbGF5KCk6IHZvaWQge1xuICAgIGxldCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xuICAgIGNvbnN0IHBsdWdpbjogTGlua0luZGV4ZXIgPSAodGhpcyBhcyBhbnkpLnBsdWdpbjtcblxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDInLCB7dGV4dDogJ1VzZWQgbGlua3MnfSk7XG5cbiAgICBwbHVnaW4uc2V0dGluZ3MudXNlZExpbmtzLmZvckVhY2goKHJlcG9ydCkgPT4ge1xuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgIC5zZXROYW1lKCdQcmVzZXQgbmFtZScpXG4gICAgICAgIC5zZXREZXNjKCdBbGxvd2VkIGNoYXJhY3RlcnM6IEFTQ0lJIGxldHRlcnMsIGRpZ2l0cywgdW5kZXJzY29yZXMsIHNwYWNlcycpXG4gICAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PiBcbiAgICAgICAgICB0ZXh0LnNldFBsYWNlaG9sZGVyKHJlcG9ydC5uYW1lKVxuICAgICAgICAgICAgLnNldFBsYWNlaG9sZGVyKHJlcG9ydC5uYW1lKVxuICAgICAgICAgICAgLnNldFZhbHVlKHJlcG9ydC5uYW1lKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgIHJlcG9ydC5uYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEoeyByZWZyZXNoVUk6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZSgnQWxsIHVzZWQgbGlua3MnKVxuICAgICAgICAuc2V0RGVzYygnUGF0aCB0byB0aGUgbm90ZSB0aGF0IHdpbGwgY29udGFpbiBhbGwgZm91bmQgbGlua3Mgc29ydGVkIGJ5IHRoZWlyIG9jY3VycmVuY2VzJylcbiAgICAgICAgLmFkZFRleHQoKHRleHQpID0+IFxuICAgICAgICAgIHRleHRcbiAgICAgICAgICAgIC5zZXRQbGFjZWhvbGRlcihyZXBvcnQucGF0aClcbiAgICAgICAgICAgIC5zZXRWYWx1ZShyZXBvcnQucGF0aClcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgcmVwb3J0LnBhdGggPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh7IHJlZnJlc2hVSTogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoJ0luY2x1ZGUgZW1iZWRzJylcbiAgICAgICAgLnNldERlc2MoJ1doZW4gZGlzYWJsZWQsIG9ubHkgZGlyZWN0IGxpbmtzIGFyZSBjb3VudGVkLiBFbmFibGUgdG8gaW5jbHVkZSBlbWJlZGRlZCAodHJhc2NsdWRlZCkgbGlua3MuJylcbiAgICAgICAgLmFkZFRvZ2dsZSgodmFsdWUpID0+IFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAuc2V0VmFsdWUocmVwb3J0LmluY2x1ZGVFbWJlZHMpXG4gICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIHJlcG9ydC5pbmNsdWRlRW1iZWRzID0gdmFsdWU7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEoeyByZWZyZXNoVUk6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIFxuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgIC5zZXROYW1lKCdOb25leGlzdGVudCBmaWxlcyBvbmx5JylcbiAgICAgICAgLnNldERlc2MoJ1doZW4gZGlzYWJsZWQsIGxpbmtzIHRvIGJvdGggZXhpc3RpbmcgYW5kIG5vbmV4aXN0aW5nIGZpbGVzIGFyZSBjb3VudGVkLicpXG4gICAgICAgIC5hZGRUb2dnbGUoKHZhbHVlKSA9PiBcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICAgICAgLnNldFZhbHVlKHJlcG9ydC5ub25leGlzdGVudE9ubHkpXG4gICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIHJlcG9ydC5ub25leGlzdGVudE9ubHkgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh7IHJlZnJlc2hVSTogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuXG5cbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZSgnU3RyaWN0IGxpbmUgYnJlYWtzJylcbiAgICAgICAgLnNldERlc2MoJ0NvcnJlc3BvbmRzIHRvIHRoZSBzYW1lIEVkaXRvciBzZXR0aW5nOiBcIm9mZlwiID0gb25lIGxpbmUgYnJlYWssIFwib25cIiA9IHR3byBsaW5lIGJyZWFrcy4nKVxuICAgICAgICAuYWRkVG9nZ2xlKCh2YWx1ZSkgPT4gXG4gICAgICAgICAgdmFsdWVcbiAgICAgICAgICAgIC5zZXRWYWx1ZShyZXBvcnQuc3RyaWN0TGluZUJyZWFrcylcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgcmVwb3J0LnN0cmljdExpbmVCcmVha3MgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh7IHJlZnJlc2hVSTogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoJ0xpbmsgdG8gZmlsZXMnKVxuICAgICAgICAuc2V0RGVzYygnV2hlbiBcIm9uXCIgdGhlIG91dHB1dCBmaWxlIHdpbGwgdXNlIHdpa2ktbGlua3MgdG8gZmlsZXMuIERpc2FibGUgaWYgeW91IGRvblxcJ3Qgd2FudCB0byBwb2xsdXRlIGdyYXBoIHdpdGggaXQuJylcbiAgICAgICAgLmFkZFRvZ2dsZSgodmFsdWUpID0+IFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgICAgICAuc2V0VmFsdWUocmVwb3J0LmxpbmtUb0ZpbGVzKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICByZXBvcnQubGlua1RvRmlsZXMgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSh7IHJlZnJlc2hVSTogZmFsc2UgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgICAgLnNldE5hbWUoJ0V4Y2x1ZGUgbGlua3MgZnJvbSBmaWxlcycpXG4gICAgICAgIC5zZXREZXNjKCdFeHBlY3RzIHJlZ2V4IHBhdHRlcm5zLiBDaGVja3MgZm9yIGZpbGVuYW1lIHdpdGhvdXQgcGF0aC4nKVxuICAgICAgICAuYWRkVGV4dEFyZWEoKHRleHQpID0+IFxuICAgICAgICAgIHRleHRcbiAgICAgICAgICAgIC5zZXRWYWx1ZShyZXBvcnQuZXhjbHVkZUZyb21GaWxlbmFtZXMuam9pbignXFxuJykpXG4gICAgICAgICAgICAub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgIHJlcG9ydC5leGNsdWRlRnJvbUZpbGVuYW1lcyA9IHZhbHVlLnNwbGl0KCdcXG4nKS5maWx0ZXIoKHYpID0+IHYpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHsgcmVmcmVzaFVJOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICBcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZSgnRXhjbHVkZSBsaW5rcyBmcm9tIHBhdGhzJylcbiAgICAgICAgLnNldERlc2MoJ0V4cGVjdHMgcGF0aCBnbG9icy4gQ2hlY2tzIGZvciBmaWxlIHBhdGggaW5jbHVkaW5nIGZpbGVuYW1lLicpXG4gICAgICAgIC5hZGRUZXh0QXJlYSgodGV4dCkgPT4gXG4gICAgICAgICAgdGV4dFxuICAgICAgICAgICAgLnNldFZhbHVlKHJlcG9ydC5leGNsdWRlRnJvbUdsb2JzLmpvaW4oJ1xcbicpKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICByZXBvcnQuZXhjbHVkZUZyb21HbG9icyA9IHZhbHVlLnNwbGl0KCdcXG4nKS5maWx0ZXIoKHYpID0+IHYpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKHsgcmVmcmVzaFVJOiBmYWxzZSB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICBcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgICAuc2V0TmFtZSgnRXhjbHVkZSBsaW5rcyB0byBmaWxlcycpXG4gICAgICAgIC5zZXREZXNjKCdFeHBlY3RzIHJlZ2V4IHBhdHRlcm5zLiBDaGVja3MgZm9yIGZpbGVuYW1lIHdpdGhvdXQgcGF0aC4nKVxuICAgICAgICAuYWRkVGV4dEFyZWEoKHRleHQpID0+IFxuICAgICAgICAgIHRleHRcbiAgICAgICAgICAgIC5zZXRWYWx1ZShyZXBvcnQuZXhjbHVkZVRvRmlsZW5hbWVzLmpvaW4oJ1xcbicpKVxuICAgICAgICAgICAgLm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICByZXBvcnQuZXhjbHVkZVRvRmlsZW5hbWVzID0gdmFsdWUuc3BsaXQoJ1xcbicpLmZpbHRlcigodikgPT4gdik7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEoeyByZWZyZXNoVUk6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIFxuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAgIC5zZXROYW1lKCdFeGNsdWRlIGxpbmtzIHRvIHBhdGhzJylcbiAgICAgICAgLnNldERlc2MoJ0V4cGVjdHMgcGF0aCBnbG9icy4gQ2hlY2tzIGZvciBmaWxlIHBhdGggaW5jbHVkaW5nIGZpbGVuYW1lLicpXG4gICAgICAgIC5hZGRUZXh0QXJlYSgodGV4dCkgPT4gXG4gICAgICAgICAgdGV4dFxuICAgICAgICAgICAgLnNldFZhbHVlKHJlcG9ydC5leGNsdWRlVG9HbG9icy5qb2luKCdcXG4nKSlcbiAgICAgICAgICAgIC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgcmVwb3J0LmV4Y2x1ZGVUb0dsb2JzID0gdmFsdWUuc3BsaXQoJ1xcbicpLmZpbHRlcigodikgPT4gdik7XG4gICAgICAgICAgICAgIGF3YWl0IHRoaXMuc2F2ZURhdGEoeyByZWZyZXNoVUk6IGZhbHNlIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIFxuICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gbmV3IFNldHRpbmcoY29udGFpbmVyRWwpLmFkZEJ1dHRvbigoZXh0cmEpID0+IHtcbiAgICAgICAgcmV0dXJuIGV4dHJhLnNldEJ1dHRvblRleHQoJ0RlbGV0ZSBwcmVzZXQnKS5vbkNsaWNrKGFzeW5jKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGluZGV4ID0gcGx1Z2luLnNldHRpbmdzLnVzZWRMaW5rcy5maW5kSW5kZXgoKHIpID0+IHIubmFtZSA9PT0gcmVwb3J0Lm5hbWUpO1xuICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBwbHVnaW4uc2V0dGluZ3MudXNlZExpbmtzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNhdmVEYXRhKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgZGVsZXRlQnV0dG9uLnNldHRpbmdFbC5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMXB4IHNvbGlkIHZhcigtLXRleHQtYWNjZW50KSc7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhZGRCdXR0b24gPSBuZXcgU2V0dGluZyhjb250YWluZXJFbCkuYWRkQnV0dG9uKChidXR0b24pID0+IHtcbiAgICAgIHJldHVybiBidXR0b24uc2V0QnV0dG9uVGV4dCgnQWRkIHByZXNldCcpLm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xuICAgICAgICBwbHVnaW4uc2V0dGluZ3MudXNlZExpbmtzLnB1c2gobmV3IFVzZWRMaW5rcygpKTtcbiAgICAgICAgYXdhaXQgdGhpcy5zYXZlRGF0YSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBhZGRCdXR0b24uaW5mb0VsLnJlbW92ZSgpO1xuICAgIGFkZEJ1dHRvbi5zZXR0aW5nRWwuc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJztcbiAgfVxuXG4gIGFzeW5jIHNhdmVEYXRhKG9wdGlvbnMgPSB7IHJlZnJlc2hVSTogdHJ1ZSB9KSB7XG4gICAgY29uc3QgcGx1Z2luOiBMaW5rSW5kZXhlciA9ICh0aGlzIGFzIGFueSkucGx1Z2luO1xuICAgIGF3YWl0IHBsdWdpbi5zYXZlRGF0YShwbHVnaW4uc2V0dGluZ3MpO1xuICAgIHBsdWdpbi5yZWxvYWRTZXR0aW5ncygpO1xuICAgIGlmIChvcHRpb25zLnJlZnJlc2hVSSkgdGhpcy5kaXNwbGF5KCk7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBwYXRoRXF1YWwoYTogc3RyaW5nLCBiOiBzdHJpbmcpIHtcbiAgaWYgKGEgPT09IGIpIHJldHVybiB0cnVlXG5cbiAgcmV0dXJuIHJlbW92ZURvdHMobm9ybWFsaXplUGF0aChhKSkgPT09IHJlbW92ZURvdHMobm9ybWFsaXplUGF0aChiKSlcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRG90cyh2YWx1ZTogc3RyaW5nKSB7XG4gIHJldHVybiB2YWx1ZS5yZXBsYWNlKC9cXFxcL2csICcvJylcbiAgICAucmVwbGFjZSgvXlxcLlxcLy8sICcnKVxuICAgIC5yZXBsYWNlKC9cXC9cXC5cXC8vLCAnLycpXG59XG4iXSwibmFtZXMiOlsicGF0aCIsInJlcXVpcmUkJDAiLCJQT1NJWF9SRUdFWF9TT1VSQ0UiLCJwYXJzZSIsInNjYW4iLCJkZWVwbWVyZ2UiLCJOb3RpY2UiLCJub3JtYWxpemVQYXRoIiwicGljb21hdGNoIiwiZ2V0TGlua3BhdGgiLCJQbHVnaW4iLCJTZXR0aW5nIiwiUGx1Z2luU2V0dGluZ1RhYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6Qixn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RyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ2xELE1BQU0sTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLE1BQU0sTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDdkIsUUFBUSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUMsRUFBRTtBQUN0QyxVQUFVLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3RDLFVBQVUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDckMsU0FBUyxNQUFNO0FBQ2YsVUFBVSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNwQyxTQUFTO0FBQ1QsUUFBUSxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDM0IsUUFBUSxLQUFLLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDNUMsT0FBTztBQUNQLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDckMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzFCLE9BQU87QUFDUCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDcEIsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLFNBQVMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUU7QUFDbkQsTUFBTSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMvQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFD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TUFBTSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO0FBQzdDLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkMsTUFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztBQUMxQixNQUFNLE1BQU0sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDeEIsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUN2QixNQUFNLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoRCxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFDcEMsUUFBUSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDdEMsT0FBTztBQUNQLE1BQU0sU0FBUztBQUNmLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7QUFDdkIsTUFBTSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsTUFBTSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDckMsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7QUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxFQUFFO0FBQzlELFFBQVEsTUFBTSxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDM0QsT0FBTztBQUNQO0FBQ0EsTUFBTSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNwRCxNQUFNLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDMUQsUUFBUSxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDckMsUUFBUSxTQUFTO0FBQ2pCLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDekUsTUFBTSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUN2QixNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDakUsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxFQUFFO0FBQ3JFLFVBQVUsTUFBTSxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsU0FBUztBQUNUO0FBQ0EsUUFBUSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM3QixPQUFPLE1BQU07QUFDYixRQUFRLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QixPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN2QyxNQUFNLFNBQVM7QUFDZixLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUN2QixNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ25HLFFBQVEsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzVELFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsS0FBSyxDQUFDLEVBQUU7QUFDaEMsUUFBUSxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxFQUFFO0FBQzFDLFVBQVUsTUFBTSxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsU0FBUztBQUNUO0FBQ0EsUUFBUSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDNUQsUUFBUSxTQUFTO0FBQ2pCLE9BQU87QUFDUDtBQUNBLE1BQU0sU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzVCO0FBQ0EsTUFBTSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QyxNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDbkYsUUFBUSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM1QixPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0FBQzFCLE1BQU0sTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN4QjtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRTtBQUM1RSxRQUFRLFNBQVM7QUFDakIsT0FBTztBQUNQO0FBQ0EsTUFBTSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxNQUFNLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvRDtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQUksSUFBSSxDQUFDLGVBQWUsS0FBSyxJQUFJLEVBQUU7QUFDekMsUUFBUSxLQUFLLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQztBQUNoQyxRQUFRLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBQzdCLFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU0sSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUQsTUFBTSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDakMsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtBQUNoRCxNQUFNLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQjtBQUNBLE1BQU0sTUFBTSxJQUFJLEdBQUc7QUFDbkIsUUFBUSxJQUFJLEVBQUUsT0FBTztBQUNyQixRQUFRLEtBQUs7QUFDYixRQUFRLE1BQU0sRUFBRSxHQUFHO0FBQ25CLFFBQVEsV0FBVyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTTtBQUN4QyxRQUFRLFdBQVcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU07QUFDeEMsT0FBTyxDQUFDO0FBQ1I7QUFDQSxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakIsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7QUFDdkIsTUFBTSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM5QztBQUNBLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtBQUMzQyxRQUFRLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUN2QjtBQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtBQUMvQixRQUFRLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNuQyxRQUFRLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztBQUN6QjtBQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xELFVBQVUsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtBQUN2QyxZQUFZLE1BQU07QUFDbEIsV0FBVztBQUNYLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtBQUN0QyxZQUFZLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQSxRQUFRLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzFDLFFBQVEsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDL0IsT0FBTztBQUNQO0FBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ3ZELFFBQVEsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3RCxRQUFRLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMzRCxRQUFRLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0MsUUFBUSxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUMvQixRQUFRLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO0FBQzNCLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDOUIsVUFBVSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDN0MsTUFBTSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDMUIsTUFBTSxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDbkIsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUN2QixNQUFNLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDL0IsUUFBUSxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNuRCxPQUFPO0FBQ1AsTUFBTSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDcEMsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUN2QixNQUFNLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUN6QjtBQUNBLE1BQU0sTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUMsTUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7QUFDekQsUUFBUSxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUMzQixRQUFRLE1BQU0sR0FBRyxHQUFHLENBQUM7QUFDckIsT0FBTztBQUNQO0FBQ0EsTUFBTSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sU0FBUztBQUNmLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtBQUNsRSxRQUFRLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDdEMsUUFBUSxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUM1QixRQUFRLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQzFCLFFBQVEsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLFFBQVEsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNuQixRQUFRLFNBQVM7QUFDakIsT0FBTztBQUNQO0FBQ0EsTUFBTSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUM1RCxNQUFNLFNBQVM7QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO0FBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtBQUNuRCxRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7QUFDMUQsUUFBUSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNoRCxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0FBQzNCLFFBQVEsSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7QUFDN0IsUUFBUSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztBQUM1QixRQUFRLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQzFCLFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQy9GLFFBQVEsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDM0QsUUFBUSxTQUFTO0FBQ2pCLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFDeEQsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUN2QixNQUFNLE1BQU0sT0FBTyxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQztBQUNqRCxNQUFNLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLElBQUksSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7QUFDcEYsUUFBUSxXQUFXLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQ3pDLFFBQVEsTUFBTSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDNUIsUUFBUSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0I7QUFDQSxRQUFRLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxFQUFFO0FBQzFELFVBQVUsTUFBTSxJQUFJLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0FBQ3JGLFNBQVM7QUFDVDtBQUNBLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDakgsVUFBVSxNQUFNLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNoQyxTQUFTO0FBQ1Q7QUFDQSxRQUFRLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDOUMsUUFBUSxTQUFTO0FBQ2pCLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO0FBQy9FLFFBQVEsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDN0QsUUFBUSxTQUFTO0FBQ2pCLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDcEQsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUN2QixNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLElBQUksSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO0FBQ3JELFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN4RCxVQUFVLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdkMsVUFBVSxTQUFTO0FBQ25CLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7QUFDdkQsUUFBUSxNQUFNLEVBQUUsQ0FBQztBQUNqQixRQUFRLFNBQVM7QUFDakIsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7QUFDdkIsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLElBQUksRUFBRSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO0FBQ3hFLFFBQVEsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNuQyxRQUFRLFNBQVM7QUFDakIsT0FBTztBQUNQO0FBQ0EsTUFBTSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxLQUFLLElBQUksQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUFFO0FBQ2hFLFFBQVEsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDNUQsUUFBUSxTQUFTO0FBQ2pCLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ3JILFFBQVEsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ3RDLFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7QUFDbEQsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUN2QixNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLElBQUksSUFBSSxFQUFFLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7QUFDeEUsUUFBUSxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQy9ELFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUNwQyxNQUFNLFNBQVM7QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFO0FBQ3ZCLE1BQU0sSUFBSSxLQUFLLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLEVBQUU7QUFDMUMsUUFBUSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM3QixPQUFPO0FBQ1A7QUFDQSxNQUFNLE1BQU0sS0FBSyxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQzlELE1BQU0sSUFBSSxLQUFLLEVBQUU7QUFDakIsUUFBUSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLFFBQVEsS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3ZDLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sU0FBUztBQUNmLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO0FBQ2xFLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7QUFDekIsTUFBTSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUN2QixNQUFNLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0FBQzFCLE1BQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDekIsTUFBTSxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztBQUM3QixNQUFNLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzVCLE1BQU0sT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JCLE1BQU0sU0FBUztBQUNmLEtBQUs7QUFDTDtBQUNBLElBQUksSUFBSSxJQUFJLEdBQUcsU0FBUyxFQUFFLENBQUM7QUFDM0IsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDekQsTUFBTSxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sU0FBUztBQUNmLEtBQUs7QUFDTDtBQUNBLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtBQUM5QixNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7QUFDcEMsUUFBUSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsUUFBUSxTQUFTO0FBQ2pCLE9BQU87QUFDUDtBQUNBLE1BQU0sTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUM5QixNQUFNLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDaEMsTUFBTSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQztBQUNyRSxNQUFNLE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsQ0FBQyxDQUFDO0FBQ3pGO0FBQ0EsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtBQUM1RSxRQUFRLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ2xELFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQSxNQUFNLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUM7QUFDN0YsTUFBTSxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUM7QUFDN0YsTUFBTSxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ3hFLFFBQVEsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbEQsUUFBUSxTQUFTO0FBQ2pCLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTtBQUN6QyxRQUFRLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdDLFFBQVEsSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUNwQyxVQUFVLE1BQU07QUFDaEIsU0FBUztBQUNULFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0IsUUFBUSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzFCLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLEtBQUssSUFBSSxHQUFHLEVBQUUsRUFBRTtBQUN6QyxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0FBQy9CLFFBQVEsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUM7QUFDNUIsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxRQUFRLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUNuQyxRQUFRLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzlCLFFBQVEsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsRUFBRSxFQUFFO0FBQ3RGLFFBQVEsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNuRixRQUFRLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDNUM7QUFDQSxRQUFRLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0FBQy9CLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDMUUsUUFBUSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztBQUM1QixRQUFRLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzlCLFFBQVEsS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDbkQsUUFBUSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkIsUUFBUSxTQUFTO0FBQ2pCLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtBQUNsRixRQUFRLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ25EO0FBQ0EsUUFBUSxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25GLFFBQVEsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUM1QztBQUNBLFFBQVEsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7QUFDL0IsUUFBUSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsRixRQUFRLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0FBQzVCO0FBQ0EsUUFBUSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUNuRCxRQUFRLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzlCO0FBQ0EsUUFBUSxPQUFPLENBQUMsS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFDbkM7QUFDQSxRQUFRLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4RCxRQUFRLFNBQVM7QUFDakIsT0FBTztBQUNQO0FBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7QUFDbkQsUUFBUSxJQUFJLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztBQUMvQixRQUFRLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDO0FBQzVCLFFBQVEsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRixRQUFRLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUNuQyxRQUFRLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzlCLFFBQVEsT0FBTyxDQUFDLEtBQUssR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQ25DLFFBQVEsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3hELFFBQVEsU0FBUztBQUNqQixPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hFO0FBQ0E7QUFDQSxNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDO0FBQzdCLE1BQU0sSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsTUFBTSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztBQUMxQjtBQUNBO0FBQ0EsTUFBTSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDbEMsTUFBTSxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUM1QixNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixNQUFNLFNBQVM7QUFDZixLQUFLO0FBQ0w7QUFDQSxJQUFJLE1BQU0sS0FBSyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ3hEO0FBQ0EsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQzVCLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0IsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO0FBQ3hELFFBQVEsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUM1QyxPQUFPO0FBQ1AsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEIsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO0FBQzNGLE1BQU0sS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0IsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEIsTUFBTSxTQUFTO0FBQ2YsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtBQUNyRixNQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7QUFDL0IsUUFBUSxLQUFLLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQztBQUNyQyxRQUFRLElBQUksQ0FBQyxNQUFNLElBQUksWUFBWSxDQUFDO0FBQ3BDO0FBQ0EsT0FBTyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLEVBQUU7QUFDcEMsUUFBUSxLQUFLLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQztBQUN0QyxRQUFRLElBQUksQ0FBQyxNQUFNLElBQUksYUFBYSxDQUFDO0FBQ3JDO0FBQ0EsT0FBTyxNQUFNO0FBQ2IsUUFBUSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQztBQUM5QixRQUFRLElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDO0FBQzdCLE9BQU87QUFDUDtBQUNBLE1BQU0sSUFBSSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUU7QUFDMUIsUUFBUSxLQUFLLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQztBQUNqQyxRQUFRLElBQUksQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDO0FBQ2hDLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNoQixHQUFHO0FBQ0g7QUFDQSxFQUFFLE9BQU8sS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7QUFDN0IsSUFBSSxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxFQUFFLE1BQU0sSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDdkQsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDMUIsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQzNCLElBQUksSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRSxNQUFNLElBQUksV0FBVyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN6RixJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZELElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3hCLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUMzQixJQUFJLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUUsTUFBTSxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekYsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN2RCxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsRUFBRTtBQUN4RixJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDMUUsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFLElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUU7QUFDaEMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUN0QjtBQUNBLElBQUksS0FBSyxNQUFNLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO0FBQ3RDLE1BQU0sS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDeEU7QUFDQSxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUN4QixRQUFRLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNyQyxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDLENBQUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxLQUFLO0FBQ3RDLEVBQUUsTUFBTSxJQUFJLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQzlCLEVBQUUsTUFBTSxHQUFHLEdBQUcsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQ3JHLEVBQUUsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUMzQixFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsRUFBRTtBQUNqQixJQUFJLE1BQU0sSUFBSSxXQUFXLENBQUMsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxRixHQUFHO0FBQ0g7QUFDQSxFQUFFLEtBQUssR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ3ZDLEVBQUUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QztBQUNBO0FBQ0EsRUFBRSxNQUFNO0FBQ1IsSUFBSSxXQUFXO0FBQ2YsSUFBSSxhQUFhO0FBQ2pCLElBQUksUUFBUTtBQUNaLElBQUksVUFBVTtBQUNkLElBQUksTUFBTTtBQUNWLElBQUksT0FBTztBQUNYLElBQUksYUFBYTtBQUNqQixJQUFJLElBQUk7QUFDUixJQUFJLFlBQVk7QUFDaEIsR0FBRyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakM7QUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUM1QyxFQUFFLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsYUFBYSxHQUFHLE1BQU0sQ0FBQztBQUNyRCxFQUFFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUMzQyxFQUFFLE1BQU0sS0FBSyxHQUFHLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDL0MsRUFBRSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQy9DO0FBQ0EsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDcEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLEdBQUc7QUFDSDtBQUNBLEVBQUUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEtBQUs7QUFDN0IsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFLE9BQU8sSUFBSSxDQUFDO0FBQzlDLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBVSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxRixHQUFHLENBQUM7QUFDSjtBQUNBLEVBQUUsTUFBTSxNQUFNLEdBQUcsR0FBRyxJQUFJO0FBQ3hCLElBQUksUUFBUSxHQUFHO0FBQ2YsTUFBTSxLQUFLLEdBQUc7QUFDZCxRQUFRLE9BQU8sQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDNUM7QUFDQSxNQUFNLEtBQUssSUFBSTtBQUNmLFFBQVEsT0FBTyxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNsRDtBQUNBLE1BQU0sS0FBSyxLQUFLO0FBQ2hCLFFBQVEsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNqRTtBQUNBLE1BQU0sS0FBSyxLQUFLO0FBQ2hCLFFBQVEsT0FBTyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM5RTtBQUNBLE1BQU0sS0FBSyxJQUFJO0FBQ2YsUUFBUSxPQUFPLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEM7QUFDQSxNQUFNLEtBQUssTUFBTTtBQUNqQixRQUFRLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdGO0FBQ0EsTUFBTSxLQUFLLFFBQVE7QUFDbkIsUUFBUSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDLEVBQUUsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNsSDtBQUNBLE1BQU0sS0FBSyxPQUFPO0FBQ2xCLFFBQVEsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDaEc7QUFDQSxNQUFNLFNBQVM7QUFDZixRQUFRLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqRCxRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTztBQUMzQjtBQUNBLFFBQVEsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hDLFFBQVEsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPO0FBQzVCO0FBQ0EsUUFBUSxPQUFPLE1BQU0sR0FBRyxXQUFXLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9DLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRyxDQUFDO0FBQ0o7QUFDQSxFQUFFLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2xELEVBQUUsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlCO0FBQ0EsRUFBRSxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLElBQUksRUFBRTtBQUM3QyxJQUFJLE1BQU0sSUFBSSxDQUFDLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBQ0Y7QUFDQSxXQUFjLEdBQUcsS0FBSzs7QUM5aUN0QixNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxXQUFXLEdBQUcsS0FBSyxLQUFLO0FBQzFELEVBQUUsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzNCLElBQUksTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUMxRSxJQUFJLE1BQU0sWUFBWSxHQUFHLEdBQUcsSUFBSTtBQUNoQyxNQUFNLEtBQUssTUFBTSxPQUFPLElBQUksR0FBRyxFQUFFO0FBQ2pDLFFBQVEsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLFFBQVEsSUFBSSxLQUFLLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDaEMsT0FBTztBQUNQLE1BQU0sT0FBTyxLQUFLLENBQUM7QUFDbkIsS0FBSyxDQUFDO0FBQ04sSUFBSSxPQUFPLFlBQVksQ0FBQztBQUN4QixHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDOUQ7QUFDQSxFQUFFLElBQUksSUFBSSxLQUFLLEVBQUUsS0FBSyxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUM3RCxJQUFJLE1BQU0sSUFBSSxTQUFTLENBQUMsMkNBQTJDLENBQUMsQ0FBQztBQUNyRSxHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sSUFBSSxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7QUFDN0IsRUFBRSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pDLEVBQUUsTUFBTSxLQUFLLEdBQUcsT0FBTztBQUN2QixNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztBQUN4QyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkQ7QUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDNUIsRUFBRSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDckI7QUFDQSxFQUFFLElBQUksU0FBUyxHQUFHLE1BQU0sS0FBSyxDQUFDO0FBQzlCLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ25CLElBQUksTUFBTSxVQUFVLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0FBQ25GLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNoRSxHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBSyxFQUFFLFlBQVksR0FBRyxLQUFLLEtBQUs7QUFDbkQsSUFBSSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7QUFDOUYsSUFBSSxNQUFNLE1BQU0sR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUNoRjtBQUNBLElBQUksSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO0FBQzdDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QixLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssRUFBRTtBQUMzQixNQUFNLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQzdCLE1BQU0sT0FBTyxZQUFZLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUMzQyxLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQzFCLE1BQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssVUFBVSxFQUFFO0FBQy9DLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5QixPQUFPO0FBQ1AsTUFBTSxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUM3QixNQUFNLE9BQU8sWUFBWSxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDM0MsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxVQUFVLEVBQUU7QUFDNUMsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLEtBQUs7QUFDTCxJQUFJLE9BQU8sWUFBWSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDeEMsR0FBRyxDQUFDO0FBQ0o7QUFDQSxFQUFFLElBQUksV0FBVyxFQUFFO0FBQ25CLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDMUIsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDLENBQUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLO0FBQ2xFLEVBQUUsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDakMsSUFBSSxNQUFNLElBQUksU0FBUyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDekQsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUU7QUFDcEIsSUFBSSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7QUFDMUMsR0FBRztBQUNIO0FBQ0EsRUFBRSxNQUFNLElBQUksR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzdCLEVBQUUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sS0FBSyxLQUFLLEdBQUcsS0FBSyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN0RSxFQUFFLElBQUksS0FBSyxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUM7QUFDN0IsRUFBRSxJQUFJLE1BQU0sR0FBRyxDQUFDLEtBQUssSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUN6RDtBQUNBLEVBQUUsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQzVDLElBQUksS0FBSyxHQUFHLE1BQU0sS0FBSyxJQUFJLENBQUM7QUFDNUIsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDaEQsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO0FBQzNELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDaEUsS0FBSyxNQUFNO0FBQ1gsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqQyxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDcEQsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLO0FBQ2xGLEVBQUUsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFZLE1BQU0sR0FBRyxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDaEYsRUFBRSxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUNGLHdCQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxLQUFLLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEtBQUs7QUFDeEMsRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ25GLEVBQUUsT0FBT0csT0FBSyxDQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUMsQ0FBQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEtBQUtDLE1BQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxDQUFDLFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSxHQUFHLEtBQUssRUFBRSxXQUFXLEdBQUcsS0FBSyxLQUFLO0FBQ3RGLEVBQUUsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFO0FBQzdCLElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ3pCLEdBQUc7QUFDSDtBQUNBLEVBQUUsTUFBTSxJQUFJLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztBQUM3QixFQUFFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUMzQyxFQUFFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUMxQztBQUNBLEVBQUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUN6RCxFQUFFLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO0FBQ3pDLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQyxHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELEVBQUUsSUFBSSxXQUFXLEtBQUssSUFBSSxFQUFFO0FBQzVCLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDekIsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQztBQUNGO0FBQ0EsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxHQUFHLEtBQUssRUFBRSxXQUFXLEdBQUcsS0FBSyxLQUFLO0FBQ2xGLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDM0MsSUFBSSxNQUFNLElBQUksU0FBUyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDdkQsR0FBRztBQUNIO0FBQ0EsRUFBRSxNQUFNLElBQUksR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQzdCLEVBQUUsSUFBSSxNQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUNuRCxFQUFFLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNsQixFQUFFLElBQUksTUFBTSxDQUFDO0FBQ2I7QUFDQSxFQUFFLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5QixJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xDLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtBQUMxRSxJQUFJLE1BQU0sR0FBR0QsT0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDN0MsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFDNUIsSUFBSSxNQUFNLEdBQUdBLE9BQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDbkMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELEdBQUcsTUFBTTtBQUNULElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDM0IsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDekUsQ0FBQyxDQUFDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLEtBQUs7QUFDekMsRUFBRSxJQUFJO0FBQ04sSUFBSSxNQUFNLElBQUksR0FBRyxPQUFPLElBQUksRUFBRSxDQUFDO0FBQy9CLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNoQixJQUFJLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxDQUFDO0FBQ3JELElBQUksT0FBTyxJQUFJLENBQUM7QUFDaEIsR0FBRztBQUNILENBQUMsQ0FBQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjLEdBQUcsU0FBUzs7QUNoVjFCLGVBQWMsR0FBR0YsV0FBMEI7OztJQ09GLCtCQUFNO0lBQS9DOztLQXFHQztJQWhHQyw0QkFBTSxHQUFOLGVBQVc7SUFFTCw0QkFBTSxHQUFaOzs7Ozs7OzRCQUN5QixxQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUE7O3dCQUF0QyxjQUFjLEdBQUcsU0FBcUI7d0JBQzVDLElBQUksY0FBYyxFQUFFOzRCQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHSSxHQUFTLENBQUMsSUFBSSxtQkFBbUIsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzRCQUNyRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7NEJBQzdCLE1BQUEsY0FBYyxDQUFDLFNBQVMsMENBQUUsT0FBTyxDQUFDLFVBQUMsQ0FBWTtnQ0FDN0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDQSxHQUFTLENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBOzZCQUM1RCxFQUFFO3lCQUNKOzZCQUFNOzRCQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO3lCQUMzQzt3QkFDRCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7d0JBRXRCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7O0tBRS9EO0lBRUssOEJBQVEsR0FBZDs7Ozs0QkFDRSxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQTs7d0JBQWxDLFNBQWtDLENBQUM7Ozs7O0tBQ3BDO0lBRUQsb0NBQWMsR0FBZDtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBWTtZQUMzQyxLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsS0FBSSxDQUFDLFVBQVUsQ0FBQztnQkFDZCxFQUFFLEVBQUUsNkJBQTJCLENBQUMsQ0FBQyxJQUFNO2dCQUN2QyxJQUFJLEVBQUUsa0JBQWdCLENBQUMsQ0FBQyxJQUFNO2dCQUM5QixRQUFRLEVBQUU7O2dDQUFZLHFCQUFNLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUE7Z0NBQXRGLHNCQUFBLFNBQXNGLEVBQUE7O3lCQUFBO2FBQzdHLENBQUMsQ0FBQztTQUNKLENBQUMsQ0FBQztLQUNKO0lBRUQsdUNBQWlCLEdBQWpCO1FBQUEsaUJBTUM7O1FBSkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLEVBQUUsR0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFTOztZQUVoSCxLQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDcEMsQ0FBQyxDQUFDO0tBQ0o7SUFFSywrQ0FBeUIsR0FBL0IsVUFBZ0MsTUFBaUI7Ozs7Ozs7d0JBQy9DLElBQUksQ0FBQyxNQUFNLEVBQUU7NEJBQ1gsc0JBQU8sSUFBSUMsZUFBTSxDQUFJLE1BQU0sNENBQXlDLENBQUMsRUFBQzt5QkFDdkU7d0JBQ0ssV0FBVyxHQUE4QixFQUFFLENBQUM7d0JBRTVDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3dCQUNoRCxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQzs0QkFDZCxJQUFJLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxvQkFBb0IsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLENBQUM7Z0NBQUUsT0FBTzs0QkFDckYsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7NEJBQ3BGLElBQUksTUFBTSxDQUFDLGFBQWEsRUFBRTtnQ0FDeEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUE7NkJBQ3RGO3lCQUNGLENBQUMsQ0FBQzt3QkFDRyxXQUFXLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFBLENBQUMsQ0FBQzt3QkFDbEYsU0FBUyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUNwRCxPQUFPLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQU0sR0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3dCQUN2RSxxQkFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDQyxzQkFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBQTs7d0JBQTlFLEtBQUssR0FBRyxTQUFzRTt3QkFDcEYsSUFBSSxLQUFLLEVBQUU7NEJBQ0gsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDQSxzQkFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzRCQUMzRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDQSxzQkFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQzt5QkFDbkU7NkJBQU07NEJBQ0wsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7eUJBQzdDOzs7OztLQUNGO0lBRUQsZ0NBQVUsR0FBVixVQUFXLENBQVEsRUFBRSxnQkFBMEIsRUFBRSxZQUF1QjtRQUN0RSxJQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBQ2pGLElBQU0sa0JBQWtCLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQSxDQUFDLENBQUM7UUFDcEYsSUFBTSxjQUFjLEdBQUdDLFdBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMvRCxPQUFPLGtCQUFrQixJQUFJLGtCQUFrQixJQUFJLGNBQWMsQ0FBQztLQUNuRTtJQUVELCtCQUFTLEdBQVQsVUFBVSxXQUFzQyxFQUFFLENBQVEsRUFBRSxLQUF1QixFQUFFLE1BQWlCO1FBQXRHLGlCQWtCQztRQWpCQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsT0FBTyxDQUFDLFVBQUMsQ0FBQztZQUNmLElBQU0sSUFBSSxHQUFHQyxvQkFBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdFLElBQUksVUFBVSxLQUFLLE1BQU0sQ0FBQyxlQUFlLElBQUksS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFO2dCQUMzSCxPQUFPO2FBQ1I7WUFDRCxJQUFNLE1BQU0sR0FBRyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkQsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3ZCLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNMLElBQU0sT0FBTyxHQUFHLFVBQVUsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN6RyxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUc7b0JBQ3BCLEtBQUssRUFBRSxDQUFDO29CQUNSLElBQUksRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLE9BQUssT0FBTyxPQUFJLEdBQUcsT0FBTztpQkFDdEQsQ0FBQzthQUNIO1NBQ0YsRUFBRTtLQUNKO0lBQ0gsa0JBQUM7QUFBRCxDQXJHQSxDQUF5Q0MsZUFBTSxHQXFHOUM7QUFFRDtJQVlFO1FBVEEscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLHVCQUFrQixHQUFhLEVBQUUsQ0FBQztRQUNsQyxtQkFBYyxHQUFhLEVBQUUsQ0FBQztRQUM5Qix5QkFBb0IsR0FBYSxFQUFFLENBQUM7UUFDcEMscUJBQWdCLEdBQWEsRUFBRSxDQUFDO1FBRzlCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWUsSUFBSSxDQUFDLElBQUksUUFBSyxDQUFDO0tBQzNDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLElBQUE7QUFFRDtJQUFBO1FBQ0UsY0FBUyxHQUFnQixFQUFFLENBQUM7S0FDN0I7SUFBRCwwQkFBQztBQUFELENBQUMsSUFBQTtBQUlELFNBQVMsZUFBZSxDQUFDLE9BQWlCLEVBQUUsSUFBWTtJQUN0RCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksR0FBQSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVEO0lBQW9DLHlDQUFnQjtJQUFwRDs7S0FpS0M7SUFoS0MsdUNBQU8sR0FBUDtRQUFBLGlCQXdKQztRQXZKTyxJQUFBLFdBQVcsR0FBSyxJQUFJLFlBQVQsQ0FBVTtRQUMzQixJQUFNLE1BQU0sR0FBaUIsSUFBWSxDQUFDLE1BQU0sQ0FBQztRQUVqRCxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFcEIsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztRQUVqRCxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ3ZDLElBQUlDLGdCQUFPLENBQUMsV0FBVyxDQUFDO2lCQUNyQixPQUFPLENBQUMsYUFBYSxDQUFDO2lCQUN0QixPQUFPLENBQUMsZ0VBQWdFLENBQUM7aUJBQ3pFLE9BQU8sQ0FBQyxVQUFDLElBQUk7Z0JBQ1osT0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7cUJBQzdCLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUMzQixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztxQkFDckIsUUFBUSxDQUFDLFVBQU8sS0FBYTs7OztnQ0FDNUIsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0NBQ3BCLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQTs7Z0NBQXpDLFNBQXlDLENBQUM7Ozs7cUJBQzNDLENBQUM7YUFBQSxDQUNMLENBQUM7WUFDSixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQztpQkFDckIsT0FBTyxDQUFDLGdCQUFnQixDQUFDO2lCQUN6QixPQUFPLENBQUMsZ0ZBQWdGLENBQUM7aUJBQ3pGLE9BQU8sQ0FBQyxVQUFDLElBQUk7Z0JBQ1osT0FBQSxJQUFJO3FCQUNELGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO3FCQUMzQixRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztxQkFDckIsUUFBUSxDQUFDLFVBQU8sS0FBSzs7OztnQ0FDcEIsTUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0NBQ3BCLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQTs7Z0NBQXpDLFNBQXlDLENBQUM7Ozs7cUJBQzNDLENBQUM7YUFBQSxDQUNMLENBQUM7WUFFSixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQztpQkFDckIsT0FBTyxDQUFDLGdCQUFnQixDQUFDO2lCQUN6QixPQUFPLENBQUMsOEZBQThGLENBQUM7aUJBQ3ZHLFNBQVMsQ0FBQyxVQUFDLEtBQUs7Z0JBQ2YsT0FBQSxLQUFLO3FCQUNGLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO3FCQUM5QixRQUFRLENBQUMsVUFBTyxLQUFLOzs7O2dDQUNwQixNQUFNLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztnQ0FDN0IscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFBOztnQ0FBekMsU0FBeUMsQ0FBQzs7OztxQkFDM0MsQ0FBQzthQUFBLENBQ0wsQ0FBQztZQUVKLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2lCQUNyQixPQUFPLENBQUMsd0JBQXdCLENBQUM7aUJBQ2pDLE9BQU8sQ0FBQywwRUFBMEUsQ0FBQztpQkFDbkYsU0FBUyxDQUFDLFVBQUMsS0FBSztnQkFDZixPQUFBLEtBQUs7cUJBQ0YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUM7cUJBQ2hDLFFBQVEsQ0FBQyxVQUFPLEtBQUs7Ozs7Z0NBQ3BCLE1BQU0sQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dDQUMvQixxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUE7O2dDQUF6QyxTQUF5QyxDQUFDOzs7O3FCQUMzQyxDQUFDO2FBQUEsQ0FDTCxDQUFDO1lBR0osSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7aUJBQ3JCLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQztpQkFDN0IsT0FBTyxDQUFDLHlGQUF5RixDQUFDO2lCQUNsRyxTQUFTLENBQUMsVUFBQyxLQUFLO2dCQUNmLE9BQUEsS0FBSztxQkFDRixRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO3FCQUNqQyxRQUFRLENBQUMsVUFBTyxLQUFLOzs7O2dDQUNwQixNQUFNLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO2dDQUNoQyxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUE7O2dDQUF6QyxTQUF5QyxDQUFDOzs7O3FCQUMzQyxDQUFDO2FBQUEsQ0FDTCxDQUFDO1lBRUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7aUJBQ3JCLE9BQU8sQ0FBQyxlQUFlLENBQUM7aUJBQ3hCLE9BQU8sQ0FBQyw4R0FBOEcsQ0FBQztpQkFDdkgsU0FBUyxDQUFDLFVBQUMsS0FBSztnQkFDZixPQUFBLEtBQUs7cUJBQ0YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7cUJBQzVCLFFBQVEsQ0FBQyxVQUFPLEtBQUs7Ozs7Z0NBQ3BCLE1BQU0sQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dDQUMzQixxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUE7O2dDQUF6QyxTQUF5QyxDQUFDOzs7O3FCQUMzQyxDQUFDO2FBQUEsQ0FDTCxDQUFDO1lBRUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7aUJBQ3JCLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQztpQkFDbkMsT0FBTyxDQUFDLDJEQUEyRCxDQUFDO2lCQUNwRSxXQUFXLENBQUMsVUFBQyxJQUFJO2dCQUNoQixPQUFBLElBQUk7cUJBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hELFFBQVEsQ0FBQyxVQUFPLEtBQUs7Ozs7Z0NBQ3BCLE1BQU0sQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBQSxDQUFDLENBQUM7Z0NBQ2pFLHFCQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQTs7Z0NBQXpDLFNBQXlDLENBQUM7Ozs7cUJBQzNDLENBQUM7YUFBQSxDQUNMLENBQUM7WUFFSixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQztpQkFDckIsT0FBTyxDQUFDLDBCQUEwQixDQUFDO2lCQUNuQyxPQUFPLENBQUMsOERBQThELENBQUM7aUJBQ3ZFLFdBQVcsQ0FBQyxVQUFDLElBQUk7Z0JBQ2hCLE9BQUEsSUFBSTtxQkFDRCxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDNUMsUUFBUSxDQUFDLFVBQU8sS0FBSzs7OztnQ0FDcEIsTUFBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztnQ0FDN0QscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFBOztnQ0FBekMsU0FBeUMsQ0FBQzs7OztxQkFDM0MsQ0FBQzthQUFBLENBQ0wsQ0FBQztZQUVKLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2lCQUNyQixPQUFPLENBQUMsd0JBQXdCLENBQUM7aUJBQ2pDLE9BQU8sQ0FBQywyREFBMkQsQ0FBQztpQkFDcEUsV0FBVyxDQUFDLFVBQUMsSUFBSTtnQkFDaEIsT0FBQSxJQUFJO3FCQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUM5QyxRQUFRLENBQUMsVUFBTyxLQUFLOzs7O2dDQUNwQixNQUFNLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUEsQ0FBQyxDQUFDO2dDQUMvRCxxQkFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUE7O2dDQUF6QyxTQUF5QyxDQUFDOzs7O3FCQUMzQyxDQUFDO2FBQUEsQ0FDTCxDQUFDO1lBRUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7aUJBQ3JCLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztpQkFDakMsT0FBTyxDQUFDLDhEQUE4RCxDQUFDO2lCQUN2RSxXQUFXLENBQUMsVUFBQyxJQUFJO2dCQUNoQixPQUFBLElBQUk7cUJBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUMxQyxRQUFRLENBQUMsVUFBTyxLQUFLOzs7O2dDQUNwQixNQUFNLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFBLENBQUMsQ0FBQztnQ0FDM0QscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFBOztnQ0FBekMsU0FBeUMsQ0FBQzs7OztxQkFDM0MsQ0FBQzthQUFBLENBQ0wsQ0FBQztZQUVKLElBQU0sWUFBWSxHQUFHLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztnQkFDNUQsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQzs7Ozs7Z0NBQzVDLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEdBQUEsQ0FBQyxDQUFDO3NDQUM3RSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUEsRUFBVix3QkFBVTtnQ0FDWixNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUMzQyxxQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUE7O2dDQUFyQixTQUFxQixDQUFDOzs7OztxQkFFekIsQ0FBQyxDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLDhCQUE4QixDQUFDO1NBQzVFLENBQUMsQ0FBQztRQUVILElBQU0sU0FBUyxHQUFHLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUMxRCxPQUFPLE1BQU0sQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDOzs7OzRCQUNoRCxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQyxDQUFDOzRCQUNoRCxxQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUE7OzRCQUFyQixTQUFxQixDQUFDOzs7O2lCQUN2QixDQUFDLENBQUM7U0FDSixDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7S0FDckQ7SUFFSyx3Q0FBUSxHQUFkLFVBQWUsT0FBNkI7UUFBN0Isd0JBQUEsRUFBQSxZQUFZLFNBQVMsRUFBRSxJQUFJLEVBQUU7Ozs7Ozt3QkFDcEMsTUFBTSxHQUFpQixJQUFZLENBQUMsTUFBTSxDQUFDO3dCQUNqRCxxQkFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQTs7d0JBQXRDLFNBQXNDLENBQUM7d0JBQ3ZDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQzt3QkFDeEIsSUFBSSxPQUFPLENBQUMsU0FBUzs0QkFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7O0tBQ3ZDO0lBQ0gsNEJBQUM7QUFBRCxDQWpLQSxDQUFvQ0MseUJBQWdCLEdBaUtuRDtBQUdELFNBQVMsU0FBUyxDQUFDLENBQVMsRUFBRSxDQUFTO0lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFBRSxPQUFPLElBQUksQ0FBQTtJQUV4QixPQUFPLFVBQVUsQ0FBQ0wsc0JBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQ0Esc0JBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3RFLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxLQUFhO0lBQy9CLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO1NBQzdCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1NBQ3BCLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUE7QUFDM0I7Ozs7In0=
