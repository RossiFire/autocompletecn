import {
	DocsCode,
	DocsLayout,
	DocsLink,
	DocsNote,
	DocsSection,
} from "../_components/docs";
import { CodeBlock } from "../_components/code-block";
import type { Metadata } from "next";
import { Stepper } from "@/components/stepper";

const installComponentCommand =
	`npx shadcn@latest add ${process.env.NEXT_PUBLIC_BASE_URL}/r/autocomplete.json`;

const installHookCommand =
	`npx shadcn@latest add ${process.env.NEXT_PUBLIC_BASE_URL}/r/use-autocomplete.json`;

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
  const { 
	isLoaded, 
	getSuggestions, 
	getPlaceDetails, 
	places,
  } = useAutocomplete(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    getSuggestions(e.target.value, { includedPrimaryTypes: ["route"] });
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

const steps = [
	{ label: "Activate the Places API (New)", content: (
		<>
		<p>Go to the <DocsLink href="https://console.cloud.google.com" external>Google Cloud Console</DocsLink> and search for <strong>APIs & Services</strong></p>
		<p>Then click on "Enable APIs and Services"</p>
		<p>In the search bar, type "Places API (New)" and click on it</p>
		<p>Then click on "Enable"</p>
		</>
	) },
	{ label: "Create a new API key", content: (
		<>
		<p>Back in the <strong>APIs & Services</strong> page, click on "Credentials" in the left sidebar</p>
		<p>Then click on "Create credentials"</p>
		<p>Select "API key", fill the required fields and click on "Create"</p>
		</>
	) },
];

export const metadata: Metadata = {
	title: "Installation",
	description: "How to install and set up autocompletecn in your project.",
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
				{ title: "Basic Installation", slug: "basic-installation" },
				{ title: "Install Just the Hook", slug: "install-just-the-hook" },
				{ title: "Component Usage", slug: "component-usage" },
				{ title: "Hook-only Usage", slug: "hook-only-usage" },
				{ title: "Google Maps API Key Guide", slug: "google-maps-api-key-guide" },
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
					A Google Maps API key
					with the <strong>Places API (New)</strong> enabled. <DocsLink href="#google-maps-api-key-guide">Below</DocsLink> there's a guide on how to get one.
				</p>
			</DocsSection>

			<DocsSection title="Basic Installation">
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
				<strong>Note:</strong> The component manages Google Maps Places API session
				tokens automatically by default. Check the <DocsLink href="/docs/session-token">Session Token</DocsLink> page for more details.
			</DocsNote>

			<DocsSection title="Google Maps API Key Guide">
				Follow the steps below to get a Google Maps API key with the Places API (New) enabled:
				<Stepper steps={steps} currentStep={2} className="mt-8" allContentVisible={true} />
				<DocsNote>
				Once you have the API key, I recommend you to store it in a <DocsCode>.env</DocsCode> file as <DocsCode>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</DocsCode>
				</DocsNote>
			</DocsSection>
		</DocsLayout>
	);
}
