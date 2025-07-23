<script lang="ts">
	import { page } from '$app/state';
	import { openSidebar } from '$lib/store/store';
	import { Icon } from 'svelte-icons-pack';
	import { IoCloseCircleOutline } from 'svelte-icons-pack/io';
	import { TrFillSettings } from 'svelte-icons-pack/tr';
	import { SiTask } from 'svelte-icons-pack/si';

	export let links;

	let isOpen: boolean = false;

	openSidebar.subscribe((value) => {
		isOpen = value;
	});

	const closeSidebar = () => {
		openSidebar.set(false);
	};
</script>

<!-- Overlay for mobile -->
<div
	class={'fixed inset-0 z-40 lg:hidden transition-opacity duration-300 bg-black p-4 ' + isOpen
		? 'block'
		: 'hidden'}
></div>
<!-- Sidebar drawer -->
<aside
	class={'fixed ease-in-out z-50 top-0 left-0 h-full w-64 bg-stone-200 p-4 transform transition-transform duration-300 lg:translate-x-0 lg:w-1/5 lg:block ' +
		(isOpen ? 'translate-x-0' : '-translate-x-full')}
>
	<div class="flex flex-col h-full">
		<div class="flex justify-between items-center">
			<h1 class="flex gap-1 item-center">
				<p class="bg-blue-600 p-2 rounded-full">
					<Icon src={SiTask} size="24" />
				</p>
				<span class="text-2xl font-bold text-stone-800">Task Me</span>
			</h1>

			{#if isOpen}
				<button on:click={closeSidebar} class="lg:hidden"
					><Icon src={IoCloseCircleOutline} size="24" /></button
				>
			{/if}
		</div>

		<div class="flex-1 flex flex-col gap-y-5 py-8">
			{#each links as link}
				<a
					class={'w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-base hover:bg-[#2564ed2d] ' +
						(page.url.pathname === link.path ? 'bg-blue-700 text-stone-200' : 'text-stone-700')}
					href={link.path}
					on:click={closeSidebar}
				>
					<Icon src={link.icon_src} size="24" />
					<span class="hover:text-[#2564ed]">{link.label}</span>
				</a>
			{/each}
		</div>
		<button
			class="w-full bottom-0 cursor-pointer flex gap-2 p-2 items-center text-lg text-stone-800"
		>
			<Icon src={TrFillSettings} size="24" />
			<span>Settings</span>
		</button>
	</div>
</aside>
