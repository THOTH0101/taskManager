<script lang="ts">
	import { date, object, string } from 'yup';
	import Button from './Button.svelte';
	import ModalWrapper from './ModalWrapper.svelte';
	import Textbox from './Textbox.svelte';

	let { id, dialog } = $props();

	let formData = $state({
		title: '',
		tag: '',
		date: ''
	});
	let errors = $state({
		title: '',
		tag: '',
		date: ''
	});

	const formSchema = object({
		title: string().required('Title is required'),
		tag: string().required('Tag is required'),
		date: date().required('Date is required')
	});

	const validateForm = async () => {
		try {
			// Define the validation schema
			let { title, tag, date } = formData;

			await formSchema.validate({ title, tag, date }, { abortEarly: false });

			errors = { title: '', tag: '', date: '' };
			console.log('validating');
			return true;
		} catch (validationError: any) {
			// handle validation
			const updateErrors: any = { title: '', tag: '', date: '' };

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
</script>

<ModalWrapper {dialog}>
	<form onsubmit={handleSubmit}>
		<h2 class="text-base font-bold leading-6 text-stone-900 mb-4">ADD SUB-TASK</h2>
		<div class="mt-2 flex flex-col gap-6">
			<Textbox
				bind:errors
				placeholder={'Sub-Task title'}
				type={'text'}
				name={'title'}
				label={'Title'}
				className={'w-full rounded'}
				data={formData}
			/>

			<div class="flex items-center gap-4">
				<Textbox
					bind:errors
					placeholder={'Date'}
					type={'date'}
					name={'date'}
					label={'Task Date'}
					className={'w-full rounded'}
					data={formData}
				/>
				<Textbox
					bind:errors
					placeholder={'Tag'}
					type={'text'}
					name={'tag'}
					label={'Tag'}
					className={'w-full rounded'}
					data={formData}
				/>
			</div>
		</div>
		<div class="py-3 mt-4 flex sm:flex-row-reverse gap-4">
			<Button
				type={'submit'}
				className={'bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 sm:ml-3 sm:w-auto'}
				label={'Add Task'}
			/>

			<Button
				type={'button'}
				className={'bg-stone-100 border text-sm font-semibold text-gray-900 sm:w-auto'}
				label={'Cancel'}
				onClick={dialog.close}
			/>
		</div>
	</form>
</ModalWrapper>
