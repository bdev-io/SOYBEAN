'use client';

import React from 'react';

import SidebarItemList from './SidebarItemList';

export default function Sidebar() {
  return (
    <div className='bg-gray-10 flex h-full flex-col'>
      <div className='bg-gray-20 flex h-[126px] w-full flex-col items-center justify-center gap-[8px] px-[25px] py-[8px]'>
        <div className='flex flex-col items-center gap-[6px] font-[600]'>
          <div className='text-[20px] leading-[24px]'>광주과학기술원</div>
          <div className='text-[18px] leading-[21px]'>AI정책전략대학원</div>
        </div>
        <div className='font-body2-regular'>김준하 교수 정교수</div>
      </div>

      <SidebarItemList />

      <div className='font-body4-regular justify-start pb-[16px] pl-[20px] text-gray-50'>
        © 2025. CARAMELLA Inc.
      </div>
    </div>
  );
}
