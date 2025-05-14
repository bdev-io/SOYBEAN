#!pip3 install pygrib numpy pandas xarray

import pygrib
import numpy as np
import pandas as pd
import xarray as xr

grb = pygrib.open('./ERA5/raw/2000_01.grib')

print(grb.tell())
