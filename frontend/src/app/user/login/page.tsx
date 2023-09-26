"use client";

import React from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { MdEmail, MdKey } from "react-icons/md";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
	const [isVisible, setIsVisible] = React.useState(false);

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<>
			<p>Sign In</p>

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

			<Button color="primary" variant="solid" fullWidth>
				Sign In
			</Button>
			<Button
				color="primary"
				variant="bordered"
				fullWidth
				endContent={
					<FcGoogle className="text-default-400 pointer-events-none" />
				}
			>
				Sign In With Google
			</Button>

			<Link
				color="secondary"
				className="w-full text-center"
				href="/user"
				size="sm"
			>
				Don't have an account?
			</Link>
		</>
	);
}
