import React, { useState } from 'react'
import { useContext } from 'react'
import { userContext } from '../Context/userContext'
import UniversityApi from '../Hooks/UniversityApi.json'
import axios from 'axios'
import { signOut } from 'firebase/auth'
import { auth } from '../Auth/UserAuthentication'

export default function Nav({login, register, screen, close}) {


    
    const {user} = useContext(userContext)
    const currentUser = !user ? "" : user.email
  

  // location
  const [location, setLocation] = useState({
    university:""
  })




  function handleChange(e){
    const {name, value}= e.target

    setLocation(prev=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }

  function check(){
    UniversityApi.filter((el)=> {
        if(el.name === location.university)
        screen(prev => {
          return{
            lat:el.latitude,
            long:el.longtitude,
            name:el.name
          }
        })
        close() 
    })
  }

  function logout(){
   signOut(auth)
  }

  return (
    <div className='nav'>
      <div className="form">
        <select name="university" id="university" 
        value={location.university} 
        onChange={handleChange}
        onClick={check}>

          <option value="null">Pick your university here</option>
          {UniversityApi.map((element)=>{
              return(
                <option key={element.id}  value={element.name}>{element.acrimony}</option>
              )
            })
          }
        </select>
      </div>
      <div className="register">
        {currentUser ?
        <div className='use'>
        <h5>{user.email}</h5>
        <button className="btn logout" onClick={logout}>Log Out</button>
        </div>
         :
        <>
        <button className="btn login" onClick={login}>Login</button>
        <button className="btn signup" onClick={register}>Sign Up</button>
        </>}
        
      </div>
    </div>
  )
}

