// NOTE: 이 버전에서는 순서 보장 되는듯
const API_TAGS_CLASS = {
  GLOBAL: 'GLOBAL API',
  USERS: 'Users (사용자)',
  AUTH: 'Auth (인증/인가/회원)',
  FILES: 'Files (파일)',
  ASSISTANTS: 'Assistants (AI)',
};

type ApiTag<T> = T extends string
  ? { _value: string }
  : {
    [K in keyof T as K extends '_value' ? never : K]: ApiTag<T[K]>;
  } & { _value: string };

function createApiTag(data: any, parentValues: string[] = []) {
  const result: any = {
  };

  for (const key in data) {
    if (typeof data[key] === 'object') {
      result[key] = createApiTag(data[key], [
        ...parentValues,
        data[key]._value,
      ]);
    } else if (key !== '_value') {
      const value = [...parentValues, data[key]].join(' - ');
      result[key] = {
      };
      result[key]._value = value;
    } else {
      result[key] = parentValues.join(' - ');
    }
  }

  return result;
}

function listValues(data: any) {
  let result: string[] = [];

  for (const key in data) {
    if (typeof data[key] === 'object') {
      result.push(data[key]._value);
      result = [...result, ...listValues(data[key])];
    }
  }

  return result;
}

export const API_TAGS: ApiTag<typeof API_TAGS_CLASS> = createApiTag(API_TAGS_CLASS);

export const API_TAGS_LIST = listValues(API_TAGS);
