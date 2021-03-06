import { Application } from "../types";

const scores = {
	fullName: 10,
	email: 10,
	password: 10,
	phone: 20,
	avatar: 50,
};

//i think this solution is much prettier :)
export function calculateApplicationScore(application: Pick<Partial<Application>, keyof typeof scores>): number {
	let score = 0;

	for (let [key, points] of Object.entries(scores)) {
		const value = application[key];
		if (value && value.trim() !== "") {
			score += points;
		}
	}

	return score;
}

export function calculateApplicationScoreFunc(application: Pick<Partial<Application>, keyof typeof scores>): number {
	return Object.entries(scores).reduce(
		([_, score], [key, points]) => {
			const value = application[key];
			const newPoints = value && value.trim() !== "" ? points : 0;
			return ["", score + newPoints];
		},
		["", 0]
	)[1];
}
