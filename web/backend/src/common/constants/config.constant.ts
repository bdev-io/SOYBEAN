import fs from 'node:fs';
import path from 'node:path';

// NOTE : /dist/.env
const CONFIG_BASE_PATH: string = path.join(__dirname, '..', '..', 'env');

const supportedEnvs: string[] =

  process.env.NODE_ENV === 'production'
    ? ['production', 'prod']
    :
    process.env.NODE_ENV === 'staging'
      ? ['staging', 'stage']
      :
      process.env.NODE_ENV === 'development'
        ? ['development', 'dev']
        : process.env.NODE_ENV === 'localhost' || process.env.NODE_ENV === 'local'
          ? ['local', 'localhost']
          : [];

const CONFIG_ENV_PATH: string = (() => {
  for (const env of supportedEnvs) {
    const fullPath = path.join(CONFIG_BASE_PATH, `.${env}.env`);
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`Searching(.env): ${fullPath}`);
    }
    if (fs.existsSync(fullPath)) {
      return fullPath;
    }
  }
  throw new Error('NO ENV File found');
})();

export { CONFIG_BASE_PATH, CONFIG_ENV_PATH };
