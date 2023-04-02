import React, { useContext, useState } from 'react'
import {ImLocation} from "react-icons/im"
import { Popup, Marker} from "react-map-gl";
import {BsFillStarFill} from "react-icons/bs"
import useLugun from '../Hooks/useLugun';
import { userContext } from '../Context/userContext';
import { lugunContext } from '../Context/lugunContext';

const Location = () => {


    const [featuresId, showFeaturesId] = useState(null)
    const [show, setShow] = useState(false)
    const{user}= useContext(userContext)
    const userId = !user ? "loading"  :user
    const [lugun] = useContext(lugunContext)
    const{deleteLocation} = useLugun()
   

    function handleClick(id){
        showFeaturesId(id) 
        setShow(prev => !prev)
    }
    // console.log(featuresId)

    // function to delete a location by the user themselves
    function handleDelete(id){
        deleteLocation(id)
        setShow(prev => !prev)
    }

    const random = Math.random()

  return (
    <div style={{postion:"relative"}}>
        {
            !lugun ? "Loading" : lugun.map((element)=>{
                return(
                    <div key={element.id}>
                        <Marker longitude={element.long} latitude={element.lat} 
                        anchor="bottom" 
                        onClick={()=> handleClick(element)}
                        >
                            <ImLocation style={{fontSize: "30", color:userId.id === element.userId ? "tomato" : "slateblue"}}  cursor={"pointer"}/>
                        </Marker>
                    </div>
                )
            })
        }
        {show &&
            <div className={featuresId ? "card show" : "card" } key={featuresId._id}>
                <h6 className="title">Title</h6>
                <p className="title-context">{featuresId.title}</p>
                <h6 className="desc">Review</h6>
                <p className="review-content">{featuresId.review}</p>
                <h6 className="rating">Rating</h6>
                <div className="rating-card">
                    {Array(Number(featuresId.rating)).fill(<BsFillStarFill style={{color:"gold"}} key={featuresId.lat}/>)}
                </div>
                <p className="posted">Created by <strong>{featuresId.userEmail}</strong></p>
                {userId.id=== featuresId.userId && <div className="out">
                    <button className='bttn reg-sign' onClick={()=> handleDelete(featuresId._id)}>Delete</button>
                </div>}
            </div>
        }
        
      
    </div>
  )
}

export default Location
