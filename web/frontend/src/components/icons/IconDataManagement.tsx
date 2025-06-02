import React from 'react';

export default function IconDataManagement({
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
      <path
        d='M9.85714 15.1765H14.1429V10.9412H17L12 6L7 10.9412H9.85714V15.1765ZM7 16.5882H17V18H7V16.5882Z'
        fill='white'
      />
    </svg>
  );
}
