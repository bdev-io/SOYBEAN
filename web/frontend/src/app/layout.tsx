'use client';

import NextTopLoader from 'nextjs-toploader';

import { pretendard, suit } from '@lib/font';
import ProviderWrapper from '@lib/provider/ProviderWrapper';
import ScrollAreaProvider from '@lib/provider/ScrollAreaProvider';

import Sidebar from '@comp/sidebar/Sidebar';
import Header from '@comp/ui/headers/header';

import '@styles/globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={`${pretendard.variable} ${suit.variable}`}>
        <NextTopLoader
          color='#33aaff'
          height={4}
          shadow={false}
          showSpinner={false}
        />
        <ProviderWrapper>
          <div className='h-screen w-screen'>
            <Header />
            <div className='flex h-[calc(100vh-65px)] overflow-hidden'>
              <ScrollAreaProvider className='h-full flex-1'>
                {children}
              </ScrollAreaProvider>
            </div>
          </div>
        </ProviderWrapper>
      </body>
    </html>
  );
}
