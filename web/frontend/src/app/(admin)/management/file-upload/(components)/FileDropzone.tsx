'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { cn } from '@lib/utils';

type UploadedFile = {
  name: string;
  previewUrl: string;
  type: string;
};

export default function FileDropzone() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      type: file.type,
      previewUrl: URL.createObjectURL(file),
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    console.log(acceptedFiles, '업로드된 파일들');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/*': [],
      'application/pdf': [],
      'text/*': [],
      'video/*': [],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          'bg-gray-5 border-gray-30 flex h-[469px] cursor-pointer flex-col items-center justify-center gap-[24px] rounded-lg border-2 border-dashed p-[56px] text-center transition-all',
          isDragActive ? 'bg-blue-light border-primary' : '',
        )}
      >
        <input {...getInputProps()} />

        {/* {isDragActive ? ( */}
        <Image
          src='/icon/fileUpload-icon.svg'
          alt='file upload icon'
          width={56}
          height={56}
        />
        <div className='font-body3-regular text-gray-50'>
          <p className='font-body1-regular text-black'>
            파일을 드래그 앤 드롭하거나{' '}
            <span className='text-primary underline'>
              클릭하여 파일을 업로드{' '}
            </span>
            하세요.
          </p>

          <p>· PDF, MP4 형식을 지원합니다.</p>
          <p>· 파일은 최대 00개, 파일당 최대 용량은 00mb입니다.</p>
        </div>
      </div>
      {/* TODO 파일리스트 임시로 넣어둠 - 기능 구현시 변경 필요 */}
      {uploadedFiles.length > 0 && (
        <div className='grid grid-cols-3 gap-[16px]'>
          {uploadedFiles.map((file, index) => (
            <div key={`${file.name}-${index}`} className='text-center'>
              {file.type.startsWith('image/') ? (
                <div className='flex flex-col items-center gap-2'>
                  <Image
                    src={file.previewUrl}
                    alt={file.name}
                    width={100}
                    height={100}
                    className='rounded-md border object-cover'
                  />
                  <p className='text-sm'>{file.name}</p>
                </div>
              ) : (
                <div>{file.name}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
