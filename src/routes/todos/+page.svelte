<script lang="ts">
	const { data } = $props();
</script>

<div class="container flex flex-col items-center justify-center text-white shadow-md">
	<h1 class="mb-6 text-3xl font-bold">Todo List</h1>
	<ul class="space-y-4 pb-8">
		{#each data.todos as todo}
			<li class="flex items-center">
				<form action="?/update" method="post">
					<!-- this is done in a very silly way, but you get the idea of what it does, idc UI right now -->
					<button class="flex flex-row items-center" type="submit">
						<input type="text" name="todoId" class="hidden" value={todo.id} />
						{#if todo.completed}
							DONE
						{:else}
							NOT DONE
						{/if}
						{todo.name}
					</button>
				</form>
			</li>
		{/each}
	</ul>

	<form action="?/create" method="post">
		<div>
			<label for="name" class="block">name</label>
			<input
				type="text"
				name="name"
				id="name"
				class="w-[400px] rounded-lg p-4 text-neutral-950"
				placeholder="my sample todo"
			/>
		</div>

		<button type="submit" class="mt-2 rounded-md bg-neutral-800 p-1 font-semibold text-white"
			>Create</button
		>
		<a href="/auth/logout" class="mt-2 rounded-md bg-neutral-800 p-1 font-semibold text-white"
			>Logout</a
		>
	</form>
</div>
