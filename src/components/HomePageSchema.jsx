export default function HomePageSchema({ schemaData }) {
   const { 
      headline,
      keywords,
      description,
      inLanguage,
      copyrightHolder_name,
      contactPoint,
      address,
      secondSchema,
    } = schemaData;
   return <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Dubai Housing",
            "alternateName": ["Dubai Housing", "https://www.dubaihousing-ae.com"],
            "url": "https://www.dubaihousing-ae.com"
          })
        }}
        
      />

      {/* Second Script: Website Details */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "#website",
            headline,
            url: "https://www.dubaihousing-ae.com", // Replace with dynamic if needed
            keywords,
            description,
            inLanguage: {
              "@type": "Language",
              "name": inLanguage
            },
            copyrightHolder: {
              "@type": "Organization",
              "name": copyrightHolder_name,
              "logo": "https://www.dubaihousing-ae.com/img/logo/logo.svg",
              "url": "https://www.dubaihousing-ae.com",
              "contactPoint": {
                "@type": "ContactPoint",
                ...contactPoint
              },
              "address": {
                "@type": "PostalAddress",
                ...address
              }
            }
          })
        }}
      />

      {/* Third Script: Organization Details */}
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": secondSchema.type,
            "name": secondSchema.name,
            "logo": "https://www.dubaihousing-ae.com/img/logo/logo.svg",
            "url": "https://www.dubaihousing-ae.com",
            "sameAs": secondSchema.sameAs,
            "contactPoint": {
              "@type": "ContactPoint",
              ...secondSchema.contactPoint
            },
            "address": {
              "@type": "PostalAddress",
              ...secondSchema.address
            }
          })
        }}
      />
   </>
}