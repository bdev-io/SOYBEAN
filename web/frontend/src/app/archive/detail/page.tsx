'use client';

import { notFound, useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import React from 'react';

import { Button } from '@comp/ui/button';

import ArchiveDetail from './(components)/ArchiveDetail';

export default function ArchiveDetailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get('id');

  if (!id) return notFound();

  return (
    <div className='flex flex-col px-[48px] py-[36px]'>
      <div className='font-heading2-bold pb-[24px] text-[#0a0a0a]'>
        관리자 자료 관리
      </div>

      <div className='flex flex-col gap-[24px]'>
        <Button
          variant='outline'
          size='lg'
          className='size-fit'
          onClick={() => router.back()}
        >
          목록
        </Button>

        <ArchiveDetail />
      </div>
    </div>
  );
}
