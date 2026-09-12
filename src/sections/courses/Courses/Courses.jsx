"use client";

import "./Courses.css";

import Link from "next/link";

import { useState, useMemo, memo, useCallback, useRef, useEffect } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { usePopup } from "@/context/PopupContext";

import graphicImg from "@/assets/image/graphics.webp";
import videoImg from "@/assets/image/video-editing.webp";
import tallyImg from "@/assets/image/telly.webp";
import digitalImg from "@/assets/image/23987128_6859042.webp";
import aiImg from "@/assets/image/Ai_converted.webp";
import advanceImg from "@/assets/image/advance-excel.webp";
import DataAnalyticsImg from "@/assets/image/Data-Analytics.webp";
import GovtImg from "@/assets/image/Govt.webp";
import ProgramingImg from "@/assets/image/Programing.webp";
import webdesignImg from "@/assets/image/webdesign.webp";
import personalitydevelopmentImg from "@/assets/image/Personality Development.webp";
import graphicdesignerImg from "@/assets/image/graphic-designer.webp";



export const courses = [
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    image: digitalImg,
    reviews: 547,
    desc: "Learn SEO, PPC, affiliate, email, and performance marketing to drive real-time results for businesses.",
    duration: "3–6 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹20K–₹80K",
    tag: ["Media"],
    demand: "High Demand"
  },

  {
    title: "Tally + GST",
    slug: "tally-gst",
    image: tallyImg,
    reviews: 447,
    desc: "Master financial skills with practical learning about bookkeeping and tax management.",
    duration: "5–6 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹15K–₹50K",
    tag: ["Finance"],
    demand: "Trending"
  },

  {
    title: "CAD Courses",
    slug: "cad-courses",
    image: graphicImg,
    reviews: 567,
    desc: "Master drawing 2D and 3D layouts widely used in architecture, engineering, and construction projects.",
    duration: "3–6 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹18K–₹60K",
    tag: ["Architecture"]
  },

  {
    title: "Video Editing",
    slug: "video-editing",
    image: videoImg,
    reviews: 487,
    desc: "Learn professional-level footage trimming, cutting, and editing to boost user engagement.",
    duration: "3–4 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹20K–₹70K",
    tag: ["Media", "AI"]
  },

  {
    title: "Artificial Intelligence (AI)",
    slug: "artificial-intelligence",
    image: aiImg,
    reviews: 465,
    desc: "Learn prompt engineering and industry-based tools to automate tasks and save time.",
    duration: "2–4 Months",
    level: "Intermediate",
    placement: "Yes",
    salary: "₹25K–₹90K",
    tag: ["Media", "Architecture", "Programming", "AI"]
  },

  {
    title: "Graphic Designing",
    slug: "graphic-designing",
    image: graphicdesignerImg,
    reviews: 421,
    desc: "Learn visual storytelling by understanding color theory, branding, typography, and tools.",
    duration: "3–6 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹15K–₹60K",
    tag: ["Media"]
  },

  {
    title: "Website Design",
    slug: "website-design",
    image: webdesignImg,
    reviews: 451,
    desc: "Explore your inner creativity to design user-friendly and responsive websites to improve the digital experience.",
    duration: "3–6 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹20K–₹70K",
    tag: ["Media"]
  },

  {
    title: "Data Analytics",
    slug: "data-analytics",
    image: DataAnalyticsImg,
    reviews: 451,
    desc: "Master cleaning up siloed data to transform it into visual dashboards for insightful decision-making.",
    duration: "3–6 Months",
    level: "Intermediate",
    placement: "Yes",
    salary: "₹25K–₹80K",
    tag: ["Finance", "Programming"]
  },

  {
    title: "Programming",
    slug: "programming",
    image: ProgramingImg,
    reviews: 555,
    desc: "Learn basic to advanced-level coding to design software, mobile apps, websites, and demanding AI agents.",
    duration: "4–8 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹30K–₹1L+",
    tag: ["Programming"]
  },

  {
    title: "Advanced Excel",
    slug: "advanced-excel",
    image: advanceImg,
    reviews: 647,
    desc: "Perfect to get familiar with a computer without any prior experience.",
    duration: "1–2 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "₹15K–₹45K",
    tag: ["Finance"]
  },

  {
    title: "Government Courses",
    slug: "government-courses",
    image: GovtImg,
    reviews: 447,
    desc: "Upgrade your portfolio with skill-based, government-recognized programs for better career security.",
    duration: "2–4 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "Varies",
    tag: ["Finance"]
  },

  {
    title: "Personality Development",
    slug: "personality-development",
    image: personalitydevelopmentImg,
    reviews: 402,
    desc: "Improve communication, confidence, and professional appearance to achieve success in jobs and real-life.",
    duration: "1–3 Months",
    level: "Beginner",
    placement: "Yes",
    salary: "Career Growth",
    tag: []
  },
];

const CourseCard = memo(({ course, index, isActive }) => {

  const [loaded, setLoaded] = useState(false);

  const router = useRouter();

  return (
    <article
      className={`careere-card${isActive ? " mobile-active" : ""}`}
      onClick={() => router.push(`/courses/${course.slug}/`)}
    >

      <div className="card-image">

        {!loaded && <div className="img-shimmer" />}

      
<Image
  src={course.image}
  alt={course.title}
  className={`course-img img-${course.slug}`}
  loading={index < 6 ? "eager" : "lazy"}
  priority={index < 3}
  width={400}
  height={220}
  onLoad={() => setLoaded(true)}
  style={{
    opacity: loaded ? 1 : 0,
    transition: "opacity 0.3s ease",
    width: "100%",
    height: "100%",      
    objectFit: "cover"  
  }}
/>

        <div className="card-top">

          {course.tag.map((t, i) => (
            <span className="tage" key={i}>
              {t}
            </span>
          ))}

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

      <div className="card-body1">

        <h3>{course.title}</h3>

        <p className="card-desc">
          {course.desc}
        </p>

        <div className="card-rating">
          ⭐⭐⭐⭐⭐
          <span>
            4.9 ({course.reviews} reviews)
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

      <div className="card-footer2">

        <div className="salary-box">
          <span className="salary">
            {course.salary}
          </span>

          <p className="salary-sub">
            Monthly Salary
          </p>
        </div>

        <Link href={`/courses/${course.slug}/`}>
          <button className="enroll-btn">
            View More
          </button>
        </Link>

      </div>

    </article>
  );
});

const Courses = () => {

  const [activeFilter, setActiveFilter] = useState("All");

  const [activeIndex, setActiveIndex] = useState(0);

  const { openPopup } = usePopup();

  const gridRef = useRef(null);

  const autoScrollRef = useRef(null);

  const userTouching = useRef(false);

  const hasStarted = useRef(false);

  const filteredCourses = useMemo(() => (
    activeFilter === "All"
      ? courses
      : courses.filter(c => c.tag.includes(activeFilter))
  ), [activeFilter]);

  return (
    <section className="careere">

      <div className="careere-top">

        <div className="careere-left">

          <p className="careere-mini-title">
            Courses
          </p>

          <p className="careere-tag">
            AI Powered Programmes
          </p>

          <h1>
            Professional Courses to
            <span> Upgrade Your Skills</span>
          </h1>

          <p className="careere-desc">
            From basic computer learning to advanced Excel,
            video editing, digital marketing, and artificial
            intelligence, Jains Computer brought you innovative
            courses to secure a future-ready career.
          </p>

          <div className="careere-buttons">
            <button
              className="btn primary"
              onClick={() => openPopup()}
            >
              🎓 Book Free Consultation
            </button>
          </div>

        </div>

        <div className="careere-right">

          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=75"
            alt="Students learning computer courses at Jains Computer"
            width={600}
            height={400}
            loading="eager"
            priority={true}
          />

          <div className="careere-filters right-filter">

            {["All", "Finance", "Media", "Architecture", "Programming", "AI"].map(item => (

              <button
                key={item}
                className={activeFilter === item ? "active" : ""}
                onClick={() => setActiveFilter(item)}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

      </div>

      <h2 className="program-count">
        Job-ready <span>{filteredCourses.length}</span> Courses
      </h2>

      <div className="careere-grid" ref={gridRef}>

        {filteredCourses.map((course, index) => (
          <CourseCard
            key={course.slug}
            course={course}
            index={index}
            isActive={index === activeIndex}
          />
        ))}

      </div>

      <div className="careere-cta">

        <h2>
          Not Sure Which Course To Choose From?
        </h2>

        <p>
          Get personalized counseling from experts to decide the right course to unleash your ability.
        </p>

        <button
          className="cta-btn"
          onClick={() => openPopup()}
        >
          Claim Free Consultation.
        </button>

      </div>

    </section>
  );
};

export default Courses;