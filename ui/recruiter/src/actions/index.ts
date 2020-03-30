import { HttpClient } from "@bazo/fetch-client";
import { Application } from "../types";

const http = new HttpClient();

export async function getPrefilledApplications() {
	return http.get<Application[]>("https://candidates.free.beeceptor.com/api/candidate");
}

export async function getApplications() {
	return await http.get<Application[]>("/api/applications");
}