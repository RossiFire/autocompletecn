"use client";

import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({ text }: { text: string }) {
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
			className="size-7"
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
