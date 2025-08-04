<script lang="ts">
	import { goto } from '$app/navigation';
	import { createDialog, createMenu } from 'svelte-headlessui';
	import { Icon } from 'svelte-icons-pack';
	import { AiOutlineEdit, AiTwotoneFolderOpen } from 'svelte-icons-pack/ai';
	import { BsThreeDots } from 'svelte-icons-pack/bs';
	import { IoAdd, IoDuplicate } from 'svelte-icons-pack/io';
	import { RiSystemDeleteBin6Line } from 'svelte-icons-pack/ri';
	import Transition from 'svelte-transition';
	import AddTask from './AddTask.svelte';
	import AddSubTask from './AddSubTask.svelte';
	import ConfirmationDialog from './ConfirmationDialog.svelte';

	let { task } = $props();

	const menu = createMenu({ label: 'Actions' });

	const taskDialog = $state(createDialog({}));
	const SubTaskDialog = $state(createDialog({}));
	const confirmationDialog = $state(createDialog({}));
	let active = $state(false);

	const duplicateHandler = () => {};
	// const deleteClicks = () => {};
	const deleteHandler = () => {};

	const items = [
		{
			label: 'Open Task',
			icon: AiTwotoneFolderOpen,
			className: 'mr-2 h-5 w-5',
			onClick: () => goto(`task/${task._id}`)
		},
		{
			label: 'Edit',
			icon: AiOutlineEdit,
			className: 'mr-2 h-5 w-5',
			onClick: taskDialog.open
		},
		{
			label: 'Add Sub-Task',
			icon: IoAdd,
			className: 'mr-2 h-5 w-5',
			onClick: SubTaskDialog.open
		},
		{
			label: 'Duplicate',
			icon: IoDuplicate,
			className: 'mr-2 h-5 w-5',
			onClick: () => duplicateHandler()
		}
	];
</script>

<div>
	<div class="relative inline-block text-left">
		<button
			use:menu.button
			class="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-600"
		>
			<Icon src={BsThreeDots} />
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
				use:menu.items
				class="absolute p-4 right-0 mt-2 w-56 origin-top-right divide-y divide-stone-300 rounded-md bg-stone-100 shadow-lg ring-1 ring-black/5 focus:outline-none"
			>
				<div class="px-1 py-1 space-y-2">
					{#each items as el}
						<button
							use:menu.item
							onclick={el?.onClick}
							class="group flex w-full items-center rounded-md px-2 py-2 text-sm {(active =
								$menu.active === el.label)
								? 'bg-blue-500 text-white'
								: 'text-gray-900'}"
						>
							<Icon src={el.icon} className={el.className} />
							{el.label}
						</button>
					{/each}
				</div>

				<div class="px-1 py-1">
					<button
						use:menu.item
						onclick={confirmationDialog.open}
						class="group flex w-full items-center rounded-md px-2 py-2 text-sm {(active =
							$menu.active === 'Delete')
							? 'bg-blue-500 text-white'
							: 'text-red-900'}"
					>
						<Icon src={RiSystemDeleteBin6Line} className="mr-2 h-5 w-5 text-red-400" />
						Delete
					</button>
				</div>
			</div>
		</Transition>
	</div>
	<AddTask {task} dialog={taskDialog} />

	<AddSubTask id={task._id} dialog={SubTaskDialog} />

	<ConfirmationDialog msg={null} type={null} dialog={confirmationDialog} onClick={deleteHandler} />
</div>
