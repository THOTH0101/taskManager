<script lang="ts">
	import Tasks from '$lib/components/Tasks.svelte';
	import { tasks } from '../../../assets/data';

	const todoTasks = tasks.filter((task) => task.stage === 'todo');
</script>

<Tasks tasks={todoTasks} />
