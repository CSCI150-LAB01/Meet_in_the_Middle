'use client';
import { berlin } from '@/styles/fonts';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import { useRef, useState } from 'react';
import {
	createMeeting,
	fetchDefaultLocation,
	getClosestPlaceId,
	getUser,
} from '@/utils/apiCalls';
import { getLatLng } from 'use-places-autocomplete';
import { MeetingResponse } from '@/types/types';

export default function Create() {
	const router = useRouter();
	const titleRef = useRef<HTMLInputElement | null>(null);
	const dateTimeRef = useRef<HTMLInputElement | null>(null);
	const toastPosition = toast.POSITION.BOTTOM_CENTER;
	const [isSubmitting, setSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		setSubmitting(true);
		e.preventDefault();
		const userData = await getUser();

		const location = await fetchDefaultLocation(userData._id);
		const { coordinates } = location.defaultLocation || {};

		if (!coordinates || coordinates.length != 2) {
			toast.error('Something went wrong', { position: toastPosition });
			setSubmitting(false);
			return;
		}

		const formData = {
			title: titleRef.current?.value || '',
			dateTime: dateTimeRef.current?.value || '',
		};

		try {
			// Temporarily sets the placeID to somewhere random
			const placeID = 'ChIJaeElXQfKlzMRPc75C7m9hAI';
			const response: MeetingResponse = await createMeeting(
				userData._id,
				placeID,
				formData.title,
				formData.dateTime,
			);

			handleSuccess(response.meeting._id);
		} catch (error) {
			toast.error('Something went wrong...', { position: toastPosition });
			setSubmitting(false);
		} finally {
			setSubmitting(false);
		}
	};

	const handleSuccess = (meetingId: string) => {
		toast.success('Meeting created successfully!', { position: toastPosition });
		router.push(`/dashboard/meeting/edit/${meetingId}`);
	};
	return (
		<main className='flex justify-center flex-col px-0 w-full gap-y-5 h-screen items-center sm:max-h-[500px] sm:max-w-[500px]'>
			<div className='px-5 flex gap-y-5 flex-col'>
				<h1
					className={`text-4xl ${berlin.className} text-zinc-600 text-center sm:text-left`}
				>
					Create a Meeting
				</h1>
			</div>
			<div className='w-full flex h-full sm:h-[unset] items-center item-end text-sm flex-col gap-4 grow sm:grow-0'>
				<form
					className='w-full text-sm bg-primary rounded-t-2xl sm:rounded-b-2xl flex flex-col flex-1 grow p-6 items-center sm:items-start gap-5'
					onSubmit={handleSubmit}
				>
					<Input
						label='Title'
						placeholder='Event/Meeting Title'
						classNames={{
							label: 'text-white',
						}}
						labelPlacement='outside'
						ref={titleRef}
						required
					/>
					<Input
						label='Pick Date / Time'
						labelPlacement='outside'
						type='datetime-local'
						id='birthdaytime'
						name='birthdaytime'
						placeholder='Enter a date here.'
						classNames={{
							label: 'text-white',
						}}
						ref={dateTimeRef}
						required
					/>
					{/* <Link href='/dashboard/meeting/edit' className='w-full'> */}
					<Button
						color='secondary'
						className='w-full text-md'
						type='submit'
						disabled={isSubmitting}
						isLoading={isSubmitting}
					>
						{isSubmitting ? 'Loading...' : 'Create Meeting'}
					</Button>
				</form>
			</div>
			<ToastContainer />
		</main>
	);
}
