import { HttpClient } from "@bazo/fetch-client";
import { Application } from "../types";

const http = new HttpClient();

export async function getApplications() {
	return http.get<Application[]>("/api/applications");
}
