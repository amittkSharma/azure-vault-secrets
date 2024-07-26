"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSecrets = void 0;
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const utils_1 = require("../utils");
const readDotEnvFile = (filepath) => {
    if ((0, fs_1.existsSync)(filepath)) {
        const baseContent = (0, fs_1.readFileSync)(filepath, 'utf8');
        // if (baseContent.includes(HEADER)) {
        //   const start = baseContent.indexOf(HEADER);
        //   const end = baseContent.indexOf(FOOTER) + FOOTER.length || baseContent.length;
        //   baseContent = baseContent.slice(0, start) + baseContent.slice(end);
        // }
        return `${baseContent.trim()}\n`;
    }
    return '';
};
const writeSecrets = async (envFileEntries, filePath) => {
    const existingContent = readDotEnvFile(filePath);
    /**
     * create env file
     */
    if (Object.keys(envFileEntries).length > 0) {
        const content = Object.keys(envFileEntries)
            .map(key => `${key}=${envFileEntries[key]}`)
            .join('\n');
        await (0, promises_1.writeFile)(filePath, [existingContent, content].join('\n'));
        utils_1.log.info('Done! ✨\n.env file successfully created');
    }
};
exports.writeSecrets = writeSecrets;
