import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { InputField } from '../components';
import { Stack, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useFetch } from '../services/useFetch';

const identity_url = process.env.REACT_APP_IDENTITY_URL


const INITIAL_STATE = {
    id: 0,
    name: "",
    email: ""
  };

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

const EditProfile = () => {
    const { user } = useSelector(store => store.user)
    const [data, setData] = useState({});
    const classes = useStyles()

    const {id} = useParams()
    const { data:userData } = useFetch(`${identity_url}/user/${id}`)
    console.log(userData)
    // const getUser = id => {
    //    const user = {
    //     fullName: id.fullName,
    //     email: id.email

    //    }
    // }
    useEffect(() => {
      // setData({userData.fullName, userData.email})
    },[])
    // console.log(id)

    const userDetail = () => {

    }

    // const handleInput = (e) => {
    //     console.log(e.target.name, " : ", e.target.value);
    //     setUser({ ...users, [e.target.name]: e.target.value });
    //   };
    
    const handleSubmit = (e) => {
      console.warn(e.target.name, " : ", e.target.value);
      fetch(`${identity_url}/user/${id}`, {
        method:'PATCH',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
      }).then((res) => {
        res.json().then((resp) => {
          console.warn(resp)
         setData('')
        })
      })
    }





  return (
    <Stack direction='column' height='60vh' alignItems='center' justifyContent='center' textAlign='center' py={1} px={2}>
        <Typography variant='h4' my={2}>Edit Your Profile Here {user.fullName}</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          name="name"
          type="text"
          value={user.fullName}
          onChange={(e)=>setData( e.target.value)}
        />
        <br />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={(e)=>setData( e.target.value)}
        />
        <br />
        <Button type='submit' variant='contained'>
            Update
        </Button>
      </form>
    </Stack>
  )
}

export default EditProfile