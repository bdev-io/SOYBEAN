import React from 'react';

export default function IconMap({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='10'
      height='10'
      viewBox='0 0 10 10'
      fill='none'
      className={className}
    >
      <g clipPath='url(#clip0_425_8578)'>
        <mask
          id='mask0_425_8578'
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='10'
          height='10'
        >
          <path
            d='M0.390625 0.236816H9.48765V9.33384H0.390625V0.236816Z'
            fill='white'
          />
        </mask>
        <g mask='url(#mask0_425_8578)'>
          <path
            d='M0.390625 8.03428L2.98978 9.33384V1.53639L0.390625 0.236816V8.03428Z'
            fill='current'
          />
          <path
            d='M3.63947 9.33384L6.23862 8.03428V0.236816L3.63947 1.53639V9.33384Z'
            fill='current'
          />
          <path
            d='M6.88855 0.236816V8.03428L9.4877 9.33384V1.53639L6.88855 0.236816Z'
            fill='current'
          />
        </g>
      </g>
      <defs>
        <clipPath id='clip0_425_8578'>
          <rect
            width='9.09703'
            height='9.09703'
            fill='current'
            transform='translate(0.390625 0.236816)'
          />
        </clipPath>
      </defs>
    </svg>
  );
}
