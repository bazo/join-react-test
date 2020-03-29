import React, { FC, useState, useEffect } from "react";
import { RouteChildrenProps } from "react-router-dom";
import { getPositions } from "../actions";
import PositionsList from "../components/positionsList";
import { Position } from "../types";
import { CircularProgress } from "@material-ui/core";

const PositionsPage: FC<RouteChildrenProps<any>> = (props: RouteChildrenProps<any>) => {
	const [positions, setPositions] = useState(null as Position[]);

	useEffect(() => {
		//@ts-ignore
		getPositions().then(setPositions);
	}, []);

	if (!positions) {
		return <CircularProgress color="secondary" />;
	}

	return (
		<div>
			<h1>Positions</h1>
			<PositionsList positions={positions} />
		</div>
	);
};

export default PositionsPage;
