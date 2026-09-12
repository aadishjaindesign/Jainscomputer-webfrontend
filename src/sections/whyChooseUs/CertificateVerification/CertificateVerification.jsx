"use client";

import "./CertificateVerification.css";

import { useState, useRef } from "react";

import {
  FiSearch,
  FiCheckCircle,
  FiShield,
  FiUser,
  FiHash,
  FiBook,
  FiClock,
  FiFileText,
  FiCalendar,
  FiCheck,
  FiRefreshCw,
} from "react-icons/fi";

// 2 year digits + 4 number digits = 6 total
const YEAR_LENGTH = 2;
const NUM_LENGTH = 4;
const TOTAL_LENGTH = YEAR_LENGTH + NUM_LENGTH;

const CertificateVerification = () => {

  const [yearDigits, setYearDigits] = useState(Array(YEAR_LENGTH).fill(""));
  const [numDigits, setNumDigits] = useState(Array(NUM_LENGTH).fill(""));

  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const yearRefs = useRef([]);
  const numRefs = useRef([]);

  // ── YEAR BOX HANDLERS ──
  const handleYearChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const updated = [...yearDigits];
    updated[idx] = val.slice(-1);
    setYearDigits(updated);
    setStatus(null);
    setError("");
    if (val && idx < YEAR_LENGTH - 1) {
      yearRefs.current[idx + 1]?.focus();
    } else if (val && idx === YEAR_LENGTH - 1) {
      numRefs.current[0]?.focus();
    }
  };

  const handleYearKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !yearDigits[idx] && idx > 0) {
      yearRefs.current[idx - 1]?.focus();
    }
  };

  // ── NUMBER BOX HANDLERS ──
  const handleNumChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const updated = [...numDigits];
    updated[idx] = val.slice(-1);
    setNumDigits(updated);
    setStatus(null);
    setError("");
    if (val && idx < NUM_LENGTH - 1) {
      numRefs.current[idx + 1]?.focus();
    }
  };

  const handleNumKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !numDigits[idx] && idx === 0) {
      yearRefs.current[YEAR_LENGTH - 1]?.focus();
    } else if (e.key === "Backspace" && !numDigits[idx] && idx > 0) {
      numRefs.current[idx - 1]?.focus();
    }
  };

  // ── PASTE ──
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, TOTAL_LENGTH);

    const yr = Array(YEAR_LENGTH).fill("");
    const nm = Array(NUM_LENGTH).fill("");

    [...pasted].forEach((ch, i) => {
      if (i < YEAR_LENGTH) yr[i] = ch;
      else nm[i - YEAR_LENGTH] = ch;
    });

    setYearDigits(yr);
    setNumDigits(nm);

    const focus = pasted.length;
    if (focus < YEAR_LENGTH) {
      yearRefs.current[focus]?.focus();
    } else {
      numRefs.current[Math.min(focus - YEAR_LENGTH, NUM_LENGTH - 1)]?.focus();
    }
  };

  // ── VERIFY ──
  const handleVerify = async () => {
    const year = yearDigits.join("");
    const num = numDigits.join("");
    const enrollment = `${year}/${num}`;

    if (year.length < YEAR_LENGTH || num.length < NUM_LENGTH) return;

    try {
      setLoading(true);
      setError("");
      setStatus(null);
      setData(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/certificates/verify/${year}/${num}`
      );

      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setError(result.message || "Certificate not found");
        return;
      }

      setData(result.data);
      setStatus("success");

    } catch (err) {
      console.log(err);
      setStatus("error");
      setError("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setYearDigits(Array(YEAR_LENGTH).fill(""));
    setNumDigits(Array(NUM_LENGTH).fill(""));
    setStatus(null);
    setData(null);
    setError("");
    setTimeout(() => yearRefs.current[0]?.focus(), 100);
  };

  const isComplete =
    yearDigits.join("").length === YEAR_LENGTH &&
    numDigits.join("").length === NUM_LENGTH;

  const errClass = status === "error" ? " cv-otp-err" : "";
  const okClass = status === "success" ? " cv-otp-ok" : "";
  const boxClass = `cv-otp-input${errClass}${okClass}`;


  return (
    <section className="cv-section" id="certificate-verification">
      <div className="cv-container">

        {/* LEFT */}
        <div className="cv-left">

          <div className="cv-header">
            <h2>
              <FiSearch className="cv-header-icon-inline" />
              Certificate Verification
            </h2>
            <p>Verify your certificate instantly</p>
          </div>

      
          {status !== "success" && (
            <div className="cv-box" onPaste={handlePaste}>

              <p className="cv-box-label">ENTER ENROLLMENT NUMBER</p>

              <div className="cv-otp-wrapper">

           
                <div className="cv-otp-group">
                  <span className="cv-group-label">Year</span>
                  <div className="cv-otp-row">
                    {yearDigits.map((d, i) => (
                      <input
                        key={`y-${i}`}
                        ref={(el) => (yearRefs.current[i] = el)}
                        className={boxClass}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleYearChange(e.target.value, i)}
                        onKeyDown={(e) => handleYearKeyDown(e, i)}
                        placeholder="0"
                        autoComplete="off"
                      />
                    ))}
                  </div>
                </div>

                <span className="cv-otp-sep">/</span>

          
                <div className="cv-otp-group">
                  <span className="cv-group-label">Number</span>
                  <div className="cv-otp-row">
                    {numDigits.map((d, i) => (
                      <input
                        key={`n-${i}`}
                        ref={(el) => (numRefs.current[i] = el)}
                        className={boxClass}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleNumChange(e.target.value, i)}
                        onKeyDown={(e) => handleNumKeyDown(e, i)}
                        placeholder="0"
                        autoComplete="off"
                      />
                    ))}
                  </div>
                </div>

              </div>

              {status === "error" && (
                <p className="cv-error-msg">{error}</p>
              )}

              <button
                className="cv-btn-verify"
                onClick={handleVerify}
                disabled={loading || !isComplete}
              >
                {loading ? "Verifying..." : "Verify Certificate"}
              </button>

            </div>
          )}

   
          {status === "success" && data && (
            <div className="cv-result">

              <div className="cv-result-top">
                <FiCheckCircle className="cv-check-icon" />
                <div>
                  <h3>Certificate Verified</h3>
                  <p>This certificate is valid</p>
                </div>
              </div>


              <div className="cv-result-grid">

                <div className="cv-result-cell">
                  <span className="cv-cell-label"><FiUser /> STUDENT NAME</span>
                  <strong>{data.studentName}</strong>
                </div>

               

                <div className="cv-result-cell">
                  <span className="cv-cell-label"><FiHash /> ENROLLMENT NO</span>
                  <strong>{data.enrollmentNumber}</strong>
                </div>

                <div className="cv-result-cell">
                  <span className="cv-cell-label"><FiBook /> COURSE</span>
                  <strong>{data.course}</strong>
                </div>

                <div className="cv-result-cell">
                  <span className="cv-cell-label"><FiClock /> COURSE DURATION</span>
                  <strong>{data.duration}</strong>
                </div>

                <div className="cv-result-cell">
                  <span className="cv-cell-label"><FiCalendar /> COURSE ISSUE DATE</span>
                  <strong>{data.courseIssueDate || "Not Available"}</strong>
                </div>

              </div>

              {/* INTERNSHIP SECTION */}
              <div className="cv-internship-section">
                <p className="cv-internship-title">Internship Details</p>

                <div className="cv-internship-grid">

                  <div className="cv-result-cell">
                    <span className="cv-cell-label"><FiFileText /> INTERNSHIP</span>
                    <strong className={data.internship === "Yes" ? "cv-status-yes" : "cv-status-no"}>
                      {data.internship || "Not Available"}
                    </strong>
                  </div>

                  <div className="cv-result-cell">
                    <span className="cv-cell-label"><FiClock /> INTERNSHIP DURATION</span>
                    <strong>{data.internshipDuration || "Not Available"}</strong>
                  </div>

                  <div className="cv-result-cell cv-intern-date">
                    <span className="cv-cell-label"><FiCalendar /> ISSUE DATE</span>
                    <strong>{data.issueDate}</strong>
                  </div>

                  <div className="cv-another-wrap">
                    <button className="cv-btn-another" onClick={handleReset}>
                      <FiRefreshCw />
                      Verify Another Certificate
                    </button>
                  </div>

                </div>
              </div>

              


            </div>
          )}

        </div>

        {/* RIGHT */}
        <div className="cv-right">

          <div className="cv-info-card">
            <div className="cv-card-title-row">
              <FiShield className="cv-card-title-icon" />
              <h3>Verification Process</h3>
            </div>
            <ol className="cv-steps">
              <li>
                <span className="cv-step-num">1</span>
                <div><strong>Enter Number</strong></div>
              </li>
              <li>
                <span className="cv-step-num">2</span>
                <div><strong>Click Verify</strong></div>
              </li>
              <li>
                <span className="cv-step-num">3</span>
                <div><strong>View Result</strong></div>
              </li>
            </ol>
          </div>

          <div className="cv-info-card">
            <div className="cv-card-title-row">
              <FiFileText className="cv-card-title-icon" />
              <h3>Trusted Certification</h3>
            </div>
            <ul className="cv-trust-list">
              {[
                "ISO Certified Institute",
                "Instant Verification",
                "Trusted by Students",
                "Secure Student Database",
              ].map((item, i) => (
                <li key={i}>
                  <FiCheck className="cv-check-li" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CertificateVerification;