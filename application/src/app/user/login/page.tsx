'use client';

import { useState, useRef } from 'react';
import { Input, Button, Link } from '@nextui-org/react';
import { MdEmail } from 'react-icons/md';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { berlin } from '@/styles/fonts';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { UpdateUser } from '@/utils/apiCalls';

export default function Login() {
	// password visibility
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(prev => !prev);
	const router = useRouter();
	const toastPosition = toast.POSITION.BOTTOM_CENTER;

	// form refs
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	// Form Functions
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = {
			email: emailRef.current?.value || '',
			password: passwordRef.current?.value || '',
		};

		signIn('credentials', {
			redirect: false,
			email: formData.email,
			password: formData.password,
		})
			.then(response => {
				if (response?.error) {
					toast.error(response?.error, { position: toastPosition });
				} else {
					handleSuccess();
				}
			})
			.catch(error => {
				toast.error(`${error}`, { position: toastPosition });
			});

		const handleSuccess = () => {
			toast.success('User login successful!', { position: toastPosition });
			UpdateUser(formData.email, formData.password);
			router.push('/dashboard');
		};
	};
	return (
		<>
			<div className='w-full text-sm bg-primary rounded-2xl flex flex-col flex-1 grow'>
				<div className='gap-4 p-5 flex items-center justify-stretch flex-col flex-1 grow'>
					<h1 className={`text-white text-4xl py-5 ${berlin.className}`}>
						Sign In
					</h1>

					<Input
						type='email'
						label='Email'
						placeholder='Enter your email'
						endContent={
							<MdEmail className='text-default-400 pointer-events-none' />
						}
						required
						ref={emailRef}
					/>
					<Input
						label='Password'
						placeholder='Enter your password'
						endContent={
							<button
								className='focus:outline-none'
								type='button'
								onClick={toggleVisibility}
							>
								{isVisible ? (
									<IoMdEyeOff className='text-default-400 pointer-events-none' />
								) : (
									<IoMdEye className='text-default-400 pointer-events-none' />
								)}
							</button>
						}
						type={isVisible ? 'text' : 'password'}
						required
						ref={passwordRef}
					/>

					<Button
						color='secondary'
						variant='solid'
						fullWidth
						onClick={handleSubmit}
					>
						Sign In
					</Button>
					<Button
						className='bg-white text-foreground'
						variant='solid'
						fullWidth
						endContent={
							<FcGoogle className='text-default-400 pointer-events-none' />
						}
					>
						Sign In With Google
					</Button>
				</div>
				<Button
					className='bg-white text-foreground md:hidden align-center py-5'
					variant='solid'
					fullWidth
				>
					<p className='pt-5'>
						Don&apos;t have an account?
						<Link href='/user/signup'>
							<span className='text-secondary'>Sign Up</span>
						</Link>
					</p>
				</Button>
			</div>

			<Link
				className='text-secondary text-center hidden md:block'
				href='/user/signup'
			>
				Don&apos;t have an account? Sign Up
			</Link>
		</>
	);
}
