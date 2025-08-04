<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import ModalWrapper from './ModalWrapper.svelte';
	import { FaSolidQuestion } from 'svelte-icons-pack/fa';
	import Button from './Button.svelte';

	const { dialog, onClick } = $props();
</script>

<div>
	<ModalWrapper {dialog}>
		<div class="py-4 w-full flex flex-col gap-4 items-center justify-center">
			<h3 class="">
				<p class="p-3 rounded-full text-red-600 bg-red-200">
					<Icon src={FaSolidQuestion} size={60} />
				</p>
			</h3>

			<p class="text-center text-stone-500">
				{'Are you sure you want to activate or deactive this account?'}
			</p>

			<div class="bg-stone-200 py-3 sm:flex sm:flex-row-reverse gap-4">
				<Button
					type={'button'}
					className={'px-8 text-sm font-semibold text-white sm:w-auto bg-red-600 hover:bg-red-500'}
					{onClick}
					label={'Yes'}
				/>

				<Button
					type={'button'}
					className={'bg-stone-100 px-8 text-sm font-semibold text-stone-900 sm:w-auto border'}
					onClick={dialog.close}
					label={'No'}
				/>
			</div>
		</div>
	</ModalWrapper>
</div>
