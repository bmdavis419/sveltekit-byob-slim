import type { Context } from 'hono';
import type { MiddlewareVariables } from '..';
import { HTTPException } from 'hono/http-exception';
import type { Session, User } from 'lucia';

export const ensureLoggedIn = (
	c: Context<{
		Variables: MiddlewareVariables;
	}>
) => {
	const session = c.get('session');
	const user = c.get('user');

	if (!session && !user) {
		throw new HTTPException(401, { message: 'Must be logged in to use this endpoint...' });
	}

	return { session, user } as { session: Session; user: User };
};
