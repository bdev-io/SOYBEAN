'use client';

import dynamic from 'next/dynamic';

export default function MinimapComponent() {
  const GISContainer = dynamic(
    async () => import('@app/(map)/gis/(components)/GISContainer'),
    {
      ssr: false,
    },
  );

  const getLocation = { x: 37.5665, y: 126.978 }; // Example coordinates for Seoul

  return (
    <div className='h-full w-full'>
      <GISContainer getLocation={getLocation} />
    </div>
  );
}
