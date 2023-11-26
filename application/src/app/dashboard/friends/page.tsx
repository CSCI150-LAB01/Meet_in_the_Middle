'use client';
import { useState, useEffect, useRef } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { Input } from '@nextui-org/react';
import { berlin } from '@/styles/fonts';
import FriendCard from './components/Card';
import { fetchFriendsList, getUser, getUserInfo } from '@/utils/apiCalls';
import CardLoading from '@/components/loading';
import { useRouter } from 'next/navigation';

export default function Friends() {
	const [friendsList, setFriendsList] = useState<string[] | null>(null);
	const searchFriendsRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			const query = searchFriendsRef.current?.value || '';
			router.push(`/dashboard/friends/${encodeURI(query)}`);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getUser();
				const friends = await fetchFriendsList(userData._id);
				setFriendsList(friends.friendIds);
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};

		fetchData();
	}, []);

	return (
		<main className='flex justify-center flex-col px-0 w-full gap-y-5 min-h-screen'>
			<div className='px-5 flex gap-y-5 flex-col'>
				<h1
					className={`text-3xl ${berlin.className} text-zinc-500 text-center sm:text-left`}
				>
					Friends List
				</h1>
				<Input
					classNames={{
						base: 'sm:max-w-[500px] h-10',
						mainWrapper: 'w-full h-full',
						input: 'text-small',
						inputWrapper:
							'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
					}}
					placeholder='Search for an email or name...'
					size='sm'
					startContent={<MdOutlineSearch />}
					type='search'
					variant='bordered'
					color='primary'
					ref={searchFriendsRef}
					onKeyDown={handleKeyDown}
				/>
			</div>
			<div className='w-full flex h-full items-center item-end text-sm flex-col gap-4 grow'>
				<div className='w-full text-sm bg-primary rounded-t-2xl flex flex-col flex-1 grow py-5 px-5 items-center sm:items-start'>
					<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
						{friendsList ? (
							friendsList.length > 0 ? (
								friendsList.map(async friendId => {
									const friendData = await getUserInfo(friendId);
									return (
										<FriendCard
											key={friendId}
											name={friendData.username}
											email={friendData.email}
											id={friendData._id}
											add={false}
										/>
									);
								})
							) : (
								<p className='text-center text-white pt-5'>
									You have no friends yet.
								</p>
							)
						) : (
							<CardLoading />
						)}
					</div>
				</div>
			</div>
		</main>
	);
}
