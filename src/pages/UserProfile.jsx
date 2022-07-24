import React, { useState, useRef, useEffect } from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { Avatar, Stack, Typography, Tabs, Tab, Grid, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useFetch } from '../services/useFetch';
import {TabPanel} from '../components'
import { UserHeader, UserTextbox } from '../components'
import SubscribedApiProfile from '../components/SubscribedApiProfile'




const base_url = process.env.REACT_APP_BASE_URL

const useStyles = makeStyles({
  mainTab:{
    marginTop: '1rem',
    justifyContent:'center',
    borderBottom: '1px solid var(--base)'
  },
  tabpanel:{
    textAlign:'center',
    margin:'1rem 0',
  },
  tabs:{
    '&:hover':{
      backgroundColor: 'rgba(0,0,0,0.1)'
    }
  },
  form: {
    width: '50%',
    display: 'grid',
    placeItems: 'center',
    gap: '1rem',
    marginTop: '2rem',
    '@media screen and (max-width: 800px)': {
      width: '90%'
    },
    '@media screen and (min-width: 1270px)': {
      width: '60%'
      }
  }, main: {
    borderRadius: '90px 0 0 0 ',
    height: '150px',
    backgroundColor: 'var(--mid)',
    border:'none',
  },
  image: {
    position: 'static !important',
    margin: '-3rem 0 0 2rem',
    border: '3px solid var(--mid)',
  },
})

const UserProfile = () => {
  const [tab, setTab] = useState(0)
  const classes = useStyles()
  const { data } = useFetch(`${base_url}/api`)
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.user}));
  console.log(user.fullName)
  


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
      <UserHeader image={user.image} id={user.profileId} />
      <Stack direction='column' spacing={2} my={4} >
          <Typography variant='h6' style={{ fontSize: '1rem'}}>
            Name: 
            <span style={{ color: 'var(--base)', marginLeft: 10 }}>
              {user.fullName ? user.fullName : 'Dummy Name'}
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
          <Tab className={classes.tabs} label='Subscribed APIs'/>
          <Tab className={classes.tabs} label='Followed By(0)' />
          <Tab className={classes.tabs} label='Following(0)'/>
        </Tabs>
        <Stack className={classes.tabpanel}>
          <TabPanel value={tab} index={0}>
          <Grid container spacing={1}>
            {lists ? lists.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                <UserTextbox key={item} name={item.name} id={item.id} description={item.description}/>
              </Grid>
            )) : 
            <Stack alignItems='center' justifyContent='center'>
              <h2 >No Published APIs</h2>
            </Stack>}
            </Grid> 
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <SubscribedApiProfile />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            Not Followed Yet
          </TabPanel>
          <TabPanel value={tab} index={3}>
            Not Following Yet
          </TabPanel>
        </Stack>
      </Stack>
    </Stack>   
  )
}

export default UserProfile