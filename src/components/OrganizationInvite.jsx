import React, { useState } from "react";
import { MenuItem, Select, Stack, Button, Alert } from "@mui/material";
import { InputField, LoadingSpinner } from "../components";
import { useAddUserOrgService } from "../services/addUserOrgService";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OrganizationInvite = props => {
	const { clearError, error, loading, orgUserAdd } = useAddUserOrgService();

	const [email, setEmail] = useState("");
	const [role, setRole] = useState("");
	const { user } = useSelector(store => store.user);
	const payload = {
		email,
		role,
	};
	const { id } = useParams();
	const addUser = async event => {
		// event.preventDefault()
		try {
			const data = await orgUserAdd(payload, user.profileId, id);
			console.log(data);
		} catch (error) {}
	};
	return (
		<div>
			{error && (
				<Alert
					style={{ position: "absolute", top: "10%", zIndex: 3 }}
					severity="error"
					onClose={clearError}
				>
					{error}
				</Alert>
			)}
			{loading && <LoadingSpinner />}
			<form onSubmit={addUser}>
				<Stack direction="row">
					<Stack>
						<InputField
							type="text"
							label="Search by Username or Email"
							vlaue={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="name@example.com"
						/>
					</Stack>
					<Stack direction="row" mx={4} width={155}>
						<Select
							style={{ width: "100%", height: "43px", color: "black" }}
							fullWidth
							onChange={e => setRole(e.target.value)}
							defaultValue="role"
						>
							<MenuItem value="role" style={{ pointerEvents: "none" }}>
								Role
							</MenuItem>
							<MenuItem value="developer">Developer</MenuItem>
							<MenuItem value="admin">Admin</MenuItem>
						</Select>
					</Stack>
					{/* <Stack direction='row' mx={4}>
            <div>
                <InputField type= 'text' label= 'Role at the organization' placeholder='Your role at the organization (Optional)' id='halfWidth'/>
            </div>
            </Stack> */}
					<Button
						style={{ width: "15%", height: "43px" }}
						type="submit"
						variant="contained"
					>
						Invite User
					</Button>
				</Stack>
			</form>
		</div>
	);
};

export default OrganizationInvite;
