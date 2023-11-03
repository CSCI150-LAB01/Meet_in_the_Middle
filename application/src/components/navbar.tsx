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
import AuthNavbar from './navbar/authnav';
import NoAuthNavBar from './navbar/noauth-navbar';

export default function NavbarDesktop() {
	const { data: session, status } = useSession();

	if (status === "authenticated") {
		return <AuthNavbar/>;
	} else {
		return <NoAuthNavBar/>;
	}
}
