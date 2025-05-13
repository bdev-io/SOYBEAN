import os, time
import requests
import pandas as pd


df = pd.read_csv('dataset/country_map_kr.csv', encoding='utf-8', index_col=0)

print (df)

def get_loc(addr):

    headers = {
        'Authorization': 'KakaoAK ' + os.getenv('REST_API_KEY', ''),
    }

    params = {
        'query': '대구광역시 동구 금강동',
    }
    params = {
        'query': '대구광역시 동구 금강동',
    }
    response = requests.get('https://dapi.kakao.com/v2/local/search/address.json', params=params, headers=headers)

    if response.status_code == 200:
        data = response.json()
        if data['documents']:
            x = data['documents'][0]['x']
            y = data['documents'][0]['y']

            lat = y
            lon = x
            return lat, lon
        else:
            print(f'No results found for {addr}')
    else:
        print(f'Error: {response.status_code} - {response.text}')

print(get_loc('대구광역시 동구 금강동'))


ndf = df.copy()

ndf['위도'] = None
ndf['경도'] = None

print (ndf)

for idx, row in df.iterrows():
    time.sleep(0.1)
    sido = row['시도']
    sigun = row['시군']
    eupmyun = row['읍면동']
    area = row['면적_ha']

    addr = f'{sido} {sigun} {eupmyun}'

    try:
        lat, lon = get_loc(addr)

        print(f'Coordinates for {addr}: ({lat}, {lon})')

        ndf.at[idx, '위도'] = lat
        ndf.at[idx, '경도'] = lon
    except Exception as e:
        # Handle Ctrl+C
        if isinstance(e, KeyboardInterrupt):
            print("Process interrupted by user.")
            break

        print (e)
        ndf.at[idx, '위도'] = None
        ndf.at[idx, '경도'] = None
        print(f'Error occurred for {addr}')

    if idx % 10 == 0:
        print(f'Processed {idx} rows')
        ndf.to_csv('dataset/country_map_kr_with_loc.csv', encoding='utf-8')




