import { memo } from 'react';

const Choice = memo(function Choice({ restaurant, buyer }) {
  return (
    <div>
      <h3>Restaurant of the Week</h3>
      <div className='flex flex-row items-baseline'>
        <h4>Restaurant: </h4>
        <span className='ml-1'>{restaurant}</span>
      </div>
      <div className='flex flex-row items-baseline'>
        <h4>Who&apos;s Paying: </h4>
        <span className='ml-1'>{buyer}</span>
      </div>
    </div>
  );
});

export default Choice
