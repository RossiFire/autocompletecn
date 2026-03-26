import { codeToHtml } from "shiki";

export async function highlightCode(
	code: string,
	language = "tsx"
): Promise<string> {
	return codeToHtml(code, {
		lang: language,
		themes: {
			light: "github-light",
			dark: "github-dark",
		},
	});
}
