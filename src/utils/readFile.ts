import * as fs from 'fs';
import { readFileSync } from 'fs';
import path from 'path';
import { parse } from 'yaml';
import { log } from './logger';

export const readConfigFile = (fileName: string) => {
  const filePath = path.join(process.cwd(), fileName);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  try {
    const file = readFileSync(filePath, 'utf-8');
    const content = parse(file);

    return content;
  } catch (error) {
    log.error(`Failed to read the configuration file, ${(error as Error).message}`);
  }
};
