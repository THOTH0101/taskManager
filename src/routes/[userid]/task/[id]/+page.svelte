<script lang="ts">
	import { page } from '$app/state';
	import { getInitials, ICONS, PRIOTITYSTYLES } from '$lib';
	import Button from '$lib/components/Button.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import TaskColor from '$lib/components/TaskColor.svelte';
	import moment from 'moment';
	import { Icon } from 'svelte-icons-pack';
	import { BiCheckDouble } from 'svelte-icons-pack/bi';
	import { FaSolidBug, FaThumbsUp, FaUser } from 'svelte-icons-pack/fa';
	import { LuActivity, LuCircleCheckBig } from 'svelte-icons-pack/lu';
	import { OiTasklist16 } from 'svelte-icons-pack/oi';
	import { RiSystemLoader2Fill } from 'svelte-icons-pack/ri';
	import { TrOutlineMessage } from 'svelte-icons-pack/tr';
	import { tasks } from '../../../../assets/data';

	const bgColor: any = {
		high: 'bg-red-200',
		medium: 'bg-yellow-200',
		low: 'bg-blue-200'
	};

	const TASKTYPEICON: any = {
		commented: {
			className:
				'w-10 h-10 rounded-full bg-stone-500 flex items-center justify-center text-stone-50',
			icon: TrOutlineMessage
		},
		started: {
			className:
				'w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-stone-50',
			icon: FaThumbsUp,
			size: '20'
		},
		assigned: {
			className: 'w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-stone-50',
			icon: FaUser,
			size: '14'
		},
		bug: {
			className: 'text-red-600',
			icon: FaSolidBug,
			size: '24'
		},
		completed: {
			className:
				'w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-stone-50 ',
			icon: BiCheckDouble,
			size: '24'
		},
		'in progress': {
			className:
				'w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-stone-50',
			icon: RiSystemLoader2Fill,
			size: '16'
		}
	};

	const act_types = ['Started', 'Completed', 'In Progress', 'Commented', 'Bug', 'Assigned'];

	const TABS = [
		{ title: 'Task Detail', icon: OiTasklist16 },
		{ title: 'Activities/Timeline', icon: LuActivity }
	];

	const { id } = page.params;
	const task = tasks[3];
	let isLoading = $state(false);
	let selectedTab = $state(0);
	let selectedAction = $state(act_types[0]);

	console.log(id);
</script>

<div class="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
	<h1 class="text-2xl text-stone-600 font-bold">{task?.title}</h1>

	<Tabs bind:selectedTab tabs={TABS}>
		{#snippet tabContent()}
			{#if selectedTab === 0}
				<div
					class="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-stone-200 rounded-md shadow-md p-8 overflow-y-auto"
				>
					<div class="w-full md:w-1/2 space-y-8">
						<!-- RIGHT -->
						<div class="flex items-center gap-5">
							<div
								class={`flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full  ${PRIOTITYSTYLES[task?.priority]} ${bgColor[task?.priority]}`}
							>
								<span class="text-lg"><Icon src={ICONS[task?.priority]} /></span>
								<span class="uppercase">{task?.priority} priority</span>
							</div>

							<div class="flex items-center gap-2">
								<TaskColor {task} />
								<span class="text-stone-950 uppercase">{task?.stage}</span>
							</div>
						</div>

						<p class="text-stone-500">Created At: {new Date(task?.date).toDateString()}</p>

						<div class="flex items-center gap-8 p-4 border-y border-stone-300">
							<div class="space-x-2">
								<span class="font-semibold">Assets :</span>
								<span>{task?.assets?.length}</span>
							</div>
							<span class="text-stone-400">|</span>
							<div class="space-x-2">
								<span class="font-semibold">Sub-Task :</span>
								<span>{task?.subTasks?.length}</span>
							</div>
						</div>

						<div class="space-y-4 py-6">
							<p class="text-stone-600 font-semibold text-sm uppercase">Task Team</p>
							<div class="space-y-3">
								{#each task?.team as m}
									<div class="flex gap-4 py-2 items-center border-t border-stone-300">
										<div
											class="w-10 h-10 rounded-full text-stone-100 flex items-center justify-center text-sm -mr-1 bg-blue-600"
										>
											<span class="text-center">{getInitials(m?.name)}</span>
										</div>

										<div>
											<p class="text-lg font-semibold">{m?.name}</p>
											<span class="text-stone-500">{m?.title}</span>
										</div>
									</div>
								{/each}
							</div>
						</div>
						<div class="space-y-4 py-6">
							<p class="text-stone-500 font-semibold text-sm">SUB-TASKS</p>
							<div class="space-y-8">
								{#each task?.subTasks as el}
									<div class="flex gap-3">
										<div
											class="w-10 h-10 flex items-center justify-center rounded-full bg-violet-50-200 text-violet-600"
										>
											<Icon src={LuCircleCheckBig} size={26} />
										</div>

										<div class="space-y-1">
											<div class="flex gap-2 items-center">
												<span class="text-sm text-stone-500"
													>{new Date(el?.date).toDateString()}</span
												>
												<span
													class="px-2 py-0.5 text-center text-sm rounded-full bg-violet-100 text-violet-700 font-semibold"
													>{el?.tag}</span
												>
											</div>

											<p class="text-stone-700">{el?.title}</p>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
					<!-- RIGHT ENDS -->
					<!-- LEFT -->
					<div class="w-full md:w-1/2 space-y-8">
						<p class="text-lg font-semibold">ASSETS</p>

						<div class="w-full grid grid-cols-2 gap-4">
							{#each task?.assets as el}
								<img
									class="w-full rounded h-28 md:h-36 2xl:h-52 cursor-pointer transition-all duration-700 hover:scale-125 hover:z-50"
									src={el}
									alt={task?.title}
								/>
							{/each}
						</div>
					</div>
					<!-- LEFT ENDS -->
				</div>
			{:else}
				<div
					class="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-stone-200 shadow rounded-md justify-between overflow-y-auto"
				>
					<div class="w-full md:w-1/2">
						<h4 class="text-stone-600 font-semibold text-lg mb-5">Activities</h4>
						<div class="w-full">
							{#each task?.activities as el, index}
								<div class="flex space-x-4">
									<div class="flex flex-col items-center flex-shrink-0">
										<div class="w-10 h-10 flex items-center justify-center">
											<div class={TASKTYPEICON[el?.type].className}>
												<Icon
													src={TASKTYPEICON[el?.type].icon}
													size={TASKTYPEICON[el?.type].size}
												/>
											</div>
										</div>
										<div class="w-full flex items-center">
											<div class="w-0.5 bg-stone-500 h-full"></div>
										</div>
									</div>

									<div class="flex flex-col gap-y-1 mb-8">
										<p class="font-semibold">{el?.by?.name}</p>
										<div class="text-stone-500 space-y-2">
											<span class="capitalize">{el?.type}</span>
											<span class="text-sm">{moment(el?.date).fromNow()}</span>
										</div>
										<div class="text-stone-700">{el?.activity}</div>
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="w-full md:w-1/3">
						<h4 class="text-stone-600 font-semibold text-lg mb-5">Add Activity</h4>
						<div class="w-full flex flex-wrap gap-5">
							{#each act_types as item}
								<div class="flex gap-2 items-center">
									<input
										type="checkbox"
										class="w-4 h-4"
										checked={selectedAction === item ? true : false}
										onclick={() => {
											selectedAction = item;
										}}
									/>
									<p>{item}</p>
								</div>
							{/each}
							<textarea
								rows={10}
								value="Text"
								placeholder="Type......"
								class="bg-stone-100 w-full mt-10 border border-stone-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"
							></textarea>

							{#if isLoading}
								<!-- <loading/> -->
							{:else}
								<Button
									type={'button'}
									label={'Submit'}
									className={'bg-blue-600 text-white rounded'}
								/>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		{/snippet}
	</Tabs>
</div>
