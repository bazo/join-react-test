import React from "react";
import { makeStyles, createStyles, Grid, Theme } from "@material-ui/core";
import { Position } from "../types";
import nl2br from "react-nl2br";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: "center",
			color: theme.palette.text.secondary
		}
	})
);

interface Props {
	position: Position;
}

const PositionItem = ({ position }: Props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<h1>{position.data.title[0].text}</h1>
				</Grid>
				<Grid item xs={12} sm={6}>
					{nl2br(position.description)}
				</Grid>
				<Grid item xs={12} sm={6}></Grid>
			</Grid>
		</div>
	);
};

export default PositionItem;
