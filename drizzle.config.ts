// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import 'dotenv/config';

export default {
	schema: './src/lib/db/schema.ts',
	out: './drizzle/migrations',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DATABASE_URL ?? 'file:./local.db',
		authToken: process.env.DATABASE_AUTH_TOKEN
	}
} satisfies Config;
