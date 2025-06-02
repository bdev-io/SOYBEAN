import Image from 'next/image';

import { Tooltip, TooltipContent, TooltipTrigger } from '@comp/ui/tooltip';

export function UploadTipTooltip() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className='flex gap-[4px]'>
          <Image
            src='/icon/question-icon.svg'
            alt='question icon'
            width={16}
            height={16}
          />
          <p className='font-body2-regular text-gray-50'>자료 업로드 방법</p>
        </div>
      </TooltipTrigger>
      <TooltipContent
        className='flex w-[416px] flex-col gap-[4px]'
        side='bottom'
        align='start'
      >
        <div className='font-body2-semibold'>자료 업로드 방법</div>
        <div className='font-button2-medium leading-[140%]'>
          <p>내 자료인지, 경쟁 그룹 자료인지 먼저 선택해 주세요.</p>
          <p>파일은 여러 개 한 번에 올릴 수 있어요.</p>
          <p>형식을 선택하면 AI가 바로 분석해줘요.</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
