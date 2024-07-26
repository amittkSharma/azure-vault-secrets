import * as path from 'path';
import writeYamlFile from 'write-yaml-file';
import { log } from './logger';

export const writeFile = (fileName: string, content: object) => {
  try {
    const filePath = path.join(process.cwd(), fileName);
    writeYamlFile(filePath, content);
  } catch (error) {
    log.error(`Failed to create the file, ${(error as Error).message}`);
  }
};
