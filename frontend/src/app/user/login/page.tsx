"use client";

import React from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { MdEmail, MdKey } from "react-icons/md";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Metadata } from "next";
import { berlin } from "@/styles/fonts";

export const metadata: Metadata = {
	title: "Sign In",
};

export default function Login() {
	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<>
			<div className="max-w-xs w-full h-lg flex items-center justify-between text-sm flex-col gap-4 p-5 bg-primary rounded-2xl">
				<h1 className={`text-white text-lg ${berlin.className}`}>Sign In</h1>

				<Input
					type="email"
					label="Email"
					placeholder="Enter your email"
					endContent={
						<MdEmail className="text-default-400 pointer-events-none" />
					}
				/>
				<Input
					label="Password"
					placeholder="Enter your password"
					endContent={
						<button
							className="focus:outline-none"
							type="button"
							onClick={toggleVisibility}
						>
							{isVisible ? (
								<IoMdEyeOff className="text-default-400 pointer-events-none" />
							) : (
								<IoMdEye className="text-default-400 pointer-events-none" />
							)}
						</button>
					}
					type={isVisible ? "text" : "password"}
					className="max-w-xs"
				/>

				<Button color="secondary" variant="solid" fullWidth>
					Sign In
				</Button>
				<Button
					className="bg-white text-foreground"
					variant="solid"
					fullWidth
					endContent={
						<FcGoogle className="text-default-400 pointer-events-none" />
					}
				>
					Sign In With Google
				</Button>
			</div>
			<Link color="secondary" className="text-center" href="/user" size="sm">
				Don't have an account?
			</Link>
		</>
	);
}
