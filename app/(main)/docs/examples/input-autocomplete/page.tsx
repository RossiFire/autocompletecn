import { DocsLayout, DocsSection } from "../../_components/docs";
import { PreviewCode } from "../../_components/preview-code";
import { InputAutocompleteDemo } from "../_components/input-autocomplete-demo";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Input Autocomplete",
};

const exampleCode = `"use client";

import { Autocomplete } from "@/components/ui/autocomplete";

export function InputAutocomplete() {

	const [value, setValue] = useState("");
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	const onPlaceSelect = (details: PlaceDetails) => {
		setValue(details.formattedAddress ?? "");
	};

  return (
    <Autocomplete
		apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
		placeholder="Type to search..."
		onPlaceSelect={onPlaceSelect}
		onChange={onChange}
		value={value}
		options={{ language: "en", debounceMs: 350 }}
		fetchParams={{ includedPrimaryTypes: ["route"] }}
	/>
  );
}`;

export default function InputAutocompletePage() {
	return (
		<DocsLayout
			title="Input Autocomplete"
			description="Single input Autocomplete for quick address search."
			prev={{
				title: "Auto-fill Form",
				href: "/docs/examples/autofill-form",
			}}
			toc={[
				{ title: "Preview", slug: "preview" },
				{ title: "How it works", slug: "how-it-works" },
			]}
		>
			<DocsSection title="Preview">
				<PreviewCode
					preview={<InputAutocompleteDemo />}
					code={exampleCode}
				/>
			</DocsSection>

			<DocsSection title="How it works">
				When a place is selected, <strong>onPlaceSelect</strong> fires with the full place details. The component handles displaying the selected address in the input automatically.
			</DocsSection>
		</DocsLayout>
	);
}
