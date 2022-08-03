import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Cookies from "universal-cookie";

import {
	ForgotPassword,
	EmailVerify,
	PasswordReset,
	ChangePassword,
	Home,
	LoginPage,
	SingleApi,
	UserProfile,
	Categories,
	Category,
	CreateOrg,
	Signup,
	Settings,
	MyApiPage,
	Endpoint,
	EmailAutoVerify,
	ErrorPage,
} from "./pages";

import { Navbar } from "./components";
import { theme } from "./theme";
import { getApis } from "./redux/features/api/apiSlice";
import { getSingleApis } from "./redux/features/singleApi/singleApiSlice";
import { login } from "./redux/features/user/userSlice";
import ApiEndpoint from "./pages/ApiEndpoint";
import OrganizationPage from "./pages/OrganizationPage";
import OrgList from "./pages/OrgList";
import SecurityMyApi from "./pages/SecurityMyApi";
import { RequireAuth } from "./components/RequireAuth";

const useStyles = makeStyles({
	router_container: {
		width: `100%`,
		marginTop: "6rem",
	},
});

const App = () => {
	const [query, setQuery] = useState("");
	const classes = useStyles();
	const dispatch = useDispatch();
	const cookies = new Cookies();

	const accessToken = cookies.get("accessToken");

	const logInUser = () => {
		if (accessToken) {
			const accessToken = cookies.get("accessToken");
			const refreshToken = cookies.get("refreshToken");
			const profileId = cookies.get("profileId");
			const userId = cookies.get("userId");
			const fullName = cookies.get("fullName");
			const email = cookies.get("email");
			const data = {
				accessToken,
				refreshToken,
				profileId,
				userId,
				fullName,
				email,
			};
			dispatch(login(data));
		}
	};

	useEffect(() => {
		dispatch(getSingleApis());
	}, []);

	useEffect(() => {
		dispatch(getApis());
		logInUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Navbar query={query} setQuery={setQuery} />
			<div className={classes.router_container}>
				<Routes>
					{/* General Pages */}
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route path="/email-verify" element={<EmailVerify />} />
					<Route
						path="/email-verification/:token"
						element={<EmailAutoVerify />}
					/>
					<Route path="/password-reset/:id" element={<PasswordReset />} />
					<Route path="/change-password" element={<ChangePassword />} />

					{/* API Pages */}
					<Route path="/api/:id" element={<SingleApi />} />
					<Route path="/api/categories" element={<Categories />} />
					<Route path="/api/categories/:id" element={<Category />} />

					<Route element={<RequireAuth />}>
						<Route path="/api/api/new/:id" element={<MyApiPage />} />
						<Route path="/api/endpoint/new/:id" element={<ApiEndpoint />} />
						<Route path="/api/endpoints/:id" element={<Endpoint />} />
						<Route path="/api/security/:id" element={<SecurityMyApi />} />

						<Route path="/api/api/new/:id" element={<MyApiPage />} />
						<Route path="/api/endpoint/new/:id" element={<ApiEndpoint />} />
						<Route path="/api/endpoints/:id" element={<Endpoint />} />

						{/* User Pages */}
						<Route path="/user/:id" element={<UserProfile />} />
						<Route path="/user/settings" element={<Settings />} />

						{/* Organization Pages */}
						<Route path="/orgs/:id" element={<OrganizationPage />} />
						<Route path="/orgs/create-new" element={<CreateOrg />} />
						<Route path="/orgs-list/:id" element={<OrgList />} />
					</Route>
					<Route path="/error" element={<ErrorPage />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
};

export default App;
