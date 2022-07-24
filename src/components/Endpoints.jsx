import React from 'react'
import { Stack, Typography } from '@mui/material'

import { useSelector } from 'react-redux'
import { InputField } from './index'
import { useParams } from 'react-router';
import { useFetch } from '../services/useFetch';

const base_url = process.env.REACT_APP_BASE_URL


const Endpoints = (props) => {
  const { id } = useParams()

  const { data } = useFetch(`${base_url}/endpoints/single-api/${id}`)
  const { user } = useSelector(store => store.user)

  const createData = (name, method ) => {
      return { name, method }
  }

  const lists = []
  data.map((endpoint) => {
      if (endpoint.profileId === user.profileId) {
          lists.push(createData(endpoint.name, endpoint.method))
      }
  })
  
  console.log(lists)

  return (
    <>
    <Stack direction='column'>
      <Stack width='100%' height='72px' px={1} py={2} style={{ background: 'var(--grey)'}}>
        <InputField placeholder='Search...' />
      </Stack>
      <Stack direction='column' my={1}>
      {lists.map((item) => (
        <Stack  key={item.id} direction='row' spacing={1} alignItems='center'>
          <Typography variant='caption' color='success'>
          {item.method || 'GET' }
          </Typography>
          <Typography variant='body1'>
          {item.name|| 'endpoint one'}
          </Typography>
        </Stack>
        ))}
      </Stack>
    </Stack>
    </>
  )
}

export default Endpoints