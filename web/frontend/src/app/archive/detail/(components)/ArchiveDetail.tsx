'use client';

import Image from 'next/image';
import React from 'react';

import { Badge } from '@comp/ui/badge';
import { Button } from '@comp/ui/button';

// TODO: mock 데이터 추후 삭제
const mockData = [
  { title: '저자', description: 'Junha Kim, Changyong Jung' },
  { title: '학술지명', description: '학술지 이름' },
  { title: '발행기관', description: '광주과학기술원' },
  { title: '발행연도', description: '2025' },
  { title: '수록면', description: '1-11' },
];

const mockDataDetail = [
  { title: '추출 키워드', description: 'Al, Solar Power, Prediction' },
  {
    title: '초록',
    description: `This study analyzes the impact of climate change on regional solar power potential and proposes a method for predicting it using an Al model. Climate change can alter key factors such as solar radiation, temperature, and cloud cover, which significantly affect solar power generation.
Accurate predictions of these changes are crucial for formulating strategies to expand renewable energy. Using climate scenario data from the Korean Meteorological Administration, this study builds a deep learning model to analyze solar power potential in various regions. The results highlight notable regional differences in solar power potental due to climate change, providing valuable insights for selecting solar power plant locations and informing energy policy decisions.`,
  },
  {
    title: '레퍼런스',
    description: `This study analyzes the impact of climate change on regional solar power potential and proposes a method for predicting it using an Al model. Climate change can alter key factors such as solar radiation, temperature, and cloud cover, which significantly affect solar power generation.
Accurate predictions of these changes are crucial for formulating strategies to expand renewable energy. Using climate scenario data from the Korean Meteorological Administration, this study builds a deep learning model to analyze solar power potential in various regions. The results highlight notable regional differences in solar power potental due to climate change, providing valuable insights for selecting solar power plant locations and informing energy policy decisions.`,
  },
];

export default function ArchiveDetail() {
  return (
    <>
      <div className='flex flex-col rounded-[12px] border px-[40px] py-[32px]'>
        <Badge className='mb-[12px]'>논문</Badge>

        <div className='font-heading2-semibold border-b pb-[20px] text-neutral-100'>
          Regional Solar Power Potential Prediction Based on Al in Response to
          Climate Change
        </div>

        <div className='flex flex-col gap-[12px] pl-[4px] pt-[20px]'>
          {mockData.map((data) => (
            <div key={data.title} className='flex items-center gap-[12px]'>
              <div className='font-body2-semibold w-[120px] text-gray-50'>
                {data.title}
              </div>
              <div className='font-body2-regular text-gray-80'>
                {data.description}
              </div>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-[10px] pt-[24px]'>
          <Button variant='primaryOutline' className='text-primary w-[160px]'>
            <Image src='/icon/book.svg' width={24} height={24} alt='book' />
            논문보기
          </Button>
          <Button variant='primaryOutline' className='text-primary w-[160px]'>
            <Image src='/icon/download.svg' width={24} height={24} alt='book' />
            다운로드
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-[24px] rounded-[12px] border px-[40px] py-[32px]'>
        <div className='font-heading3-bold text-neutral-100'>세부정보</div>

        {mockDataDetail.map((data) => (
          <div
            key={data.title}
            className='font-body2-regular flex flex-col gap-[20px]'
          >
            <div className='text-gray-70 border-b pb-[8px]'>{data.title}</div>
            <div className='text-gray-100'>{data.description}</div>
          </div>
        ))}
      </div>
    </>
  );
}
