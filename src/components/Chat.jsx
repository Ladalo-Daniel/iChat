import React, { useContext, useState } from 'react'
import cam from '../img/cam.png'
import user from '../img/user.png'
import more from '../img/more.png'
import img2 from "../img/2.jpeg"
import Messages from './Messages'
import Input from './Input'
import { ChatsContext } from '../context/ChatsContext'
import { AuthContext } from '../context/AuthContext'

const Chat = () => {
const { data } = useContext(ChatsContext)
const { mobileMenubar, toggleMobileMenubar } = useContext(AuthContext)
// const [mobileMenubar, setMobileMenubar] = useState(false)

// const toggleMobileMenubar = () => {
//   setMobileMenubar(!mobileMenubar)
// }
   
  return (
    <div className="chat">
      <div className='chatInfo'>
        <div className="userChat">
             {data.user?.photoURL ? <img src={data.user?.photoURL } alt="img2" className="img2" /> : <img src={user} alt="" className="img2" /> }
              <div className="userChatInfo">
                  <span className='spam'>{data.user?.displayName}</span>
              </div>
        </div>
        <div className='chatIcons'>
          <img src={cam} alt="" />
          <img src={user} alt="" />
          <div className='chatIcons' onClick={toggleMobileMenubar}>
          { mobileMenubar?  <img src={more} alt="" /> : <span>X</span>}
          </div>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
