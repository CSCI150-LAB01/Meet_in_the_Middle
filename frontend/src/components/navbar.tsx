"use client";

import React, { ReactNode } from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";

interface MenuItem {
	pageName: string;
	location: string;
}

export default function NavbarDesktop() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const isAuthenticated = false;

	const noAuthMenuItems = [
		{ pageName: "Home", location: "/#" },
		{ pageName: "Features", location: "/#features" },
		{ pageName: "Contact", location: "/#contact" },
		{ pageName: "Sign Up", location: "/user" },
	];

	const authMenuItems: MenuItem[] = [
		{ pageName: "Search", location: "/search" },
		{ pageName: "Dashboard", location: "/dashboard" },
		{ pageName: "Events", location: "/events" },
		{ pageName: "Plans", location: "/itineraries" },
		{ pageName: "Account", location: "/account" },
		{ pageName: "Logout", location: "/signout" },
	];

	const menuItems = isAuthenticated ? authMenuItems : noAuthMenuItems;

	return (
		<Navbar onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<Image
						src="/assets/mitm_logo.svg"
						width={80}
						height={80}
						alt="Meet In The Middle Logo"
					/>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				{menuItems.map((item: MenuItem) => (
					<NavbarMenuItem key={`${item}`}>
						<Link
							color="primary"
							className="w-full"
							href={item.location}
							size="lg"
						>
							{item.pageName}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarContent>

			<NavbarMenu>
				{menuItems.map((item: MenuItem) => (
					<NavbarMenuItem key={`${item}`}>
						<Link
							color="primary"
							className="w-full"
							href={item.location}
							size="lg"
						>
							{item.pageName}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
