'use client';
import FriendCard from '@/app/dashboard/friends/components/Card';
import CardLoading from '@/components/loading';
import { berlin } from '@/styles/fonts';
import { Meeting, NoVUser } from '@/types/types';
import { getAcceptedInvites, getMeetingById, getUser } from '@/utils/apiCalls';
import { Button, Divider, Input, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import AcceptedFriend from '../components/acceptedFriends';

export default function Edit({ params }: { params: { meetingId: string } }) {
	const router = useRouter();
	const [meetingData, setMeetingData] = useState<Meeting | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [meetingDateTime, setMeetingDateTime] = useState<string>('');
	const [friends, setFriends] = useState<NoVUser[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getUser();
				const meetingData: Meeting = await getMeetingById(
					userData._id,
					params.meetingId,
				);
				setMeetingData(meetingData);
				if (userData._id !== meetingData?.creatorId) {
					console.error('Invalid user id permissions');
					router.push('/dashboard');
					return;
				}

				// Set the default value for datetime
				setMeetingDateTime(
					new Date(meetingData.meetingDateTime).toISOString().slice(0, 16),
				);
				if (meetingData.pending && meetingData.accepted.length > 0) {
					const acceptedUsers = await getAcceptedInvites(
						userData._id,
						meetingData._id,
					);
					setFriends(acceptedUsers);
				}
			} catch (error) {
				console.error('Error fetching meeting:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [params.meetingId]);

	return (
		<main className='flex justify-center flex-col px-0 w-full gap-y-5 h-screen items-center sm:max-h-[500px] sm:max-w-[500px]'>
			{loading ? (
				<CardLoading />
			) : meetingData ? (
				<>
					<div className='px-5 flex gap-y-5 flex-col'>
						<h1
							className={`text-4xl ${berlin.className} text-zinc-600 text-center sm:text-left max-w-[15ch] text-overflow-ellipsis overflow-hidden whitespace-nowrap`}
						>
							{meetingData.title}
						</h1>
					</div>
					<div className='sm:h-[unset] sm:grow-0 w-full flex h-full items-center item-end text-sm flex-col gap-4 grow'>
						<div className='w-full text-sm bg-primary rounded-t-2xl sm:rounded-b-2xl flex flex-col flex-1 grow p-6 items-center sm:items-start gap-5'>
							<Button
								color='secondary'
								className={`w-full text-md`}
								isDisabled={friends.length <= 0}
							>
								{friends.length <= 0
									? 'Invite Friends to Set Location'
									: 'Get Location Recommendations'}
							</Button>

							<div className='flex self-start flex-col gap-2 w-full'>
								<p className='text-white'>{`Who's Going?`}</p>

								{friends.length > 0 ? (
									<div className='h-[160px] flex bg-white rounded-lg w-full p-5 flex-col gap-y-2 overflow-auto'>
										{friends.map((friend: NoVUser) => (
											<>
												<AcceptedFriend
													key={friend._id}
													name={friend.username}
													email={friend.email}
												/>
												<Divider />
											</>
										))}
									</div>
								) : (
									<div className='min-h-[160px] flex items-center justify-center bg-white rounded-lg w-full '>
										<p>No Friends Added</p>
									</div>
								)}
							</div>
							<Link href={`/dashboard/meeting/invite/${params.meetingId}`}>
								<Button color='secondary' className='w-full text-md'>
									Invite Friends
								</Button>
							</Link>

							<Input
								label='Change Date / Time'
								labelPlacement='outside'
								type='datetime-local'
								id='dateTime'
								name='dateTime'
								placeholder='Enter a date here.'
								classNames={{
									label: 'text-white',
								}}
								value={meetingDateTime}
								onChange={e => setMeetingDateTime(e.target.value)}
							/>

							<Link href='/dashboard' className='w-full'>
								<Button as='a' color='secondary' className='w-full text-md'>
									Save Meeting
								</Button>
							</Link>
						</div>
					</div>
				</>
			) : (
				<p>Error: Meeting not found.</p>
			)}
		</main>
	);
}
