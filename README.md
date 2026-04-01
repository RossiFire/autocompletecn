<h1 align="center">autocompletecn</h1>

<p align="center">
  Ready-to-use Google Places Autocomplete component for React.<br/>
  Built on top of <a href="https://developers.google.com/maps/documentation/places/web-service/op-overview">Google Places API</a>, styled with <a href="https://tailwindcss.com/">Tailwind CSS</a>, works seamlessly with <a href="https://ui.shadcn.com/">Shadcn/ui</a>.
</p>

<p align="center">
  <a href="https://autocompletecn.dev/docs">Get Started</a> ·
  <a href="https://autocompletecn.dev/docs/installation">Installation</a> ·
  <a href="https://autocompletecn.dev/docs/api-reference">API Reference</a>
</p>

<br />

## Features

- 🔍 **Google Places powered** — Full access to Google's Autocomplete and Place Details APIs
- 🪝 **Headless hook** — Use the `useAutocomplete` hook to build your own UI
- 📦 **shadcn/ui compatible** — With zero configuration and theme aware
- ♿ **Accessible** — Full ARIA support, keyboard navigation, and screen reader friendly
- 🔧 **Configurable** — Automatic session token management and debounced API calls

## Installation

```bash
npx shadcn@latest add https://autocompletecn.dev/r/autocomplete.json
```

Or install just the hook:

```bash
npx shadcn@latest add https://autocompletecn.dev/r/use-autocomplete.json
```

## Quick Start

```tsx
import { Autocomplete } from "@/components/ui/autocomplete";

export default function AddressForm() {
  return (
    <Autocomplete
      apiKey="YOUR_GOOGLE_MAPS_API_KEY"
      placeholder="Search for an address..."
      onPlaceSelect={(details) => {
        console.log(details);
      }}
    />
  );
}
```

or
```tsx
import { useAutocomplete } from "@/hooks/use-autocomplete";

const {
  autocomplete,
  isStale,
  error,
  getPlaceDetails
} = useAutocomplete(GOOGLE_MAPS_API_KEY, {
  language: "en",
  debounceMs: 500
})
```


## Google Maps API Key

This component requires a Google Maps API key with the **Places API** enabled.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable the **Places API (New)**
4. Create an API key under **Credentials**

For more details, see the [Google Maps documentation](https://developers.google.com/maps/documentation/javascript/get-api-key).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my super interesting feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.