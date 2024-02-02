import { createContext, useState } from "react";
import axios from 'axios';
import { useEffect } from "react";


export const UserContext = createContext({});

export function UserContextProvider({children}){

    const [user, setUser] = useState(null)

    useEffect(() => {
        if(!user){
         axios.get('/profile').then(({data}) => {
            console.log("Inside UserContext.jsx" + data)
            setUser(data)
         })
        }
    }, [])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
        
    )
}