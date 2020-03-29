import React, { FC, useEffect, useState } from "react";
import { RouteChildrenProps, match } from "react-router-dom";
import { getPosition } from "../actions";
import { Position } from "../types";
import { CircularProgress } from "@material-ui/core";
import PositionItem from "../components/positionItem";

const PositionPage: FC<RouteChildrenProps<any>> = ({ match }: RouteChildrenProps<{ id: string }>) => {
	const [position, setPosition] = useState((null as unknown) as Position);

	useEffect(() => {
		const id = match?.params.id;

		getPosition(id!).then(setPosition);
	}, [match!.params.id]);

	if (!position) {
		return <CircularProgress color="secondary" />;
	}

	console.log(position);

	return <PositionItem position={position} />;
};

export default PositionPage;
