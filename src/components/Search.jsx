
import React, { useContext, useState } from 'react'
import img2 from "../img/2.jpeg"
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Search = () => {
  const [username, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const {currentUser} = useContext(AuthContext)

  const handleSearch = async () =>{
    const q = query(collection(db, "users"), where("displayName", "==", username))
    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch(err) {
      setErr(true)
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
     const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
     try {
      const res = await getDoc(doc(db, "chats", combinedId))
      if(!res.exists()){
        //Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), {messages: []})
        //create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid:user.uid,
              displayName:user.displayName,
              photoURL:user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp()
          })


          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid:currentUser.uid,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL
            },
            [combinedId + ".date"]: serverTimestamp()
          })
      } 
    } catch(err) {}
    setUser(null)
    setUserName("")
  }
  return (
    <div className="search">
        <div className="searchForm">
            <input type="text" value={username} placeholder="find user" onChange={(e) => setUserName(e.target.value)} onKeyDown={handleKey} />
        </div>
        {user && <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="img2" className="img2" />
            <div className="userChatInfo">
                <span>{user.displayName}</span>
            </div> 
        </div>}
        {err && <span>User not found!</span>}
    </div>
  )
}

export default Search
