<script lang="ts">
	import Tasks from '$lib/components/Tasks.svelte';
	import { tasks } from '../../../assets/data';

	const completedTasks = tasks.filter((task) => task.stage === 'completed');
</script>

<Tasks tasks={completedTasks} />
