import React, { FC } from "react";
import { Application } from "../types";
import ApplicationItem from "./applicationItem";
import { CircularProgress } from "@material-ui/core";

interface Props {
	applications: Application[];
}

const ApplicationsList: FC<Props> = ({ applications }) => {
	if (!applications) {
		return <CircularProgress color="secondary" />;
	}

	return (
		<div>
			<p>{applications.length} applications submitted</p>
			{applications.map(application => {
				return <ApplicationItem application={application} key={application.id} />;
			})}
		</div>
	);
};

export default ApplicationsList;
