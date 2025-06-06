'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import type { GeoJsonObject, Geometry } from 'geojson';
import type { GeoJSONOptions, Map as LeafletMap } from 'leaflet';

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

  const appendGeoJson = async (
    geoJsonUrl: string,
    options: GeoJSONOptions<any, Geometry> | null,
  ) => {
    const result = await fetch(geoJsonUrl);
    const dataResult = await result.json();
    const fmGeoJson = geoJSON(dataResult as unknown as GeoJsonObject, options);
    fmGeoJson.addTo(mapRef.current!);
    return fmGeoJson;
  };

  const getPartial = async (idx: number) => {
    const partial = await appendGeoJson(
      `https://s3.ql.gl/GEOJSON/part_${idx.toString().padStart(4, '0')}.geojson`,
      {
        interactive: true,
        style: {
          pane: 'overlayPane',
          interactive: true,
          color: '#00ffff',
          weight: 2,
          opacity: 1.0,
          fillOpacity: 1,
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            const {
              UID,
              area_ha,
              area_predict,
              sidonm,
              면적,
              법정동주소,
              팜맵ID,
            } = feature.properties;
            layer.bindTooltip(
              `<div class="tooltip-content text-black rounded-all">
                <h1 class="tooltip-title">${sidonm}</h1>
                <p><strong>팜맵 ID:</strong> ${팜맵ID}</p>
                <p><strong>법정동 주소:</strong> ${법정동주소}</p>
                <p><strong>시군구 기준예측 생산량:</strong> ${area_predict.toFixed(1)} ton/10a</p>
                <p><strong>면적(m^2):</strong> ${면적.toFixed(2)} m^2</p>
                <p><strong>면적(acre):</strong> ${area_ha.toFixed(1)} ha</p>
                <p><strong>UID:</strong> ${UID}</p>
              </div>`,
              {
                opacity: 0.9,
                permanent: false,
                direction: 'top',
                className: 'custom-tooltip',
              },
            );
          }
        },
      },
    );
    return partial;
  };

  // NOTE: Load First Partial FarmMap
  const mapInitialized = async () => {
    if (mapRef.current) {
      await appendGeoJson('https://s3.ql.gl/county.geojson', {
        style: {
          color: '#00aa00',
          weight: 1,
          opacity: 0.3,
          fillOpacity: 0,
        },
      });

      await appendGeoJson(
        'https://s3.ql.gl/prediction_result_withoutFarmmap.geojson',
        {
          pane: 'overlayPane',
          style: {
            interactive: true,
            color: '#ffffff',
            weight: 2,
            opacity: 0.2,
            fillOpacity: 0.1,
          },
          onEachFeature: (feature, layer) => {
            if (feature.properties) {
              console.log(feature.properties);
              layer.bindPopup(
                gisToolTip(
                  layer,
                  feature.properties as unknown as ToolTipProperties,
                ),
                {
                  closeButton: true,
                  interactive: true,
                  closeOnEscapeKey: true,
                  autoPanPadding: [0, 0],
                  pane: 'popupPane',
                  className: 'custom-popup',
                },
              );
              layer.on('closePopup', () => {
                console.log('Popup closed');
                layer.closePopup();
              });
            }
          },
        },
      );

      Array.from({ length: 20 })
        .fill(0)
        .map((_, idx) => idx + 1)
        .forEach((idx) => {
          getPartial(idx).then((partial) => {
            console.log(`Partial ${idx} loaded`, partial);
          });
        });

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
