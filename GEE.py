# 행정동 경계 추가
import geemap
import ee
import os
import tqdm
import pandas as pd
import numpy as np
import geopandas as gpd


ee.Authenticate()
ee.Initialize(project="ee-kuuwange")

start_date = "2016-04-01"
end_date = "2016-08-31"

# Sentinel-2 데이터셋을 필터링하여 가져옴
images = (
    # ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    ee.ImageCollection("NASA/HLS/HLSS30/v002")
    # .filter(combined_filter)
    .filterDate(start_date, end_date)
    # .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 5))
    .filter(ee.Filter.lt("CLOUD_COVERAGE", 20))
    .filterBounds(
        ee.Geometry.Polygon(
            [
                [
                    [126.0, 33.0],
                    [129.0, 33.0],
                    [129.0, 38.0],
                    [126.0, 38.0],
                    [126.0, 33.0],
                ]
            ]
        )
    )  # 한국 전역을 커버하는 경계
    # .map(mask_s2_clouds)
)


# NDVI / NDRE / EVI 지수 추가


def add_ndvi(image):
    ndvi = image.normalizedDifference(["B8", "B4"]).rename("NDVI")
    return image.addBands(ndvi)


def add_ndre(image):
    ndre = image.normalizedDifference(["B8", "B5"]).rename("NDRE")
    return image.addBands(ndre)


def add_evi(image):
    evi = image.expression(
        "2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))",
        {
            "NIR": image.select("B8"),
            "RED": image.select("B4"),
            "BLUE": image.select("B2"),
        },
    ).rename("EVI")
    return image.addBands(evi)


print("Image List: ", images.size().getInfo())


# 이미지 년도에 맞춰 다시 가져오도록
def update_image(year):
    global images, cleaned_collection, ndvi_median, ndre_median, evi_median
    start_date = f"{year:04d}-04-01"
    end_date = f"{year:04d}-08-31"
    images = (
        # ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
        ee.ImageCollection("NASA/HLS/HLSS30/v002")
        # .filter(combined_filter)
        .filterDate(start_date, end_date)
        # .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 5))
        .filter(ee.Filter.lt("CLOUD_COVERAGE", 20))
        .filterBounds(
            ee.Geometry.Polygon(
                [
                    [
                        [126.0, 33.0],
                        [129.0, 33.0],
                        [129.0, 38.0],
                        [126.0, 38.0],
                        [126.0, 33.0],
                    ]
                ]
            )
        )  # 한국 전역을 커버하는 경계
        # .map(mask_s2_clouds)
    )
    cleaned_collection = images.map(add_ndvi).map(add_ndre).map(add_evi)
    ndvi_median = cleaned_collection.select("NDVI").median()
    ndre_median = cleaned_collection.select("NDRE").median()
    evi_median = cleaned_collection.select("EVI").median()


update_image(2016)


DATA_PATH = os.path.join("./", "dataset")

json_file_path = os.path.join(DATA_PATH, "행정동경계.geojson")


gdf = gpd.read_file(json_file_path)


# 한번에 1000 개씩 가져와서 연산

total_gdf_size = gdf.size


targets = ["NDVI", "NDRE", "EVI"]

# 연도별로 처리

for year in range(2016, 2024 + 1):
    update_image(year)
    print(f"YEAR: {year:04d}")
    for target in targets:
        target_median = cleaned_collection.select(target).median()
        # 행정동별 평균 NDVI 계산
        # zoned_target = target_median.reduceRegions(
        #     collection=boundary_fc,
        #     reducer=ee.Reducer.mean(),
        #     scale=30
        # )

        # 합쳐질 DF
        collapsed_gdf = None

        for start_index, end_index in tqdm.tqdm(
            zip(range(0, total_gdf_size, 200), range(
                200, total_gdf_size + 1, 200)),
            desc=f"Processing {target}",
            total=total_gdf_size // 200,
        ):
            if end_index > total_gdf_size:
                end_index = total_gdf_size

            gdf_subset = gdf.iloc[start_index:end_index]

            filtered_fc = geemap.gdf_to_ee(gdf_subset)
            valid_fc = filtered_fc.filter(ee.Filter.notNull([".geo"]))

            zoned = target_median.reduceRegions(
                valid_fc, ee.Reducer.median(), scale=30)

            # print (zoned.first().getInfo())

            def strip_geometry(feature):
                feature = ee.Feature(feature)
                adm_cd = feature.get("adm_cd")
                adm_nm = feature.get("adm_nm")
                target_feature = feature.get("median")
                # geometry 제거 + 필요한 속성만 새로 설정
                return ee.Feature(
                    None, {"adm_cd": adm_cd, "adm_nm": adm_nm,
                           "value": target_feature}
                )

            zoned = zoned.map(strip_geometry)
            zoned_df = geemap.ee_to_gdf(zoned)
            choropleth_gdf = gdf.merge(zoned_df, on="adm_cd", how="right")
            choropleth_gdf = choropleth_gdf[
                ["adm_cd", "adm_nm_x", "value", "geometry_x"]
            ]
            choropleth_gdf.rename(
                columns={"adm_nm_x": "name", "geometry_x": "geometry"}, inplace=True
            )

            if collapsed_gdf is None:
                collapsed_gdf = choropleth_gdf.copy()
            else:
                collapsed_gdf = pd.concat(
                    [collapsed_gdf, choropleth_gdf], ignore_index=True
                )
            collapsed_gdf.to_csv(
                os.path.join(DATA_PATH, "SATELITE", target, f"{target}_{year:04d}_{end_index:05d}.csv"), index=False
            )

        collapsed_gdf.to_csv(
            os.path.join(DATA_PATH, "SATELITE", f"{target}_{year:04d}.csv"), index=False
        )

