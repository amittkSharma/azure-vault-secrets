import { writeFile } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';
import { log } from '../utils';

const readDotEnvFile = (filepath: string) => {
  if (existsSync(filepath)) {
    let baseContent = readFileSync(filepath, 'utf8');

    // if (baseContent.includes(HEADER)) {
    //   const start = baseContent.indexOf(HEADER);
    //   const end = baseContent.indexOf(FOOTER) + FOOTER.length || baseContent.length;

    //   baseContent = baseContent.slice(0, start) + baseContent.slice(end);
    // }

    return `${baseContent.trim()}\n`;
  }

  return '';
};

export const writeSecrets = async (envFileEntries: { [key: string]: string }, filePath: string) => {
  const existingContent = readDotEnvFile(filePath);

  /**
   * create env file
   */
  if (Object.keys(envFileEntries).length > 0) {
    const content = Object.keys(envFileEntries)
      .map(key => `${key}=${envFileEntries[key]}`)
      .join('\n');

    await writeFile(filePath, [existingContent, content].join('\n'));
    log.info('Done! ✨\n.env file successfully created');
  }
};
