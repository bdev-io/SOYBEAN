import { registerAs } from '@nestjs/config';

import { PARSED_ENV } from './config.parser';

const rawConfig = PARSED_ENV;

export interface IEnv {
  isProduction: boolean; // TYPE : IS PRODUCTION?
  packageName: string; // TYPE : PACKAGE NAME
  packageDescription: string; // TYPE : PACKAGE DESCRIPTION
  host: string; // TYPE : HOST NAME
  hostUrl: string; // TYPE : HOST URL
  corsOrigin: string | string[]; // TYPE : CORS ORIGIN URL OR ARRAY OF URLS
  port: number; // TYPE : PORT NUMBER
  https: boolean; // TYPE : HTTPS ENABLED?
  version: string; // TYPE : APP VERSION

  accessToken: {
    // TYPE : ACCESS TOKEN
    secretOrPrivateKey: string; // TYPE : SECRET OR PRIVATE KEY
    signOptions: {
      // TYPE : SIGN OPTIONS
      algorithm: string; // TYPE : ALGORITHM
      expiresIn: number; // TYPE : EXPIRES IN
    };
  };
  refreshToken: {
    // TYPE : REFRESH TOKEN
    secretOrPrivateKey: string; // TYPE : SECRET OR PRIVATE KEY
    signOptions: {
      // TYPE : SIGN OPTIONS
      algorithm: string; // TYPE : ALGORITHM
      expiresIn: number; // TYPE : EXPIRES IN
    };
  };

  logger: {
    captureRequest: boolean; // TYPE : CAPTURE REQUEST?

    captureResponse: boolean; // TYPE : CAPTURE RESPONSE?
    cloudwatch: {
      awsAccessKeyId: string; // TYPE : AWS ACCESS KEY ID
      awsSecretKey: string; // TYPE : AWS SECRET KEY
      // TYPE : CLOUDWATCH LOGGING
      enabled: boolean; // TYPE : ENABLED?
      log_level: string; // TYPE : LOG LEVEL
      loggerName: string; // TYPE : LOGGER NAME
      logGroupName: string; // TYPE : LOG GROUP NAME
      logStreamName: string; // TYPE : LOG STREAM NAME
    };

    // TYPE : LOGGER
    level: string; // TYPE : LOG LEVEL
  };

  limiter: {
    // TYPE : LIMITER
    enabled: boolean; // TYPE : ENABLED?
    limit: number; // TYPE : LIMIT
    ttl: number; // TYPE : TIME TO LIVE
  };
}

const isStringTrue = (v?: boolean | string): boolean => {
  if (v === undefined) { return false; }
  if (typeof v === 'boolean') { return v; }
  const value = v.trim().toLowerCase();
  if (value === 'true' || value === '1') { return true; }
  return false;
};

export default registerAs(
  'env', // TYPE : REGISTER AS THIS NAME
  (): IEnv => {
    const host: string = rawConfig.HOST || 'localhost';
    const port: number = parseInt(rawConfig.PORT || '3000', 10);
    const urlPrefix: string = rawConfig.HTTPS || false ? 'https' : 'http';
    const urlSuffix: string =
      port === 80 || port === 443 ? '' : `:${rawConfig.PORT}`;
    const hostUrl = `${urlPrefix}://${host}${urlSuffix}/`;
    const version = `v${(process.env.VERSION || '0.0.0').replace('v', '')}`;
    const packageName: string = process.env.npm_package_name || 'ql.gl';
    const packageDescription: string =
      process.env.npm_package_description || 'https://ql.gl';

    return {
      packageName,
      packageDescription,
      isProduction: process.env.NODE_ENV === 'production',
      hostUrl,
      corsOrigin: rawConfig.corsOrigin || hostUrl,
      port,
      https: rawConfig.https || false,
      host,
      version,

      accessToken: {
        secretOrPrivateKey: process.env.JWT_ACC_SECRET_KEY || 'secret',
        signOptions: {
          algorithm: process.env.JWT_ACC_ALGORITHM || 'HS256',
          expiresIn: parseInt(process.env.JWT_ACC_EXPIRES_IN || '3600', 10),
        },
      },

      refreshToken: {
        secretOrPrivateKey: process.env.JWT_REF_SECRET_KEY || 'secret',
        signOptions: {
          algorithm: process.env.JWT_REF_ALGORITHM || 'HS256',
          expiresIn: parseInt(process.env.JWT_REF_EXPIRES_IN || '86400', 10),
        },
      },

      logger: {
        level: process.env.LOG_LEVEL || 'debug',

        captureRequest: isStringTrue(process.env.LOG_CAPTURE_REQUEST) || false,
        captureResponse:
          isStringTrue(process.env.LOG_CAPTURE_RESPONSE) || false,

        cloudwatch: {
          enabled: isStringTrue(process.env.LOG_CLOUDWATCH_ENABLED) || false,
          loggerName: process.env.LOG_CLOUDWATCH_LOGGER_NAME || 'ql.gl',
          logGroupName: process.env.LOG_CLOUDWATCH_LOG_GROUP_NAME || 'ql.gl',
          logStreamName: process.env.LOG_CLOUDWATCH_LOG_STREAM_NAME || 'ql.gl',
          awsAccessKeyId: process.env.LOG_CLOUDWATCH_AWS_ACCESS_KEY_ID || '',
          awsSecretKey: process.env.LOG_CLOUDWATCH_AWS_SECRET_KEY || '',
          log_level: process.env.LOG_CLOUDWATCH_LOG_LEVEL || 'debug',
        },
      },

      limiter: {
        enabled: isStringTrue(process.env.LIMITER_ENABLED) || false,
        ttl: parseInt(process.env.LIMITER_TTL || '60', 10),
        limit: parseInt(process.env.LIMITER_LIMIT || '100', 10),
      },
    };
  },
);
