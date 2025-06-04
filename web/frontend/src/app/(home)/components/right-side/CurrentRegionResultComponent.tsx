type RegionStatus = {
  name: string;
  value: number;
  status: '정상' | '양호' | '경고' | '-' | null;
};

const statusColorMap: Record<string, string> = {
  정상: '#2DE100',
  양호: '#0083E1',
  경고: '#FF2045',
  '-': '#BDBDBD',
};

const regionData: RegionStatus[] = [
  { name: '영광군', value: 508, status: '정상' },
  { name: '광주광역시', value: 498, status: '양호' },
  { name: '나주시', value: 456, status: '-' },
  { name: '곡성군', value: 500, status: '정상' },
  { name: '고흥군', value: 406, status: '경고' },
];

export default function CurrentRegionResultStatusComponent() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-4 p-2'>
      <h2 className='mb-2 text-sm font-semibold text-black'>
        [전남] 지역 주요 생산량 추정치 (ton/acre)
      </h2>
      <div className='flex items-center justify-start gap-6 overflow-x-auto'>
        {regionData.map(({ name, value, status }, index) => (
          <div
            key={name}
            className='flex min-w-[60px] flex-col items-center gap-1 text-xs text-gray-700'
          >
            <span>{name}</span>
            <span className='text-sm font-bold text-black'>{value}</span>
            <div className='flex items-center gap-1 text-[10px]'>
              <span className='text-gray-600'>{status}</span>
              {status && status !== '-' && (
                <svg width='6' height='6' viewBox='0 0 6 6' fill='none'>
                  <circle cx='3' cy='3' r='2.5' fill={statusColorMap[status]} />
                </svg>
              )}
            </div>
            {index < regionData.length - 1 && (
              <div className='h-8 w-px bg-gray-400 opacity-30' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
