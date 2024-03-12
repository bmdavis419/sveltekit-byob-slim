import { Hono } from 'hono';
import { hc } from 'hono/client';
import users from './users';
import todos from './todos';
import { getCookie, setCookie } from 'hono/cookie';
import { lucia } from '$lib/auth';
import { createMiddleware } from 'hono/factory';
import type { User, Session } from 'lucia';

/* -------------------------------------------------------------------------- */
/*                                     Middleware                             */
/* -------------------------------------------------------------------------- */

const authMiddleware = createMiddleware(async (c, next) => {
	const sessionId = getCookie(c, lucia.sessionCookieName);

	if (!sessionId) {
		c.set('session', null);
		c.set('user', null);
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const cookie = lucia.createSessionCookie(session.id);
		setCookie(c, cookie.name, cookie.value, {
			path: cookie.attributes.path,
			maxAge: cookie.attributes.maxAge,
			domain: cookie.attributes.domain,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			sameSite: cookie.attributes.sameSite as any,
			secure: cookie.attributes.secure,
			httpOnly: cookie.attributes.httpOnly,
			expires: cookie.attributes.expires
		});
	}

	if (!session) {
		const cookie = lucia.createBlankSessionCookie();
		setCookie(c, cookie.name, cookie.value, {
			path: cookie.attributes.path,
			maxAge: cookie.attributes.maxAge,
			domain: cookie.attributes.domain,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			sameSite: cookie.attributes.sameSite as any,
			secure: cookie.attributes.secure,
			httpOnly: cookie.attributes.httpOnly,
			expires: cookie.attributes.expires
		});
	}

	c.set('session', session);
	c.set('user', user);
	return next();
});

export type MiddlewareVariables = {
	session: Session | null;
	user: User | null;
};

/* -------------------------------------------------------------------------- */
/*                                     App                                    */
/* -------------------------------------------------------------------------- */
const app = new Hono<{
	Variables: MiddlewareVariables;
}>().basePath('/api');

app.use(authMiddleware);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

const routes = app
	.route('/users', users)
	.route('/todos', todos)
	.get('/', (c) => c.json({ message: 'server is healthy' }));

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
export default app;
export type AppType = typeof routes;

export const client = hc<AppType>('/');
export type ClientType = typeof client;
