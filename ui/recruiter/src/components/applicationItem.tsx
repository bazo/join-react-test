import React, { FC } from "react";
import { Application } from "../types";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CircularProgress, Popper, Grid, Chip, Button } from "@material-ui/core";
import format from "date-fns/format";

function calculateScore(application: Application): number {
	const scores = {
		fullName: 10,
		email: 10,
		password: 10,
		phone: 20,
		avatar: 50
	};

	let score = 0;

	for (let [key, points] of Object.entries(scores)) {
		//@ts-ignore
		const value = application[key] as string;
		if (value && value.trim() !== "") {
			score += points;
		}
	}

	return score;
}

function getNextStates(application: Application): string[] {
	switch (application.state) {
		case "submitted":
			return ["in review"];

		case "in review":
			return ["not a fit", "hired"];
		default:
			return [];
	}
}

interface Props {
	application: Application;
	onDeleteClicked: () => void;
	onStateChange: (state: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: "100%",
			marginTop: 15
		},
		paper: {
			border: "1px solid",
			padding: theme.spacing(1),
			backgroundColor: theme.palette.background.paper
		}
	})
);

const ApplicationItem: FC<Props> = ({ application, onDeleteClicked, onStateChange }) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popper" : undefined;

	const nextStates = getNextStates(application);

	const deleteItem = () => {
		if (window.confirm("Really delete this application?")) {
			onDeleteClicked();
		}
	};

	const formatDate = (date: string) => {
		try {
			return format(new Date(application.applied_on), "dd.MM.yyyy");
		} catch (err) {
			return date;
		}
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={<Avatar aria-label="application" src={application.avatar}></Avatar>}
				action={
					<div>
						<IconButton aria-label="settings" onClick={handleClick} aria-describedby={id}>
							<MoreVertIcon />
						</IconButton>
						<Popper id={id} open={open} anchorEl={anchorEl}>
							<div className={classes.paper}>
								<Button variant="contained" color="secondary" onClick={deleteItem}>
									Delete
								</Button>
								<br />
								{nextStates.map(state => {
									return (
										<Button
											variant="contained"
											onClick={onStateChange.bind(null, state)}
											key={state}
										>
											{state}
										</Button>
									);
								})}
							</div>
						</Popper>
					</div>
				}
				title={application.fullName}
				subheader={application.email}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="div">
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<CircularProgress variant="static" value={calculateScore(application)}></CircularProgress>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Chip
								label={application.state}
								color={
									application.state === "not a fit"
										? "secondary"
										: application.state === "hired"
										? "primary"
										: undefined
								}
							/>
						</Grid>
						<Grid item xs={12} sm={12}>
							Applied on: {formatDate(application.applied_on)}
						</Grid>
					</Grid>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ApplicationItem;
