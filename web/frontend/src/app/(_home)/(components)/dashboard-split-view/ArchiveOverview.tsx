'use client';

export default function ArchiveOverview() {
  return (
    <div className='px-18 flex h-[136px] w-full items-center justify-between rounded-[12px] border bg-[#F7FBFF] text-center'>
      <div className='font-body1-semibold'>아카이브 현황</div>
      <div>
        <p className='font-body2-regular text-gray-80'>논문</p>
        <p className='text-gray-60'>
          <span className='font-heading2-regular text-black'>3</span>건
        </p>
      </div>
      <div className='h-[40px] w-[1px] bg-[#D9D9D9]'></div>
      <div>
        <p className='font-body2-regular text-gray-80'>연구자료</p>
        <p className='text-gray-60'>
          <span className='font-heading2-regular text-black'>3</span>건
        </p>
      </div>
      <div className='h-[40px] w-[1px] bg-[#D9D9D9]'></div>
      <div>
        <p className='font-body2-regular text-gray-80'>사업계획서</p>
        <p className='text-gray-60'>
          <span className='font-heading2-regular text-black'>3</span>건
        </p>
      </div>
    </div>
  );
}
