'use client';

import Image from 'next/image';

import IconReset from '@comp/icons/IconReset';
import { Button } from '@comp/ui/button';

export default function AIAssistant() {
  return (
    <div className='bg-gray-10 h-[467px] w-full overflow-hidden rounded-[12px] border'>
      <div className='font-body1-semibold flex w-full items-center justify-between border-b px-[24px] py-[15px]'>
        <div className='flex items-center gap-[8px]'>
          AI 어시스턴트
          <Image src='/icon/ai-icon.svg' width={17} height={17} alt='ai-icon' />
        </div>
        <div className='flex items-center gap-[10px]'>
          <Button
            variant='outline'
            size='sm'
            className='text-primary bg-[#F7FBFF]'
          >
            <IconReset className='fill-primary size-[24px]' />
            초기화
          </Button>
          <Button variant='outline' size='sm'>
            <Image
              src='/icon/ai-icon.svg'
              width={17}
              height={17}
              alt='ai-icon'
            />
            결과 자세히 보기
          </Button>
        </div>
      </div>

      <div className='flex h-[405px] flex-col px-[20px] py-[16px]'>
        {/* 메시지 출력 영역 (현재는 빈 상태) */}
        <div className='flex-1 overflow-auto'>
          {/* 향후 메시지 리스트 렌더링 될 곳 */}
        </div>
        {/* 입력창 */}
        <div className='bg-gray-5 flex items-center rounded-[6px] border p-[8px] pl-[20px]'>
          <input
            type='text'
            placeholder='AI 어시스턴트에게 궁금한 점을 물어보세요.'
            className='font-body2-regular placeholder-gray-40 flex-1 outline-none'
          />
          <Button className='text-gray-10 bg-[#C7D9FF] px-[24px] py-[12px]'>
            보내기
          </Button>
        </div>
      </div>
    </div>
  );
}
