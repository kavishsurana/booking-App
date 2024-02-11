import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";




export default function PlacesPage(){

    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/user-places').then(({data}) => {
            setPlaces(data);
        })
    }, [])

    console.log('places')
    console.log(places)

    return (
        <div>
            <AccountNav />
                <div className="text-center">
                    <Link to='/account/places/new' className='flex inline-flex gap-2 bg-primary rounded-full text-white py-2 px-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place
                    </Link>
                </div>
                <div className="mt-4">
                    {console.log({places})}
                    {places.length > 0 && places.map(place => (
                        <Link to={'/account/places/'+place._id} key={place.id} className="flex gap-4 bg-gray-100 p-4 rounded-2xl">
                            <div className="flex h-32 bg-gray-100 grow shrink-0">
                                {place.photos.length > 0 && (
                                    <img className="object-cover" src={'http://localhost:3000/uploads/'+place.photos[0]} alt="" />
                                )}
                                
                            </div>
                            <div className="flex-grow">
                                 <h2 className="text-xl">{place.title}</h2> 
                                 <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{place.description}</p>
                            </div>
                             
                        </Link>
                    ))}
                </div>
        </div>
    )
}
