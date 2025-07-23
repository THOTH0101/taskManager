<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Title from '$lib/components/Title.svelte';
	import { RiSystemAddFill } from 'svelte-icons-pack/ri';
	import { summary } from '../../../assets/data';
	import { getInitials } from '$lib';

	let isSelect = 0;
</script>

<div class="w-full md:px-1 px-0 mb-6">
	<div class="flex items-center justify-between mb-8">
		<Title props={{ title: 'Team Members' }} />

		<Button
			props={{
				label: 'Add New User',
				icon: RiSystemAddFill,
				className:
					'flex flex-row-reverse gap-1 items-center bg-blue-600 rounded-md text-stone-50 2xl:py-2.5'
			}}
		/>
	</div>

	<div class="bg-stone-200 px-2 md:px-4 py-4 shadow-md rounded">
		<div class="overflow-x-auto">
			<table class="w-full mb-5">
				<thead class="border-b border-stone-300">
					<tr class="text-stone-950 text-left">
						<th class="py-2">Full Name</th>
						<th class="py-2">Title</th>
						<th class="py-2">Email</th>
						<th class="py-2">Role</th>
						<th class="py-2">Active</th>
					</tr>
				</thead>
				<tbody>
					{#each summary.users as user}
						<tr class="border-b border-stone-200 text-stone-600 hover:bg-stone-400/10"
							><td class="p-2">
								<div class="flex items-center gap-3">
									<div
										class="w-9 h-9 rounded-full text-stone-50 flex items-center justify-center text-sm bg-blue-700"
									>
										<span class="text-xs md:text-sm text-center">{getInitials(user.name)}</span>
									</div>
								</div>
							</td>

							<td class="p-2">{user.title}</td>
							<td class="p-2">{user.email || 'user.emal.com'}</td>
							<td class="p-2">{user.role}</td>

							<td>
								<button
									class={'w-fit px-4 py-1 rounded-full ' +
										(user?.isActive ? 'bg-blue-200' : 'bg-yellow-100')}
								>
									{user?.isActive ? 'Active' : 'Disabled'}
								</button>
							</td>

							<td class="p-2 flex gap-4 justify-end">
								<Button
									props={{
										className: 'text-blue-600 hover:text-blue-500 font-semibold sm:px-0',
										label: 'Edit',
										type: 'button'
									}}
								/>

								<Button
									props={{
										className: 'text-red-700 hover:text-red-500 font-semibold sm:px-0',
										label: 'Delete',
										type: 'button'
									}}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
