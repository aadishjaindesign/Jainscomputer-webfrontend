"use client";

import "./Contact.css";

import { useState } from "react";

import ThankYou from "@/components/popup/ThankYou/ThankYou";

import { FaSearch, FaChevronDown } from "react-icons/fa";

import { usePopup } from "@/context/PopupContext";

import phoneIcon from "@/assets/Icon/phone-call.svg";
import mailIcon from "@/assets/Icon/mail.svg";
import locationIcon from "@/assets/Icon/Locationcontact.svg";
// import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Where is your institute situated?",
    answer: "Our institute is located at 13A, Shivpuri, Indrapura, Jhotwara, Jaipur, Rajasthan, India, 302012."
  },
  {
    question: "What are your institute's timings and working days?",
    answer: "We are open from Monday to Saturday, with timings from 8:00 AM to 8:00 PM."
  },
  {
    question: "Do you offer weekend or evening batches?",
    answer: "Yes, we provide regular, weekend, and evening batches for the convenience of students who are studying or working."
  },
  {
    question: "Will I get study materials or notes?",
    answer: "Yes, you will get comprehensive study materials, including notes, video recordings, and assessments to practice what you are learning in the class."
  },
  {
    question: "Are there any EMI or installment options available?",
    answer: "Yes, you will get flexible options to make easy payments in installments for selected courses."
  },
  {
    question: "Do you provide internship or job placement support?",
    answer: "Yes, we offer both internships and job placements to students to master practical skills and secure a rewarding job in renowned companies."
  },
  {
    question: "Do you help with resume building and interview preparation?",
    answer: "Yes, absolutely. We guide our students in resume creation and train them to crack interviews so that they can confidently apply to their dream job."
  },
  {
    question: "What kind of companies hire your students?",
    answer: "We have a wide network of companies who preferer hiring students from our institute on a regular basis. It includes startups, recruitment agencies, and corporates in nearby locations and across India."
  },
  {
    question: "What is the refund policy if I discontinue?",
    answer: "Usually, we don't provide any refunds, but we can extend your course duration so that you can rejoin at your convenience. However, in a critical scenario, you can contact our team for detailed terms and conditions."
  },
  {
    question: "Who should I contact for urgent queries?",
    answer: "You can call or WhatsApp us at +91-9829498998 or email us at contact@jainscomputer.com to get immediate assistance in case of urgency."
  }
];

const Contact = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const [success, setSuccess] = useState(false);

  const [showThankYou, setShowThankYou] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const courses = [
    "Graphic Designing",
    "Digital Marketing",
    "Tally + GST",
    "Programming",
    "Video Editing",
    "CAD Courses",
    "Artificial Intelligence",
    "Website Design",
    "Data Analytics",
    "Advanced Excel",
    "Government Courses",
    "Personality Development",
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const { openPopup } = usePopup();

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.course) {
      alert("Name, Phone aur Course required hai");
      return;
    }

    if (form.phone.length !== 10) {
      alert("Phone 10 digit ka hona chahiye");
      return;
    }

    if (form.email && !form.email.includes("@")) {
      alert("Valid email daalo");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lead`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...form,
            source: "contact",
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setShowThankYou(true);
        setTimeout(() => setShowThankYou(false), 3000);

        setForm({
          name: "",
          email: "",
          phone: "",
          course: "",
          message: "",
        });

        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);

      alert("Error submitting form");
    }
  };

  return (
    <section className="contact-page">

      {showThankYou && (
        <ThankYou onClose={() => setShowThankYou(false)} />
      )}

      {/* HERO */}

      <div className="contact-heroe">

        <div className="container">

          <p className="breadcrumb">
            <span>Contact Us</span>
          </p>

          <p className="contact-tag">
            Get In Touch
          </p>

          <div className="hero-row">

            <div className="heroe-left">

              <h1>
                Have a Query?
              </h1>

              <p className="hero-desc">
                Call, mail, or visit us to clear your queries regarding course
                enrollment, training programs, internships, or career support.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* CONTACT */}

      <div className="contact-box">

        <div className="contact-info">

          <div className="info-card">

            <div className="info-icon greene">
              <img src={phoneIcon.src} alt="phone" />
            </div>

            <div className="info-text">
              <span>Call Us AnyTime</span>
              <strong>+91-9829498998</strong>
            </div>

          </div>

          <div className="info-card">

            <div className="info-icon yellow">
              <img src={mailIcon.src} alt="email" />
            </div>

            <div className="info-text">
              <span>Email Address</span>
              <strong>contact@jainscomputer.com</strong>
            </div>

          </div>

          <div className="info-card">

            <div className="info-icon red">
              <img src={locationIcon.src} alt="location" />
            </div>

            <div className="info-text">
              <span>Address</span>
              <strong>13, Shivpuri Colony, Main Kalwar Road, Jhotwara, Jaipur - 302012</strong>
            </div>

          </div>

        </div>

        {/* FORM */}

        <div className="contact-main">

          <div className="contact-form">

            {success && (
              <div className="success-message">
                {/* ✅ Form submitted successfully! */}
              </div>
            )}

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Full Name"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Your Gmail"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (value.length <= 10) {
                  setForm({
                    ...form,
                    phone: value,
                  });
                }
              }}
              placeholder="Enter Your Number"
            />

            <div
              className="custom-select"
              onClick={(e) => e.stopPropagation()}
            >

              <div
                className="select-box"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className={!form.course ? "placeholder" : ""}>
                  {form.course || "Select Your Course"}
                </span>
                {!form.course && (
                  <FaChevronDown className={`select-arrow ${dropdownOpen ? "rotated" : ""}`} />
                )}
              </div>

              {dropdownOpen && (

                <div className="select-dropdown">

                  {courses.map((c, i) => (

                    <div
                      key={i}
                      className="select-option"
                      onClick={() => {

                        setForm({
                          ...form,
                          course: c,
                        });

                        setDropdownOpen(false);

                      }}
                    >
                      {c}
                    </div>

                  ))}

                </div>

              )}

            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
            ></textarea>

            <button onClick={handleSubmit}>
              Submit
            </button>

          </div>

          {/* MAP */}

          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.759844821328!2d75.752878!3d26.942826900000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3a6c9b5470b%3A0x7b0f904fa972b0bd!2sJains%20Computer!5e0!3m2!1sen!2sin!4v1780141767605!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jains Computer Location"
            />
          </div>

        </div>

      </div>

      {/* FAQ */}

      <section className="faq-section">

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

                <p>{faq.question}</p>

                <FaChevronDown
                  className={`faq-arrow ${openIndex === i ? "rotate" : ""
                    }`}
                />

              </div>

              <div
                className={`faq-answer ${openIndex === i ? "show" : ""
                  }`}
              >
                <p>{faq.answer}</p>
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <div className="contact-cta">

        <h2>
          Looking for bright career support?
        </h2>

        <p>
          Connect with our experienced trainers to get the right advice and job-ready course recommendations.
        </p>

        <button onClick={() => openPopup()}>
          🎓 Book Free Consultation
        </button>

      </div>

    </section>
  );
};

export default Contact;