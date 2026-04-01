"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverAnchor,
	PopoverContent,
} from "@/components/ui/popover";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MockAddress {
	id: string;
	street: string;
	city: string;
	country: string;
	postalCode: string;
	region: string;
}

export interface MockPlaceDetails {
	formattedAddress: string;
	streetNumber: string | null;
	route: string | null;
	city: string | null;
	province: string | null;
	region: string | null;
	country: string | null;
	postalCode: string | null;
	placeId: string;
}

export interface MockPrediction {
	placeId: string;
	mainText: string;
	secondaryText: string;
	details: MockPlaceDetails;
}

// ---------------------------------------------------------------------------
// 100 mock addresses
// ---------------------------------------------------------------------------

export const MOCK_ADDRESSES: MockAddress[] = [
	{ id: "us-01", street: "1600 Amphitheatre Parkway", city: "Mountain View", country: "United States", postalCode: "94043", region: "California" },
	{ id: "us-02", street: "1 Infinite Loop", city: "Cupertino", country: "United States", postalCode: "95014", region: "California" },
	{ id: "us-03", street: "350 Fifth Avenue", city: "New York", country: "United States", postalCode: "10118", region: "New York" },
	{ id: "us-04", street: "233 South Wacker Drive", city: "Chicago", country: "United States", postalCode: "60606", region: "Illinois" },
	{ id: "us-05", street: "1 Hacker Way", city: "Menlo Park", country: "United States", postalCode: "94025", region: "California" },
	{ id: "us-06", street: "400 Broad Street", city: "Seattle", country: "United States", postalCode: "98109", region: "Washington" },
	{ id: "us-07", street: "1455 Market Street", city: "San Francisco", country: "United States", postalCode: "94103", region: "California" },
	{ id: "us-08", street: "1 Tesla Road", city: "Austin", country: "United States", postalCode: "78725", region: "Texas" },
	{ id: "us-09", street: "2300 Traverwood Drive", city: "Ann Arbor", country: "United States", postalCode: "48105", region: "Michigan" },
	{ id: "us-10", street: "1601 Willow Road", city: "Menlo Park", country: "United States", postalCode: "94025", region: "California" },
	{ id: "us-11", street: "410 Terry Avenue North", city: "Seattle", country: "United States", postalCode: "98109", region: "Washington" },
	{ id: "us-12", street: "1 Apple Park Way", city: "Cupertino", country: "United States", postalCode: "95014", region: "California" },
	{ id: "us-13", street: "500 108th Avenue NE", city: "Bellevue", country: "United States", postalCode: "98004", region: "Washington" },
	{ id: "us-14", street: "151 3rd Street", city: "San Francisco", country: "United States", postalCode: "94103", region: "California" },
	{ id: "us-15", street: "1900 Reston Metro Plaza", city: "Reston", country: "United States", postalCode: "20190", region: "Virginia" },
	{ id: "uk-01", street: "221B Baker Street", city: "London", country: "United Kingdom", postalCode: "NW1 6XE", region: "England" },
	{ id: "uk-02", street: "10 Downing Street", city: "London", country: "United Kingdom", postalCode: "SW1A 2AA", region: "England" },
	{ id: "uk-03", street: "1 Kensington Palace Gardens", city: "London", country: "United Kingdom", postalCode: "W8 4QP", region: "England" },
	{ id: "uk-04", street: "49 Featherstone Street", city: "London", country: "United Kingdom", postalCode: "EC1Y 8SY", region: "England" },
	{ id: "uk-05", street: "100 New Bridge Street", city: "London", country: "United Kingdom", postalCode: "EC4V 6JA", region: "England" },
	{ id: "uk-06", street: "1 St James's Square", city: "London", country: "United Kingdom", postalCode: "SW1Y 4PD", region: "England" },
	{ id: "uk-07", street: "30 Euston Square", city: "London", country: "United Kingdom", postalCode: "NW1 2FB", region: "England" },
	{ id: "uk-08", street: "1 Cathedral Street", city: "Manchester", country: "United Kingdom", postalCode: "M1 1AD", region: "England" },
	{ id: "uk-09", street: "5 George Square", city: "Edinburgh", country: "United Kingdom", postalCode: "EH8 9JZ", region: "Scotland" },
	{ id: "uk-10", street: "3 Assembly Square", city: "Cardiff", country: "United Kingdom", postalCode: "CF10 4PL", region: "Wales" },
	{ id: "it-01", street: "Piazza del Colosseo 1", city: "Roma", country: "Italy", postalCode: "00184", region: "Lazio" },
	{ id: "it-02", street: "Piazza del Duomo 14", city: "Milano", country: "Italy", postalCode: "20122", region: "Lombardia" },
	{ id: "it-03", street: "Piazza San Marco 1", city: "Venezia", country: "Italy", postalCode: "30124", region: "Veneto" },
	{ id: "it-04", street: "Via dei Fori Imperiali 46", city: "Roma", country: "Italy", postalCode: "00186", region: "Lazio" },
	{ id: "it-05", street: "Via Montenapoleone 8", city: "Milano", country: "Italy", postalCode: "20121", region: "Lombardia" },
	{ id: "it-06", street: "Piazza della Signoria 5", city: "Firenze", country: "Italy", postalCode: "50122", region: "Toscana" },
	{ id: "it-07", street: "Via Toledo 256", city: "Napoli", country: "Italy", postalCode: "80134", region: "Campania" },
	{ id: "it-08", street: "Via Roma 1", city: "Torino", country: "Italy", postalCode: "10121", region: "Piemonte" },
	{ id: "it-09", street: "Corso Italia 15", city: "Bologna", country: "Italy", postalCode: "40126", region: "Emilia-Romagna" },
	{ id: "it-10", street: "Via Etnea 200", city: "Catania", country: "Italy", postalCode: "95131", region: "Sicilia" },
	{ id: "fr-01", street: "5 Avenue Anatole France", city: "Paris", country: "France", postalCode: "75007", region: "Île-de-France" },
	{ id: "fr-02", street: "1 Rue de la Paix", city: "Paris", country: "France", postalCode: "75002", region: "Île-de-France" },
	{ id: "fr-03", street: "24 Rue de Rivoli", city: "Paris", country: "France", postalCode: "75004", region: "Île-de-France" },
	{ id: "fr-04", street: "87 Quai des Chartrons", city: "Bordeaux", country: "France", postalCode: "33300", region: "Nouvelle-Aquitaine" },
	{ id: "fr-05", street: "3 Place Bellecour", city: "Lyon", country: "France", postalCode: "69002", region: "Auvergne-Rhône-Alpes" },
	{ id: "fr-06", street: "7 Promenade des Anglais", city: "Nice", country: "France", postalCode: "06000", region: "Provence-Alpes-Côte d'Azur" },
	{ id: "fr-07", street: "15 Rue du Vieux Port", city: "Marseille", country: "France", postalCode: "13002", region: "Provence-Alpes-Côte d'Azur" },
	{ id: "fr-08", street: "2 Place de la Cathédrale", city: "Strasbourg", country: "France", postalCode: "67000", region: "Grand Est" },
	{ id: "fr-09", street: "10 Rue de la Monnaie", city: "Lille", country: "France", postalCode: "59800", region: "Hauts-de-France" },
	{ id: "fr-10", street: "4 Rue du Château", city: "Nantes", country: "France", postalCode: "44000", region: "Pays de la Loire" },
	{ id: "de-01", street: "Unter den Linden 77", city: "Berlin", country: "Germany", postalCode: "10117", region: "Berlin" },
	{ id: "de-02", street: "Marienplatz 1", city: "München", country: "Germany", postalCode: "80331", region: "Bayern" },
	{ id: "de-03", street: "Römerberg 27", city: "Frankfurt", country: "Germany", postalCode: "60311", region: "Hessen" },
	{ id: "de-04", street: "Jungfernstieg 1", city: "Hamburg", country: "Germany", postalCode: "20354", region: "Hamburg" },
	{ id: "de-05", street: "Hohe Straße 52", city: "Köln", country: "Germany", postalCode: "50667", region: "Nordrhein-Westfalen" },
	{ id: "de-06", street: "Königstraße 26", city: "Stuttgart", country: "Germany", postalCode: "70173", region: "Baden-Württemberg" },
	{ id: "de-07", street: "Prinzipalmarkt 10", city: "Münster", country: "Germany", postalCode: "48143", region: "Nordrhein-Westfalen" },
	{ id: "de-08", street: "Augustusplatz 9", city: "Leipzig", country: "Germany", postalCode: "04109", region: "Sachsen" },
	{ id: "de-09", street: "Schlossplatz 1", city: "Dresden", country: "Germany", postalCode: "01067", region: "Sachsen" },
	{ id: "de-10", street: "Am Markt 1", city: "Bremen", country: "Germany", postalCode: "28195", region: "Bremen" },
	{ id: "es-01", street: "Calle de Alcalá 50", city: "Madrid", country: "Spain", postalCode: "28014", region: "Madrid" },
	{ id: "es-02", street: "La Rambla 91", city: "Barcelona", country: "Spain", postalCode: "08001", region: "Cataluña" },
	{ id: "es-03", street: "Avenida de la Constitución 3", city: "Sevilla", country: "Spain", postalCode: "41004", region: "Andalucía" },
	{ id: "es-04", street: "Calle Larios 4", city: "Málaga", country: "Spain", postalCode: "29015", region: "Andalucía" },
	{ id: "es-05", street: "Plaza del Ayuntamiento 1", city: "Valencia", country: "Spain", postalCode: "46002", region: "Comunidad Valenciana" },
	{ id: "es-06", street: "Gran Vía 32", city: "Bilbao", country: "Spain", postalCode: "48009", region: "País Vasco" },
	{ id: "es-07", street: "Calle Mayor 50", city: "Zaragoza", country: "Spain", postalCode: "50001", region: "Aragón" },
	{ id: "es-08", street: "Rúa do Franco 15", city: "Santiago de Compostela", country: "Spain", postalCode: "15702", region: "Galicia" },
	{ id: "es-09", street: "Paseo del Espolón 1", city: "Burgos", country: "Spain", postalCode: "09003", region: "Castilla y León" },
	{ id: "es-10", street: "Plaza de España 1", city: "Santa Cruz de Tenerife", country: "Spain", postalCode: "38003", region: "Canarias" },
	{ id: "au-01", street: "1 Macquarie Street", city: "Sydney", country: "Australia", postalCode: "2000", region: "New South Wales" },
	{ id: "au-02", street: "100 St Kilda Road", city: "Melbourne", country: "Australia", postalCode: "3004", region: "Victoria" },
	{ id: "au-03", street: "1 William Street", city: "Brisbane", country: "Australia", postalCode: "4000", region: "Queensland" },
	{ id: "au-04", street: "200 Adelaide Terrace", city: "Perth", country: "Australia", postalCode: "6000", region: "Western Australia" },
	{ id: "au-05", street: "25 Grenfell Street", city: "Adelaide", country: "Australia", postalCode: "5000", region: "South Australia" },
	{ id: "ca-01", street: "301 Front Street West", city: "Toronto", country: "Canada", postalCode: "M5V 2T6", region: "Ontario" },
	{ id: "ca-02", street: "1055 Rue du Beaver Hall", city: "Montréal", country: "Canada", postalCode: "H2Z 1S5", region: "Québec" },
	{ id: "ca-03", street: "858 Beatty Street", city: "Vancouver", country: "Canada", postalCode: "V6B 1C1", region: "British Columbia" },
	{ id: "ca-04", street: "80 Wellington Street", city: "Ottawa", country: "Canada", postalCode: "K1A 0A2", region: "Ontario" },
	{ id: "ca-05", street: "125 9th Avenue SE", city: "Calgary", country: "Canada", postalCode: "T2G 0P6", region: "Alberta" },
	{ id: "jp-01", street: "1-1 Marunouchi", city: "Tokyo", country: "Japan", postalCode: "100-0005", region: "Kantō" },
	{ id: "jp-02", street: "2-5-1 Umeda", city: "Osaka", country: "Japan", postalCode: "530-0001", region: "Kansai" },
	{ id: "jp-03", street: "1 Higashiyama", city: "Kyoto", country: "Japan", postalCode: "605-0862", region: "Kansai" },
	{ id: "jp-04", street: "3-28-12 Nishiki", city: "Nagoya", country: "Japan", postalCode: "460-0003", region: "Chūbu" },
	{ id: "jp-05", street: "1-1-1 Tenjin", city: "Fukuoka", country: "Japan", postalCode: "810-0001", region: "Kyūshū" },
	{ id: "jp-06", street: "5-2-1 Roppongi", city: "Tokyo", country: "Japan", postalCode: "106-6108", region: "Kantō" },
	{ id: "jp-07", street: "1-6-1 Nishi-Shinjuku", city: "Tokyo", country: "Japan", postalCode: "163-8001", region: "Kantō" },
	{ id: "jp-08", street: "2-1 Sakuragaokacho", city: "Shibuya", country: "Japan", postalCode: "150-8510", region: "Kantō" },
	{ id: "jp-09", street: "1-9-1 Higashi", city: "Sapporo", country: "Japan", postalCode: "060-0041", region: "Hokkaidō" },
	{ id: "jp-10", street: "6-10-1 Roppongi", city: "Tokyo", country: "Japan", postalCode: "106-6155", region: "Kantō" },
	{ id: "br-01", street: "Avenida Paulista 1578", city: "São Paulo", country: "Brazil", postalCode: "01310-200", region: "São Paulo" },
	{ id: "br-02", street: "Rua Visconde de Pirajá 82", city: "Rio de Janeiro", country: "Brazil", postalCode: "22410-000", region: "Rio de Janeiro" },
	{ id: "br-03", street: "SQS 308 Bloco A", city: "Brasília", country: "Brazil", postalCode: "70356-010", region: "Distrito Federal" },
	{ id: "br-04", street: "Rua XV de Novembro 200", city: "Curitiba", country: "Brazil", postalCode: "80020-310", region: "Paraná" },
	{ id: "br-05", street: "Rua da Aurora 325", city: "Recife", country: "Brazil", postalCode: "50050-000", region: "Pernambuco" },
	{ id: "nl-01", street: "Dam 1", city: "Amsterdam", country: "Netherlands", postalCode: "1012 JS", region: "Noord-Holland" },
	{ id: "nl-02", street: "Coolsingel 40", city: "Rotterdam", country: "Netherlands", postalCode: "3011 AD", region: "Zuid-Holland" },
	{ id: "nl-03", street: "Markt 1", city: "Eindhoven", country: "Netherlands", postalCode: "5611 EB", region: "Noord-Brabant" },
	{ id: "nl-04", street: "Grote Markt 1", city: "Groningen", country: "Netherlands", postalCode: "9712 HN", region: "Groningen" },
	{ id: "nl-05", street: "Buitenhof 34", city: "Den Haag", country: "Netherlands", postalCode: "2513 AH", region: "Zuid-Holland" },
];

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

export function addressToPrediction(addr: MockAddress): MockPrediction {
	return {
		placeId: addr.id,
		mainText: addr.street,
		secondaryText: `${addr.city}, ${addr.country}`,
		details: {
			formattedAddress: `${addr.street}, ${addr.city}, ${addr.postalCode}, ${addr.country}`,
			streetNumber: addr.street.match(/^\d+/)?.[0] ?? null,
			route: addr.street.replace(/^\d+\s*/, ""),
			city: addr.city,
			province: null,
			region: addr.region,
			country: addr.country,
			postalCode: addr.postalCode,
			placeId: addr.id,
		},
	};
}

export function filterAddresses(query: string): MockPrediction[] {
	if (!query || query.length < 2) return [];
	const lower = query.toLowerCase();
	return MOCK_ADDRESSES.filter(
		(a) =>
			a.street.toLowerCase().includes(lower) ||
			a.city.toLowerCase().includes(lower) ||
			a.country.toLowerCase().includes(lower)
	)
		.slice(0, 5)
		.map((a) => addressToPrediction(a));
}

function HighlightedText({ text, query }: { text: string; query: string }) {
	if (!query) return <>{text}</>;
	const idx = text.toLowerCase().indexOf(query.toLowerCase());
	if (idx === -1) return <>{text}</>;
	return (
		<>
			{text.slice(0, idx)}
			<span className="font-semibold">{text.slice(idx, idx + query.length)}</span>
			{text.slice(idx + query.length)}
		</>
	);
}

// ---------------------------------------------------------------------------
// DemoAutocomplete component
// ---------------------------------------------------------------------------

export interface DemoAutocompleteProps
	extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
	onPlaceSelect?: (details: MockPlaceDetails) => void;
	onChange?: (value: string) => void;
	value?: string;
	output?: "routeOnly" | "formatted";
}

export function DemoAutocomplete({
	className,
	onPlaceSelect,
	onChange,
	value = "",
	output = "routeOnly",
	onFocus,
	onBlur,
	disabled,
	...props
}: DemoAutocompleteProps) {
	const [inputValue, setInputValue] = React.useState(value);
	const [predictions, setPredictions] = React.useState<MockPrediction[]>([]);
	const [isOpen, setIsOpen] = React.useState(false);
	const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
	const anchorRef = React.useRef<HTMLDivElement>(null);
	const listId = React.useId();

	React.useEffect(() => { setInputValue(value); }, [value]);
	React.useEffect(() => {
		if (highlightedIndex < 0) return;
		document.getElementById(`${listId}-${highlightedIndex}`)?.scrollIntoView({ block: "nearest" });
	}, [highlightedIndex, listId]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setInputValue(val);
		onChange?.(val);
		const results = filterAddresses(val);
		setPredictions(results);
		setIsOpen(results.length > 0);
		setHighlightedIndex(-1);
	};

	const handleSelect = (prediction: MockPrediction) => {
		setIsOpen(false);
		setHighlightedIndex(-1);

		const details = prediction.details;
		const formatted = output === "routeOnly"
			? `${details.route ?? ""} ${details.streetNumber ?? ""}`.trim()
			: details.formattedAddress;

		setInputValue(formatted);
		onPlaceSelect?.(details);
		onChange?.(formatted);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!isOpen || !predictions.length) return;
		switch (e.key) {
			case "ArrowDown": e.preventDefault(); setHighlightedIndex((p) => (p < predictions.length - 1 ? p + 1 : 0)); break;
			case "ArrowUp": e.preventDefault(); setHighlightedIndex((p) => (p > 0 ? p - 1 : predictions.length - 1)); break;
			case "Enter": e.preventDefault(); if (highlightedIndex >= 0 && predictions[highlightedIndex]) handleSelect(predictions[highlightedIndex]); break;
			case "Escape": setIsOpen(false); setHighlightedIndex(-1); break;
		}
	};

	return (
		<Popover open={isOpen} onOpenChange={(o) => { if (!o) { setIsOpen(false); setHighlightedIndex(-1); } }}>
			<PopoverAnchor asChild>
				<div ref={anchorRef} data-slot="autocomplete">
					<Input
						data-slot="autocomplete-input" className={className} value={inputValue}
						onChange={handleChange} onKeyDown={handleKeyDown}
						onFocus={(e) => { if (inputValue && predictions.length) setIsOpen(true); onFocus?.(e); }}
						onBlur={onBlur} disabled={disabled} role="combobox"
						aria-expanded={isOpen} aria-haspopup="listbox" aria-autocomplete="list"
						aria-controls={isOpen ? listId : undefined}
						aria-activedescendant={highlightedIndex >= 0 ? `${listId}-${highlightedIndex}` : undefined}
						autoComplete="off" {...props}
					/>
				</div>
			</PopoverAnchor>
			{predictions.length > 0 && (
				<PopoverContent data-slot="autocomplete-listbox" className="max-h-60 overflow-y-auto p-1 w-(--radix-popper-anchor-width)" align="start" sideOffset={4}
					onOpenAutoFocus={(e) => e.preventDefault()} onCloseAutoFocus={(e) => e.preventDefault()}
					onInteractOutside={(e) => { if (anchorRef.current?.contains(e.target as Node)) e.preventDefault(); }}>
					<div id={listId} role="listbox">
						{predictions.map((prediction, index) => (
							<Button key={prediction.placeId} variant="ghost" type="button" id={`${listId}-${index}`} role="option"
								aria-selected={index === highlightedIndex} data-slot="autocomplete-option"
								className={cn("h-auto w-full justify-start gap-1.5 rounded-md px-1.5 py-1 font-normal cursor-default",
									index === highlightedIndex ? "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground" : "text-popover-foreground")}
								onMouseEnter={() => setHighlightedIndex(index)} onMouseDown={(e) => e.preventDefault()} onClick={() => handleSelect(prediction)}>
								<MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
								<span className="truncate"><HighlightedText text={prediction.mainText} query={inputValue} /></span>
								<span className="truncate text-xs text-muted-foreground">{prediction.secondaryText}</span>
							</Button>
						))}
					</div>
					<div className="mt-1 flex items-center justify-between px-1">
						<span className="text-[10px] text-muted-foreground">Demo &middot; mock data</span>
						<div className="flex items-center gap-1">
							<span className="text-[10px] text-muted-foreground">Powered by</span>
							<GoogleIcon className="h-6 w-12" />
						</div>
					</div>
				</PopoverContent>
			)}
		</Popover>
	);
}

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 433" {...props}>
        <title>Google Icon</title>
        <path fill="#4185F4" d="M266.941 36.488c3.815 3.393 7.448 6.9 11.059 10.512l-32 32c-8.282-6.212-8.282-6.212-12-9.312-23.711-18.32-54.079-24.67-83.543-21.22-29.478 4.216-57.188 19.5-75.25 43.355-19.249 26.383-27.521 58.039-23.02 90.482C54.567 197.175 59.544 210.96 67 224l1.645 2.938c15.058 25.206 40.188 42.913 68.386 50.487 29.855 7.395 62.462 3.59 89.215-11.758C246.673 253.344 259.982 235.614 267 213l4-18H166v-45h150c1.325 9.273 2.36 17.747 2.313 27l-.015 3.521c-.554 41.532-14.793 77.417-44.154 106.772C262.334 298.776 249.08 307.436 234 314l-1.915.834c-39.377 16.742-86.993 16.924-126.621.958C68.03 300.127 38.268 273.736 19 238l-1.582-2.809c-18.93-35.213-20.794-78.564-10.22-116.539C15.043 92.714 29.136 70.287 48 51l2.156-2.344C61.47 36.647 75.378 27.453 90 20l2.03-1.058C146.99-9.48 219.332-3.786 266.94 36.488" />
        <path fill="#4285F4" d="M936.203 133.71c4.547 3.79 4.547 3.79 5.797 6.29l1-16h45q.035 36.72.052 73.438.007 17.051.023 34.103.015 14.871.02 29.743 0 7.866.01 15.731.012 7.423.008 14.846 0 2.706.006 5.411c.067 32.887-2.302 66.95-25.119 92.728l-2.367 2.965C946.876 409.48 923.745 417.537 903 420c-4.775.285-9.53.335-14.312.313l-3.882-.018c-8.971-.115-17.19-.618-25.806-3.295l-1.944-.602c-26.098-8.321-47.106-26.922-59.744-51.086-1.449-2.886-1.449-2.886-2.312-5.312 1-3 1-3 2.55-3.968l2.02-.841 2.286-.97 2.484-1.014 2.537-1.063q2.659-1.11 5.324-2.206c2.726-1.121 5.446-2.258 8.164-3.397q2.58-1.075 5.162-2.146l2.478-1.032C833.765 341 833.765 341 836 341l1.18 2.457c7.74 15.319 18.363 25.598 34.53 31.816 14.093 4.473 30.892 2.636 44.087-3.593 12.225-6.78 18.807-16.804 23.27-29.782 2.556-8.967 3.07-17.557 2.995-26.836l-.013-3.228A2271 2271 0 0 0 942 304l-1.535 1.603c-14.611 14.983-33.068 21.186-53.715 21.71-29.431-.515-53.8-13.537-74.121-34.38-18.815-20.995-27.782-48.691-26.453-76.703C788.206 186.24 801.48 159.88 824 140c32.285-25.653 78.14-32.743 112.203-6.29M850 177c-6.12 7.701-10.78 15.65-14 25l-.707 2c-4.802 16.03-2.225 34.054 4.707 49 8.5 14.848 19.999 24.844 36.434 30.098 13.861 3.51 27.465 2.341 40.168-4.606C929.56 270.43 938.14 259.467 943 245l.965-2.684c5.424-17.62 2.774-37.789-5.465-54.066-7.876-14.304-19.946-23.212-35.39-28.18-2.392-.549-4.666-.876-7.11-1.07l-2.266-.242C877.69 157.855 860.737 165.203 850 177" />
        <path fill="#EA4334" d="M434.91 116.844c29.897-.799 57.79 8.674 79.741 29.405 18.488 18.067 29.863 43.143 30.65 69.048q.03 3.226.011 6.453c-.005 1.137-.01 2.275-.017 3.447-.359 25.01-9.307 49.252-26.295 67.803l-2.336 2.582c-18.594 19.587-45.194 30.663-72.043 31.602-29.554.628-56.406-8.607-78.18-28.813-18.86-18.317-30.95-43.164-31.742-69.668-.266-29.183 6.102-56.589 26.795-78.203A434 434 0 0 1 366 146l2.46-2.492c17.47-16.773 42.52-25.708 66.45-26.664m-38.152 61.812c-5.025 6.392-8.976 12.697-11.758 20.344l-.965 2.582c-5.58 17.977-2.624 37.722 5.945 54.086 3.082 5.085 6.77 9.201 11.02 13.332l1.895 1.957c9.667 9.342 24.006 14.003 37.293 14.356 17.107-.662 31.71-8.367 43.453-20.547C496.91 249.21 499.286 230.665 498 211c-1.972-15.201-10.027-29.278-21.625-39.187-24.11-18.47-59.536-16.946-79.617 6.843" />
        <path fill="#FBBC04" d="M732.875 139.438C751.35 155.416 763.364 174.23 769 198l.742 2.89c5.672 26.573-.211 56.327-14.742 79.11-17.27 24.562-40.272 39.594-69.55 45.746-29.272 4.896-58.873-1.548-83.145-18.644-22.203-17.053-36.152-40.607-40.91-68.088-3.805-29.048 2.195-57.4 19.605-81.014 2.852-3.493 5.861-6.765 9-10l1.816-2.04c35.267-38.236 101.838-37.657 141.059-6.523M621.703 179.64c-9.558 12.576-14.3 26.409-14.14 42.172l.022 3.18c.347 16.385 6.217 30.896 17.415 43.007 11.453 10.836 25.418 16.89 41.25 17.313 16.626-.65 31.485-8.096 42.875-20.106C722.226 249.786 725.025 231.61 724 212c-1.671-14.565-8.585-26.876-19-37l-1.895-1.957c-9.61-9.287-23.743-13.798-36.918-14.48-17.114.614-33.268 8.183-44.484 21.078" />
        <path fill="#EA4234" d="M1232.824 136.172 1235 138l2.207 1.766c16.344 13.625 27.005 34.369 33.793 54.234v3l-2.93 1.199a15430 15430 0 0 0-71.807 29.616 54394 54394 0 0 1-32.276 13.39A10843 10843 0 0 1 1133 254c6.357 12.854 15.216 21.837 28.742 27.059 15.633 4.965 31.49 3.788 46.383-3.059 9.732-5.167 18.03-12.606 23.875-22 4.643 1.6 8.433 4.088 12.488 6.79l2.131 1.403q3.35 2.21 6.694 4.432l4.556 3.008q5.57 3.676 11.131 7.367c-6.959 18.3-27.57 32.01-44.812 39.813-25.97 11.219-56.814 11.288-83.06.972-25.713-10.787-44.51-30.027-55.815-55.527-10.698-26.554-10.951-58.386-.563-85.133 11.194-25.794 29.183-44.993 55.559-55.809 31.108-11.093 66.291-8.57 92.515 12.856M1140 175c-10.082 10.373-16.12 24.841-16.187 39.313L1124 218c11.392-4.163 22.59-8.688 33.75-13.437a14270 14270 0 0 1 12.518-5.303 2237 2237 0 0 1 18.138-7.569l2.526-1.044c6.518-2.694 6.518-2.694 9.702-3.999q3.318-1.362 6.632-2.734l1.989-.809c2.717-1.13 4.642-2.002 6.745-4.105-5.797-10.392-13.636-15.915-24.996-19.281-19.536-4.675-36.496 2.328-51.004 15.281" />
        <path fill="#34A853" d="M1014 14h45v306h-45z" />
    </svg>
);