<script lang="ts">
	export let props;
	let { placeholder, type, name, label, className, data } = props;
</script>

{#if label}
	<label for={name} class="text-stone-800">{label}</label>
{/if}
<div>
	<input
		bind:value={data[name]}
		{type}
		{name}
		{placeholder}
		class={'bg-transparent px-2 py-0.5 2xl:py-1 border border-stone-300 placeholder-stone-400 outline-none text-base focus:ring-2 ring-blue-300 ' +
			className}
	/>
</div>
