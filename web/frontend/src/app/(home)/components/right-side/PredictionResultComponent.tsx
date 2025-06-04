type QuartileData = {
  highRatioLabel: string;
  highRatioValue: number;
  lowRatioLabel: string;
  lowRatioValue: number;
  quartiles: { label: string; value: number }[];
};

const dummyData: QuartileData = {
  highRatioLabel: '> 80%',
  highRatioValue: 507,
  lowRatioLabel: '< 80%',
  lowRatioValue: 443,
  quartiles: [
    { label: 'Q1', value: 396 },
    { label: 'Q2', value: 460 },
    { label: 'Q3', value: 532 },
  ],
};

export default function PredictionResultStatusComponent() {
  const {
    highRatioLabel,
    highRatioValue,
    lowRatioLabel,
    lowRatioValue,
    quartiles,
  } = dummyData;

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 p-2'>
      <h2 className='mb-2 text-sm font-semibold text-black'>
        [전국] 생산량 추정 (ton/acre)
      </h2>

      <div className='mb-3 flex items-center justify-between'>
        <div className='flex flex-col items-center text-xs text-gray-600'>
          <span>{highRatioLabel}</span>
          <span className='text-base font-bold text-black'>
            {highRatioValue}
          </span>
        </div>

        {/* 중앙 구분선 */}
        <div className='h-8 w-px bg-gray-400 opacity-30' />

        <div className='flex flex-col items-center text-xs text-gray-600'>
          <span>{lowRatioLabel}</span>
          <span className='text-base font-bold text-black'>
            {lowRatioValue}
          </span>
        </div>
      </div>

      <div>
        <div className='mb-1 text-[10px] text-gray-600'>추정 4분위수</div>
        <div className='flex gap-4'>
          {quartiles.map((q) => (
            <div
              key={q.label}
              className='flex flex-col items-center text-center text-xs text-gray-600'
            >
              <span>{q.label}</span>
              <span className='font-semibold text-black'>{q.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
