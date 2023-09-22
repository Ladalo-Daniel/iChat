import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({})
    const [mobileMenubar, setMobileMenubar] = useState(false)

const toggleMobileMenubar = () => {
  setMobileMenubar(!mobileMenubar)
}

    //Checking if there is user, use useEffect
    useEffect( () => {
       const unSub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user)
            console.log(user)
        })
        //if you are using useEffect, ensure you use a clean up function
        return () => {
            unSub();
        }
    }, [])

    return(
        <AuthContext.Provider value={{currentUser, mobileMenubar, toggleMobileMenubar}}>
            {children}
        </AuthContext.Provider>
    )
}