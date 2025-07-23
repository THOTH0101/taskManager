<script lang="ts">
	import Tasks from '$lib/components/Tasks.svelte';
	import { tasks } from '../../../assets/data';

	const inProgressTasks = tasks.filter((task) => task.stage === 'in progress');
</script>

<Tasks tasks={inProgressTasks} />
