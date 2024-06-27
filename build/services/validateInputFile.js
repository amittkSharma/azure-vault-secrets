"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInputFileExists = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const isInputFileExists = (sourceFilePath) => {
    if (!fs.existsSync(sourceFilePath)) {
        throw new Error(`${sourceFilePath} file does not exists`);
    }
};
exports.isInputFileExists = isInputFileExists;
