import Image from 'next/image';

import { Button } from '@comp/ui/button';

export function UrlUploadForm() {
  return (
    <>
      <div className='flex gap-[10px] pb-[16px] pt-[24px]'>
        <Image
          src='/icon/clipboard-icon.svg'
          alt='clipboard icon'
          width={24}
          height={24}
        />
        <p className='font-body1-semibold text-gray-60'>URL로 업로드</p>
      </div>

      <div className='flex items-center rounded-[6px] border p-[8px] pl-[20px]'>
        <input
          type='text'
          placeholder='여기에 URL을 붙여 넣으세요.'
          className='font-body2-regular placeholder-gray-40 flex-1 outline-none'
        />
        <Button className='text-gray-10 px-[24px] py-[12px]'>
          링크 업로드
        </Button>
      </div>
    </>
  );
}
