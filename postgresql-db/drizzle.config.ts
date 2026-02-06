import { defineConfig } from 'drizzle-kit';

const POSTGRES_USER = process.env.POSTGRES_USER || 'dummyuser';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'dummypassword';
const POSTGRES_DB = process.env.POSTGRES_DB || 'testdb_01';
const POSTGRES_HOST = process.env.POSTGRES_HOST || '0.0.0.0';
const POSTGRES_PORT = process.env.POSTGRES_PORT || '5432';

['POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB', 'POSTGRES_HOST', 'POSTGRES_PORT'].forEach((varName) => {
    if (!process.env[varName]) {
        console.warn(`Warning: Environment variable ${varName} is not set. Using default value.`);
    }
});

const config = defineConfig({
    schema: './src/db-schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`
    }
});

export const connectionString = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;

export default config;
