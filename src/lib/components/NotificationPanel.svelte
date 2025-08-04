<script lang="ts">
	import { createPopover } from 'svelte-headlessui';
	import Transition from 'svelte-transition';
	import { HiOutlineBellAlert } from 'svelte-icons-pack/hi';
	import { BiMessageSquareDetail } from 'svelte-icons-pack/bi';
	import { Icon } from 'svelte-icons-pack';
	import { IoNotificationsOutline } from 'svelte-icons-pack/io';

	let data: any = [
		{
			_id: '1',
			team: ['3'],
			text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi neque corrupti itaque officiis distinctio voluptatibus beatae consequuntur aliquam fugit eveniet!',
			task: {
				_id: '1',
				title: 'New Task'
			},
			notiType: 'alert',
			isRead: [],
			createdAt: '2025-04-02',
			__v: 0
		},
		{
			_id: '1',
			team: ['3'],
			text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi neque corrupti itaque officiis distinctio voluptatibus beatae consequuntur aliquam fugit eveniet!',
			task: {
				_id: '1',
				title: 'New Task'
			},
			notiType: 'alert',
			isRead: [],
			createdAt: '2025-04-02',
			__v: 0
		}
	];

	const readHandler = (type: string, id: string) => {};
	const viewHandler = (item: any) => {};

	const ICONS: any = {
		alert: HiOutlineBellAlert,
		message: BiMessageSquareDetail
	};

	const callsToAction = [
		{ name: 'Cancel', href: '#', icon: '' },
		{ name: 'Mark as Read', href: '#', icon: '', onClick: () => readHandler('all', '') }
	];

	const popover = createPopover({});
</script>

<div class="realtive">
	<button use:popover.button class="inline-flex items-center outline-none">
		<div class="w-8 h-8 flex items-center justify-center text-stone-800 relative">
			<Icon src={IoNotificationsOutline} size="24" />
			{#if data?.length > 0}
				<span
					class="absolute top-0 right-1 bg-red-600 text-stone-50 text-xs rounded-full font-semibold px-1"
					>{data?.length}</span
				>
			{/if}
		</div>
	</button>

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
			class="absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max px-4"
		>
			<div
				class="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-stone-50 text-sm leading-6 shadow-lg ring-1 ring-stone-900/5"
			>
				<div class="p-4">
					{#each data.slice(0, 5) as item, index}
						<div
							id={item._id + index}
							class="group relative flex gap-x-4 rounded-lg p-4 hover:bg-stone-50"
						>
							<div
								class="mt-1 px-4 h-12 w-24 flex items-center justify-center rounded-lg bg-stone-200"
							>
								<Icon src={ICONS[item.notiType]} size="24" />
							</div>

							<div class="cursor-pointer" onclick={() => viewHandler(item)}>
								<div class="flex items-center gap-3 font-semibold text-stone-900 capitalize">
									<p>{item.notiType}</p>
									<span class="text-xs font-normal lowercase">
										{item.createdAt}
									</span>
								</div>
								<p class="line-clamp-1 mt-1 text-stone-600">
									{item.text}
								</p>
							</div>
						</div>
					{/each}

					<div class="grid grid-cols-2 divide-x divide-stone-900/5 bg-stone-50">
						{#each callsToAction as action}
							<a
								id={action.name}
								href={action.href}
								class="flex items-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-stone-100"
								onclick={action.onClick ? action.onClick : popover.close}>{action.name}</a
							>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</Transition>
</div>
