import { List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { CheckCircleOutlineSharp } from '@mui/icons-material';
import React from 'react'
import { makeStyles } from '@mui/styles';
import { useFetch } from '../services/useFetch';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const base_url = process.env.REACT_APP_BASE_URL

const useStyles = makeStyles({
    options: {
        cursor: 'pointer',

    },
    list: {
        width: '100%',
      },
      listItem : {
        width: '100%',
        textTransform: 'capitalize',
        '& a': {
          color: 'var(--dark)'
        }
      },
})

const MyApis = () => {
    const classes = useStyles()
    const { data } = useFetch(`${base_url}/api`)
    const { user } = useSelector(store => store.user)

    const listData = (name, id) => {
        return { name, id }
    }

    const lists = []
    data.map((api) => {
        if (api.profileId === user.profileId) {
            lists.push(listData(api.name, api.id))
        }
    })

    return (
        <div>
            <Stack direction='row' spacing={2} alignItems='center' className={classes.options}>
                <CheckCircleOutlineSharp />
                <Typography>My APIs</Typography>
            </Stack>
            <List dense={true}>
                {lists.map((list) => (
                    <ListItem key={list.id} className={classes.listItem}>
                            <Link to={`/api/endpoints/${list.id}`}>
                                <ListItemText primary={list.name} />
                            </Link>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default MyApis