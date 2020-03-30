import React from "react";
import ApplicationsList from "../components/applicationsList";
import { Container, Typography } from "@material-ui/core";

const RecruiterPage = () => {
	return (
		<div className="App">
			<Container maxWidth="lg">
				<Typography component="div" style={{ height: "100vh" }}>
					<ApplicationsList />
				</Typography>
			</Container>
		</div>
	);
};

export default RecruiterPage;
