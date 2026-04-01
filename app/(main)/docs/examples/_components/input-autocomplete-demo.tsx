"use client";
import { DemoAutocomplete } from "@/lib/mock-autocomplete";
import { Field, FieldLabel } from "@/components/ui/field";

export function InputAutocompleteDemo() {


	return (
		<div className="mx-auto w-full max-w-lg space-y-4">
			<Field>
				<FieldLabel>Search location</FieldLabel>
				<DemoAutocomplete
					output="formatted"
					placeholder="Type to search..."
				/>
			</Field>
			<p className="text-xs text-muted-foreground italic">*For this demo, data are mocked. No data are obtained from the Google Maps API. The "powered by google" logo is only for final demonstration purposes.</p>
		</div>
	);
}
