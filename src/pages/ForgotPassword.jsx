import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Button, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { InputField } from '../components'

const useStyles = makeStyles({
  form: {
    width: '50%',
    display: 'grid',
    placeItems: 'center',
    gap: '2rem',
    marginTop: '3rem',
    '@media screen and (max-width: 800px)': {
      width: '90%'
    },
    '@media screen and (min-width: 1270px)': {
      width: '60%'
    }
  }
})

const identity_url = process.env.REACT_APP_IDENTITY_URL


const ForgotPassword = () => {
  const classes = useStyles()
  const [msg, setMsg] = useState('')
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    const userData = {email: email}
    try{
      const url = `${identity_url}/auth/forgot/post`;
      const res = await axios.post(url, userData);
      // console.log(res);
      setMsg(res.data.message);
      setError("");   
    } catch (error){
      console.log(error);
      if (
        error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
      ){
        setError(error.response.data.message);
				setMsg("");
      }
    }
  }

  

  return (
  <Stack direction='column' height='60vh' alignItems='center' justifyContent='center' textAlign='center' py={1} px={2}>
    <Typography variant='h5' gutterBottom>
      Forgot your password?
    </Typography>
    <Typography variant='body1'>
      No need to worry, we'll send you an email with instructions to reset.
    </Typography>
        {error && <div className="error_msg">{error}</div>}
				{msg && <div className="success_msg">{msg}</div>}
    <form className={classes.form} onSubmit={handleSubmit}>
      <InputField fullWidth type='email' value={email} required onChange={(e) => setEmail(e.target.value)} label='Email' placeholder='Enter your email' />
      <Button type='submit' variant='contained'>
        reset password
      </Button>
    </form>
    <Typography variant='body1' mt={6}>
      <Link to='/login'>
        &larr; Back to log in.
      </Link>
    </Typography>
  </Stack>
  )
}

export default ForgotPassword