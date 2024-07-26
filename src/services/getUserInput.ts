import { confirm, input } from '@inquirer/prompts';

import { join } from 'path';
import {
  CONFIGURATION_FILE_NAME,
  SOURCE_FILENAME,
  TARGET_FILENAME,
  TOP_OBJECT_NAME,
} from '../constants';
import { UserInput } from '../types';
import { log, writeFile } from '../utils';
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

  const confirmConfigFileCreation = await confirm({
    message: 'Do you want to save the configuration?',
    default: true,
  });

  validateDir(sourceDirectory, targetDirectory);
  isInputFileExists(sourceFilePath);

  const userInput: UserInput = {
    azVault,
    objectName,
    completeSourceFilePath: sourceFilePath,
    completeTargetFilePath: targetFilePath,
  };

  if (confirmConfigFileCreation) {
    writeFile(CONFIGURATION_FILE_NAME, userInput);
  } else {
    log.warn(`In the absence of configuration file, questions will be asked again!!!`);
  }

  return userInput;
};
