export default function DataStatusComponent() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-between gap-4'>
      <h1 className='text-2xl font-bold'>Status Component</h1>
      <p className='text-lg'>
        This component displays the current status of the application.
      </p>
      <div className='flex flex-col items-center justify-center'>
        <span className='text-green-500'>Status: Online</span>
        <span className='text-gray-500'>Last updated: Just now</span>
      </div>
    </div>
  );
}
