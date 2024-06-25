"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompleteUserInput = void 0;
const prompts_1 = require("@inquirer/prompts");
const getCompleteUserInput = async () => {
    const azVault = await (0, prompts_1.input)({
        message: 'Enter the vault name from where secrets will be fetched',
        default: 'dcc-test-vault',
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
        default: '.',
    });
    return { azVault, source, target };
};
exports.getCompleteUserInput = getCompleteUserInput;
