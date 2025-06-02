import React from 'react';

export default function IconCalendar({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      className={className}
    >
      <rect x='4' y='5.08203' width='16' height='16' rx='2' fill='current' />
      <rect x='6.36499' y='3.08203' width='2' height='2' fill='current' />
      <rect x='15.3569' y='3.08203' width='2' height='2' fill='current' />
      <rect x='13.376' y='14.0839' width='4' height='4' fill='white' />
    </svg>
  );
}
