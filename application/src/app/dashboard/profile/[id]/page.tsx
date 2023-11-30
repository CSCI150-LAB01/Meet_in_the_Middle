'use client';
import { berlin } from '@/styles/fonts';
import { NoVUser } from '@/types/types';
import { getUserInfo } from '@/utils/apiCalls';
import { Avatar } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import gravatarUrl from 'gravatar-url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile({ params }: { params: { id: string } }) {
	const [user, setUser] = useState<NoVUser | null>(null);
	const [isUserLoading, setUserLoading] = useState<boolean>(true);
	const userEmail = user?.email || 'example@example.com';
	const gravatarSrc = gravatarUrl(userEmail, { size: 180 });
	const isDefaultGravatar = (gravatarSrc: string) => {
		// Replace this with the default Gravatar URL that you want to check against
		const defaultGravatarUrl =
			'https://www.gravatar.com/avatar/00000000000000000000000000000000?s=180&d=mp&r=pg';

		return gravatarSrc === defaultGravatarUrl;
	};
	const showToast = (message: string, type: 'success' | 'error') => {
		toast[type](message, { position: toast.POSITION.BOTTOM_LEFT });
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getUserInfo(params.id);
				setUser(userData);
				setUserLoading(false);
			} catch (error) {
				console.error('Error fetching user:', error);
				showToast('There was an error fetching your data..', 'error');
			}
		};

		fetchData();
	}, []);
	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col lg:px-24 w-full max-w-[1080px] w-full p-5 gap-5 sm:text-left text-center items-center sm:items-start'>
				<h1
					className={berlin.className + ' text-4xl sm:text-6xl text-zinc-700'}
				>
					Profile
				</h1>
				<Avatar
					name={isUserLoading ? 'NaN' : user?.username}
					className='w-[180px] h-[180px] text-xl z-[0]'
					src={isDefaultGravatar(gravatarSrc) ? user?.username : undefined}
				/>
				<div>
					<h3 className='text-2xl text-primary font-bold'>
						{isUserLoading ? 'NAN' : user?.username || 'Invalid User'}
					</h3>
					<p className='text-md text-zinc-700'>
						{isUserLoading ? 'Loading email...' : user?.email || 'Invalid User'}
					</p>
				</div>

				{/* <div>
					<h3 className='text-2xl text-primary font-bold'>
						Default Home Location
					</h3>
				</div> */}

				{/* <div>
					<h3 className='text-2xl text-primary font-bold'>Bio</h3>
					<p className='text-md text-zinc-700 text-left'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
						quis sem non ex hendrerit pulvinar. Aliquam consequat augue ac nibh
						tempor, non porta erat posuere. Etiam sem erat, placerat non enim
						vel, faucibus laoreet tellus. Pellentesque dui arcu, egestas
						lobortis lectus ac, volutpat ultrices metus. In et imperdiet ligula.
						Curabitur venenatis bibendum feugiat. Ut tempus rhoncus libero, nec
						scelerisque urna dapibus quis. Nam vel elit porttitor, maximus metus
						id, dictum metus. In a quam ante. Aliquam gravida posuere maximus.
						Vivamus cursus vel turpis sed posuere. Sed cursus tempor ante at
						feugiat. Duis luctus dolor non sapien varius mollis at quis libero.
					</p>
				</div> */}
			</div>
			<ToastContainer />
		</div>
	);
}
