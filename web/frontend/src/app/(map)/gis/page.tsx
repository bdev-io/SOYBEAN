'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';

import type { Map as LeafletMap } from 'leaflet';

export default function GisPage() {
  const GISContainer = dynamic(
    async () => import('./(components)/GISContainer'),
    {
      ssr: false,
    },
  );

  // Korean
  const getLocation = { x: 37.5665, y: 126.978 }; // Example coordinates for Seoul

  const [width, setWidth] = React.useState(100);
  const [height, setHeight] = React.useState(100);

  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    if (typeof window != 'undefined') {
      window.addEventListener('resize', handleResize);
      handleResize(); // Set initial size
    }

    return () => {
      if (typeof window != 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <>
      <GISContainer
        getLocation={getLocation}
        width={width}
        height={height}
        mapRef={mapRef}
        whenReady={() => {
          console.log('Map is ready');
          if (mapRef.current) {
            console.log('Map reference:', mapRef.current);
          }
        }}
      />
    </>
  );
}
