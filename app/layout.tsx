import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "./globals.css";
import { allowIndexing } from "@/lib/indexing";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
	),
	title: {
		default: "autocompletecn",
		template: "%s - autocompletecn",
	},
	description:
		"Google Maps Autocomplete for the shadcn ecosystem. A ready-to-use, customizable autocomplete component and hook for React.",
	keywords: [
		"google maps",
		"autocomplete",
		"shadcn",
		"react",
		"nextjs",
		"tailwind",
		"places api",
	],
	authors: [
		{ 
			name: "dnaiele", 
			url: "https://danielerossino.com",
		}
	],
	creator: "dnaiele",
	...allowIndexing(),	
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
			<body className="bg-background font-sans antialiased">
				<ThemeProvider>
					<TooltipProvider>{children}</TooltipProvider>
				</ThemeProvider>
				{process.env.environment === "production" && <Script defer src={process.env.ANALYTICS_SCRIPT_SRC} data-website-id={process.env.ANALYTICS_SCRIPT_ID}></Script>}
			</body>
		</html>
	);
}
