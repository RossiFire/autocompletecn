"use client";

import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export function CopyButton({ text, className }: { text: string, className?: string }) {
	
	const { copy, isCopied } = useCopyToClipboard({ resetAfter: 2000 })

	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn("size-7", className)}
			onClick={() => copy(text)}
			aria-label="Copy to clipboard"
		>
			{isCopied ? (
				<Check className="size-3.5 text-green-500" />
			) : (
				<Copy className="text-muted-foreground size-3.5" />
			)}
		</Button>
	);
}
