import { Application, ApplicationState } from "../types";

export default function getStateColor({ state }: Partial<Application>) {
	switch (state) {
		case ApplicationState.HIRED:
			return "primary";

		case ApplicationState.NOT_A_FIT:
			return "secondary";
		default:
			return undefined;
	}
}
