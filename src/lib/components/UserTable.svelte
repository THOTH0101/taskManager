<script lang="ts">
	import moment from 'moment';
	import { getInitials } from '$lib';

	export let users;
</script>

<div class="w-full md:w-1/3 bg-stone-200 h-fit px-2 md:px-6 py-4 shadow-md rounded">
	<table class="w-full mb-5">
		<thead class="border-b border-stone-300">
			<tr class="text-black text-left">
				<th class="py-2">Full Name</th>
				<th class="py-2">Status</th>
				<th class="py-2 hidden md:block">Created At</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user}
				<tr class="border-b border-stone-200 text-stone-600 hover:bg-stone-400/10">
					<td class="py-2">
						<div class="flex items-center gap-3">
							<div
								class="w-9 h-9 rounded-full text-stone-50 flex items-center justify-center text-sm bg-violet-700"
							>
								<span class="text-center">{getInitials(user?.name)}</span>
							</div>
							<div>
								<p>{user.name}</p>
								<span class="text-sm text-stone-950">{user?.name}</span>
							</div>
						</div>
					</td>
					<td>
						<p
							class={'rounded-full px-3 py-1 w-fit text-sm ' +
								(user?.isActive ? 'bg-blue-400' : 'bg-yellow-100')}
						>
							{user.isActive ? 'Active' : 'Disabled'}
						</p>
					</td>
					<td class="py-2 text-sm">{moment(user?.createdAt).fromNow()}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
