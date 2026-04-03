"use client";
import { DemoAutocomplete, type MockPlaceDetails } from "@/lib/mock-autocomplete";
import { Field, FieldLabel } from "@/components/ui/field";
import { useState } from "react";

export function InputAutocompleteDemo() {

	const [value, setValue] = useState("");
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	const onPlaceSelect = (details: MockPlaceDetails) => {
		setValue(details.formattedAddress ?? "");
	};
	return (
		<div className="mx-auto w-full max-w-lg space-y-4">
			<Field>
				<FieldLabel>Search location</FieldLabel>
				<DemoAutocomplete
					onPlaceSelect={onPlaceSelect}
					onChange={onChange}
					value={value}
					placeholder="Type to search..."
				/>
			</Field>
			<p className="text-xs text-muted-foreground italic">*For this demo, data are mocked. No data are obtained from the Google Maps API. The "powered by google" logo is only for final demonstration purposes.</p>
		</div>
	);
}
