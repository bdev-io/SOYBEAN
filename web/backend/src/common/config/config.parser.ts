import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';

import { CONFIG_ENV_PATH } from '@constant/config.constant';

const env = dotenv.config({
  path: CONFIG_ENV_PATH,
  encoding: 'utf-8',
  debug: true,
  override: true,
});
if (env.error) { throw env.error; }
const PARSED_ENV: Record<string, any> = dotenvParseVariables(
  env.parsed!,
  {
  },
) as Record<string, any>;
if (PARSED_ENV.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-console
  console.log('PARSED_ENV', PARSED_ENV);
}

export { PARSED_ENV };
