"use client";

import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	Link,
	Input,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import { MdMenu, MdMenuOpen, MdOutlineSearch } from "react-icons/md";

interface MenuItem {
	pageName: string;
	location: string;
}

export default function NavbarDesktop() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const isAuthenticated = true;

	const noAuthMenuItems = [
		{ pageName: "Home", location: "/#" },
		{ pageName: "Features", location: "/#features" },
		{ pageName: "Contact", location: "/#contact" },
		{ pageName: "Sign Up", location: "/user" },
	];

	const authMenuItems: MenuItem[] = [
		{ pageName: "Dashboard", location: "/dashboard" },
		{ pageName: "Events", location: "/events" },
		{ pageName: "Plans", location: "/itineraries" },
		{ pageName: "Account", location: "/account" },
		{ pageName: "Logout", location: "/signout" },
	];

	const menuItems = isAuthenticated ? authMenuItems : noAuthMenuItems;

	return (
		<Navbar
			onMenuOpenChange={setIsMenuOpen}
			isBordered
			height="3rem"
			className={
				isMenuOpen
					? "bg-white transition-colors"
					: "bg-primary rounded-b-3xl transition-colors"
			}
			position="static"
		>
			{/* If auth => show search bar else show hamburger manu*/}

			{isAuthenticated ? (
				<>
					<NavbarBrand>
						<Image
							src="/assets/logo-condensed.svg"
							width={25}
							height={25}
							alt="Meet In The Middle Logo"
							className="md:hidden"
						/>
					</NavbarBrand>
					<NavbarContent
						as="div"
						className="items-center hidden md:flex"
						justify="start"
					>
						<Input
							classNames={{
								base: "md:max-w-full sm:max-w-[10rem] h-10",
								mainWrapper: "w-full h-full",
								input: "text-small placeholder:text-default-300/70",
								inputWrapper:
									"h-full font-normal text-white bg-default-300/20 dark:bg-default-500/20",
							}}
							placeholder="Search events, groups, etc..."
							size="sm"
							startContent={<MdOutlineSearch />}
							type="search"
							variant="faded"
						/>
					</NavbarContent>
				</>
			) : (
				<NavbarContent className="md:max-w-max">
					<NavbarMenuToggle
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						className="sm:hidden"
						icon={
							isMenuOpen ? (
								<MdMenuOpen size="50px" className="text-secondary" />
							) : (
								<MdMenu size="50px" className="text-white" />
							)
						}
					/>
				</NavbarContent>
			)}

			<NavbarContent className="hidden sm:flex gap-2" justify="center">
				{menuItems.map((item: MenuItem) => (
					<NavbarMenuItem key={`${item}`}>
						<Link
							className="w-full text-white"
							href={item.location}
							isBlock
							size="sm"
						>
							{item.pageName}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarContent>
		</Navbar>
	);
}
