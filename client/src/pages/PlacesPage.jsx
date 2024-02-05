import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";

export default function PlacesPage(){

    const {action} = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

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



    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link to='/account/places/new' className='flex inline-flex gap-2 bg-primary rounded-full text-white py-2 px-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place</Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                <form>
                    {preInput('Title', 'Title for your place.')}
                    <input type="text" placeholder="title, for example: My lovely apt"/>

                    {preInput('Address', 'Address to this place.')}
                    <input type="text" placeholder="address" />

                    {preInput('Photos', 'more = better')}
                    <div className="flex gap-2">
                        <input type="text" placeholder={'Add using a link......jpg'} />
                        <button className="bg-gray-200 px-4 rounded-2xl">Add Photo</button>
                    </div>
                    <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        <button className="flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
                        </svg>
                        Upload
                        </button>
                    </div>

                    {preInput('Description', 'Description of the place.')}
                    <textarea className="h-36" />
                    
                    {preInput('Perks', 'Select all the perks of your place.')}
                    <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-2 ">
                        <Perks />
                    </div>

                    {preInput('Extra Info', 'house rules, etc')}
                    <textarea />

                    {preInput('Check in & out time', 'Add check-in and check-out time')}
                    <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3>Check-in time</h3>
                            <input type="text" placeholder="14:00"/>
                        </div>
                        <div>
                            <h3>Check-out time</h3>
                            <input type="text" placeholder="11:00" />
                        </div>
                        <div>
                            <h3>Max Guests</h3>
                            <input type="text" />
                        </div>
                    </div>

                    <div>
                        <button className="primary my-4">Save</button>
                    </div>
                </form>
                </div>
            )}
        </div>
    )
}
