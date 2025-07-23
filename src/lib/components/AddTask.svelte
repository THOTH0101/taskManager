<script lang="ts">
	import { object, string } from 'yup';
	import ModalWrapper from './ModalWrapper.svelte';
	import Textbox from './Textbox.svelte';
	import UserList from './UserList.svelte';

	const task = '';

	let formData = {
		title: ''
	};
	let errors: any = {
		title: ''
	};

	const formSchema = object({
		title: string().required('Title is required')
	});

	const validateForm = async () => {
		try {
			// Define the validation schema
			let { title } = formData;

			await formSchema.validate({ title }, { abortEarly: false });

			errors = { title: '' };
			return true;
		} catch (validationError: any) {
			// handle validation
			errors = { title: '' };

			validationError.inner.forEach((error: any) => {
				errors[error.path] = error.message;
			});

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

<ModalWrapper>
	<form on:submit={handleSubmit}>
		<h2 class="text-base font-bold leading-6 text-stone-900 mb-4">
			{task ? 'UPDATE TASK' : 'ADD TASK'}
		</h2>

		<div class="mt-2 flex flex-col gap-6">
			<Textbox
				props={{
					placeholder: 'Task Title',
					type: 'text',
					name: 'title',
					label: 'Task Title',
					className: 'w-full rounded',
					data: formData
				}}
			/>

			<UserList />
		</div>
	</form>
</ModalWrapper>
