import { createContext, useState } from 'react'

export const userContext = createContext()

export default function UserContextProvider({children}) {

    const [user, setUser] = useState({
      id:"",
      email:""
    })

    async function getUser(id, email){
      await setUser(prev=>{
        return{
          id,
          email
        }
      })
    }

  return (
    <userContext.Provider value={{user, getUser}}>
        {children}
    </userContext.Provider>
  )
}
