'use client';

import { useCallback, useState } from 'react';

import { isTauriAvailable } from '@lib/utils';

import { invoke } from '@tauri-apps/api/core';

import AIAssistant from './(components)/dashboard-split-view/AIAssistant';
import DashboardSplitView from './(components)/DashboardSplitView';
import KeywordSection from './(components)/KeywordSection';
// import { useCallback, useState } from 'react';
import SearchSection from './(components)/SearchSection';
import TimeLineCard from './(components)/TimeLineCard';

export default function Home() {
  const [_greeted, setGreeted] = useState<string | null>(null);
  const _greet = useCallback((): void => {
    if (isTauriAvailable()) {
      invoke<string>('greet')
        .then((s) => {
          setGreeted(s);
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    } else {
      setGreeted('Tauri is not available');
    }
  }, []);

  return (
    <div className='w-full'>
      <SearchSection />
      <KeywordSection />

      <DashboardSplitView>
        <AIAssistant />
      </DashboardSplitView>

      <TimeLineCard />
    </div>
  );
}
