import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocsToc } from "./docs-toc";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function slugify(text: string): string {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

interface TocItem {
	title: string;
	slug: string;
}

interface DocsTitleProps {
	title: string;
	description: string;
}

function DocsTitle({ title, description }: DocsTitleProps) {
	return (
		<div className="space-y-3">
			<h1 className="text-foreground text-3xl font-semibold tracking-tight">
				{title}
			</h1>
			<p className="text-muted-foreground text-base leading-relaxed">
				{description}
			</p>
		</div>
	);
}

interface DocsLayoutProps {
	title: string;
	description: string;
	children: React.ReactNode;
	prev?: { title: string; href: string };
	next?: { title: string; href: string };
	toc?: TocItem[];
}

export function DocsLayout({
	title,
	description,
	children,
	prev,
	next,
	toc = [],
}: DocsLayoutProps) {
	return (
		<div className="flex">
			<div className="mx-auto min-w-0 max-w-[800px] flex-1 pb-20 pt-12 lg:px-4">
				<DocsTitle title={title} description={description} />
				<div className="mt-12 space-y-12">{children}</div>
				{(prev || next) && (
					<div className="mt-16 flex items-center justify-between gap-4">
						{prev ? (
							<Button
								variant="ghost"
								size="sm"
								asChild
								className="-ml-2 h-auto py-2"
							>
								<Link href={prev.href}>
									<ChevronLeft /> {prev.title}
								</Link>
							</Button>
						) : (
							<div />
						)}
						{next && (
							<Button
								variant="ghost"
								size="sm"
								asChild
								className="-mr-2 h-auto py-2"
							>
								<Link href={next.href}>
									{next.title} <ChevronRight />
								</Link>
							</Button>
						)}
					</div>
				)}
			</div>

			<aside className="hidden w-44 shrink-0 xl:block">
				<nav className="sticky top-24">
					{toc.length > 0 && <DocsToc items={toc} />}
				</nav>
			</aside>
		</div>
	);
}

interface DocsSectionProps {
	title?: string;
	children: React.ReactNode;
}

export function DocsSection({ title, children }: DocsSectionProps) {
	const id = title ? slugify(title) : undefined;
	return (
		<section className="scroll-m-24 space-y-5" id={id}>
			{title && (
				<h2 className="text-foreground text-xl font-semibold tracking-tight">
					{title}
				</h2>
			)}
			<div className="text-foreground/80 space-y-4 text-base leading-7 [&_em]:text-muted-foreground [&_li]:leading-7 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:leading-7 [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
				{children}
			</div>
		</section>
	);
}

interface DocsNoteProps {
	children: React.ReactNode;
}

export function DocsNote({ children }: DocsNoteProps) {
	return (
		<div className="rounded-lg border bg-muted/30 px-5 py-4 text-[14px] leading-relaxed text-foreground/70 [&_strong]:font-medium [&_strong]:text-foreground">
			{children}
		</div>
	);
}

interface DocsLinkProps {
	href: string;
	children: React.ReactNode;
	external?: boolean;
}

export function DocsLink({ href, children, external }: DocsLinkProps) {
	return (
		<Link
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			className="text-foreground font-medium underline underline-offset-4 transition-colors"
		>
			{children}
		</Link>
	);
}

export function DocsCode({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<code
			className={cn(
				"relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
				className
			)}
		>
			{children}
		</code>
	);
}
