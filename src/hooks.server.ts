import { hc } from 'hono/client';
import type { AppType } from '$lib/api';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const apiClient: Handle = async ({ event, resolve }) => {
	const { api } = hc<AppType>('/', { fetch: event.fetch });

	event.locals.api = api;

	const response = await resolve(event);
	return response;
};

export const handle = sequence(apiClient);
