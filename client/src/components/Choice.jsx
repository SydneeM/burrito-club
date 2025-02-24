import { memo } from 'react';

const Choice = memo(function Choice({ restaurant, buyer }) {
  return (
    <div className='h-1/3 card'>
      <h2 className=''>Restaurant of the Week</h2>
      <p className='mx-4'>Restaurant: {restaurant}</p>
      <p className='mx-4'>Who&apos;s Paying: {buyer}</p>
    </div>
  );
});

export default Choice
