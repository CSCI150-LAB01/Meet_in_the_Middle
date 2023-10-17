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
	Avatar,
	Tabs,
	Tab,
} from "@nextui-org/react";
import Image from "next/image";
import {
	MdAccountCircle,
	MdHome,
	MdMap,
	MdMenu,
	MdMenuOpen,
	MdOutlineSearch,
} from "react-icons/md";

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
		<>
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
				{/* Top Nav */}
				{isAuthenticated ? (
					<>
						{/* If auth => show search bar else show hamburger manu*/}

						<NavbarContent as="div" className="items-center" justify="start">
							<Image
								src="/assets/logo-condensed.svg"
								width={25}
								height={25}
								alt="Meet In The Middle Logo"
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

				{!isAuthenticated ? (
					<NavbarContent className="hidden sm:flex gap-2" justify="end">
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
				) : (
					<NavbarContent className="gap-2" justify="end">
						<Avatar name="Joe Brandon" />
					</NavbarContent>
				)}

				{/* Mobile Menu */}
				<NavbarMenu className="rounded-b-lg" position="static">
					{menuItems.map((item: MenuItem) => (
						<NavbarMenuItem key={`${item}`}>
							<Link
								color="secondary"
								className="w-full"
								href={item.location}
								size="sm"
							>
								{item.pageName}
							</Link>
						</NavbarMenuItem>
					))}
				</NavbarMenu>
			</Navbar>

			{/* BTM Nav for Authenticated Users */}
			{isAuthenticated ? (
				<>
					<Navbar
						isBordered
						height="3rem"
						className="bg-white rounded-t-3xl transition-colors bottom-0 fixed top-[unset] h-[3rem] block md:hidden flex border-t-4 border-b-0 border-primary"
					>
						<Tabs
							aria-label="Drawer"
							color="primary"
							variant="solid"
							classNames="grow flex-1"
							fullWidth
						>
							<Tab
								key="Home"
								title={
									<div className="flex items-center space-x-2">
										<MdHome size="25px" />
									</div>
								}
							/>
							<Tab
								key="Map"
								title={
									<div className="flex items-center space-x-2">
										<MdMap size="25px" />
									</div>
								}
							/>
							<Tab
								key="Account"
								title={
									<div className="flex items-center space-x-2">
										<MdAccountCircle size="25px" />
									</div>
								}
							/>
							<Tab
								key="Menu"
								title={
									<div className="flex items-center space-x-2">
										<MdMenu size="25px" />
									</div>
								}
							/>
						</Tabs>
					</Navbar>
				</>
			) : (
				""
			)}
		</>
	);
}
