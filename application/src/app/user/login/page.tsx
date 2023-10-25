"use client";

import React from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { MdEmail } from "react-icons/md";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { berlin } from "@/styles/fonts";
import { Metadata } from "next";

export default function Login() {
	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<>
			<div className="w-full text-sm bg-primary rounded-2xl flex flex-col flex-1 grow">
				<div className="gap-4 p-5 flex items-center justify-stretch flex-col flex-1 grow">
					<h1 className={`text-white text-4xl py-5 ${berlin.className}`}>
						Sign In
					</h1>

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
				<Button
					className="bg-white text-foreground md:hidden align-center py-5"
					variant="solid"
					fullWidth
				>
					<p className="pt-5">
						Don't have an account?{" "}
						<span className="text-secondary">Sign Up</span>
					</p>
				</Button>
			</div>

			<Link
				className="text-secondary text-center hidden md:block"
				href="/user/register"
				size="sm"
			>
				Don't have an account? Sign Up
			</Link>
		</>
	);
}
