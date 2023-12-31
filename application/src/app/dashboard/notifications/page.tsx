'use client';
import React, { useState, useEffect, useRef } from 'react';
import { berlin } from '@/styles/fonts';
import { Button } from '@nextui-org/react';
import { getNotifications, getUser } from '@/utils/apiCalls';
import NotificationCard from './components/NotificationCard';
import { Notification } from '@/types/types';
import CardLoading from '@/components/loading';
import { ToastContainer, ToastPosition, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function NotificationPage() {
	const [notifications, setNotifications] = useState<Notification[] | null>(
		null,
	);
	const [visibleItems, setVisibleItems] = useState<number>(5);
	const [isLoading, setIsLoading] = useState<boolean>(true); // New state variable

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await getUser();
				const notifications = await getNotifications(userData._id);
				setNotifications(notifications.notifications);
				setIsLoading(false); // Set loading to false when data is fetched
			} catch (error) {
				console.error('Error fetching user:', error);
				showToast('Invalid user error...', 'error');
			}
		};

		fetchData();
	}, []);

	const handleLoadMore = () => {
		setVisibleItems(prevVisibleItems => prevVisibleItems + 3);
	};
	const showToast = (message: string, type: 'success' | 'error'): void => {
		toast[type](message, { position: toast.POSITION.BOTTOM_LEFT } as {
			position: ToastPosition;
		});
	};

	const handleDeleteNotification = async () => {
		try {
			const userData = await getUser();
			const response = await getNotifications(userData._id);
			setNotifications(response.notifications);
			showToast('Notification deleted successfully!', 'success');
		} catch (error) {
			console.error('Error fetching notifications:', error);
			showToast('There was an error getting your notifications..', 'error');
		}
	};

	return (
		<div className='flex w-full justify-center'>
			<div className='flex min-h-screen flex-col items-center lg:px-24 py-24 w-full max-w-[1080px] p-3'>
				<h1
					className={berlin.className + ' text-4xl sm:text-5xl text-zinc-700'}
				>
					Notifications
				</h1>
				{isLoading ? ( // Check if data is still loading
					<CardLoading /> // Render loading card
				) : (
					<div className='container p-3 flex flex-col gap-3'>
						{notifications && notifications.length > 0 ? (
							notifications
								.slice(0, visibleItems)
								.map(notification => (
									<NotificationCard
										key={notification._id}
										userId={notification.userId}
										name={notification.message}
										description={new Date(
											notification.createdAt,
										).toLocaleString()}
										showDeleteIcon
										onDelete={handleDeleteNotification}
										notificationId={notification._id}
									/>
								))
						) : (
							<p>You have no notifications</p>
						)}
					</div>
				)}
				{notifications && notifications.length > visibleItems && (
					<Button onClick={handleLoadMore} color='primary'>
						Load More
					</Button>
				)}
				<ToastContainer />
			</div>
		</div>
	);
}
