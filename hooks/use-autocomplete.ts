'use client';

import { type ChangeEvent, useState, useRef, useCallback, useEffect } from 'react';
import { setOptions, importLibrary, type APIOptions } from '@googlemaps/js-api-loader';

type PlacePrediction = google.maps.places.PlacePrediction;
type FetchParams = Omit<google.maps.places.AutocompleteRequest, 'input' | 'sessionToken'>;


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
    getSuggestions: (input: string, fetchParams?: FetchParams) => void;
    getPlaceDetails: (prediction: PlacePrediction) => Promise<PlaceDetails>;
    autocomplete: <T extends React.ComponentProps<"input">>(field: T, fetchParams?: FetchParams) => T
    places: PlacePrediction[] | undefined;
};

let apiInitialized = false;

type UseAutocompleteOptions = Omit<APIOptions, 'key'> & {
    /**
     * When provided, the hook enters **controlled mode**: it uses this token
     * directly and never creates or rotates tokens internally.
     * Pair with `onSessionEnd` to know when to supply a fresh token.
     *
     * When omitted, the hook manages the token lifecycle internally (uncontrolled mode).
     */
    sessionToken?: google.maps.places.AutocompleteSessionToken;
    /**
     * Called when a session ends (place selected or input cleared).
     * Only relevant in controlled mode — use it to rotate `sessionToken`.
     */
    onSessionEnd?: () => void;
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
    options?: UseAutocompleteOptions
): UseAutocompleteReturn => {
    const { sessionToken: externalToken, onSessionEnd, debounceMs = 200, ...loaderOptions } = options || {};
    const isControlled = externalToken != null;

    const [isLoaded, setIsLoaded] = useState(false);
    const [isStale, setIsStale] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [places, setPlaces] = useState<PlacePrediction[] | undefined>(undefined);

    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(
        externalToken ?? null
    );
    const loaderOptionsRef = useRef(loaderOptions);
    const onSessionEndRef = useRef(onSessionEnd);
    onSessionEndRef.current = onSessionEnd;
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const requestIdRef = useRef(0);

    useEffect(() => {
        if (isControlled) {
            sessionTokenRef.current = externalToken;
        }
    }, [isControlled, externalToken]);

    const rotateToken = useCallback(() => {
        if (isControlled) {
            onSessionEndRef.current?.();
        } else {
            sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
        }
    }, [isControlled]);

    useEffect(() => {
        let cancelled = false;

        if (!apiInitialized) {
            setOptions({ key: apiKey, ...loaderOptionsRef.current });
            apiInitialized = true;
        }

        importLibrary('places').then((placesLib) => {
            if (cancelled) {
                return;
            };
            if (!isControlled && !sessionTokenRef.current) {
                sessionTokenRef.current = new placesLib.AutocompleteSessionToken();
            }
            setIsLoaded(true);
        });

        return () => { cancelled = true; };
    }, [apiKey]);

    useEffect(() => {
        return () => clearTimeout(debounceRef.current);
    }, []);

    const getSuggestions = useCallback((input: string, fetchParams?: FetchParams) => {
        clearTimeout(debounceRef.current);
        setError(null);

        if (!input) {
            setPlaces([]);
            setIsStale(false);
            rotateToken();
            return;
        }

        if (!sessionTokenRef.current) {
            return;
        };

        setIsStale(true);

        const fetchSuggestions = () => {
            const currentRequestId = ++requestIdRef.current;

            google.maps.places.AutocompleteSuggestion
                .fetchAutocompleteSuggestions({
                    ...fetchParams,
                    input,
                    sessionToken: sessionTokenRef.current ?? undefined,
                })
                .then(({ suggestions }) => {
                    if (currentRequestId !== requestIdRef.current) {
                        return;
                    };

                    setPlaces(
                        suggestions
                            .map((s) => s.placePrediction)
                            .filter((p): p is PlacePrediction => p !== null)
                    );
                    setIsStale(false);
                })
                .catch((err: unknown) => {
                    if (currentRequestId !== requestIdRef.current) {
                        return;
                    };
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
    }, [debounceMs, rotateToken]);

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

        rotateToken();
        setPlaces(undefined);

        return details;
    }, [rotateToken]);

    const autocomplete = useCallback(
        <T extends React.ComponentProps<"input">>(field: T, fetchParams?: FetchParams) => ({
            ...field,
            onChange: (e: ChangeEvent<HTMLInputElement>): void => {
                field.onChange?.(e);
                getSuggestions(e.target.value, fetchParams);
            },
        }),
        [getSuggestions]
    );

    return { isLoaded, isStale, error, getSuggestions, getPlaceDetails, autocomplete, places };
};

export { useAutocomplete };
export type { UseAutocompleteReturn, UseAutocompleteOptions, FetchParams, PlacePrediction, PlaceDetails };
