import React, { createContext, useState } from 'react'

export const lugunContext = createContext()


export default function LugunContextProvider({children}) {
    const [lugun, setLugun] = useState([])

  return (
    <lugunContext.Provider value={[lugun, setLugun]}>
        {children}
    </lugunContext.Provider>
  )
}
