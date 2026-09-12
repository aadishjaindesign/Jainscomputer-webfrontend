import { getPayloadCollection } from "./payloadApi";
import { slugify } from "./blogService";

const TAG_COLLECTION = "tags";

const mapTag = (doc) => {
  if (!doc) return null;
  const name = doc.name || doc.title || doc.label;
  if (!name) return null;
  return {
    id: String(doc.id || ""),
    name,
    slug: doc.slug || slugify(name),
  };
};

export const getTags = async (fetchOptions = {}) => {
  try {
    const data = await getPayloadCollection(
      TAG_COLLECTION,
      { limit: 100, depth: 0 },
      fetchOptions
    );

    const tags = (data.docs || []).map(mapTag).filter(Boolean);
    if (tags.length) {
      const seen = new Map();
      tags.forEach((tag) => {
        const key = slugify(tag.name);
        if (!seen.has(key)) seen.set(key, tag);
      });
      return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name));
    }
  } catch {
    // ignore and fall through to fallback
  }

  return [];
};

export default getTags;
