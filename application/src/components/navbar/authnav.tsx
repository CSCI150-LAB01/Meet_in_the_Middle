'use client';
import { useEffect, useState } from 'react';
import Drawer from 'react-modern-drawer';
import dynamic from 'next/dynamic';

import {
	Navbar,
	NavbarContent,
	Link,
	NavbarMenu,
	NavbarMenuItem,
	Avatar,
	Button,
} from '@nextui-org/react';
import Image from 'next/image';
import {
	MdAccountCircle,
	MdHome,
	MdMap,
	MdMenu,
	MdNotifications,
} from 'react-icons/md';
import { getUser } from '@/utils/apiCalls';

interface MenuItem {
	pageName: string;
	location: string;
}
const DrawerContents = dynamic(() => import('./drawer.tsx') as any);

export default function AuthNavbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [username, setUsername] = useState('Loading..');

	const toggleDrawer = () => {
		setIsDrawerOpen(prevState => !prevState);
	};

	const menuItems: MenuItem[] = [
		{ pageName: 'Dashboard', location: '/dashboard' },
		{ pageName: 'Maps', location: '/dashboard/maps' },
		{ pageName: 'Friends', location: '/dashboard/friends' },
		{ pageName: 'Menu', location: '/dashboard/menu' },
	];

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser();
			setUsername(userData.username);
		};
		fetchUser();
	}, []);

	return (
		<>
			<Navbar
				onMenuOpenChange={setIsMenuOpen}
				isBordered
				height='3rem'
				className={
					isMenuOpen
						? 'bg-white transition-colors z-[3]'
						: 'bg-primary rounded-b-3xl transition-colors z-[3] fixed'
				}
			>
				{/* Top Nav */}
				{/* If auth => show icon else show hamburger menu*/}

				<NavbarContent
					as='div'
					className='items-center md:max-w-max'
					justify='start'
				>
					<Image
						src='/assets/logo-condensed.svg'
						width={25}
						height={25}
						alt='Meet In The Middle Logo'
						className='hidden md:block'
					/>
				</NavbarContent>

				<NavbarContent className='hidden sm:flex gap-5' justify='center'>
					{menuItems.map((item: MenuItem) => (
						<NavbarMenuItem key={`${item.pageName}`}>
							<Link className='w-full text-white' href={item.location}>
								{item.pageName}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarContent>

				<NavbarContent className='gap-5' justify='end'>
					<Link href='/dashboard/notifications'>
						<MdNotifications className='text-white text-2xl' />
					</Link>

					<Avatar
						name={username}
						className='hover:cursor-pointer'
						onClick={toggleDrawer}
					/>
				</NavbarContent>

				{/* Mobile Menu */}
				<NavbarMenu className='rounded-b-lg'>
					{menuItems.map((item: MenuItem) => (
						<NavbarMenuItem key={`${item.pageName}`}>
							<Link className='w-full' href={item.location}>
								{item.pageName}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>

			{/* BTM Nav for Authenticated Mobile Users */}
			<Navbar
				isBordered
				height='3rem'
				className='bg-white rounded-t-3xl transition-colors bottom-0 fixed top-[unset] h-[3rem] block md:hidden flex border-t-4 border-b-0 border-primary px-5 z-[10] fixed'
			>
				<Button isIconOnly aria-label='Dashboard' className='bg-transparent'>
					<Link href='/dashboard'>
						<MdHome size='25px' className='text-neutral-400' />
					</Link>
				</Button>

				<Button isIconOnly aria-label='Maps' className='bg-transparent'>
					<Link href='/dashboard/maps'>
						<MdMap size='25px' className='text-neutral-400' />
					</Link>
				</Button>
				<Button isIconOnly aria-label='Friends' className='bg-transparent'>
					<Link href='/dashboard/friends'>
						<MdAccountCircle size='25px' className='text-neutral-400' />
					</Link>
				</Button>
				<Button isIconOnly aria-label='Menu' className='bg-transparent'>
					<Link href='/dashboard/menu'>
						<MdMenu size='25px' className='text-neutral-400' />
					</Link>
				</Button>
			</Navbar>

			{/* Account Drawer */}
			<Drawer
				open={isDrawerOpen}
				onClose={toggleDrawer}
				direction='top'
				className='pt-[50px] rounded-3xl'
				style={{ zIndex: 2 }}
				overlayClassName='!z-[1]'
				overlayOpacity={0}
			>
				{isDrawerOpen && <DrawerContents />}
			</Drawer>
		</>
	);
}
