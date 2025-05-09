import cdsapi


def download_era5(year, month):
    client = cdsapi.Client()
    dataset = "reanalysis-era5-single-levels"
    target = f"ERA5/kor/{year.zfill(4)}_{str(month).zfill(2)}.grib"

    request = {
        "product_type": ["reanalysis"],
        "variable": [
            "2m_temperature",
            "total_precipitation",
            "skin_temperature",
            "downward_uv_radiation_at_the_surface",
            "surface_solar_radiation_downwards",
            "soil_temperature_level_1",
            "soil_temperature_level_2",
            "soil_type",
            "volumetric_soil_water_layer_1",
            "volumetric_soil_water_layer_2",
            "high_vegetation_cover",
            "leaf_area_index_high_vegetation",
            "leaf_area_index_low_vegetation",
            "low_vegetation_cover",
        ],
        "year": year.zfill(4),
        "month": [str(month).zfill(2)],
        "day": [f"{d:02d}" for d in range(1, 32)],
        "time": [
            "00:00",
            "03:00",
            "06:00",
            "09:00",
            "12:00",
            "15:00",
            "18:00",
            "21:00",
        ],
        #"area": [49.384358, -125.0, 24.396308, -66.93457],  # 북미 대륙 범위 추정
        "area": [38.6, 124.6, 33.0, 131.9],                  # 한국 범위
        "data_format": "grib",
        "download_format": "unarchived",
    }

    client.retrieve(dataset, request, target)


# 실행 루프 예시
for year in range(2000, 2025):
    for month in range(1, 3):  # 혹은 월별 선택
        print(f"Downloading data for {year}-{month:02d}...")
        download_era5(str(year), month)
        print(f"Downloaded data for {year}-{month:02d}")
