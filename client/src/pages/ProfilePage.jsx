import  {useContext, useState} from 'react'
import { UserContext } from '../UserContext'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

import { useParams } from 'react-router-dom'
import PlacesPage from './PlacesPage'
import AccountNav from '../AccountNav'





export default function AccountPage(){
    const {ready,user,setUser} = useContext(UserContext)
    let {subpage} = useParams()

    const [redirect,setRedirect] = useState(null)


    async function logout() {
        axios.post('/logout')
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        localStorage.clear();
        setRedirect('/');
        setUser(null);
      }

      

    if(subpage === undefined){
        subpage = 'profile';
    }


    if(!ready){
        return <div>Loading...</div>
    }  
    
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }


    
    if (redirect) {
        return <Navigate to={redirect} />
      }
    



    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <div className='text-center max-w-lg mx-auto'>
                    Logged in as {user.name} ({user.email}) <br />
                    <button onClick={logout} className='primary max-w-xs mt-2'>Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}

        </div>

    )
}