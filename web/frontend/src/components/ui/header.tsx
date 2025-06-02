import Image from 'next/image';
import React from 'react';

export default function Header() {
  return (
    <div className='font-suit flex h-[64px] w-full items-center border-b p-[26px] text-[21.698px] font-[800] not-italic leading-[27px]'>
      <div className='shrink-0 pr-[7px]'>
        <Image src='/icon/logo.svg' alt='logo' width={32.774} height={25.792} />
      </div>
      <span className='pr-[5.25px] text-[#276BFF]'>AI</span>
      <span className='text-black'>김교수</span>
    </div>
  );
}
