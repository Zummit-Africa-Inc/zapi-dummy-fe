import React from 'react'
import { Box, Button, ButtonGroup, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Stack, Switch, Typography } from "@mui/material";
import { useState } from "react";
import { InputField } from '../components'
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useApiService } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../services/useFetch';
import ApiPageSidebar from '../components/ApiPageSidebar';



const useStyles = makeStyles({
    main: {
        display: 'flex',
        gap: '1rem',
    },
    title: {
        color: 'var(--base)',
        fontSize: '20',
    },
    form: {
        width: '40%',
        display: 'grid',
        marginTop: '1rem',
        gap: '1rem',
    },
    button: {
        display: 'flex',
        gap: '2rem',
    },
    section_two: {
        height: '100%',
        width: '100%',
        background: 'var(--grey)',
        margin: '0 1rem'
    },
    org: {
        marginTop: '5rem'
    }
})

const MyApiPage = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [base_url, setBase_Url] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [privacy, setPrivacy] = useState(false)
    const { user } = useSelector(store => store.user)
    const classes = useStyles()
    const { loading, error, postApi } = useApiService()
    const navigate = useNavigate()
    //to fetch the categories
        const { data } = useFetch('http://18.207.143.26:3000/api/categories')


    const label = { inputProps: { 'aria-label': 'Switch privacy' } };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = { name, description, categoryId, base_url }

        try {
            const data = await postApi(payload)
            console.log(data)
            navigate(`/api/endpoints/${data.data.id}`)
        } catch (err) {}

        if (error) return

    }

    const handleCancel = (e) => {
        e.preventDefault()

        setName(''); setDescription(''); setCategoryId(''); setBase_Url('')
    }

    return (
        <div className={classes.main}>
            <section>
                <ApiPageSidebar
                />
            </section>
            <Divider orientation='vertical' flexItem />
            <section className={classes.section_two}>
                <Typography className={classes.title}>Add New API</Typography>
                <form className={classes.form}>
                    <InputLabel required>API NAME</InputLabel>
                    <FormControl>
                        <InputField fullWidth type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Your APIs Name' />
                    </FormControl>
                    <InputLabel required>DESCRIPTION</InputLabel>
                    <FormControl fullWidth>
                        <InputField multiline rows={4} type='text' placeholder="Describe your API" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </FormControl>
                    <InputLabel required>BASE URL</InputLabel>
                    <FormControl>
                        <InputField fullWidth type='url' value={base_url} onChange={(e) => setBase_Url(e.target.value)} placeholder='URL' />
                    </FormControl>
                    <Box sx={{ minWidth: 120 }}>
                        <InputLabel required>CATEGORY</InputLabel>
                        <FormControl fullWidth>
                            <Select value={categoryId} label="Category" onChange={(e) => setCategoryId(e.target.value)}>
                                {data.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </form>

                <Stack direction='column'>
                    <Typography>The owner of this API will be: <b>Personal Account - {user.fullName}</b></Typography>

                    <Typography>Specify using:</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <ButtonGroup variant="text" aria-label="outlined button group">
                            <Button>UI</Button>
                            <Button>OpenAPI</Button>
                            <Button>Postman Collection</Button>
                            <Button>GraphQL Schema</Button>
                            <Button>Kafka</Button>
                        </ButtonGroup>
                    </Box>
                </Stack>

                <Stack direction='row' className={classes.button}>
                    <Button type='submit' onClick={handleSubmit} disabled={!name || !description || !categoryId}>Add API</Button>
                    <Button onClick={handleCancel} disabled={!name || !description || !categoryId}>Cancel</Button>
                </Stack>

                <Typography>Your API is private by default</Typography>
                <Typography id='org'>Switching your API makes it accessing to everyone</Typography>
                <FormControlLabel control={<Switch {...label} value={privacy} onClick={(e) => setPrivacy(e.target.value)} />} label="Private" />
            </section>
        </div>
    );
}

export default MyApiPage;