import apiCall from '@api/api.base';

export interface FileItem {
  uuid: string;
  contentType: string;
  filename: string;
  permanentUrl: string;
  fileSize: number;
  createdAt: string;
}

export interface FilesList {
  data: FileItem[];
}

export async function getFiles(fileIds: string[], fileUrls?: string[]) {
  try {
    const params = {
      ...(fileIds.length > 0 ? { files: fileIds.join(',') } : {}),
      ...(fileUrls && fileUrls.length > 0
        ? { fileUrls: fileUrls.map((url) => encodeURI(url)).join(',') }
        : {}),
    };

    const fileList = await apiCall<undefined, FilesList>(
      'files',
      'GET',
      undefined,
      params,
    );
    return fileList;
  } catch (e) {
    console.error('파일 리스트 조회 도중에 에러 발생', e);
    throw new Error('파일 리스트 조회 실패');
  }
}
