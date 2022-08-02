import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { Tab, Tabs, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'


import logo from '../assets/LOGO (3).png'
import { ApiMetrics, ApiDetails, Endpoints, EndpointSnippets, EndpointsParams, PopUp, ResizeableDiv, TabPanel, Pricing } from '../components'

const base_url = process.env.REACT_APP_BASE_URL

const useStyles = makeStyles({
  div:{
    width: '300px',
    minWidth: '50px',
    flexGrow: 1,
    background: 'transparent',
  },
  tabs_container:{
    width: '100%',
    height: '100%',
  }
})


const SingleApi = () => {
  
  const [tab, setTab]= useState(0);
  const classes = useStyles()
  const [openPopup, setOpenPopup] = useState(false)
  const [openCarousel, setOpenCarousel] = useState([])
  const { id } = useParams()
  

  try{
    async function getCarousel() {
        const res = await fetch(`${base_url}/api/${id}`)
        const data = await res.json()
        setOpenCarousel(data.data)
        console.log(openCarousel)
    }
    useEffect(() => {
        getCarousel()
    }, [])
  }catch (error){
      
  }

  const { user } = useSelector(store => store.user)
  const [data, setData] = useState([])
  const getSubscribedApi = async() => {
    const res = await fetch(`${base_url}/subscription/${user.profileId}/all`)
    const data = await res.json()
    setData(data.data)
    console.log(data)
  }

  useEffect(() => {
      getSubscribedApi()
  }, [])



 const isSubscribed = data.find((api) => api.id !== id)
//console.log(isSubscribed)

  return (
    <>
          {openPopup && <PopUp closePopUp={() => setOpenPopup(false)} />}
          <Stack direction='column'>
            {/* {array.map(item => ( */}
              <Stack>
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} my={2} spacing={2} justifyContent='space-between' alignItems='center' >
                  <ApiDetails image={logo} name={openCarousel.name} pricing='FREEMUIM' isVerified={false} author='zummit' lastUpdated='2days' category={openCarousel.name} featured='Popular APIs' />
                  <ApiMetrics popularity={9.9} latency={86} level={100} />
                </Stack>
                <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
                  <Tab label='Pricing' />
                  <Tab label='Endpoints' />
                  <Tab label='Tutorials' />
                </Tabs>
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} marginTop={2} spacing={2} alignItems='center'>
                  <Typography variant='h5'>{openCarousel.name} Api Documentation</Typography>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} spacing={2} my={1} alignItems='center'>
                  <Typography variant='subtitle1'>{openCarousel.description}</Typography>
                </Stack>
                <Stack className={classes.tabs_container}>
                  <TabPanel value={tab} index={0}>
                    <Stack direction='column'>
                      <Pricing isSubscribed={isSubscribed} setOpenPopup={setOpenPopup} />
                    </Stack>
                  </TabPanel>
                  <TabPanel value={tab} index={1}>
                    <Stack direction='row'>
                      <ResizeableDiv>
                        <Endpoints />
                      </ResizeableDiv>
                      <ResizeableDiv>
                        <EndpointsParams />
                      </ResizeableDiv>
                      <Stack direction='column' className={classes.div}>
                        <EndpointSnippets />
                      </Stack>
                    </Stack>
                  </TabPanel>
                  <TabPanel value={tab} index={2}>Tutorial</TabPanel>
                </Stack>
              </Stack>
            {/* ))} */}
          </Stack>
        </>
  )
}

export default SingleApi