import React, { FC, useState } from "react";
import { Position, Application } from "../types";
import { makeStyles, createStyles, Theme, Grid, Avatar, Button } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { TextField } from "mui-rff";
import PhoneNumberInput, { formatPhoneNumber, parsePhoneNumber } from "./formComponents/phoneNumberInput";
import { AvatarUploaderControl } from "./avatarUploader";
import { saveApplication } from "../actions";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		h2: {
			marginTop: 0,
		},
		input: {
			color: "#fff",
		},
	})
);

interface Props {
	position: Position;
}

const ApplicationForm: FC<Props> = ({ position }) => {
	const classes = useStyles();

	const [applicationSent, setApplicationSent] = useState(false);

	const onSubmit = (values: Application) => {
		values.positionId = position.id;
		saveApplication(values).then(() => {
			setApplicationSent(true);
		});
	};

	if (applicationSent) {
		return (
			<MuiAlert elevation={6} variant="filled" severity="success">
				Your application has been sent.
			</MuiAlert>
		);
	}

	return (
		<div className={classes.root}>
			<h2 className={classes.h2}>Interested in this job?</h2>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={1}>
					<Avatar alt={position.contact_person.Name} src={position.contact_person.PhotoURL} />
				</Grid>
				<Grid item xs={12} sm={11}>
					{position.contact_person.Name}
					<br />
					{position.contact_person.Role}
				</Grid>
			</Grid>
			<Form
				onSubmit={onSubmit}
				render={({ handleSubmit, values, submitting, invalid }) => (
					<form onSubmit={handleSubmit} noValidate>
						<TextField label="Your email" name="email" type="email" />
						<TextField label="Set a password" name="password" type="password" />
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<TextField label="First name" name="firstName" className={classes.input} />
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField label="Last name" name="lastName" />
							</Grid>
						</Grid>
						<Field name="phone" format={formatPhoneNumber} parse={parsePhoneNumber}>
							{({ input, meta, ...rest }) => (
								<div>
									<PhoneNumberInput
										{...{ input, meta, ...rest }}
										country={"de"}
										label="Phone number"
									/>
									{meta.touched && meta.error && <p className="error">{meta.error}</p>}
								</div>
							)}
						</Field>

						<Field name="photo">
							{({ input, meta, ...rest }) => (
								<div>
									<AvatarUploaderControl {...{ input, meta, ...rest }} />
									{meta.touched && meta.error && <p className="error">{meta.error}</p>}
								</div>
							)}
						</Field>

						<Button variant="contained" color="primary" disabled={submitting || invalid} type="submit">
							Apply for this job
						</Button>
					</form>
				)}
			></Form>
		</div>
	);
};

export default ApplicationForm;
