import { launchProcess } from './services';

import { log } from './utils';

const launchApp = async () => {
  await launchProcess();
};

launchApp()
  .then(() => log.info(`Successfully fetched the secrets from the vault `))
  .catch((error: Error) =>
    log.error(`Failed to fetch the secrets from the vault, because: ${error.message}`),
  )
  .finally(() => log.info(`Closing application`));
