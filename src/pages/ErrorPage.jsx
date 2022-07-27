import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'grid',
        placeItems: 'center'
    },
    par: {
        fontSize: '1.5rem',
        fontWeight: 'bold'
    }
})

const ErrorPage = () => {
    const classes = useStyles()

  return (
    <div className={classes.root}>
        <p className={classes.par}>
            Email verification failed.
        </p>
    </div>
  )
}

export default ErrorPage