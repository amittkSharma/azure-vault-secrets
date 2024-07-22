import { readFile } from 'fs/promises';
import { promisify } from 'util';
import { log } from '../utils';

import { exec as callbackExec } from 'child_process';
import { resolve } from 'path';
import { parse } from 'yaml';
import { SOURCE_FILENAME } from '../constants';

const exec = promisify(callbackExec);

export const getVaultSecrets = async (
  sourceFilePath: string,
  azVault: string,
  objectName: string,
) => {
  const file = await readFile(resolve(sourceFilePath), 'utf-8');
  const yamlFile = parse(file);

  const envVariables = yamlFile[objectName];
  const envVariableKeys = Object.keys(envVariables);

  /**
   * fetch all values
   */
  log.info(
    `start fetching all values from the provided ${SOURCE_FILENAME} file from ${azVault}...`,
  );
  const envFileEntries: { [key: string]: string } = {};
  for await (const envVariableKey of envVariableKeys) {
    const azureEnvKey = envVariables[envVariableKey];

    try {
      log.info(`Fetching value of ${azureEnvKey}...`);

      const { stdout, stderr } = await exec(
        `az keyvault secret show --name "${azureEnvKey}" --vault-name "${azVault}"`,
      );

      if (stderr) {
        log.error(`Could not create env variable due to: ${stderr}`);
      } else {
        const secretResponse = JSON.parse(stdout);
        envFileEntries[envVariableKey] = secretResponse.value;
      }
    } catch (error) {
      log.error(`Could not create env variable ${envVariableKey} due to ${error}`);
    }
  }

  return envFileEntries;
};
