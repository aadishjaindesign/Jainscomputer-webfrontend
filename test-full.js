const { mapImage } = require("./test-map-helper.js");
const fs = require('fs');

async function run() {
  const res = await fetch("https://jains-cms.onrender.com/api/blogs?depth=2&limit=1&where[slug][equals]=digital-marketing-trends-2026-business");
  const data = await res.json();
  const doc = data.docs[0];
  console.log("Raw featuredImage type:", typeof doc.featuredImage);
  if (doc.featuredImage) {
    console.log("Raw featuredImage url:", doc.featuredImage.url);
  }
  
  const mapped = mapImage(doc);
  console.log("Mapped image:", mapped);
}
run();
