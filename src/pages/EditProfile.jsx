import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { InputField } from '../components';
import { Stack, Typography, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'

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
    const [users, setUser] = useState(INITIAL_STATE);
    const classes = useStyles()
    
    const handleInput = (e) => {
        console.log(e.target.fullName, " : ", e.target.value);
        setUser({ ...users, [e.target.fullName]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          console.log("Data for update : ", user);
          const response = await fetch(`${identity_url}/user/user_id`, user);
        } catch (error) {
          console.log(error);
        }
      };




  return (
    <Stack direction='column' height='60vh' alignItems='center' justifyContent='center' textAlign='center' py={1} px={2}>
        <Typography variant='h4' my={2}>Edit Your Profile Here {user.fullName}</Typography>
      <form className={classes.form}>
        <InputField
          name="name"
          type="text"
          value={user.fullName}
          placeholder={"Your names"}
          onChange={handleInput}
        />
        <br />
        <InputField
          name="email"
          type="email"
          value={user.email}
          placeholder={"Your email"}
          onChange={handleInput}
        />
        <br />
        <Button type='submit' variant='contained' >
            Update
        </Button>
      </form>
    </Stack>
  )
}

export default EditProfile