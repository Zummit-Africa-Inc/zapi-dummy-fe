import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Stack, Typography, Tabs, Tab, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useFetch } from '../services/useFetch';
import {TabPanel} from '../components'
import { UserHeader, UserTextbox } from '../components'

// const array = ['Weather API', 'Entertainment API', 'Transport API', 'Finance API', 'Food API', 'Other API']
// const arrayApis = array.length

const base_url = process.env.REACT_APP_BASE_URL

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
  const [tab, setTab] = useState(0)
  const classes = useStyles()
  const { data } = useFetch(`${base_url}/api`)
  const { user } = useSelector(store => store.user)

  const listData = (name, id, description ) => {
      return { name, id, description }
  }

  const lists = []
  data.map((api) => {
      if (api.profileId === user.profileId) {
          lists.push(listData(api.name, api.id, api.description))
      }
  })
  const arrayApis = lists.length
  console.log(lists)
  

  return (
    <Stack direction='column' px={1}>
      <UserHeader image={user.image} id={user.id} />
      <Stack direction='column' spacing={2} my={4} >
          <Typography variant='h6' style={{ fontSize: '1rem'}}>
            Name: 
            <span style={{ color: 'var(--base)', marginLeft: 10 }}>
              {user.fullName ? user.fullName : 'Dummy Name'}
            </span>
          </Typography>
          <Typography variant='h6' style={{ fontSize: '1rem'}}>
            username: 
            <span style={{ color: 'var(--base)', marginLeft: 10 }}>
              {user.username ? user.username : '@username'}
            </span>
          </Typography>
          <Typography variant='h6' style={{ fontSize: '1rem'}}>
            Email: 
            <span style={{ color: 'var(--base)', marginLeft: 10 }}>
              {user ? user.email : 'someone@example.com'}
            </span>
          </Typography>
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
            { data.map((item, index) => (
              item.profileId === user.profileId ?
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3} style={{ padding:'2rem'}} key={index}>
                <UserTextbox key={item.id}>{item}</UserTextbox>
              </Grid>
             : <h2 >No Published APIs</h2>))}
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