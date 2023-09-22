import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { ChatsContext } from '../context/ChatsContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function Messages() {
  const { data } = useContext(ChatsContext)
  const [ messages, setMessages] = useState([])

  useEffect( () => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])
  console.log(messages)

  return (
    <div className='messages'>
      {messages.map( m => (
        <Message message={m} key={m.id}/>
      ))}
    </div>
  )
}
