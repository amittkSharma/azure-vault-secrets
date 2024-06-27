import * as fs from 'fs';

export const validateDir = (sourceDirectory: string, targetDirectory: string) => {
  if (!fs.existsSync(sourceDirectory)) {
    throw new Error(`${sourceDirectory} directory does not exists`);
  }

  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory);
  }
};
