<script lang="ts">
	import { createTabs } from 'svelte-headlessui';
	import { Icon } from 'svelte-icons-pack';

	let { tabs, tabContent, selectedTab = $bindable() } = $props();

	const tab = createTabs();
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
				onclick={() => {
					selectedTab = index;
				}}
			>
				<Icon src={tb.icon} />
				<span>{tb.title}</span>
			</button>
		{/each}
	</div>
	<div use:tab.panel class="w-full mt-2">
		{#if tabContent}
			{@render tabContent()}
		{/if}
	</div>
</div>
