'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { createUser } from '../../utils/apiCalls';
import { Location } from '@/lib/types';
import { useRouter } from 'next/navigation';

import {
	GoogleMap,
	StandaloneSearchBox,
	Marker,
	useJsApiLoader,
} from '@react-google-maps/api';
import { fromLatLng, setKey } from 'react-geocode';
import useGeolocation from '@/hooks/useGeolocation';
import { Input, Button, Link } from '@nextui-org/react';
import { MdAccountCircle, MdEmail, MdPinDrop } from 'react-icons/md';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { berlin } from '@/styles/fonts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CardLoading from '@/components/loading';
import useGoogleMaps from '@/hooks/useGoogleMaps';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';

export default function Register() {
	const { data: session, status } = useSession();
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	// setIsAuthenticated(status === 'authenticated');
	const { position, status: locationStatus } = useGeolocation();

	// // if already logged in
	// if (isAuthenticated) {
	// 	useRouter().push('/dashboard');
	// }

	// Form States / Vars
	const [currentLocation, setCurrentLocation] = useState<Location>({
		lat: position?.latitude || 0,
		lng: position?.longitude || 0,
	});
	const toggleVisibility = () => setIsVisible(!isVisible); // Toggle password visibility
	const {
		searchBox,
		isLoaded,
		placeholderText,
		markers,
		onSBLoad,
		onPlacesChanged,
		onLoad,
		onUnmount,
	} = useGoogleMaps();
	const [isVisible, setIsVisible] = useState(false); // Password visibility state
	const usernameRef = useRef<HTMLInputElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();

	// Form Functions
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const formData = {
			username: usernameRef.current?.value || '',
			email: emailRef.current?.value || '',
			password: passwordRef.current?.value || '',
		};
		createUser(formData.email, formData.password, formData.username, [
			currentLocation.lng,
			currentLocation.lat,
		])
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
			});
	};
	useEffect(() => {
		if (position && locationStatus === 'granted') {
			setCurrentLocation({
				lat: position.latitude,
				lng: position.longitude,
			});
		}
	}, [position, locationStatus]);
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
						label='Username'
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
						<>
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
										center={currentLocation}
										zoom={15}
										onLoad={onLoad}
										onUnmount={onUnmount}
										mapContainerStyle={{ height: '150px', width: '350px' }}
										options={{
											gestureHandling: 'none',
											disableDefaultUI: true,
										}}
									>
										{markers.map((mark, index) => (
											<Marker key={index} position={mark} />
										))}
									</GoogleMap>
								</div>
							</div>
						</>
					) : (
						<CardLoading />
					)}
					<Button color='secondary' variant='solid' fullWidth type='submit'>
						Sign Up
					</Button>
					<Button
						className='bg-white text-foreground'
						variant='solid'
						fullWidth
						endContent={
							<FcGoogle className='text-default-400 pointer-events-none' />
						}
					>
						Sign Up With Google
					</Button>
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
				size='sm'
			>
				Already have an account? Sign In
			</Link>
			<ToastContainer />
		</>
	);
}
