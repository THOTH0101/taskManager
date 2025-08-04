<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Textbox from '$lib/components/Textbox.svelte';
	import { object, string } from 'yup';

	const formSchema = object({
		email: string().email('Invalid email format').required('Email is required'),
		password: string()
			.min(6, 'Password must be at least 6 characters')
			.required('Password is required')
	});

	let formData = $state({
		email: null,
		password: null
	});

	let errors = $state({
		email: null,
		password: null
	});

	const validateForm = async () => {
		try {
			// Define the validation schema
			let { email, password } = formData;

			await formSchema.validate({ email, password }, { abortEarly: false });

			errors = { email: null, password: null };
			return true;
		} catch (validationError: any) {
			// Handle validation error
			const updateErrors: any = { email: '', password: '' };

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

		console.log('logged in');
	};
</script>

<div class="w-full min-h-screen flex items-center justify-center flex-col lg:flex-row bg-stone-200">
	<div
		class="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center"
	>
		<!-- Left Side -->
		<div class="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
			<div
				class="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:-mt-20"
			>
				<span
					class="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-stone-300 text-stone-700"
				>
					Manage Your Projects And Be More Productive
				</span>
				<p
					class="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700"
				>
					<span>Task Management</span>
					<span>System</span>
				</p>
				<div class="cell">
					<div class="circle rotate-in-up-left"></div>
				</div>
			</div>
		</div>

		<!-- Right Side -->
		<div class="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
			<form
				onsubmit={handleSubmit}
				class="container w-full md:w-[400px] flex flex-col gap-y-8 bg-stone-100 px-10 pt-14 pb-14 rounded-xl shadow-lg"
			>
				<div>
					<p class="text-blue-600 text-3xl font-bold text-center">Welcome Back!</p>
				</div>
				<div class="flex flex-col gap-y-5">
					<div class="w-full flex flex-col gap-1">
						<Textbox
							bind:errors
							placeholder="email@example.com"
							type="email"
							name="email"
							label="Email Address"
							className="w-full rounded-full"
							data={formData}
						/>
					</div>
					<div class="w-full flex flex-col gap-1">
						<Textbox
							bind:errors
							placeholder="enter your password"
							type="password"
							name="password"
							label="Password"
							className="w-full rounded-full"
							data={formData}
						/>
					</div>

					<span class="text-sm text-stone-500 hover:text-blue-600 hover:underline cursor-pointer"
						>Forget Password?</span
					>

					<Button
						type="sumbit"
						label="Submit"
						className="w-full h-10 bg-blue-700 text-stone-100 rounded-full"
					/>
				</div>
			</form>
		</div>
	</div>
</div>
