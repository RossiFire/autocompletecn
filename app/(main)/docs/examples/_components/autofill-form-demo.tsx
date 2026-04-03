"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
	DemoAutocomplete,
	type MockPlaceDetails,
} from "@/lib/mock-autocomplete";

const addressSchema = z.object({
	street: z
		.string()
		.min(5, "Street must be at least 5 characters.")
		.max(100, "Street must be at most 100 characters."),
	city: z
		.string()
		.min(2, "City must be at least 2 characters.")
		.max(32, "City must be at most 32 characters."),
	country: z
		.string()
		.min(2, "Country must be at least 2 characters.")
		.max(32, "Country must be at most 32 characters."),
	postalCode: z
		.string()
		.min(3, "Postal code must be at least 3 characters.")
		.max(12, "Postal code must be at most 12 characters."),
});

export function AutofillFormDemo() {
	const form = useForm<z.infer<typeof addressSchema>>({
		resolver: zodResolver(addressSchema),
		defaultValues: { street: "", city: "", country: "", postalCode: "" },
		mode: "onChange",
	});
	

	const handlePlaceSelect = (place: MockPlaceDetails) => {
		form.setValue("street", `${place.route ?? ""} ${place.streetNumber ?? ""}`.trim(), { shouldValidate: true });
		form.setValue("city", place.city ?? "");
		form.setValue("country", place.country ?? "");
		form.setValue("postalCode", place.postalCode ?? "");
		form.trigger();
	};

	
	return (
		<form
			onSubmit={form.handleSubmit(() => {})}
			className="mx-auto w-full max-w-lg space-y-4"
		>
			<Controller
				control={form.control}
				name="street"
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid || undefined}>
						<FieldLabel>Street*</FieldLabel>
						<DemoAutocomplete
							onPlaceSelect={handlePlaceSelect}
							placeholder="Type an address..."
							{...field}
						/>
						{fieldState.invalid && (
							<FieldError errors={[fieldState.error]} />
						)}
					</Field>
				)}
			/>
			<div className="flex flex-col gap-3 sm:flex-row">
				<Controller
					control={form.control}
					name="city"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel>City</FieldLabel>
							<Input readOnly placeholder="Auto-filled" {...field} />
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
				<Controller
					control={form.control}
					name="country"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel>Country</FieldLabel>
							<Input readOnly placeholder="Auto-filled" {...field} />
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
				<Controller
					control={form.control}
					name="postalCode"
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid || undefined}>
							<FieldLabel>Postal Code</FieldLabel>
							<Input readOnly placeholder="Auto-filled" {...field} />
							{fieldState.invalid && (
								<FieldError errors={[fieldState.error]} />
							)}
						</Field>
					)}
				/>
			</div>
			<p className="text-xs text-muted-foreground italic">*For this demo, data are mocked. No data are obtained from the Google Maps API. The "powered by google" logo is only for final demonstration purposes.</p>
			<Button
				type="submit"
				disabled={!form.formState.isValid}
				className="w-full"
			>
				Submit
			</Button>
		</form>
	);
}
