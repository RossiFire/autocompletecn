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
    getSuggestions: (input: string, requestOptions?: RequestOptions) => void;
    getPlaceDetails: (prediction: PlacePrediction) => Promise<PlaceDetails>;
    autocomplete: <T extends React.ComponentProps<"input">>(field: T, requestOptions?: RequestOptions) => T & {
        onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    };
    places: PlacePrediction[] | undefined;
};

let apiInitialized = false;

type UseAutocompleteOptions = Omit<APIOptions, 'key'> & {
    sessionToken?: google.maps.places.AutocompleteSessionToken;
};

const useAutocomplete = (
    apiKey: string,
    apiOptions?: UseAutocompleteOptions
): UseAutocompleteReturn => {
    const { sessionToken: externalToken, ...loaderOptions } = apiOptions ?? {};

    const [isLoaded, setIsLoaded] = useState(false);
    const [places, setPlaces] = useState<PlacePrediction[] | undefined>(undefined);

    const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(
        externalToken ?? null
    );
    const requestIdRef = useRef(0);

    useEffect(() => {
        let cancelled = false;

        if (!apiInitialized) {
            setOptions({ key: apiKey, ...loaderOptions });
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
    }, [apiKey, loaderOptions]);

    const getSuggestions = useCallback((input: string, requestOptions?: RequestOptions) => {
        if (!input) {
            setPlaces([]);
            if (sessionTokenRef.current) {
                sessionTokenRef.current = new google.maps.places.AutocompleteSessionToken();
            }
            return;
        }

        if (!sessionTokenRef.current) return;

        const currentRequestId = ++requestIdRef.current;

        google.maps.places.AutocompleteSuggestion
            .fetchAutocompleteSuggestions({
                ...requestOptions,
                input,
                sessionToken: sessionTokenRef.current,
            })
            .then(({ suggestions }) => {
                if (currentRequestId !== requestIdRef.current) return;

                setPlaces(
                    suggestions
                        .map((s) => s.placePrediction)
                        .filter((p): p is PlacePrediction => p !== null)
                );
            })
            .catch(() => {
                if (currentRequestId !== requestIdRef.current) return;
                setPlaces([]);
            });
    }, []);

    const getPlaceDetails = useCallback(async (prediction: PlacePrediction): Promise<PlaceDetails> => {
        const place = prediction.toPlace();
        await place.fetchFields({
            fields: ['addressComponents', 'location', 'formattedAddress'],
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
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                field.onChange?.(e);
                getSuggestions(e.target.value, requestOptions);
                return e;
            },
        }),
        [getSuggestions]
    );

    return { isLoaded, getSuggestions, getPlaceDetails, autocomplete, places };
};

export { useAutocomplete };
export type { UseAutocompleteReturn, UseAutocompleteOptions, RequestOptions, PlacePrediction, PlaceDetails };
