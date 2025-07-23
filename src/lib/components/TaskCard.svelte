<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import { BiMessageAltDetail } from 'svelte-icons-pack/bi';
	import { FaSolidList } from 'svelte-icons-pack/fa';
	import { IoAdd } from 'svelte-icons-pack/io';
	import { RiBusinessAttachmentLine } from 'svelte-icons-pack/ri';
	import { user } from '../../assets/data';
	import { BGS, formatDate, ICONS, PRIOTITYSTYLES } from '$lib';
	import TaskColor from './TaskColor.svelte';
	import TaskDialog from './TaskDialog.svelte';
	import UserInfo from './UserInfo.svelte';

	export let task;
</script>

<div class="w-full h-fit bg-stone-200 shadow-md p-4 rounded">
	<div class="w-full flex justify-between">
		<div
			class={'flex flex-1 gap-1 items-center text-sm font-medium ' + PRIOTITYSTYLES[task?.priority]}
		>
			<span class="text-lg"><Icon src={ICONS[task?.priority]} /></span>
			<span class="uppercase">{task?.priority} Priority</span>
		</div>
		{#if user?.isAdmin}
			<TaskDialog {task} />
		{/if}
	</div>

	<div class="flex items-center gap-2">
		<TaskColor {task} />
		<h4 class="line-clamp-1 text-stone-950">{task?.title}</h4>
	</div>
	<span class="text-sm text-stone-600">{formatDate(new Date(task?.date))}</span>
	<div class="w-full border-t border-stone-300 my-2"></div>
	<div class="flex items-center justify-between mb-2">
		<div class="flex items-center gap-3">
			<div class="flex gap-1 items-center text-stone-600">
				<Icon src={BiMessageAltDetail} />
				<span>{task?.activities?.length}</span>
			</div>
			<div class="flex gap-1 items-center text-stone-600">
				<Icon src={RiBusinessAttachmentLine} />
				<span>{task?.assets?.length}</span>
			</div>
			<div class="flex gap-1 items-center text-stone-600">
				<Icon src={FaSolidList} />
				<span>0/{task?.subTasks?.length}</span>
			</div>
		</div>

		<div class="flex flex-row-reverse">
			{#each task.team as m, index}
				<div
					class={'w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 ' +
						BGS[index % BGS?.length]}
				>
					<UserInfo user={m} />
				</div>
			{/each}
		</div>
	</div>

	{#if task?.subTasks?.length > 0}
		<div class="py-4 border-t border-stone-200">
			<h5 class="text-base line-clamp-1 text-stone-950">{task?.subTasks[0]?.title}</h5>

			<div class="p-4 space-x-8">
				<span class="text-sm text-stone-600">{formatDate(new Date(task?.subTasks[0]?.date))}</span>
				<span class="bg-blue-600/10 px-3 py-1 rounded-full text-blue-700 font-medium"
					>{task?.subTasks[0]?.tag}</span
				>
			</div>
		</div>
	{:else}
		<div class="py-4 border-t border-stone-300">
			<span class="text-stone-500">No Sub Task</span>
		</div>
	{/if}

	<div class="w-full pb-2">
		<button
			class="w-full flex gap-4 items-center text-sm text-stone-500 font-semibold disabled:cursor-not-allowed disabled:text-stone-300"
		>
			<Icon src={IoAdd} className="text-lg" />
			<span>ADD SUBTASK</span>
		</button>
	</div>
	<!-- <AddSubTask id={task._id}/> -->
</div>
