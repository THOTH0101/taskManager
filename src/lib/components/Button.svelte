<script lang="ts">
	import { Icon } from 'svelte-icons-pack';

	let {
		icon = null,
		type = null,
		label = '',
		className = '',
		iconClass = '',
		onClick = null
	} = $props();
</script>

<button
	type={type || 'button'}
	class="px-3 py-1 outline-none cursor-pointer {className}"
	onclick={onClick}
>
	{#if label}
		<span>{label}</span>
	{/if}
	{#if icon}
		<Icon src={icon} className={iconClass} size="24" />
	{/if}
</button>
