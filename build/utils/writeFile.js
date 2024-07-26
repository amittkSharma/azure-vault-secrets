"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const write_yaml_file_1 = tslib_1.__importDefault(require("write-yaml-file"));
const logger_1 = require("./logger");
const writeFile = (fileName, content) => {
    try {
        const filePath = path.join(process.cwd(), fileName);
        (0, write_yaml_file_1.default)(filePath, content);
    }
    catch (error) {
        logger_1.log.error(`Failed to create the file, ${error.message}`);
    }
};
exports.writeFile = writeFile;
