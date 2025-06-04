'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import type { GeoJsonObject } from 'geojson';
import type { Map as LeafletMap } from 'leaflet';

import { CRS, geoJSON, LatLngBounds } from 'leaflet';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  children?: React.ReactNode;
  getLocation: { x: number; y: number };
  height?: number;
  width?: number;
};

export default function GISContainer({ children, width, height }: MapProps) {
  const [isUpdated, forceUpdate] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const defaultBounds: LatLngBounds = new LatLngBounds(
    [38.6, 124.6], // 남서쪽 좌표 (위도, 경도)
    [33.0, 131.9], // 북동쪽 좌표 (위도, 경도)
  );

  console.log(mapRef);

  const mapInitialized = async () => {
    if (mapRef.current) {
      console.log('Map initialized:', mapRef.current);
      const response = await fetch('https://s3.ql.gl/county.geojson');
      const data = await response.json();
      const geoJsonData = geoJSON(data as unknown as GeoJsonObject, {
        style: {
          color: '#3388ff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.2,
        },
      });

      geoJsonData.addTo(mapRef.current);
    }
  };

  useEffect(() => {
    if (isUpdated && mapRef.current) {
      mapInitialized()
        .then(() => {
          console.log('Map and GeoJSON data loaded successfully');
        })
        .catch((error) => {
          console.error('Error initializing map:', error);
        });
    }
  }, [isUpdated]);

  return (
    <MapContainer
      ref={mapRef}
      id='gis-map'
      maxBounds={defaultBounds}
      trackResize={true}
      crs={CRS.EPSG3857}
      className='leaflet-container h-full w-full'
      zoom={10}
      scrollWheelZoom={true}
      inertia={true}
      bounds={defaultBounds}
      style={{
        height: height ? `${height}px` : '100%',
        width: width ? `${width}px` : '100%',
      }}
      whenReady={() => {
        forceUpdate(() => true); // Trigger a re-render after the map is ready
      }}
    >
      <TileLayer
        url='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
        attribution='Google Satellite'
        maxZoom={20}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      />

      <TileLayer
        url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        maxZoom={20}
        minZoom={5}
      />

      {children}
    </MapContainer>
  );
}
