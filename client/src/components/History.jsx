function History({ restaurants }) {
  return (
    <div>
      <h3>Restaurant History</h3>
      <div className="flex flex-col max-h-80 md:max-h-none overflow-y-auto">
        <div className='hidden xl:grid xl:grid-cols-3 text-start'>
          <h4>Place</h4>
          <h4>Buyer</h4>
          <h4>Date</h4>
        </div>
        {restaurants.map((restaurant) => (
          <div key={`${restaurant.name}-${restaurant.time}`} className='flex flex-col py-2 xl:grid xl:grid-cols-3 text-start'>
            <div className="flex flex-row gap-x-2 items-baseline">
              <h4 className='xl:hidden'>Place:</h4>
              <span>{restaurant.name}</span>
            </div>
            <div className="flex flex-row gap-x-2 items-baseline">
              <h4 className='xl:hidden'>Buyer:</h4>
              <span>{restaurant.buyer}</span>
            </div>
            <div className="flex flex-row gap-x-2 items-baseline">
              <h4 className='xl:hidden'>Date:</h4>
              <span>{new Date(restaurant.time).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History
