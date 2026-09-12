// ============================================================
// FILE: app/layout.js OR app/page.js (Homepage)
// USAGE: Paste the <Script> block inside your homepage component
// or in layout.js for site-wide org schema.
// Requires: import Script from 'next/script'
// ============================================================

import Script from 'next/script'

// ─────────────────────────────────────────────
// 1. EDUCATIONAL ORGANIZATION + LOCAL BUSINESS
//    Place in: app/page.js (homepage) or layout.js
// ─────────────────────────────────────────────
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": "https://jainscomputer.com/#organization",
        "name": "Jains Computer",
        "alternateName": "Jains Computer Jhotwara",
        "url": "https://jainscomputer.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jainscomputer.com/_next/static/media/Logo.10ruq6-2t60aa.svg",
          "width": 200,
          "height": 60
        },
        "image": "https://jainscomputer.com/_next/static/media/staff.0.-2s-1wrgqqq.webp",
        "description": "Jains Computer is Jaipur's #1 IT training institute in Jhotwara with 26+ years of excellence. Offering AI-powered courses in Digital Marketing, Graphic Design, Programming, Tally, Video Editing and more. 10,000+ students trained with placement support.",
        "foundingDate": "1998",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 10,
          "maxValue": 50
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "13A, Shivpuri, Indrapura, Jhotwara",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "postalCode": "302012",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 26.9428365,
          "longitude": 75.7528809
        },
        "hasMap": "https://www.google.com/maps?q=26.9428365,75.7528809",
        "telephone": "+91-9829498998",
        "email": "contact@jainscomputer.com",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "20:00"
          }
        ],
        "priceRange": "₹₹",
        "currenciesAccepted": "INR",
        "paymentAccepted": "Cash, UPI, Bank Transfer, EMI",
        "sameAs": [
          "https://www.instagram.com/jainscomputer/",
          "https://www.facebook.com/jainscomputer/",
          "https://www.youtube.com/@jainscomputer"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "600",
          "bestRating": "5",
          "worstRating": "1"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "IT Training Courses",
          "itemListElement": [
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Digital Marketing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Graphic Designing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Tally + GST" } },
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Video Editing" } },
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Artificial Intelligence" } },
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Website Design" } },
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Programming" } },
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Data Analytics" } },
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "Advanced Excel" } },
            { "@type": "Offer", "itemOffered": { "@type": "Course", "name": "CAD Courses" } }
          ]
        }
      }
    ]
  }

  return (
    <Script
      id="schema-organization"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}


// ─────────────────────────────────────────────
// 2. HOMEPAGE FAQ SCHEMA
//    Place in: app/page.js (homepage only)
// ─────────────────────────────────────────────
export function HomepageFAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to take admission at Jains Computer, Jhotwara?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can enroll by visiting our institute at 13A, Shivpuri, Indrapura, Jhotwara, Jaipur or by contacting us online at contact@jainscomputer.com or calling +91-9829498998. Our team will guide you through the steps to choose the right course."
        }
      },
      {
        "@type": "Question",
        "name": "Are there any eligibility criteria to take admission at Jains Computer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most computer courses require no specific qualification or prior experience. You can start with a basic computer class and then switch to advanced-level skills to build a strong job portfolio."
        }
      },
      {
        "@type": "Question",
        "name": "What courses are offered at Jains Computer Jaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jains Computer offers 12 job-ready courses including Digital Marketing, Graphic Designing, Video Editing, Tally + GST, Artificial Intelligence, Website Design, Programming, Data Analytics, Advanced Excel, CAD Courses, Government Courses, and Personality Development."
        }
      },
      {
        "@type": "Question",
        "name": "Does Jains Computer provide placement support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Jains Computer provides dedicated placement support including interview training, resume building guidance, and access to a wide hiring network of companies in Jaipur and across India. Over 5,000 students have been placed to date."
        }
      },
      {
        "@type": "Question",
        "name": "What are the fees for courses at Jains Computer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Course fees vary depending on the course and duration selected. Flexible EMI and installment payment options are available. Contact us at +91-9829498998 or visit our institute in Jhotwara, Jaipur for a detailed fee breakdown."
        }
      },
      {
        "@type": "Question",
        "name": "What are the timings of Jains Computer institute?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jains Computer is open Monday to Saturday from 8:00 AM to 8:00 PM. Regular, weekend, and evening batches are available to accommodate students who are studying or working."
        }
      }
    ]
  }

  return (
    <Script
      id="schema-homepage-faq"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}


// ─────────────────────────────────────────────
// HOW TO USE IN YOUR HOMEPAGE (app/page.js):
// ─────────────────────────────────────────────
//
// import { OrganizationSchema, HomepageFAQSchema } from './schema-homepage'
//
// export default function HomePage() {
//   return (
//     <>
//       <OrganizationSchema />
//       <HomepageFAQSchema />
//       {/* ... rest of your page JSX ... */}
//     </>
//   )
// }
