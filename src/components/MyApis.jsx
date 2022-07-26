import { List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { CheckCircleOutlineSharp } from "@mui/icons-material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useFetch } from "../services/useFetch";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const base_url = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
	options: {
		cursor: "pointer",
	},
	accBody: {
		display: "flex",
		flexDirection: "column",
		gap: "10px",
		justifyContent: "end",
	},
	list: {
		width: "100%",
	},
	listItem: {
		width: "100%",
		textTransform: "capitalize",
		"& a": {
			color: "var(--dark)",
		},
	},
});

const MyApis = () => {
	const [expanded, setExpanded] = React.useState(false);
	const classes = useStyles();
	const { data } = useFetch(`${base_url}/api`);
	const { user } = useSelector(store => store.user);

	const listData = (name, id) => {
		return { name, id };
	};

	const lists = [];
	data.map(api => {
		if (api.profileId === user.profileId) {
			lists.push(listData(api.name, api.id));
		}
	});
	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<div>
			<Stack
				direction="row"
				spacing={2}
				alignItems="center"
				marginBottom={2}
				className={classes.options}
			>
				<CheckCircleOutlineSharp />
				<Typography>My APIs</Typography>
			</Stack>
			<Stack
				direction="column"
				justifyContent="center"
				marginLeft={3}
				spacing={3}
			>
				{lists.map(list => (
					<Accordion
						key={list.id}
						expanded={expanded === `${list.id}`}
						onChange={handleChange(`${list.id}`)}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Link to={`/api/endpoints/${list.id}`}>
								<Typography sx={{ width: "33%", flexShrink: 0 }}>
									{list.name}
								</Typography>
							</Link>
						</AccordionSummary>
						<AccordionDetails className={classes.accBody}>
							<Stack direction="column" paddingRight={3}>
								<Link to={`/api/endpoints/${list.id}`}>
									<Typography>Endpoints</Typography>
								</Link>
								<Link to={`/api/endpoints/${list.id}`}>
									<Typography>Analytics</Typography>
								</Link>
							</Stack>
						</AccordionDetails>
					</Accordion>
				))}
			</Stack>
		</div>
	);
};

export default MyApis;
