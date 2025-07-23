<script lang="ts">
	import BoardView from '$lib/components/BoardView.svelte';
	import Button from '$lib/components/Button.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Table from '$lib/components/Table.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import TaskTitle from '$lib/components/TaskTitle.svelte';
	import Title from '$lib/components/Title.svelte';
	import { isLoading, newDialog, selected } from '$lib/store/store';
	import { FaSolidList } from 'svelte-icons-pack/fa';
	import { RiDesignLayoutGrid2Fill, RiSystemAddFill } from 'svelte-icons-pack/ri';
	import { TASK_TYPE } from '$lib';
	import AddTask from './AddTask.svelte';

	export let tasks;

	const status = ''; //params?.status || '';
	let selectedTab = 0;
	let dialog: any;

	const TABS = [
		{ title: 'Board View', icon: RiDesignLayoutGrid2Fill },
		{ title: 'List View', icon: FaSolidList }
	];

	let loading = false;

	isLoading.subscribe((value) => {
		loading = value;
	});

	selected.subscribe((value) => {
		selectedTab = value;
	});

	newDialog.subscribe((value) => {
		dialog = value;
	});
</script>

{#if loading}
	<div class="py-10">
		<Loader />
	</div>
{:else}
	<div class="w-full">
		<div class="flex items-center justify-between mb-4">
			<Title props={{ title: `${status ? `${status} Tasks` : 'Tasks'}` }} />

			{#if !status}
				<Button
					props={{
						label: 'Create Task',
						className:
							'flex flex-row-reverse gap-1 text-stone-50 items-center bg-blue-600 rounded-md py-2 2xl:py-2.5',
						icon: RiSystemAddFill,
						iconClass: 'text-lg',
						onClick: dialog.open
					}}
				/>
			{/if}
		</div>

		<div>
			<Tabs tabs={TABS}>
				{#if !status}
					<div class="w-full flex justify-between gap-4 md:gap-x-12 py-4">
						<TaskTitle label={'To Do'} className={TASK_TYPE.todo} />
						<TaskTitle label={'In Progress'} className={TASK_TYPE['in progress']} />
						<TaskTitle label={'Completed'} className={TASK_TYPE.completed} />
					</div>
				{/if}
				{#if selectedTab === 0}
					<BoardView {tasks} />
				{:else}
					<Table {tasks} />
				{/if}
			</Tabs>

			<AddTask />
		</div>
	</div>
{/if}
