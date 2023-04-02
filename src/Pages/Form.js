import React, { useContext } from 'react'
import {Popup} from "react-map-gl";
import { userContext } from '../Context/userContext';
import useLugun from '../Hooks/useLugun';

export default function Form({close, lugun, handleChange, clear}) {

    // hook
    const {postLocation} = useLugun()
    const {user} = useContext(userContext)

    const post = {
      ...lugun,
      userId: user.id,
      userEmail:user.email
    }
   // function that submit form
   function handleSubmit(e){
    e.preventDefault()
    postLocation(post)
    close()
    clear()
  }
  

  return (
    <div>
      <Popup longitude={lugun.long} latitude={lugun.lat}
            anchor="left"
            onClose={close}
            >
            <form className="card-form" onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" name="title" id="title" value={lugun.title} onChange={handleChange} required/>
                <label htmlFor="review">Review: </label>
                <textarea name="review" id="review" value={lugun.review} onChange={handleChange} placeholder="say what yo know about the location" required></textarea>
                <label htmlFor="rating">Rating:</label>
                <select name="rating" id="rating" value={lugun.rating} onChange={handleChange} required>
                    <option>choose rating</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                    <option value="4">Four</option>
                    <option value="5">Five</option>
                 </select>
                <button className='btn reg-sign'>Save</button>
            </form>
        </Popup>
    </div>
  )
}
