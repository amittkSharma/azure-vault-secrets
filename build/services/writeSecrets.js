"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSecrets = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const fs_1 = require("fs");
const readDotEnvFile = (filepath) => {
    if ((0, fs_1.existsSync)(filepath)) {
        let baseContent = (0, fs_1.readFileSync)(filepath, 'utf8');
        // if (baseContent.includes(HEADER)) {
        //   const start = baseContent.indexOf(HEADER);
        //   const end = baseContent.indexOf(FOOTER) + FOOTER.length || baseContent.length;
        //   baseContent = baseContent.slice(0, start) + baseContent.slice(end);
        // }
        return `${baseContent.trim()}\n`;
    }
    return '';
};
const writeSecrets = async (envFileEntries, target) => {
    const targetDirectory = (0, path_1.join)(process.cwd(), target || '.');
    const filepath = (0, path_1.join)(targetDirectory, '.env');
    const existingContent = readDotEnvFile(filepath);
    /**
     * create env file
     */
    if (Object.keys(envFileEntries).length > 0) {
        const content = Object.keys(envFileEntries)
            .map(key => `${key}=${envFileEntries[key]}`)
            .join('\n');
        await (0, promises_1.writeFile)(filepath, [existingContent, content].join('\n'));
        console.log('[INFO] Done! ✨\n.env file successfully created');
    }
};
exports.writeSecrets = writeSecrets;
