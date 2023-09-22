import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Messenger = () => {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className='loading'><h1>LOADING</h1></div>
      ) : (
      <div className="home">
        <div className="container">
        <Sidebar />
        <Chat />
        </div>
      </div>
      )}
    </>
  )
}

export default Messenger
