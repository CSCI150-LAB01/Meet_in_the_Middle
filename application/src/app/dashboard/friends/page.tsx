'use client';
import { useState, useEffect, useRef } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { Input } from '@nextui-org/react';
import { berlin } from '@/styles/fonts';
import FriendCard from './components/Card';
import {
	fetchFriendsList,
	getFriendRequests,
	getUser,
	getUserInfo,
} from '@/utils/apiCalls';
import CardLoading from '@/components/loading';
import { useRouter } from 'next/navigation';
import { FriendListResponse, FriendRequest, NoVUser } from '@/types/types';
import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Friends() {
	const [friendsList, setFriendsList] = useState<NoVUser[] | null>(null);
	const [friendRequests, setFriendRequests] = useState<FriendRequest[] | null>(
		null,
	);
	const searchFriendsRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			const query = searchFriendsRef.current?.value || '';
			router.push(`/dashboard/friends/${encodeURI(query)}`);
		}
	};
	const showToast = (message: string, type: 'success' | 'error'): void => {
		toast[type](message, { position: toast.POSITION.BOTTOM_LEFT } as {
			position: ToastPosition;
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getUser();
				const friends = await fetchFriendsList(userData._id);
				const friendRequests = await getFriendRequests(userData._id);
				setFriendsList(friends.friends);
				setFriendRequests(friendRequests.friendRequests);
			} catch (error) {
				console.error('Error fetching user:', error);
				showToast('Error fetching user data.', 'error');
			}
		};

		fetchData();
	}, []);

	const handleReload = async () => {
		try {
			const userData = await getUser();
			const friends = await fetchFriendsList(userData._id);
			const friendRequests = await getFriendRequests(userData._id);
			setFriendsList(friends.friends);
			setFriendRequests(friendRequests.friendRequests);
		} catch (error) {
			console.error('Error fetching user:', error);
			showToast('Error updating friend requests.', 'error');
		}
	};

	return (
		<main className='flex justify-center flex-col px-0 w-full gap-y-5 min-h-screen'>
			<div className='px-5 flex gap-y-5 flex-col'>
				<h1
					className={`text-3xl ${berlin.className} text-zinc-500 text-center sm:text-left`}
				>
					Friends List
				</h1>
				<div className='flex items-end justify-center flex-col gap-x-5'>
					<Input
						classNames={{
							base: 'sm:max-w-[500px] h-10',
							mainWrapper: 'w-full h-full',
							input: 'text-small',
							inputWrapper:
								'h-full w-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
						}}
						placeholder='Add a friend by email...'
						size='sm'
						startContent={<MdOutlineSearch />}
						type='search'
						variant='bordered'
						color='primary'
						ref={searchFriendsRef}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
			<div className='w-full flex h-full items-center item-end text-sm flex-col gap-4 grow'>
				<div className='w-full text-sm bg-primary rounded-t-2xl flex flex-col flex-1 grow py-5 px-5 items-center sm:items-start'>
					{friendRequests
						? friendRequests.map(friendRequest => {
								return (
									<FriendCard
										name={friendRequest.senderUsername}
										senderId={friendRequest.senderId}
										id={friendRequest.recipientId}
										email={friendRequest.senderEmail}
										add={false}
										accept={true}
										reject={true}
										onAccept={handleReload}
										key={friendRequest.senderId}
									/>
								);
						  })
						: null}

					{friendsList ? (
						friendsList.length > 0 ? (
							<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
								{friendsList.map(friend => {
									try {
										return (
											<FriendCard
												name={friend.username}
												email={friend.email}
												id={friend._id}
												key={friend._id}
												// @TODO: Add delete friends
											/>
										);
									} catch (error) {
										console.error('Error fetching friend data:', error);
										return null;
									}
								})}
							</div>
						) : (
							''
						)
					) : (
						<CardLoading />
					)}
				</div>
			</div>
			<ToastContainer />
		</main>
	);
}
