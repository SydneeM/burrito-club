function History({ restaurants }) {
  return (
    <div className='flex flex-col h-full'>
      <h3>Restaurant History</h3>
      <div className='max-h-20 lg:max-h-none grow overflow-y-auto'>
        <div className='hidden xl:grid xl:grid-cols-3 text-start lg:border-b-2 lg:border-[#c7c9e0]'>
          <h4>Place</h4>
          <h4>Buyer</h4>
          <h4>Date</h4>
        </div>
        {restaurants.map((restaurant) => (
          <div
            key={`${restaurant.name}-${restaurant.time}`}
            className='flex flex-col xl:grid xl:grid-cols-3 text-start border-t-2 border-[#c7c9e0] lg:border-none'
          >
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
