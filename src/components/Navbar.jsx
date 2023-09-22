import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import img1 from "../img/1.jpeg"
//import { signOut } from 'firebase/auth'
//import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo"><Link to="/" className='Logo'>DALLOH</Link></span>
      <div className="user">
        <img src={currentUser.photoURL} alt="Profile" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  )
}

export default Navbar
