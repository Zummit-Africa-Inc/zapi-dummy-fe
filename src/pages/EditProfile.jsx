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
    const { user } = useSelector(store => store.user );
    const cookies = new Cookies()
    const userId = cookies.get('userId')
    const { error, loading, editUser, clearError } = useEditService()
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState(user.fullName)
    



    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = { fullName }

      try{
        const data = await editUser(payload)
        console.log(data)
        dispatch(updateProfile(payload));
        navigate(`/user/${userId}`);     
        cookies.set('fullName', fullName)
        window.location.reload()
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
        <Button type='submit' variant='contained' >
            Update
        </Button>
      </form>
    </Stack>
    
  </>
  )
})

export default EditProfile