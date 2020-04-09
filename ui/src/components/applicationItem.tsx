import React, { FC } from "react";
import { Application, ApplicationState } from "../types";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CircularProgress, Popper, Grid, Chip, Button, Menu, MenuItem } from "@material-ui/core";
import format from "date-fns/format";
import { calculateApplicationScore } from "../helpers/calculateApplicationScore";
import getNextStates from "../helpers/getNextStates";
import getStateColor from "../helpers/getStateColor";

interface Props {
	application: Application;
	onDeleteClicked: () => void;
	onStateChange: (state: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: "100%",
			marginTop: 15,
		},
		menuItem: {
			textTransform: "uppercase",
		},
	})
);

const ApplicationItem: FC<Props> = ({ application, onDeleteClicked, onStateChange }) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
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
		<Card className={`${classes.root} application`}>
			<CardHeader
				avatar={<Avatar aria-label="application" src={application.avatar}></Avatar>}
				action={
					<div>
						<IconButton aria-label="settings" onClick={handleMenu} aria-describedby={id}>
							<MoreVertIcon />
						</IconButton>

						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={deleteItem} className={classes.menuItem}>
								<Typography color="secondary">Delete</Typography>
							</MenuItem>

							{nextStates.map(state => {
								return (
									<MenuItem
										onClick={onStateChange.bind(null, state)}
										key={state}
										className={classes.menuItem}
									>
										{state}
									</MenuItem>
								);
							})}
						</Menu>
					</div>
				}
				title={application.fullName}
				subheader={application.email}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="div">
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<CircularProgress
								variant="static"
								value={calculateApplicationScore(application)}
							></CircularProgress>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Chip label={application.state} color={getStateColor(application)} />
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
