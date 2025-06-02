// NOTE : Custom Error Handler By Dogyun
import { HttpException, Logger } from '@nestjs/common';

export const isUndefined = (obj: any): obj is undefined =>
  obj === undefined;
export const validatePath = (path?: string): string => {

  return path ? (path.charAt(0) !== '/' ? `/${path}` : path) : '';
};
export const isFunction = (fn: any): boolean => typeof fn === 'function';
export const isString = (fn: any): fn is string => typeof fn === 'string';
export const isConstructor = (fn: any): boolean => fn === 'constructor';
export const isNil = (obj: any): boolean => isUndefined(obj) || obj == null;
export const isObject = (fn: any): fn is object =>
  !isNil(fn) && typeof fn === 'object';
export const isEmpty = (array: any): boolean => !(array && array.length > 0);
export const isSymbol = (fn: any): fn is symbol => typeof fn === 'symbol';

export interface IHttpExceptionBody {
  error?: string;
  message: string;
  ext: object;
}

export class KError extends HttpException {
  extraInfo: object;

  constructor(
    error?: any | object | string,
    statusCode = 400,
    message = 'Unauthorized',
    extraInfo: object = {
    },
  ) {
    super(createKErrorBody(error, message, extraInfo), statusCode);
    this.extraInfo = extraInfo || {
    };
    if (process.env.NODE_ENV !== 'production') {
      Logger.error(this);
    }
  }

  getErrorString() {
    return this.getResponse();
  }

  getExtraInfo() {
    return this.extraInfo;
  }
}

// NOTE : Custom Error 만들기

export function createKErrorBody(
  error?: object | string,
  message?: string,
  detail?: object,
): IHttpExceptionBody {
  const err = isString(error) ? error : JSON.stringify(error, null, 2);

  return {
    error: err,
    message: message || err,
    ext: detail ?? {
    },
  };
}



// NOTE : Using Custom Error
// import KError;
// throw new KError('TEST ERROR', {}, 400);

export { HttpStatus } from '@nestjs/common';
