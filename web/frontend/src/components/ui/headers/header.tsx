'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { cn } from '@lib/utils';

import HeaderHelpButton from './HeaderHelpButton';
import HeaderMapButton from './HeaderMapButton';
import HeaderNotificationButton from './HeaderNotificationButton';
import HeaderSearchBar from './HeaderSearchBar';

export default function Header() {
  const router = useRouter();

  const pathName = usePathname();

  const isGisPage = pathName.startsWith('/gis');
  const backgroundColor = isGisPage ? 'bg-[#111]' : 'bg-[#FFFFFF]';

  const titleText = isGisPage ? 'P4R4D0XB0X-GIS' : 'P4R4D0XB0X-DASH';
  return (
    <div
      className={cn(
        'font-suit flex h-[64px] w-full items-center justify-between p-[26px] pr-[32px] text-[21.698px] font-[800] not-italic leading-[27px]',
        backgroundColor,
        isGisPage && 'text-white',

        'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
      )}
    >
      <button
        type='button'
        onClick={() => router.push('/')}
        className={cn('flex cursor-pointer items-center')}
      >
        <div className='shrink-0 pr-[7px]'>
          <Image
            src='/icon/logo.svg'
            alt='home'
            width={32.774}
            height={25.792}
          />
        </div>
        <span className='pr-[5.25px]'>{titleText}</span>
      </button>

      <div className='flex items-center gap-[16px]'>
        <HeaderSearchBar isGisPage={isGisPage} />
        <HeaderHelpButton />
        <HeaderMapButton />
        <HeaderNotificationButton hasNotification={true} />
      </div>
    </div>
  );
}
