'use client';
import React from 'react';
import Drawer from 'react-modern-drawer';
import {
	Navbar,
	NavbarContent,
	Link,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	Avatar,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
} from '@nextui-org/react';
import Image from 'next/image';
import {
	MdAccountCircle,
	MdHome,
	MdMap,
	MdMenu,
	MdMenuOpen,
	MdOutlineSearch,
} from 'react-icons/md';
import { useSession, signOut } from 'next-auth/react';
import { useCurrentLocation } from '@/hooks/useCurrentLocation';
import useGeolocation from '@/hooks/useGeolocation';
import { fromLatLng } from 'react-geocode';

interface MenuItem {
	pageName: string;
	location: string;
}

export default function AuthNavbar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

	const toggleDrawer = () => {
		setIsDrawerOpen(prevState => !prevState);
	};

	const menuItems: MenuItem[] = [
		{ pageName: 'Dashboard', location: '/dashboard' },
		{ pageName: 'Maps', location: '/maps' },
		{ pageName: 'Friends', location: '/friends' },
		{ pageName: 'Menu', location: '/menu' },
	];

	const formattedAddress = useCurrentLocation().placeholderText;
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
				position='static'
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

				<NavbarContent className='hidden sm:flex gap-2' justify='center'>
					{menuItems.map((item: MenuItem) => (
						<NavbarMenuItem key={`${item.pageName}`}>
							<Link
								className='w-full text-white'
								href={item.location}
								isBlock
								size='sm'
							>
								{item.pageName}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarContent>

				<NavbarContent className='gap-2' justify='end'>
					<Avatar
						name='Joe Brandon'
						className='hover:cursor-pointer'
						onClick={toggleDrawer}
					/>
				</NavbarContent>

				{/* Mobile Menu */}
				<NavbarMenu className='rounded-b-lg'>
					{menuItems.map((item: MenuItem) => (
						<NavbarMenuItem key={`${item.pageName}`}>
							<Link
								color='secondary'
								className='w-full'
								href={item.location}
								size='sm'
							>
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
					{/* not sure what the menu page has, add functionality later */}
					<MdMenu size='25px' className='text-neutral-400' />
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
				<div className='bg-white rounded-lg p-5 flex gap-2 flex-col'>
					<h3 className='text-zinc-500 font-semibold self-end text-lg'>
						Welcome Back
					</h3>
					<div className='flex flex-col gap-2 items-center justify-center w-full'>
						<p className='font-semibold text-zinc-500'>My Location</p>
						<p>{formattedAddress}</p>
						<Button className='w-full' color='secondary'>
							Update Location
						</Button>
					</div>

					<p key='dashboard' className='hover:cursor-pointer hover:underline'>
						Profile
					</p>
					<p key='settings' className='hover:cursor-pointer hover:underline'>
						Friend Requests
					</p>
					<p
						key='logout'
						className='text-danger hover:cursor-pointer hover:underline'
						color='danger'
						onClick={() => signOut({ redirect: false, callbackUrl: '/#' })}
					>
						Logout
					</p>
				</div>
			</Drawer>
		</>
	);
}
