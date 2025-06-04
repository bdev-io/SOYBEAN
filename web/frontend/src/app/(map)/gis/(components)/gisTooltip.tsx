import type { JSX } from 'react';
import ReactDOMServer from 'react-dom/server';

import { cn } from '@lib/utils';

export type ToolTipProperties = {
  sidonm: string;
  sggnm: string;
  farmmap_count: number;
};

export function gisToolTip({
  sidonm,
  sggnm,
  farmmap_count,
}: ToolTipProperties): string {
  const tooltipContent: JSX.Element = (
    <div
      className={cn(
        'y-[0px] relative z-50 m-0 h-64 w-72 overflow-hidden',
        "rounded-sm bg-black/70 p-0 font-['Pretendard'] text-[12px] text-white",
      )}
    >
      {/* 상단 타이틀 */}
      <div className='absolute left-3 top-4 flex w-[90%] items-center justify-between'>
        <div className='flex items-center gap-1'>
          <svg width='6' height='6' viewBox='0 0 6 6' fill='none'>
            <circle cx='3' cy='3' r='2.5' fill='#FFE345' />
          </svg>
          <span className='text-[15px] font-semibold leading-[10px]'>
            {sidonm} {sggnm}
          </span>
        </div>
      </div>

      {/* 구분선 */}
      <div className='absolute left-[12px] top-[60px] h-[2px] w-[272] bg-gray-400 opacity-50'></div>

      {/* 내용 */}
      <div className='absolute left-[16px] top-[72px] flex w-[260] flex-col gap-1'>
        <div className='flex justify-between'>
          <span>논 / 밭</span>
          <span>{farmmap_count}구</span>
        </div>
        <div className='flex justify-between'>
          <span>논 / 밭 면적</span>
          <span>{(0.0).toFixed(1)} ha</span>
        </div>
        <div className='flex justify-between'>
          <span>추정 생산량 (ton/acre)</span>
          <span>
            <span>[ton/10a] </span>
            <span className='text-indigo-300'>({(0.0).toFixed(1)}%)</span>
          </span>
        </div>
        <div className='flex justify-between'>
          <span className='w-32'>데이터 기준일</span>
          <span></span>
        </div>
        <div className='flex justify-between'>
          <span>최근 장애유형</span>
          <span className='text-right'></span>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className='absolute bottom-2 left-2 flex gap-2'>
        <button className='w-32 rounded bg-black/60 px-2 py-1 text-[13px] font-medium text-white'>
          데이터 열람
        </button>
      </div>
    </div>
  );

  return ReactDOMServer.renderToString(tooltipContent);
}
