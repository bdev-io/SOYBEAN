'use client';

import { Card } from '@comp/ui/card';

import ErrorStatusComponent from './components/left-side/ErrorStatusComponent';
import MinimapComponent from './components/left-side/MinimapComponent';
import RegionalStatusComponent from './components/left-side/RegionalStatusComponent';
// import DashboardComp from './components/Dashboard';
import StatusComponent from './components/left-side/StatusComponent';
import CurrentRegionResultStatusComponent from './components/right-side/CurrentRegionResultComponent';
import DataStatusComponent from './components/right-side/DataStatusComponent';
import EventStatusComponent from './components/right-side/EventStatusComponent';
import PredictionResultStatusComponent from './components/right-side/PredictionResultComponent';

export default function MainPage() {
  return (
    <div className='flex h-[calc(100vh-65px)] w-full flex-row items-center justify-center gap-[10px] p-4'>
      <div className='flex-6 flex h-full flex-col gap-4'>
        <Card className='flex-1'>
          <StatusComponent />
        </Card>
        <div className='flex-4 flex h-full flex-row gap-4'>
          <div className='flex flex-col gap-4'>
            <Card className='flex-2'>
              <ErrorStatusComponent />
            </Card>
            <Card className='flex-2'>
              <RegionalStatusComponent />
            </Card>
          </div>
          <div className='flex flex-col gap-4'>
            <Card className='flex-1'>
              <MinimapComponent />
            </Card>
          </div>
        </div>
      </div>
      <div className='flex-4 flex h-full flex-col gap-4'>
        <Card className=''>
          <PredictionResultStatusComponent />
        </Card>
        <Card className=''>
          <CurrentRegionResultStatusComponent />
        </Card>
        <Card className=''>
          <EventStatusComponent />
        </Card>
        <Card className=''>
          <DataStatusComponent />
        </Card>
      </div>
    </div>
  );
}
