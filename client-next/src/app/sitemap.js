import { getAllBlogs } from "@/services/blogService";

export const dynamic = "force-static";

const BLOG_LAST_MODIFIED = "2026-05-27T09:53:04+00:00";

const fallbackBlogSlugs = [
  "digital-marketing-demand-jaipur",
  "coding-classes-jaipur-beginners-guide",
  "jains-vs-digital-marketing-institutes-jaipur",
  "digital-marketing-guide",
  "choose-right-computer-classes-jaipur",
  "graphic-design-vs-web-design-career",
  "top-skills-digital-marketing-course-jaipur",
  "career-scope-video-editing-courses-2026",
  "best-tally-institute-jaipur-key-factors",
  "cad-training-jaipur-classroom-experience",
];

export default async function sitemap() {

  let blogSlugs = fallbackBlogSlugs;

  try {
    const blogs = await getAllBlogs();
    if (Array.isArray(blogs) && blogs.length > 0) {
      blogSlugs = blogs
        .map((blog) => blog.slug || blog.id)
        .filter(Boolean);
    }
  } catch {
    // keep the fallback list
  }

  const blogEntries = blogSlugs.map((slug) => ({
    url: `https://jainscomputer.com/blog/${slug}/`,
    lastModified: BLOG_LAST_MODIFIED,
    priority: 0.64,
  }));

  return [

    {
      url: "https://jainscomputer.com/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 1.00,
    },

    {
      url: "https://jainscomputer.com/courses/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/why-choose-us/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/contact/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/blog/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/graphic-designing/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/digital-marketing/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/video-editing/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/tally-gst/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/cad-courses/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/artificial-intelligence/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/website-design/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/data-analytics/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/programming/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/advanced-excel/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/government-courses/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/courses/personality-development/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/privacy-policy/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    {
      url: "https://jainscomputer.com/terms-conditions/",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.80,
    },

    ...blogEntries,

    {
      url: "https://jainscomputer.com/pdf/Jains-Computer-Course-Catalogue.pdf",
      lastModified: "2026-05-27T09:53:04+00:00",
      priority: 0.64,
    },

  ];

}
