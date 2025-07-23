<script lang="ts">
	import TaskCard from './TaskCard.svelte';

	export let tasks;
</script>

<div class="w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10">
	{#each tasks as task}
		<TaskCard {task} />
	{/each}
</div>
