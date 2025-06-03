'use client';

import ArchiveOverview from './dashboard-split-view/ArchiveOverview';
import RecentUploadsCard from './dashboard-split-view/RecentUploadsCard';

export default function DashboardSplitView({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex gap-[20px] px-[32px]'>
      <div className='flex w-full flex-col gap-[16px]'>
        <ArchiveOverview />
        <RecentUploadsCard />
      </div>
      {children}
    </div>
  );
}
