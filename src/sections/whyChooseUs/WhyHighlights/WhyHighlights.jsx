"use client";

import "./WhyHighlights.css";

import Image from "next/image";

import keyHighlightIcon from "@/assets/Icon/Keyhightlight.svg";
import internshipIcon from "@/assets/Icon/Internship.svg";
import mentorshipIcon from "@/assets/Icon/Mentorship.svg";
import confidenceIcon from "@/assets/Icon/Confidence.svg";
import jobIcon from "@/assets/Icon/Job-oriented.svg";
import innovativeIcon from "@/assets/Icon/Innovative.svg";
import expertiseIcon from "@/assets/Icon/Expertise.svg";

const highlights = [
  {
    id: 1,
    icon: keyHighlightIcon,
    title: "26+ Years of Trusted Experience",
    desc: "Serving students with quality IT education since 2000 in Jhotwara, Jaipur.",
    position: "left",
  },

  {
    id: 2,
    icon: internshipIcon,
    title: "Internship Support",
    desc: "Real-world internship opportunities to help students gain industry experience.",
    position: "left",
  },

  {
    id: 3,
    icon: mentorshipIcon,
    title: "Professional Mentorship",
    desc: "Expert mentors with real industry experience guide every student personally.",
    position: "left",
  },

  {
    id: 4,
    icon: confidenceIcon,
    title: "Confidence Building",
    desc: "We build student confidence through practical training and live projects.",
    position: "right",
  },

  {
    id: 5,
    icon: jobIcon,
    title: "Assured Employability",
    desc: "Job-oriented curriculum with 100% placement assistance for all students.",
    position: "right",
  },

  {
    id: 6,
    icon: innovativeIcon,
    title: "Innovative Learning",
    desc: "AI-powered and industry-aligned curriculum updated with latest technology.",
    position: "right",
  },

  {
    id: 7,
    icon: expertiseIcon,
    title: "Track Students Success",
    desc: "We track and support every student growth journey with expertise.",
    position: "bottom",
  },
];

const WhyHighlights = () => {

  return (
    <section
      className="wh-section"
      aria-labelledby="wh-heading"
    >

      {/* HEADER */}
      <div className="wh-header">

        <p className="wh-tag">
          ✦ Why Jains Computer
        </p>

        <h2 id="wh-heading">
          Key <span>Highlights</span>
        </h2>

        <p className="wh-desc">
          At Jains Computer, we help students at every stage of their journey
          with industry-focused IT training in Jhotwara, Jaipur.
        </p>

      </div>

      {/* MAIN */}
      <div className="wh-layout" role="list">

        {/* LEFT */}
        <div className="wh-col wh-left">

          {highlights
            .filter((h) => h.position === "left")
            .map((h) => (

              <article
                className="wh-box"
                key={h.id}
                role="listitem"
              >

                <div className="wh-box-inner left-inner">

                  <div className="wh-text left-text">

                    <h3>{h.title}</h3>

                    <p>{h.desc}</p>

                  </div>

                  <div className="wh-icon-wrap">

                    <Image
                      src={h.icon}
                      alt={h.title}
                      width={40}
                      height={40}
                    />

                  </div>

                </div>

              </article>

            ))}

        </div>

        {/* CENTER */}
        <div className="wh-center" aria-hidden="true">

          <div className="wh-outer-ring">

            <div className="wh-inner-ring">

              <div className="wh-circle">

                <span>Key</span>

                <strong>Highlight</strong>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT */}
        <div className="wh-col wh-right">

          {highlights
            .filter((h) => h.position === "right")
            .map((h) => (

              <article
                className="wh-box"
                key={h.id}
                role="listitem"
              >

                <div className="wh-box-inner right-inner">

                  <div className="wh-icon-wrap">

                    <Image
                      src={h.icon}
                      alt={h.title}
                      width={40}
                      height={40}
                    />

                  </div>

                  <div className="wh-text right-text">

                    <h3>{h.title}</h3>

                    <p>{h.desc}</p>

                  </div>

                </div>

              </article>

            ))}

        </div>

      </div>

      {/* BOTTOM */}
      <div className="wh-bottom">

        {highlights
          .filter((h) => h.position === "bottom")
          .map((h) => (

            <article
              className="wh-box wh-box-bottom"
              key={h.id}
              role="listitem"
            >

              <div className="wh-box-inner bottom-inner">

                <div className="wh-icon-wrap">

                  <Image
                    src={h.icon}
                    alt={h.title}
                    width={40}
                    height={40}
                  />

                </div>

                <div className="wh-text">

                  <h3>{h.title}</h3>

                  <p>{h.desc}</p>

                </div>

              </div>

            </article>

          ))}

      </div>

    </section>
  );
};

export default WhyHighlights;