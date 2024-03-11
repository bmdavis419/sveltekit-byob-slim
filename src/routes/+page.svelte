<script lang="ts">
	const { data } = $props();

	$effect(() => {
		console.log(data.moreTestingData.data.users);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>here is some server-side loaded data from hono land: {data.testingData.data.message}</p>

<p>MORE DATA WOW: {data.moreTestingData.data.users.length}</p>

<a href="/auth/login">do some auth shit</a>

<h3>current auth status:</h3>

{#if data.userInfo}
	<h5>logged in! welcome {data.userInfo.firstName}</h5>
{:else}
	<h5>you are not logged in :(</h5>
{/if}
