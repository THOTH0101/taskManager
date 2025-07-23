<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import { RiSystemAddFill } from 'svelte-icons-pack/ri';

	export let label, className;
</script>

<div
	class="w-full h-10 md:h-12 px-2 md:px-4 rounded bg-stone-200 flex items-center justify-between"
>
	<div class="flex gap-2 items-center">
		<div class={'w-4 h-4 rounded-full ' + className} />
		<p class="text-sm md:text-base text-stone-600">{label}</p>
	</div>

	<button class="hidden md:block">
		<Icon src={RiSystemAddFill} className="text-lg text-stone-950" />
	</button>
</div>
