type EventItem = {
  label: string;
  count: number;
  rank?: number;
};

const liveEvents: EventItem[] = [
  { label: '금일 신규 이벤트', count: 8 },
  { label: '미확인 이벤트', count: 6 },
];

const eventTypesTop3: EventItem[] = [
  { rank: 1, label: '강수량 부족', count: 5 },
  { rank: 2, label: '광 STR', count: 4 },
  { rank: 3, label: '고온 STR', count: 2 },
];

const hotRegionsTop3: EventItem[] = [
  { rank: 1, label: '서울', count: 8 },
  { rank: 2, label: '부산', count: 3 },
  { rank: 3, label: '경기', count: 2 },
];

function EventList({ title, items }: { title: string; items: EventItem[] }) {
  return (
    <div className='min-w-[120px] flex-1 rounded-sm bg-neutral-50 p-2'>
      <h3 className='mb-1 text-[12px] font-semibold text-gray-700'>{title}</h3>
      <ul className='flex flex-col gap-1'>
        {items.map((item, idx) => (
          <li
            key={idx}
            className='flex items-center justify-between text-[11px]'
          >
            <div className='flex items-center gap-1'>
              {item.rank && (
                <div className='flex h-4 w-4 items-center justify-center rounded-sm bg-zinc-700 text-[8px] font-semibold text-white'>
                  {item.rank}
                </div>
              )}
              <span className='text-gray-700'>{item.label}</span>
            </div>
            <div className='flex items-center gap-[2px]'>
              <span className='font-semibold text-blue-900'>{item.count}</span>
              <span className='text-[10px] text-black'>건</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EventStatusComponent() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4 p-2'>
      <h1 className='mb-1 font-semibold text-black'>장애 이벤트 현황</h1>
      <div className='flex flex-1 gap-2 overflow-x-auto'>
        <EventList title='실시간 이벤트 현황' items={liveEvents} />
        <EventList title='이벤트 유형 TOP3' items={eventTypesTop3} />
        <EventList title='장애 집중 지역' items={hotRegionsTop3} />
      </div>
    </div>
  );
}
