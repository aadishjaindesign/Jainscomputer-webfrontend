"use client";

import "./CareerPath.css";

import Image from "next/image";

import { useRouter } from "next/navigation";

import graphicdesignerImg from "@/assets/image/graphic-designer.webp";
import videoImg from "@/assets/image/video-editing.webp";
import tallyImg from "@/assets/image/telly.webp";

const courses = [
  {
    title: "Graphic Designing",
    slug: "graphic-designing",
    image: graphicdesignerImg,
    desc: "Learn visual storytelling by understanding color theory, branding, typography, and tools.",
    duration: "4–6 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹15K–₹60K",
    tag: "Design",
  },
  {
    title: "Video Editing",
    image: videoImg,
    slug: "video-editing",
    desc: "Learn professional-level footage trimming, cutting, and editing to boost user engagement.",
    duration: "4–5 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹20K–₹70K",
    tag: "Media",
  },
  {
    title: "Tally + GST",
    slug: "tally-gst",
    image: tallyImg,
    desc: "Master financial skills with practical learning about bookkeeping and tax management.",
    duration: "5–6 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹15K–₹50K",
    tag: "Finance",
    demand: "Trending",
  },
];

const CareerPath = () => {

  const router = useRouter();

  return (
    <section
      className="career"
      aria-labelledby="career-heading"
    >

      {/* TOP */}
      <div className="career-top">

        <div>

          <p className="career-tag">
            Career-Ready Programmes
          </p>

          <h2 id="career-heading">
            Explore <span>Popular Courses</span>
          </h2>

          <p className="career-desc">
            Access AI-powered, industry-specific courses at JC
            - the best IT training institute in Jaipur,
            that are designed to make you eligible and
            get hired by your dream companies.
          </p>

        </div>

        <button
          className="view-btn"
          onClick={() => router.push("/courses")}
        >
          📍 View All Courses
        </button>

      </div>

      {/* CARDS */}
      <div className="career-grid">

        {courses.map((course, index) => (

          <article
            className={`career-card ${course.slug}`}
            key={index}
          >

            {/* IMAGE */}
            <div className="card-image">

              <Image
                src={course.image}
                alt={course.title}
                width={500}
                height={300}
                draggable={false}
              />

              <div className="card-top">

                <span className="tage">
                  {course.tag}
                </span>

                {course.demand && (
                  <span className="demand">
                    {course.demand}
                  </span>
                )}

              </div>

              <span className="ai-badge">
                AI Curriculum
              </span>

            </div>

            {/* CONTENT */}
            <div className="card-body">

              <h3>{course.title}</h3>

              <p className="card-desc">
                {course.desc}
              </p>

              <div className="card-rating">
                ⭐⭐⭐⭐⭐
                <span>
                  4.9 (1,240+ reviews)
                </span>
              </div>

              <div className="card-info">

                <div>
                  <span>Duration</span>
                  <strong>{course.duration}</strong>
                </div>

                <div>
                  <span>Level</span>
                  <strong>{course.level}</strong>
                </div>

                <div>
                  <span>Placement</span>
                  <strong className="green">
                    {course.placement}
                  </strong>
                </div>

              </div>

            </div>

            {/* FOOTER */}
            <div className="card-footer">

              <div>
                <span className="salary">
                  {course.salary}
                </span>

                <p className="salary-sub">
                  Average Monthly Salary
                </p>
              </div>

              <button
                className="enroll-btn"
                aria-label={`Enroll in ${course.title} course`}
                onClick={() =>
                  router.push(`/courses/${course.slug}`)
                }
              >
                Enroll Now
              </button>

            </div>

          </article>
        ))}

      </div>

    </section>
  );
};

export default CareerPath;