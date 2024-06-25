import { join } from 'path';
import { writeFile } from 'fs/promises';
import { existsSync, readFileSync } from 'fs';

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

export const writeSecrets = async (envFileEntries: { [key: string]: string }, target: string) => {
  const targetDirectory = join(process.cwd(), target || '.');
  const filepath = join(targetDirectory, '.env');

  const existingContent = readDotEnvFile(filepath);

  /**
   * create env file
   */
  if (Object.keys(envFileEntries).length > 0) {
    const content = Object.keys(envFileEntries)
      .map(key => `${key}=${envFileEntries[key]}`)
      .join('\n');

    await writeFile(filepath, [existingContent, content].join('\n'));
    console.log('[INFO] Done! ✨\n.env file successfully created');
  }
};
