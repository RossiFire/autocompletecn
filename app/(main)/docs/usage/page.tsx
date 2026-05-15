import { Tabs } from "radix-ui";
import { CodeBlock } from "../_components/code-block";
import {
    DocsLayout,
    DocsSection,
} from "../_components/docs";


/* 
=============== Basic ===============
*/

const basicComponentCode =`<Autocomplete
    apiKey={apiKey}
    options={{ libraries: ['places'] }}
    fetchParams={{ includedPrimaryTypes: ['restaurant'], includedRegionCodes: ['us'] }}
    debounceMs={350}
    onPlaceSelect={handlePlaceSelect}
/>`;

const basicComponentHook =`const { 
    places, 
    getSuggestions, 
    getPlaceDetails, 
    isLoaded,
    isStale,
    error,
} = useAutocomplete(key, { libraries: ['places'] });`;


const basicCustomImplementation =`const { 
    places, 
    getSuggestions, 
    getPlaceDetails, 
    isLoaded,
    isStale,
    error,
} = useAutocomplete(key, { libraries: ['places'] });

const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);

const handlePlaceSelect = (place: PlaceDetails) => {
    setSelectedPlace(place);
};

return(
    <div>
        <input {...autocomplete} placeholder="Search for a place" />
        {places?.length > 0 && <div>
            {places.map((place) => (
                <div 
                    key={place.placeId} 
                    onClick={() => getPlaceDetails(place)}
                >
                    {place.formattedAddress}
                </div>
            ))}
        </div>}
        {error && <div>{error.message}</div>}
        {isStale && <div>Stale</div>}
        {isLoaded && <div>Loaded</div>}
        {selectedPlace && <div>{selectedPlace.formattedAddress}</div>}
    </div>
);
`;



/* 
=============== Options ===============
*/

const optionsComponentCode =`<Autocomplete
    apiKey={apiKey}
    options={{ libraries: ['places'] }}
/>`;
const optionsComponentHook =`const { 
    getSuggestions, 
    getPlaceDetails, 
    places, 
} = useAutocomplete(key, { libraries: ['places'] });`;



/* 
=============== Fetch Params ===============
*/

const fetchParamsComponentCode =`<Autocomplete 
    apiKey={apiKey} 
    fetchParams={{ 
        locationRestriction: {
            north: 10,
            east: 10,
            south: 10,
            west: 10,
        },
    }} 
/>`;
const fetchParamsComponentHook =`const { getSuggestions } = useAutocomplete('key');

getSuggestions("your value", {
    locationRestriction: {
        north: 10,
        east: 10,
        south: 10,
        west: 10,
    },
});`;


const fetchParamsCustomImplementationOne =`const { autocomplete } = useAutocomplete(key);

const locationRestriction = {
    north: 10,
    east: 10,
    south: 10,
    west: 10,
};

<input {...autocomplete({ locationRestriction })} />`;

/* 
=============== Debounce Request ===============
*/

const debounceRequestComponentCode =`<Autocomplete 
    apiKey={apiKey} 
    debounceMs={350}
/>`;
const debounceRequestComponentHook ="const { getSuggestions, places } = useAutocomplete(key, { debounceMs: 350 });";



const tabs = [
    { title: '<Autocomplete />', value: 'component' },
    { title: 'useAutocomplete', value: 'hook' },
    { title: 'Custom Implementation', value: 'custom' },
];


export default function UsagePage() {
    return (
        <DocsLayout
            title="Usage"
            description="Explore all the autocompletecn capabilities."
            prev={{ title: "Installation", href: "/docs/installation" }}
            next={{ title: "API Reference", href: "/docs/api-reference" }}
            toc={[
                { title: "Options", slug: "options" },
                { title: "FetchParams", slug: "fetch-params" },
                { title: "Debounce Request", slug: "debounce-request" },
                { title: "Custom Component", slug: "custom-component" },
            ]}
        >
            <Tabs.Root defaultValue={"component"} className="flex flex-col w-full -mt-4">
                <Tabs.List className="border-b border-border mb-6 pb-2 w-full sticky top-14 bg-background z-10 flex flex-nowrap">
                    {tabs.map(({ title, value }) => (
                        <Tabs.Trigger key={value} value={value} className="py-1 px-2 whitespace-nowrap md:px-4 xl:px-6 transition-colors text-xs md:text-sm lg:text-base duration-200 relative after:block hover:after:bg-muted after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px data-[state=active]:after:bg-foreground">
                            {title}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                <DocsSection title="Basic">
                    <Tabs.Content value="component" >
                        <CodeBlock code={basicComponentCode} language="tsx" />
                    </Tabs.Content>
                    <Tabs.Content value="hook" >
                        <CodeBlock code={basicComponentHook} language="tsx" />
                    </Tabs.Content>
                    <Tabs.Content value="custom" className="mb-4" >
                        <CodeBlock code={basicCustomImplementation} language="tsx" />
                    </Tabs.Content>
                </DocsSection>
                <DocsSection title="Options">
                    <p>The options to pass on Google Autocomplete API setup.</p>
                    <Tabs.Content value="component" >
                        <CodeBlock code={optionsComponentCode} language="tsx" />
                    </Tabs.Content>
                    <Tabs.Content value="hook" >
                        <CodeBlock code={optionsComponentHook} language="tsx" />
                    </Tabs.Content>
                    <Tabs.Content value="custom" className="mb-4" >
                        <CodeBlock code={optionsComponentHook} language="tsx" />
                    </Tabs.Content>
                </DocsSection>

                <DocsSection title="FetchParams" className="mt-4">
                        <p>The fetch params to pass on every suggestion fetch request.</p>
                    <Tabs.Content value="component" >
                        <CodeBlock code={fetchParamsComponentCode} language="tsx" />
                    </Tabs.Content>
                    <Tabs.Content value="hook" >
                        <CodeBlock code={fetchParamsComponentHook} language="tsx" />
                    </Tabs.Content>
                    <Tabs.Content value="custom" className="mb-4" >
                        <CodeBlock code={fetchParamsCustomImplementationOne} language="tsx" />
                    </Tabs.Content>
                </DocsSection>

                <DocsSection title="Debounce Request">
                    <Tabs.Content value="component" >
                        <CodeBlock code={debounceRequestComponentCode} language="tsx" />
                    </Tabs.Content>
                    <Tabs.Content value="hook" >
                        <CodeBlock code={debounceRequestComponentHook} language="tsx" />
                    </Tabs.Content>
                    <Tabs.Content value="custom" className="mb-4" >
                        <CodeBlock code={debounceRequestComponentHook} language="tsx" />
                    </Tabs.Content>
                </DocsSection>
            </Tabs.Root>
        </DocsLayout>
    );
}
