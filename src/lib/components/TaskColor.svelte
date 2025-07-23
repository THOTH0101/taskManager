<script>
	import { TASK_TYPE } from '$lib';

	export let task;
</script>

<div class={'w-4 h-4 rounded-full ' + TASK_TYPE[task.stage]}></div>
