import { Application, ApplicationState } from "../types";

export default function getNextStates({ state }: Partial<Application>): string[] {
	switch (state) {
		case ApplicationState.SUBMITTED:
			return [ApplicationState.IN_REVIEW];

		case ApplicationState.IN_REVIEW:
			return [ApplicationState.NOT_A_FIT, ApplicationState.HIRED];
		default:
			return [];
	}
}
