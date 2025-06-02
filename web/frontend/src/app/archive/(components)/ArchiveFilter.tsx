'use client';

import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';

import { cn } from '@lib/utils';

import DatePickerRange from '@comp/DateRangePicker';
import IconArrow from '@comp/icons/IconArrow';
import IconReset from '@comp/icons/IconReset';

export default function ArchiveFilter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='mb-[20px] flex w-full flex-col overflow-hidden rounded-[8px] border'>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key='filter-content'
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className='overflow-hidden'
          >
            <div className='flex border-b'>
              <div className='bg-gray-10 font-body2-semibold flex h-[56px] w-[160px] items-center justify-between rounded-tl-[8px] px-[24px] py-[10px]'>
                유형
              </div>
              <div className='font-body3-regular flex items-center px-[16px]'>
                <div className='px-[12px]'>논문</div>
                <div className='px-[12px]'>사업계획서</div>
                <div className='px-[12px]'>수업자료</div>
              </div>
            </div>

            <div className='flex border-b'>
              <div className='bg-gray-10 font-body2-semibold flex h-[56px] w-[160px] items-center justify-between px-[24px] py-[10px]'>
                키워드
              </div>
              <div className='font-body3-regular flex items-center px-[16px]'>
                <div className='px-[12px] text-gray-50'>
                  등록된 키워드가 없습니다.
                </div>
              </div>
            </div>

            <div className='flex border-b'>
              <div className='bg-gray-10 font-body2-semibold flex h-[56px] w-[160px] items-center justify-between px-[24px] py-[10px]'>
                발행연도
              </div>
              <div className='font-body3-regular flex items-center px-[16px]'>
                <DatePickerRange disableButtons />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex'>
        <div
          className={cn(
            'bg-primary font-body2-semibold flex h-[56px] w-[160px] cursor-pointer items-center justify-between px-[24px] py-[10px] text-white',
            isOpen ? '' : 'rounded-tl-[8px]',
          )}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          상세검색
          <IconArrow
            className={cn(
              'size-[24px] fill-white transition-transform duration-300',
              isOpen ? 'rotate-0' : 'rotate-180',
            )}
          />
        </div>
        <div className='font-body2-regular flex items-center px-[20px]'>
          <span>필터초기화</span>
          <IconReset className='fill-gray-60 size-[24px]' />
          <div className='ml-[20px] h-[14px] w-[1px] bg-[#D9D9D9]' />
        </div>
      </div>
    </div>
  );
}
