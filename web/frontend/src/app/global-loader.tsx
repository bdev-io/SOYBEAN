'use client';

import { useGlobalStore } from '@store/providers/GlobalStoreProvider';

export default function GlobalLoader({
  children,
}: React.PropsWithChildren<object>) {
  const { isLoading } = useGlobalStore((s) => s);

  return (
    <>
      {children}

      {isLoading && (
        <div className='flex-center fixed inset-0 z-50 h-screen w-screen bg-white/20'>
          <div
            className='text-surface border-primary-80 inline-block size-10 animate-spin rounded-full border-4 border-solid border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
            role='status'
          >
            <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
              Loading...
            </span>
          </div>
        </div>
      )}
    </>
  );
}
