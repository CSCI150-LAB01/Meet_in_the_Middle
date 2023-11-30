'use client';
import { berlin } from '@/styles/fonts';
import { Divider, Button } from '@nextui-org/react';
import { MdAdd, MdNotifications } from 'react-icons/md';
import MeetingInviteCard from './components/meetingInvite';
import { Meeting, MeetingWithName } from '@/types/types';
import { useState, useEffect } from 'react';
import {
	acceptMeetingInvite,
	getAllMeetings,
	getMeetingInvites,
	getUser,
	getUserInfo,
} from '@/utils/apiCalls';
import MeetingCard from './components/meetingCard';
import CardLoading from '@/components/loading';
import Link from 'next/link';

export default function MeetingsPage() {
	const [meetingInvites, setMeetingInvites] = useState<
		MeetingWithName[] | null
	>(null);
	const [meetingsList, setMeetingsList] = useState<Meeting[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getUser();
				const meetingInvites: MeetingWithName[] = await getMeetingInvites(
					userData._id,
				);
				const meetings: Meeting[] = await getAllMeetings(userData._id);
				setMeetingInvites(meetingInvites);
				setMeetingsList(meetings);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching user:', error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleAcceptMeetingInvite = async (meetingId: string) => {
		try {
			const userData = await getUser();
			await acceptMeetingInvite(userData._id, meetingId);
			const updatedMeetingInvites: MeetingWithName[] = await getMeetingInvites(
				userData._id,
			);
			setMeetingInvites(updatedMeetingInvites);
			const updatedMeetings: Meeting[] = await getAllMeetings(userData._id);
			setMeetingsList(updatedMeetings);
		} catch (error) {
			console.error('Error accepting meeting invite:', error);
		}
	};

	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col items-center lg:px-24 py-24 w-full max-w-[1080px] p-3'>
				{/* Show meeting invites or loading state */}
				{meetingInvites && meetingInvites.length > 0 ? (
					<>
						<h1 className='text-lg text-zinc-700 self-start font-bold flex items-center gap-x-2'>
							<MdNotifications className='inline' />
							New Meeting Invites
						</h1>
						<div className='container py-3 flex flex-col gap-3'>
							{meetingInvites.map(invite => (
								<MeetingInviteCard
									key={invite._id}
									title={invite.title}
									date={invite.meetingDateTime}
									owner={invite.creatorName}
									onAccept={() => handleAcceptMeetingInvite(invite._id)}
								/>
							))}
						</div>
						<Divider className='mb-3' />
					</>
				) : (
					''
				)}

				<div className='flex justify-between items-center w-full'>
					<h1
						className={
							berlin.className + ' text-4xl sm:text-5xl text-zinc-700 mb-2'
						}
					>
						Meetings
					</h1>
					<Link href='/dashboard/meeting/create'>
						<Button
							color='secondary'
							variant='solid'
							aria-label='Accept invitation'
							className='text-white'
							isIconOnly
							isLoading={loading}
						>
							<MdAdd />
						</Button>
					</Link>
				</div>
				{/* Show meetings or loading state */}
				{loading ? (
					<CardLoading />
				) : meetingsList && meetingsList.length > 0 ? (
					<div className='container py-3 flex flex-col gap-3'>
						{meetingsList.map((meeting: Meeting) => (
							<MeetingCard
								key={meeting._id}
								title={meeting.title}
								date={meeting.meetingDateTime}
								editLink={`/dashboard/meeting/edit/${meeting._id}`}
							/>
						))}
					</div>
				) : (
					<p className='text-center mt-20'>You have no meetings.</p>
				)}
			</div>
		</div>
	);
}
