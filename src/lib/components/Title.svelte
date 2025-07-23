<script lang="ts">
	export let props;

	const { title, className } = props;
</script>

<h2 class={'text-2xl font-semibold capitalize ' + className}>{title}</h2>
