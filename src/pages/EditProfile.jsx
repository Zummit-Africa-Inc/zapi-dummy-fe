import React, { useState, useEffect, forwardRef, useImperativeHandle, } from 'react'
import { Stack, Typography, Alert, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { useEditService } from '../services/editProService'
import { LoadingSpinner, InputField } from '../components';
import { login, updateProfile } from '../redux/features/user/userSlice';
import { useHttpRequest } from '../hooks/fetch-hook'





  const useStyles = makeStyles({
    form: {
        width: '50%',
        display: 'grid',
        placeItems: 'center',
        gap: '1rem',
        marginTop: '2rem',
        '@media screen and (max-width: 800px)': {
          width: '90%'
        },
        '@media screen and (min-width: 1270px)': {
          width: '60%'
        }
    }
  })

const EditProfile = (() => {
    const classes = useStyles()
    const navigate = useNavigate()
    // const { user } = useSelector((state) => ({ ...state.user }));
    const { user } = useSelector(store => store.user );
    console.log(user)
    
    const cookies = new Cookies()
    const userId = cookies.get('userId')
    const { error, loading, editUser, clearError } = useEditService()
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState(user.fullName)
    const [email, setEmail] = useState(user.email)
    const identity_url = process.env.REACT_APP_IDENTITY_URL


  

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   const payload = { fullName, email };
    //   if (!fullName || !email) {
    //     clearError('please input all field');
    //   } else {
    //     dispatch(updateProfile(payload));
    //     navigate(`/user/${userId}`);

    //     cookies.set('fullName', fullName)
    //     cookies.set('email', email)
    //     clearError('');
    //   }
   
    // const handleSubmit = async(e) => {
    //   const payload = { fullName, email }
    //   const body = JSON.stringify(payload)
    //   const headers = {'Content-Type': 'application/json'}
    //   try{
    //     const data = await editUser(`${identity_url}/user/${userId}`, 'PATCH', body, headers)
    //     dispatch(updateProfile(data));
    //     navigate(`/user/${userId}`);

    //     cookies.set('fullName', fullName);
    //     cookies.set('email', email);

    //   }catch(error) {
    //     console.log(error)
    //   }
    // }


    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = { fullName, email }

      try{
        const data = await editUser(payload)
        console.log(data)
        dispatch(updateProfile(payload));
        navigate(`/user/${userId}`);
        cookies.set('fullName', fullName);
        cookies.set('email', email);

      }catch (error) {
        console.log(error)
      }
     }



  return (
    <>
     {error && (
        <Alert style={{ position: 'absolute', top: '10%', zIndex:3 }} severity='error' onClose={clearError}>
            {error}
        </Alert>)}
      {loading && <LoadingSpinner />}
    
    <Stack direction='column' height='60vh' alignItems='center' justifyContent='center' textAlign='center' py={1} px={2}>
        <Typography variant='h4' my={2}>Edit Your Profile Here {user.fullName} </Typography>
      <form className={classes.form} onSubmit={handleSubmit} >
      <InputField  type='text' label='Full Name' value={fullName || ''} name="fullName" onChange={(e) => setFullName(e.target.value)} />

        <br />
        <InputField  type='email' label='Email' value={email || ''} name="email" onChange={(e) => setEmail(e.target.value)}  />

        <br />
        <Button type='submit' variant='contained' >
            Update
        </Button>
      </form>
    </Stack>
    
  </>
  )
})

export default EditProfile