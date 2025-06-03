'use client';
import dynamic from 'next/dynamic';

export default function GisPage() {
  const DynamicMap = dynamic(async () => import('@comp/map/Map'), {
    ssr: false,
  });

  // Korean
  const getLocation = { x: 37.5665, y: 126.978 }; // Example coordinates for Seoul

  return (
    <>
      <DynamicMap getLocation={getLocation} />
    </>
  );
}
