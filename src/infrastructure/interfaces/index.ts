import { User } from "@prisma/client";

export interface IResponse<T> {
	data: T;
	status_code: number;
	message: string | string[];
}

export interface LoginResponse {
	id: string;
	name: string;
	token: string;
}

export interface ICurrentExecuter {
	user: User;
}