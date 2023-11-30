'use client';
import FriendCard from '@/app/dashboard/friends/components/Card';
import CardLoading from '@/components/loading';
import { berlin } from '@/styles/fonts';
import {
	Meeting,
	NoVUser,
	SuggestionRequest,
	SuggestionResponse,
} from '@/types/types';
import {
	fetchDefaultLocation,
	getAcceptedInvites,
	getMeetingById,
	getSuggestions,
	getUser,
} from '@/utils/apiCalls';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Select,
	Input,
	Divider,
	SelectItem,
	Slider,
} from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import AcceptedFriend from '../components/acceptedFriends';
import { suggestionOptions } from '@/utils/utils';

export default function Edit({ params }: { params: { meetingId: string } }) {
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [meetingData, setMeetingData] = useState<Meeting | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [meetingDateTime, setMeetingDateTime] = useState<string>('');
	const [locationSuggestions, setLocationSuggestions] =
		useState<SuggestionResponse | null>(null);
	const [friends, setFriends] = useState<NoVUser[]>([]);
	const locationTypeRef = useRef<HTMLSelectElement | null>(null);
	const rangeInputRef = useRef<HTMLInputElement | null>(null);

	const getFriendCoordinates = async () => {
		const friendCoordinatesPromises = friends.map(async friend => {
			const friendDefaultLocation = await fetchDefaultLocation(friend._id);
			if (!friendDefaultLocation.defaultLocation) {
				console.log('No default location found for friend:', friend.username);
				return {
					latitude: 0,
					longitude: 0,
				};
			}
			return {
				latitude: friendDefaultLocation.defaultLocation?.coordinates[1],
				longitude: friendDefaultLocation.defaultLocation?.coordinates[0],
			};
		});

		return Promise.all(friendCoordinatesPromises);
	};

	const handleLocationRecommendations = async (
		e: React.FormEvent,
	): Promise<void> => {
		e.preventDefault();
		if (!locationTypeRef.current || !rangeInputRef.current) {
			return;
		}
		const selectedTypes: string[] = Array.from(
			locationTypeRef.current?.selectedOptions || [],
		).map(option => option.value);

		const radius: number = rangeInputRef.current
			? Number(rangeInputRef.current.value)
			: 0;

		if (selectedTypes.length === 0) {
			console.error('No location types selected');
			return;
		}
		try {
			const friendCoordinates = await getFriendCoordinates();
			const suggestionRequest: SuggestionRequest = {
				types: selectedTypes,
				radius: radius || 0,
				coordinates: friendCoordinates,
			};
			const suggestions: SuggestionResponse =
				await getSuggestions(suggestionRequest);
			setLocationSuggestions(suggestions);
			console.log('Location Suggestions:', suggestions);
		} catch (error) {
			console.error('Error fetching location suggestions:', error);
		}
	};

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
							{locationSuggestions && locationSuggestions.results && (
								<div className='h-[160px] flex bg-white rounded-lg w-full p-5 flex-col gap-y-2 overflow-auto'>
									{locationSuggestions.results.map((location, index) => (
										<AcceptedFriend
											key={index}
											name={location.name}
											email={location.vicinity}
										/>
									))}
								</div>
							)}

							<Button
								color='secondary'
								className={`w-full text-md`}
								isDisabled={friends.length <= 1}
								onPress={onOpen}
							>
								{friends.length <= 1
									? 'Invite Friends to Set Location'
									: 'Get Location Recommendations'}
							</Button>

							<div className='flex self-start flex-col gap-2 w-full'>
								<p className='text-white'>{`Who's Going?`}</p>

								{friends.length > 1 ? (
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
										<p>No friends added.</p>
									</div>
								)}
							</div>
							<Link
								href={`/dashboard/meeting/invite/${params.meetingId}`}
								className='w-full'
							>
								<Button color='secondary' className='w-full text-md'>
									Invite Friends
								</Button>
							</Link>

							<Input
								label='Change Date / Time'
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
								<Button color='secondary' className='w-full text-md'>
									Save Meeting
								</Button>
							</Link>
						</div>
					</div>
					<Modal isOpen={isOpen} onClose={onClose} placement='center'>
						<ModalContent>
							{onClose => (
								<>
									<ModalHeader className='flex flex-col gap-1'>
										Location Recommendations
									</ModalHeader>
									<ModalBody>
										<form
											className='flex flex-col gap-y-2'
											onSubmit={handleLocationRecommendations}
										>
											<Select
												label='Select a location type'
												labelPlacement='outside'
												placeholder='Location type'
												selectionMode='multiple'
												className='w-full h-full'
												ref={locationTypeRef}
												isRequired
											>
												{suggestionOptions.map(option => (
													<SelectItem
														key={option}
														value={option as string}
														className='capitalize'
														textValue={option as string}
													>
														{option.replace(/_/g, ' ')}{' '}
													</SelectItem>
												))}
											</Select>
											<Input
												size='md'
												type='number'
												label='Range of Results (in meters)'
												labelPlacement='outside'
												placeholder='5 Meters'
												className='w-full h-full'
												ref={rangeInputRef}
												isRequired
											/>
											<div className='flex flex-row justify-end items-center'>
												<Button
													color='danger'
													variant='light'
													onPress={onClose}
												>
													Close
												</Button>
												<Button color='primary' type='submit'>
													Get Recommendations
												</Button>
											</div>
										</form>
									</ModalBody>
								</>
							)}
						</ModalContent>
					</Modal>
				</>
			) : (
				<p>Error: Meeting not found.</p>
			)}
		</main>
	);
}
