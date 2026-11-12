import Studio from '@/components/studio-v3';
import { offerings, questions, site } from '@/lib/studio-v3-content';

// Structured data for search engines and AI assistants, built from the same content as the page.
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#organization`,
      name: site.name,
      description: site.description,
      url: site.url,
      image: `${site.url}/images/blue.webp`,
      telephone: site.phone,
      priceRange: 'от 200 000 ₸',
      areaServed: [{ '@type': 'Country', name: 'Казахстан' }],
      knowsLanguage: ['ru'],
      contactPoint: { '@type': 'ContactPoint', telephone: site.phone, contactType: 'sales', availableLanguage: ['ru'], url: site.whatsapp },
      sameAs: [site.whatsapp],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Услуги разработки',
        itemListElement: offerings.map(item => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: item.title, description: item.description, provider: { '@id': `${site.url}/#organization` } },
          priceSpecification: { '@type': 'PriceSpecification', minPrice: item.priceValue, priceCurrency: site.currency },
          description: `от ${item.price} ₸, срок: ${item.time}`,
        })),
      },
    },
    { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: site.name, description: site.tagline, inLanguage: 'ru', publisher: { '@id': `${site.url}/#organization` } },
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: questions.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
    },
  ],
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    <Studio />
  </>;
}
