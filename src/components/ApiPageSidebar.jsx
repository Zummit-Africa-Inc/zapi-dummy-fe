import { Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import { AddCircleOutlined } from '@material-ui/icons';
import { CheckCircleOutlineSharp, CorporateFare, ExploreSharp, PaymentSharp, SearchSharp } from '@mui/icons-material';
import React, { useState } from 'react'
import UserAvatar from './UserAvatar'
import InputField from './InputField';
import { makeStyles } from '@mui/styles';
import MyApis from './MyApis';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    options:{
        cursor: 'pointer',

    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: '1rem'
    },
})

const ApiPageSidebar = (props) => {
    const [query, setQuery] = useState('')
    const classes = useStyles()
    const { user } = useSelector(store => store.user)

    const handleSearch = async (e) => {
        e.preventDefault()
    }

    return (
        <div className={classes.sidebar}>
            <Stack directtion='column'>
                <UserAvatar />
                <Divider />
                <Stack direction='column' my={2}>
                    <Stack direction='row' spacing={2} alignItems='center' className={classes.options}>
                        <IconButton href={`/api/api/new/${user.profileId}`}>
                            <AddCircleOutlined />
                            <Typography>Add New API</Typography>
                        </IconButton>
                    </Stack>
                    <Stack direction='row' spacing={2} alignItems='center' className={classes.options}>
                        <IconButton>
                            <CorporateFare />
                            <Typography><a href={props.org}>Organization</a></Typography>
                        </IconButton>
<<<<<<< HEAD
=======
                        <Typography><a href={props.org}>Organization</a></Typography>
>>>>>>> d3babc37c0ab7ceca2f5ec89c9907351d6f59636
                    </Stack>
                    <Stack direction='row' spacing={2} alignItems='center' className={classes.options}>
                        <IconButton>
                            <PaymentSharp />
                            <Typography>Payment Settings</Typography>
                        </IconButton>
                    </Stack>
                    <Stack direction='row' spacing={2} alignItems='center' className={classes.options}>
                        <IconButton>
                            <ExploreSharp />
                            <Typography>Support</Typography>
                        </IconButton>
                    </Stack>
                    <Stack direction='row' alignItems='center'>
                        <form onSubmit={handleSearch}>
                            <InputField fullWidth type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Seach By API Name' />
                        </form>
                        <Button onClick={handleSearch}>
                            <SearchSharp />
                        </Button>
                    </Stack>

                </Stack>
                <MyApis />
            </Stack>
        </div>
    )
}

export default ApiPageSidebar