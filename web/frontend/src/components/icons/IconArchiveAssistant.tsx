import React from 'react';

export default function IconArchiveAssistant({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <rect width='24' height='24' rx='4' fill='current' />
      <rect x='3' y='6' width='18' height='11' rx='5.5' fill='white' />
      <rect x='7' y='10' width='2' height='3' rx='1' fill='black' />
      <rect x='15' y='10' width='2' height='3' rx='1' fill='black' />
      <path
        d='M10 13C10 13 12 13.5 14 13'
        stroke='black'
        strokeLinecap='round'
      />
    </svg>
  );
}
