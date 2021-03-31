"use strict";
const fs = require("fs");
const path = require("path");
function packageJson() {
    const packageJsonPath = path.join(__dirname, '../package.json');
    return JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
}
function getVersion() {
    return packageJson().version;
}
exports.getVersion = getVersion;
function getApiVersion() {
    return packageJson().apiVersion;
}
exports.getApiVersion = getApiVersion;
