'use client';

import { startTransition, useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';

import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subDays,
} from 'date-fns';

import { cn } from '@lib/utils';

import { Button } from '@comp/ui/button';
import { Calendar } from '@comp/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@comp/ui/popover';

import IconCalendar from './icons/IconCalendar';

type DatePickerRangeProps = React.HTMLAttributes<HTMLDivElement> & {
  startDate?: Date;
  setStartDate?: (date: Date | undefined) => void;
  endDate?: Date;
  setEndDate?: (date: Date | undefined) => void;
  startPlaceholder?: string;
  endPlaceholder?: string;
  disableButtons?: boolean;
  invalid?: boolean;
  disabled?: boolean;
};

/**
 * 날짜 범위를 선택할 수 있는 DatePicker 컴포넌트
 *
 * @example
 * ```tsx
 * const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
 * const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
 *
 * <DatePickerRange
 *   startDate={startDate}
 *   setStartDate={(date)=>setStartDate(date)}
 *   endDate={endDate}
 *   setEndDate={(date)=>setEndDate(date)}
 * />
 * ```
 *
 * @param props
 * @param props.startDate - 시작 날짜
 * @param props.setStartDate - 시작 날짜를 설정하는 함수
 * @param props.endDate - 종료 날짜
 * @param props.setEndDate - 종료 날짜를 설정하는 함수
 * @param props.disabled - 비활성화 상태를 설정하는 boolean 값
 * @param props.startPlaceholder - 시작 날짜 입력란의 플레이스홀더 텍스트
 * @param props.endPlaceholder - 종료 날짜 입력란의 플레이스홀더 텍스트
 * @param props.disableButtons - '오늘', '이번주', '이번달' 버튼을 비활성화할지 여부
 * @param props.invalid - 날짜가 유효하지 않을 때 스타일을 적용할지 여부
 * @param props.className - 추가적인 CSS 클래스 이름
 *
 * @returns DatePicker 컴포넌트 - 두 개의 달력과 '오늘', '이번주', '이번달' 버튼을 포함
 */
export default function DatePickerRange({
  startDate: controlledStartDate,
  setStartDate: setControlledStartDate,
  endDate: controlledEndDate,
  setEndDate: setControlledEndDate,
  startPlaceholder = '',
  endPlaceholder = '',
  disableButtons = false,
  invalid = false,
  disabled = false,
  className,
}: DatePickerRangeProps) {
  const isControlled =
    controlledStartDate !== undefined &&
    setControlledStartDate &&
    controlledEndDate !== undefined &&
    setControlledEndDate;

  const [internalStartDate, setInternalStartDate] = useState<Date | undefined>(
    () => controlledStartDate ?? subDays(new Date(), 30),
  );
  const [internalEndDate, setInternalEndDate] = useState<Date | undefined>(
    () => controlledEndDate ?? new Date(),
  );
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');

  const startDate = isControlled ? controlledStartDate : internalStartDate;
  const endDate = isControlled ? controlledEndDate : internalEndDate;
  const setStartDate = isControlled
    ? setControlledStartDate
    : setInternalStartDate;
  const setEndDate = isControlled ? setControlledEndDate : setInternalEndDate;

  const [date, setDate] = useState<DateRange | undefined>(() => ({
    from: startDate,
    to: endDate,
  }));

  useEffect(() => {
    startTransition(() => setDate({ from: startDate, to: endDate }));
  }, [startDate, endDate]);

  const applyDate = (from: Date, to: Date) => {
    setDate({ from, to });
    setStartDate(from);
    setEndDate(to);
  };

  const handleClose = (open: boolean) => {
    if (open) return setOpen(true);
    if (!date?.from || !date?.to) {
      setError('날짜를 선택해주세요');
      setTimeout(() => setError(''), 500);
      return;
    }
    applyDate(date.from, date.to);
    setOpen(false);
  };

  return (
    <div className={cn('flex items-center gap-[8px]', className)}>
      <Popover open={open} onOpenChange={handleClose}>
        <div className='flex items-center gap-[8px]'>
          <PopoverTrigger asChild>
            <button
              type='button'
              className={cn(
                'border-gray-30 font-body2-regular text-gray-40 h-[44px] cursor-pointer justify-start rounded-[8px] border p-[10px] text-left',
                !date?.from && 'text-gray-40',
                invalid && 'border-error',
                disabled && 'cursor-not-allowed opacity-50',
              )}
              disabled={disabled}
            >
              <div className='flex items-center justify-between'>
                <span className='w-[144px]'>
                  {date?.from
                    ? format(date.from, 'yyyy-MM-dd')
                    : startPlaceholder || '날짜를 선택해주세요'}
                </span>
                <IconCalendar className='fill-gray-40' />
              </div>
            </button>
          </PopoverTrigger>
          <div className='text-gray-70'>~</div>
          <PopoverTrigger asChild>
            <button
              type='button'
              className={cn(
                'border-gray-30 font-body2-regular text-gray-40 h-[44px] cursor-pointer justify-start rounded-[8px] border p-[10px] text-left',
                !date?.to && 'text-gray-40',
                invalid && 'border-error',
                disabled && 'cursor-not-allowed opacity-50',
              )}
              disabled={disabled}
            >
              <div className='flex items-center justify-between'>
                <span className='w-[144px]'>
                  {date?.to
                    ? format(date.to, 'yyyy-MM-dd')
                    : endPlaceholder || '날짜를 선택해주세요'}
                </span>
                <IconCalendar className='fill-gray-40' />
              </div>
            </button>
          </PopoverTrigger>
        </div>
        <PopoverContent className='w-auto p-0' align='end' alignOffset={-25}>
          <Calendar
            autoFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className='flex justify-end gap-[8px] p-[8px]'>
            <Button
              className='h-[30px] w-[70px] rounded-[4px]'
              variant='outline'
              onClick={() => setDate(undefined)}
              disabled={disabled}
            >
              reset
            </Button>
            <Button
              className='h-[30px] w-[70px] rounded-[4px]'
              onClick={() => handleClose(false)}
              disabled={disabled}
            >
              apply
            </Button>
          </div>
          {error && (
            <div className='font-body2-regular text-primary-80 absolute bottom-[8px] left-[16px]'>
              {error}
            </div>
          )}
        </PopoverContent>
      </Popover>

      {!disableButtons && (
        <div className='flex w-[232px] gap-[8px]'>
          <Button
            onClick={() =>
              applyDate(startOfMonth(new Date()), endOfMonth(new Date()))
            }
            disabled={disabled}
          >
            이번달
          </Button>
          <Button
            onClick={() =>
              applyDate(
                startOfWeek(new Date(), { weekStartsOn: 0 }),
                endOfWeek(new Date(), { weekStartsOn: 0 }),
              )
            }
            disabled={disabled}
          >
            이번주
          </Button>
          <Button
            onClick={() => applyDate(new Date(), new Date())}
            disabled={disabled}
          >
            오늘
          </Button>
        </div>
      )}
    </div>
  );
}
