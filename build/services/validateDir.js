"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDir = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const validateDir = (sourceDirectory, targetDirectory) => {
    if (!fs.existsSync(sourceDirectory)) {
        throw new Error(`${sourceDirectory} directory does not exists`);
    }
    if (!fs.existsSync(targetDirectory)) {
        fs.mkdirSync(targetDirectory);
    }
};
exports.validateDir = validateDir;
