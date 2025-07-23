<script>
	import { openSidebar } from '$lib/store/store';
	import { Icon } from 'svelte-icons-pack';
	import NotificationPanel from './NotificationPanel.svelte';
	import UserAvatar from './UserAvatar.svelte';
	import { IoSearch } from 'svelte-icons-pack/io';
	import { BiMenu } from 'svelte-icons-pack/bi';
	import { user } from '../../assets/data';

	const toggleSidebar = () => {
		openSidebar.update((isOpen) => !isOpen);
	};
</script>

<nav class="flex sticky justify-between items-center bg-stone-200 px-4 py-3 z-30 top-0">
	<div class="flex gap-4">
		<button on:click={toggleSidebar} class="text-2xl p-2 text-stone-500 lg:hidden">
			<Icon src={BiMenu} size="24" />
		</button>

		<div
			class="w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-stone-100 shadow"
		>
			<Icon src={IoSearch} size="24" />
			<input
				type="text"
				placeholder="Search...."
				class="flex-1 outline-none bg-transparent placeholder:text-stone-500 text-stone-800"
			/>
		</div>
	</div>

	<div class="flex gap-2 items-center">
		<NotificationPanel />
		<UserAvatar {user} />
	</div>
</nav>
