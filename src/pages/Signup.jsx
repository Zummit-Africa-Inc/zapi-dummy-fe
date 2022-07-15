import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Divider, Typography, Alert, Stack, ListItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CheckCircleOutline } from '@mui/icons-material'
import { Icon } from '@iconify/react'

import { useSignupService } from '../services/signupService'
import { InputField, LoadingSpinner, NavbarAuth } from '../components'

const useStyles = makeStyles({
    main: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 1rem',
        '@media screen and (max-width: 800px)': {
          flexDirection: 'column-reverse'
        }
    },
      section: {
        width: '100%',
        display: 'grid',
        placeItems: 'center',
        padding: '0 0.5rem',
        marginTop: '6rem',
      },
      section_two: {
        width: '100%',
        height: '85vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--base)',
        color: 'var(--white)',
        padding: '0 1rem',
        '@media screen and (max-width: 800px)': {
          height: '50vh',
        }
      },
      form: {
        width: '90%',
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

const SignupPage = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles()
    const navigate = useNavigate()
    const { error, loading, signupUser, clearError } = useSignupService()

    // @Taiwo Akindele, I think the special characters in this regex should be extended, they are too few.
    const PASSWORD_REGEX = /^(?=.*[a-zA-Z0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%_]).{8,20}$/

    const handleSubmit = async(e) => {
        e.preventDefault()

        const payload = { fullName, email, password }

        try{
            const data = await signupUser(payload)
            console.log(data)
        }catch(err) {}
        
        if(error) return
        navigate('/tokenpage')
        setFullName(''); setEmail(''); setPassword('');
    }

    return (
        <>
        {error && (
        <Alert style={{ position: 'absolute', top: '10%', zIndex:3 }} severity='error' onClose={clearError}>
            {error}
        </Alert>)}
        {loading && <LoadingSpinner />}
        <main className={classes.main}>
            <NavbarAuth />
            <section className={classes.section}>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <InputField required fullWidth type='text' label='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Enter your Full Name Here' />
                    <InputField required fullWidth type='email' label='Email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='johndoe@example.com' />
                    <InputField required fullWidth type='password' label='Password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password must be more than 6 characters' />
                    <Button disabled={!fullName || !email || !PASSWORD_REGEX.test(password)} type='submit' variant='contained'>
                        Sign Up
                    </Button>
                </form>

                <Stack direction='column' width='50%' mt={5}>
                    <Divider variant='middle'>
                        <Typography variant='body1'>or continue with</Typography>
                    </Divider>
                    <Button variant='text'>
                        Google <Icon icon='akar-icons:google-fill' style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }} />
                    </Button>
                    <Button variant='text'>
                        Github <Icon icon='akar-icons:github-fill' style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }} />
                    </Button>
                    <Button variant='text'>
                        Facebook <Icon icon='akar-icons:facebook-fill' style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }} />
                    </Button>
                </Stack>
                <Typography>Do you have an account?
                    <Link to='/login'>Login</Link>
                </Typography>
            </section>
            <section className={classes.section_two}>
                <Stack direction='column' width='70%' mt={5}>
                    <Typography variant='h4' fontWeight='bold' my={3}>
                        Find and Connect to Thousands of APIs
                    </Typography>
                    <ListItem>
                        <CheckCircleOutline />
                        <Typography variant='body1' mx={2}>
                            Discover APIs
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <CheckCircleOutline />
                        <Typography variant='body1' mx={2}>
                            Test from your browser
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <CheckCircleOutline />
                        <Typography variant='body1' mx={2}>
                            Connect using code snippets
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <CheckCircleOutline />
                        <Typography variant='body1' mx={2}>
                            Manage APIs from one dashboard
                        </Typography>
                    </ListItem>
                </Stack>
            </section>
        </main>
        </>
    )
}

export default SignupPage