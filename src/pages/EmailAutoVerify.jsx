import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useHttpRequest } from '../hooks/fetch-hook'

const url = process.env.REACT_APP_IDENTITY_URL

const EmailAutoVerify = () => {
    const token = useParams().token
    const navigate = useNavigate()
    const { error, sendRequest } = useHttpRequest()

    const handleVerification = async() => {
        try {
            const data = await sendRequest(`${url}/email-verification/${token}`)
        } catch (error) {}

        if(error) {
            navigate('/error')
            return
        }

        navigate('/login')
    }

    useEffect(() => {
        handleVerification()
    },[])

  return null
}

export default EmailAutoVerify