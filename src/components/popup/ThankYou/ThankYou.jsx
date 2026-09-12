"use client";

import "./ThankYou.css";

const ThankYou = ({ onClose }) => {
  return (
    <div className="ty-overlay" onClick={onClose}>
      <div className="ty-box" onClick={(e) => e.stopPropagation()}>

        <button className="ty-close" onClick={onClose}>×</button>

        <div className="ty-icon">
          <div className="ty-circle">
            <svg viewBox="0 0 52 52" fill="none">
              <path
                d="M14 26 L22 34 L38 18"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h2 className="ty-title">
          Thank <span>You!</span>
        </h2>

        <div className="ty-divider">
          <span></span>
          <span className="ty-heart">♥</span>
          <span></span>
        </div>

        <p className="ty-msg">Your form has been submitted successfully.</p>
        <p className="ty-msg">Our team will contact you shortly.</p>

      </div>
    </div>
  );
};

export default ThankYou;