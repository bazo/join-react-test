import React, { FC, useState, useEffect } from "react";
import { Application } from "../types";
import ApplicationItem from "./applicationItem";
import { CircularProgress } from "@material-ui/core";
import { getApplications, getPrefilledApplications } from "../actions";

const ApplicationsList: FC = () => {
	const [applications, setApplications] = useState((null as unknown) as Application[]);
	const [loadingMore, setLoadingMore] = useState(true);

	useEffect(() => {
		getApplications().then(loaded => {
			const current = applications ? applications : [];
			setApplications([...current, ...loaded]);
		});
	}, []);

	useEffect(() => {
		getPrefilledApplications().then(loaded => {
			const current = applications ? applications : [];
			setApplications([...current, ...loaded]);
			setLoadingMore(false);
		});
	}, []);

	const deleteItem = (key: number) => {
		applications.splice(key);
		setApplications([...applications]);
	};

	const changeState = (key: number, state: string) => {
		applications[key].state = state;
		setApplications([...applications]);
	};

	if (!applications) {
		return <CircularProgress color="secondary" />;
	}

	return (
		<div>
			<p>
				<span className="applications-length">{applications.length}</span> applications submitted
			</p>
			{applications.map((application, key) => {
				return (
					<ApplicationItem
						application={application}
						key={application.email}
						onDeleteClicked={deleteItem.bind(null, key)}
						onStateChange={changeState.bind(null, key)}
					/>
				);
			})}
			{loadingMore && <CircularProgress color="secondary" />}
		</div>
	);
};

export default ApplicationsList;
