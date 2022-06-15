import React, { useState } from 'react'
import { Stack, Typography, Tabs, Tab, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {TabPanel} from '../components'
import { UserHeader, UserTextbox } from '../components'

const array = ['Weather API', 'Entertainmet API', 'Transport API', 'Finance API', 'Food API', 'Other API']
const arrayApis = array.length

const useStyles = makeStyles({
  mainTab:{
    marginTop: '1rem',
    justifyContent:'center',
    borderBottom: '1px solid var(--base)'
  },
  tabpanel:{
    textAlign:'center',
    marginTop:'5rem',
  },
  tabs:{
    '&:hover':{
      backgroundColor: 'rgba(0,0,0,0.1)'
    }
  },
})

const UserProfile = () => {
  const classes = useStyles()
  const [tab, setTab] = useState(0)

  return (
    <Stack direction='column'>
      <UserHeader />
      <Stack>
        <Stack direction='row' spacing={20} style={{alignItems: 'center', marginTop:'2rem'}}>
          <Typography variant='h5' style={{ fontSize: '1rem'}}>Full Name</Typography>
          <Typography variant='h6' style={{ fontSize: '1rem'}}> Dummy Name</Typography>
        </Stack>
        <Stack direction='row' spacing={20} style={{alignItems: 'center', marginTop:'2rem'}}>
          <Typography variant='h5' style={{ fontSize: '1rem'}}>Username</Typography>
          <Typography variant='h6' style={{ fontSize: '1rem'}}> Dummy Name</Typography>
        </Stack>
        <Stack direction='row' spacing={20} style={{alignItems: 'center', marginTop:'2rem'}}>
          <Typography variant='h5' style={{ fontSize: '1rem'}}>Email</Typography>
          <Typography variant='h6' style={{ fontSize: '1rem'}}> Dummyemail@example.com</Typography>
        </Stack>
      </Stack>
      <Stack>
        <Tabs  className={classes.mainTab} value={tab} onChange={(e, newValue)=>setTab(newValue)}>
          <Tab  className={classes.tabs} label= {`Published APIs (${arrayApis})`}/>
          <Tab className={classes.tabs} label='APIs Following(0)'/>
          <Tab className={classes.tabs} label='Followed By(0)' />
          <Tab className={classes.tabs} label='Following(0)'/>
        </Tabs>
        <Stack className={classes.tabpanel}>
          <TabPanel value={tab} index={0}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {array ? array.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3} style={{ padding:'2rem'}} key={index}>
                <UserTextbox name={item} />
              </Grid>
            )) : <h2 >No Published APIs</h2>}
            </Grid> 
          </TabPanel>
          <TabPanel value={tab} index={1}>Not APIs Following</TabPanel>
          <TabPanel value={tab} index={2}>Not Followed Yet</TabPanel>
          <TabPanel value={tab} index={3}>Not Following Yet</TabPanel>
        </Stack>
      </Stack>
    </Stack>   
  )
}

export default UserProfile