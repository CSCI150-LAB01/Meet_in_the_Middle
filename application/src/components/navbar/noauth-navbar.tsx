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

export default function NoAuthNavBar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = [
		{ pageName: 'Home', location: '/#' },
		{ pageName: 'Features', location: '/#features' },
		{ pageName: 'Contact', location: '/#contact' },
		{ pageName: 'Sign Up', location: '/user' },
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
		</>
	);
}
