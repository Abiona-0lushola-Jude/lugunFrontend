import { useState } from "react"
import { useContext } from "react"
import { userContext } from "../Context/userContext"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../Auth/UserAuthentication"

export default function useUser() {

    const {user, getUser} = useContext(userContext)
    const [error, setError] = useState(null)

    async  function registerUser(email, password){
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await getUser(res.user.uid, res.user.email)
            setError(null)
        } catch (err) {
            console.log(err)
        }
    }


    async function loginUser (value){
        try {
            const res = await signInWithEmailAndPassword(auth, value.email, value.password)
            await getUser(res.user.uid, res.user.email)
            setError(null)
        } catch (err) {
            setError(err.message)
        }
    }


  return {user, error, registerUser, loginUser}
}
