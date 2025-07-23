<script lang="ts">
	import { newDialog } from '$lib/store/store';
	import Transition from 'svelte-transition';

	let dialog: any;

	newDialog.subscribe((value) => {
		dialog = value;
	});
</script>

<div
	class="relative z-60 w-full"
	on:click={() => {
		dialog.close;
	}}
>
	<Transition show={$dialog.expanded}>
		<Transition
			enter="ease-out duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="ease-in duration-200"
			leaveFrom="opacity-100"
			leaveTo="opacity-0"
		>
			<div class="fixed inset-0 bg-black/60 transition-opacity"></div>
		</Transition>
		<div class="fixed inset-0 z-60 w-screen overflow-y-auto">
			<div class="flex h-full items-center justify-center p-4 text-center sm:p-0">
				<Transition
					enter="ease-out duration-300"
					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enterTo="opacity-100 translate-y-0 sm:scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 translate-y-0 sm:scale-100"
					leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				>
					<div
						use:dialog.modal
						class="w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all pb-0 sm:my-8 sm:w-full sm:max-w-lg"
					>
						<div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div class="sm:flex sm:items-start">
								<div class="w-full mt-3 sm:ml-4 sm:mt-0 sm:text-left">
									<slot />
								</div>
							</div>
						</div>
					</div>
				</Transition>
			</div>
		</div>
	</Transition>
</div>
