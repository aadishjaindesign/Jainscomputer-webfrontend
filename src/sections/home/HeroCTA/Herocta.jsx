"use client";

import "./herocta.css";

import { useRouter } from "next/navigation";

import { usePopup } from "@/context/PopupContext";

const HeroCTA = () => {

  const { openPopup } = usePopup();

  const router = useRouter();

  return (
    <footer className="herocta-container">

      <div className="herocta-content">

        <h3 className="herocta-title">
          Ready to upskill yourself?
        </h3>

        <p className="herocta-description">
          Choose from basic to professional-level courses.
        </p>

        <div className="herocta-actions">

          {/* POPUP BUTTON */}
          <button
            className="herocta-btn-enroll"
            onClick={() => openPopup()}
          >
            🎓 Book Free Consultation
          </button>

          <button
            className="herocta-btn-view"
            onClick={() => router.push("/courses")}
          >
            Explore Courses →
          </button>

        </div>

      </div>

    </footer>
  );
};

export default HeroCTA;