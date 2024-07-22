import { UserInput } from '../types';
import { log } from '../utils';
import { getUserInput } from './getUserInput';
import { getVaultSecrets } from './vaultSecrets';
import { writeSecrets } from './writeSecrets';

export const launchProcess = async () => {
  log.info(`Launching process for getting the secrets from azure vault`);
  const userInput: UserInput = await getUserInput();
  const secrets: { [key: string]: string } = await getVaultSecrets(
    userInput.completeSourceFilePath,
    userInput.azVault,
    userInput.objectName,
  );
  writeSecrets(secrets, userInput.completeTargetFilePath);
};
