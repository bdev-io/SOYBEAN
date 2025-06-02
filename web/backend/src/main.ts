import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import type { IEnv } from '@config/index';

import cookieParser from 'cookie-parser';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import winston from 'winston';
import CloudWatchTransport from 'winston-cloudwatch'; // NOTE : CLOUD WATCH LOGGING

import { API_TAGS_LIST } from '@constant/api-tags.constant';
import { EXTRA_MODELS } from '@constant/extra-models.constant';

import GlobalExceptionFilter from '@common/filters/global-exception.filter';
import TransformInterceptor from '@common/interceptors/transform.interceptor';

import { AppModule } from './app.module';

(BigInt.prototype as any).toJSON = function () {
  const int = Number.parseInt(this.toString(), 10);
  return int ?? this.toString();
};

process.env.PACKAGE_NAME = process.env.npm_package_name || 'ProfessorKim';
// process.env.PACKAGE_DESCRIPTION =
process.env.NODE_ENV = (process.env.NODE_ENV || 'development')
  .trim()
  .toLowerCase();
process.env.TZ = 'Asia/Seoul';
process.env.VERSION = `v${process.env.npm_package_version ||
  process.env.APP_VERSION ||
  require('../package.json').version ||
  '0.0.0'
}`;

const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      exposedHeaders: ['Authorization'],
    },
    rawBody: true,
  });

  app.getHttpAdapter().getInstance().disable('x-powered-by'); // NOTE : SECURITY OPTION

  const config = app.get(ConfigService);

  const envConfig = config.get<IEnv>('env')!;

  const transports: [winston.transport] = [
    new winston.transports.Console({
      level: envConfig.logger.level,
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'MM-DD HH:mm:ss',
        }),
        winston.format.ms(),
        winston.format.uncolorize(),
        nestWinstonModuleUtilities.format.nestLike(
          process.env.PACKAGE_NAME || 'SOOSAN',
          {
            colors: true,
            prettyPrint: true,
          },
        ),
      ),
    }),
  ];
  // NOTE : LOGGER TRANSPORTS

  if (envConfig.logger.cloudwatch.enabled) {
    transports.push(
      new CloudWatchTransport({
        name: envConfig.logger.cloudwatch.loggerName,
        level: envConfig.logger.cloudwatch.logStreamName,
        logGroupName: envConfig.logger.cloudwatch.awsAccessKeyId,
        logStreamName: envConfig.logger.cloudwatch.logGroupName,
        awsAccessKeyId: envConfig.logger.cloudwatch.awsAccessKeyId,
        awsSecretKey: envConfig.logger.cloudwatch.awsSecretKey,
        awsRegion: 'ap-northeast-2',
        messageFormatter: (item: any) =>
          `${item.level}:  ${item.message} ${JSON.stringify(item.meta)}`,
      }),
    );
    // NOTE : CLOUD WATCH LOGGING
  }

  const logger = WinstonModule.createLogger({
    format: winston.format.uncolorize(),
    transports,
  });

  app.useLogger(logger);

  app.enableShutdownHooks();

  app.useBodyParser('json', {
    limit: '10mb',
  });
  app.useBodyParser('urlencoded', {
    extended: true,
    limit: '10mb',
  });
  app.use(cookieParser());

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalInterceptors(new TransformInterceptor(config));
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));

  app.useGlobalPipes(
    new ValidationPipe({
      always: true,
      transform: true,
      skipMissingProperties: false,
      skipUndefinedProperties: false,
      forbidUnknownValues: true,

      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: IS_PRODUCTION, // NOTE : disable Error When Production
      enableDebugMessages: !IS_PRODUCTION,
      // transformOptions: {
      //   excludeExtraneousValues: true,
      //   exposeDefaultValues: false,
      //   excludePrefixes: ['_'],
      //   enableCircularCheck: true,
      // },
    }),
  );

  const documentSetting = new DocumentBuilder()
    .setTitle(envConfig.packageName)
    .setDescription(envConfig.packageDescription)
    .setVersion(process.env.VERSION || '0.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Token',
        in: 'header',
        name: 'Authorization',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentSetting, {
    extraModels: EXTRA_MODELS,
  });
  document.tags = API_TAGS_LIST.map((tag) => ({
    name: tag,
  }));
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      persistAuthorization: true,
    },
  });

  Logger.log(`Server is running on ${envConfig.corsOrigin}`, 'Bootstrap');
  await app.listen(envConfig.port);
}

bootstrap();
