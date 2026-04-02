"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

interface PreviewCodeExpanderProps {
	code: string;
	highlightedHtml: string;
}

export function PreviewCodeExpander({
	code,
	highlightedHtml,
}: PreviewCodeExpanderProps) {
	const [expanded, setExpanded] = useState(false);

	return (
		<div className="relative border-t">
			<div
				className={cn(
					"overflow-hidden transition-[max-height] duration-300 ease-in-out",
					expanded ? "max-h-[2000px]" : "max-h-32"
				)}
			>
				<div className="relative">
					{(expanded && <CopyButton
						text={code}
						className="absolute top-3 right-3 z-10"
					/>)}
					<div
						className="overflow-auto bg-muted/20 p-4 text-sm [&_pre]:bg-transparent! [&_code]:bg-transparent!"
						dangerouslySetInnerHTML={{ __html: highlightedHtml }}
					/>
				</div>
			</div>

			{!expanded && (
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
			)}

			<div
				className={cn(
					"flex items-center justify-center py-2 bg-muted/20",
					!expanded && "absolute inset-x-0 bottom-0"
				)}
			>
				<Button
					variant="outline"
					size="sm"
					onClick={() => setExpanded(!expanded)}
					className="pointer-events-auto z-10 text-xs"
				>
					{expanded ? "Collapse" : "View Code"}
				</Button>
			</div>
		</div>
	);
}
