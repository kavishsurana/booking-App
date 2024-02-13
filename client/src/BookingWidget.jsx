export default function BookingWidget({place}){
    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
                            <div className='text-2xl text-center'>
                                Price: ${place.price} per night
                            </div>
                            <div className='flex'>
                            <div className='my-4 py-2 px-4 rounded-2xl'>
                                <label>Check-in:</label>
                                <input type='date' />
                            </div>
                            <div className='my-4 py-2 px-4 rounded-2xl'>
                                <label>Check-out:</label>
                                <input type='date' />
                            </div>
                            </div>
                            <div className='my-4 py-2 px-4 rounded-2xl'>
                                <label>Number of Guests:</label>
                                <input type='number' />
                            </div>
                            
                            <button className='primary'>Book now</button>
                        </div>
    )
}