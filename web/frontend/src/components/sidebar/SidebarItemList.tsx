'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@comp/ui/accordion';
import { ScrollArea } from '@comp/ui/scroll-area';

import { NAV_LIST } from '@common/constants';

import SidebarItem from './SidebarItem';

export default function SidebarItemList() {
  const pathname = usePathname();

  return (
    <ScrollArea className='w-full flex-1 px-[12px] py-[20px]'>
      <div className='flex flex-col gap-[10px]'>
        {NAV_LIST.map((item) => {
          if (item.children) {
            return (
              <Accordion key={item.id} type='multiple'>
                <AccordionItem value='item-1'>
                  <AccordionTrigger
                    className={cn(
                      'hover:text-primary mb-[4px] flex items-center px-[16px] py-0',
                      pathname.startsWith(`${item.url}/`) && 'bg-white',
                    )}
                  >
                    <SidebarItem
                      item={item}
                      accordionActive={pathname.startsWith(`${item.url}/`)}
                    />
                  </AccordionTrigger>
                  <AccordionContent className='flex flex-col justify-center gap-[4px]'>
                    {item.children.map((child) => (
                      <SidebarItem
                        key={child.id}
                        item={child}
                        className='px-[32px] py-[16px]'
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          }

          return (
            <SidebarItem
              key={item.id}
              item={item}
              className='px-[16px] py-[10px]'
            />
          );
        })}
      </div>
    </ScrollArea>
  );
}
