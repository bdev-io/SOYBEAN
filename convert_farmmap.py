import ee
import geemap, os
import geopandas as gpd
import pandas as pd
from shapely.geometry import Polygon, MultiPolygon
import json


ee.Authenticate()
ee.Initialize(project="ee-kuuwange")

DATA_PATH = "./dataset/"


feather_file_path = os.path.join(DATA_PATH, '행정동_법정동결합_farmmap_cleaned.feather')

boundary_gdf = gpd.read_feather(feather_file_path)


# BOUNDARY_GDF의 내용을 변환하고 재정리
boundary_gdf = boundary_gdf[boundary_gdf['farmmap'].apply(lambda x: len(x) > 0)]
def extract_farmmap_info(farmmap_list):
    return [
        {
            'UID': item.get('UID'),
            'geometry': item.get('geometry'),
            '면적': item.get('면적'),
            '법정동주소': item.get('법정동주소'),
            '팜맵ID': item.get('팜맵ID')
        }
        for item in farmmap_list
        if isinstance(item, dict)
    ]

boundary_gdf['farmmap'] = boundary_gdf['farmmap'].apply(extract_farmmap_info)


collapsed_gdf = gpd.read_feather(os.path.join(DATA_PATH, 'SATELITE', f'NDVI_{YEAR}.feather'))

#collapsed_gdf = collapsed_gdf[['adm_cd', 'value', 'name']]




farmmap_collapsed = collapsed_gdf.merge(boundary_gdf, on='adm_cd', how='right')

print (farmmap_collapsed.size)
farmmap_collapsed.sample(2)


def convert_to_multipolygon(geom):
  multipolygon_coords = []
  for polygon in geom:
    coords = [(pt['x'], pt['y']) for pt in polygon['xy']]
    multipolygon_coords.append([coords])  # Single polygon ring
  return MultiPolygon([Polygon(p[0]) for p in multipolygon_coords])

def convert_to_gps_polygon(raw_data):
  # shapely MultiPolygon으로 변환
  # GeoDataFrame 생성
  features = []
  for index, row in raw_data.iterrows():
    print (f"\r{index}/{raw_data.shape[0]}", end="")
    #target_row = row['farmmap']
    # print (item)
    target_row = row['farmmap']
    for item in target_row:
      geom = convert_to_multipolygon(item['geometry'])
      props = {k: v for k, v in item.items() if k != 'geometry'}
      props['geometry'] = geom
      features.append(props)
  farmmap_gdf = gpd.GeoDataFrame(features, crs='EPSG:5179')  # TM 좌표계 (Korea) / 팜맵 전역에서 5179 좌표계 사용중

  farmmap_gdf_4326 = farmmap_gdf.to_crs(epsg=4326) # 위경도 재투영
  return farmmap_gdf_4326



farmmap_raw = farmmap_collapsed.head(500)

farmmap_gdf = convert_to_gps_polygon(farmmap_raw)

FARMMAP_JSON_PATH = os.path.join(DATA_PATH, "farmmap.geojson")
farmmap_gdf.to_file(FARMMAP_JSON_PATH, driver="GeoJSON")
