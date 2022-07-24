import React, { useState, useEffect, forwardRef, useImperativeHandle, } from 'react'
import { Stack, Typography, Alert, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { useEditService } from '../services/editProService'
import { LoadingSpinner, InputField } from '../components';
import { login, updateProfile } from '../redux/features/user/userSlice';


// const identity_url = process.env.REACT_APP_IDENTITY_URL


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
    const { user } = useSelector((state) => ({ ...state.user }));
    console.log(user)
    
    const cookies = new Cookies()
    const userId = cookies.get('userId')
    const { error, loading, editUser, clearError } = useEditService()
    const dispatch = useDispatch();
    const [state, setState] = useState({fullName: '', email: ''})
    const { fullName, email } = state;

    useEffect(() => {
      if(user) {
        setState({ ...user});
      }
    },[user])

    const handleInputChange = (e) => {
      let { name, value } = e.target;
      setState({ ...state, [name]: value});
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!fullName || !email) {
        clearError('please input all field');
      } else {
        dispatch(login(state));
        navigate(`/user/${userId}`);
        clearError('');
      }
    }



   







    // const handleEdit =  async (e) => {
    //   e.preventDefault()
      
    //   setValue({ fullName: '', email: ''});
    //   navigate(`/user/${userId}`)
       
    // }




  //   const handleSubmit = async(e) => {
  //     e.preventDefault()
  //   const payload = {email, fullName}
  //     try{
  //         const res = await editUser(payload)
  //         console.log(res)
  //     }catch(err) {}
      
  //     if(error) return
  //     navigate(`/user/${userId}`)
  //     setValue('')
  // }
    
    // const handleSubmit = (e) => {
    //   e.preventDefault()
      
    //   fetch(`${identity_url}/user/${userId}`, {
    //     method:'PATCH',
    //     headers:{
    //       'Accept': 'application/json, text/plain, */*',
    //       'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(data)
    //   }).then((res) => res.json())
    //     .then(res => {
    //       console.warn(res)
    //       if(res.ok) return
    //       navigate(`/user/${userId}`)
        
    //   }).catch(err => console.error(err))

      
    //     setData("")
    // }





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
      <InputField  type='text' label='Full Name' value={fullName || ''} name="fullName" onChange={handleInputChange} />

        <br />
        <InputField  type='email' label='Email' value={email || ''} name="email" onChange={handleInputChange}  />

        <br />
        <Button type='submit' variant='contained' onClick={handleInputChange} >
            Update
        </Button>
      </form>
    </Stack>
    
  </>
  )
})

export default EditProfile