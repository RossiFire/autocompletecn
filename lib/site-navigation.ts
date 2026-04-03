import { Book, CornerDownRight, FileText, FlaskConical, RefreshCcw, Wrench, type LucideIcon } from "lucide-react";

export interface SiteNavigationItem {
	title: string;
	href: string;
	icon?: LucideIcon;
}

export interface SiteNavigationGroup {
	title: string;
	items: SiteNavigationItem[];
}

export const docsNavigation: SiteNavigationGroup[] = [
	{
		title: "Basics",
		items: [
			{ title: "Getting Started", href: "/docs", icon: Book },
			{ title: "Installation", href: "/docs/installation", icon: Wrench },
			{ title: "API Reference", href: "/docs/api-reference", icon: FileText },
			{ title: "Session Token", href: "/docs/session-token", icon: RefreshCcw },
		],
	},
	{
		title: "Examples",
		items: [
			{ title: "Auto-fill Form", href: "/docs/examples/autofill-form" },
			{ title: "Input Autocomplete", href: "/docs/examples/input-autocomplete" },
		],
	},
];

const navItems: SiteNavigationItem[] = [
	{ title: "Home", href: "/", icon: CornerDownRight },
	{ title: "Docs", href: "/docs", icon: CornerDownRight },
	{ title: "Examples", href: "/docs/examples/autofill-form", icon: FlaskConical },

];

export const siteNavigation: SiteNavigationGroup[] = [
	{
		title: "Pages",
		items: navItems,
	},
	...docsNavigation,
];
