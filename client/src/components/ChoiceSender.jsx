import { memo, useState } from 'react';

const ChoiceSender = memo(function ChoiceSender({ socket, curRoom }) {
  const [restaurant, setRestaurant] = useState('');
  const [buyer, setBuyer] = useState('');

  return (
    <div className='flex flex-col p-4 gap-y-2 h-full'>
      <input
        className='p-3 rounded-3xl'
        id='restaurant-input'
        placeholder='Restaurant'
        onChange={(e) => setRestaurant(e.target.value)}
      />
      <input
        className='p-3 rounded-3xl'
        id='buyer-input'
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
