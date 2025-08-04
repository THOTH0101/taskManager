<script lang="ts">
	import TableRow from './TableRow.svelte';

	export let tasks;
</script>

<div class="bg-stone-200 px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead class="w-full border-b border-stone-300">
				<tr class="w-full text-stone-950 text-left">
					<th class="py-2">Task Title</th>
					<th class="py-2">Priority</th>
					<th class="py-2 line-clamp-1">Created At</th>
					<th class="py-2">Assets</th>
					<th class="py-2">Team</th>
				</tr>
			</thead>
			<tbody>
				{#each tasks as task}
					<TableRow {task} />
				{/each}
			</tbody>
		</table>
	</div>
</div>
