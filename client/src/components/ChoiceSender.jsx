import { memo, useState } from 'react';

const ChoiceSender = memo(function ChoiceSender({ socket, curRoom }) {
  const [restaurant, setRestaurant] = useState('');
  const [buyer, setBuyer] = useState('');

  return (
    <div className='flex flex-col gap-y-4 h-full'>
      <input
        className='p-3 rounded-3xl focus:outline-0'
        id='restaurant-input'
        autoComplete='off'
        placeholder='Restaurant'
        onChange={(e) => setRestaurant(e.target.value)}
      />
      <input
        className='p-3 rounded-3xl focus:outline-0'
        id='buyer-input'
        autoComplete='off'
        placeholder='Buyer'
        onChange={(e) => setBuyer(e.target.value)}
      />
      <button
        className='p-3 rounded-3xl submit-btn'
        onClick={() => {
          if (restaurant !== '' && restaurant.trim().length !== 0 &&
            buyer !== '' && buyer.trim().length !== 0) {
            const time = Date.now();
            const state = { buyer, restaurant, room: curRoom, time, };
            socket.emit('choose_restaurant', state);
          }
        }}>
        Let&apos;s Eat
      </button>
    </div>
  );
});

export default ChoiceSender
