import { askQuestion } from './services';
import { log } from './utils';

const launchApp = async () => {
  log.info(`application launched`);
  const answers = await askQuestion();

  log.info(`answers: ${JSON.stringify(answers, null, 2)}`);
};

launchApp()
  .then(() => log.info(`Successfully fetched the secrets from the vault `))
  .catch((error: Error) =>
    log.error(`Failed to fetch the secrets from the vault, because: ${error.message}`),
  )
  .finally(() => log.info(`Closing application`));
