import { input } from '@inquirer/prompts';
import { log } from '../utils';

interface UserInput {
  envName: string;
  vaultName: string;
  source: string;
  target: string;
}

const validateUserInput = (userInput: UserInput) => {
  const { envName, vaultName, source, target } = userInput;

  if (envName === '' || vaultName === '') {
    throw new Error(`Neither "envName" nor "vaultName" can be empty. Both are mandatory fields`);
  }
  if (source === '') {
    log.warn(`Source location is not provided, default location will be utilized`);
    userInput.source = '.';
  }
  if (target === '') {
    log.warn(`Target location is not provided, default location will be utilized`);
    userInput.target = '.';
  }
};

export const askQuestion = async (): Promise<UserInput> => {
  const envName = await input({
    message: 'Enter the environment name',
  });
  const vaultName = await input({
    message: 'Enter the vault name from where secrets will be fetched',
  });
  const source = await input({
    message: 'Enter the location of source file',
  });
  const target = await input({
    message: 'Enter the location of target file',
  });

  const userInput: UserInput = {
    envName,
    vaultName,
    source,
    target,
  };

  validateUserInput(userInput);

  return userInput;
};
