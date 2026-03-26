import { Zap, Code, Puzzle, Box, Keyboard, Globe } from "lucide-react";
import { DocsLayout, DocsSection, DocsLink } from "./_components/docs";
import type { Metadata } from "next";

const features = [
	{
		icon: Zap,
		title: "Quick Setup",
		description:
			"Install with a single shadcn CLI command. Works with any project that has shadcn/ui set up.",
	},
	{
		icon: Code,
		title: "TypeScript",
		description:
			"Full type safety with comprehensive TypeScript support and Google Maps types.",
	},
	{
		icon: Puzzle,
		title: "Composable",
		description:
			"Use the full component or just the hook for complete control over the UI.",
	},
	{
		icon: Box,
		title: "Copy & Paste",
		description:
			"Own your code. No heavy dependencies, just copy into your project and customize.",
	},
	{
		icon: Keyboard,
		title: "Accessible",
		description:
			"Full keyboard navigation, ARIA attributes, and screen reader support.",
	},
	{
		icon: Globe,
		title: "Google Places API",
		description:
			"Powered by the Google Maps Places API with session tokens and debounced requests.",
	},
];

export const metadata: Metadata = {
	title: "Getting Started",
};

export default function GettingStartedPage() {
	return (
		<DocsLayout
			title="Getting Started"
			description="Google Maps autocomplete for the shadcn ecosystem."
			next={{ title: "Installation", href: "/docs/installation" }}
			toc={[
				{ title: "Why autocompletecn?", slug: "why-autocompletecn" },
				{ title: "Two Ways to Use", slug: "two-ways-to-use" },
				{ title: "Features", slug: "features" },
			]}
		>
			<DocsSection title="Why autocompletecn?">
				<p>
					Integrating Google Maps autocomplete into a React project typically
					involves dealing with the Google Maps JavaScript API, managing session
					tokens, handling async script loading, and building an accessible
					dropdown UI. <strong>autocompletecn</strong> handles all of this for
					you.
				</p>
				<p>
					It follows the{" "}
					<DocsLink href="https://ui.shadcn.com/" external>
						shadcn/ui
					</DocsLink>{" "}
					philosophy: you own the code. The component and hook are copied
					directly into your project via the shadcn CLI, giving you full control
					to customize as needed.
				</p>
			</DocsSection>

			<DocsSection title="Two Ways to Use">
				<p>
					<strong>autocompletecn</strong> gives you two options depending on your
					needs:
				</p>
				<ul>
					<li>
						<strong>Autocomplete component</strong> &mdash; A fully styled,
						accessible autocomplete input with a dropdown listbox, keyboard
						navigation, and Google branding. Install it and drop it into your
						forms.
					</li>
					<li>
						<strong>useAutocomplete hook</strong> &mdash; Just the logic. Get
						suggestions, place details, and session token management without any
						UI. Build your own custom autocomplete experience on top of it.
					</li>
				</ul>
			</DocsSection>

			<DocsSection title="Features">
				<div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2">
					{features.map((feature) => (
						<div
							key={feature.title}
							className="flex items-start gap-3 rounded-lg border p-4"
						>
							<feature.icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
							<div>
								<p className="text-foreground text-sm font-medium">
									{feature.title}
								</p>
								<p className="text-muted-foreground mt-1 text-sm leading-relaxed">
									{feature.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</DocsSection>
		</DocsLayout>
	);
}
