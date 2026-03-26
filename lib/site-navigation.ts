import { BookOpen, CornerDownRight, type LucideIcon } from "lucide-react";

export interface SiteNavigationItem {
	title: string;
	href: string;
	icon: LucideIcon;
}

export interface SiteNavigationGroup {
	title: string;
	items: SiteNavigationItem[];
}

export const docsNavigation: SiteNavigationGroup[] = [
	{
		title: "Basics",
		items: [
			{ title: "Getting Started", href: "/docs", icon: BookOpen },
			{ title: "Installation", href: "/docs/installation", icon: BookOpen },
		],
	},
];

const navItems: SiteNavigationItem[] = [
	{ title: "Home", href: "/", icon: CornerDownRight },
	{ title: "Docs", href: "/docs", icon: CornerDownRight },
];

export const siteNavigation: SiteNavigationGroup[] = [
	{
		title: "Pages",
		items: navItems,
	},
	...docsNavigation,
];
