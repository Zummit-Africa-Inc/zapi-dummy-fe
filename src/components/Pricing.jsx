import React, { useEffect, useState } from 'react'
import { Avatar, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import { KeyboardArrowDown, LooksOne, LooksTwo, Looks3 } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { makeStyles } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'

import PricingTable from './PricingTable'
import developers from '../assets/people.webp'
import publicapis from '../assets/public.webp'
import apicalls from '../assets/apicalls.webp'
import countries from '../assets/countries.webp'
import sponsors from '../assets/sponsors.webp'
import charts from '../assets/charts.webp'

const useStyles = makeStyles({
    section: {
        margin: '1.5rem 0 0 0 ',
    },
    user: {
        width: '90%',
        border: '1px solid var(--mid)',
        borderRadius: '5px',
        padding: '0.5rem',
        margin: '1rem 0 2rem',
    },
    img: {
        '@media screen and (max-width: 800px)': {
            marginTop: '2rem',
        }
    }
})

const Pricing = ({setOpenPopup, isSubscribed}) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const { user } = useSelector(store => store.user)

    const handleMenu = (e) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }


  return (
    <Stack direction='column' alignItems='center' justifyContent='center'>
        {/* Heading Section */}
        <Stack direction='column' width='70%' alignItems='center' textAlign='center'>
            <Typography variant='h5' gutterBottom>
                Choose the Right Plan For You
            </Typography>
            <Typography variant='subtitle1' textAlign='center'>
                RapidAPI partners directly with API providers to give you no-fuss, transparent pricing. Find a plan that best matches the scale you need for your application.
            </Typography>
        </Stack>
        {/* Select Account Section */}
        <Stack direction='row' alignItems='center' justifyContent='space-between' className={classes.user}>
           <Stack direction='row' alignItems='center'>
               <Avatar sx={{width: 35, height: 35, objectFit: 'contain'}}/>
               <Stack direction='column' px={4}>
                   <Typography variant='body1'>Personal Account</Typography>
                   <Typography variant='caption'>{user.fullName}</Typography>
               </Stack>
           </Stack>
           <IconButton onClick={handleMenu}>
               <KeyboardArrowDown />
           </IconButton>
           <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
               <MenuItem onClick={handleClose}>
                    <Stack direction='row' alignItems='center'>
                        <Avatar sx={{ width: 35, height: 35, objectFit: 'contain' }}/>
                        <Stack direction='column'>
                            <Typography variant='body1'>Personal Account</Typography>
                            <Typography variant='caption'>Dummy Name</Typography>
                        </Stack>
                    </Stack>
               </MenuItem>
           </Menu>
        </Stack>
        {/* Pricing Table Section */}
        <Stack direction='column' width='80%' alignItems='center' justifyContent='space-between'>
            <PricingTable isSubscribed={isSubscribed} setOpenPopup={setOpenPopup} />
        </Stack>
         {/* FAQ Section */}
        <Stack direction='column' width='70%' textAlign='center'>
            <Stack direction='column' className={classes.section}>
                <Typography variant='h5' gutterBottom>
                        Frequently Asked Questions
                </Typography>
                <Stack textAlign='left'>
                  <Typography variant='body1'>
                        <strong>Is my payment information secure?</strong>
                   </Typography>
                   <Typography variant='caption'>
                        Credit cards are processed through a PCI compliant banking partner.
                   </Typography>
                </Stack><br/>
                <Stack textAlign='left'>
                  <Typography variant='body1'>
                        <strong>Why do you require a credit card for a freemium API?</strong>
                   </Typography>
                   <Typography variant='caption'>
                        We work directly with API providers to implement clear, transparent pricing for developers. The Provider may require a credit card if a plan has a quota with an overage fee. If you would no longer like to use the API, you can unsubscribe from the plan at anytime by clicking the "unsubscribe" button under the Billing section of the API Hub Dashboard.
                   </Typography>
                </Stack><br/>
                <Stack textAlign='left'>
                  <Typography variant='body1'>
                        <strong>What if I exceed my plan limits?</strong>
                   </Typography>
                   <Typography variant='caption'>
                        Depending on your plan's specification, you will either incur overage charges or be suspended.
                   </Typography>
                </Stack><br/>
                <Stack textAlign='left'>
                  <Typography variant='body1'>
                        <strong>When will I be billed?</strong>
                   </Typography>
                   <Typography variant='caption'>
                        We charge your credit card upon subscription to an API's plan and at the next recurring interval.
                   </Typography>
                </Stack><br/>
                <Stack textAlign='left'>
                  <Typography variant='body1'>
                        <strong>How are refunds handled?</strong>
                   </Typography>
                   <Typography variant='caption'>
                        For refund requests, please contact us at support@rapidapi.com
                   </Typography>
                </Stack><br/>
            </Stack>
        </Stack>
        {/* ScaleFeatures-Section */}
        <Stack direction='column' width='70%' textAlign='center'>
            <Typography variant='h5' gutterBottom>
                    A Proven Platform With Scale
            </Typography>
            <Typography variant='subtitle1' textAlign='center'>
                    Starting with the Google Search API - you have access to an extensive ecosystem to accelerate your development process
            </Typography>
            <Stack alignItems='center'>
                <Stack textAlign='center' justifyContent='space-between' spacing={12} direction={{xs: 'column', sm: 'column', md: 'row', lg: 'row'}} mt={2}>
                    <Stack alignItems='center'>
                        <img className={classes.img} src={developers} alt="developers" width="75px" height="60px" />
                        <Typography variant='h5' gutterBottom>
                            3,000,000
                        </Typography>
                        <Typography variant='subtitle1' textAlign='center'>
                            Developers
                        </Typography>
                    </Stack>
                    <Stack alignItems='center'>
                        <img className={classes.img} src={publicapis} alt="publicapis" width="75px" height="60px" />
                        <Typography variant='h5' gutterBottom>
                            Thousands
                        </Typography>
                        <Typography variant='subtitle1' textAlign='center'>
                            of Public APIs
                        </Typography>
                    </Stack>
                    <Stack alignItems='center'>
                        <img className={classes.img} src={apicalls} alt="apicalls" width="75px" height="60px" />
                        <Typography variant='h5' gutterBottom>
                            Billions
                        </Typography>
                        <Typography variant='subtitle1' textAlign='center'>
                            of API Calls / Month
                        </Typography>
                    </Stack>
                    <Stack alignItems='center'>
                        <img className={classes.img} src={countries} alt="countries" width="75px" height="60px" />
                        <Typography variant='h5' gutterBottom>
                            175
                        </Typography>
                        <Typography variant='subtitle1' textAlign='center'>
                            Countries served
                        </Typography>
                    </Stack>
                </Stack>
                <Stack mt={2} maxWidth='100%'>
                    <img src={sponsors} alt="sponsors" />
                </Stack><br/>
            </Stack>
        </Stack>
        {/* ScaleFeatures-SectionII */}
        <Stack direction='column' width='70%' textAlign='center'>
            <Typography variant='h5' gutterBottom>
                One Dashboard, All Your APIs
            </Typography>
            <Typography variant='subtitle1' textAlign='center'>
                RapidAPI provides clear visibility on all of the API you use. Worry less about juggling multiple keys and subscription accounts.
            </Typography>
            <Stack alignItems='center'>
                <Stack textAlign='center' justifyContent='space-between' spacing={1} direction={{xs: 'column', sm: 'column', md: 'row', lg: 'row'}} mt={2}>
                    <Stack alignItems='center'>
                        <LooksOne sx={{ width: 65, height: 65, objectFit: 'contain', color: blue[500]}}/>
                        <Typography variant='h5' gutterBottom>
                            Call volume and billing
                        </Typography>
                        <Typography variant='subtitle1' textAlign='center'>
                            Monitor call volumes and corresponding billing charges for all APIs in one dashboard.
                        </Typography>
                    </Stack>
                    <Stack alignItems='center'>
                        <LooksTwo sx={{ width: 65, height: 65, objectFit: 'contain', color: blue[500] }}/>
                        <Typography variant='h5' gutterBottom>
                            Errors and latency
                        </Typography>
                        <Typography variant='subtitle1' textAlign='center'>
                            Ensure your app’s uptime by keeping track of API errors and trends in latency.
                        </Typography>
                    </Stack>
                    <Stack alignItems='center'>
                        <Looks3 sx={{ width: 65, height: 65, objectFit: 'contain', color: blue[500] }}/>
                        <Typography variant='h5' gutterBottom>
                            Logs for your API calls
                        </Typography>
                        <Typography variant='subtitle1' textAlign='center'>
                            Debug faster by searching and viewing logs for your API calls.
                        </Typography>
                    </Stack>
                </Stack>
                <Stack mt={2} maxWidth='100%'>
                    <img src={charts} alt="charts" />
                </Stack>
            </Stack>
        </Stack>
    </Stack>
  )
}

export default Pricing
