'use client';

import { CheckIcon } from 'lucide-react';
import React from 'react';

import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

import { cn } from '@lib/utils/index';

const checkboxVariants = cva(
  'disabled:bg-gray-5 peer relative inline-flex size-[20px] shrink-0 items-center justify-center border transition-colors disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'rounded-[4px]',
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type CheckboxProps = {} & React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof checkboxVariants>;

const Checkbox = ({
  ref,
  className,
  variant,
  ...props
}: CheckboxProps & {
  ref?: React.RefObject<HTMLInputElement | null>;
}) => {
  return (
    <div className='inline-flex cursor-pointer items-center gap-2'>
      <input
        ref={ref}
        type='checkbox'
        className='z-999 absolute size-[20px] cursor-pointer opacity-0'
        {...props}
      />
      <span
        className={cn(
          checkboxVariants({ variant, className }),
          'border-gray-30 hover:enabled:border-gray-40 text-white',
          props.checked && 'border-primary-80 bg-primary-80',
        )}
      >
        <CheckIcon />
      </span>
    </div>
  );
};

Checkbox.displayName = 'Checkbox';

export { Checkbox };
