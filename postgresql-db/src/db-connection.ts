import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { connectionString } from '../drizzle.config';

const pool = new Pool({
    connectionString: connectionString
});

export const db = drizzle(pool);
