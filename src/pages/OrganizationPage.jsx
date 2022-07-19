import React from 'react'
import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
// import { InputField } from '../components'

// import OrganizationSidebar from '../components/OrganizationSidebar'
import OrganizationInvite from '../components/OrganizationInvite';
import OrgTeammates from '../components/OrgTeammates';



const OrganizationPage = () => {
  const useStyles = makeStyles({
    main: {
      display: 'flex',
      gap: '1rem',
    },
    section_two: {
      marginLeft: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '4rem'
    },
    title: {
      fontSize: '40px',
      color: 'var(--base)',
      display: 'flex',
      gap: '2rem',
      alignItems: 'center'
    },
    inlineText: {
      fontSize: '15px'
    },
  })
  
const classes = useStyles()

  return (
    <div className={classes.main}>
      {/* <Typography variant='h4'>OrganizationPage</Typography> */}
      <section>        
        {/* <OrganizationSidebar /> */}
      </section>
      {/* <Divider orientation='vertical' flexItem /> */}
      <section className={classes.section_two}>
        <div>
          <Typography className={classes.title} variant="h5">Add New Teammates <span className={classes.inlineText}>Organizations require other users in order to be useful - please add your first user</span></Typography>
          <section>
            <OrganizationInvite />
          </section>
        </div>
        <div>
          <section>
            <OrgTeammates />
          </section>
        </div>
      </section>
    </div>
  )
}

export default OrganizationPage