<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
</script>

<main>
	<Toaster richColors />
	<div>
		<slot />
	</div>
</main>
