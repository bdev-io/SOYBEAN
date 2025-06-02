import React from 'react';

import { Button } from '@comp/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@comp/ui/select';

export default function ArchiveControls() {
  return (
    <div className='mb-[16px] flex items-center justify-between'>
      <Button variant='outline' disabled>
        다운로드
      </Button>

      <div className='flex items-center gap-[8px]'>
        <Select value='10'>
          <SelectTrigger className='w-[106px]'>
            <SelectValue placeholder='개수' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='10'>10개</SelectItem>
            <SelectItem value='20'>20개</SelectItem>
          </SelectContent>
        </Select>

        <Select value='upload'>
          <SelectTrigger className='w-[160px]'>
            <SelectValue placeholder='정렬' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='upload'>업로드순</SelectItem>
            <SelectItem value='old'>연도 오래된순</SelectItem>
            <SelectItem value='recent'>연도 최신순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
