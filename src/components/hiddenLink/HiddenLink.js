import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIN } from '../../redux/slice/AuthSlice'
const ShowOnLogin = ({children}) => {
    const isLoggedIn=useSelector(selectIsLoggedIN)
    if (isLoggedIn)
    {
        return children
    }
  return null
}

export const ShowOnLogout = ({children}) => {
    const isLoggedIn=useSelector(selectIsLoggedIN)
    if (!isLoggedIn)
    {
        return children
    }
  return null
}

export default ShowOnLogin;