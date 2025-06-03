import IconSearch from "@comp/icons/IconSearch";
import { Input } from "../input";

export default function HeaderSearchBar() {
  return (
    <div className='flex w-full flex-col gap-[12px] w-[192px]'>
      <div className='relative flex items-center gap-[10px]'>
        <IconSearch className='absolute top-1/2 left-0 size-[22px] translate-y-[-50%] fill-gray-60' />
        <Input
          variant='default'
          placeholder={'검색어를 입력해주세요'}
          className='py-[10px] pr-[16px] pl-[40px] font-body3-semibold'
        />
      </div>
    </div>
  );
}
