import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const base_url = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
	title: {
		fontSize: "40px",
		color: "var(--base)",
		display: "flex",
		gap: "2rem",
		alignItems: "center",
	},
});

export default function OrganizationTeammates() {
	const { id } = useParams();
	const classes = useStyles();
	const [orgTeam, setOrgTeam] = useState([]);
	async function getOrganizationUsers() {
		const res = await fetch(`${base_url}/organisation/users/${id}`);
		const data = await res.json();
		setOrgTeam(data.data);
	}
	useEffect(() => {
		getOrganizationUsers();
	}, []);

	return (
		<div>
			<Typography className={classes.title} variant="h5">
				Manage Teammates
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						{/* <TableCell align="right">
                        <Link to='/orgs/create-new'><Button variant='contained'>Create Organization</Button></Link>
                    </TableCell> */}
					</TableHead>
					<TableBody>
						{orgTeam.map(row => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{row.role}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
