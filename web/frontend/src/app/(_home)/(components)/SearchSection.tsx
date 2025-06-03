import React from 'react';

import IconSearch from '@comp/icons/IconSearch';
import { Input } from '@comp/ui/input';

export default function SearchSection() {
  return (
    // !TODO 전체 아카이브 갯수 데이터 받아오기
    <div className='bg-gray-10 border-gray-30 flex h-[70px] items-center border px-[36px] py-[22px]'>
      <IconSearch />
      <Input
        placeholder='N건의 기록을 검색해 보세요'
        variant='underline'
        className='font-heading3-semibold text-gray-40 border-none'
      />
    </div>
  );
}
