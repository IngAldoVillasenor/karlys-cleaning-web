import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.karlyscleaning.com",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.karlyscleaning.com/about",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
