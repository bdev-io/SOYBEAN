'use client';

import Image from 'next/image';
import React from 'react';
import HeaderMapButton from './HeaderMapButton';
import HeaderNotificationButton from './HeaderNotificationButton';
import HeaderSearchBar from './HeaderSearchBar';
import { useRouter } from 'next/navigation';

export default function Header() {

  const router = useRouter();

  return (
    <div className='font-suit flex h-[64px] w-full items-center p-[26px] text-[21.698px] font-[800] not-italic leading-[27px] justify-between pr-[32px]'>
      <button onClick={() => router.push('/')} className='flex items-center cursor-pointer'>
        <div className='shrink-0 pr-[7px]'>
          <Image src='/icon/logo.svg' alt='home' width={32.774} height={25.792} />
        </div>
        <span className='pr-[5.25px]'>P4R4D0XB0X</span>
      </button>

      <div className='flex items-center gap-[16px]'>
        <HeaderSearchBar />
      </div>

      <div className='flex items-center gap-[4px]'>
        <HeaderMapButton />
        <HeaderNotificationButton hasNotification={true} />
      </div>
    </div>
  );
}
