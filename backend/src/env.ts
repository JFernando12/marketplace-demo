import { config } from 'dotenv';
config();

export const PORT = process.env.PORT;
export const JWT_KEY = process.env.JWT_KEY!;

export const DB_USERNAME = process.env.DB_USERNAME!;
export const DB_PASSWORD = process.env.DB_PASSWORD!;
export const DB_HOST = process.env.DB_HOST!;
export const DB_PORT = parseInt(process.env.DB_PORT!);
export const DB_DATABASE = process.env.DB_DATABASE!;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;
