'use client';

import { type ChangeEvent, useState, useRef, useCallback, useEffect } from 'react';
import { setOptions, importLibrary, type APIOptions } from '@googlemaps/js-api-loader';

type PlacePrediction = google.maps.places.PlacePrediction;
type RequestOptions = Omit<google.maps.places.AutocompleteRequest, 'input' | 'sessionToken'>;


type PlaceDetails = {
    formattedAddress: string | null | undefined;
    streetNumber: string | null | undefined;
    route: string | null | undefined;
    city: string | null | undefined;
    province: string | null | undefined;
    region: string | null | undefined;
    country: string | null | undefined;
    postalCode: string | null | undefined;
    location: google.maps.LatLngLiteral | null | undefined;
    placeId: string;
    place: google.maps.places.Place;
};

type UseAutocompleteReturn = {
    isLoaded: boolean;
    isStale: boolean;
    error: Error | null;
    getSuggestions: (input: string, requestOptions?: RequestOptions) => void;
    getPlaceDetails: (prediction: PlacePrediction) => Promise<PlaceDetails>;
    autocomplete: <T extends React.ComponentProps<"input">>(field: T, requestOptions?: RequestOptions) => T
    places: PlacePrediction[] | undefined;
};

let apiInitialized = false;

type UseAutocompleteOptions = Omit<APIOptions, 'key'> & {
    sessionToken?: google.maps.places.AutocompleteSessionToken;
    /**
     * The debounce time in milliseconds to wait before fetching suggestions.
     * 
     * It's advised to set this to at least 200ms to avoid excessive API calls and improve user experience.
     * 
     * @default 200
     */
    debounceMs?: number;
};

const useAutocomplete = (
    apiKey: string,
    apiOptions?: UseAutocompleteOptions
): UseAutocompleteReturn => {
    const { sessionToken: externalToken, debounceMs = 200, ...loaderOptions } = apiOptions ?? {};

    const [isLoaded, setIsLoaded] = useState(false);
    const [isStale, setIsStale] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [places, setPlaces] = useState<PlacePrediction[] | undefined>(undefined);

    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(
        externalToken ?? null
    );
    const loaderOptionsRef = useRef(loaderOptions);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const requestIdRef = useRef(0);

    useEffect(() => {
        let cancelled = false;

        if (!apiInitialized) {
            setOptions({ key: apiKey, ...loaderOptionsRef.current });
            apiInitialized = true;
        }

        importLibrary('places').then((placesLib) => {
            if (cancelled) return;
            if (!sessionTokenRef.current) {
                sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
            }
            setIsLoaded(true);
        });

        return () => { cancelled = true; };
    }, [apiKey]);

    useEffect(() => {
        return () => clearTimeout(debounceRef.current);
    }, []);

    const getSuggestions = useCallback((input: string, requestOptions?: RequestOptions) => {
        clearTimeout(debounceRef.current);
        setError(null);

        if (!input) {
            setPlaces([]);
            setIsStale(false);
            if (sessionTokenRef.current) {
                sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
            }
            return;
        }

        if (!sessionTokenRef.current) return;

        setIsStale(true);

        const fetchSuggestions = () => {
            const currentRequestId = ++requestIdRef.current;

            google.maps.places.AutocompleteSuggestion
                .fetchAutocompleteSuggestions({
                    ...requestOptions,
                    input,
                    sessionToken: sessionTokenRef.current!,
                })
                .then(({ suggestions }) => {
                    if (currentRequestId !== requestIdRef.current) return;

                    setPlaces(
                        suggestions
                            .map((s) => s.placePrediction)
                            .filter((p): p is PlacePrediction => p !== null)
                    );
                    setIsStale(false);
                })
                .catch((err: unknown) => {
                    if (currentRequestId !== requestIdRef.current) return;
                    setError(err instanceof Error ? err : new Error(String(err)));
                    setPlaces([]);
                    setIsStale(false);
                });
        };

        if (debounceMs > 0) {
            debounceRef.current = setTimeout(fetchSuggestions, debounceMs);
        } else {
            fetchSuggestions();
        }
    }, [debounceMs]);

    const getPlaceDetails = useCallback(async (prediction: PlacePrediction): Promise<PlaceDetails> => {
        const place = prediction.toPlace();
        await place.fetchFields({
            fields: ['addressComponents', 'location', 'formattedAddress', 'attributions'],
        });

        const find = (type: string) =>
            place.addressComponents?.find((c) => c.types.includes(type));

        const details: PlaceDetails = {
            formattedAddress: place.formattedAddress,
            streetNumber: find('street_number')?.longText,
            route: find('route')?.longText,
            city: find('locality')?.longText,
            province: find('administrative_area_level_2')?.shortText,
            region: find('administrative_area_level_1')?.longText,
            country: find('country')?.longText,
            postalCode: find('postal_code')?.longText,
            location: place.location?.toJSON() ?? null,
            placeId: prediction.placeId,
            place,
        };

        sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
        setPlaces(undefined);

        return details;
    }, []);

    const autocomplete = useCallback(
        <T extends React.ComponentProps<"input">>(field: T, requestOptions?: RequestOptions) => ({
            ...field,
            onChange: (e: ChangeEvent<HTMLInputElement> | string): void => {
                // This check is to prevent the suggestions from being called 
                // when the value is set programmatically by the onChange handler
                // We still need to emit the string value otherwise the form will not be updated
                if (typeof e === 'string') {
                    field.onChange?.({ target: { value: e } } as ChangeEvent<HTMLInputElement>);
                    return;
                }
                field.onChange?.(e);
                getSuggestions(e.target.value, requestOptions);
            },
        }),
        [getSuggestions]
    );

    return { isLoaded, isStale, error, getSuggestions, getPlaceDetails, autocomplete, places };
};

export { useAutocomplete };
export type { UseAutocompleteReturn, UseAutocompleteOptions, RequestOptions, PlacePrediction, PlaceDetails };
