import * as fs from 'fs';

export const isInputFileExists = (sourceFilePath: string) => {
  if (!fs.existsSync(sourceFilePath)) {
    throw new Error(`${sourceFilePath} file does not exists`);
  }
};
