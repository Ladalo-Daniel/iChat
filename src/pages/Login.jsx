import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [err, setErr] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    try{
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
      setLoginSuccess(true)
      setErr(false)
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch(err) {
      setErr(true)
      setLoading(false)
    }
  }

  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">DALLOH</span>
            <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" required/>
                <input type="password" placeholder="password" required />
                <button disabled={loading || loginSuccess} >{loading && !loginSuccess ? 'Logging in...' : 'Login'}</button>
                {loginSuccess && <span className='success'>Login Successfull, Redirecting...</span>}
                {err && <span className='error'>Invalid credentials!</span>}
            </form>
            <p>You don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login
