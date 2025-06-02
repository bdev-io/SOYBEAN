import { default as envConfig } from './env.config';

export const configLoaders = [envConfig];

export { default as envConfig, IEnv } from './env.config';
