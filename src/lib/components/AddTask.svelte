<script lang="ts">
	import { LISTS, PRIORITY } from '$lib';
	import { Icon } from 'svelte-icons-pack';
	import { BiImages } from 'svelte-icons-pack/bi';
	import { date, object, string } from 'yup';
	import Button from './Button.svelte';
	import ModalWrapper from './ModalWrapper.svelte';
	import SelectList from './SelectList.svelte';
	import Textbox from './Textbox.svelte';
	import UserList from './UserList.svelte';

	const { dialog, task } = $props();

	let stage = $state(task?.stage?.toUpperCase() || LISTS[0]);
	let priority = $state(task?.priority?.toUpperCase() || PRIORITY[2]);
	let assets = $state([]);
	let uploading = $state(false);

	let formData = $state({
		title: '',
		date: ''
	});
	let errors = $state({
		title: '',
		date: ''
	});

	const formSchema = object({
		title: string().required('Title is required'),
		date: date().required('Date is required')
	});

	const validateForm = async () => {
		try {
			// Define the validation schema
			let { title, date } = formData;

			await formSchema.validate({ title, date }, { abortEarly: false });

			errors = { title: '', date: '' };
			return true;
		} catch (validationError: any) {
			// handle validation
			const updateErrors: any = { title: '', date: '' };

			validationError.inner.forEach((error: any) => {
				updateErrors[error.path] = error.message;
			});

			errors = updateErrors;

			return false;
		}
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const isValid = await validateForm();

		if (!isValid) {
			return;
		}
	};

	const handleSelect = (e: any) => {
		e.preventDefault();
		assets = e.target.files;
	};
</script>

<ModalWrapper {dialog}>
	<form onsubmit={handleSubmit}>
		<h2 class="text-base font-bold leading-6 text-stone-900 mb-4">
			{task ? 'UPDATE TASK' : 'ADD TASK'}
		</h2>

		<div class="mt-2 flex flex-col gap-6">
			<Textbox
				bind:errors
				placeholder={'Task Title'}
				type={'text'}
				name={'title'}
				label={'Task Title'}
				className={'w-full rounded'}
				data={formData}
			/>

			<UserList />

			<div class="flex gap-4">
				<SelectList bind:selected={stage} label={'Task Stage'} lists={LISTS} />

				<div class="w-full">
					<Textbox
						bind:errors
						placeholder={'Date'}
						type={'date'}
						name={'date'}
						label={'Task Date'}
						className={'w-full rounded'}
						data={formData}
					/>
				</div>
			</div>

			<div class="flex gap-4">
				<SelectList bind:selected={priority} label={'Priority Level'} lists={PRIORITY} />

				<div class="w-full flex items-center justify-center mt-4">
					<label
						class="flex items-center gap-1 text-base cursor-pointer my-4 text-ascent-1 hover:text-ascent-2"
						for="imgUpload"
					>
						<input
							id="imgUpLoad"
							onchange={handleSelect}
							accept=".jpg, .png, .jpeg"
							type="file"
							class="hidden"
							multiple={true}
						/>

						<Icon src={BiImages} />
						<span>Add Assets</span>
					</label>
				</div>
			</div>

			<div class="bg-stone-100 py-6 sm:flex sm:flex-row-reverse gap-4">
				{#if uploading}
					<span class="text-sm py-2 text-red-500">Uploading assets</span>
				{:else}
					<Button
						label={'Submit'}
						type={'submit'}
						className={'bg-blue-600 px-8 text-sm font-semibold text-stone-50 hover:bg-blue-700 sm:w-auto'}
					/>
					<Button
						label={'Cancel'}
						type={'button'}
						className={'bg-stone-100 px-5 text-sm font-semibold text-stone-900 sm:w-auto'}
						onClick={dialog.close}
					/>
				{/if}
			</div>
		</div>
	</form>
</ModalWrapper>
