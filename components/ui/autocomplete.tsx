'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { MapPinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { useAutocomplete } from '@/hooks/use-autocomplete';
import type {
    PlaceDetails,
    PlacePrediction,
    RequestOptions,
    UseAutocompleteOptions
} from '@/hooks/use-autocomplete';


type AutocompleteContextValue = {
    listId: string;
    isOpen: boolean;
    inputValue: string;
    highlightedIndex: number;
    isStale: boolean;
    places: PlacePrediction[] | undefined;
    anchorRef: React.RefObject<HTMLDivElement | null>;
    setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
    handleSelect: (prediction: PlacePrediction) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleFocus: (e: React.FocusEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const AutocompleteContext = React.createContext<AutocompleteContextValue | null>(null);

function useAutocompleteContext() {
    const ctx = React.useContext(AutocompleteContext);
    if (!ctx) throw new Error('Autocomplete compound components must be used within <Autocomplete>');
    return ctx;
}

function AutocompleteInput({
    className,
    disabled,
    ...props
}: React.ComponentProps<'input'>) {
    const ctx = useAutocompleteContext();

    return (
        <PopoverAnchor asChild>
            <div ref={ctx.anchorRef} data-slot="autocomplete">
                <Input
                    data-slot="autocomplete-input"
                    className={className}
                    value={ctx.inputValue}
                    onChange={ctx.handleChange}
                    onKeyDown={ctx.handleKeyDown}
                    onFocus={ctx.handleFocus}
                    onBlur={ctx.handleBlur}
                    disabled={disabled}
                    role="combobox"
                    aria-expanded={ctx.isOpen}
                    aria-haspopup="listbox"
                    aria-autocomplete="list"
                    aria-controls={ctx.isOpen ? ctx.listId : undefined}
                    aria-activedescendant={
                        ctx.highlightedIndex >= 0 ? `${ctx.listId}-${ctx.highlightedIndex}` : undefined
                    }
                    autoComplete="off"
                    {...props}
                />
            </div>
        </PopoverAnchor>
    );
}

function AutocompleteItem({
    prediction,
    index,
}: {
    prediction: PlacePrediction;
    index: number;
}) {
    const ctx = useAutocompleteContext();
    const isHighlighted = index === ctx.highlightedIndex;

    return (
        <Button
            variant="ghost"
            type="button"
            id={`${ctx.listId}-${index}`}
            role="option"
            aria-selected={isHighlighted}
            data-slot="autocomplete-option"
            className={cn(
                'h-auto w-full justify-start gap-1.5 rounded-md px-1.5 py-1 font-normal cursor-default',
                isHighlighted
                    ? 'bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground'
                    : 'text-popover-foreground',
            )}
            onMouseEnter={() => ctx.setHighlightedIndex(index)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => ctx.handleSelect(prediction)}
        >
            <MapPinIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">
                <HighlightedText formattable={prediction.mainText} />
            </span>
            {prediction.secondaryText?.text && (
                <span className="truncate text-xs text-muted-foreground">
                    {prediction.secondaryText.text}
                </span>
            )}
        </Button>
    );
}

function AutocompleteList() {
    const ctx = useAutocompleteContext();

    if (!ctx.places?.length) return null;

    return (
        <PopoverContent
            data-slot="autocomplete-listbox"
            className="max-h-60 overflow-y-auto p-1 w-(--radix-popper-anchor-width)"
            align="start"
            sideOffset={4}
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={(e) => {
                if (ctx.anchorRef.current?.contains(e.target as Node)) {
                    e.preventDefault();
                }
            }}
        >
            <div
                id={ctx.listId}
                role="listbox"
                className={cn(ctx.isStale && 'pointer-events-none')}
            >
                {ctx.places.map((prediction, index) => (
                    <AutocompleteItem
                        key={prediction.placeId}
                        prediction={prediction}
                        index={index}
                    />
                ))}
            </div>
            <div className="flex items-center justify-end gap-1 px-1 mt-1">
                <span className="text-[10px] text-muted-foreground">Powered by</span>
                <GoogleIcon className="w-12 h-6" />
            </div>
        </PopoverContent>
    );
}

type AutocompleteProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value'> & {
    /**
     * The Google Maps API key to use.
     * 
     * @see https://developers.google.com/maps/documentation/javascript/get-api-key
     */
    apiKey: string;
    /**
     * The options to pass during Google Autocomplete API setup.
     * 
     * @see UseAutocompleteOptions
     */
    setupOptions?: UseAutocompleteOptions;
    /**
     * The options to pass to every suggestion fetch request.
     * 
     * @see RequestOptions
     */
    requestOptions?: RequestOptions;
    /**
     * The output format to use for the selected place.
     * 
     * @default 'routeOnly'
     * 
     * - routeOnly: '123 Main St'
     * - formatted: '123 Main St, Anytown, USA'
     */
    output?: 'routeOnly' | 'formatted';
    /**
     * The function to call when a place is selected.
     * 
     * @param details The details of the selected place.
     * It already has some formatted informations like street, city, country, etc.
     * Additionally it contains the raw place object from the Google Autocomplete API.
     */
    onPlaceSelect?: (details: PlaceDetails) => void;
    /**
     * The debounce time in milliseconds to wait before fetching suggestions.
     * 
     * It's advised to set this to at least 200ms to avoid excessive API calls and improve user experience.
     * 
     * @default 200
     */
    debounceMs?: number;
    onChange?: (value: string) => void;
    value?: string;
};

function Autocomplete({
    className,
    apiKey,
    setupOptions,
    requestOptions,
    output = 'routeOnly',
    onPlaceSelect,
    debounceMs,
    onChange,
    value = '',
    onFocus,
    onBlur,
    disabled,
    ...props
}: AutocompleteProps) {
    const { isLoaded, isStale, getSuggestions, getPlaceDetails, places } = useAutocomplete(apiKey, {
        ...setupOptions,
        debounceMs,
    });

    const [inputValue, setInputValue] = React.useState(value);
    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

    const anchorRef = React.useRef<HTMLDivElement>(null);
    const listId = React.useId();

    React.useEffect(() => {
        setInputValue(value);
    }, [value]);

    React.useEffect(() => {
        if (places !== undefined) {
            setIsOpen(places.length > 0);
            setHighlightedIndex(-1);
        }
    }, [places]);

    React.useEffect(() => {
        if (highlightedIndex < 0) return;
        document.getElementById(`${listId}-${highlightedIndex}`)
            ?.scrollIntoView({ block: 'nearest' });
    }, [highlightedIndex, listId]);

    const formatOutput = (details: PlaceDetails): string => {
        if (output === 'routeOnly') {
            return `${details.route ?? ''} ${details.streetNumber ?? ''}`.trim();
        }
        return details.formattedAddress ?? '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);
        onChange?.(val);
        getSuggestions(val, requestOptions);
    };

    const handleSelect = async (prediction: PlacePrediction) => {
        setIsOpen(false);
        setHighlightedIndex(-1);

        const details = await getPlaceDetails(prediction);
        const formatted = formatOutput(details);

        setInputValue(formatted);
        onPlaceSelect?.(details);
        onChange?.(formatted);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!isOpen || !places?.length) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev < places.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev > 0 ? prev - 1 : places.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && places[highlightedIndex]) {
                    handleSelect(places[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                setHighlightedIndex(-1);
                break;
        }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (inputValue && places?.length) {
            setIsOpen(true);
        }
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        onBlur?.(e);
    };

    const contextValue: AutocompleteContextValue = {
        listId,
        isOpen,
        inputValue,
        highlightedIndex,
        isStale,
        places,
        anchorRef,
        setHighlightedIndex,
        handleSelect,
        handleChange,
        handleKeyDown,
        handleFocus,
        handleBlur,
    };

    return (
        <AutocompleteContext.Provider value={contextValue}>
            <Popover
                open={isOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsOpen(false);
                        setHighlightedIndex(-1);
                    }
                }}
            >
                <AutocompleteInput
                    className={className}
                    disabled={!isLoaded || disabled}
                    {...props}
                />
                <AutocompleteList />
            </Popover>
        </AutocompleteContext.Provider>
    );
}

// ---------------------------------------------------------------------------
// Internal utilities
// ---------------------------------------------------------------------------

function HighlightedText({ formattable }: { formattable: google.maps.places.FormattableText | null }) {
    if (!formattable) return null;

    const { text, matches } = formattable;
    if (!matches.length) return <>{text}</>;

    const segments: React.ReactNode[] = [];
    let cursor = 0;

    for (const { startOffset, endOffset } of matches) {
        if (cursor < startOffset) {
            segments.push(text.slice(cursor, startOffset));
        }
        segments.push(
            <span key={startOffset} className="font-semibold">
                {text.slice(startOffset, endOffset)}
            </span>
        );
        cursor = endOffset;
    }

    if (cursor < text.length) {
        segments.push(text.slice(cursor));
    }

    return <>{segments}</>;
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

export { Autocomplete };
export type { AutocompleteProps };
