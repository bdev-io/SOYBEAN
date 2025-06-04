type RegionEvent = {
  region: string;
  type: string;
  date: string;
  elapsed: string;
};

const regionEventData: RegionEvent[] = [
  {
    region: '영광군',
    type: '강수량 부족',
    date: '2025.03.11',
    elapsed: '16일',
  },
  {
    region: '영광군',
    type: '광 스트레스',
    date: '2025.03.15',
    elapsed: '12일',
  },
  { region: '나주시', type: '강수량 부족', date: '2025.03.21', elapsed: '6일' },
  {
    region: '고흥군',
    type: '강수량 부족',
    date: '2025.03.13',
    elapsed: '14일',
  },
  {
    region: '고흥군',
    type: '고온 스트레스',
    date: '2025.03.24',
    elapsed: '3일',
  },
];

export default function RegionStatusTable() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-start gap-4 p-2'>
      <h2 className='mb-2 text-sm font-semibold text-black'>지역별 현황</h2>

      <div className='w-full text-[15px]'>
        <div className='grid grid-cols-4 rounded-t-sm bg-gray-100 font-bold text-white'>
          <div className='px-2 py-1 text-center'>법정동</div>
          <div className='px-2 py-1 text-center'>장애유형</div>
          <div className='px-2 py-1 text-center'>이벤트일자</div>
          <div className='px-2 py-1 text-center'>경과일수</div>
        </div>

        {regionEventData.map((item, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-4 ${idx % 2 === 0 ? 'bg-neutral-50' : 'bg-white'} text-black`}
          >
            <div className='px-2 py-1 text-center'>{item.region}</div>
            <div className='px-2 py-1 text-center'>{item.type}</div>
            <div className='px-2 py-1 text-center'>{item.date}</div>
            <div className='px-2 py-1 text-center'>{item.elapsed}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
