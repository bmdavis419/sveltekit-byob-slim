// src/lib/server/db.ts
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from '$env/static/private';

const client = createClient({
	url: DATABASE_URL,
	authToken: DATABASE_AUTH_TOKEN
});

export const db = drizzle(client, { schema });
