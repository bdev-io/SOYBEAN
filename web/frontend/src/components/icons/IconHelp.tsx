import React from 'react';

export default function IconHelp({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M12 2L2 7v5a10 10 0 1 0 20 0V7l-10-5zM4.5 12a7.5 7.5 0 1 1 15 0A7.5 7.5 0 0 1 4.5 12z'
        fill='currentColor'
      />
    </svg>
  );
}
