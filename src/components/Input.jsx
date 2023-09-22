import React, { useState } from 'react'
import attach from '../img/attach.png'
import gallery from '../img/gallery.png'
import { AuthContext } from '../context/AuthContext'
import { ChatsContext } from '../context/ChatsContext'
import { useContext } from 'react'
import { Timestamp, arrayUnion, serverTimestamp, updateDoc } from 'firebase/firestore'
import { storage } from '../firebase'
import {v4 as uuid} from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { doc } from 'firebase/firestore'
import { db } from '../firebase'

const Input = () => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatsContext)

  const handleSend = async () =>{
    //check if there is Image, Send else only send text!
    if(img){
      const storageRef = ref(storage, uuid());

      const upLoadTask = uploadBytesResumable(storageRef, img)
      upLoadTask.on(
        (error) => {
          //setErr(true)
        },
        () => {
          getDownloadURL(upLoadTask.snapshot.ref).then(async (getDownloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:getDownloadURL
              })
            })
            
          })
        }
      )
    } else{
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()
        })
      })
    }
    //For Current user
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      //updating nested object
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
     
    //For other User
    await updateDoc(doc(db, "userChats", data.user.uid), {
      //updating nested object
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp()
    })
    setText("")
    setImg(null)
  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSend()
  }

 // console.log(text)

  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' onChange={(e) => setText(e.target.value)} value={text} onKeyDown={handleKey}/>
      <div className='send'>
        <img src={attach} alt="" />
        <input type="file" style={{display:"none"}} id='file' onChange={(e) => setImg(e.target.files[0])} onKeyDown={handleKey} />
        <label htmlFor="file">
          <img src={gallery} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  )
}

export default Input
