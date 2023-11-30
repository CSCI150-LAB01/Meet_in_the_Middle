'use client';
import React, { useState, useEffect, useRef } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import { Input, Button } from '@nextui-org/react';
import { berlin } from '@/styles/fonts';
import FriendCard from '../components/Card';
import { fetchFriendsList, getUser, searchFriends } from '@/utils/apiCalls';
import CardLoading from '@/components/loading';
import { useRouter } from 'next/navigation';
import { NoVUser } from '@/types/types';

export default function SearchFriends({
	params,
}: {
	params: { email: string };
}) {
	const [searchList, setSearchList] = useState<NoVUser[] | null>(null);
	const [visibleItems, setVisibleItems] = useState<number>(5);
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
				const email: string = decodeURIComponent(params.email);
				const response = await searchFriends(email);
				setSearchList(response);
			} catch (error) {
				console.error('Error fetching user:', error);
			}
		};

		fetchData();
	}, [params.email]);

	const handleLoadMore = () => {
		// Increase the number of visible items by 3
		setVisibleItems(prevVisibleItems => prevVisibleItems + 3);
	};

	return (
		<main className='flex justify-center flex-col px-0 w-full gap-y-5 min-h-screen'>
			<div className='px-5 flex gap-y-5 flex-col'>
				<h1
					className={`text-3xl ${berlin.className} text-zinc-500 text-center sm:text-left`}
				>
					Find Friends
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
					<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full'>
						{searchList ? (
							searchList.length > 0 ? (
								searchList
									.slice(0, visibleItems)
									.map(user => (
										<FriendCard
											name={user.username}
											email={user.email}
											id={user._id}
											key={user._id}
											add
										/>
									))
							) : (
								<p className='text-center text-white pt-5'>
									We couldn&apos;t find anyone.
								</p>
							)
						) : (
							<CardLoading />
						)}
					</div>
					{searchList && visibleItems < (searchList?.length || 0) && (
						<Button
							onClick={handleLoadMore}
							color='secondary'
							className='mt-5 w-full'
						>
							Load More
						</Button>
					)}
				</div>
			</div>
		</main>
	);
}
