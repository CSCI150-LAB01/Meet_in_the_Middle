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

export default function NavbarDesktop() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const isAuthenticated = false;
	interface MenuItem {
		pageName: string;
		location: string;
	}

	const noAuthMenuItems = [
		{ pageName: "Home", location: "/#" },
		{ pageName: "Features", location: "/#features" },
		{ pageName: "Contact", location: "/#contact" },
		{ pageName: "Sign Up", location: "/user" },
	];

	const authMenuItems = [
		{ pageName: "Search", location: "/search" },
		{ pageName: "Dashboard", location: "/dashboard" },
		{ pageName: "Group Events", location: "/events" },
		{ pageName: "Itineraries", location: "/itineraries" },
		{ pageName: "My Account", location: "/account" },
		{ pageName: "Sign Out", location: "/signout" },
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
					<p className="font-bold text-inherit">ACME</p>
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
