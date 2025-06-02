import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import type { Request } from 'express';

import { isString, KError } from '@error/error.handler';

import { RecordTypeReturn, RetType } from '@type/return.type';

// NOTE : CATCH ERROR AND FILTER IT TO GENERALIZED RESPONSE!
@Catch()
class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.I_AM_A_TEAPOT;

    let err = '';
    let msg = '';
    let ext: object = {
    };

    if (exception instanceof HttpException) {
      const res = exception.getResponse() as any;
      Logger.error(res);
      if (isString(exception.getResponse())) {
        err = res as string;
        msg = (res as string) !== exception.message ? exception.message : '';
        ext = {
        };
      } else if (exception instanceof KError) {
        err = isString(res) ? res : res.error || exception.message || '';
        msg = isString(res) ? res : res.message || exception.message || '';
        ext = exception.getExtraInfo();
      } else {
        err = exception.message || 'Unknown Error';
        msg = res.message || '';
        ext = {
        };
      }
    } else {
      Logger.error(`[GlobalExceptionFilter] - HttpException 이외 에러 발생`);
      Logger.error(exception);
      err = 'Unknown Error';
      msg = "I'm a Tea Pot. Look at Console";
      ext = {
      };
    }

    const exceptionExtraInfo: object = Object.assign(ext, {
      timestamp: convertPrettyKST(new Date()),
      path: new URL(request.url, `http://${request.headers.host}`).pathname,
    });

    const responseBody: RetType<RecordTypeReturn> =
      new RetType<RecordTypeReturn>()
        .setCode(status)
        .setErr(err)
        .setMsg(msg)
        .setExt(exceptionExtraInfo);

    Logger.error(
      '\n======================= ERROR : =======================\n' +
      `[${status}]\n` +
      `\n${JSON.stringify(responseBody, null, 2)}\n` +
      '===================== End ERROR =======================\n\n',
    );
    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}

function convertPrettyKST(
  time: Date | number | string,
  simple?: boolean,
): string {
  const dateObj = new Date(time);
  const date = `0${dateObj.getDate()}`.slice(-2);
  const month = `0${dateObj.getMonth() + 1}`.slice(-2);
  const year = dateObj.getFullYear();
  const hour = `0${dateObj.getHours()}`.slice(-2);
  const minute = `0${dateObj.getMinutes()}`.slice(-2);
  const second = `0${dateObj.getSeconds()}`.slice(-2);
  if (simple) {
    return `${year}${month}${date}_${hour}${minute}${second}`;
  }
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}

export default GlobalExceptionFilter;
