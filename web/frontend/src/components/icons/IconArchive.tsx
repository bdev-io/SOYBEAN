import React from 'react';

export default function IconArchive({ className }: { className?: string }) {
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
      <rect x='4.5' y='6' width='7' height='12' rx='1' fill='white' />
      <rect x='12.5' y='6' width='7' height='12' rx='1' fill='white' />
      <rect x='9' y='11' width='1' height='3' fill='current' />
      <rect x='14' y='11' width='1' height='3' fill='current' />
    </svg>
  );
}
