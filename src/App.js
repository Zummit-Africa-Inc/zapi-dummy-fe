import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Cookies from 'universal-cookie'

import { ForgotPassword, Home, LoginPage, SingleApi, UserProfile, EditProfile, Categories, Category, CreateOrg, Signup, Settings, MyApiPage, Endpoint } from './pages'
import { Navbar } from './components'
import { theme } from './theme'
import { getApis } from './redux/features/api/apiSlice'
import { getSingleApis } from './redux/features/singleApi/singleApiSlice'
import { login } from './redux/features/user/userSlice'
import ApiEndpoint from './pages/ApiEndpoint'
import OrganizationPage from './pages/OrganizationPage'
import OrgList from './pages/OrgList'
import { RequireAuth } from './components/RequireAuth'


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
  const navigate = useNavigate()
  const cookies = new Cookies()

  const accessToken = cookies.get('accessToken')

  const logInUser = () => {
    if(accessToken) {
      const accessToken = cookies.get('accessToken')
      const refreshToken = cookies.get('refreshToken')
      const profileId = cookies.get('profileId')
      const fullName = cookies.get('fullName')
      const email = cookies.get('email')
      const data = { accessToken, refreshToken, profileId, fullName, email}
      dispatch(login(data))
      navigate(`/user/${profileId}`)
    }
  }

  useEffect(() =>{
      dispatch(getSingleApis())
    },[])


  useEffect(() => {
    dispatch(getApis())
    logInUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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

          <Route element={<RequireAuth />}>

          <Route path='/api/api/new/:id' element={<MyApiPage />} />
          <Route path='/api/endpoint/new/:id' element={<ApiEndpoint />} />
          <Route path='/api/endpoints/:id' element={<Endpoint />} />

          {/* User Pages */}
          <Route path='/user/:id' element={<UserProfile />} />
          <Route path='/user/edit/:id' element={<EditProfile />} />
          <Route path='/user/settings' element={<Settings />} />

          {/* Organization Pages */}
          <Route path='/orgs/:Id'  element={<OrganizationPage />} />
          <Route path='/orgs/create-new' element={<CreateOrg />} />
          <Route path='/orgs-list/:id' element={<OrgList />} />
          
          </Route>

        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App