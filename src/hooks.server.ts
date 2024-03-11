import { hc } from 'hono/client';
import type { AppType } from '$lib/api';
import { lucia } from '$lib/auth';

export const handle = async ({ event, resolve }) => {
	// HONO STUFF
	const { api } = hc<AppType>('/', { fetch: event.fetch });
	event.locals.api = api;

	// AUTH STUFF: https://lucia-auth.com/getting-started/sveltekit
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;

	// SEND
	return resolve(event);
};
