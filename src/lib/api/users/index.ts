// routes/users.ts
import { db } from '$lib/db';
import { Hono } from 'hono';
import type { MiddlewareVariables } from '..';

const users = new Hono<{
	Variables: MiddlewareVariables;
}>()
	.patch('/')
	.get('/', async (c) => {
		const users = await db.query.userTable.findMany();

		const user = c.get('user');

		console.log('user', user);

		return c.json({ users });
	})
	.post('/', (c) => {
		return c.json({ message: 'creating user' });
	});

export default users;
export type UsersType = typeof users;
