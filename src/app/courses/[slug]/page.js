import courseData from "@/data/courseData";
import { generateCourseMetadata } from "@/lib/metadata";

import {
  CourseSchema,
  BreadcrumbSchema,
  CourseFAQSchema,
} from "../schema-course";

// import courseData from "@/data/courseData";

import CourseDetails from "@/sections/courses/CourseDetails/CourseDetails";

export async function generateStaticParams() {

  return Object.values(courseData).map((course) => ({
    slug: course.slug,
  }));

}

export async function generateMetadata({ params }) {

  const resolvedParams = await params;

  const course = courseData[resolvedParams.slug];

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

 return generateCourseMetadata({
  slug: course.slug,
  name: course.title,
  description: course.desc,
  image: course.heroImage?.src,
});
}

export default async function CourseDetailPage({ params }) {

  const resolvedParams = await params;

  const course = courseData[resolvedParams.slug];

  if (!course) {
    return <h1>Course Not Found</h1>;
  }

  return (
  <>
    <CourseSchema
      course={{
        slug: course.slug,
        name: course.title,
        description: course.desc,
        image: course.heroImage?.src,
        level: course.level,
        duration: course.duration,
        category: course.shortTitle,
        reviewCount: "400",
        skills: course.curriculum,
        prerequisites: "No prior experience required",
      }}
    />

    <BreadcrumbSchema
      courseName={course.title}
      courseSlug={course.slug}
    />

    <CourseFAQSchema
      faqs={course.faqs}
      courseSlug={course.slug}
    />

    <CourseDetails slug={resolvedParams.slug} />
  </>
);
}