// fonts
import localFont from "next/font/local";
import { Roboto, Roboto_Mono, Roboto_Serif } from "next/font/google";

// fonts
const roboto = Roboto({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
});

const roboto_mono = Roboto_Mono({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
});

const roboto_serif = Roboto_Serif({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
});

const berlin = localFont({
	src: "./fonts/Berlin Sans FB Demi Bold.ttf",
	display: "swap",
});

export { roboto, roboto_mono, roboto_serif, berlin };
