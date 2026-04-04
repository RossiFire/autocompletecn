import { DocsLayout, DocsSection } from "../../_components/docs";
import { PreviewCode } from "../../_components/preview-code";
import { AutofillFormDemo } from "../_components/autofill-form-demo";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Auto-fill Form",
	description: "An address form that auto-fills city, country, and postal code when a street is selected.",
};

const exampleCode = `"use client";

import { Autocomplete } from "@/components/ui/autocomplete";
import type { PlaceDetails } from "@/hooks/use-autocomplete";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const addressSchema = z.object({
  street: z.string().min(5).max(100),
  city: z.string().min(2),
  country: z.string().min(2),
  postalCode: z.string().min(3),
});

export function AutofillForm() {
  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: { street: "", city: "", country: "", postalCode: "" },
    mode: "onChange",
  });

  const handlePlaceSelect = (place: PlaceDetails) => {
    form.setValue("street", \`\${place.route} \${place.streetNumber}\` ?? "");
    form.setValue("city", place.city ?? "");
    form.setValue("country", place.country ?? "");
    form.setValue("postalCode", place.postalCode ?? "");
    form.trigger();
  };

  return (
    <form onSubmit={form.handleSubmit(console.log)} className="space-y-4">
      <div>
        <Label>Street</Label>
        <Controller
          control={form.control}
          name="street"
          render={({ field }) => (
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
              onPlaceSelect={handlePlaceSelect}
              placeholder="Type an address..."
              fetchParams={{ includedPrimaryTypes: ["route"] }}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Label>City</Label>
          <Input readOnly placeholder="Auto-filled" {...form.register("city")} />
        </div>
        <div className="flex-1">
          <Label>Country</Label>
          <Input readOnly placeholder="Auto-filled" {...form.register("country")} />
        </div>
        <div className="flex-1">
          <Label>Postal Code</Label>
          <Input readOnly placeholder="Auto-filled" {...form.register("postalCode")} />
        </div>
      </div>

      <Button type="submit" disabled={!form.formState.isValid} className="w-full">
        Submit
      </Button>
    </form>
  );
}`;

export default function AutofillFormPage() {
	return (
		<DocsLayout
			title="Auto-fill Form"
			description="An address form that auto-fills city, country, and postal code when a street is selected."
			prev={{ title: "Session Token", href: "/docs/session-token" }}
			next={{
				title: "Input Autocomplete",
				href: "/docs/examples/input-autocomplete",
			}}
			toc={[
				{ title: "Preview", slug: "preview" },
				{ title: "How it works", slug: "how-it-works" },
			]}
		>
			<DocsSection title="Preview">
				<PreviewCode
					preview={<AutofillFormDemo />}
					code={exampleCode}
				/>
			</DocsSection>

			<DocsSection title="How it works">
				<ol>
					<li>
						The <strong>street</strong> field uses the{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 text-sm">
							Autocomplete
						</code>{" "}
						component connected to <strong>react-hook-form</strong> via a{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 text-sm">
							Controller
						</code>
						.
					</li>
					<li>
						When a place is selected, <strong>onPlaceSelect</strong> fires and
						uses{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 text-sm">
							form.setValue
						</code>{" "}
						to fill the remaining fields automatically.
					</li>
					<li>
						The <strong>city</strong>, <strong>country</strong>, and{" "}
						<strong>postal code</strong> inputs are read-only — they only update
						via the place selection callback.
					</li>
					<li>
						<strong>Zod</strong> validates the entire form. The submit button
						stays disabled until all fields pass validation.
					</li>
				</ol>
			</DocsSection>
		</DocsLayout>
	);
}
