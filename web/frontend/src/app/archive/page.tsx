'use client';

import React from 'react';

import IconSearch from '@comp/icons/IconSearch';
import { Input } from '@comp/ui/input';

import ArchiveControls from './(components)/ArchiveControls';
import ArchiveFilter from './(components)/ArchiveFilter';
import ArchiveList from './(components)/ArchiveList';
import ArchiveOverview from './(components)/ArchiveOverview';

export default function page() {
  return (
    <div className='flex flex-col px-[48px]'>
      <div className='font-heading2-bold mb-[24px] mt-[36px] text-[#0A0A0A]'>
        아카이브
      </div>

      <div className='relative mb-[16px] h-[56px]'>
        <Input
          placeholder='자료명, 자료 내 텍스트, 저자/책임자 등을 입력해 주세요.'
          className='pl-[40px]'
        />
        <IconSearch className='absolute left-[12px] top-[16px] size-[24px] fill-gray-50' />
      </div>

      <ArchiveFilter />

      <ArchiveOverview />

      <div className='font-body2-regular mb-[16px] flex items-center gap-[2px] text-[#848484]'>
        전체 <span className='text-[#0044AD]'>1</span>건
      </div>

      <ArchiveControls />

      <ArchiveList />
    </div>
  );
}
