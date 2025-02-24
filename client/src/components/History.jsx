function History({ restaurants }) {
  return (
    <div className='flex flex-col h-1/3 overflow-scroll rounded-3xl m-4' id='history'>
      <h2 className=''>Restaurant History</h2>
      <div className='text-left flex flex-row overflow-x-scroll mx-2'>
        <span className='w-1/3 mx-2'>Restaurant</span>
        <span className='w-1/3 mx-2'>Buyer</span>
        <span className='w-1/3 mx-2'>Date</span>
      </div>
      <ul className=''>
        {restaurants.map((restaurant) => (
          <li key={`${restaurant.name}-${restaurant.time}`} className='text-left flex flex-row overflow-x-scroll mx-2'>
            <span className='w-1/3 mx-2'>{restaurant.name}</span>
            <span className='w-1/3 mx-2'>{restaurant.buyer}</span>
            <span className='w-1/3 mx-2'>{new Date(restaurant.time).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History
