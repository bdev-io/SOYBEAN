'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { Button } from '@src/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@src/components/ui/tooltip';
import { cn } from '@src/lib/utils/index';

export type TooltipIconButtonProps = ComponentPropsWithoutRef<typeof Button> & {
  tooltip: string;
  side?: 'top' | 'bottom' | 'left' | 'right';
};

export const TooltipIconButton = ({
  ref,
  children,
  tooltip,
  side = 'bottom',
  className,
  ...rest
}: TooltipIconButtonProps & {
  ref?: React.RefObject<HTMLButtonElement | null>;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='ghost'
          size='icon'
          {...rest}
          className={cn('size-6 p-1', className)}
          ref={ref}
        >
          {children}
          <span className='sr-only'>{tooltip}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side={side}>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

TooltipIconButton.displayName = 'TooltipIconButton';
