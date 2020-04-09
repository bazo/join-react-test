import { calculateApplicationScore, calculateApplicationScoreFunc } from "../calculateApplicationScore";
import { Application } from "../../types";

const cases = [
	{
		application: {
			fullName: "Martin b", //10
			email: "martin@martin.sk", //10
			password: "123456", //10
			phone: null, //20
			avatar: null, //50
		} as Partial<Application>,
		score: 30,
	},
	{
		application: {
			fullName: "Martin b", //10
			email: null, //10
			password: "123456", //10
			phone: null, //20
			avatar: null, //50
		} as Partial<Application>,
		score: 20,
	},
	{
		application: {
			fullName: null, //10
			email: null, //10
			password: "123456", //10
			phone: null, //20
			avatar: null, //50
		} as Partial<Application>,
		score: 10,
	},
	{
		application: {
			fullName: null, //10
			email: null, //10
			password: null, //10
			phone: null, //20
			avatar: null, //50
		} as Partial<Application>,
		score: 0,
	},
	{
		application: {
			fullName: "Martin b", //10
			email: "martin@martin.sk", //10
			password: "123456", //10
			phone: "123456", //20
			avatar: null, //50
		} as Partial<Application>,
		score: 50,
	},
	{
		application: {
			fullName: "Martin b", //10
			email: "martin@martin.sk", //10
			password: "123456", //10
			phone: "123456", //20
			avatar: "http image url", //50
		} as Partial<Application>,
		score: 100,
	},
];

test("calculates applicant score", () => {
	cases.forEach(caseData => {
		const result = calculateApplicationScore(caseData.application);
		expect(result).toEqual(caseData.score);
	});
});

test("calculates applicant score functionally", () => {
	cases.forEach(caseData => {
		const result = calculateApplicationScoreFunc(caseData.application);
		expect(result).toEqual(caseData.score);
	});
});
