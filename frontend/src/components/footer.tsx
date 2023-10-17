import { AppConfig } from "@/utils/AppConfig";
import Image from "next/image";
import { IoMdHeart } from "react-icons/io";

export default function Footer() {
	return (
		<>
			<footer className="bg-primary text-white py-6 flex justify-center items-center hidden md:block">
				<div className="flex justify-center items-center w-full">
					<Image
						src="/assets/logo-condensed.svg"
						width={15}
						height={15}
						alt="M"
					/>
					<p>eet In The Middle - {AppConfig.short_description}</p>
				</div>
			</footer>
		</>
	);
}
