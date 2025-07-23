<script lang="ts">
	import { selectedUsers } from '$lib/store/store';
	import { createListbox } from 'svelte-headlessui';
	import { Icon } from 'svelte-icons-pack';
	import { BiCheck } from 'svelte-icons-pack/bi';
	import { BsChevronExpand } from 'svelte-icons-pack/bs';
	import Transition from 'svelte-transition';
	import { get } from 'svelte/store';
	import { summary } from '../../assets/data';
	import { getInitials } from '$lib';

	const data = summary.users;
	let users: any;

	const listbox = createListbox({ label: 'Actions', selected: users });

	function handleChange(e: Event) {
		const currentUser = (e as CustomEvent).detail.selected;
		let userList: any = get(selectedUsers);

		if (currentUser) userList = Array.from(new Set([...userList, currentUser]));

		selectedUsers.set(userList);
	}

	selectedUsers.subscribe((value) => {
		users = value;
	});
</script>

<div class="relative mt-1">
	<button
		use:listbox.button
		onchange={handleChange}
		class="relative w-full cursor-default rounded bg-stone-50 pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-stone-300 sm:text-sm"
	>
		<span class="block truncate">
			{users.map((u) => u.name).join(', ')}
		</span>
		<span
			class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-stone-400"
		>
			<Icon src={BsChevronExpand} className="h-5 w-5" />
		</span>
	</button>

	<Transition
		show={$listbox.expanded}
		leave="transition ease-in duration-100"
		leaveFrom="opacity-100"
		leaveTo="opacity-0"
	>
		<ul
			class="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-stone-50 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
			use:listbox.items
		>
			{#each data as value}
				{@const active = $listbox.active === value}
				{@const selected = users.includes(value)}
				<li
					class={'relative cursor-default select-none py-2 pl-10 pr-4 ' +
						(active ? 'bg-amber-100 text-amber-900' : 'text-gray-900')}
					use:listbox.item={{ value }}
				>
					<div
						class={'flex items-center gap-2 truncate ' + (selected ? 'font-medium' : 'font-normal')}
					>
						<div
							class="w-6 h-6 rounded-full text-stone-50 flex items-center justify-center bg-violet-600"
						>
							<span class="text-center text-[10px]">{getInitials(value.name)}</span>
						</div>
						<span>{value.name}</span>

						{#if selected}
							<span class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
								<Icon src={BiCheck} className="h-5 w-5" />
							</span>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</Transition>
</div>
