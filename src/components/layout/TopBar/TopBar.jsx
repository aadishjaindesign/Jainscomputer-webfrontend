"use client";

import "./TopBar.css";
import { usePopup } from "@/context/PopupContext";

const TopBar = () => {
  const { openPopup } = usePopup();

  return (
    <div className="topbar">
      <p className="topbar-text topbar-desktop">
        New batch starting soon — Limited seats per course.
      </p>

      <div className="topbar-scroll topbar-mobile">
        <div className="topbar-track">
          <p className="topbar-text">
            New batch starting soon — Limited seats per course.
          </p>
          <p className="topbar-text">
            New batch starting soon — Limited seats per course.
          </p>
          <p className="topbar-text">
            New batch starting soon — Limited seats per course.
          </p>
          <p className="topbar-text">
            New batch starting soon — Limited seats per course.
          </p>
        </div>
      </div>

      <button className="topbar-btn" onClick={() => openPopup()}>
        Reserve your seat
      </button>
    </div>
  );
};

export default TopBar;