"use client";

import "./ConsultationPopup.css";

import { usePopup } from "@/context/PopupContext";

import ThankYou from "@/components/popup/ThankYou/ThankYou";

import { FaChevronDown } from "react-icons/fa";

import { useState, useEffect } from "react";

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

const ConsultationPopup = () => {
  const { open, closePopup, selectedCourse } = usePopup();

  const [loading, setLoading] = useState(false);

  const [showThankYou, setShowThankYou] = useState(false);

  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (selectedCourse) {
      setForm((prev) => ({
        ...prev,
        course: selectedCourse,
      }));
    }
  }, [selectedCourse]);

  useEffect(() => {
    const handleClickOutside = () =>
      setDropdownOpen(false);

    window.addEventListener("click", handleClickOutside);

    return () =>
      window.removeEventListener("click", handleClickOutside);
  }, []);

  if (!open && !showThankYou) return null;

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanPhone = form.phone.replace(/\D/g, "");

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d+$/.test(form.phone)) {
      newErrors.phone = "Only numbers allowed";
    } else if (form.phone.length < 10) {
      newErrors.phone = "Must be 10 digits";
    } else if (form.phone.length > 10) {
      newErrors.phone = "Cannot be more than 10 digits";
    }

    if (!form.course) {
      newErrors.course = "Please select a course";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/lead`;

      console.log("API URL =", apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: cleanPhone,
          course: form.course,
          source: "popup",
        }),
      });

      const data = await res.json();

      console.log("STATUS =", res.status);
      console.log("RESPONSE =", data);

      if (!res.ok) {
        alert(data.message || "Failed");
        return;
      }

      setForm({ name: "", phone: "", course: "" });

      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        closePopup();
      }, 3000);

    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showThankYou && (
        <ThankYou onClose={() => {
          setShowThankYou(false);
          closePopup();
        }} />
      )}

      {!showThankYou && (
        <div className="popup-overlay" onClick={closePopup}>
          <div
            className="popup-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closePopup}>
              ×
            </button>

            <p className="popup-tag">FREE CONSULTATION</p>

            <h2 className="popup-title">Book Free Consultation</h2>

            <form onSubmit={handleSubmit} className="popup-form">
              <input
                type="text"
                placeholder="Your Full Name"
                className="popup-input"
                value={form.name}
                autoComplete="name"
                maxLength={50}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
              />
              {errors.name && (
                <p className="error-text">{errors.name}</p>
              )}

              <input
                type="tel"
                placeholder="WhatsApp Number"
                className="popup-input"
                value={form.phone}
                autoComplete="tel"
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setForm({ ...form, phone: value });
                  }
                }}
              />
              {errors.phone && (
                <p className="error-text">{errors.phone}</p>
              )}

              {/* DROPDOWN */}
              <div
                className="custom-select"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`select-box ${!form.course ? "" : ""} ${dropdownOpen ? "open" : ""}`}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span className={!form.course ? "placeholder" : ""}>
                    {form.course || "Select Your Course"}
                  </span>
                  {!form.course && (
                    <FaChevronDown className={`select-arrow ${dropdownOpen ? "rotated" : ""}`} />
                  )}
                </div>

                {errors.course && (
                  <p className="error-text">{errors.course}</p>
                )}

                {dropdownOpen && (
                  <div className="select-dropdown">
                    {courses.map((c, i) => (
                      <div
                        key={i}
                        className="select-option"
                        onClick={() => {
                          setForm({ ...form, course: c });
                          setDropdownOpen(false);
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? "Submitting..." : "🎓 Book Free Consultation →"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultationPopup;