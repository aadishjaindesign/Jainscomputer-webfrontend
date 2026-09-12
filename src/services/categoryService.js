import { slugify } from "./blogService";

const COURSE_CATEGORIES = [
  { name: "Digital Marketing", courseSlug: "digital-marketing" },
  { name: "Graphic Designing", courseSlug: "graphic-designing" },
  { name: "Programming", courseSlug: "programming" },
];

export const getCategories = async () =>
  COURSE_CATEGORIES.map((category) => ({
    id: category.courseSlug,
    name: category.name,
    slug: category.courseSlug,
    courseSlug: category.courseSlug,
  }));

export default getCategories;
