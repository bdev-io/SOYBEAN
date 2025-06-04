'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import type { GeoJsonObject } from 'geojson';
import type { Map as LeafletMap } from 'leaflet';

import type { ToolTipProperties } from './gisTooltip';

import parseGeoraster from 'georaster';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import { CRS, geoJSON, LatLngBounds } from 'leaflet';

import { gisToolTip } from './gisTooltip';

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
          color: '#00aa00',
          weight: 2,
          opacity: 0.7,
          fillOpacity: 0,
        },
      });
      geoJsonData.addTo(mapRef.current);

      const responseResult = await fetch('https://s3.ql.gl/result.geojson');
      const dataResult = await responseResult.json();
      const geoResultJsonData = geoJSON(
        dataResult as unknown as GeoJsonObject,
        {
          pane: 'overlayPane',
          style: {
            color: '#ffffff',
            weight: 2,
            opacity: 0.2,
            fillOpacity: 0.1,
          },
          onEachFeature: (feature, layer) => {
            if (feature.properties) {
              layer.bindTooltip(
                gisToolTip(feature.properties as unknown as ToolTipProperties),
                {
                  permanent: false,
                  interactive: false,
                  direction: 'center',
                  className: 'custom-tooltip',
                },
              );
            }
          },
        },
      );
      geoResultJsonData.addTo(mapRef.current);

      const _getMap = async (fileName: string): GeoRasterLayer => {
        const fileUrl = `https://s3.ql.gl/tiff/${fileName}.tif`;
        const response = (await fetch(fileUrl)).arrayBuffer();
        const geoRaster = await parseGeoraster(response);
        const modisLayer = new GeoRasterLayer({
          georaster: geoRaster,
          pixelValuesToColorFn: (values: any) => {
            const ndvi = values[0];
            if (ndvi < 0.2) return 'blue'; // Water
            if (ndvi < 0.4) return 'green'; // Vegetation
            if (ndvi < 0.6) return 'yellow'; // Cropland
            return 'red'; // Urban or barren land
          },
          resolution: 30,
          bounds: defaultBounds,
          updateWhenIdle: true,
        });
        return modisLayer;
      };

      console.log('Adding MODIS layer to map');
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
