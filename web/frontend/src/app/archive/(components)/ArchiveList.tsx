'use client';

import Image from 'next/image';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react';

import ArchiveCard from '@comp/ArchiveCard';
import IconArrow from '@comp/icons/IconArrow';
import { PaginationGroup } from '@comp/PaginationGroup';
import { Button } from '@comp/ui/button';

export default function ArchiveList() {
  const router = useRouter();

  return (
    <>
      <div className='rounded-[8px] border'>
        {Array.from({ length: 10 }).map((_, i) => (
          <ArchiveCard
            key={i}
            className='not-last:border-b cursor-pointer'
            onClick={() => {
              router.push(`/archive/detail?id=${1}`);
            }}
          >
            <div className='flex items-center gap-[8px]'>
              <Button variant='outline' size='sm'>
                초록보기
                <IconArrow className='size-[24px] rotate-180 fill-black' />
              </Button>
              <Button variant='outline' size='sm'>
                <Image
                  src='/icon/ai-icon.svg'
                  alt='ai-icon'
                  width={24}
                  height={24}
                />
                AI 요약하기
              </Button>
            </div>
          </ArchiveCard>
        ))}
      </div>

      <div className='pb-[36px] pt-[16px]'>
        <PaginationGroup totalPage={10} />
      </div>
    </>
  );
}
