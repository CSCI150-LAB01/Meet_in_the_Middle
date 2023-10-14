"use client";
import { berlin } from "@/styles/fonts";
import { Input } from "@nextui-org/react";
import { MdOutlineSearch } from "react-icons/md";

export default function Friends() {
	return (
		<main className="flex justify-center flex-col px-5 w-full gap-y-2">
			{/* Change color back to gray */}
			<h1
				className={`text-3xl ${berlin.className} text-primary text-center sm:text-left`}
			>
				Find Friends
			</h1>
			<Input
				classNames={{
					base: "sm:max-w-[500px] h-10",
					mainWrapper: "w-full h-full",
					input: "text-small",
					inputWrapper:
						"h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
				}}
				placeholder="Search an email or name..."
				size="sm"
				startContent={<MdOutlineSearch />}
				type="search"
				variant="bordered"
				color="primary"
			/>
		</main>
	);
}
