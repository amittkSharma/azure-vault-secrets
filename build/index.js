"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("./services");
const utils_1 = require("./utils");
const launchApp = async () => {
    utils_1.log.info(`application launched`);
    const answers = await (0, services_1.askQuestion)();
    utils_1.log.info(`answers: ${JSON.stringify(answers, null, 2)}`);
};
launchApp()
    .then(() => utils_1.log.info(`Successfully fetched the secrets from the vault `))
    .catch((error) => utils_1.log.error(`Failed to fetch the secrets from the vault, because: ${error.message}`))
    .finally(() => utils_1.log.info(`Closing application`));
