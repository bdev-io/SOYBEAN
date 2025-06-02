import Image from 'next/image';
import React from 'react';

import { cn } from '@lib/utils';

import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

export default function ArchiveCard({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex w-full items-start gap-[16px] px-[28px] py-[32px]',
        className,
      )}
      {...props}
    >
      <div className='flex items-start gap-[12px]'>
        <div className='px-[12px] py-[10px]'>
          <Checkbox className='size-[20px]' />
        </div>
        <div className='px-[10px] py-[8px]'>1</div>
      </div>

      <div className='flex flex-1 gap-[16px]'>
        <div className='flex flex-1 flex-col gap-[8px]'>
          <Badge variant='default'>논문</Badge>
          <div className='flex flex-col gap-[4px]'>
            <div className='font-body1-semibold line-clamp-1'>
              하이브리드 딥러닝 모델(LSTM + CNN 등)을 활용한 태양광 발전량의
              시계열 예측 연구
            </div>
            <div className='font-body2-regular flex items-center gap-[16px] text-gray-50'>
              <div className='flex items-center gap-[8px]'>
                <span>저자</span>
                <span className='h-[12px] w-[1px] bg-gray-50' />
                <span>Junha Kim</span>
              </div>
              <div className='flex items-center gap-[8px]'>
                <span>발행연도</span>
                <span className='h-[12px] w-[1px] bg-gray-50' />
                <span>2025</span>
              </div>
            </div>
          </div>

          <div className='mt-[8px]'>{children}</div>
        </div>

        <div className='font-body2-regular flex flex-col justify-center'>
          {/* <label className='relative flex items-center gap-[8px] pb-[43px]'>
            공개
            <Switch />
          </label> */}

          <div className='flex flex-col gap-[8px]'>
            <Button variant='outline' size='sm'>
              <Image src='/icon/book.svg' width={24} height={24} alt='book' />
              논문보기
            </Button>
            <Button variant='outline' size='sm'>
              <Image
                src='/icon/download.svg'
                width={24}
                height={24}
                alt='book'
              />
              다운로드
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
