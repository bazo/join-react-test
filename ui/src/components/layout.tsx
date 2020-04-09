import React, { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { AppBar, Toolbar, IconButton, makeStyles, createStyles, Theme } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavLink, match } from "react-router-dom";
import { Location } from "history";
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
		navLink: {
			color: "#ccc",
			textDecoration: "none",
			"&:hover": {
				textDecoration: "underline",
			},
			"&.active": {
				color: "#fff",
			},
		},
	})
);

const Layout = ({ children }: { children: ReactNode }) => {
	const classes = useStyles();

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<NavLink
							to="/"
							exact
							className={classes.navLink}
							isActive={(match: match, location: Location) => {
								return location.pathname !== "/recruiter";
							}}
						>
							Candidate
						</NavLink>
						&nbsp;
						<NavLink to="/recruiter" exact className={classes.navLink}>
							Recruiter
						</NavLink>
					</Typography>
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg">
				<Typography component="div" style={{ height: "100vh" }}>
					{children}
				</Typography>
			</Container>
		</>
	);
};

export default Layout;
