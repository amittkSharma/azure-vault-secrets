import { input } from '@inquirer/prompts';

import { join } from 'path';
import { SOURCE_FILENAME, TARGET_FILENAME, TOP_OBJECT_NAME } from '../constants';
import { UserInput } from '../types';
import { validateDir } from './validateDir';
import { isInputFileExists } from './validateInputFile';

export const getUserInput = async (): Promise<UserInput> => {
  const azVault = await input({
    message: 'Enter the vault name from where secrets will be fetched',
  });
  if (!azVault) {
    throw new Error(`"vaultName" can not be empty. It is a mandatory field`);
  }

  const source = await input({
    message: 'Enter the location of source file',
    default: '.',
  });

  const target = await input({
    message: 'Enter the location of target file',
    default: '.',
  });

  const objectName = await input({
    message: 'Please provide the name of top object',
    default: TOP_OBJECT_NAME,
  });

  const targetDirectory = join(process.cwd(), target);
  const sourceDirectory = join(process.cwd(), source);

  const sourceFilePath = join(sourceDirectory, SOURCE_FILENAME);
  const targetFilePath = join(targetDirectory, TARGET_FILENAME);

  validateDir(sourceDirectory, targetDirectory);
  isInputFileExists(sourceFilePath);

  return {
    azVault,
    objectName,
    completeSourceFilePath: sourceFilePath,
    completeTargetFilePath: targetFilePath,
  };
};
