import React, {useState} from 'react'
import { Stack, Alert, Typography, Button } from '@mui/material'
import {makeStyles} from '@mui/styles'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { InputField, LoadingSpinner } from '../components'
import { useOrganizationService } from '../services/organizationService'


const useStyles = makeStyles({
  form: {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'left'
  },
  formControl: {
    width: '100%'
  },
  padding: {
    paddingLeft: '30px'
  }
})

const CreateOrg = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { clearError, error, loading, organizationUser } = useOrganizationService()

  const [name, setname] = useState("")
  const [number_of_seats, setNumber_of_seats] = useState("")
  const [number_of_employees, setNumber_of_employees] = useState("")
  const { user } = useSelector(store => store.user)
  const payload = {
    name, 
    number_of_seats,
    number_of_employees, 
  }
  const createOrganization = async(event) => {    
    event.preventDefault()
    try{
        const data = await organizationUser(payload, user.profileId)
        console.log(data)
        navigate(`/orgs/${data.data.id}`)
    }catch (error){
     
    }
  }
  return (
    <Stack direction ='column' className={classes.padding}>
      {error && (
      <Alert style={{ position: 'absolute', top: '10%', zIndex:3 }} severity='error' onClose={clearError}>
        {error}
      </Alert>)}
      {loading && (<LoadingSpinner />)}
      <Stack direction='column' my={2}>
        <Typography variant='h5'>Create Your Organization</Typography>
        <Typography variant='body1'>Organization accounts allow your team to manage your API usage both internally and externally.</Typography>
      </Stack>
      <form className={classes.form} onSubmit={createOrganization}>
        <Stack direction='column' my={2}>
            <div>
              <InputField type= 'text' label= 'Organization Name' placeholder='Org name*' value={name} onChange={(e) => setname(e.target.value)}/>
            </div>
        </Stack>
        <Stack direction='row' my={2}>
          <Typography variant='body1'>This business name will own and control this organization account.</Typography>
        </Stack>
        <Stack direction='column' my={2}>
          <div>
            <InputField type= 'number' min="0" label= 'Organization Seat' placeholder='Number of seats' value={number_of_seats} onChange={(e) => setNumber_of_seats(e.target.value)} />
          </div>
        </Stack>
        <Stack direction='column' my={2}>
          <div>
            <InputField type= 'number' min="0" label= 'Number of Employees' placeholder='Number of employees' value={number_of_employees} onChange={(e) => setNumber_of_employees(e.target.value)} />
          </div>
        </Stack>
          <Button style={{width:'15%', height:'45px'}} type='submit' variant='contained'>
          Confirm &amp; Continue
          </Button>
      </form>
  </Stack>
  )
}

export default CreateOrg