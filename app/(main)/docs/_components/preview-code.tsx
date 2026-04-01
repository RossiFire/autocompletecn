import { highlightCode } from "@/lib/highlight";
import { PreviewCodeExpander } from "./preview-code-expander";

interface PreviewCodeProps {
	preview: React.ReactNode;
	code: string;
	language?: string;
}

export async function PreviewCode({
	preview,
	code,
	language = "tsx",
}: PreviewCodeProps) {
	const highlighted = await highlightCode(code, language);

	return (
		<div className="w-full overflow-hidden rounded-lg border">
			<div className="flex min-h-[350px] items-center justify-center p-6 sm:p-10">
				{preview}
			</div>

			<PreviewCodeExpander code={code} highlightedHtml={highlighted} />
		</div>
	);
}
