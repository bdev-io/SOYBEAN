### target.csv -> weekly.csv / annualy.csv 두가지 파일로 만듬

import pandas as pd

# 압축된 .gz 파일 로딩 (탭 구분)
df = pd.read_csv("target.csv")

pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', None)


## print type info

df.dtypes

cdf = df.copy()
numeric_columns = pd.to_numeric(cdf['VALUE'].str.replace(',', '', regex=True), errors='coerce')
cdf['VALUE'] = numeric_columns
cdf['VALUE'] = cdf['VALUE'].astype(float)

cdf['VALUE'].head(5)


df.sample(5)


## Weekly Frequency Data

wdf = cdf[cdf["FREQ_DESC"] == "WEEKLY"].copy().groupby(["COMMODITY_DESC", "YEAR", "LOCATION_DESC", "REFERENCE_PERIOD_DESC", "DOMAIN_DESC", "STATISTICCAT_DESC", "UNIT_DESC"]).agg({
    "VALUE": "sum",
})

wdf.sample(10, random_state=42)


wdf.to_csv("dataset/weekly.csv", index=True)


ydf = cdf[cdf["FREQ_DESC"] == "ANNUAL"].copy().groupby(["COMMODITY_DESC", "YEAR", "LOCATION_DESC", "DOMAIN_DESC", "STATISTICCAT_DESC", "UNIT_DESC"]).agg({
    "VALUE": "sum",
})

ydf.sample(10)

ydf.to_csv("dataset/annualy.csv", index=True)
