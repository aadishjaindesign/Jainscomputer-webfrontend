"use client";

import { usePopup } from "@/context/PopupContext";

const CourseCTA = ({ course }) => {

  const { openPopup } = usePopup();

  return (
    <div className="contact-cta">

      {/* Dynamic Title */}
      <h2>
        {course?.cta?.title}
      </h2>

      {/* Dynamic Description */}
      <p>
        {course?.cta?.desc}
      </p>

      {/* Button */}
      <button onClick={() => openPopup()}>
        🎓 Claim Free Consultation
      </button>

    </div>
  );
};

export default CourseCTA;