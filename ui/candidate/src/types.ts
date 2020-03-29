export interface Position {
	id: string;
	uid: null;
	type: string;
	href: string;
	tags: null;
	first_publication_date: string;
	last_publication_date: string;
	slugs: string[];
	linked_documents: null;
	lang: Lang;
	alternate_languages: null;
	data: Data;
	description: string;
	contact_person: ContactPerson;
}

export interface ContactPerson {
	Name: string;
	Role: string;
	PhotoURL: string;
}

export interface Data {
	title: Title[];
	department: string;
	type: DataType;
	url: URL;
}

export interface Title {
	type: TitleType;
	text: string;
	spans: null;
}

export enum TitleType {
	Paragraph = "paragraph"
}

export enum DataType {
	Employee = "employee",
	Internship = "internship"
}

export interface URL {
	link_type: LinkType;
	url: string;
}

export enum LinkType {
	Web = "Web"
}

export enum Lang {
	EnUs = "en-us"
}

export interface Application {
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
