import React, { FC } from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Position } from "../types";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		maxWidth: 360
	}
}));

function ListItemLink(props: ListItemProps<typeof NavLink, { button?: true }>) {
	return <ListItem button component={NavLink} {...props} />;
}

interface Props {
	positions: Position[];
}

const PositionsList: FC<Props> = ({ positions }: Props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<List component="nav">
				{positions.map(position => {
					const text = position.data.title[0].text;
					return (
						<ListItemLink to={`/positions/${position.id}`} key={position.id} className="job">
							<ListItemText primary={text} />
						</ListItemLink>
					);
				})}
			</List>
		</div>
	);
};

export default PositionsList;
