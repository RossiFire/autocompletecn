import { SidebarProvider } from "@/components/ui/sidebar";
import { DocsSidebar } from "./_components/docs-sidebar";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="container flex flex-1 flex-col">
			<SidebarProvider>
				<DocsSidebar />
				<main className="size-full">{children}</main>
			</SidebarProvider>
		</div>
	);
}
