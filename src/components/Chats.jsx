import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { ChatsContext } from '../context/ChatsContext'


const Chats = () => {
  const [chats, setChats] = useState([])

  const {currentUser} = useContext(AuthContext)
  const {dispatch} = useContext(ChatsContext)

  useEffect(() => {
   const getChats = () => { 
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      setChats(doc.data())
    })
    return () => {
      unsub();
    }
   };

   currentUser.uid && getChats()
  }, [currentUser.uid])
  //console.log(chats)

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload:u})
  }
  
  return (
    <div className='chats'>
      {Object.entries(chats)?.sort( (a, b) =>b[1].date - a[1].date).map( (chat) =>( 
      <div className="userChat" key={chat[0]} onClick={ () => handleSelect(chat[1].userInfo)}>
            {/* <img src={chat[1].userInfo.photoURL} alt="img2" className="img2" /> */}
            {chat[1].userInfo && chat[1].userInfo.photoURL && (
            <img src={chat[1].userInfo.photoURL} alt="img2" className="img2" />
            )}
            <div className="userChatInfo">
               {/* <span className='span'>{chat[1].userInfo.displayName}</span> */}
               {chat[1].userInfo && chat[1].userInfo.displayName && (
               <span className='span'>{chat[1].userInfo.displayName}</span>
               )}
               <p>{chat[1].lastMessage?.text}</p>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Chats
