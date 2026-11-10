import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://recyconnect.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/materials', '/materials/*', '/how-it-works', '/about', '/contact', '/terms', '/privacy'],
        disallow: ['/dashboard/*', '/admin/*', '/messages/*', '/connections/*', '/notifications/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
