import { Button } from '@comp/ui/button';

export function UploadTypeButtons() {
  return (
    <div className='flex gap-[16px] pb-[20px]'>
      <Button
        variant='primaryOutline'
        className='hover:bg-blue-light-hover bg-gray-5 border-gray-30 font-body1-semibold text-gray-40 flex-1/2 h-[76px] p-[10px]'
      >
        내 파일 업로드
      </Button>
      <Button
        variant='primaryOutline'
        className='hover:bg-blue-light-hover bg-gray-5 border-gray-30 font-body1-semibold text-gray-40 flex-1/2 h-[76px] p-[10px]'
      >
        경쟁그룹 파일 업로드
      </Button>
    </div>
  );
}
