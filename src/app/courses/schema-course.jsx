// ============================================================
// FILE: app/courses/[slug]/schema-course.jsx
// USAGE: Import and render inside each course detail page.
// This is a REUSABLE component — pass course data as props.
// ============================================================

import Script from 'next/script'

// ─────────────────────────────────────────────
// 3. COURSE SCHEMA  (one per course page)
//    Props: pass your course object from your data/CMS
// ─────────────────────────────────────────────
export function CourseSchema({ course }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.name,
    "description": course.description,
    "url": `https://jainscomputer.com/courses/${course.slug}/`,
    "image": course.image,
    "provider": {
      "@type": "EducationalOrganization",
      "@id": "https://jainscomputer.com/#organization",
      "name": "Jains Computer",
      "url": "https://jainscomputer.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "13A, Shivpuri, Indrapura, Jhotwara",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302012",
        "addressCountry": "IN"
      }
    },
    "educationalLevel": course.level,
    "teaches": course.skills,
    "coursePrerequisites": course.prerequisites || "No prior experience required",
    "occupationalCategory": course.category,
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Onsite",
      "courseWorkload": course.duration,
      "location": {
        "@type": "Place",
        "name": "Jains Computer, Jhotwara",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "13A, Shivpuri, Indrapura, Jhotwara",
          "addressLocality": "Jaipur",
          "addressRegion": "Rajasthan",
          "postalCode": "302012",
          "addressCountry": "IN"
        }
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "INR",
        "validFrom": "2025-01-01"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": course.reviewCount || "400",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  return (
    <Script
      id={`schema-course-${course.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}


// ─────────────────────────────────────────────
// 4. BREADCRUMB SCHEMA  (one per course page)
// ─────────────────────────────────────────────
export function BreadcrumbSchema({ courseName, courseSlug }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://jainscomputer.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Courses",
        "item": "https://jainscomputer.com/courses/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": courseName,
        "item": `https://jainscomputer.com/courses/${courseSlug}/`
      }
    ]
  }

  return (
    <Script
      id={`schema-breadcrumb-${courseSlug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}


// ─────────────────────────────────────────────
// 5. COURSE PAGE FAQ SCHEMA  (one per course)
//    Pass an array of { question, answer } objects
// ─────────────────────────────────────────────
export function CourseFAQSchema({ faqs, courseSlug }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }))
  }

  return (
    <Script
      id={`schema-faq-${courseSlug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  )
}


// ─────────────────────────────────────────────
// COURSE DATA — fill this for all 12 courses
// ─────────────────────────────────────────────
export const COURSES_DATA = {
  "digital-marketing": {
    slug: "digital-marketing",
    name: "Digital Marketing Course in Jaipur",
    description: "Learn SEO, PPC, affiliate marketing, email marketing, social media marketing, and performance marketing at Jains Computer Jhotwara, Jaipur. Practical training with placement support.",
    image: "https://jainscomputer.com/_next/static/media/Digital-Marketing-Detail.0blgb_rb7jj_w.webp",
    level: "Beginner",
    duration: "P3M", // ISO 8601 duration: 3 months
    category: "Marketing",
    reviewCount: "547",
    skills: ["SEO", "Google Ads", "Social Media Marketing", "Email Marketing", "Content Marketing", "PPC", "Affiliate Marketing"],
    prerequisites: "No prior experience required"
  },
  "graphic-designing": {
    slug: "graphic-designing",
    name: "Graphic Designing Course in Jaipur",
    description: "Learn visual storytelling, color theory, branding, typography, and design tools at Jains Computer Jhotwara. Industry-focused graphic design training with placement support.",
    image: "https://jainscomputer.com/_next/static/media/graphic-designer.16mx49_xc48zr.webp",
    level: "Beginner",
    duration: "P4M",
    category: "Design",
    reviewCount: "421",
    skills: ["Adobe Photoshop", "Illustrator", "Canva", "Typography", "Branding", "Color Theory"],
    prerequisites: "No prior experience required"
  },
  "video-editing": {
    slug: "video-editing",
    name: "Video Editing Course in Jaipur",
    description: "Learn professional video editing, footage trimming, motion graphics, and visual storytelling at Jains Computer, the best video editing institute in Jhotwara, Jaipur.",
    image: "https://jainscomputer.com/_next/static/media/video-editing.12moz6j122.~u.webp",
    level: "Beginner",
    duration: "P3M",
    category: "Media Production",
    reviewCount: "487",
    skills: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Video Trimming", "Motion Graphics"],
    prerequisites: "No prior experience required"
  },
  "tally-gst": {
    slug: "tally-gst",
    name: "Tally + GST Course in Jaipur",
    description: "Master Tally ERP 9, TallyPrime, GST filing, bookkeeping, and tax management at Jains Computer, the best Tally institute in Jhotwara, Jaipur.",
    image: "https://jainscomputer.com/_next/static/media/telly.0icsx1m~qv1xh.webp",
    level: "Beginner",
    duration: "P5M",
    category: "Finance",
    reviewCount: "447",
    skills: ["TallyPrime", "GST Filing", "Bookkeeping", "Financial Accounting", "Tax Management"],
    prerequisites: "Basic computer knowledge helpful but not required"
  },
  "artificial-intelligence": {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence Course in Jaipur",
    description: "Learn AI tools, prompt engineering, automation, and industry-specific AI applications at Jains Computer Jhotwara. Future-ready AI training in Jaipur.",
    image: "https://jainscomputer.com/_next/static/media/Ai_converted.0h2jxmfx.x-1~.webp",
    level: "Intermediate",
    duration: "P2M",
    category: "Technology",
    reviewCount: "465",
    skills: ["Prompt Engineering", "AI Tools", "ChatGPT", "Automation", "Machine Learning Basics"],
    prerequisites: "Basic computer knowledge"
  },
  "website-design": {
    slug: "website-design",
    name: "Website Design Course in Jaipur",
    description: "Learn to design responsive, user-friendly websites using HTML, CSS, and modern design tools at Jains Computer, the best web design institute in Jhotwara, Jaipur.",
    image: "https://jainscomputer.com/_next/static/media/webdesign.12-dbsujnaum0.webp",
    level: "Beginner",
    duration: "P3M",
    category: "Web Development",
    reviewCount: "451",
    skills: ["HTML", "CSS", "WordPress", "UI Design", "Responsive Design", "Figma"],
    prerequisites: "No prior experience required"
  },
  "data-analytics": {
    slug: "data-analytics",
    name: "Data Analytics Course in Jaipur",
    description: "Master data cleaning, data visualization, Excel, Power BI, and dashboard creation at Jains Computer Jaipur. Practical data analytics training with placement support.",
    image: "https://jainscomputer.com/_next/static/media/Data-Analytics.12i54.6piki.a.webp",
    level: "Intermediate",
    duration: "P3M",
    category: "Data Science",
    reviewCount: "451",
    skills: ["Power BI", "Excel", "Data Visualization", "SQL Basics", "Dashboard Creation"],
    prerequisites: "Basic Excel knowledge helpful"
  },
  "programming": {
    slug: "programming",
    name: "Programming Course in Jaipur",
    description: "Learn basic to advanced coding, software development, and web app building at Jains Computer, the best programming institute in Jhotwara, Jaipur.",
    image: "https://jainscomputer.com/_next/static/media/Programing.07aghq4jq7rct.webp",
    level: "Beginner",
    duration: "P4M",
    category: "Software Development",
    reviewCount: "555",
    skills: ["Python", "JavaScript", "HTML/CSS", "C/C++", "Problem Solving", "OOP"],
    prerequisites: "No prior experience required"
  },
  "advanced-excel": {
    slug: "advanced-excel",
    name: "Advanced Excel Course in Jaipur",
    description: "Learn Advanced Excel, formulas, pivot tables, VLOOKUP, macros, and data analysis at Jains Computer Jhotwara, Jaipur. Fast-track your office and finance career.",
    image: "https://jainscomputer.com/_next/static/media/advance-excel.11mbmnfb3tsdm.webp",
    level: "Beginner",
    duration: "P1M",
    category: "Finance",
    reviewCount: "647",
    skills: ["Advanced Formulas", "Pivot Tables", "VLOOKUP", "Macros", "Data Analysis", "Charts"],
    prerequisites: "No prior experience required"
  },
  "cad-courses": {
    slug: "cad-courses",
    name: "CAD Course in Jaipur",
    description: "Learn AutoCAD, 2D and 3D design for architecture, engineering, and construction at Jains Computer Jhotwara. Best CAD training institute in Jaipur.",
    image: "https://jainscomputer.com/_next/static/media/graphics.0f8q5svuh4rcx.webp",
    level: "Beginner",
    duration: "P3M",
    category: "Architecture",
    reviewCount: "567",
    skills: ["AutoCAD", "2D Drafting", "3D Modeling", "Architecture Drawing", "Engineering Layouts"],
    prerequisites: "No prior experience required"
  },
  "government-courses": {
    slug: "government-courses",
    name: "Government Courses in Jaipur",
    description: "Enroll in government-recognized skill development programs at Jains Computer Jhotwara, Jaipur. Get certified and improve career security with government-backed courses.",
    image: "https://jainscomputer.com/_next/static/media/Govt.0lyl2qryasgpa.webp",
    level: "Beginner",
    duration: "P2M",
    category: "Government Certification",
    reviewCount: "447",
    skills: ["Computer Basics", "Office Tools", "Internet Skills", "Government Certification"],
    prerequisites: "No prior experience required"
  },
  "personality-development": {
    slug: "personality-development",
    name: "Personality Development Course in Jaipur",
    description: "Improve communication skills, confidence, and professional appearance with Jains Computer's personality development course in Jhotwara, Jaipur.",
    image: "https://jainscomputer.com/_next/static/media/Personality Development.07758w8c1cwuv.webp",
    level: "Beginner",
    duration: "P1M",
    category: "Professional Development",
    reviewCount: "402",
    skills: ["Communication Skills", "Confidence Building", "Interview Preparation", "Professional Etiquette"],
    prerequisites: "No prior experience required"
  }
}


// ─────────────────────────────────────────────
// HOW TO USE IN A COURSE PAGE:
// e.g. app/courses/digital-marketing/page.js
// ─────────────────────────────────────────────
//
// import { CourseSchema, BreadcrumbSchema, CourseFAQSchema, COURSES_DATA } from '../schema-course'
//
// export default function DigitalMarketingPage() {
//   const course = COURSES_DATA['digital-marketing']
//   const faqs = [
//     { question: "How long will the digital marketing course take?", answer: "3 to 6 months depending on the level of depth." },
//     { question: "Does it cover SEO?", answer: "Yes, SEO including keyword research, on-page and off-page optimization is a core module." },
//     { question: "Do you offer placement support?", answer: "Yes, exclusive placement support, interview training, and access to hiring networks are provided." },
//   ]
//
//   return (
//     <>
//       <CourseSchema course={course} />
//       <BreadcrumbSchema courseName={course.name} courseSlug={course.slug} />
//       <CourseFAQSchema faqs={faqs} courseSlug={course.slug} />
//       {/* ... rest of your page JSX ... */}
//     </>
//   )
// }
