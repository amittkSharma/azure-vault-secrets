import { getUserInput } from './getUserInput';
import { getVaultSecrets } from './vaultSecrets';
import { log } from '../utils';
import { writeSecrets } from './writeSecrets';
import { UserInput } from '../types';

export const launchProcess = async () => {
  log.info(`Launching process for getting the secrets from azure vault`);
  const userInput: UserInput = await getUserInput();
  const secrets: { [key: string]: string } = await getVaultSecrets(userInput);
  writeSecrets(secrets, userInput.target);
};
