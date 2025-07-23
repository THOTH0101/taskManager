<script lang="ts">
	import { BGS, formatDate, ICONS, PRIOTITYSTYLES } from '$lib';
	import { Icon } from 'svelte-icons-pack';
	import { BiMessageAltDetail } from 'svelte-icons-pack/bi';
	import { FaSolidList } from 'svelte-icons-pack/fa';
	import { RiBusinessAttachmentLine } from 'svelte-icons-pack/ri';
	import Button from './Button.svelte';
	import TaskColor from './TaskColor.svelte';
	import UserInfo from './UserInfo.svelte';

	export let task;

	const deleteClicks = (id: any) => {
		console.log('am clicked');
	};
</script>

<tr class="border-b border-stone-300 text-stone-600 hover:bg-stone-300/10">
	<td class="py-2">
		<div class="flex items-center gap-2">
			<TaskColor {task} />
			<p class="w-full line-clamp-2 text-base text-stone-950">{task?.title}</p>
		</div>
	</td>

	<td class="py-2">
		<div class="flex gap-1 items-center">
			<span class={'text-lg ' + PRIOTITYSTYLES[task?.priority]}
				><Icon src={ICONS[task?.priority]} /></span
			>
			<span class="capitalize line-clamp-1">{task?.priority} Priority</span>
		</div>
	</td>

	<td class="py-2">
		<span class="text-sm text-stone-600">{formatDate(new Date(task?.date))}</span>
	</td>

	<td class="py-2">
		<div class="flex items-center gap-3">
			<div class="flex gap-1 items-center text-sm text-stone-600">
				<Icon src={BiMessageAltDetail} />
				<span>{task?.activities?.length}</span>
			</div>
			<div class="flex gap-1 items-center text-sm text-stone-600">
				<Icon src={RiBusinessAttachmentLine} />
				<span>{task?.assets?.length}</span>
			</div>
			<div class="flex gap-1 items-center text-sm text-stone-600">
				<Icon src={FaSolidList} />
				<span>0/{task?.subTasks?.length}</span>
			</div>
		</div>
	</td>

	<td class="py-2">
		<div class="flex">
			{#each task?.team as m, index}
				<div
					class={'w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1 ' +
						BGS[index % BGS?.length]}
				>
					<UserInfo user={m} />
				</div>
			{/each}
		</div>
	</td>

	<td class="py-2 flex gap-2 md:gap-4 justify-end">
		<Button
			props={{
				label: 'Edit',
				className: 'text-blue-600 hover:text-blue-600 sm:px-0 text-sm md:text-base',
				type: 'button'
			}}
		/>
		<Button
			props={{
				label: 'Delete',
				className: 'text-red-700 hover:text-red-500 sn-px-0 text-sm md:text-base',
				type: 'button',
				onClick: deleteClicks
			}}
		/>
	</td>
</tr>
