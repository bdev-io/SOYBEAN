import pandas as pd

# 압축된 .gz 파일 로딩 (탭 구분)
df = pd.read_csv("qs.crops_20250506.txt", sep="\t", low_memory=False)



