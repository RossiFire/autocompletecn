import { DocsLayout, DocsSection } from "../../_components/docs";
import { PreviewCode } from "../../_components/preview-code";
import { InputAutocompleteDemo } from "../_components/input-autocomplete-demo";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Input Autocomplete",
};

const exampleCode = `"use client";

import { useState } from "react";
import { Autocomplete } from "@/components/ui/autocomplete";
import type { PlaceDetails } from "@/hooks/use-autocomplete";

export function InputAutocomplete() {

  return (
    <Autocomplete
		apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
		placeholder="Type to search..."
		output="formatted"
		setupOptions={{ 
			language: 'en', 
			libraries: ['places'],
			debounceMs: 350,
		}}
	/>
  );
}`;

export default function InputAutocompletePage() {
	return (
		<DocsLayout
			title="Input Autocomplete"
			description="Single input Autocomplete with formatted address output."
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
				When a place is selected, <strong>onPlaceSelect</strong> fires, and because the <strong>output</strong> is set to <code className="rounded bg-muted px-1.5 py-0.5 text-sm">"formatted"</code>, the input value is automatically set to the formatted address.
			</DocsSection>
		</DocsLayout>
	);
}
