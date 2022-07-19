import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { ForgotPassword, Home, LoginPage, SingleApi, UserProfile, EditProfile, Categories, Category, CreateOrg, Signup, Settings, MyApiPage, Endpoint } from './pages'
import { Navbar } from './components'
import { theme } from './theme'
import { getApis } from './redux/features/api/apiSlice'
import { getSingleApis } from './redux/features/singleApi/singleApiSlice'
import { getWithExpiry } from './services/loginService'
import { login } from './redux/features/user/userSlice'
import ApiEndpoint from './pages/ApiEndpoint'
import OrganizationPage from './pages/OrganizationPage'
import OrgList from './pages/OrgList'

const useStyles = makeStyles({
  router_container: {
    width: `100%`,
    marginTop: '6rem',
  }
}) 

const App = () => {
  const [query, setQuery] = useState('')
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isLoggedIn, user } = useSelector(store => store.user)

  const getUserFromLS = () => {
    const user = getWithExpiry('user')
    if(!user) return null
    dispatch(login(user))
  }

  useEffect(() =>{
      dispatch(getSingleApis())
    },[]) 

  useEffect(() => {
    dispatch(getApis())
    getUserFromLS()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    dispatch(getSingleApis())
  })

  return (
    <ThemeProvider theme={theme}>
      <Navbar query={query} setQuery={setQuery} />
      <div className={classes.router_container}>
        <Routes>
          {/* General Pages */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />

          {/* API Pages */}
          <Route path='/api/:id' element={<SingleApi />} />
          <Route path='/api/categories' element={<Categories />} />
          <Route path='/api/categories/:id' element={<Category />} />
          <Route path='/api/api/new/:id' element={isLoggedIn ? <MyApiPage /> : <Navigate to='/login' />} />
          <Route path='/api/endpoint/new/:id' element={isLoggedIn ? <ApiEndpoint /> : <Navigate to='/login' />} />
          <Route path='/api/endpoints/:id' element={isLoggedIn ? <Endpoint /> : <Navigate to='/login' />} />

          {/* User Pages */}
          <Route path='/user/:id' element={isLoggedIn ? <UserProfile /> : <Navigate to='/login' />} />
          <Route path='/user/edit/:id' element={isLoggedIn ? <EditProfile /> : <Navigate to='/login' />} />
          <Route path='/user/settings' element={isLoggedIn ? <Settings /> : <Navigate to='/login' />} />

          {/* Organization Pages */}
          <Route path='/orgs/:id'  element={isLoggedIn ? <OrganizationPage /> : <Navigate to='/login' />} />
          <Route path='/orgs/create-new' element={isLoggedIn ? <CreateOrg /> : <Navigate to='/login' />} />
          <Route path='/orgs-list/:id' element={isLoggedIn ? <OrgList /> : <Navigate to='/login' />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App