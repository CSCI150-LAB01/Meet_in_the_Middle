"use client";

import React from "react";
import { Input, Button, Link } from "@nextui-org/react";
import { MdEmail, MdKey } from "react-icons/md";

export default function Login() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-between p-24 w-full">
			<div className="max-w-xs w-full h-lg flex items-center justify-between font-mono text-sm flex-col gap-4">
				<p>Sign Up</p>

				<div className="flex-row w-full flex gap-2">
					<Input type="firstName" label="First Name" />
					<Input type="lastName" label="Last Name" />
				</div>

				<Input
					type="email"
					label="Email"
					placeholder="Enter your email"
					endContent={<MdEmail />}
				/>
				<Input
					type="password"
					label="Password"
					placeholder="*********"
					endContent={<MdKey />}
				/>

				<Button color="primary" variant="solid" fullWidth>
					Sign Up
				</Button>
				<Button color="primary" variant="solid" fullWidth>
					Sign Up With Google
				</Button>

				<Link
					color="primary"
					className="w-full text-center"
					href="#login"
					size="sm"
				>
					Already have an account?
				</Link>
			</div>
		</div>
	);
}
