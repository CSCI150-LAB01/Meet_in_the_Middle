import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	darkMode: "class",
	plugins: [nextui({
		themes: {
			light: {
				colors: {
					primary: {
						DEFAULT: "#5FA788",
						foreground: "#fff",
					},
					secondary: {
						foreground: "#9C76AC4"
					},
				focus: "#9C76AC4",
				},
			},
		}
	})],
};
export default config;
