import React from "react";

import { Switch } from "react-router-dom";
import WithLayout from "./withLayout";
import PositionsPage from "../pages/positions";
import PositionPage from "../pages/position";
import RecruiterPage from "../pages/recruiter";

const Routes = () => {
	return (
		<Switch>
			<WithLayout path="/positions/:id" exact component={PositionPage} />
			<WithLayout path="/recruiter" exact component={RecruiterPage} />
			<WithLayout path="/" exact component={PositionsPage} />
		</Switch>
	);
};

export default Routes;
