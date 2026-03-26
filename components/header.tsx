import { Logo } from "@/components/logo";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Separator } from "@/components/ui/separator";
import { GitHubButton } from "@/components/github-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Header({ className }: { className?: string }) {
	return (
		<header
			className={cn("bg-background sticky top-0 z-50 h-14 w-full", className)}
		>
			<nav className="container flex size-full items-center">
				<MobileNav />
				<Logo className="mr-3 hidden shrink-0 lg:flex" />
				<MainNav className="hidden lg:flex" />

				<div className="ml-auto flex h-4.5 items-center gap-2">
					<GitHubButton />
					<Separator orientation="vertical" />
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
