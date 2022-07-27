import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Alert, Button, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { InputField, LoadingSpinner } from '../components'
import { useHttpRequest } from '../hooks/fetch-hook'
import { login } from '../redux/features/user/userSlice'

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'grid',
    placeItems: 'center',
  },
  form: {
    width: '90%',
    display: 'grid',
    placeItems: 'center',
    gap: '1.5rem',
    marginTop: '2rem',
    '@media screen and (max-width: 800px)': {
      width: '90%'
    },
    '@media screen and (min-width: 1270px)': {
      width: '60%'
    }
  }
})

const url = process.env.REACT_APP_IDENTITY_URL

const EmailVerify = () => {
  const [token, setToken] = useState('')
  const { clearError, error, loading, sendRequest } = useHttpRequest()
  const navigate = useNavigate()
  const classes = useStyles()
  
  const handleEmailVerification = async(e) => {
    e.preventDefault()

    if(!token) {
      return alert('Please enter a valid token')
    }

    try {
      await sendRequest(`${url}/email-verification/${token}`)
    } catch (error) {}

    if(error) return
    navigate('/login')
  }

  return (
    <>
    {error && (
      <Alert style={{ position: 'absolute', top: '10%', zIndex:3 }} severity='error' onClose={clearError}>
        {error}
      </Alert>)}
    {loading && <LoadingSpinner />}
    <Stack className={classes.root}>
      <Typography variant='h4' mt={4} mb={8}>
        Enter the OPT sent to your email address.
      </Typography>

      <Stack width='80%' alignItems='center' justifyContent='center'>
        <form onSubmit={handleEmailVerification} className={classes.form}>
          <InputField label='OTP' name='token' value={token} onChange={(e) => setToken(e.target.value)} placeholder='One Time Password' fullWidth />
          <Button variant='contained' type='submit'>
            Confirm
          </Button>
        </form>
      </Stack>
    </Stack>
    </>
  )
}

export default EmailVerify