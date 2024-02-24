import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns"
import {Navigate} from "react-router-dom"
import { UserContext } from "./UserContext"
import axios from 'axios'

export default function BookingWidget({place}){

    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(user){
            setName(user.name)
        }
    }, [user])

    let numberOfDays = 0;

    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace(){
        
        const response = await axios.post('/bookings', {checkIn, checkOut,numberOfGuests, name, phone, place: place._id, price: numberOfDays* place.price})
        console.log(response)
        const bookingId = response.data._id
        console.log(bookingId)
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
                            <div className='text-2xl text-center'>
                                Price: ${place.price} per night
                            </div>
                            <div className='flex'>
                            <div className='my-4 py-2 px-4 rounded-2xl'>
                                <label>Check-in:</label>
                                <input type='date' value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                            </div>
                            <div className='my-4 py-2 px-4 rounded-2xl'>
                                <label>Check-out:</label>
                                <input type='date' value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                            </div>
                            </div>
                            <div className='my-4 py-2 px-4 rounded-2xl'>
                                <label>Number of Guests:</label>
                                <input type='number' value={numberOfGuests} onChange={(e) => setNumberOfGuests(e.target.value)}  />
                            </div>

                            {numberOfDays > 0 && (
                                <div className='my-4 py-2 px-4 rounded-2xl'>
                                <label>Your Full Name:</label>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)}  />
                                <label>Phone Number:</label>
                                <input type='tel' value={phone} onChange={(e) => setPhone(e.target.value)}  />
                            </div>
                            )}
                            
                            <button onClick={bookThisPlace} className='primary'>Book this place 
                            {numberOfDays > 0 && (
                                <span> ${numberOfDays* place.price}</span>
                            )}
                            </button>
                        </div>
    )
}