import { Button } from '@comp/ui/button';

import { UploadTipTooltip } from './UploadTipTooltip';

export function UploadToolbar() {
  return (
    <div className='flex items-start justify-between pt-[20px]'>
      <UploadTipTooltip />
      <Button className='font-body1-regular w-[160px] font-medium' size='lg'>
        분석 시작
      </Button>
    </div>
  );
}
