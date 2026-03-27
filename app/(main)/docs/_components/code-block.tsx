import { highlightCode } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

interface CodeBlockProps {
	code: string;
	language?: string;
	showCopyButton?: boolean;
}

export async function CodeBlock({
	code,
	language = "tsx",
	showCopyButton = true,
}: CodeBlockProps) {
	const highlighted = await highlightCode(code, language);

	return (
		<div className="w-full overflow-hidden rounded-lg border relative bg-muted/50">
			{showCopyButton && (
				<CopyButton text={code} className="absolute top-3 right-3" />
			)}
			<div
				className="overflow-auto bg-muted/20 p-4 text-sm [&_pre]:bg-transparent! [&_code]:bg-transparent!"
				dangerouslySetInnerHTML={{ __html: highlighted }}
			/>
		</div>
	);
}
