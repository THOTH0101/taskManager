<script lang="ts">
	import { createListbox } from 'svelte-headlessui';
	import { Icon } from 'svelte-icons-pack';
	import { BiCheck } from 'svelte-icons-pack/bi';
	import { BsChevronExpand } from 'svelte-icons-pack/bs';
	import Transition from 'svelte-transition';

	let { label = '', lists = null, selected = $bindable() } = $props();

	const listbox = createListbox({ label: 'Actions', selected: selected });

	function onChange(e: Event) {
		selected = (e as CustomEvent).detail.selected;
	}
</script>

<div class="w-full">
	{#if label}
		<p class="text-stone-900">{label}</p>
	{/if}

	<div class="relative mt-1">
		<button
			use:listbox.button
			onchange={onChange}
			class="relative w-full cursor-default rounded bg-stone-200 pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-stone-300 sm:text-sm"
		>
			<span class="block truncate">{selected}</span>
			<span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
				<Icon src={BsChevronExpand} className="h-5 w-5 text-stone-400" />
			</span>
		</button>
		<Transition
			show={$listbox.expanded}
			leave="transition ease-in duration-100"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<ul
				use:listbox.items
				class="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-stone-100 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
			>
				{#each lists as list}
					{@const active = $listbox.active === list}
					{@const selected = $listbox.selected === list}
					<li
						class="relative cursor-default py-2 pr-4 pl-10 select-none {active
							? 'bg-amber-100 text-amber-900'
							: 'text-gray-900'}"
						use:listbox.item={{ list }}
					>
						<span class="block truncate {selected ? 'font-medium' : 'font-normal'}">{list}</span>
						{#if selected}
							<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
								<Icon src={BiCheck} className="h-5 w-5" />
							</span>
						{/if}
					</li>
				{/each}
			</ul>
		</Transition>
	</div>
</div>
