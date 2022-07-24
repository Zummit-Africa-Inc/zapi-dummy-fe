import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export const RequireAuth = () => {
  const { isLoggedIn } = useSelector(store => store.user)
  const location = useLocation()

  return (
    !isLoggedIn ? <Navigate to='/login' state={{ from: location }} replace /> : <Outlet />
    
  )
}