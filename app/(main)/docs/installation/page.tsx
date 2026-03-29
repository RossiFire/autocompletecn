import {
	DocsCode,
	DocsLayout,
	DocsLink,
	DocsNote,
	DocsSection,
} from "../_components/docs";
import { CodeBlock } from "../_components/code-block";
import type { Metadata } from "next";

const installComponentCommand =
	"npx shadcn@latest add https://autocompletecn.dev/r/autocomplete.json";

const installHookCommand =
	"npx shadcn@latest add https://autocompletecn.dev/r/use-autocomplete.json";

const componentUsageCode = `import { Autocomplete } from "@/components/ui/autocomplete";

export function AddressForm() {
  return (
    <Autocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      placeholder="Search for an address..."
      onPlaceSelect={(details) => {
        console.log(details.formattedAddress);
        console.log(details.city, details.postalCode);
      }}
    />
  );
}`;

const hookUsageCode = `import { useAutocomplete } from "@/hooks/use-autocomplete";

export function CustomAutocomplete() {
  const { isLoaded, getSuggestions, getPlaceDetails, places } =
    useAutocomplete(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    getSuggestions(e.target.value);
  };

  const handleSelect = async (prediction: google.maps.places.PlacePrediction) => {
    const details = await getPlaceDetails(prediction);
    console.log(details);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleInput}
        disabled={!isLoaded}
        placeholder="Type an address..."
      />
      <ul>
        {places?.map((place) => (
          <li key={place.placeId}>
            <button onClick={() => handleSelect(place)}>
              {place.mainText?.text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}`;

export const metadata: Metadata = {
	title: "Installation",
};

export default function InstallationPage() {
	return (
		<DocsLayout
			title="Installation"
			description="How to install and set up autocompletecn in your project."
			prev={{ title: "Getting Started", href: "/docs" }}
			next={{ title: "API Reference", href: "/docs/api-reference" }}
			toc={[
				{ title: "Prerequisites", slug: "prerequisites" },
				{ title: "Install the Component", slug: "install-the-component" },
				{ title: "Install Just the Hook", slug: "install-just-the-hook" },
				{ title: "Component Usage", slug: "component-usage" },
				{ title: "Hook-only Usage", slug: "hook-only-usage" },
			]}
		>
			<DocsSection title="Prerequisites">
				<p>
					A project with{" "}
					<DocsLink href="https://tailwindcss.com" external>
						Tailwind CSS
					</DocsLink>{" "}
					and{" "}
					<DocsLink href="https://ui.shadcn.com" external>
						shadcn/ui
					</DocsLink>{" "}
					set up.
				</p>
				<p>
					You also need a{" "}
					<DocsLink
						href="https://developers.google.com/maps/documentation/javascript/get-api-key"
						external
					>
						Google Maps API key
					</DocsLink>{" "}
					with the <strong>Places API</strong> enabled.
				</p>
			</DocsSection>

			<DocsSection title="Install the Component">
				<p>
					Run the following command to add the full autocomplete component. This
					will also install the <DocsCode>useAutocomplete</DocsCode> hook as a
					dependency:
				</p>
				<CodeBlock code={installComponentCommand} language="bash" />
			</DocsSection>

			<DocsSection title="Install Just the Hook">
				<p>
					If you want to build your own UI, you can install only the hook:
				</p>
				<CodeBlock code={installHookCommand} language="bash" />
				<p>
					This gives you <DocsCode>useAutocomplete</DocsCode> with all the
					Google Places API logic &mdash; suggestions, place details, and session
					token management &mdash; without any UI components.
				</p>
			</DocsSection>

			<DocsSection title="Component Usage">
				<p>Import and use the autocomplete component:</p>
				<CodeBlock code={componentUsageCode} />
			</DocsSection>

			<DocsSection title="Hook-only Usage">
				<p>
					Use the hook directly to build a custom autocomplete experience:
				</p>
				<CodeBlock code={hookUsageCode} />
			</DocsSection>


			<DocsNote>
				<strong>Note:</strong> The component uses Google Maps Places API session
				tokens automatically. A new token is created when the suggestions list
				is cleared, keeping API costs efficient.
			</DocsNote>
		</DocsLayout>
	);
}
