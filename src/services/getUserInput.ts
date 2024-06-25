import { input } from '@inquirer/prompts';

import { UserInput } from '../types';
import { join } from 'path';

export const getUserInput = async (): Promise<UserInput> => {
  const azVault = await input({
    message: 'Enter the vault name from where secrets will be fetched',
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
    default: '.env',
  });

  return {
    azVault,
    completeSourceFilePath: join(process.cwd(), source),
    completeTargetFilePath: join(process.cwd(), target),
  };
};
