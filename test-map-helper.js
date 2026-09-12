const toAbsoluteUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `https://jains-cms.onrender.com${url}`;
  return url;
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
      if (image) return { src: toAbsoluteUrl(image), alt: doc.title || "" };
      continue;
    }
    if (image && typeof image === "object") {
      const url = image.url || image.src || image.fileURL || image.path;
      if (url) {
        return {
          src: toAbsoluteUrl(url),
          alt: image.alt || doc.title || "",
          width: image.width,
          height: image.height,
        };
      }
    }
  }
  return null;
};
module.exports = { mapImage };
