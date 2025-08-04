<script lang="ts">
	import { ICONS, PRIOTITYSTYLES } from '$lib';
	import Button from '$lib/components/Button.svelte';
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';
	import TaskColor from '$lib/components/TaskColor.svelte';
	import Title from '$lib/components/Title.svelte';
	import { createDialog } from 'svelte-headlessui';
	import { Icon } from 'svelte-icons-pack';
	import { RiSystemDeleteBin6Line } from 'svelte-icons-pack/ri';
	import { TrOutlineRestore } from 'svelte-icons-pack/tr';
	import { tasks } from '../../../assets/data';

	let type = $state('delete');
	let msg = $state('');
	let selected = $state(null);
	const dialog = $state(createDialog({}));

	const deleteAllClick = () => {
		type = 'deleteAll';
		msg = 'Do you want to permenantly delete all items?';
		dialog.open();
	};

	const restoreAllClick = () => {
		type = 'restoreAll';
		msg = 'Do you want to restore all items in the trash?';
		dialog.open();
	};

	const deleteClick = (id: any) => {
		type = 'delete';
		selected = id;
		msg = '';
		dialog.open();
	};

	const restoreClick = (id: any) => {
		selected = id;
		type = 'restore';
		msg = 'Do you want to restore the selected item?';
		dialog.open();
	};

	const deleteRestoreHandler = () => {};
</script>

<div class="w-full md:px-1 px-0 mb-6">
	<div class="flex items-center justify-between mb-8">
		<Title title={'Trashed Tasks'} />

		<div class="flex gap-2 md:gap-4 items-center">
			<Button
				label={'Restore All'}
				icon={TrOutlineRestore}
				iconClass={'text-lg hidden md:flex'}
				className={'flex flex-row-reverse gap-1 items-center bg-stone-200  text-stone-950 text-sm md:text-base rounded-md 2xl:py-2.5'}
				onClick={restoreAllClick}
			/>
			<Button
				label={'Delete All'}
				icon={RiSystemDeleteBin6Line}
				iconClass={'text-lg hidden md:flex'}
				className={'flex flex-row-reverse gap-1 items-center bg-stone-200 text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5'}
				onClick={deleteAllClick}
			/>
		</div>
	</div>
	<div class="bg-stone-200 px-2 md:px-6 py-4 shadow-md rounded">
		<div class="overflow-x-auto">
			<table class="w-full mb-5">
				<thead class="border-b border-stone-300">
					<tr class="text-black text-left">
						<th class="py-2">Task Title</th>
						<th class="py-2">Priority</th>
						<th class="py-2">Stage</th>
						<th class="py-2 line-clamp-1">Modified On</th>
					</tr>
				</thead>
				<tbody>
					{#each tasks as task}
						<tr class="border-b border-stone-200 text-stone-600 hover:bg-stone-400/10">
							<td class="py-2">
								<div class="flex items-center gap-2">
									<TaskColor {task} />
									<p class="w-full line-clamp-2 text-base text-black">
										{task?.title}
									</p>
								</div>
							</td>

							<td class="py-2 capitalize">
								<div class={'flex gap-1 items-center'}>
									<span class={'text-lg ' + PRIOTITYSTYLES[task?.priority]}>
										<Icon src={ICONS[task?.priority]} />
									</span>
									<span class="">{task?.priority}</span>
								</div>
							</td>

							<td class="py-2 capitalize text-center md:text-start">
								{task?.stage}
							</td>
							<td class="py-2 text-sm">{new Date(task?.date).toDateString()}</td>

							<td class="py-2 flex gap-1 justify-end">
								<Button
									icon={TrOutlineRestore}
									className={'text-xl text-stone-500'}
									onClick={() => restoreClick(task._id)}
								/>
								<Button
									icon={RiSystemDeleteBin6Line}
									className={'text-xl text-red-600'}
									onClick={() => deleteClick(task._id)}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<ConfirmationDialog {dialog} {msg} {type} onClick={deleteRestoreHandler} />
