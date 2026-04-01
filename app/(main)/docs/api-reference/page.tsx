import {
	DocsCode,
	DocsLayout,
	DocsNote,
	DocsSection,
} from "../_components/docs";
import { CodeBlock } from "../_components/code-block";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "API Reference",
};

function PropTable({
	items,
}: {
	items: {
		name: string;
		type: string;
		default?: string;
		description: string;
	}[];
}) {
	return (
		<div className="not-prose overflow-x-auto rounded-lg border">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b bg-muted/30">
						<th className="px-4 py-2.5 text-left font-medium">Prop</th>
						<th className="px-4 py-2.5 text-left font-medium">Type</th>
						<th className="px-4 py-2.5 text-left font-medium">Default</th>
						<th className="px-4 py-2.5 text-left font-medium">Description</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr key={item.name} className="border-b last:border-0">
							<td className="px-4 py-2.5 align-top">
								<code className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">
									{item.name}
								</code>
							</td>
							<td className="text-muted-foreground px-4 py-2.5 align-top font-mono text-xs">
								{item.type}
							</td>
							<td className="text-muted-foreground px-4 py-2.5 align-top text-xs">
								{item.default ?? "—"}
							</td>
							<td className="text-foreground/80 px-4 py-2.5 align-top text-xs leading-relaxed">
								{item.description}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

const autocompleteProps = [
	{
		name: "apiKey",
		type: "string",
		description:
			"Your Google Maps API key with the Places API (New) enabled.",
	},
	{
		name: "setupOptions",
		type: "UseAutocompleteOptions",
		description:
			"Options passed during Google Maps API setup (language, region, libraries, etc.).",
	},
	{
		name: "requestOptions",
		type: "RequestOptions",
		description:
			"Options passed to every autocomplete suggestion request (e.g. includedPrimaryTypes, locationBias).",
	},
	{
		name: "output",
		type: '"routeOnly" | "formatted"',
		default: '"routeOnly"',
		description:
			'Controls the value written to the input after a place is selected. "routeOnly" shows street name and number (e.g. "123 Main St"), "formatted" shows the full address.',
	},
	{
		name: "onPlaceSelect",
		type: "(details: PlaceDetails) => void",
		description:
			"Callback fired when a place is selected. Receives parsed place details including street, city, country, postal code, coordinates, and the raw Google Place object.",
	},
	{
		name: "debounceMs",
		type: "number",
		default: "200",
		description:
			"Debounce delay in milliseconds before fetching suggestions. Helps reduce API calls and improve UX.",
	},
	{
		name: "...props",
		type: 'React.ComponentProps<"input">',
		description:
			"All standard HTML input attributes are forwarded to the underlying Input component (placeholder, disabled, className, etc.).",
	},
];

const hookParams = [
	{
		name: "apiKey",
		type: "string",
		description: "Your Google Maps API key with the Places API (New) enabled.",
	},
	{
		name: "apiOptions",
		type: "UseAutocompleteOptions",
		description:
			"Optional configuration for the Google Maps API loader and autocomplete behavior.",
	},
];

const hookOptions = [
	{
		name: "debounceMs",
		type: "number",
		default: "200",
		description:
			"Debounce delay in milliseconds before fetching suggestions.",
	},
	{
		name: "sessionToken",
		type: "AutocompleteSessionToken",
		description:
			"An external session token. If not provided, one is created and managed automatically.",
	},
	{
		name: "...loaderOptions",
		type: "Omit<APIOptions, 'key'>",
		description:
			"Any additional options supported by @googlemaps/js-api-loader.",
	},
];

const hookReturn = [
	{
		name: "isLoaded",
		type: "boolean",
		description:
			"Whether the Google Maps Places library has finished loading.",
	},
	{
		name: "isStale",
		type: "boolean",
		description:
			"True while new suggestions are being fetched (useful for loading indicators).",
	},
	{
		name: "error",
		type: "Error | null",
		description: "Error from the last suggestion fetch, or null.",
	},
	{
		name: "places",
		type: "PlacePrediction[] | undefined",
		description:
			"The current list of autocomplete suggestions. Undefined before any request is made.",
	},
	{
		name: "getSuggestions",
		type: "(input: string, requestOptions?: RequestOptions) => void",
		description:
			"Fetches autocomplete suggestions for the given input string. Automatically debounced.",
	},
	{
		name: "getPlaceDetails",
		type: "(prediction: PlacePrediction) => Promise<PlaceDetails>",
		description:
			"Fetches full place details for a prediction. Refreshes the session token after each call to keep API costs efficient.",
	},
	{
		name: "autocomplete",
		type: "<T>(field: T, requestOptions?) => T & { onChange }",
		description:
			"Spread helper for react-hook-form. Wraps a field's onChange to trigger getSuggestions automatically.",
	},
];

const placeDetailsFields = [
	{
		name: "formattedAddress",
		type: "string | null",
		description: "The full formatted address string.",
	},
	{
		name: "streetNumber",
		type: "string | null",
		description: 'The street number (from "street_number" address component).',
	},
	{
		name: "route",
		type: "string | null",
		description: 'The street name (from "route" address component).',
	},
	{
		name: "city",
		type: "string | null",
		description: 'The city name (from "locality" address component).',
	},
	{
		name: "province",
		type: "string | null",
		description:
			'The province/state short text (from "administrative_area_level_2").',
	},
	{
		name: "region",
		type: "string | null",
		description:
			'The region/state long text (from "administrative_area_level_1").',
	},
	{
		name: "country",
		type: "string | null",
		description: 'The country name (from "country" address component).',
	},
	{
		name: "postalCode",
		type: "string | null",
		description: 'The postal/zip code (from "postal_code" address component).',
	},
	{
		name: "location",
		type: "LatLngLiteral | null",
		description:
			"The geographic coordinates of the place ({ lat, lng }).",
	},
	{
		name: "placeId",
		type: "string",
		description: "The Google Place ID of the selected prediction.",
	},
	{
		name: "place",
		type: "google.maps.places.Place",
		description:
			"The raw Google Maps Place object with all fetched fields.",
	},
];

const requestOptionsFields = [
	{
		name: "includedPrimaryTypes",
		type: "string[]",
		description: 'Restrict results to specific place types (e.g. ["route"], ["address"], ["establishment"]).',
	},
	{
		name: "includedRegionCodes",
		type: "string[]",
		description: 'Restrict results to specific countries/regions (e.g. ["us", "ca"]).',
	},
	{
		name: "locationBias",
		type: "LocationBias",
		description: "Bias results toward a specific location (circle, rectangle, or LatLng).",
	},
	{
		name: "locationRestriction",
		type: "LocationRestriction",
		description: "Restrict results to a specific geographic area.",
	},
	{
		name: "inputOffset",
		type: "number",
		description: " zero-based Unicode character offset of input indicating the cursor position in input.",
	},
	{
		name: "origin",
		type: "google.maps.LatLng | google.maps.LatLngLiteral | undefined",
		description: " The origin point from which to calculate geodesic distance.",
	},
];

const autocompleteHelperCode = `const { places, autocomplete } = useAutocomplete(apiKey);

// With react-hook-form
<Controller
  control={form.control}
  name="street"
  render={({ field }) => (
    <Input {...autocomplete(field, { includedPrimaryTypes: ["route"] })} />
	<p>Output: {places.length || 0}</p>
  )}
/>`;

const getSuggestionsCode = `const { getSuggestions, places } = useAutocomplete(apiKey);

// Basic usage
getSuggestions("1600 Amphitheatre");

// With request options
getSuggestions("1600 Amphitheatre", {
  includedPrimaryTypes: ["route"],
  includedRegionCodes: ["us"],
});`;

const getPlaceDetailsCode = `const { getPlaceDetails } = useAutocomplete(apiKey);

const handleSelect = async (prediction: PlacePrediction) => {
  const details = await getPlaceDetails(prediction);

  console.log(details.formattedAddress);
  console.log(details.city, details.country);
  console.log(details.location); // { lat, lng }
  console.log(details.place);    // raw Place object
};`;

export default function ApiReferencePage() {
	return (
		<DocsLayout
			title="API Reference"
			description="Complete reference for the Autocomplete component and useAutocomplete hook."
			prev={{ title: "Installation", href: "/docs/installation" }}
			next={{ title: "Auto-fill Form", href: "/docs/examples/autofill-form" }}
			toc={[
				{ title: "Autocomplete", slug: "autocomplete" },
				{ title: "useAutocomplete()", slug: "useautocomplete" },
				{ title: "UseAutocompleteOptions", slug: "useautocompleteoptions" },
				{ title: "Return Value", slug: "return-value" },
				{ title: "PlaceDetails", slug: "placedetails" },
				{ title: "RequestOptions", slug: "requestoptions" },
				{ title: "getSuggestions()", slug: "getsuggestions" },
				{ title: "getPlaceDetails()", slug: "getplacedetails" },
				{ title: "autocomplete()", slug: "autocomplete-1" },
			]}
		>
			{/* ------------------------------------------------------------ */}
			{/* Autocomplete component                                       */}
			{/* ------------------------------------------------------------ */}

			<DocsSection title="Autocomplete">
				<p>
					The <DocsCode>{"<Autocomplete />"}</DocsCode> component is a drop-in
					Google Maps address input. It wraps a shadcn/ui <DocsCode>Input</DocsCode>{" "}
					with a <DocsCode>Popover</DocsCode> listbox, keyboard navigation, and
					the <DocsCode>useAutocomplete</DocsCode> hook internally.
				</p>

				<PropTable items={autocompleteProps} />

				<DocsNote>
					The component extends all standard HTML input props. You can pass{" "}
					<DocsCode>placeholder</DocsCode>, <DocsCode>disabled</DocsCode>,{" "}
					<DocsCode>className</DocsCode>, etc. directly.
				</DocsNote>
			</DocsSection>

			{/* ------------------------------------------------------------ */}
			{/* useAutocomplete hook                                         */}
			{/* ------------------------------------------------------------ */}

			<DocsSection title="useAutocomplete()">
				<p>
					The <DocsCode>useAutocomplete</DocsCode> hook provides the full Google
					Maps Places Autocomplete logic without any UI. Use it to build your own
					custom autocomplete experience.
				</p>

				<CodeBlock
					code={`const { isLoaded, isStale, error, places, getSuggestions, getPlaceDetails, autocomplete } =
  useAutocomplete(apiKey, options);`}
				/>

				<h3 className="text-foreground text-base font-semibold">Parameters</h3>
				<PropTable items={hookParams} />
			</DocsSection>

			{/* ------------------------------------------------------------ */}
			{/* UseAutocompleteOptions                                       */}
			{/* ------------------------------------------------------------ */}

			<DocsSection title="UseAutocompleteOptions">
				<p>
					Configuration object passed as the second argument to{" "}
					<DocsCode>useAutocomplete</DocsCode>. Extends the{" "}
					<DocsCode>@googlemaps/js-api-loader</DocsCode> options.
				</p>
				<PropTable items={hookOptions} />
			</DocsSection>

			{/* ------------------------------------------------------------ */}
			{/* Return value                                                  */}
			{/* ------------------------------------------------------------ */}

			<DocsSection title="Return Value">
				<p>
					The hook returns a <DocsCode>UseAutocompleteReturn</DocsCode> object
					with the following properties:
				</p>
				<PropTable items={hookReturn} />
			</DocsSection>

			{/* ------------------------------------------------------------ */}
			{/* PlaceDetails                                                  */}
			{/* ------------------------------------------------------------ */}

			<DocsSection title="PlaceDetails">
				<p>
					The object returned by <DocsCode>getPlaceDetails</DocsCode> and passed
					to <DocsCode>onPlaceSelect</DocsCode>. Contains parsed address
					components and the raw Google Place object.
				</p>
				<PropTable items={placeDetailsFields} />
			</DocsSection>

			{/* ------------------------------------------------------------ */}
			{/* RequestOptions                                                */}
			{/* ------------------------------------------------------------ */}

			<DocsSection title="RequestOptions">
				<p>
					Options passed to each suggestion fetch request. It accepts {" "}, so basically:
					<DocsCode>{"Omit<google.maps.places.AutocompleteRequest, 'input' | 'sessionToken'>"}</DocsCode>.
				</p>
				<PropTable items={requestOptionsFields} />
			</DocsSection>

			{/* ------------------------------------------------------------ */}
			{/* getSuggestions                                                */}
			{/* ------------------------------------------------------------ */}

			<DocsSection title="getSuggestions()">
				<p>
					Fetches autocomplete suggestions for the given input string. Results
					are stored in <DocsCode>places</DocsCode>. It accepts <DocsCode>RequestOptions</DocsCode> as the second argument.
				</p>
				<CodeBlock code={getSuggestionsCode} />
				<DocsNote>
					Passing an empty string clears the current suggestions and refreshes
					the session token.
				</DocsNote>
			</DocsSection>

			{/* ------------------------------------------------------------ */}
			{/* getPlaceDetails                                               */}
			{/* ------------------------------------------------------------ */}

			<DocsSection title="getPlaceDetails()">
				<p>
					Fetches full place details for a given prediction. Returns a{" "}
					<DocsCode>PlaceDetails</DocsCode> object with parsed address components,
					coordinates, and the raw Place object.
				</p>
				<CodeBlock code={getPlaceDetailsCode} />
				<DocsNote>
					After each call, the session token is automatically refreshed and the
					suggestions list is cleared. This keeps Google Maps API billing efficient
					by bundling autocomplete requests into sessions.
				</DocsNote>
			</DocsSection>

			{/* ------------------------------------------------------------ */}
			{/* autocomplete() helper                                         */}
			{/* ------------------------------------------------------------ */}

			<DocsSection title="autocomplete()">
				<p>
					A spread helper designed for <DocsCode>react-hook-form</DocsCode>{" "}
					integration. It takes the <DocsCode>field</DocsCode> object to
					trigger <DocsCode>getSuggestions</DocsCode> automatically while
					preserving the original handler.
				</p>
				<CodeBlock code={autocompleteHelperCode} />
			</DocsSection>
		</DocsLayout>
	);
}
