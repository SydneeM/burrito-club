import { memo } from 'react';

const Choice = memo(function Choice({ restaurant, buyer }) {
  return (
    <div className='md:h-1/3 card'>
      <h2 className=''>Restaurant of the Week</h2>
      <div className='flex flex-row items-baseline'>
        <span className='ml-4 font-semibold text-lg'>Restaurant:</span>
        <span className='ml-1'>{restaurant}</span>
      </div>
      <div className='flex flex-row items-baseline'>
        <h3 className='ml-4 font-semibold text-lg'>Who&apos;s Paying:</h3>
        <h3 className='ml-1'>{buyer}</h3>
      </div>
    </div>
  );
});

export default Choice
