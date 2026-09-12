"use client";

import "./WhyCTA.css";

import { usePopup } from "@/context/PopupContext";

const WhyCTA = () => {

  const { openPopup } = usePopup();

  return (
    <footer className="placemente-cta">

      <div className="cta-content">

        <h3>
          Join the growing community to upgrade yourself.
        </h3>

        <p>
          Begin the first step towards securing
          a future-ready skillset.
        </p>

        <div className="cta-actions">

          <button
            className="btn-enroll"
            onClick={() => openPopup()}
          >
            🎓 Book Free Consultation
          </button>

        </div>

      </div>

    </footer>
  );
};

export default WhyCTA;