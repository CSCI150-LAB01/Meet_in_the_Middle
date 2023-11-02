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
import { useSession, signIn, signOut } from 'next-auth/react';
import authNavbar from './navbar/authnav';
import noAuthNavBar from './navbar/noauth-navbar';

export default function NavbarDesktop() {
	const { data: session, status } = useSession();

	const noAuthMenuItems = [
		{ pageName: 'Home', location: '/#' },
		{ pageName: 'Features', location: '/#features' },
		{ pageName: 'Contact', location: '/#contact' },
		{ pageName: 'Sign Up', location: '/user' },
	];

	const authMenuItems: MenuItem[] = [
		{ pageName: 'Dashboard', location: '/dashboard' },
		{ pageName: 'Maps', location: '/maps' },
		{ pageName: 'Friends', location: '/friends' },
		{ pageName: 'Menu', location: '/menu' },
	];
	if (status === 'authenticated') {
		return authNavbar;
	} else {
		return noAuthNavBar;
	}
}
