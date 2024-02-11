import { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'

export default function PlacePage() {
    const {id} = useParams();
    const [place, setPlace] = useState(null)
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    useEffect(() => {
        if(!id) return
        axios.get('/places/'+id).then(response => {
            setPlace(response.data)
        })
    }, [id])

    if(!place) return <div>Loading...</div>

    if(showAllPhotos){
        return (
            <div className='absolute insert-0 bg-black text-white min-h-screen'>
                <div className='p-8 grid gap-4'>
                <div>
                <h2 className='text-3xl'>Photos of {place.title}</h2>
                <button className='fixed right-12 top-8 shadow shadow-black flex gap-1 py-2 px-4 rounded-2xl bg-white text-black'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

                    Close photos
                </button>

                </div>
                
                {place?.photos?.length > 0 && place.photos.map(photo => (
                    <div>
                        <img src={'http://localhost:3000/uploads/'+photo} alt={place.title} />
                    </div>
                ))}
                </div>
                
            </div>
        )
    }

    return (
        <div className='mt-4 bg-gray-100 -mx-8 px-8 py-8'>
            <h1>{place.title}</h1>
            <a className='my-2 block font-semibold underline' target='_blank' href={'https://maps.google.com/?q='+place.address}>{place.address}</a>
            <div className='relative'>
            <div className='grid gap-2 grid-cols-[2fr_1fr]'>
                <div>
                    {place.photos?.[0]  && (
                    <div className="w-full h-full">
                    <img className='object-cover aspect-square w-full h-full' src={'http://localhost:3000/uploads/'+place.photos[0]} alt={place.title} />
                    </div>
                    )}
                </div>
                <div className='grid'>
                {place.photos?.[1]  && (
                    <img className='object-cover aspect-square' src={'http://localhost:3000/uploads/'+place.photos[1]} alt={place.title} />
                )} 
                <div className='overflow-hidden'>
                    {place.photos?.[2]  && (
                        <img className='object-cover aspect-square' src={'http://localhost:3000/uploads/'+place.photos[2]} alt={place.title} />
                    )}
                </div>
                
                </div>

            </div>
            <div>
                <button onClick={() => setShowAllPhotos(true)} className='flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl border shadow shadow-md shadow-gray-500 opacity-80'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                Show more photos</button>
            </div>
            

            </div>
        </div>
    )
}