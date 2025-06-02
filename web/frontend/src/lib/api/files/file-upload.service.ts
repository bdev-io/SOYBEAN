'use client';

import axios from 'axios';

import { BE_HOST } from '@common/configs/globals';

export interface FileUploadResultItem {
  contentType: string;
  fileSize: number;
  fieldName: string;
  originName: string;
  path: string;
  permanentUrl: string;
  uuid: string;
}

export type FileUploadResponse = Record<string, FileUploadResultItem[]>;

export async function fileUpload(
  reqData: Record<string, File>,
): Promise<FileUploadResponse | undefined> {
  const url = `${BE_HOST}/files`;
  const unAuthUrl = `${BE_HOST}/files/upload`;
  // TODO: 토큰 추가 로직 추가
  // const token = sharedSessionStore.getState().getAuthToken();
  const token = '';

  const formData = new FormData();

  try {
    Object.entries(reqData).forEach(([key, file]) => {
      const safeFileName = file.name.replace(/\s/g, '_');
      const renamedFile = new File([file], safeFileName, { type: file.type });
      formData.append(key, renamedFile);
    });
  } catch (error) {
    console.error('Error while appending to FormData:', error);
    return undefined;
  }

  try {
    if (!token) {
      const response = await axios.post<FileUploadResponse>(
        unAuthUrl,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response);
      const { data } = response;
      return data;
    }

    const response = await axios.post<FileUploadResponse>(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    const { data } = response;
    return data;
  } catch (error) {
    console.error('fileUpload 도중에 에러발생', error);
    return undefined;
  }
}
