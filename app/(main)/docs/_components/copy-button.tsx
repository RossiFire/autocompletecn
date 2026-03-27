"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({ text, className }: { text: string, className?: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(async () => {
		await navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [text]);

	return (
		<Button
			variant="ghost"
			size="icon"
			className={cn("size-7", className)}
			onClick={handleCopy}
			aria-label="Copy to clipboard"
		>
			{copied ? (
				<Check className="size-3.5 text-green-500" />
			) : (
				<Copy className="text-muted-foreground size-3.5" />
			)}
		</Button>
	);
}
