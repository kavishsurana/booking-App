import  {useContext} from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import PlacesPage from './PlacesPage'
import AccountNav from '../AccountNav'





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

    

    



    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email}) <br />
                    <button className='primary max-w-xs mt-2'>Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}

        </div>

    )
}