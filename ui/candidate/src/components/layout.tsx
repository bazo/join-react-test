import React, { ReactNode } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<Container maxWidth="lg">
			<Typography component="div" style={{ height: "100vh" }}>
				{children}
			</Typography>
		</Container>
	);
};

export default Layout;
