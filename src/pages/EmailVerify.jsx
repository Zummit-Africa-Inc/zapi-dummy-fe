import React, { useState, useEffect} from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Button, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'


const identity_url = process.env.REACT_APP_IDENTITY_URL


const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
	const param = useParams();

    useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `${identity_url}/auth/reset/${param.token}`;
				const res = await axios.get(url);
				console.log(res.data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);
  return (
    <>
    {validUrl ? (
        <div className="container">
            <h1>Email verified successfully</h1>
            <Link to="/login">
            <Button type='submit' variant='contained'>
                    Go to Login Page
            </Button>
            </Link>
		</div>
    ) : (
      <div>
        <h1>404 Page Not Found</h1>
        <Link to="/login">
            <Button type='submit' variant='contained'>
                    Go to Login Page
            </Button>
        </Link>
      </div>
        
    )}
    </>
  )
}

export default EmailVerify;