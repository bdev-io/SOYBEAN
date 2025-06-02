'use client';

import FileDropzone from './(components)/FileDropzone';
import FileList from './(components)/FileList';
import InstructionTexts from './(components)/InstructionTexts';
import { UploadToolbar } from './(components)/UploadToolbar';
import { UploadTypeButtons } from './(components)/UploadTypeButtons';
import { UrlUploadForm } from './(components)/UrlUploadForm';

export default function Page() {
  // ANCHOR Mock data - 기능 개발 시 삭제 필요
  const files = [
    { fileName: '파일1.pdf', status: 'completed' },
    { fileName: '파일2.mp4', status: 'completed' },
    { fileName: '파일3.pdf', status: 'error' },
  ];

  return (
    <div className='px-[48px]'>
      <div className='font-heading2-bold pb-[24px] pt-[36px]'>
        관리자 자료 업로드
      </div>

      <div className='flex gap-[20px]'>
        <div className='flex-1/2'>
          <InstructionTexts />
          <UploadTypeButtons />
          <FileDropzone />
          <UrlUploadForm />
        </div>

        <FileList files={files} />
      </div>

      <UploadToolbar />
    </div>
  );
}
