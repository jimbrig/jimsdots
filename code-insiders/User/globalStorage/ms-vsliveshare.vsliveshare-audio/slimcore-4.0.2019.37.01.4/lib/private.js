"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const slimcore = module.require('slimcore');
const native = module.require('../bin/slimcore.node');
module.exports = __assign({}, slimcore, { CanvasFrameSink: native.CanvasFrameSink, _createCanvasFrameSink: native._createCanvasFrameSink });
