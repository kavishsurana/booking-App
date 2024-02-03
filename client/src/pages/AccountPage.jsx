import  {useContext} from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'



export default function AccountPage(){
    const {ready,user} = useContext(UserContext)
    let {subpage} = useParams()

    if(subpage === undefined){
        subpage = 'profile';
    }


    if(!ready){
        return <div>Loading...</div>
    }       

    if(ready && !user){
        <Navigate to='/login' />    
    }

    

    function linkClasses(type=null){
        let classes = 'py-2 px-6';
        if(type === subpage || (type === 'profile' && subpage === undefined)){
            classes += ' bg-primary text-white rounded-full'
        }

        return classes;
    }



    return (
        <div>
            <nav className='w-full flex justify-center mt-8 gap-2 mb-8'>
                <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email}) <br />
                    <button className='primary max-w-xs mt-2'>Logout</button>
                </div>
            )}

        </div>

    )
}