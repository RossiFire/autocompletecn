import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const currentDate = new Date();

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: `${baseUrl}`,
			lastModified: currentDate,
			changeFrequency: "never" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/docs`,
			lastModified: currentDate,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/docs/examples`,
			lastModified: currentDate,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/docs/api-reference`,
			lastModified: currentDate,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/docs/installation`,
			lastModified: currentDate,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/docs/session-token`,
			lastModified: currentDate,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
	];

	return [...staticRoutes];
}
