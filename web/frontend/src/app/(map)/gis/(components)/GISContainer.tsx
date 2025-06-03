'use client';

import React from 'react';
import type { MapContainerProps } from 'react-leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import type { Map } from 'leaflet';

import { LatLngBounds } from 'leaflet';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  mapRef?: React.Ref<Map | null>;
  children?: React.ReactNode;
  getLocation: { x: number; y: number };
  height?: number;
  width?: number;
  whenReady?: MapContainerProps['whenReady'];
};

export default function GISContainer({
  whenReady,
  mapRef,
  children,
  width,
  height,
}: MapProps) {
  const defaultBounds: LatLngBounds = new LatLngBounds(
    [38.6, 124.6], // 남서쪽 좌표 (위도, 경도)
    [33.0, 131.9], // 북동쪽 좌표 (위도, 경도)
  );

  return (
    <MapContainer
      id='gis-map'
      ref={mapRef}
      className='leaflet-container h-full w-full'
      zoom={10}
      scrollWheelZoom={true}
      bounds={defaultBounds}
      style={{
        height: height ? `${height}px` : '100%',
        width: width ? `${width}px` : '100%',
      }}
      whenReady={whenReady}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {children}
    </MapContainer>
  );
}
