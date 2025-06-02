import React from 'react';

export default function IconHome({ className }: { className?: string }) {
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
      <rect x='4' y='6' width='6' height='12' rx='1' fill='white' />
      <rect x='11' y='6' width='9' height='5' rx='1' fill='white' />
      <rect x='11' y='12' width='9' height='6' rx='1' fill='white' />
    </svg>
  );
}
