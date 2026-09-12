import Courses from "@/sections/courses/Courses/Courses";
import { coursesPageMetadata } from "@/lib/metadata";


export const metadata = coursesPageMetadata;

export default function CoursesPage() {
  return <Courses />;
}