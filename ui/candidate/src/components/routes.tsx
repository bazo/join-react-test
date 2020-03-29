import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import WithLayout from "./withLayout";
import PositionsPage from "../pages/positions";
import PositionPage from "../pages/position";

const Routes = () => {
	return (
		<Switch>
			<WithLayout path="/" exact component={PositionsPage} />
			<WithLayout path="/positions/:id" exact component={PositionPage} />
		</Switch>
	);
};

export default Routes;
