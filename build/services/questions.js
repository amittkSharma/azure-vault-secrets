"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.askQuestion = void 0;
const prompts_1 = require("@inquirer/prompts");
const utils_1 = require("../utils");
const validateUserInput = (userInput) => {
    const { envName, source, target } = userInput;
    if (envName === '') {
        throw new Error(`Neither "envName" nor "vaultName" can be empty. Both are mandatory fields`);
    }
    if (source === '') {
        utils_1.log.warn(`Source location is not provided, default location will be utilized`);
        userInput.source = '.';
    }
    if (target === '') {
        utils_1.log.warn(`Target location is not provided, default location will be utilized`);
        userInput.target = '.';
    }
};
const askQuestion = async () => {
    const envName = await (0, prompts_1.input)({
        message: 'Enter the environment name',
    });
    const source = await (0, prompts_1.input)({
        message: 'Enter the location of source file',
    });
    const target = await (0, prompts_1.input)({
        message: 'Enter the location of target file',
    });
    const userInput = {
        envName,
        source,
        target,
    };
    validateUserInput(userInput);
    return userInput;
};
exports.askQuestion = askQuestion;
