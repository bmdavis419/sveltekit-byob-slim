// routes/users.ts
import { db } from '$lib/db';
import { Hono } from 'hono';

const users = new Hono()
	.get('/', async (c) => {
		const users = await db.query.users.findMany();

		return c.json({ users });
	})
	.post('/', (c) => {
		return c.json({ message: 'creating user' });
	});

export default users;
export type UsersType = typeof users;
