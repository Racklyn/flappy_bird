import {createContext, useContext, useState} from 'react';


export const MainContext = createContext({});


export function MainContextProvider({children}){
  const [user, setUser] = useState({ 
    username: '',
    bestScore: undefined,
    bird: undefined,
})

  return(
    <MainContext.Provider 
        value={
            {
                user,
                setUser,
            }
        }
    >
        {children}
    </MainContext.Provider>
  )
}


export const useMain = () => {
    return useContext(MainContext)
}