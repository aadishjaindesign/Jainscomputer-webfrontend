import { blogs } from "@/data/blogsData";
import { getPayloadCollection } from "./payloadApi";

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL;

const BLOG_COLLECTION = "blogs";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const buildMediaUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;

  let cleanUrl = url;
  const prefixRegex = /^(\/?api\/media\/file\/)+/;
  if (prefixRegex.test(cleanUrl)) {
    cleanUrl = cleanUrl.replace(prefixRegex, "");
  }
  cleanUrl = cleanUrl.replace(/^\/+/, "");

  return `/api/media/file/${cleanUrl}`;
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* ------------------------------------------------------------------ */
/*  Lexical rich text -> HTML                                          */
/* ------------------------------------------------------------------ */

const serializeLexicalText = (child) => {
  if (!child) return "";
  if (child.type === "linebreak") return "<br />";
  if (child.type !== "text") return "";

  let text = escapeHtml(child.text);
  const format = child.format || 0;

  if (format & 16) text = `<code>${text}</code>`;
  if (format & 8) text = `<u>${text}</u>`;
  if (format & 2) text = `<em>${text}</em>`;
  if (format & 4) text = `<strike>${text}</strike>`;
  if (format & 1) text = `<strong>${text}</strong>`;

  return text;
};

const serializeLexicalChildren = (children) =>
  (children || [])
    .map((child) => {
      if (!child) return "";
      if (child.type === "text" || child.type === "linebreak") {
        return serializeLexicalText(child);
      }
      return serializeLexicalNode(child);
    })
    .join("");

const serializeLexicalListItem = (item) => {
  if (!item) return "";
  if (item.type === "list") return serializeLexicalNode(item);
  return `<li>${serializeLexicalChildren(item.children)}</li>`;
};

const serializeTableCell = (cell) => {
  const tag = cell.tag === "th" || cell.type === "th" ? "th" : "td";
  const content = (cell.children || []).map((c) => serializeLexicalNode(c)).join("");
  return `<${tag}>${content}</${tag}>`;
};

const serializeTableRow = (row) => {
  const cells = (row.children || [])
    .map((cell) => {
      if (!cell) return "";
      if (cell.type === "td" || cell.type === "th") return serializeTableCell(cell);
      if (cell.type === "tr") return serializeTableRow(cell);
      return "";
    })
    .join("");
  return `<tr>${cells}</tr>`;
};

const serializeTable = (node) => {
  const children = node.children || [];
  const rowsSource =
    children[0] && children[0].type === "table" ? children[0].children || [] : children;

  const rows = rowsSource
    .map((child) => {
      if (!child) return "";
      if (child.type === "tr") return serializeTableRow(child);
      if (child.type === "table") return serializeTable(child);
      return "";
    })
    .join("");

  return `<table>${rows}</table>`;
};

const serializeLexicalNode = (node) => {
  if (!node) return "";

  switch (node.type) {
    case "paragraph":
      return `<p>${serializeLexicalChildren(node.children)}</p>`;
    case "heading":
      return `<${node.tag}>${serializeLexicalChildren(node.children)}</${node.tag}>`;
    case "quote":
      return `<blockquote>${serializeLexicalChildren(node.children)}</blockquote>`;
    case "list": {
      const tag = node.listType === "number" ? "ol" : "ul";
      return `<${tag}>${(node.children || [])
        .map(serializeLexicalListItem)
        .join("")}</${tag}>`;
    }
    case "listitem":
      return serializeLexicalListItem(node);
    case "link": {
      const url = node.fields?.url || node.url || "#";
      return `<a href="${escapeHtml(url)}">${serializeLexicalChildren(
        node.children
      )}</a>`;
    }
    case "upload": {
      const value = node.value || {};
      const url = value.url || node.fields?.url || "";
      const alt = node.fields?.alt || value.alt || "";
      return `<img src="${buildMediaUrl(url)}" alt="${escapeHtml(alt)}" />`;
    }
    case "hr":
      return "<hr />";
    case "table":
      return serializeTable(node);
    case "tr":
      return serializeTableRow(node);
    case "td":
    case "th":
      return serializeTableCell(node);
    default:
      return node.children
        ? `<p>${serializeLexicalChildren(node.children)}</p>`
        : "";
  }
};

const getContent = (doc) => {
  if (typeof doc.contentHtml === "string" && doc.contentHtml) {
    return doc.contentHtml;
  }

  if (typeof doc.content === "string") {
    return doc.content;
  }

  if (doc.content && typeof doc.content === "object") {
    const rootChildren = doc.content.root?.children;
    if (Array.isArray(rootChildren)) {
      const html = rootChildren.map(serializeLexicalNode).join("");
      if (html) return html;
    }
  }

  if (typeof doc.body === "string" && doc.body) {
    return doc.body;
  }

  return `<p>${escapeHtml(
    doc.shortDescription || doc.excerpt || doc.description || doc.title || ""
  )}</p>`;
};

/* ------------------------------------------------------------------ */
/*  Mapping helpers                                                    */
/* ------------------------------------------------------------------ */

const parseDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
};

const formatDisplayDate = (date) =>
  `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

const parseMonthYear = (dateStr) => {
  if (!dateStr) return null;
  const match = String(dateStr).match(/([A-Za-z]{3,})\s*(\d{4})/);
  if (!match) return null;
  const month = MONTHS.findIndex(
    (m) => m.toLowerCase() === match[1].slice(0, 3).toLowerCase()
  );
  if (month === -1) return null;
  return new Date(Date.UTC(Number(match[2]), month, 1)).getTime();
};

const mapCategory = (category) => {
  if (!category) return { name: "Blog", slug: "blog" };
  if (typeof category === "string") {
    return { name: category, slug: slugify(category) };
  }
  const name = category.name || category.title || "Blog";
  return { name, slug: category.slug || slugify(name) };
};

const mapTags = (tags) => {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((tag) => {
      if (!tag) return null;
      if (typeof tag === "string") {
        return { name: tag, slug: slugify(tag) };
      }
      const name = tag.name || tag.title || tag.label || "";
      return { name, slug: tag.slug || slugify(name) };
    })
    .filter((tag) => tag && tag.name);
};

const mapImage = (doc) => {
  const candidates = [
    doc.featuredImage,
    doc.bannerImage,
    doc.image,
    doc.thumbnail,
    doc.heroImage,
  ];

  for (const image of candidates) {
    if (typeof image === "string") {
      if (image) return { src: buildMediaUrl(image), alt: doc.title || "" };
      continue;
    }
    if (image && typeof image === "object") {
      const url = image.url || image.src || image.fileURL || image.path;
      if (url) {
        return {
          src: buildMediaUrl(url),
          alt: image.alt || doc.title || "",
          width: image.width,
          height: image.height,
        };
      }
    }
  }
  return null;
};

const computeReadingTime = (contentHtml) => {
  const words = String(contentHtml || "")
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const mapReadingTime = (doc) => {
  const raw = doc.readingTime;
  if (typeof raw === "number" && raw > 0) return Math.round(raw);
  if (typeof raw === "string" && raw.trim() !== "") {
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return computeReadingTime(getContent(doc));
};

const mapRelatedBlogs = (related) => {
  if (!Array.isArray(related)) return [];
  return related
    .map((item) => {
      if (!item) return null;
      if (typeof item === "string") return null;
      if (item && typeof item === "object" && item.slug) {
        return mapPayloadBlog(item);
      }
      return null;
    })
    .filter(Boolean);
};

const mapSeo = (doc) => {
  return doc.seo && typeof doc.seo === "object" ? doc.seo : {};
};

const mapPayloadBlog = (doc) => {
  const date = parseDate(doc.publishDate || doc.publishedDate || doc.createdAt);
  const category = mapCategory(doc.category);

  return {
    id: doc.slug || String(doc.id),
    slug: doc.slug || String(doc.id),
    title: doc.title || "Untitled Blog",
    category: category.name,
    categorySlug: category.slug,
    desc:
      doc.shortDescription ||
      doc.excerpt ||
      doc.description ||
      doc.metaDescription ||
      (doc.seo && (doc.seo.description || doc.seo.title)) ||
      doc.title ||
      "",
    date: date ? formatDisplayDate(date) : "",
    dateISO: date ? date.toISOString() : "",
    timestamp: date ? date.getTime() : 0,
    image: mapImage(doc),
    ctaText: doc.ctaText || doc.callToAction || "",
    content: getContent(doc),
    readingTime: mapReadingTime(doc),
    featured: Boolean(doc.featured),
    tags: mapTags(doc.tags),
    relatedBlogs: mapRelatedBlogs(doc.relatedBlogs),
    seo: mapSeo(doc),
  };
};

const mapStaticBlog = (blog) => {
  const timestamp =
    parseMonthYear(blog.date) ||
    parseDate(blog.date)?.getTime() ||
    0;

  return {
    id: blog.id,
    slug: blog.id,
    title: blog.title || "Untitled Blog",
    category: blog.category || "Blog",
    categorySlug: slugify(blog.category || "Blog"),
    desc: blog.desc || blog.title || "",
    date: blog.date || "",
    dateISO: "",
    timestamp,
    image: blog.image
      ? { src: typeof blog.image === "string" ? blog.image : blog.image.src || "" }
      : null,
    ctaText: blog.ctaText || "",
    content: blog.content || "",
    readingTime: computeReadingTime(blog.content || ""),
    featured: Boolean(blog.featured),
    tags: (blog.tags || []).map((tag) =>
      typeof tag === "string"
        ? { name: tag, slug: slugify(tag) }
        : { name: tag.name, slug: tag.slug || slugify(tag.name) }
    ),
    relatedBlogs: [],
    seo: blog.seo || {},
  };
};

/* ------------------------------------------------------------------ */
/*  Filtering                                                          */
/* ------------------------------------------------------------------ */

const applyClientFilters = (docs, { search, category, tag, featured }) => {
  const query = (search || "").trim().toLowerCase();

  return docs.filter((blog) => {
    if (featured && !blog.featured) return false;

    if (category) {
      const target = slugify(category).toLowerCase();
      const matches =
        slugify(blog.category).toLowerCase() === target ||
        blog.category.toLowerCase() === category.toLowerCase();
      if (!matches) return false;
    }

    if (tag) {
      const target = slugify(tag).toLowerCase();
      const hasTag = blog.tags.some(
        (t) =>
          slugify(t.name).toLowerCase() === target ||
          t.name.toLowerCase() === tag.toLowerCase()
      );
      if (!hasTag) return false;
    }

    if (query) {
      const haystack = [
        blog.title,
        blog.desc,
        blog.category,
        ...blog.tags.map((t) => t.name),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
};

const filterStaticBlogs = (filters) =>
  applyClientFilters(blogs.map(mapStaticBlog), filters);

/* ------------------------------------------------------------------ */
/*  Payload fetching                                                   */
/* ------------------------------------------------------------------ */

const buildWhereParams = ({ search, category, tag, featured }) => {
  const params = {
    depth: 1,
    limit: 100,
  }
  const where = {}

  if (featured) where['featured'] = { equals: 'true' }
  if (category) where['category.slug'] = { equals: category }
  if (tag) where['tags.slug'] = { equals: tag }

  if (search) {
    where['or'] = [
      { 'title': { like: search } },
      { 'shortDescription': { like: search } },
      { 'excerpt': { like: search } },
      { 'category.name': { like: search } },
      { 'tags.name': { like: search } },
      { 'seo.title': { like: search } },
    ]
  }

  Object.entries(where).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        Object.entries(item).forEach(([field, fieldValue]) => {
          params[`where[${key}][${index}][${field}]`] = fieldValue
        })
      })
    } else {
      Object.entries(value).forEach(([field, fieldValue]) => {
        params[`where[${key}][${field}]`] = fieldValue
      })
    }
  })

  return params
}

const fetchPayloadPages = async (params, fetchOptions) => {
  let page = 1
  let allDocs = []

  for (;;) {
    const data = await getPayloadCollection(
      BLOG_COLLECTION,
      { ...params, page },
      fetchOptions
    )

    allDocs = allDocs.concat(data.docs || [])

    const reachedEnd =
      !data.hasNextPage ||
      !data.totalPages ||
      page >= data.totalPages ||
      allDocs.length >= (data.totalDocs || 0)

    if (reachedEnd) break
    page += 1
  }

  return allDocs
}

const fetchPayloadBlogs = async (filters, fetchOptions) => {
  let docs = []

  try {
    docs = await fetchPayloadPages(buildWhereParams(filters), fetchOptions)
  } catch {
    // Fall back to a plain fetch (no where clause) so a schema mismatch
    // on a filter field never takes the whole list down.
    docs = await fetchPayloadPages(
      { depth: 1, limit: 100 },
      fetchOptions
    )
  }

  const mapped = docs
    .map(mapPayloadBlog)
    .filter((blog) => blog.title)

  return applyClientFilters(mapped, filters)
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export const getBlogs = async ({
  page = 1,
  limit = 9,
  search = "",
  category = "",
  tag = "",
  featured = false,
  fetchOptions = {},
} = {}) => {
  const safePage = Math.max(1, parseInt(page, 10) || 1);
  const safeLimit = Math.max(1, parseInt(limit, 10) || 9);
  const filters = { search, category, tag, featured };

  const staticDocs = filterStaticBlogs(filters);

  let docs;
  let source = "payload";

  try {
    const payloadDocs = await fetchPayloadBlogs(filters, fetchOptions);
    const seenIds = new Set();
    docs = [...staticDocs, ...payloadDocs].filter((blog) => {
      if (seenIds.has(blog.id)) return false;
      seenIds.add(blog.id);
      return true;
    });
  } catch {
    source = "fallback";
    docs = staticDocs;
  }

  const sorted = [...docs].sort(
    (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
  );

  const totalDocs = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / safeLimit));
  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * safeLimit;

  return {
    docs: sorted.slice(start, start + safeLimit),
    page: currentPage,
    totalPages,
    totalDocs,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    source,
  };
};

export const getAllBlogs = async (fetchOptions = {}) => {
  const result = await getBlogs({ limit: 200, fetchOptions });
  return result.docs;
};

export const getBlogBySlug = async (slug, fetchOptions = {}) => {
  if (!slug) return null;

  try {
    const data = await getPayloadCollection(
      BLOG_COLLECTION,
      {
        depth: 2,
        limit: 1,
        "where[slug][equals]": slug,
      },
      fetchOptions
    );

    const doc = data.docs && data.docs[0];
    if (doc) return mapPayloadBlog(doc);
  } catch {
    // Payload unreachable — fall through to blogsData.js
  }

  const staticBlog = blogs.find(
    (blog) => blog.id === slug || blog.slug === slug
  );
  return staticBlog ? mapStaticBlog(staticBlog) : null;
};

export const getBlogsByCategory = async (category, fetchOptions = {}) => {
  const result = await getBlogs({ category, limit: 1000, fetchOptions });
  return result.docs;
};

export const getBlogsByTag = async (tag, fetchOptions = {}) => {
  const result = await getBlogs({ tag, limit: 1000, fetchOptions });
  return result.docs;
};

export const searchBlogs = async (query, fetchOptions = {}) => {
  const result = await getBlogs({ search: query, limit: 1000, fetchOptions });
  return result.docs;
};

export const getFeaturedBlogs = async (fetchOptions = {}) => {
  const result = await getBlogs({ featured: true, limit: 1000, fetchOptions });
  return result.docs;
};

export const getRelatedBlogs = async (blog, fetchOptions = {}) => {
  if (!blog) return [];

  const related = (blog.relatedBlogs || []).filter(
    (item) => item && item.slug && item.slug !== blog.slug
  );
  if (related.length) return related.slice(0, 3);

  try {
    const sameCategory = await getBlogs({
      category: blog.categorySlug || blog.category,
      limit: 4,
      fetchOptions,
    });
    const fromCategory = sameCategory.docs
      .filter((item) => item.slug !== blog.slug)
      .slice(0, 3);
    if (fromCategory.length) return fromCategory;

    const latest = await getBlogs({ limit: 4, fetchOptions });
    return latest.docs.filter((item) => item.slug !== blog.slug).slice(0, 3);
  } catch {
    return [];
  }
};
