import { getUserInfo, parseApiResponse } from '$lib/utils/index.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { session, user } = await getUserInfo(locals);
	if (!session || !user) {
		redirect(307, '/');
	}

	const res = await parseApiResponse(locals.api.todos.$get());

	if (res.error !== null) {
		error(res.status, res.error);
	}

	return res.data;
};

export const actions = {
	update: async ({ request, locals }) => {
		const formData = await request.formData();

		const todoId = formData.get('todoId');

		if (!todoId) {
			error(400, 'no todo id passed in...');
		}

		await locals.api.todos.complete.$post({
			// again, really dumb way to do this, just showing off a proof of concept for now
			form: { todoId: todoId.toString() }
		});

		// todo better error handling

		return { success: true };
	},
	create: async ({ request, locals }) => {
		const formData = await request.formData();

		await locals.api.todos.$post({
			form: {
				name: formData.get('name') ?? ''
			}
		});

		// todo better error handling

		return { success: true };
	}
};
