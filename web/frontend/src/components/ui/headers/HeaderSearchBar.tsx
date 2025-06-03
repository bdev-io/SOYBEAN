'use client';

import React from 'react';

import { cn } from '@lib/utils';

import IconSearch from '@comp/icons/IconSearch';

import { Input } from '../input';

export default function HeaderSearchBar({
  isGisPage = false,
}: {
  isGisPage?: boolean;
}) {
  const [searchValue, setSearchValue] = React.useState<string>('');

  return (
    <div
      className={cn(
        'flex w-[192px] w-full flex-col gap-[12px]',
        isGisPage && 'bg-[#111] text-white',
      )}
    >
      <div className='relative flex items-center gap-[10px]'>
        <IconSearch className='fill-gray-60 absolute left-0 top-1/2 size-[22px] translate-y-[-50%] pl-[4px]' />
        <Input
          variant='default'
          placeholder='검색어를 입력해주세요'
          className={cn(
            'font-body3-semibold py-[10px] pl-[40px] pr-[16px]',
            isGisPage && 'bg-[#111] text-white',
          )}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // Handle search action here
              console.log('Search:', searchValue);
            }
          }}
        />
      </div>
    </div>
  );
}
