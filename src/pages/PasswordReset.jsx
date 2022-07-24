import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import { Button, Stack, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import { InputField } from '../components'

const useStyles = makeStyles({
  form: {
    width: '50%',
    display: 'grid',
    placeItems: 'center',
    gap: '2rem',
    marginTop: '3rem',
    '@media screen and (max-width: 800px)': {
      width: '90%'
    },
    '@media screen and (min-width: 1270px)': {
      width: '60%'
    }
  }
})

const identity_url = process.env.REACT_APP_IDENTITY_URL

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}$/;

const PasswordReset = () => {
    const classes = useStyles()
	  const [msg, setMsg] = useState("");
	  const [error, setError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
	  const [password, setPassword] = useState("");
	//   const [confirmPassword, setConfirmPassword] = useState("");
	  const [passwordConfirm, setPasswordConfirm] = useState("")
	  const [bgColor, setBgColor] = useState("");
	  const [isDisabled, setIsDisabled] = useState(true);
	  const param = useParams();

    const url = `${identity_url}/auth/reset/${param.id}/${param.token}`;

	// useEffect(()=>{
	// 	console.log(param);
	// },[param])

  useEffect(() => {
		if (passwordStrength === "") {
			setBgColor("#30343b");
		} else if (passwordStrength === "Weak") {
			setBgColor("#2d2f2d");
		} else if (passwordStrength === "Medium") {
			setBgColor("#08320a");
		} else if (passwordStrength === "Strong") {
			setBgColor("#08320a");
		}
	}, [passwordStrength]);

	const strongRegex = new RegExp(
		"^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$",
		"g",
	);
	const mediumRegex = new RegExp(
		"^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$",
		"g",
	);

  const analyzePasswordStrength = (password) => {
		if (strongRegex.test(password)) {
			setPasswordStrength("strong");
			setIsDisabled(false);
		} else if (mediumRegex.test(password)) {
			setPasswordStrength("medium");
			setIsDisabled(false);
		} else {
			setPasswordStrength("weak");
			setIsDisabled(true);
		}
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
		analyzePasswordStrength(event.target.value);
	};

	

	const handleConfirmPasswordChange = (event) => {
		setPasswordConfirm(event.target.value);
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== passwordConfirm) {
			setPassword("");
			setPasswordConfirm("");
			setTimeout(()=>{
				setError("");
			}, 5000);
			return setError("Passwords don't match");
		} 
			// Post to server
			
			try {
				const res = await axios.post(url, { password });
				// console.log(res);
				
				setMsg(res.data.message);
				setError("");
				window.location = "/email-verify";
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				  ){
					setError(error.response.data.message);
					setTimeout(()=> {
						setError("");
					},5000);
					setMsg("");
				  }
			}
		
		
	};


  return (
      <>
    <Stack direction='column' height='60vh' alignItems='center' justifyContent='center' textAlign='center' py={1} px={2}>
    <Typography variant='h5' gutterBottom>
      Reset your password
    </Typography>
    {error && <div className="error_msg">{error}</div>}
	{msg && <div className="success_msg">{msg}</div>}
    <form className={classes.form} onSubmit={handleSubmit}>
      <InputField fullWidth type='password' name="password" value={password} required onChange={handlePasswordChange} label='Password' placeholder='Enter your new password' />
      <InputField fullWidth type='password' name="passwordConfirm" value={passwordConfirm} required onChange={handleConfirmPasswordChange} label='Confirm Password' placeholder='Confirm your new password' />
      <p>{passwordStrength}</p>
      <Button disabled={isDisabled} style={{ backgroundColor: bgColor }} type='submit' variant='contained'>
        Submit
      </Button>
    </form>
    <Typography variant='body1' mt={6}>
      <Link to='/login'>
        &larr; Back to log in.
      </Link>
    </Typography>
  </Stack> 
  </>
  )
}

export default PasswordReset;