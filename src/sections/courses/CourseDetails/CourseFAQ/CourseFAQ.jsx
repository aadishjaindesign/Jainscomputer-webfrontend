"use client";

import { useState } from "react";

import { FaSearch, FaChevronDown } from "react-icons/fa";

import "../CourseDetails.css";

const CourseFAQ = ({ course }) => {

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const faqs = course?.faqs || [];

  return (
    <section className="faq-sections">

      <div className="faq-header">

        <p className="faq-tag">
          FAQ
        </p>

        <h2>
          Common <span>Questions</span>
        </h2>

      </div>

      <div className="faq-list">

        {faqs.map((faq, i) => (

          <div className="faq-box" key={i}>

            <div
              className="faq-questions"
              onClick={() => toggle(i)}
            >

              <FaSearch className="faq-icon" />

              <p>
                {faq.question}
              </p>

              <FaChevronDown
                className={`faq-arrow ${
                  openIndex === i ? "rotate" : ""
                }`}
              />

            </div>

            <div
              className={`faq-answer ${
                openIndex === i ? "show" : ""
              }`}
            >

              <p>
                {faq.answer}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default CourseFAQ;