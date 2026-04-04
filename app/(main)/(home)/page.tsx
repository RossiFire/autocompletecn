import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
	Zap,
	Puzzle,
	ShieldCheck,
	Blocks,
} from "lucide-react";
import { Ripple } from "@/components/ripple";
import { CopyButton } from "../docs/_components/copy-button";
import { Glow } from "@/components/glow";
import { HomepageDemo } from "@/components/homepage-demo";
import { cn } from "@/lib/utils";
import Typewriter from "@/components/type-writer";

const features = [
	{
		icon: ShieldCheck,
		title: "Compliant",
		className: "text-emerald-500",
		description: "Our provided Autocomplete component is compliant with Google Maps API Policies, including 'Provided by Google' branding, text matching highlighting and more.",
	},
	{
		icon: Blocks,
		title: "Shadcn/ui compatible",
		className: "text-blue-500",
		description: "Autocomplete component is fully integrated with Shadcn/ui and react-hook-form, but still with wide customization.",
	},
	{
		icon: Puzzle,
		title: "Composable",
		className: "text-orange-500",
		description: "You can choose whether to use the integrated Autocomplete component or just the useAutocomplete hook for complete control.",
	},
	{
		icon: Zap,
		title: "Powerful",
		className: "text-yellow-500",
		description: "You can benefit the full power of the Google Maps Places API with session tokens, debounced requests, error management and more.",
	},
];

const installCode =
	"npx shadcn@latest add https://autocompletecn.dev/r/autocomplete.json";

const usageCode = `import { Autocomplete } from "@/components/ui/autocomplete";

export function AddressForm() {
  return (
    <Autocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      placeholder="Search for an address..."
      onPlaceSelect={(details) => {
        console.log(details.formattedAddress);
      }}
    />
  );
}`;

export default function HomePage() {
	return (
		<>
			<div className="relative">
				<div className="pointer-events-none absolute inset-x-0 -inset-y-10 overflow-hidden">
					<div
						className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06] z-0"
						style={{
							backgroundImage:
								"linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)",
							backgroundSize: "24px 24px",
						}}
					/>
					<div className="from-background to-background absolute inset-0 bg-linear-to-b via-transparent" />
				</div>

				<section className="container mx-auto flex w-full max-w-6xl flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
					<h1 className="animate-fade-up max-w-4xl text-4xl font-semibold tracking-tight delay-100 sm:text-5xl md:text-6xl">
						<span className="from-foreground via-foreground to-muted-foreground dark:to-accent bg-linear-to-b bg-clip-text text-transparent">
							Google Maps Autocomplete, <br /> made <Typewriter text={["simple", "powerful", "customizable", "compliant"]} speedMs={60}
								deleteSpeedMs={35}
								waitTimeMs={1400}
								initialDelayMs={1000}
							/>
						</span>
					</h1>

					<p className="text-muted-foreground animate-fade-up max-w-2xl text-center leading-relaxed delay-200 sm:text-lg sm:leading-relaxed md:text-xl md:leading-relaxed">
						Ready to use and customizable autocomplete for React.
						<br className="hidden sm:block" />
						Built with Google Maps Places API and Shadcn/UI.
					</p>

					<div className="animate-fade-up flex flex-wrap items-center justify-center gap-3 delay-400 mt-4">
						<Button size="lg" asChild>
							<Link href="/docs">Get Started</Link>
						</Button>
						<Button size="lg" variant="outline" asChild className="github-button relative overflow-hidden">
							<Link
								href="https://github.com/RossiFire/autocompletecn"
								target="_blank"
								rel="noopener noreferrer"
							>
								<span className="relative z-10 flex items-center">
									<svg viewBox="0 0 1024 1024" fill="currentColor" className="size-4 mr-1.5">
										<title>GitHub</title>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
											transform="scale(64)"
										/>
									</svg>
									View on GitHub
								</span>
								<Ripple parent=".github-button" className="bg-muted-foreground/20 dark:bg-muted size-24" />
							</Link>
						</Button>
					</div>
					<Glow glowColor="#4834d4" className="animate-fade-up overflow-hidden h-10 mt-12 hidden md:block">
						<Badge variant="outline" className="gap-1.5 pl-3 h-full text-sm relative z-10 bg-background dark:bg-background">
							{installCode}
							<CopyButton text={usageCode} />
						</Badge>
					</Glow>
				</section>
			</div>
			<section className="container mx-auto max-w-5xl px-6 pt-12 pb-24">
				<div className="animate-fade-up delay-100">
					<HomepageDemo />
				</div>
			</section>

			<section className="container mx-auto max-w-6xl px-6 pb-24">
				<h2 className="animate-fade-up text-center text-3xl font-semibold tracking-tight delay-100">
					Everything you need
				</h2>
				<p className="text-muted-foreground animate-fade-up mx-auto mt-3 max-w-xl text-center text-lg delay-200">
					A complete autocomplete solution designed for everyone.
				</p>

				<div className="animate-fade-in mt-12 grid grid-cols-1 gap-5 delay-300 sm:grid-cols-2">
					{features.map((feature) => (
						<Card key={feature.title} className={"flex flex-col gap-3 p-6"}>
							<feature.icon className={cn("text-muted-foreground size-5", feature.className)} />
							<h3 className="text-sm font-semibold">{feature.title}</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{feature.description}
							</p>
						</Card>
					))}
				</div>
			</section>
			<Footer />
		</>
	);
}
