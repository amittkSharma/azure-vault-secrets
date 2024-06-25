"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInput = void 0;
const prompts_1 = require("@inquirer/prompts");
const path_1 = require("path");
const getUserInput = async () => {
    const azVault = await (0, prompts_1.input)({
        message: 'Enter the vault name from where secrets will be fetched',
    });
    if (!azVault) {
        throw new Error(`"vaultName" can not be empty. It is a mandatory field`);
    }
    const source = await (0, prompts_1.input)({
        message: 'Enter the location of source file',
        default: 'values.yaml',
    });
    const target = await (0, prompts_1.input)({
        message: 'Enter the location of target file',
        default: '.env',
    });
    return {
        azVault,
        completeSourceFilePath: (0, path_1.join)(process.cwd(), source),
        completeTargetFilePath: (0, path_1.join)(process.cwd(), target),
    };
};
exports.getUserInput = getUserInput;
