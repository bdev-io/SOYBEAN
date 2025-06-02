import { BE_HOST, DEFAULT_HEADERS, IS_DEBUG } from '@common/configs/globals';

export default async function apiCallServer<TBody, TResp>(
  pathName: string,
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS',
  body?: TBody,
  queryObject?:
    | Record<string | number, string | number | undefined>
    | { [key: string]: string | number },
  additionalHeaders?: Record<string, string>,
): Promise<TResp> {
  const slicePath = generalizePathName(pathName);
  const queryString = generalizeQueryString(queryObject);
  const url = `${BE_HOST}/${slicePath}?${queryString}`;
  const headers: Headers = generalizeHeader(additionalHeaders);

  const requestOptions: RequestInit = {
    body: JSON.stringify(body),
    method: method || 'GET',
    headers,
    credentials: 'same-origin',
  };

  try {
    const result = await fetch(url, requestOptions);
    const responseJson = await result.json();
    if (!result.ok) {
      throw responseJson;
    }
    if (IS_DEBUG) {
      console.log(
        `[Req: ${url}] {reqBody: ${requestOptions.body} -> Res: ${JSON.stringify(responseJson, null, 2)}}`,
      );
    }
    return responseJson as TResp;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

function generalizePathName(pathName: string): string {
  return pathName.startsWith('/')
    ? pathName.slice(1, pathName.length)
    : pathName;
}

function generalizeQueryString(
  queryObject?:
    | Record<string | number, string | number | undefined>
    | { [key: string]: string | number },
): string {
  const convertedObject: Record<string, string> = {};
  if (queryObject) {
    for (const key of Object.keys(queryObject)) {
      if (queryObject[key] === undefined) {
        continue;
      }
      const convertedString = `${queryObject[key]}`;
      convertedObject[`${key}`] = convertedString;
    }
  }
  return new URLSearchParams(convertedObject).toString();
}

function generalizeHeader(
  additionalHeaders?: Record<string, string>,
  token?: string,
): Headers {
  const extendedHeader = {
    ...DEFAULT_HEADERS,
    ...(additionalHeaders || {}),
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=urf-8',
        }
      : {}),
  };
  return new Headers(extendedHeader);
}
