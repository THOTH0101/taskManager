<script lang="ts">
	import { selected } from '$lib/store/store';
	import { createTabs } from 'svelte-headlessui';
	import { Icon } from 'svelte-icons-pack';
	import { get } from 'svelte/store';

	export let tabs;

	const tab = createTabs();
	let selectedTab = 0;

	selected.subscribe(() => {
		selectedTab = get(selected);
	});
</script>

<div class="w-full px-1 sm:px-0">
	<div use:tab.list class="flex space-x-6 rounded-xl p-1">
		{#each tabs as tb, index}
			<button
				use:tab.tab
				class={'w-fit flex items-center outline-none gap-2 px-3 py-2.5 text-base font-medium leading-5 bg-stone-200 ' +
					(selectedTab == index
						? 'text-blue-700 border-b-2 border-blue-600'
						: 'text-stone-800 hover:text-blue-800')}
				on:click={() => {
					selected.set(index);
				}}
			>
				<Icon src={tb.icon} />
				<span>{tb.title}</span>
			</button>
		{/each}
	</div>
	<div use:tab.panel class="w-full mt-2">
		<slot />
	</div>
</div>
