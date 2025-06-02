'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { ko } from 'date-fns/locale';

import { cn } from '@src/lib/utils';

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      locale={ko}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        month: 'space-y-4',
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 relative',
        month_caption: 'flex justify-center pt-1 relative items-center',
        month_grid: 'w-full border-collapse space-y-1',
        caption_label: 'text-sm font-medium',
        nav: 'flex items-center justify-between absolute inset-x-0',
        button_previous:
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10 cursor-pointer',
        button_next:
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10 cursor-pointer',
        weeks: 'w-full border-collapse space-y-',
        weekdays: 'flex',
        weekday: 'text-[#6b7280] rounded-md w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day_button:
          'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-[#e5e7eb]/50 [&:has([aria-selected])]:bg-[#e5e7eb] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 cursor-pointer',
        day: 'h-9 w-9 p-0 font-normal',
        range_end: 'day-range-end',
        selected:
          'bg-[#006EB7] text-[#f3f4f6] hover:bg-[#006EB7] hover:text-[#f3f4f6]  focus:bg-[#006EB7] focus:text-[#f3f4f6]',
        today: 'text-[#006EB7]',
        outside: 'day-outside text-[#6b7280] opacity-50',
        disabled: 'text-[#6b7280] opacity-50',
        range_middle: 'aria-selected:bg-[#e5e7eb] aria-selected:text-[#1f2937]',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line react/no-nested-component-definitions
        Chevron: (props) => {
          if (props.orientation === 'left') {
            return <ChevronLeftIcon {...props} />;
          }
          return <ChevronRightIcon {...props} />;
        },
      }}
      {...props}
    />
  );
}

export { Calendar };
