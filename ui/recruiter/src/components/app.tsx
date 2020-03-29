import React, { useState, useEffect } from "react";
import ApplicationsList from "./applicationsList";
import { Application } from "../types";
import { getApplications } from "../actions";
import { Container, Typography } from "@material-ui/core";

function App() {
	const [applications, setApplications] = useState((null as unknown) as Application[]);

	useEffect(() => {
		getApplications().then(setApplications);
	}, []);

	return (
		<div className="App">
			<Container maxWidth="lg">
				<Typography component="div" style={{ height: "100vh" }}>
					<ApplicationsList applications={applications} />
				</Typography>
			</Container>
		</div>
	);
}

export default App;
