"use client";

import "./CourseDetails.css";

import courseData from "@/data/courseData";

import CourseHero from "./CourseHero/CourseHero";
import CourseCurriculum from "./CourseCurriculum/CourseCurriculum";
import CourseFAQ from "./CourseFAQ/CourseFAQ";
import CourseCTA from "./CourseCTA/CourseCTA";

const CourseDetails = ({ slug }) => {

  const course = courseData[slug];

  if (!course) {
    return <h2>Course Not Found</h2>;
  }

  return (
    <div className="course-details">

      <CourseHero course={course} />

      <CourseCurriculum course={course} />

      <CourseFAQ course={course} />

      <CourseCTA course={course} />

    </div>
  );
};

export default CourseDetails;