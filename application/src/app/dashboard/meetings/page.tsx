'use client';
import { berlin } from '@/styles/fonts';
import { Divider } from '@nextui-org/react';
import { MdNotifications } from 'react-icons/md';
import MeetingInviteCard from './components/meetingInvite';
import { Meeting, MeetingWithName } from '@/types/types';
import { useState, useEffect } from 'react';
import {
	getAllMeetings,
	getMeetingInvites,
	getUser,
	getUserInfo,
} from '@/utils/apiCalls';

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
	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col items-center lg:px-24 py-24 w-full max-w-[1080px] p-3'>
				<h1 className='text-lg text-zinc-700 self-start font-bold flex items-center gap-x-2'>
					<MdNotifications className='inline' />
					New Meeting Requests
				</h1>
				<div className='container py-3 flex flex-col gap-3'>
					{meetingInvites &&
						meetingInvites.map((invite: MeetingWithName) => (
							<MeetingInviteCard
								key={invite._id} // Make sure to use a unique key for each item
								title={invite.title}
								date={invite.meetingDateTime}
								owner={invite.creatorName}
							/>
						))}
				</div>
				<Divider className='mb-3' />

				<h1
					className={berlin.className + ' text-4xl sm:text-5xl text-zinc-700'}
				>
					Meetings
				</h1>
				<div className='container py-3 flex flex-col gap-3'>
					{/* Meetings */}
				</div>
			</div>
		</div>
	);
}
