<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { BsListTask, BsTrashFill } from 'svelte-icons-pack/bs';
	import { LuCircleCheckBig, LuLayoutDashboard, LuListTodo } from 'svelte-icons-pack/lu';
	import { RiUserFacesTeamFill } from 'svelte-icons-pack/ri';
	import { TrOutlineProgressCheck } from 'svelte-icons-pack/tr';

	const links = [
		{
			label: 'Dashboard',
			icon_src: LuLayoutDashboard,
			path: `/userid/dashboard`
		},
		{
			label: 'Tasks',
			icon_src: BsListTask,
			path: `/userid/tasks`
		},
		{
			label: 'Completed',
			icon_src: LuCircleCheckBig,
			path: `/userid/completed`
		},
		{
			label: 'In Progress',
			icon_src: TrOutlineProgressCheck,
			path: `/userid/in-progress`
		},
		{
			label: 'To Do',
			icon_src: LuListTodo,
			path: `/userid/to-do`
		},
		{
			label: 'Team',
			icon_src: RiUserFacesTeamFill,
			path: `/userid/team`
		},
		{
			label: 'Trash',
			icon_src: BsTrashFill,
			path: `/userid/trash`
		}
	];
</script>

<div>
	<div>
		<Sidebar {links} />

		<div class="min-h-screen lg:ml-[20%] flex flex-col">
			<Navbar />
			<div class="flex flex-1">
				<div class="bg-stone-100 flex-1 p-6">
					<slot />
				</div>
			</div>
		</div>
	</div>
</div>
