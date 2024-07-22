"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchProcess = void 0;
const utils_1 = require("../utils");
const getUserInput_1 = require("./getUserInput");
const vaultSecrets_1 = require("./vaultSecrets");
const writeSecrets_1 = require("./writeSecrets");
const launchProcess = async () => {
    utils_1.log.info(`Launching process for getting the secrets from azure vault`);
    const userInput = await (0, getUserInput_1.getUserInput)();
    const secrets = await (0, vaultSecrets_1.getVaultSecrets)(userInput.completeSourceFilePath, userInput.azVault, userInput.objectName);
    (0, writeSecrets_1.writeSecrets)(secrets, userInput.completeTargetFilePath);
};
exports.launchProcess = launchProcess;
