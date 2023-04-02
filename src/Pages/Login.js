import React, {useState} from 'react'
import useUser from '../Hooks/useUser'
import { useContext } from 'react'
import { userContext } from '../Context/userContext'

export default function Login({close}) {

    const {user} = useContext(userContext)
    const {loginUser,error} = useUser()
    const [studentLoginForm, setStudentLoginForm] = useState({
        email:"",
        password:"",

    })

    const handleChange = (e) =>{
        const {name, value} = e.target
        setStudentLoginForm(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }


    const handleSubmit = (e) =>{
        e.preventDefault()
        loginUser(studentLoginForm)
        close()
    }


  return (
    <div className='reg-form'>
      <form onSubmit={handleSubmit}>
        <h4>Login your account</h4>
        <label htmlFor="username">Username: </label>
        <input type="text" name="email" id="email"
        value={studentLoginForm.email}
        onChange={handleChange}
        />
        <label htmlFor="password">Password: </label>
        <input type="password" name="password" id="password" 
        value={studentLoginForm.password}
        onChange={handleChange}
        />
        <button className=" btn login reg-sign">Login</button>
        {error && <p className="err">{error}</p>}
      </form>
    </div>
  )
}
