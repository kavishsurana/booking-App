import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import AccountNav from "../AccountNav";




export default function PlacesPage(){

    const {action} = useParams();



    return (
        <div>
            <AccountNav />
            {action !== 'new' && (
                <div className="text-center">
                    <Link to='/account/places/new' className='flex inline-flex gap-2 bg-primary rounded-full text-white py-2 px-6'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place</Link>
                </div>
            )}
        </div>
    )
}
