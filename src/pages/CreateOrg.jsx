import React, {useState} from 'react'
import { Stack, Alert, Typography, Button, MenuItem, Select} from '@mui/material'
import {makeStyles} from '@mui/styles'
import { useSelector } from 'react-redux'

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
  }
})

const CreateOrg = () => {
  // const [value, setValue] = useState(' ')
  const classes = useStyles()
  const { clearError, error, loading, organizationUser } = useOrganizationService()

  const [name, setname] = useState("")
  const [number_of_seats, setNumber_of_seats] = useState("")
  const [number_of_employees, setNumber_of_employees] = useState("")
  // const [userEmail, setUserEmail] = useState("")
  // const [role, setRole] = useState("")
  // const [roleAtOrganization, setRoleAtOrganization] = useState("")

  const { user } = useSelector(store => store.user)
  const payload = {
    name, 
    number_of_seats,
    number_of_employees, 
    // userEmail, role, roleAtOrganization
  }
  const createOrganization = async(event) => {    
    event.preventDefault()
    try{
      // if(!user.profileID){
      //   alert('This user is not verified')
      // }else{
        const data = await organizationUser(payload, user.profileId)
        console.log(data)
      // }
      
    }catch (error){
     
    }
  }
  return (
    <Stack direction ='column'>
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
            <InputField type= 'number' label= 'Organization Seat' placeholder='Number of seats' value={number_of_seats} onChange={(e) => setNumber_of_seats(e.target.value)} />
          </div>
        </Stack>
        <Stack direction='column' my={2}>
          <div>
            <InputField type= 'number' label= 'Number of Employees' placeholder='Number of employees' value={number_of_employees} onChange={(e) => setNumber_of_employees(e.target.value)} />
          </div>
        </Stack>
        {/* <Stack direction='column' my={2}>
          <Typography variant='body1'>Seats can be added or removed at any time. The first 5 are FREE.</Typography>
        </Stack>
        <Typography variant='subtitle2'>Invite teammates to your new organization</Typography>
        <Stack direction='row' my={3}>
        <Stack direction='row'>
          <div>
            <InputField type= 'text' label= 'Username or Email' placeholder='name@example.com' value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
          </div>
          </Stack>
          <Stack direction='row' mx={2} width={155}>
              <Select style={{ width:'100%', height:'43px'}} value={role} onChange={(e) => setRole(e.target.value)}  fullWidth>
                <MenuItem value=''>Role</MenuItem>
                <MenuItem value="developer">Developer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </Select>
          </Stack>
        </Stack>
        <Stack direction='column' my={2}>
          <div>
            <InputField type= 'text' label= 'Role at the organization' placeholder='Your role at the organization (Optional)' id='halfWidth' value={roleAtOrganization} onChange={(e) => setRoleAtOrganization(e.target.value)}/>
          </div>
        </Stack> */}
          <Button style={{width:'15%', height:'45px'}} type='submit' variant='contained'>
          Confirm &amp; Continue
          </Button>
      </form>
  </Stack>
  )
}

export default CreateOrg