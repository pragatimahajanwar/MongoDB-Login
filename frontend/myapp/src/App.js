import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from './Register';
import Login from './Login';
import Home from './Home';
import axios from 'axios';
import Create from './Create';
import Post from './Post'
import EditPost from './EditPost';

export const userContext= createContext()

export default function App() {

 const [user , setUser] = useState({})
  
 axios.defaults.withCredentials = true;
 useEffect(()=> {
  axios.get("http://localhost:8082")
  .then(user => {
   setUser(user.data)
  })
  .catch(err => console.log(err))
 }, [])


  return (
    <userContext.Provider value={user}>
    <BrowserRouter>
    <Navbar/>
     <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/register" element={<Register/>}/>
       <Route path="/login" element={<Login/>}/> 
       <Route path="/create" element={<Create/>}/> 
       <Route path="/post/:id" element={<Post/>}/> 
       <Route path="/editpost/:id" element={<EditPost/>}/> 
      
     </Routes>
    </BrowserRouter>
    </userContext.Provider>
   
      
 
  )
}
