"use client";
import { AppConfig } from "@/utils/AppConfig";
import Image from "next/image";
import { berlin } from "@/styles/fonts";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center px-12 lg:px-24">
			<main className="flex flex-col max-w-[1000px]">
				<div className="hero bg-base-200 flex">
					<div className="hero-content flex flex-col lg:flex-row-reverse justify-content items-center py-20">
						<Image
							src="/assets/mitm_logo.svg"
							width={250}
							height={250}
							alt="Meet In The Middle Logo"
							className="w-full hidden sm:block"
						/>
						<div className="w-full flex gap-3 flex-col">
							<h1
								className={`text-5xl font-bold text-primary ${berlin.className}`}
							>
								{AppConfig.title}
							</h1>
							<p className="py-6">{AppConfig.description}</p>
							<Link href="/user/" className="w-fit self-end">
								<Button color="secondary" variant="ghost" size="lg">
									Get Started
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
