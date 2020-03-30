import React from "react";
import ApplicationsList from "./applicationsList";
import { Container, Typography } from "@material-ui/core";

function App() {
	return (
		<div className="App">
			<Container maxWidth="lg">
				<Typography component="div" style={{ height: "100vh" }}>
					<ApplicationsList />
				</Typography>
			</Container>
		</div>
	);
}

export default App;
