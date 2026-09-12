const { mapImage } = require("./test-map-helper.js");
const data = {
  featuredImage: {
    url: "https://jains-cms.onrender.com/api/media/file/3a9ae7cc9ea7c2d4be8b691822164a9f.jpg",
    alt: "test"
  }
};
console.log(mapImage(data));
