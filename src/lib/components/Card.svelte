<script lang="ts">
	import { Icon } from 'svelte-icons-pack';

	export let icon, bg, label, total;
</script>

<div class="w-full h-32 p-5 bg-stone-200 shadow-md rounded-md flex items-center justify-between">
	<div class="h-full flex flex-1 flex-col justify-between">
		<p class="text-base text-stone-600">{label}</p>
		<span class="text-2xl font-semibold">{total}</span>
		<span class="text-sm text-stone-400">{'110 last month'}</span>
	</div>

	<div class="flex items-center justify-center w-10 h-10 rounded-full text-stone-50 {bg}">
		<Icon src={icon} />
	</div>
</div>
