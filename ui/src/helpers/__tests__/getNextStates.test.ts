import { Application, ApplicationState } from "../../types";
import getNextStates from "../getNextStates";

const cases = [
	{
		application: {
			state: ApplicationState.SUBMITTED,
		} as Partial<Application>,
		states: [ApplicationState.IN_REVIEW],
	},
	{
		application: {
			state: ApplicationState.IN_REVIEW,
		} as Partial<Application>,
		states: [ApplicationState.NOT_A_FIT, ApplicationState.HIRED],
	},
	{
		application: {
			state: ApplicationState.HIRED,
		} as Partial<Application>,
		states: [],
	},
	{
		application: {
			state: ApplicationState.NOT_A_FIT,
		} as Partial<Application>,
		states: [],
	},
];

test("selects next states", () => {
	cases.forEach(caseData => {
		const states = getNextStates(caseData.application);
		expect(states).toEqual(caseData.states);
	});
});
