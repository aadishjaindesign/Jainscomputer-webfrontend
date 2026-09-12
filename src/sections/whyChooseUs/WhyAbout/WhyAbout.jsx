"use client";

import "./WhyAbout.css";

import { usePopup } from "@/context/PopupContext";

const WhyAbout = () => {

  const { openPopup } = usePopup();

  return (
    <section
      className="wa-section"
      aria-labelledby="wa-heading"
    >

      {/* HEADER */}
      <div className="wa-header">

        <h2 id="wa-heading">
          Who <span>We Are</span> / About Us
        </h2>

        <p className="wa-desc">
          Jains Computer is a reputable institute in providing skill-based
          education, having cheerfully served students from Jothwara, Jaipur,
          Rajasthan, and beyond for over 25 years.
        </p>

      </div>

      {/* ROW */}
      <div className="wa-row">

        {/* LEFT */}
        <div className="wa-card wa-card-left">

          <p>
            We believe in empowering students to change their lives through
            hands-on learning and industry-focused courses as well as mentoring.
            Beyond training, we build confidence, foster a professional attitude,
            and equip students to succeed in their careers.
          </p>

          <div className="wa-line"></div>

          <button
            className="wa-btn"
            onClick={() => openPopup()}
          >
            Learn Grow Succeed
          </button>

        </div>

        {/* RIGHT */}
        <div className="wa-right-col">

          {/* SMALL */}
          <div className="wa-card wa-card-small">

            <p>
              Build Future Careers
            </p>

          </div>

          {/* BIG */}
          <div className="wa-card wa-card-right">

            <p>
              We have more than 10,000+ students who have been groomed,
              with a wide range of courses available in the digital,
              technical, and professional arenas. We provide them with
              exposure to new technology by ensuring that everyone is able
              to get hands-on training with the latest technology and tools.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default WhyAbout;