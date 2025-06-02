import { HttpStatus } from "@nestjs/common";

import type { CookieOptions } from "express";



export type RecordTypeReturn = RetType<Record<string, any>>;

/** Return Type <T> */
export class RetType<T> {
  cd: number;
  cookies?: Record<string, { options: CookieOptions; value: string, }>;
  data?: T;
  err?: string;
  ext?: object;

  msg?: string;

  constructor(
    data?: T,
  ) {
    this.cd = HttpStatus.OK;
    if (data) {
      this.data = data;
    }
  }

  public static new<T>(data?: T): RetType<T> {
    return new RetType<T>(data);
  }
  getBody(): object {
    return {
      ...this.data,
      msg: this.msg,
      ext: this.ext,
    };
  }

  getHttpStatusCode(): number {
    return this.cd;
  }
  public setCode(cd: number): RetType<T> {
    this.cd = cd;
    return this;
  }

  public setCookie(key: string, value: string, options: CookieOptions): RetType<T> {
    this.cookies ??= {
    };
    this.cookies[key] = {
      value, options
    };
    return this;
  }

  public setData(data: T | undefined): RetType<T> {
    this.data = data;
    return this;
  }

  public setErr(err: string): RetType<T> {
    this.err = err;
    return this;
  }

  public setExt(ext: object): RetType<T> {
    this.ext = ext;
    return this;
  }

  public setHttpStatus(cd: number): RetType<T> {
    this.cd = cd;
    return this;
  }

  public setMsg(msg: string): RetType<T> {
    this.msg = msg;
    return this;
  }

}


export { HttpStatus } from "@nestjs/common";
