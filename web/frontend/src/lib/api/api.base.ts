'use client';

import type { ApiErrorResponse } from './ApiError';

import { BE_HOST, DEFAULT_HEADERS, IS_DEBUG } from '@common/configs/globals';

import { ApiError } from './ApiError';

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
  // const state = sharedSessionStore.getState();

  // const savedToken = state.getAuthToken();
  // TODO: 토큰 추가 로직 추가
  const savedToken = '';

  const targetLanguage = '';
  const targetRegion = '';

  const extendedHeader = {
    ...DEFAULT_HEADERS,
    ...(savedToken !== null
      ? {
          Authorization: `Bearer ${savedToken}`,
        }
      : {}),

    ...(token
      ? {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=urf-8',
        }
      : {}),

    ...(targetLanguage
      ? {
          'Content-Language': `${targetLanguage}-${targetRegion}`,
        }
      : {}),
    ...(additionalHeaders || {}),
  };
  return new Headers(extendedHeader);
}

/** apiCall<요청바디, 응답바디>(메서드, url, 쿼리문, 헤더, 바디) */
export default async function apiCall<TBody, TResp>(
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
    const responseJson = result.status !== 204 ? await result.json() : {};
    if (!result.ok) {
      throw new ApiError(responseJson as ApiErrorResponse);
    }
    if (IS_DEBUG) {
      // console.log(`[Req: ${url}] {reqBody: ${requestOptions.body} -> Res: ${JSON.stringify(responseJson, null, 2)}}`);
    }
    return responseJson as TResp;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function apiFileCall<TBody>(pathName: string, body?: TBody) {
  const slicePath = generalizePathName(pathName);
  const url = `${BE_HOST}/${slicePath}`;
  const headers: Headers = generalizeHeader();

  const requestOptions: RequestInit = {
    body: JSON.stringify(body),
    method: 'POST',
    headers,
    credentials: 'same-origin',
  };

  try {
    const result = await fetch(url, requestOptions);
    if (!result.ok) {
      throw result.json();
    }
    if (IS_DEBUG) {
      // console.log(`[Req: ${url}] {reqBody: ${requestOptions.body} -> Res: ${JSON.stringify(responseJson, null, 2)}}`);
    }
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
