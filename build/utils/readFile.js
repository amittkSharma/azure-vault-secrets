"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readConfigFile = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs"));
const fs_1 = require("fs");
const path_1 = tslib_1.__importDefault(require("path"));
const yaml_1 = require("yaml");
const logger_1 = require("./logger");
const readConfigFile = (fileName) => {
    const filePath = path_1.default.join(process.cwd(), fileName);
    if (!fs.existsSync(filePath)) {
        return undefined;
    }
    try {
        const file = (0, fs_1.readFileSync)(filePath, 'utf-8');
        const content = (0, yaml_1.parse)(file);
        return content;
    }
    catch (error) {
        logger_1.log.error(`Failed to read the configuration file, ${error.message}`);
    }
};
exports.readConfigFile = readConfigFile;
