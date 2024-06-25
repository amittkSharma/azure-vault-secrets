import { log } from '../utils';
import { readFile } from 'fs/promises';
import { promisify } from 'util';

import { parse } from 'yaml';
import { resolve, join } from 'path';
import { exec as callbackExec } from 'child_process';
import { UserInput } from '../types';

const exec = promisify(callbackExec);

export const getVaultSecrets = async (userInput: UserInput) => {
  const { source, azVault } = userInput;

  const valuesYamlPath = join(process.cwd(), source || 'values.yaml');

  const file = await readFile(resolve(process.cwd(), valuesYamlPath), 'utf-8');
  const yamlFile = parse(file);

  const envVariables = yamlFile;
  const envVariableKeys = Object.keys(envVariables);

  log.info(
    `envVariables: ${envVariables}, envVariableKeys:  ${JSON.stringify(envVariableKeys, null, 2)}`,
  );

  /**
   * fetch all values
   */
  console.log(
    `[INFO] start fetching all values from the provided values.yaml file from ${azVault}...`,
  );
  const envFileEntries: { [key: string]: string } = {};
  for await (const envVariableKey of envVariableKeys) {
    const azureEnvKey = envVariables[envVariableKey];

    try {
      console.log(`[INFO] fetching value of ${azureEnvKey}...`);
      const { stdout, stderr } = await exec(
        `az keyvault secret show --name "${azureEnvKey}" --vault-name "${azVault}"`,
      );
      if (stderr) {
        console.error('[ERROR] Could not create env variable due to:', stderr);
      } else {
        const secretResponse = JSON.parse(stdout);
        envFileEntries[envVariableKey] = secretResponse.value;
      }
    } catch (error) {
      console.error('[ERROR] Could not create env variable', envVariableKey, 'due to:', error);
    }
  }

  console.log(`envFileEntries: ${JSON.stringify(envFileEntries, null, 2)}`);
  return envFileEntries;
};
