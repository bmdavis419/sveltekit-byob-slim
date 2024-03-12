// routes/users.ts
import { Hono } from 'hono';
import type { MiddlewareVariables } from '..';

const users = new Hono<{
	Variables: MiddlewareVariables;
}>().get('/me', (c) => {
	const session = c.get('session');
	const user = c.get('user');

	return c.json({ session, user });
});

export default users;
export type UsersType = typeof users;
