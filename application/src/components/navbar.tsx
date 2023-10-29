'use client';

import React from 'react';
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
	DropdownItem,
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

interface MenuItem {
	pageName: string;
	location: string;
}

export default function NavbarDesktop() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const isAuthenticated = false;

	const noAuthMenuItems = [
		{ pageName: 'Home', location: '/#' },
		{ pageName: 'Features', location: '/#features' },
		{ pageName: 'Contact', location: '/#contact' },
		{ pageName: 'Sign Up', location: '/user' },
	];

	const authMenuItems: MenuItem[] = [
		{ pageName: 'Dashboard', location: '/dashboard' },
		{ pageName: 'Events', location: '/Maps' },
		{ pageName: 'Plans', location: '/Friends' },
		{ pageName: 'Account', location: '/Menu' },
	];

	const menuItems = isAuthenticated ? authMenuItems : noAuthMenuItems;

	return (
		<>
			<Navbar
				onMenuOpenChange={setIsMenuOpen}
				isBordered
				height='3rem'
				className={
					isMenuOpen
						? 'bg-white transition-colors'
						: 'bg-primary rounded-b-3xl transition-colors'
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
					{!isAuthenticated ? (
						<NavbarMenuToggle
							aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
							className='sm:hidden'
							icon={
								isMenuOpen ? (
									<MdMenuOpen size='50px' className='text-secondary' />
								) : (
									<MdMenu size='50px' className='text-white' />
								)
							}
						/>
					) : (
						''
					)}
				</NavbarContent>

				<NavbarContent className='hidden sm:flex gap-2' justify='center'>
					{menuItems.map((item: MenuItem) => (
						<NavbarMenuItem key={`${item}`}>
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

				{/* Account Action Menu: Only available to authenticated users */}
				{isAuthenticated ? (
					<NavbarContent className='gap-2' justify='end'>
						<Dropdown placement='bottom-end'>
							<DropdownTrigger>
								<Avatar name='Joe Brandon' className='hover:cursor-pointer' />
							</DropdownTrigger>
							<DropdownMenu aria-label='Profile Action Menu'>
								<DropdownItem key='dashboard'>Dashboard</DropdownItem>
								<DropdownItem key='settings'>Account Settings</DropdownItem>
								<DropdownItem
									key='logout'
									className='text-danger'
									color='danger'
								>
									Logout
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarContent>
				) : (
					''
				)}

				{/* Mobile Menu */}
				<NavbarMenu className='rounded-b-lg' position='static'>
					{menuItems.map((item: MenuItem) => (
						<NavbarMenuItem key={`${item}`}>
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
			{isAuthenticated ? (
				<>
					<Navbar
						isBordered
						height='3rem'
						className='bg-white rounded-t-3xl transition-colors bottom-0 fixed top-[unset] h-[3rem] block md:hidden flex border-t-4 border-b-0 border-primary px-5'
					>
						<Button isIconOnly color='transparent' aria-label='Dashboard'>
							<Link href='/dashboard'>
								<MdHome size='25px' className='text-neutral-400' />
							</Link>
						</Button>

						<Button isIconOnly color='transparent' aria-label='Maps'>
							<Link href='/maps'>
								<MdMap size='25px' className='text-neutral-400' />
							</Link>
						</Button>
						<Button isIconOnly color='transparent' aria-label='Friends'>
							<Link href='/friends'>
								<MdAccountCircle size='25px' className='text-neutral-400' />
							</Link>
						</Button>
						<Button isIconOnly color='transparent' aria-label='Menu'>
							{/* not sure what the menu page has, add functionality later */}
							<MdMenu size='25px' className='text-neutral-400' />
						</Button>
					</Navbar>
				</>
			) : (
				''
			)}
		</>
	);
}
