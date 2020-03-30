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

export async function getPrefilledApplications() {
	return http.get<Application[]>("https://candidates.free.beeceptor.com/api/candidate");
}

export async function getApplications() {
	return await http.get<Application[]>("/api/applications");
}
