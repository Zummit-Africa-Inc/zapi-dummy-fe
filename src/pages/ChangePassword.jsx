import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
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

const ChangePassword = () => {
  const classes = useStyles()
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const param = useParams();

  const PASSWORD_REGEX = /^(?=.*[a-zA-Z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%_]).{8,20}$/

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== passwordConfirm) {
      setError("Passwords don't match");
			setNewPassword("");
			setPasswordConfirm("");
			setTimeout(()=>{
				setError("");
			}, 5000);
			
		} 

    // const userData = { password, newPassword, passwordConfirm }
    // try{
    //   const res = await axios.post(url, userData);
    //   console.log(res);
    // } catch (err){
    //   if(error) return
    //   setPassword(''); setNewPassword(''); setPasswordConfirm('');
    // }
  }
  return (
    <>
    <Stack direction='column' height='60vh' alignItems='center' justifyContent='center' textAlign='center' py={1} px={2}>
    <Typography variant='h5' gutterBottom>
      Change your password
    </Typography>
    {error && <div className="error_msg">{error}</div>}
	{msg && <div className="success_msg">{msg}</div>}
    <form className={classes.form} onSubmit={handleSubmit}>
      <InputField fullWidth type='password' name="password" value={password} required onChange={(e) => setPassword(e.target.value)} label='Old Password' placeholder='Enter your current password' />
      <InputField fullWidth type='password' name="password" value={newPassword} required onChange={(e) => setNewPassword(e.target.value)} label='New Password' placeholder='Enter your New password' />
      <InputField fullWidth type='password' name="passwordConfirm" value={passwordConfirm} required onChange={(e) => setPasswordConfirm(e.target.value)} label='Confirm Password' placeholder='Confirm your new password' />
      <Button disabled={!password || !newPassword || !passwordConfirm || !PASSWORD_REGEX.test(!newPassword)} type='submit' variant='contained'>
        Submit
      </Button>
    </form>
    <Typography variant='body1' mt={6}>
      <Link to='/login'>
        &larr; Back to log in.
      </Link>
    </Typography>
  </Stack> 
  </>  )
}

export default ChangePassword;