import React, { useContext, useEffect, useRef } from 'react'
import img2 from "../img/2.jpeg"
import { AuthContext } from '../context/AuthContext'
import { ChatsContext } from '../context/ChatsContext'

const Message = ({message}) => {
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatsContext)
  const ref = useRef()
  useEffect( () => {
    ref.current?.scrollIntoView({behavior:"smooth"})
  }, [message])
  console.log(message)
  return (
    <div className={`message ${message.senderId === currentUser.uid && "owner"}`} ref={ref}>
     <div className='messageInfo'>
         <img src={message.senderId === currentUser.uid? currentUser.photoURL : data.user.photoURL} alt="" className='file'/>
         <span>{}</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        { message.img && <img src={message.img} className='' alt="" />}
      </div> 
    </div>
  )
}

export default Message
