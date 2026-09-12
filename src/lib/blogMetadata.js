import { buildMediaUrl } from "@/services/blogService";

const SITE_NAME = "Jains Computer";
const DEFAULT_BASE = "https://jainscomputer.com";
const LOCALE = "en_IN";

const pickImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === "string") {
    return image ? buildMediaUrl(image) : null;
  }
  if (image && typeof image === "object") {
    const url = image.url || image.src || image.fileURL || image.path;
    return url ? buildMediaUrl(url) : null;
  }
  return null;
};

const buildRobots = (seo) => {
  if (seo.noindex) return { index: false, follow: true };

  const raw = seo.robots;

  if (raw && typeof raw === "object") {
    return {
      index: raw.index !== false,
      follow: raw.follow !== false,
    };
  }

  if (typeof raw === "string") {
    const parts = raw
      .toLowerCase()
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    return {
      index: !parts.includes("noindex"),
      follow: !parts.includes("nofollow"),
    };
  }

  return undefined;
};

const parseKeywords = (keywords) => {
  if (Array.isArray(keywords)) {
    return keywords.map((keyword) => String(keyword).trim()).filter(Boolean);
  }
  if (typeof keywords === "string") {
    return keywords
      .split(",")
      .map((keyword) => keyword.trim())
      .filter(Boolean);
  }
  return [];
};

export const buildBlogMetadata = (blog, slug) => {
  if (!blog) return null;

  const seo = blog.seo || {};
  const canonical = seo.canonical || `${DEFAULT_BASE}/blog/${slug}/`;

  const title = seo.title || `${blog.title} | Jains Computer`;
  const description =
    seo.description || blog.desc || blog.title || "";
  const keywords = parseKeywords(seo.keywords);
  const robots = buildRobots(seo);

  const ogImage = pickImageUrl(seo.ogImage) || pickImageUrl(blog.image);
  const twitterImage = pickImageUrl(seo.twitterImage) || ogImage;

  return {
    title,
    description,
    ...(keywords.length ? { keywords } : {}),
    alternates: { canonical },
    ...(robots ? { robots } : {}),
    openGraph: {
      type: "article",
      url: canonical,
      siteName: SITE_NAME,
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      locale: LOCALE,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || title,
      description: seo.twitterDescription || description,
      ...(twitterImage ? { images: [twitterImage] } : {}),
    },
  };
};

export default buildBlogMetadata;
