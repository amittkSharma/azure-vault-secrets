import { input } from '@inquirer/prompts';

import { UserInput } from '../types';

export const getUserInput = async (): Promise<UserInput> => {
  const azVault = await input({
    message: 'Enter the vault name from where secrets will be fetched',
    default: 'dcc-test-vault',
  });
  if (!azVault) {
    throw new Error(`"vaultName" can not be empty. It is a mandatory field`);
  }

  const source = await input({
    message: 'Enter the location of source file',
    default: 'values.yaml',
  });
  const target = await input({
    message: 'Enter the location of target file',
    default: '.',
  });

  return { azVault, source, target };
};
