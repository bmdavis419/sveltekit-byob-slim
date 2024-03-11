<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';

	const { data } = $props();
</script>

<div class="container flex justify-center items-center">
	<Card.Root class="w-full md:w-[600px]">
		<Card.Header class="flex flex-row justify-between items-center">
			<h2 class="font-bold text-xl">Basic Todo App</h2>
			<h4 class="font-light text-md">Welcome {data.user.firstName}</h4>
		</Card.Header>
		<Card.Content></Card.Content>
	</Card.Root>
</div>
