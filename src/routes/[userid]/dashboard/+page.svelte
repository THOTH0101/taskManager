<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { FaCircleCheck, FaNewspaper, FaSolidArrowsToDot } from 'svelte-icons-pack/fa';
	import { RiSystemProgress5Line } from 'svelte-icons-pack/ri';
	import { summary } from '../../../assets/data';
	import Chart from '$lib/components/Chart.svelte';
	import TaskTable from '$lib/components/TaskTable.svelte';
	import UserTable from '$lib/components/UserTable.svelte';

	const totals = summary.tasks;

	const stats = [
		{
			_id: '1',
			label: 'TOTAL TASKS',
			total: summary.totalTasks || 0,
			icon: FaNewspaper,
			bg: 'bg-[#1d4ed8]'
		},
		{
			_id: '2',
			label: 'COMPLETED TASKS',
			total: totals['completed'] || 0,
			icon: FaCircleCheck,
			bg: 'bg-[#0f766e]'
		},
		{
			_id: '3',
			label: 'TASKS IN PROGRESS',
			total: totals['in progress'] || 0,
			icon: RiSystemProgress5Line,
			bg: 'bg-[#f59e0b]'
		},
		{
			_id: '4',
			label: 'TODOS',
			total: totals['todo'] || 0,
			icon: FaSolidArrowsToDot,
			bg: 'bg-[#be185d]'
		}
	];
</script>

<div class="h-full py-4">
	<div class="grid grid-cols-1 md:grid-cols-4 gap-5">
		{#each stats as { icon, bg, label, total }}
			<Card {icon} {bg} {label} {total} />
		{/each}
	</div>

	<div class="w-full bg-stone-200 my-16 p-4 rounded shadow-sm">
		<h4 class="text-xl text-stone-600 font-semibold">Chart by Priority</h4>
		<Chart />
	</div>

	<div class="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
		<!-- left -->
		<TaskTable tasks={summary.last10Task} />
		<!-- right -->
		<UserTable users={summary.users} />
	</div>
</div>
