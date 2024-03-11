import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.session || !locals.user) {
		redirect(307, '/');
	}

	return { user: locals.user };
};
