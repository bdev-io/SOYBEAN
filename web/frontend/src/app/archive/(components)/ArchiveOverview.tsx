import React from 'react';

export default function ArchiveOverview() {
  return (
    <div className='mb-[24px] flex flex-col gap-[8px] rounded-[8px] border p-[24px]'>
      <div className='font-body2-semibold text-gray-60'>아카이브 현황</div>
      <div className='font-body2-semibold text-gray-70 flex items-center gap-[20px] rounded-[8px] bg-[#f7f7f7] px-[24px] py-[16px]'>
        <div className='flex items-center gap-[8px]'>
          <div className='leading-[26px]'>전체</div>
          <div className='font-heading3-bold text-primary'>263</div>
        </div>
        <div className='bg-gray-30 h-[16px] w-[1px]' />
        <div className='flex items-center gap-[8px]'>
          <div className='leading-[26px]'>논문</div>
          <div className='font-heading3-bold text-primary'>150</div>
        </div>
        <div className='bg-gray-30 h-[16px] w-[1px]' />
        <div className='flex items-center gap-[8px]'>
          <div className='leading-[26px]'>사업계획서</div>
          <div className='font-heading3-bold text-primary'>71</div>
        </div>
        <div className='bg-gray-30 h-[16px] w-[1px]' />
        <div className='bg-gray-30 h-[16px] w-[1px]' />
        <div className='flex items-center gap-[8px]'>
          <div className='leading-[26px]'>수업자료</div>
          <div className='font-heading3-bold text-primary'>42</div>
        </div>
        <div className='bg-gray-30 h-[16px] w-[1px]' />
      </div>
    </div>
  );
}
