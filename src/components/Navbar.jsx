import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Badge, Button, IconButton, Stack, Toolbar } from '@mui/material'
import { NotificationsOutlined, SearchOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import Cookies from 'universal-cookie'

import { AddNewMenu, Modal, Search, UserMenu } from './index'
import { logout } from '../redux/features/user/userSlice'
import { closeModal } from '../redux/features/modal/modalSlice'
import { openSearchModal, closeSearchModal } from '../redux/features/search/searchSlice'

const useStyles = makeStyles({
    nav: {
        width: '100%',
        borderBottom: '2px solid var(--mid)',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'var(--white)',
        zIndex: 99
    },
    toolbar: {
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '0.5rem 0',
    }
})

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cookies = new Cookies()

    const { isLoggedIn } = useSelector(store => store.user)
    const { isOpen } = useSelector(store => store.modal)
    const { isSearchModalOpen } = useSelector(store => store.search)

    const toggleSearch = () => {
        if (isSearchModalOpen) {
            dispatch(closeSearchModal())
        } else {
            dispatch(openSearchModal())
        }
    }

    const logoutFn = () => {
        dispatch(logout())
        dispatch(closeModal())
        
        cookies.remove('accessToken')
        cookies.remove('refreshToken')
        cookies.remove('profileId')
        cookies.remove('fullName')
        cookies.remove('email')

        navigate('/login')
    }

    return (
        <>
            {/* modal for logout confirmatio */}
            {isOpen && <Modal message='Are you sure you want to log out?' confirm={logoutFn} />}
            {/* search modal */}
            {isSearchModalOpen && <Search closeModal={() => dispatch(closeSearchModal())} />}
            <nav className={classes.nav}>
                <Toolbar className={classes.toolbar}>
                    <Link to='/' style={{ width: '7%' }}>
                        <img src='/LOGO.svg' alt='zapi' width='50px' />
                    </Link>

                    <Stack direction='row' spacing={2} alignItems='center'>
                        <IconButton onClick={toggleSearch}>
                            <SearchOutlined />
                        </IconButton>

                        {/* Icons to be shown when user is not logged in */}
                        {!isLoggedIn &&
                            <Link to='/login'>
                                <Button variant='contained'>
                                    Login
                                </Button>
                            </Link>}
                        {!isLoggedIn && <Link to='/signup'>
                            <Button variant='outlined'>Sign Up</Button>
                        </Link>}

                        {/* Icons to be shown when user is logged in. */}
                        {isLoggedIn &&
                            (<>
                            <AddNewMenu />
                            <IconButton>
                                <Badge badgeContent={1} color='primary'>
                                    <NotificationsOutlined />
                                </Badge>
                            </IconButton>
                            <UserMenu />
                            </>)}
                    </Stack>
                </Toolbar>
            </nav>
        </>
    )
}

export default Navbar