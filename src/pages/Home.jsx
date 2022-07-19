import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { Carousel, LoadingSpinner, Sidebar } from '../components'
import { clearError } from '../redux/features/api/apiSlice'

const useStyles = makeStyles({
  section: {
    width: '80%',
    display: 'block',
    padding: 0,
    minWidth: 0,
    '@media screen and (max-width: 1200px)': {
      width: '100%'
    }
  },
  sidebar: {
    width: '20%',
    height: '100%',
    '@media screen and (max-width: 1200px)': {
      width: 0
    }
  },
  showcase: {
    width: '100%',
    padding: '0 0.5rem',
  },
  main: {
    width: '100%',
    display: 'flex',
    marginTop: '6rem',
    padding: '0 1rem'
  },
})

const Home = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector(store => store.apis)

  if(isLoading) return <LoadingSpinner />

  return (
    <>
    {error && (
      <Alert style={{ position: 'absolute', top: '10%', zIndex:3 }} severity='error' onClose={() => dispatch(clearError())}>
        {error}
      </Alert>)}
    <main className={classes.main}>
      <div className={classes.sidebar}>
        <Sidebar />
      </div>
      <div className={classes.section}>
        <Stack width='100%' mb={8}>
          <Typography variant='h4' gutterBottom>
            Welcome to the API hub,
          </Typography>
          <Typography variant='subtitle1'>
            Here you will find our collection of APIs for developers.
          </Typography>
        </Stack>
        <div className={classes.showcase}>
          <Carousel header='Recommended APIs' description='APIs curated by Z-API and recommended based on functionality offered, performance, and support.' category='recommended' />
          <Carousel header='Popular APIs' description='APIs that are popular and frequently used on Z-API.' category='popular' />
          <Carousel header='Free Public APIs for developer' description='If you&apos;re new to Z-API, this collection is a great place to start exploring APIs that are free to test, specifically updated for 2021.' category='free public' />
          <Carousel header='Top Weather APIs' description='List of the Best Weather APIs to provide historical and trending weather forecasts.' category='location' />
        </div>
      </div>
    </main>
    </>
  )
}

export default Home