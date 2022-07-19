import React from 'react'
import { useSelector } from 'react-redux'
import { IconButton, Typography, Tooltip } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { CloseSharp, FileCopyOutlined } from '@material-ui/icons'

const useStyles = makeStyles({
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 5,
        display: 'grid',
        placeItems: 'center',
    },
    popup: {
        width: '50vh',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0.5rem 1rem rgba(0,0,0,0.1)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    header: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 0.75rem',
        borderBottom: '1px solid #ccc',
    },
    body: {
        width: '100%',
        padding: '0.5rem',
        margin: '0.75rem 0'
    },
    text: {
        width: '100%',
        textAlign: 'center',
        padding: '0.5rem',
        margin: '0.5rem 0',
        border: 'thin solid #ccc',
        borderRadius: '5px',
    },
    token: {
        width: '100%',
        padding: '0 0.25rem',
        textAlign: 'center',
        wordWrap: 'break-word',
        cursor: 'pointer',
    },
    tooltip: {
        fontSize: '1rem',
    }
})

const url = process.env.REACT_APP_BASE_URL

const PopUp = ({closePopUp}) => {
    const classes = useStyles()
    const { subscriptionData } = useSelector(state => state.subscription)

    const clickToCopy = (e) => {
        const text = e.target.innerText
        const el = document.createElement('textarea')
        el.value = text
        document.body.appendChild(el)
        el.select()
        // To be replaced 
        document.execCommand('copy')
        document.body.removeChild(el)
    }

  return (
    <div className={classes.backdrop}>
        <div className={classes.popup} >
            <div className={classes.header}>
                <Typography variant='body1'>
                    Subscription
                </Typography>
                <IconButton onClick={closePopUp}>
                    <CloseSharp />
                </IconButton>
            </div>
            <div className={classes.body}>
                <Typography variant='subtitle'>
                    {subscriptionData.message} 
                </Typography>
                <Tooltip title='click to copy' className={classes.tooltip} followCursor>
                    <div className={classes.text}>
                        <div className={classes.token} onClick={clickToCopy}>
                        <Typography variant='caption'>
                            {subscriptionData.data.subscriptionToken ? `${url}/${subscriptionData.data.subscriptionToken}` : 'No Token'}
                        </Typography>
                        </div>
                        <FileCopyOutlined fontSize='small' />
                    </div>
                </Tooltip>
            </div>
        </div>
    </div>
  )
}

export default PopUp