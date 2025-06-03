'use client';

import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  children?: React.ReactNode;
  getLocation: { x: number; y: number };
};

const Map = ({ getLocation, children }: MapProps) => {
  return (
    <MapContainer
      center={[getLocation.x, getLocation.y]}
      zoom={10}
      scrollWheelZoom={true}
      style={{ width: '100%', height: '550px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {children} // ✅ check
    </MapContainer>
  );
};

export default Map;
