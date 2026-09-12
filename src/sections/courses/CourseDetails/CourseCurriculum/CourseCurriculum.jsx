"use client";

import "../CourseDetails.css";

import { useState } from "react";

import { FaPlus, FaMinus } from "react-icons/fa";

import ThankYou from "@/components/popup/ThankYou/ThankYou";

const CourseCurriculum = ({ course }) => {

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const [showThankYou, setShowThankYou] = useState(false);

  // DYNAMIC DATA
  const faqse = course?.faqse || [];

  const topics = course?.curriculum || [];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const handleSubmit = async () => {

    if (!name.trim() || !phone.trim()) {
      alert("Please fill all fields");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      alert("Invalid number");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lead`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            phone: cleanPhone,
            course: course?.title || "Unknown",
            source: "course-page",
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed");
      }




      setName("");
      setPhone("");
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 3000);

    } catch (err) {

      console.log(err);

      alert("Error ❌");

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="course-curriculum">

      {showThankYou && (
      <ThankYou onClose={() => setShowThankYou(false)} />
    )}

      {/* HEADER */}
      <div className="curriculum-header">

        <p className="mini-tag">
          Course Detail
        </p>

        <h2>
          {course?.cta?.title}
        </h2>

        <p className="desc">
          {course?.cta?.desc}
        </p>

      </div>

      {/* MAIN WRAPPER */}
      <div className="curriculum-wrapper">

        {/* LEFT FAQ */}
        <div className="curriculum-left">

          {faqse.map((faq, i) => (

            <div className="faq-box" key={i}>

              <div
                className="faq-questione"
                onClick={() => toggle(i)}
              >

                <span className="number">
                  {(i + 1).toString().padStart(2, "0")}
                </span>

                <p>
                  {faq.question}
                </p>

                <div className="icon">
                  {openIndex === i ? <FaMinus /> : <FaPlus />}
                </div>

              </div>

              <div
                className={`faq-answer ${openIndex === i ? "show" : ""
                  }`}
              >

                <div
                  className="faq-answer-content"
                  dangerouslySetInnerHTML={{
                    __html: faq.answer,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* RIGHT BOX */}
        <div className="curriculum-right">

          <div className="tope">

            <p>
              Job-ready Training
            </p>

            <h3>
              Spots Filling Faster
            </h3>

            <span>
              Learn about business-first skills,
              AI-powered tools, task automation,
              and more with practical classes.
            </span>

          </div>

          <div className="list">

            {topics.map((item, i) => (

              <div className="list-item" key={i}>

                <span className="check-icon">
                  ✓
                </span>

                <p>
                  {item}
                </p>

              </div>

            ))}

          </div>

          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
          />

          <input
            type="tel"
            placeholder="WhatsApp Number"
            value={phone}
            autoComplete="tel"
            onChange={(e) => setPhone(e.target.value)}
            maxLength={10}
          />

          <button
            className="download-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Enroll Now"
              : "📥 Download Free Curriculum"}
          </button>

        </div>

      </div>

    </section>
  );
};

export default CourseCurriculum;