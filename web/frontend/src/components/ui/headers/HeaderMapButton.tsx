'use client';

import { usePathname, useRouter } from 'next/navigation';

import IconMap from '@comp/icons/IconMap';
import { Button } from '@comp/ui/button';

export default function HeaderMapButton() {
  const router = useRouter();
  const pathName = usePathname();

  const isGisPage = pathName.startsWith('/gis');
  console.log('Current path:', pathName, 'Is GIS page:', isGisPage);
  const handleMapToggle = () => {
    if (isGisPage) {
      router.push('/'); // Navigate to the main page if currently on GIS page
    } else {
      router.push('/gis'); // Navigate to the GIS page if currently on main page
    }
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      className='size-8 cursor-pointer rounded-md hover:bg-gray-100'
      aria-label='Map toggle button'
      onClick={handleMapToggle}
    >
      <IconMap
        className={`size-4  ${isGisPage ? 'fill-blue-600' : 'fill-icon-default'}`}
      />
    </Button>
  );
}
