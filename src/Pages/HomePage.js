import React, { useContext, useEffect, useState } from 'react'
import Login from './Login'
import Nav from './Nav'
import Signup from './Signup'
import {MapProvider,Map, Popup} from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import Form from './Form';
import Location from './Location';
import { userContext } from '../Context/userContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/UserAuthentication';

export default function HomePage() {

  const [openLogin, setOpenLogin] = useState(false)
  const [openRegister, setOpenRegister] = useState(false)
  const {user, getUser} = useContext(userContext)
  const userId = !user ? "loading"  :user

  // here is a function that toggle the login form
  function toggleLogin(){
    if (openRegister === true){
      setOpenRegister(false)
    }
    setOpenLogin(prev => !prev)
  }


  // function to check if there is a  user 
  useEffect(()=>{
    function getUserData(){
      onAuthStateChanged(auth, async (data)=>{
        await getUser(data?.uid, data?.email)
      })
    }

    getUserData()
  }, [])


// here is a function that toggle the Register form
  function toggleRegister(){
    if (openLogin === true){
      setOpenLogin(false)
    }
    setOpenRegister(prev => !prev)
  }


  // state taht stores school locations
  const [screen, setScreen] = useState({
    lat:"",
    long:"",
    name:""
  })


  const [showForm, setShowForm] = useState(false)
  const [showTag, setShowTag] = useState(false)


  // form for the new locations
  const [lugun, setLugun] = useState({
    title:"",
    review:"",
    rating:"",
    lat:"",
    long:"",
  })

   // function that validate the inputs
    function handleChange(e){
    const {name, value} = e.target
      setLugun(prev=>{
        return{
          ...prev,
          [name]:value
        }
      })
    }


// function to get location on double click
  const handleDoubleClick = (e) =>{

    console.log(e)
    setLugun(prev=>{
      return{
        ...prev,
        lat:e.lngLat.lat,
        long:e.lngLat.lng,
      }
    })
    setShowForm(prev => !prev)
  } 

  // function to close the form
  function onClose(){
    setShowForm(prev => !prev)
  }




  return (
    <div className='home'>
      <div className='top'>
        <h1>Universities luguns</h1>
        <Nav login={toggleLogin} register={toggleRegister}  screen={setScreen} close={()=> setShowTag(true)}/>
      </div>
      {openRegister && <Signup close={toggleRegister}/>}
      {openLogin && <Login close={toggleLogin} />}
      <MapProvider>
          <Map
            initialViewState={{
              longitude: 11,
              latitude: 9,
              zoom: 5
            }}
            style={{width: "96vw", height: "90vh"}}
            mapStyle="mapbox://styles/abionaolushola/cl97jbqym004717lae5rwb4rf"
            mapboxAccessToken={process.env.REACT_APP_MAPTOKEN}
            onClick ={handleDoubleClick}
            dragRotate={false}
            cursor="auto"
          >

            {/* pop for schools in nigeria */}
            {showTag && <Popup longitude={screen.long} latitude={screen.lat}
              anchor="bottom"
              onClose={()=> setShowTag(prev => !prev)}
              closeOnClick= {true}
              >
              <h5>{screen.name}</h5>
            </Popup>}

          <Location />

         {showForm && <Form close={onClose} lugun={lugun} handleChange={handleChange} clear={()=> setLugun(null)}/> } 
            
          </Map>
      </MapProvider>
     
    </div>
  )
}
