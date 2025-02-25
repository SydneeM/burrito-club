import { memo } from 'react';

const Choice = memo(function Choice({ restaurant, buyer }) {
  return (
    <div className=''>
      <h2 className=''>Restaurant of the Week</h2>
      <div className='flex flex-row items-baseline'>
        <span className='font-semibold text-lg'>Restaurant - </span>
        <span className='ml-1' id='chosen-restaurant'>{restaurant}</span>
      </div>
      <div className='flex flex-row items-baseline'>
        <h3 className='font-semibold text-lg'>Who&apos;s Paying - </h3>
        <h3 className='ml-1' id='chosen-buyer'>{buyer}</h3>
      </div>
    </div>
  );
});

export default Choice
