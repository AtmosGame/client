import axios from 'axios'
import Cookies from 'js-cookie'
import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  AuthContextProps,
  ContextProviderProps,
  UserInterface,
} from './interface'

const AuthContext = createContext({} as AuthContextProps)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInterface | undefined | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  )

  const jwtToken = Cookies.get('token')

  useEffect(() => {
    const getCurrUser = async () => {
      await axios
        .get('/api/auth/current', {
          headers: {
            Authorization: `Bearer ${jwtToken}}`,
          },
        })
        .then((response) => {
          setUser(response.data)
          setIsAuthenticated(true)
        })
        .catch((error) => {
          Cookies.remove('token')
          setUser(null)
          setIsAuthenticated(false)
        })
    }

    if (jwtToken) {
      getCurrUser()
    } else {
      setUser(null)
      setIsAuthenticated(false)
    }
  }, [jwtToken])

  const contextValue = { user, isAuthenticated }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}
