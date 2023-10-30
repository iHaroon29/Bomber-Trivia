import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from './app_context'

export const Protected = (props) => {
  const Auth = useContext(AuthContext)
  return Auth ? <Outlet /> : <Navigate to='/' />
}

export const Redirect = ({ path }) => {
  return <Navigate to={path} />
}
