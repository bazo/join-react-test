import React, { FC } from "react";
import { RouteProps, Route } from "react-router";
import Layout from "./layout";

const renderLayout = (Component: any, props: any) => {
	return (
		<Layout>
			<Component {...props} />
		</Layout>
	);
};

const WithLayout: FC<RouteProps> = ({ component: Component, ...props }: RouteProps) => {
	return <Route {...props} render={renderLayout.bind(null, Component)} />;
};

export default WithLayout;
