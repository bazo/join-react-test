import { HttpClient } from "@bazo/fetch-client";
import { Position, Application } from "../types";

const http = new HttpClient();

export async function getPositions() {
	return http.get<Position[]>("/api/positions");
}

export async function getPosition(id: string) {
	return http.get<Position>(`/api/positions/${id}`);
}

export async function saveApplication(data: any) {
	return http.put<Position>("/api/applications", data);
}

export async function getPrefilledApplications(): Promise<Application[]> {
	try {
		return await http.get<Application[]>("https://candidates.free.beeceptor.com/api/candidate");
	} catch (err) {
		return await http.get<Application[]>(process.env.REACT_APP_CANDIDATES_FILE_URL);
	}
}

export async function getApplications(): Promise<Application[]> {
	try {
		return await http.get<Application[]>("/api/applications");
	} catch (err) {
		return [];
	}
}
