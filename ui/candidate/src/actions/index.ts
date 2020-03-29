import { HttpClient } from "@bazo/fetch-client";
import { Position } from "../types";

const http = new HttpClient();

export async function getPositions() {
	return http.get<Position[]>("/api/positions");
}

export async function getPosition(id: string) {
	return http.get<Position>(`/api/positions/${id}`);
}
