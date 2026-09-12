"use client";

import "./CourseHero.css";

import Link from "next/link";

import Image from "next/image";

import { usePopup } from "@/context/PopupContext";

// import brochurePDF from "@/assets/pdf/Jains-Computer-Course-Catalogue.pdf";

const CourseHero = ({ course }) => {

  const { openPopup } = usePopup();

  return (
    <section className={`course-heroo-section ${course.slug}`}>

      {/* LEFT */}
      <div className="course-heroo-left">

        {/* BREADCRUMB */}
        <p className="course-breadcrumb">

          <Link href="/">
            Home
          </Link>

          {" > "}

          <Link href="/courses">
            Courses
          </Link>

          {" > "}

          <span>
            {course.slug}
          </span>

        </p>

        {/* TAG */}
        <p className="course-heroo-tag">
          AI-Powered Curriculum
        </p>

        {/* SEO H1 */}
        <h1>
          {course.title}
          <span></span>
        </h1>

        <p className="course-heroo-desc">
          {course.desc}
        </p>

        {/* BADGES */}
        <div className="course-heroo-badges">

          <span>
            ⏱ {course.duration}
          </span>

          <span>
            🎓 {course.level}
          </span>

          <span>
            Placement Job
          </span>

          <span className="purple">
            <i></i>
            AI-Powered Curriculum
          </span>

        </div>

        {/* BUTTONS */}
        <div className="course-heroo-buttons">

          <button
            className="course-primary-btn"
            onClick={() => openPopup()}
          >
            🎓 Book Free Consultation
          </button>

          <a
            href="/pdf/Jains-Computer-Course-Catalogue.pdf"
            download
            className="course-secondarye-btn"
          >
            Download
          </a>

        </div>

      </div>

      {/* RIGHT */}
      <div className="course-heroo-right">

        <Image
          src={course.heroImage}
          alt={`${course.title} - Jains Computer Jhotwara Jaipur`}
          className="course-hero-img"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

      </div>

    </section>
  );
};

export default CourseHero;