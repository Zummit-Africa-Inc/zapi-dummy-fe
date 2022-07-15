import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { InputField } from "../components";

const useStyles = makeStyles({
	form: {
		width: "50%",
		display: "grid",
		placeItems: "center",
		gap: "2rem",
		marginTop: "3rem",
		"@media screen and (max-width: 800px)": {
			width: "90%",
		},
		"@media screen and (min-width: 1270px)": {
			width: "60%",
		},
	},
});

const Confirm_Token_REGEX = /^[0-9]{6}$/;

const TokenPage = () => {
	const classes = useStyles();
	const [number, setNumber] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(number);
		setNumber("");
		navigate("/login");
	};

	return (
		<Stack
			direction="column"
			height="60vh"
			alignItems="center"
			justifyContent="center"
			textAlign="center"
			py={1}
			px={2}
		>
			<Typography variant="h5" gutterBottom>
				Put Your Token Number
			</Typography>
			<Typography variant="body1">
				Put the Token sent to your email to continue.
			</Typography>
			<form className={classes.form} onSubmit={handleSubmit}>
				<InputField
					fullWidth
					type="text"
					value={number}
					onChange={(e) => setNumber(e.target.value)}
					label="Token"
					placeholder="Enter your Token"
				/>
				<Button
					disabled={!Confirm_Token_REGEX.test(number)}
					type="submit"
					variant="contained"
				>
					Confirm
				</Button>
			</form>
		</Stack>
	);
};

export default TokenPage;
