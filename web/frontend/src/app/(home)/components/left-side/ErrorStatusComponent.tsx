'use client';

import React from 'react';

import { cn } from '@lib/utils';

const InnerProgress = ({ name, value }: { name: string; value: number }) => {
  return (
    <div className='flex w-full flex-row justify-between'>
      <div className='flex-2 text-start'>{name}</div>
      <div className='flex-4 w-full'>
        <div
          className={cn('h-full rounded-l-sm rounded-r-sm bg-[#0c398d]')}
          style={{ width: `${value}%` }}
        >
          <div className='relative right-2 top-0 flex h-full w-full items-center justify-end'>
            <span className='text-sm font-semibold text-gray-500'>
              {value}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ErrorStatusComponent() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-start gap-4 p-2'>
      <div>
        <h1 className='font-pretendard text-xl font-semibold text-black'>
          추론 운영 / 경고 현황
        </h1>
      </div>

      <div className='flex w-full flex-col items-start justify-between gap-2'>
        <InnerProgress name='정상' value={80} />
        <InnerProgress name='정상' value={20} />
      </div>
    </div>
  );
}
