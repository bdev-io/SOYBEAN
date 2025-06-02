import React from 'react';

import { Thread } from '@comp/assistant-ui/thread';
import IconQuestion from '@comp/icons/IconQuestion';
import { Switch } from '@comp/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@comp/ui/tooltip';

export default function ArchiveChat() {
  return (
    <div className='relative size-full'>
      <div className='flex-center absolute right-[24px] top-[83px] z-10 flex-col gap-[8px] rounded-[12px] border p-[20px]'>
        <div className='flex items-center gap-[2px]'>
          <span className='font-body2-semibold'>RAG 활성화</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <IconQuestion className='size-[16px] fill-black' />
              </TooltipTrigger>
              <TooltipContent side='bottom' align='end' className='p-[16px]'>
                <div className='font-body2-semibold text-gray-90 pb-[4px]'>
                  RAG 모드 활성화
                </div>
                <div className='font-body3-regular text-gray-80 font-[500] leading-[140%]'>
                  <p>
                    <span className='font-[700]'>RAG 모드</span>는 수업 내용을
                    기반으로 더 정확하고 맥락에 맞는 답변을 제공합니다.
                  </p>
                  <p>선택한 사용자에 관련된 질문에 특화되어있습니다.</p>
                  <br />
                  <p>
                    <span className='font-[700]'>RAG 모드를 비활성화</span>하면
                    일반적인 AI 답변을 받을 수 있습니다.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <label className='flex cursor-pointer items-end gap-[4px]'>
          <span className='font-body3-regular w-[50px]'>내자료</span>
          <Switch />
        </label>
        <label className='flex cursor-pointer items-end gap-[4px]'>
          <span className='font-body3-regular w-[50px]'>경쟁그룹</span>
          <Switch />
        </label>
      </div>

      <Thread />
    </div>
  );
}
