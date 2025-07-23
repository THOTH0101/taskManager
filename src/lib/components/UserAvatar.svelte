<script lang="ts">
	import { createMenu } from 'svelte-headlessui';
	import { Icon } from 'svelte-icons-pack';
	import { CgProfile } from 'svelte-icons-pack/cg';
	import { TrOutlineLogout } from 'svelte-icons-pack/tr';
	import { RiSystemLockPasswordLine } from 'svelte-icons-pack/ri';
	import Transition from 'svelte-transition';
	import { getInitials } from '$lib';

	export let user;
	const menu = createMenu({ label: 'User Menu' });

	function onChange(e: Event) {
		console.log('select', (e as CustomEvent).detail.selected);
	}
</script>

<div class="relative inline-block text-left">
	<div>
		<button
			use:menu.button
			class="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600"
		>
			<span class="text-stone-50 font-semibold">{user ? getInitials(user.name) : 'User'}</span>
		</button>

		<Transition
			show={$menu.expanded}
			enter="transition ease-out duration-100"
			enterFrom="transform opacity-0 scale-95"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-in duration-75"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-95"
		>
			<div
				use:menu.item
				class="absolute right-0 mt-2 w-56 origin-top-right divide-stone-100 rounded-md bg-stone-50 shadow-2xl ring-1 ring-black/5 focus:outline-none"
			>
				<div class="p-4">
					<button
						use:menu.item
						class="text-stone-700 w-full hover:underline cursor-pointer flex items-center rounded-md px-2 py-2 text-base"
					>
						<Icon src={CgProfile} size="24" className="mr-2" />
						Profile
					</button>
					<button
						use:menu.item
						class="text-stone-700 w-full hover:underline cursor-pointer flex items-center rounded-md px-2 py-2 text-base"
					>
						<Icon src={RiSystemLockPasswordLine} size="24" className="mr-2" />
						Change Password
					</button>
					<button
						use:menu.item
						class="text-red-500 w-full flex hover:underline cursor-pointer items-center rounded-md px-2 py-2 text-base"
					>
						<Icon src={TrOutlineLogout} size="24" className="mr-2" />
						Logout
					</button>
				</div>
			</div>
		</Transition>
	</div>
</div>
