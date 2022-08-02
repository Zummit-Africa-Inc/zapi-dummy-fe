import React, { useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { Stack, Typography, Grid } from '@mui/material'
import { Textbox } from '../components'

const url = process.env.REACT_APP_BASE_URL

const SubscribedApiProfile = () => {
  const { user } = useSelector(store => store.user)
  const [data, setData] = useState([])

  const getSubscribedApi = async() => {
    const res = await fetch(`${url}/subscription/${user.profileId}/all`)
    const data = await res.json()
    setData(data.data)
    console.log(data)
  }

  useEffect(() => {
      getSubscribedApi()
  }, [])

  return (
    <Grid container spacing={1}>
      {data ? data.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Textbox {...item[0]} />
        </Grid>
      )): (
        <Stack alignItems='center' justifyContent='center'>
          <Typography variant='h5'>
            No subscribed APIs.
          </Typography>
        </Stack>
      )}
    </Grid> 
  )
}

export default SubscribedApiProfile
