import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		// Base rules
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/*",
                    "/static/*",
                    "/*.json$",
                    "/*.xml$",
                ]
            },
        ],
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
		host: process.env.NEXT_PUBLIC_BASE_URL,
	};
}
