# azure-vault-secrets

## Introduction

This module "azure-vault-secrets" will enhance the developer experience working with [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview). This module will fetch secrets from the azure key vault and create a environment (.env) file.

In order to use this module, there are few pre-requisites that must be observed on the development/deployment machines

### Pre-requisites

- Must have Azure subscription or Azure free account
- Install Azure CLI, [Installation Guide](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

### Features

- Enhance developer experience
- Minimum mandatory input from the user
- The existing .env file will not be overridden
- Secret keys should be present in yaml format, in "values.yaml" file
- An environment file (.env) file will be created for the secret values

### Parameters

Only a minimal set of input is required by the module to complete it's task effectively and efficiently. The module also provides hints and will work with default values in case optional parameters are not provided.

| S.No | Parameter Name  | Input     | Default Value          | Description                                                                                                                                                                                                                                           |
| ---- | --------------- | --------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.   | Vault Name      | Mandatory | -                      | Name of the azure key vault from where secrets will be fetched                                                                                                                                                                                        |
| 2.   | Source Location | Optional  | Project toot directory | It is the location of the yaml file that contains the secret keys. If the location is not provided the module will look for "values.yaml" file in project root directory. <b>Note:</b> The secret keys must be present in the file name "values.yaml" |
| 3.   | Target Location | Optional  | Project toot directory | It is the location of .env file creation, if location is not provided the file will be created in the root directory                                                                                                                                  |

### License

MIT
