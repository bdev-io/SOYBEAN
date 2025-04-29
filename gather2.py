import cdsapi

cds = cdsapi.Client()

years = list(range(1993, 2019 + 1)) # 1993년부터 2019년
months = ['{:02d}'.format(m) for m in range(1, 13)] # 1월부터 12월
#area = [50, 110, 20, 140] # 위도 경도 설정 [위도1, 경도1, 위도2, 경도2]
area = [50, -130, 24, -66] # 미국 지역 설정


for year in years:
    for month in months:
        file_name = f'ERA5/raw/download_{year}_{month}.nc' # 저장할 파일 이름 설정
        # c.retrieve(
        #     'reanalysis-era5-pressure-levels', # pressure level 데이터로 설정
        #     {
        #         'product_type': 'reanalysis',
        #         'format': 'netcdf',
        #         'variable': [ # 받을 변수 설정, 여기서는 지위고도, 온도, u wind, v wind를 받음
        #             'geopotential', 'temperature',
        #             'u_component_of_wind', 'v_component_of_wind',
        #         ],
        #         'pressure_level': [ #  연직층 설정, 200, 500, 850 hPa을 받음
        #             '200',
        #             '500',
        #             '850',
        #         ],
        #         'year': str(year), # 연도 설정
        #         'month': month, # 월 설정
        #         'day': [ # 일 설정
        #             '01', '02', '03',
        #             '04', '05', '06',
        #             '07', '08', '09',
        #             '10', '11', '12',
        #             '13', '14', '15',
        #             '16', '17', '18',
        #             '19', '20', '21',
        #             '22', '23', '24',
        #             '25', '26', '27',
        #             '28', '29', '30',
        #             '31',
        #         ],
        #         'time': [ #시간 설정
        #             '00:00', '01:00', '02:00',
        #             '03:00', '04:00', '05:00',
        #             '06:00', '07:00', '08:00',
        #             '09:00', '10:00', '11:00',
        #             '12:00', '13:00', '14:00',
        #             '15:00', '16:00', '17:00',
        #             '18:00', '19:00', '20:00',
        #             '21:00', '22:00', '23:00',
        #         ],
        #         'area': area, # 지역 설정
        #     },
        #     file_name, #저장할 파일 이름 설정
        # )

        cds.retrieve('reanalysis-era5-pressure-levels', {
           "variable": "temperature",
           "pressure_level": "1000",
           "product_type": "reanalysis",
            "date": "2017-12-01/2017-12-31",
            "area": area,
           "time": "12:00",
           "format": "grib"
       }, 'download.grib')
