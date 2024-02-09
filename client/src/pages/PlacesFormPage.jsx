import axios from 'axios'
import { useState } from 'react';
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import AccountNav from '../AccountNav';
import { Navigate } from 'react-router-dom';


export default function PlacesFormPage(){

    
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);
    const [redirect, setRedirect] = useState(false);

    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    function inputDescription(text){
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }

    function preInput(header, description){
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addNewPlace(e){
        e.preventDefault();
        await axios.post('/places', {
            title, address, addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests
        })
        setRedirect(true)
    }

    if(redirect){
        return <Navigate to="/account/places" />
    }


    return (
        <div>
            <AccountNav />
                <form onSubmit={addNewPlace}>
                    {preInput('Title', 'Title for your place.')}
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for example: My lovely apt"/>

                    {preInput('Address', 'Address to this place.')}
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)}  placeholder="address" />

                    {preInput('Photos', 'more = better')}
                    <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />

                    {preInput('Description', 'Description of the place.')}
                    <textarea value={description} onChange={e=>setDescription(e.target.value)} className="h-36" />
                    
                    {preInput('Perks', 'Select all the perks of your place.')}
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-2 ">
                        <Perks selected={perks} onChange={setPerks} />
                    </div>

                    {preInput('Extra Info', 'house rules, etc')}
                    <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)} />

                    {preInput('Check in & out time', 'Add check-in and check-out time')}
                    <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3>Check-in time</h3>
                            <input value={checkIn} onChange={e=>setCheckIn(e.target.value)} type="text" placeholder="14:00"/>
                        </div>
                        <div>
                            <h3>Check-out time</h3>
                            <input value={checkOut} onChange={e=>setCheckOut(e.target.value)} type="text" placeholder="11:00" />
                        </div>
                        <div>
                            <h3>Max Guests</h3>
                            <input value={maxGuests} onChange={e=>setMaxGuests(e.target.value)} type="number" />
                        </div>
                    </div>

                    <div>
                        <button className="primary my-4">Save</button>
                    </div>
                </form>
                </div>
    )
}