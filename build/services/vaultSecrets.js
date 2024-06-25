"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVaultSecrets = void 0;
const utils_1 = require("../utils");
const promises_1 = require("fs/promises");
const util_1 = require("util");
const yaml_1 = require("yaml");
const path_1 = require("path");
const child_process_1 = require("child_process");
const exec = (0, util_1.promisify)(child_process_1.exec);
const getVaultSecrets = async (sourceFilePath, azVault) => {
    const file = await (0, promises_1.readFile)((0, path_1.resolve)(sourceFilePath), 'utf-8');
    const yamlFile = (0, yaml_1.parse)(file);
    const envVariables = yamlFile;
    const envVariableKeys = Object.keys(envVariables);
    /**
     * fetch all values
     */
    utils_1.log.info(`start fetching all values from the provided values.yaml file from ${azVault}...`);
    const envFileEntries = {};
    for await (const envVariableKey of envVariableKeys) {
        const azureEnvKey = envVariables[envVariableKey];
        try {
            utils_1.log.info(`Fetching value of ${azureEnvKey}...`);
            const { stdout, stderr } = await exec(`az keyvault secret show --name "${azureEnvKey}" --vault-name "${azVault}"`);
            if (stderr) {
                utils_1.log.error(`Could not create env variable due to: ${stderr}`);
            }
            else {
                const secretResponse = JSON.parse(stdout);
                envFileEntries[envVariableKey] = secretResponse.value;
            }
        }
        catch (error) {
            utils_1.log.error(`Could not create env variable ${envVariableKey} due to ${error}`);
        }
    }
    return envFileEntries;
};
exports.getVaultSecrets = getVaultSecrets;
