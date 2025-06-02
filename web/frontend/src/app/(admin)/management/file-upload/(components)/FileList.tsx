'use client';

import Image from 'next/image';

import { cn } from '@lib/utils';

import IconDelete from '@comp/icons/IconDelete';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@comp/ui/select';

export default function FileList({
  files,
}: {
  files: { fileName: string; status: string }[];
}) {
  return (
    <div className='flex-1/2'>
      <div className='h-full rounded-[6px] border p-[24px]'>
        <div className='flex items-center gap-[10px] pb-[12px]'>
          <Image
            src='/icon/fileList-icon.svg'
            alt='fileList icon'
            width={28}
            height={28}
          />
          <h1 className='font-heading2-semibold text-gray-60'>파일 리스트</h1>
          <p>
            총<span className='text-primary'>10</span>개
          </p>
        </div>
        <div>
          <div className='font-body3-regular border-gray-30 flex border-b py-[6px] text-center text-gray-50'>
            <div className='flex-1 px-[12px]'>파일명</div>
            <div className='w-[200px] px-[12px]'>업로드 상태</div>
            <div className='flex-1 px-[12px]'>파일 카테고리</div>
            <div className='flex-1 px-[12px]'>삭제</div>
          </div>
          {files.map((file, idx) => (
            <div
              key={idx}
              className='font-body2-regular border-gray-20 flex items-center text-center text-black'
            >
              {/* 파일명 */}
              <div
                className={cn(
                  'flex-1',
                  file.status === 'error' ? 'text-error' : '',
                )}
              >
                {file.fileName}
              </div>

              {/* 상태 */}
              <div className='flex w-[200px] justify-center'>
                {file.status === 'uploading' && (
                  <div className='h-2 w-full rounded bg-gray-200'>
                    <div className='h-2 w-[0%] animate-pulse rounded bg-blue-500' />
                  </div>
                )}
                {file.status === 'completed' && (
                  <div className='flex items-center gap-[4px]'>
                    <span>업로드 완료</span>
                    <Image
                      src='/icon/check-icon.svg'
                      alt='check icon'
                      width={16}
                      height={16}
                    />
                  </div>
                )}
                {file.status === 'error' && (
                  <div className='flex items-center gap-[4px]'>
                    <div className='text-[#FF4545]'>네트워크 오류</div>
                    <Image
                      src='/icon/error-icon.svg'
                      alt='error icon'
                      width={20}
                      height={20}
                    />
                  </div>
                )}
              </div>

              {/* 카테고리 드롭다운 */}
              <div className='flex-1 p-[10px]'>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='카테고리 선택' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='1'>논문</SelectItem>
                    <SelectItem value='2'>수업자료</SelectItem>
                    <SelectItem value='3'>사업계획서</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 삭제 버튼 */}
              <div className='flex flex-1 justify-center'>
                <IconDelete
                  currentColor={cn(file.status === 'error' ? '#FF4545' : '')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
