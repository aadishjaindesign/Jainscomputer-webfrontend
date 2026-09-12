"use client";

import "./FloatingButtons.css";

import siteCall from "@/assets/Icon/siteCall.svg";

import siteWhatsapp from "@/assets/Icon/siteWahtsapp.svg";

const FloatingButtons = () => {
  return (
    <div className="floating-buttons">

      <a
        href="tel:+916377075972"
        className="call-btn"
        aria-label="Call Now"
      >
        <img
          src={siteCall.src}
          alt="Call Icon"
        />
      </a>

      <a
        href="https://wa.me/916377075972"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-btn"
        aria-label="WhatsApp"
      >
        <img
          src={siteWhatsapp.src}
          alt="WhatsApp Icon"
        />
      </a>

    </div>
  );
};

export default FloatingButtons;