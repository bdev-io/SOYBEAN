export interface IApiResponse<T> {
  cd: number;
  data?: T;
  err?: string;
  ext?: object;

  msg?: string;
}
