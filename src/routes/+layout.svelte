<script lang="ts">
	import '../app.pcss';

	let isOpen = $state(false);
</script>

<main class="flex min-h-screen w-full flex-col justify-between">
	<!-- navbar -->
	<nav class="bg-gray- p-4 text-white">
		<div class="container mx-auto flex items-center justify-between">
			<a href="/" class="text-xl font-bold">Big Stair</a>
			<button class="md:hidden" on:click={() => (isOpen = !isOpen)}>
				<!-- Hamburger Icon -->
				<svg
					class="h-6 w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16m-7 6h7"
					></path></svg
				>
			</button>
			<div class={`md:flex ${isOpen ? 'block' : 'hidden'} gap-4`}></div>
		</div>
	</nav>

	<!-- content -->
	<slot />

	<!-- footer -->
	<footer class=" py-8 text-white">
		<div class="container mx-auto px-4">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
				<div>
					<h3 class="mb-4 text-xl font-bold">About Us</h3>
					<p class="text-gray-400">This is a very useful app.</p>
				</div>
				<div>
					<h3 class="mb-4 text-xl font-bold">Quick Links</h3>
					<ul class="space-y-2">
						<li><a href="/" class="text-gray-400 hover:text-white">Home</a></li>
					</ul>
				</div>
				<div>
					<h3 class="mb-4 text-xl font-bold">Contact Us</h3>
					<p class="text-gray-400">Email: shed@bigstair.ai</p>
				</div>
			</div>
			<hr class="my-8 border-gray-700" />
			<p class="text-center text-gray-400">
				&copy; {new Date().getFullYear()} Big Stair. All rights reserved.
			</p>
		</div>
	</footer>
</main>
