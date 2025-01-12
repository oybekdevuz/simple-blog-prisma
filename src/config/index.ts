import * as dotenv from "dotenv"

dotenv.config();

export type ConfigType = {
	PORT: number;
	DATABASE_URL: string;
    ACCESS_SECRET_KEY: string;
	ACCESS_EXPIRE_TIME: string;
	SWAGGER_PASSWORD: string;
};

const requiredVariables = [
	"PORT",
	"DATABASE_URL",
    "ACCESS_SECRET_KEY",
	"SWAGGER_PASSWORD"

];

const missingVariables = requiredVariables.filter((variable) => {
	const value = process.env[variable];
	return !value || value.trim() === "";
});


export const config: ConfigType = {
	PORT: parseInt(process.env.PORT as string, 10),
	DATABASE_URL: (process.env.DATABASE_URL as string),
    ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY as string,
	ACCESS_EXPIRE_TIME: process.env.ACCESS_EXPIRE_TIME as string,
	SWAGGER_PASSWORD: process.env.SWAGGER_PASSWORD as string

	
};
