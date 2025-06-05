type CoverageItem = {
  name: string;
  percentage: number;
  delta: number;
};

const coverageData: CoverageItem[] = [
  { name: 'Sentinel', percentage: 96.6, delta: 2.5 },
  { name: 'MODIS', percentage: 95.7, delta: -1.0 },
  { name: 'ERA5', percentage: 94.9, delta: -2.0 },
  { name: '생산량', percentage: 97.7, delta: 1.7 },
];

function formatDelta(delta: number) {
  const isPositive = delta >= 0;
  return (
    <span
      className={`text-[10px] ${isPositive ? 'text-sky-600' : 'text-red-500'}`}
    >
      {isPositive ? `(+${delta})` : `(${delta})`}
    </span>
  );
}

export default function DataStatusComponent() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 p-2'>
      <div className='mb-1'>
        <h2 className='font-semibold text-black'>데이터 현황 (Coverage)</h2>
      </div>
      <div className='flex flex-row flex-col gap-1'>
        {coverageData.map(({ name, percentage, delta }) => (
          <div key={name} className='items-center justify-between'>
            <span className='text-gray-700'>{name}</span>
            <div className='flex items-center gap-1'>
              <span className='font-semibold text-black'>
                {percentage.toFixed(1)}%
              </span>
              {formatDelta(delta)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
