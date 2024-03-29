import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"



export default function IndexPage() {

  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('https://booking-app-1-aqqh.onrender.com/places', { withCredentials: true }).then(response => { 
      setPlaces([...response.data,...response.data,...response.data,...response.data,])
    })
  }, [])

    return(
      <div className="mt-8 gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.length > 0 && places.map(place => (
          <Link key={place.id} to={'/place/'+place._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos.length > 0 && (
                <img className="rounded-2xl object-cover aspect-square" src={'https://booking-app-1-aqqh.onrender.com/uploads/'+place.photos[0]} alt={place.title} />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            
            <div>
                <span className="font-bold">${place.price}</span> per night
            </div>
          </Link>
        ))}
      </div>
    )
}