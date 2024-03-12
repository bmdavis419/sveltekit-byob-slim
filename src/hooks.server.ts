import { hc } from 'hono/client';
import type { AppType } from '$lib/api';

export const handle = async ({ event, resolve }) => {
	// HONO STUFF
	const { api } = hc<AppType>('/', { fetch: event.fetch });
	event.locals.api = api;

	// SEND
	return resolve(event);
};
