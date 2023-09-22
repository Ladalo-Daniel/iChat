import React, { useState } from 'react'
import img from '../img/file.jpeg'
import { auth, db, storage, } from '../firebase'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import { RiLoader4Line } from 'react-icons/ri';

const Register = () => {
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const displayName = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]
    
    try {
      setLoading(true)
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef)
      .then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            setLoginSuccess(true)
              setErr(false)
              setTimeout(() => {
                navigate("/login")
              }, 7000)
            
          } catch (err) {
            console.log(err);
            setErr(true);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false)
    }
  }
   
 

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">DALLOH</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="user name" required/>
                <input type="email" placeholder="email" required/>
                <input type="password" placeholder="password" required/>
                <input style={{display:"none"}} type="file" id="file" required/>
                <label htmlFor="file">
                    <img src={img} alt="File" className="file" />
                    <span>Add Profile Photo</span>
                </label>
                <button disabled={loading || loginSuccess}>{loading && !loginSuccess ? "Signing up please wait!" : "Sign up" }</button>
                {loginSuccess && <span className='success'>Registration Successfull, Redirecting...</span>}
                {err && <span className='error'>Something went wrong</span> }
            </form>
            <p>You have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register
