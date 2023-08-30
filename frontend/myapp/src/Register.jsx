import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import axios from 'axios'

function Register() {

  const[username,setUsername]=useState()
  const[email,setEmail]=useState()
  const[password,setPassword]=useState()
  const navigate=useNavigate
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:8082/register',{username,email,password})
    .then(res=>navigate('/login'))
    .catch(err=>console.log(err))
  }
  return (
    <>
      
    <div className='signup_container'>
    <div  className='signup_form' >
        <form onSubmit={handleSubmit}>
          <h2>sign up</h2>
          <br></br>
            <div>
            <label htmlFor='name'>Username:</label>
            <input type='text' placeholder='Enter username'
            onChange={e=>setUsername(e.target.value)}/>
            </div>
            <div>
            <label htmlFor='email'>Email:</label>
            <input type='email' placeholder='Enter email'
            onChange={e=>setEmail(e.target.value)}/>
            </div>
            
            <div>
            <label htmlFor='password'>Password:</label>
            <input type='password' placeholder='Enter password'
            onChange={e=>setPassword(e.target.value)}/>
            </div>
            <br/>
            <div>
            <button  className= 'signup_btn'>Sign up</button>
            <p>Already have account</p>
           
            </div>
            <button className='signup'><Link to='/login'>Login</Link></button>
        </form>
        <br></br>
       
        
      </div>
    </div>
    </>
  )
}

export default Register