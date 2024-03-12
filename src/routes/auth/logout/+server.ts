import { lucia } from '$lib/auth';
import { getUserInfo } from '$lib/utils/index.js';
import { fail, redirect } from '@sveltejs/kit';

export const GET = async (event) => {
	const { session } = await getUserInfo(event.locals);

	if (!session) {
		fail(401);
	}

	if (session) {
		lucia.invalidateSession(session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	return redirect(302, '/');
};
