import {
	DocsCode,
	DocsLayout,
	DocsLink,
	DocsNote,
	DocsSection,
} from "../_components/docs";
import { CodeBlock } from "../_components/code-block";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Session Token",
};

const uncontrolledCode = `import { useAutocomplete } from "@/hooks/use-autocomplete";

const { getSuggestions, getPlaceDetails, places } = useAutocomplete(
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
);

// Token is created on load, rotated after each selection or input clear.
// You don't need to do anything.`;

const controlledCode = `import { useAutocomplete } from "@/hooks/use-autocomplete";
import { useState, useCallback } from "react";

function useSessionToken() {
  const [token, setToken] = useState(
    () => new google.maps.places.AutocompleteSessionToken()
  );

  const rotate = useCallback(() => {
    setToken(new google.maps.places.AutocompleteSessionToken());
  }, []);

  return { token, rotate };
}

export function CustomAutocomplete() {
  const { token, rotate } = useSessionToken();

  const { getSuggestions, getPlaceDetails, places } = useAutocomplete(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    {
      sessionToken: token,
      onSessionEnd: rotate,
    }
  );

  // ...
}`;

const componentControlledCode = `import { Autocomplete } from "@/components/ui/autocomplete";

// The <Autocomplete /> component uses uncontrolled mode internally.
// Session tokens are fully managed for you — no extra props needed.

<Autocomplete
  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
  placeholder="Search for an address..."
  onPlaceSelect={(details) => console.log(details)}
/>`;

export default function SessionTokenPage() {
	return (
		<DocsLayout
			title="Session Token"
			description="How autocompletecn manages Google Maps session tokens and how to take full control when needed."
			prev={{ title: "API Reference", href: "/docs/api-reference" }}
			next={{
				title: "Auto-fill Form",
				href: "/docs/examples/autofill-form",
			}}
			toc={[
				{
					title: "What is a Session Token?",
					slug: "what-is-a-session-token",
				},
				{ title: "Uncontrolled mode", slug: "uncontrolled-mode" },
				{ title: "Controlled mode", slug: "controlled-mode" },
				{ title: "When to use controlled", slug: "when-to-use-controlled" },
				{
					title: "Autocomplete component",
					slug: "autocomplete-component",
				},
			]}
		>
			<DocsSection title="What is a Session Token?">
				<p>
					The Google Maps Places API uses{" "}
					<DocsLink
						href="https://developers.google.com/maps/documentation/places/web-service/session-tokens"
						external
					>
						session tokens
					</DocsLink>{" "}
					to group a series of autocomplete requests into a single billing session. Without a token, every
					keystroke counts as a separate billable request, increasing also the overall billing. 
				</p>
				<p>
					A session starts when the user begins typing and ends when they
					either select a place or clear the input. At that point the token
					must be replaced with a fresh one for the next session.
				</p>
			</DocsSection>

			<DocsSection title="Uncontrolled mode">
				<p>
					By default, <DocsCode>useAutocomplete</DocsCode> manages the full
					session token lifecycle internally. A token is created when the
					Google Maps library loads and automatically rotated when:
				</p>
				<ul>
					<li>
						<DocsCode>getPlaceDetails</DocsCode> is called (place selected)
					</li>
					<li>
						<DocsCode>getSuggestions</DocsCode> receives an empty string
						(input cleared)
					</li>
				</ul>
				<CodeBlock code={uncontrolledCode} />
				<DocsNote>
					This is the recommended approach for most use cases. You get correct
					billing behavior without writing any token management code.
				</DocsNote>
			</DocsSection>

			<DocsSection title="Controlled mode">
				<p>
					If you need full control over the session token — for example to
					share it across multiple hook instances, tie it to your own state
					management, or implement custom rotation logic — pass{" "}
					<DocsCode>sessionToken</DocsCode> and{" "}
					<DocsCode>onSessionEnd</DocsCode> to the hook options:
				</p>
				<CodeBlock code={controlledCode} />
				<p>
					When <DocsCode>sessionToken</DocsCode> is provided, the hook enters{" "}
					<strong>controlled mode</strong>:
				</p>
				<ul>
					<li>
						It uses the token you provide directly and never creates or
						rotates tokens internally.
					</li>
					<li>
						It keeps an internal ref in sync with the external token, so
						swapping the prop value is all you need to rotate.
					</li>
					<li>
						When a session ends (place selected or input cleared), it calls{" "}
						<DocsCode>onSessionEnd</DocsCode> instead of rotating the token
						itself — this is your signal to supply a fresh token.
					</li>
				</ul>
				<DocsNote>
					<DocsCode>onSessionEnd</DocsCode> is stored in a ref internally, so
					you don&apos;t need to memoize the callback — changing its identity
					won&apos;t cause re-renders or re-create the{" "}
					<DocsCode>getSuggestions</DocsCode> /{" "}
					<DocsCode>getPlaceDetails</DocsCode> functions.
				</DocsNote>
			</DocsSection>

			<DocsSection title="When to use controlled">
				<ul>
					<li>
						<strong>Shared token</strong> — multiple autocomplete instances
						that should share the same billing session.
					</li>
					<li>
						<strong>External state</strong> — you already manage tokens in a
						context, store, or server-side and want the hook to consume them.
					</li>
					<li>
						<strong>Custom rotation</strong> — you want to add analytics,
						logging, or conditional logic when a session ends.
					</li>
				</ul>
				<p>
					If none of the above applies, stick with uncontrolled mode.
				</p>
			</DocsSection>

			<DocsSection title="Autocomplete component">
				<p>
					The <DocsCode>{"<Autocomplete />"}</DocsCode> component uses{" "}
					<DocsCode>useAutocomplete</DocsCode> in uncontrolled mode under the
					hood. Session tokens are created and rotated automatically — no
					extra props are needed.
				</p>
				<CodeBlock code={componentControlledCode} />
			</DocsSection>
		</DocsLayout>
	);
}
