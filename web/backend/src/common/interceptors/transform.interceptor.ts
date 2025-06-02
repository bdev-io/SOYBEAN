import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IEnv } from '@config/index';
import { KError } from '@error/error.handler';

import { RetType } from '@type/return.type';

@Injectable()
class TransformInterceptor<T> implements NestInterceptor<T, RetType<T>> {
  captureResponse = false;

  constructor(private configService: ConfigService) {
    const envConfig = this.configService.get<IEnv>('env')!;
    this.captureResponse = envConfig.logger.captureResponse;
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<RetType<T>> {
    return next.handle().pipe(
      map((data: any | RetType<any>) => {
        if (data instanceof RetType) {
          const body: any = data.getBody();

          // NOTE : SET STATUS CODE & HEADER
          const response = context.switchToHttp().getResponse();

          response
            .status(data.getHttpStatusCode())
            .contentType('application/json; charset=utf-8');

          if (data.cookies) {
            for (const [key, val] of Object.entries(data.cookies)) {
              const {
                value, options
              } = val;
              response.cookie(key, value, options);
            }
          }

          response.setHeader(
            'Content-Location',
            context.switchToHttp().getRequest().path,
          );

          // NOTE : SET STATUS CODE & HEADER

          if (this.captureResponse) {
            Logger.debug(
              '\n======================= Response: =======================\n' +
              `[${context.switchToHttp().getResponse().statusCode as number
              }]\n` +
              `\n${JSON.stringify(body, null, 2)}\n` +
              '===================== End Response ======================\n\n',
            );
          }
          return body;
        }
        else if (data instanceof StreamableFile) {
          return data;
        }

        Logger.error('Response is not instance of RetType, return as it is');
        Logger.error(JSON.stringify(data, null, 2));
        throw new KError(
          'INTERNAL_SERVER_ERROR',
          500,
          'Response is not instance of RetType.',
          {
          },
        );
      }),
    );
  }
}

export default TransformInterceptor;
