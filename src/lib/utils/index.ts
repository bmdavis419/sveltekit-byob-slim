import { error } from '@sveltejs/kit';
import type { ClientResponse } from 'hono/client';

export const parseApiResponse = async <T>(fetchCall: Promise<ClientResponse<T>>) => {
	const response = await fetchCall;
	if (!response.ok) {
		const error = await response.text();
		return { data: null, error, status: response.status };
	}
	const data = await response.json();
	return { data, error: null, status: response.status };
};

export const getUserInfo = async (locals: App.Locals) => {
	const res = await parseApiResponse(locals.api.users.me.$get());

	if (res.error || !res.data) {
		error(res.status, res.error);
	}

	return res.data;
};
