<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import { FaSolidQuestion } from 'svelte-icons-pack/fa';
	import ModalWrapper from './ModalWrapper.svelte';

	let { dialog, msg, type, onClick } = $props();
</script>

<ModalWrapper {dialog}>
	<div class="py-4 w-full flex flex-col gap-4 items-center justify-center">
		<h3>
			<p
				class="p-3 rounded-full {type === 'restore' || type === 'restoreAll'
					? 'text-yellow-600 bg-yellow-100'
					: 'text-red-600 bg-red-200'}"
			>
				<Icon src={FaSolidQuestion} size={60} />
			</p>
		</h3>

		<p class="text-center text-stone-500">
			{msg ? msg : 'Are you sure you want to delete the selected record?'}
		</p>

		<div class="bg-stone-200 py-3 sm:flex sm:flex-row-reverse gap-4">
			<button
				type="button"
				class="py-1 outline-none cursor-pointer px-8 text-sm font-semibold text-stone-100 sm:w-auto {type ===
					'restore' || type === 'restoreAll'
					? 'bg-yellow-600'
					: 'bg-red-600 hover:bg-red-500'}"
				onclick={onClick}
			>
				{type === 'restore' ? 'Restore' : 'Delete'}
			</button>

			<button
				type="button"
				class="py-1 outline-none cursor-pointer bg-stone-100 px-8 text-sm font-semibold text-gray-900 sm:w-auto border"
				onclick={dialog.close}
			>
				Cancel
			</button>
		</div>
	</div>
</ModalWrapper>
