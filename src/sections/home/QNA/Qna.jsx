"use client";

import "./Qna.css";

import { useState } from "react";

import Image from "next/image";

import { FaSearch, FaChevronDown } from "react-icons/fa";

import admissionIcon from "@/assets/Icon/Admissionfaq.svg";
import coursesIcon from "@/assets/Icon/Coursesfaq.svg";
import feesIcon from "@/assets/Icon/Feesfaq.svg";
import placementIcon from "@/assets/Icon/Placementfaq.svg";
import alwhyIcon from "@/assets/Icon/aiwhy.svg";

const topics = [
  {
    name: "Admission",
    count: 2,
    icon: (
      <Image
        src={admissionIcon}
        alt=""
        width={22}
        height={22}
      />
    ),
  },

  {
    name: "Courses",
    count: 2,
    icon: (
      <Image
        src={coursesIcon}
        alt=""
        width={22}
        height={22}
      />
    ),
  },

  {
    name: "Fees & Payment",
    count: 2,
    icon: (
      <Image
        src={feesIcon}
        alt=""
        width={22}
        height={22}
      />
    ),
  },

  {
    name: "Placement",
    count: 2,
    icon: (
      <Image
        src={placementIcon}
        alt=""
        width={22}
        height={22}
      />
    ),
  },

  {
    name: "Curriculum",
    count: 3,
    icon: (
      <Image
        src={alwhyIcon}
        alt=""
        width={22}
        height={22}
      />
    ),
  },
];

const qnaData = {
  Admission: [
    {
      question:
        "How to take admission at Jains Computer, Jhotwara?",

      answer:
        "You can enroll by visiting our institute or contacting us online. Our team will guide you through the steps to choose the right course during the admission process.",
    },

    {
      question:
        "Are there any eligibility criteria I need to take admission?",

      answer:
        "Most of the computer courses required no specific qualification or prior experience. You can start with a basic computer class and then switch to advanced-level skills to build a strong job portfolio.",
    },
  ],

  Courses: [
    {
      question:
        "What courses are offered at Jains Computer?",

      answer:
        "We offer a wide range of professional level IT courses that include basic to advanced computer skills, Tally, Graphic & Motion Design, SEO, Digital Marketing, Data Analytics, Web Development, and App Programming.",
    },

    {
      question:
        "Are your courses beginner-friendly?",

      answer:
        "Yes, all courses offered at Jains Computer start from basics and gradually move to advanced levels.",
    },
  ],

  "Fees & Payment": [
    {
      question:
        "Do you offer flexible payment options?",

      answer:
        "Yes, we provide easy installment options to make your learning accessible without burdening on your pocket.",
    },

    {
      question:
        "Are there any hidden charges with IT courses?",

      answer:
        "No, we believe in maintaining transparency. Thus, we don’t charge you any kind of hidden cost. Everything is cleared at the beginning by our admissions wing.",
    },
  ],

  Placement: [
    {
      question:
        "Does Jains Computer provide placement assistance?",

      answer:
        "Yes. After completing the course(s), you get extensive career guidance, along with interview preparation and placement support at renowned brands.",
    },

    {
      question:
        "What kind of job roles can I expect after completing courses from Jains Computer?",

      answer:
        "You can hold basic to professional-level job profiles as a digital marketer, graphic designer, web developer, software programmer, data analyst, accountant, and more, depending on your course.",
    },
  ],

  Curriculum: [
    {
      question:
        "Do you offer practical or theoretical training?",

      answer:
        "We offer both modules for better learning. Our curriculum for each computer course is highly practical with real-world projects and case studies.",
    },

    {
      question:
        "Do you teach about industry tools and software?",

      answer:
        "Yes, we teach students to become professionals in industry-demanding tools based on their chosen course. It includes Photoshop, CorelDRAW, MS Excel, PowerPoint, video editors, coding frameworks, and more.",
    },

    {
      question:
        "Can I work on live projects while learning?",

      answer:
        "Yes, we support practical learning to get hands-on experience with industry-relevant projects.",
    },
  ],
};

const Qna = () => {

  const [activeTopic, setActiveTopic] =
    useState("Admission");

  const [openIndex, setOpenIndex] =
    useState(null);

  const [mobileOpenTopic, setMobileOpenTopic] =
    useState("");

  const [mobileOpenIndex, setMobileOpenIndex] =
    useState(null);

  const toggle = (index) => {
    setOpenIndex(
      openIndex === index ? null : index
    );
  };

  const mobileToggleTopic = (topicName) => {
    setMobileOpenTopic(
      mobileOpenTopic === topicName
        ? null
        : topicName
    );

    setMobileOpenIndex(null);
  };

  const mobileToggleQna = (index) => {
    setMobileOpenIndex(
      mobileOpenIndex === index
        ? null
        : index
    );
  };

  return (
    <section className="qna-section">

      <div className="qna-header">

        <p className="qna-tag faq-dot">
          FAQ
        </p>

        <h2>
          FAQs - <span>Browse By Topic</span>
        </h2>

      </div>

      {/* DESKTOP */}
      <div className="qna-container desktop-layout">

        <div className="qna-left">

          {/* <p className="qna-mini question-dot">
            Questions
          </p> */}

          {topics.map((t, i) => (

            <div
              key={i}
              className={`topic-item ${
                activeTopic === t.name
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                setActiveTopic(t.name);
                setOpenIndex(null);
              }}
            >

              <span className="topic-icon">
                {t.icon}
              </span>

              <span className="topic-name">
                {t.name}
              </span>

              <span className="count">
                {t.count}
              </span>

            </div>
          ))}

        </div>

        <div className="qna-right">

          {(qnaData[activeTopic] || []).map(
            (q, i) => (

              <div className="qna-box" key={i}>

                <div
                  className="qna-question"
                  onClick={() => toggle(i)}
                >

                  <FaSearch className="icone" />

                  <p>{q.question}</p>

                  <FaChevronDown
                    className={`arrow ${
                      openIndex === i
                        ? "rotate"
                        : ""
                    }`}
                  />

                </div>

                <div
                  className={`qna-answer ${
                    openIndex === i
                      ? "show"
                      : ""
                  }`}
                >

                  <p>{q.answer}</p>

                </div>

              </div>
            )
          )}

        </div>

      </div>

      {/* MOBILE */}
      <div className="qna-mobile-layout">

        {/* <p className="qna-mini question-dot">
          Questions
        </p> */}

        {topics.map((t, i) => (

          <div
            key={i}
            className="mobile-topic-block"
          >

            <div
              className={`topic-item ${
                mobileOpenTopic === t.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                mobileToggleTopic(t.name)
              }
            >

              <span className="topic-icon">
                {t.icon}
              </span>

              <span className="topic-name">
                {t.name}
              </span>

              <FaChevronDown
                className={`arrow ${
                  mobileOpenTopic === t.name
                    ? "rotate"
                    : ""
                }`}
              />

            </div>

            {mobileOpenTopic === t.name && (

              <div className="mobile-qna-list">

                {(qnaData[t.name] || []).map(
                  (q, j) => (

                    <div
                      className="qna-box"
                      key={j}
                    >

                      <div
                        className="qna-question"
                        onClick={() =>
                          mobileToggleQna(j)
                        }
                      >

                        <FaSearch className="icone" />

                        <p>{q.question}</p>

                        <FaChevronDown
                          className={`arrow ${
                            mobileOpenIndex === j
                              ? "rotate"
                              : ""
                          }`}
                        />

                      </div>

                      <div
                        className={`qna-answer ${
                          mobileOpenIndex === j
                            ? "show"
                            : ""
                        }`}
                      >

                        <p>{q.answer}</p>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          </div>
        ))}

      </div>

    </section>
  );
};

export default Qna;