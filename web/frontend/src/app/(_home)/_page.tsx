'use client';

import AIAssistant from './(components)/dashboard-split-view/AIAssistant';
import DashboardSplitView from './(components)/DashboardSplitView';
import KeywordSection from './(components)/KeywordSection';
// import { useCallback, useState } from 'react';
import SearchSection from './(components)/SearchSection';
import TimeLineCard from './(components)/TimeLineCard';

export default function Home() {
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
