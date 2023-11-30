'use client';
import { berlin } from '@/styles/fonts';
import { Button, Input } from '@nextui-org/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { MdSearch } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MeetingInviteRequestBody, NoVUser } from '@/types/types';
import { fetchFriendsList, getUser, sendMeetingInvite } from '@/utils/apiCalls';
import FriendCard from '../components/inviteFriends';
import CardLoading from '@/components/loading';

interface InviteProps {
	params: {
		meetingId: string;
	};
}

export default function Invite({ params }: InviteProps) {
	const [friendsList, setFriendsList] = useState<NoVUser[] | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	const handleInvite = async (friendId: string) => {
		try {
			const userData = await getUser();
			const meetingRequestBody: MeetingInviteRequestBody = {
				meetingId: params.meetingId,
				userIds: [friendId],
			};

			const response = await sendMeetingInvite(
				userData._id,
				meetingRequestBody,
			);
			toast.success(response.message);
		} catch (error) {
			console.error('Error sending meeting invite:', error);
			toast.error('There was an error...');
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getUser();
				const friends = await fetchFriendsList(userData._id);
				setFriendsList(friends.friends);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching user:', error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filteredFriends = friendsList
		? friendsList.filter(
				friend =>
					friend.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
					friend.email.toLowerCase().includes(searchQuery.toLowerCase()),
		  )
		: [];

	return (
		<main className='flex justify-center flex-col px-0 w-full gap-y-5 h-screen items-center sm:max-h-[500px] sm:max-w-[500px]'>
			<div className='px-5 flex gap-y-5 flex-col'>
				<h1
					className={`text-4xl ${berlin.className} text-zinc-600 text-center sm:text-left`}
				>
					Invite Friends
				</h1>
			</div>
			<div className='w-full flex h-full sm:h-[unset] items-center item-end text-sm flex-col gap-4 grow sm:grow-0'>
				<form className='w-full text-sm bg-primary rounded-t-2xl sm:rounded-b-2xl flex flex-col flex-1 grow p-6 items-center sm:items-start gap-5'>
					<Input
						placeholder='Search for friend emails...'
						classNames={{
							label: 'text-white',
						}}
						required
						endContent={<MdSearch />}
						autoComplete='off'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
					/>

					{loading ? (
						<CardLoading />
					) : filteredFriends.length > 0 ? (
						<div className='w-full min-h-[325px] overflow-auto'>
							<div className='w-full flex flex-col gap-y-2 h-full'>
								{filteredFriends.map((friend, index) => (
									<FriendCard
										name={friend.username}
										email={friend.email}
										key={`friend-${index}`}
										invite
										onInvite={() => handleInvite(friend._id)}
									/>
								))}
							</div>
						</div>
					) : (
						<p className='text-white text-center self-center'>
							No matching friends found.
						</p>
					)}
					<Button
						color='secondary'
						className='w-full text-md'
						type='submit'
						onClick={() => {
							router.back();
						}}
					>
						Go Back
					</Button>
				</form>
			</div>
			<ToastContainer />
		</main>
	);
}
