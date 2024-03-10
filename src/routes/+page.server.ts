import { parseApiResponse } from '$lib/utils/index.js';
import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const testingData = await parseApiResponse(locals.api.$get());

	if (testingData.error !== null) {
		error(testingData.status, testingData.error);
	}

	const moreTestingData = await parseApiResponse(locals.api.users.$get());

	if (moreTestingData.error !== null) {
		error(testingData.status, moreTestingData.error);
	}

	return { testingData, moreTestingData };
};
