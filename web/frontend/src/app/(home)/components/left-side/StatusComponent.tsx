export default function StatusComponent() {
  const targetCountry: number = 2580;
  const baseDate: string = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const normal: number = 2000;
  const warning: number = 500;
  const exclude: number = 80;

  const warningRate: number = Math.round(
    (warning / (normal + warning + exclude)) * 100,
  );
  const excludeRate: number = Math.round(
    (exclude / (normal + warning + exclude)) * 100,
  );

  const toKRNum = (num: number): string => num.toLocaleString('ko-KR');

  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-4 p-2'>
      <div className='flex w-full items-start justify-between'>
        <div className='flex w-full flex-row items-center justify-between gap-4'>
          <div>
            <h1 className='font-pretendard text-xl font-semibold text-black'>
              추론 운영 / 경고 현황
            </h1>
          </div>
          <div>
            <span className='text-xl text-gray-500'>
              {`데이터 기준일: ${baseDate}`}
            </span>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div className='w-full flex-1 flex-col items-center justify-center gap-4'>
          <div>
            <span className='text-2xl font-normal text-gray-600'>
              대상 시군구&nbsp;:&nbsp;
            </span>
            <span className='text-2xl font-semibold text-blue-500'>
              {targetCountry.toLocaleString('ko-KR')}
            </span>
            <span className='text-2xl font-normal text-gray-600'>&nbsp;구</span>
          </div>
        </div>
      </div>

      <div className='w-full'>
        <div className='flex w-full flex-row items-center justify-center gap-2 text-lg text-gray-600'>
          <div className='flex flex-1 flex-row justify-center'>
            <div>
              <span className='font-semibold text-gray-500'>정상&nbsp;</span>
            </div>
            <div>
              <span className='text-blue-500'>{toKRNum(normal)}</span>
              <span className='text-gray-500'>&nbsp;구</span>
            </div>
          </div>

          <div className='flex flex-1 flex-row justify-center'>
            <div>
              <span className='font-semibold text-gray-500'>경고&nbsp;</span>
            </div>
            <div>
              <span className='text-blue-500'>{toKRNum(warning)}</span>
              <span className='text-gray-500'>&nbsp;구</span>
            </div>
          </div>

          <div className='flex flex-1 flex-row justify-center'>
            <div>
              <span className='font-semibold text-gray-500'>제외&nbsp;</span>
            </div>
            <div>
              <span className='text-blue-500'>{toKRNum(exclude)}</span>
              <span className='text-gray-500'>&nbsp;구</span>
            </div>
          </div>

          <div className='flex flex-1 flex-row justify-center'>
            <div>
              <span className='font-semibold text-gray-500'>경고&nbsp;</span>
            </div>
            <div>
              <span className='text-blue-500'>{toKRNum(warningRate)}</span>
              <span className='text-gray-500'>&nbsp;%</span>
            </div>
          </div>
          <div className='flex flex-1 flex-row justify-center'>
            <div>
              <span className='font-semibold text-gray-500'>제외&nbsp;</span>
            </div>
            <div>
              <span className='text-blue-500'>{toKRNum(excludeRate)}</span>
              <span className='text-gray-500'>&nbsp;%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
