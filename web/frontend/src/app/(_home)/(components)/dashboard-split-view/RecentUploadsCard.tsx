'use client';

import { cn } from '@lib/utils';

type UploadItem = {
  type: '논문' | '연구자료' | '사업계획서';
  title: string;
  date: string;
};
/** Mock Data */
const uploads: UploadItem[] = [
  {
    type: '논문',
    title: '기후변동성을 고려한 대전의 에너지 수요예측을 위한 시계열 심층분석',
    date: '2025.05.06',
  },
  {
    type: '사업계획서',
    title: '다중 스케일 모델 기반의 시계열 예측 모델 비교 연구',
    date: '2025.05.05',
  },
  {
    type: '연구자료',
    title:
      'Temporal Fusion Transformer(TFT)를 활용한 시계열 예측 정확도 향상 기법 활용한 시계열 예측 정확도 향상 기법',
    date: '2025.05.04',
  },
  {
    type: '연구자료',
    title:
      'Temporal Fusion Transformer(TFT)를 활용한 시계열 예측 정확도 향상 기법 활용한 시계열 예측 정확도 향상 기법',
    date: '2025.05.04',
  },
  {
    type: '논문',
    title: '기후변동성을 고려한 대전의 에너지 수요예측을 위한 시계열 심층분석',
    date: '2025.05.06',
  },
];

export default function RecentUploadsCard() {
  return (
    <div className='w-full rounded-[12px] border p-[24px]'>
      <div className='flex justify-between pb-[24px]'>
        <div className='font-body1-semibold'>최근 업로드 자료</div>
        <div className='font-body3-semibold text-gray-60'>더 보기</div>
      </div>
      <div className='flex flex-col gap-[24px]'>
        {uploads.map((item, index) => (
          <div key={index} className='flex justify-between'>
            <div className='flex gap-[8px]'>
              <span
                className={cn(
                  'font-body2-semibold',
                  item.type === '논문'
                    ? 'text-blue-normal'
                    : item.type === '연구자료'
                      ? 'text-green'
                      : 'text-orange',
                )}
              >
                {item.type}
              </span>
              <span className='font-body2-regular line-clamp-1 flex-1'>
                {item.title}
              </span>
            </div>
            <div className='font-body3-regular text-gray-50'>{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
