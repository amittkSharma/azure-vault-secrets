"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInput = void 0;
const prompts_1 = require("@inquirer/prompts");
const path_1 = require("path");
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const validateDir_1 = require("./validateDir");
const validateInputFile_1 = require("./validateInputFile");
const getUserInput = async () => {
    const azVault = await (0, prompts_1.input)({
        message: 'Enter the vault name from where secrets will be fetched',
    });
    if (!azVault) {
        throw new Error(`"vaultName" can not be empty. It is a mandatory field`);
    }
    const source = await (0, prompts_1.input)({
        message: 'Enter the location of source file',
        default: '.',
    });
    const target = await (0, prompts_1.input)({
        message: 'Enter the location of target file',
        default: '.',
    });
    const objectName = await (0, prompts_1.input)({
        message: 'Please provide the name of top object',
        default: constants_1.TOP_OBJECT_NAME,
    });
    const targetDirectory = (0, path_1.join)(process.cwd(), target);
    const sourceDirectory = (0, path_1.join)(process.cwd(), source);
    const sourceFilePath = (0, path_1.join)(sourceDirectory, constants_1.SOURCE_FILENAME);
    const targetFilePath = (0, path_1.join)(targetDirectory, constants_1.TARGET_FILENAME);
    const confirmConfigFileCreation = await (0, prompts_1.confirm)({
        message: 'Do you want to save the configuration?',
        default: true,
    });
    (0, validateDir_1.validateDir)(sourceDirectory, targetDirectory);
    (0, validateInputFile_1.isInputFileExists)(sourceFilePath);
    const userInput = {
        azVault,
        objectName,
        completeSourceFilePath: sourceFilePath,
        completeTargetFilePath: targetFilePath,
    };
    if (confirmConfigFileCreation) {
        (0, utils_1.writeFile)(constants_1.CONFIGURATION_FILE_NAME, userInput);
    }
    else {
        utils_1.log.warn(`In the absence of configuration file, questions will be asked again!!!`);
    }
    return userInput;
};
exports.getUserInput = getUserInput;
