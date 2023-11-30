'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';

// API and utility imports
import { createUser } from '../../../utils/apiCalls';
import { Location } from '@/lib/types';

// Google Maps / Hooks
import { GoogleMap, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import useGoogleMaps from '@/hooks/useGoogleMaps';
import useGeolocation from '@/hooks/useGeolocation';

// Custom hooks, components, styles
import { Input, Button, Link } from '@nextui-org/react';
import CardLoading from '@/components/loading';
import { ToastContainer, toast } from 'react-toastify';
import { MdAccountCircle, MdEmail, MdPinDrop } from 'react-icons/md';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { berlin } from '@/styles/fonts';

export default function SignUp() {
	const { position, status: locationStatus } = useGeolocation();
	const [isLoading, setIsLoading] = useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible); // Toggle password visibility
	const {
		isLoaded,
		searchBox,
		markers,
		map,
		placeholderText,
		onLoad,
		onUnmount,
		onSBLoad,
		onPlacesChanged,
	} = useGoogleMaps();

	const [isVisible, setIsVisible] = useState(false);
	const usernameRef = useRef<HTMLInputElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();

	// Form Functions
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		setIsLoading(true); // Set loading state to true

		const formData = {
			username: usernameRef.current?.value || '',
			email: emailRef.current?.value || '',
			password: passwordRef.current?.value || '',
		};

		const { username, email, password } = formData;

		createUser(email, password, username, [markers[0].lng, markers[0].lat])
			.then(() => {
				toast.success('User account created successfully!', {
					position: toast.POSITION.BOTTOM_CENTER,
				});
				router.push('/user/login');
			})
			.catch(error => {
				toast.error(`${error}`, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false); // Set loading state to false after API call is complete
			});
	};

	useEffect(() => {}, [position, locationStatus]);

	return (
		<>
			<div className='w-full text-sm bg-primary rounded-2xl flex flex-col flex-1 grow'>
				<form
					className='gap-4 p-5 flex items-center justify-stretch flex-col flex-1 grow'
					onSubmit={handleSubmit}
				>
					<h1 className={`text-white text-4xl py-5 ${berlin.className}`}>
						Sign Up
					</h1>

					<Input
						type='username'
						label='Display Name'
						required
						endContent={
							<MdAccountCircle className='text-default-400 pointer-events-none' />
						}
						ref={usernameRef}
					/>

					<Input
						type='email'
						label='Email'
						endContent={
							<MdEmail className='text-default-400 pointer-events-none' />
						}
						required
						ref={emailRef}
					/>
					<Input
						label='Password'
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

					{/* LOCATION */}
					{isLoaded ? (
						<div className='w-full'>
							<div id='searchbox' className='w-full'>
								<StandaloneSearchBox
									onLoad={onSBLoad}
									onPlacesChanged={onPlacesChanged}
								>
									<Input
										label='Home Location'
										placeholder={placeholderText}
										endContent={
											<MdPinDrop className='text-default-400 pointer-events-none' />
										}
									></Input>
								</StandaloneSearchBox>
							</div>
							<br />
							<div className='overflow-clip rounded-lg w-full pointer-events-none'>
								<GoogleMap
									center={markers.length ? markers[0] : { lat: 0, lng: 0 }}
									zoom={15}
									onLoad={onLoad}
									onUnmount={onUnmount}
									mapContainerStyle={{ height: '150px', width: '350px' }}
									options={{
										gestureHandling: 'auto', // or 'cooperative'
										disableDefaultUI: true,
									}}
								>
									{markers.map((mark, index) => (
										<Marker key={index} position={mark} />
									))}
								</GoogleMap>
							</div>
						</div>
					) : (
						<CardLoading />
					)}
					<Button
						color='secondary'
						variant='solid'
						fullWidth
						type='submit'
						disabled={isLoading}
						isLoading={isLoading}
					>
						{isLoading ? 'Loading' : 'Sign Up'}
					</Button>
					{/* <Button
						className='bg-white text-foreground'
						variant='solid'
						fullWidth
						endContent={
							<FcGoogle className='text-default-400 pointer-events-none' />
						}
					>
						Sign Up With Google
					</Button> */}
				</form>
				<Link href='/user/login'>
					<Button
						className='bg-white text-foreground md:hidden align-center py-5 '
						variant='solid'
						fullWidth
					>
						<p className='pt-5'>
							Already have an account?{' '}
							<span className='text-secondary'>Sign In</span>
						</p>
					</Button>
				</Link>
			</div>
			<Link
				className='text-secondary text-center hidden md:block'
				href='/user/login'
			>
				Already have an account? Sign In
			</Link>
			<ToastContainer />
		</>
	);
}
