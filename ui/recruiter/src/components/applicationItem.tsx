import React, { FC } from "react";
import { Application } from "../../../candidate/src/types";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CircularProgress, Popper } from "@material-ui/core";

function calculateScore(application: Application): number {
	return 12;
}

interface Props {
	application: Application;
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

const ApplicationItem: FC<Props> = ({ application }) => {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popper" : undefined;

	const photoUrl = `data:${application.photo.contentType};base64,${application.photo.data}`;

	console.log(photoUrl);

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={<Avatar aria-label="application" src={photoUrl}></Avatar>}
				action={
					<div>
						<IconButton aria-label="settings" onClick={handleClick} aria-describedby={id}>
							<MoreVertIcon />
						</IconButton>
						<Popper id={id} open={open} anchorEl={anchorEl}>
							<div className={classes.paper}>The content of the Popper.</div>
						</Popper>
					</div>
				}
				title={`${application.firstName} ${application.lastName}`}
				subheader={application.email}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					<CircularProgress variant="static" value={calculateScore(application)}></CircularProgress>
				</Typography>
			</CardContent>
		</Card>
	);
};

export default ApplicationItem;
