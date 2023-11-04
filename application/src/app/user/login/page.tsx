'use client';

import { useState, useRef } from 'react';
import { Input, Button, Link } from '@nextui-org/react';
import { MdEmail } from 'react-icons/md';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { berlin } from '@/styles/fonts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '@/utils/apiCalls';
import { getSession, useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
	// password visibility
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);
	const router = useRouter();

	// const { data: session, status } = useSession();
	// const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	// setIsAuthenticated(status === 'authenticated');

	// // if already logged in
	// if (isAuthenticated) {
	// 	useRouter().push('/dashboard');
	// }

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
		signIn(
			'credentials',
			{},
			{ email: formData.email, password: formData.password },
		)
			.then(async () => {
				toast.success('User login successful!', {
					position: toast.POSITION.BOTTOM_CENTER,
				});
			})
			.catch(error => {
				toast.error(`${error}`, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
				console.log(error);
			});
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
						Don't have an account?{' '}
						<span className='text-secondary'>Sign Up</span>
					</p>
				</Button>
			</div>

			<Link
				className='text-secondary text-center hidden md:block'
				href='/user/register'
				size='sm'
			>
				Don't have an account? Sign Up
			</Link>
		</>
	);
}
