import { Application, ApplicationState } from "../../types";
import getStateColor from "../getStateColor";

const cases = [
	{
		application: {
			state: ApplicationState.SUBMITTED,
		} as Partial<Application>,
		color: undefined,
	},
	{
		application: {
			state: ApplicationState.IN_REVIEW,
		} as Partial<Application>,
		color: undefined,
	},
	{
		application: {
			state: ApplicationState.HIRED,
		} as Partial<Application>,
		color: "primary",
	},
	{
		application: {
			state: ApplicationState.NOT_A_FIT,
		} as Partial<Application>,
		color: "secondary",
	},
];

test("selects application state color", () => {
	cases.forEach(caseData => {
		const color = getStateColor(caseData.application);
		expect(color).toEqual(caseData.color);
	});
});
