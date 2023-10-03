import { AppConfig } from "@/utils/AppConfig";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center px-12 lg:px-24 py-12">
			<main className="flex flex-col max-w-[1000px]">
				<div className="hero">
					<h1>{AppConfig.title}</h1>
					<p>{AppConfig.description}</p>
				</div>
				<div className="features" id="features">
					<h1>Features</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>

				<div className="Contact" id="Contact">
					<h1>Contact Us</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
			</main>
		</div>
	);
}
