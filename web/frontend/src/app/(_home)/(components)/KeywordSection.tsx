import React from 'react';

import { Badge } from '@comp/ui/badge';

export default function KeywordSection() {
  return (
    <div className='flex gap-[20px] px-[32px] py-[18px]'>
      <Badge className='text-blue-normal-active bg-blue-light rounded-[4px]'>
        핵심 키워드
      </Badge>
      <div className='flex gap-[8px]'>
        <span>AI,</span>
        <span>태양광,</span>
        <span>예측</span>
      </div>
    </div>
  );
}
