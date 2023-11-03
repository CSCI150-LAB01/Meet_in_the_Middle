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
import { useSession, signOut } from 'next-auth/react';

interface MenuItem {
	pageName: string;
	location: string;
}

export default function AuthNavbar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const menuItems: MenuItem[] = [
		{ pageName: 'Dashboard', location: '/dashboard' },
		{ pageName: 'Maps', location: '/maps' },
		{ pageName: 'Friends', location: '/friends' },
		{ pageName: 'Menu', location: '/menu' },
	];
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
					<Dropdown placement='bottom-end'>
						<DropdownTrigger>
							<Avatar name='Joe Brandon' className='hover:cursor-pointer' />
						</DropdownTrigger>
						<DropdownMenu aria-label='Profile Action Menu'>
							<DropdownItem key='dashboard'>Dashboard</DropdownItem>
							<DropdownItem key='settings'>Account Settings</DropdownItem>
							<DropdownItem key='logout' className='text-danger' color='danger'>
								<div
									onClick={() =>
										signOut({ redirect: false, callbackUrl: '/#' })
									}
								>
									Logout
								</div>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>

				{/* Mobile Menu */}
				<NavbarMenu className='rounded-b-lg' position='static'>
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
				className='bg-white rounded-t-3xl transition-colors bottom-0 fixed top-[unset] h-[3rem] block md:hidden flex border-t-4 border-b-0 border-primary px-5 z-[3] fixed'
			>
				<Button isIconOnly color='undefined' aria-label='Dashboard'>
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
	);
}
