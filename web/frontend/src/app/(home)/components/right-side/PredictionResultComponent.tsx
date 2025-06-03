export default function PredictionResultStatusComponent() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-4'>
      <div className='flex w-full items-start justify-between'>
        <h1 className='font-pretendard font-semibold text-black'>
          추론 운영 / 경고 현황
        </h1>
      </div>
      <div className='w-full flex-1'>
        <div className='w-full flex-1 flex-col items-center justify-center gap-4'>
          <p className='text-lg'>
            This component displays the current status of the application.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <span className='text-green-500'>Status: Online</span>
          <span className='text-gray-500'>Last updated: Just now</span>
        </div>
      </div>
    </div>
  );
}
