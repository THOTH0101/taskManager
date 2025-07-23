<script lang="ts">
	import { BGS, ICONS, PRIOTITYSTYLES } from '$lib';
	import moment from 'moment';
	import { Icon } from 'svelte-icons-pack';
	import TaskColor from './TaskColor.svelte';
	import UserInfo from './UserInfo.svelte';
	export let tasks;
</script>

<div class="w-full md:w-2/3 bg-stone-200 px-2 md:px-4 pt-4 pb-4 shadow-md rounded">
	<table class="w-full">
		<thead class="border-b border-stone-300">
			<tr class="text-black text-left">
				<th class="py-2">Task Title</th>
				<th class="py-2">Priority</th>
				<th class="py-2">Team</th>
				<th class="py-2 hidden md:block">Created At</th>
			</tr>
		</thead>
		<tbody>
			{#each tasks as task}
				<tr class="border-b border-stone-300 text-stone-600 hover:bg-stone-300/10">
					<td class="py-2">
						<div class="flex items-center gap-2">
							<TaskColor {task} />
							<p class="text-base text-black">{task.title}</p>
						</div>
					</td>
					<td class="py-2">
						<div class="flex gap-1 items-center">
							<span class={'text-lg ' + PRIOTITYSTYLES[task.priority]}
								><Icon src={ICONS[task.priority]} size={24} /></span
							>
							<span class="capitalise">{task.priority}</span>
						</div>
					</td>
					<td class="py-2">
						<div class="flex">
							{#each task.team as m, index}
								<div
									class={'w-7 h-7 rounded-full text-stone-50 flex items-center justify-center text-sm -mr-1 ' +
										BGS[index % BGS.length]}
								>
									<UserInfo user={m} />
								</div>
							{/each}
						</div>
					</td>
					<td>
						<span>{moment(task.date).fromNow()}</span>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
