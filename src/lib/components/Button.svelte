<script lang="ts">
	import { Icon } from 'svelte-icons-pack';

	export let props;
	let { icon, type, label, className, iconClass, onClick } = props;
</script>

<button
	type={type || 'button'}
	class={'px-3 py-1 outline-none cursor-pointer ' + className}
	on:click={onClick}
>
	{#if label}
		<span>{label}</span>
	{/if}
	{#if icon}
		<Icon src={icon} className={iconClass} size="24" />
	{/if}
</button>
