<script lang="ts">
	import { object, string } from 'yup';
	import Button from './Button.svelte';
	import Loader from './Loader.svelte';
	import ModalWrapper from './ModalWrapper.svelte';
	import Textbox from './Textbox.svelte';

	const { dialog, userData } = $props();

	const formSchema = object({
		name: string().required('Name is reaquired'),
		title: string().required('Title is required'),
		email: string().email('Invalid email format').required('Email is required'),
		role: string().required('Role is required')
	});

	let formData = $state({ name: '', title: '', email: '', role: '' });
	let errors = $state({ name: '', title: '', email: '', role: '' });

	let isLoading = $state(false);
	let isUpdating = $state(false);

	const validateForm = async () => {
		try {
			// Define the validation schema
			let { name, title, email, role } = formData;

			await formSchema.validate({ name, title, email, role }, { abortEarly: false });

			errors = { name: '', title: '', email: '', role: '' };
			return true;
		} catch (validationError: any) {
			// Handle validation error
			const updateErrors: any = { name: '', title: '', email: '', role: '' };

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

<div>
	<ModalWrapper {dialog}>
		<form onsubmit={handleSubmit}>
			<h2 class="text-base font-bold leading-6 text-stone-900 mb-4">
				{userData ? 'UPDATE PROFILE' : 'ADD NEW USER'}
			</h2>
			<div class="mt-2 flex flex-col gap-6">
				<Textbox
					bind:errors
					placeholder={'Full name'}
					type={'text'}
					name={'name'}
					label={'Full Name'}
					className={'w-full rounded'}
					data={formData}
				/>
				<Textbox
					bind:errors
					placeholder={'Title'}
					type={'text'}
					name={'title'}
					label={'Title'}
					className={'w-full rounded'}
					data={formData}
				/>
				<Textbox
					bind:errors
					placeholder={'Email Address'}
					type={'email'}
					name={'email'}
					label={'Email Address'}
					className={'w-full rounded'}
					data={formData}
				/>

				<Textbox
					bind:errors
					placeholder={'Role'}
					type={'text'}
					name={'role'}
					label={'Role'}
					className={'w-full rounded'}
					data={formData}
				/>
			</div>

			{#if isLoading || isUpdating}
				<div class="py-5">
					<Loader />
				</div>
			{:else}
				<div class="py-3 mt-4 sm:flex sm:flex-row-reverse gap-4">
					<Button
						type={'submit'}
						className={'bg-blue-600 px-8 text-sm font-semibold text-stone-50 hover:bg-blue-700  sm:w-auto'}
						label={'Submit'}
					/>

					<Button
						type={'button'}
						className={'bg-stone-100 px-5 text-sm font-semibold text-stone-900 sm:w-auto'}
						onClick={dialog.close}
						label={'Cancel'}
					/>
				</div>
			{/if}
		</form>
	</ModalWrapper>
</div>
