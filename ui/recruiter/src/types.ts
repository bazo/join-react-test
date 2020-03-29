export interface Application {
	id: string;
	positionId: string;
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	phone: string;
	photo: {
		mediaType: string;
		contentType: string;
		base64: boolean;
		data: string;
	};
}
