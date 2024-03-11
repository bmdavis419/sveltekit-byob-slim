// See https://kit.svelte.dev/docs/types#app
import { ClientType } from '$lib/api';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			api: ClientType['api'];
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
