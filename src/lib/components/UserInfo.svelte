<script lang="ts">
	import { createPopover } from 'svelte-headlessui';
	import { getInitials } from '$lib';
	import Transition from 'svelte-transition';

	export let user;

	const popover = createPopover({});
</script>

<div class="px-4">
	<div class="relative">
		<div use:popover.button class="group inline-flex items-center outline-none">
			<span>{getInitials(user?.name)}</span>
		</div>
		<Transition
			show={$popover.expanded}
			enter="transition ease-out duration-200"
			enterFrom="opacity-0 translate-y-1"
			enterTo="opacity-100 translate-y-0"
			leave="transition ease-in duration-150"
			leaveFrom="opacity-100 translate-y-0"
			leaveTo="opacity-0 translate-y-1"
		>
			<div
				use:popover.panel
				class="absolute left-1/2 z-10 mt-3 w-90 max-w-sm -translate-x-1/2 transform-x-1/2 transform px-4 sm:px-0"
			>
				<div class="flex items-center gap-4 rounded-lg shadow-lg bg-stone-50 p-4">
					<div
						class="w-16 h-16 bg-blue-600 rounded-full text-stone-50 flex items-center justify-center text-2xl"
					>
						<span>{getInitials(user?.name)}</span>
					</div>
					<div class="flex flex-col gap-y-1">
						<p class="text-stone-950 text-xl font-bold">{user.name}</p>
						<span class="text-base text-stone-500">{user.title}</span>
						<span class="text-base text-blue-500">{user.email}</span>
					</div>
				</div>
			</div>
		</Transition>
	</div>
</div>
