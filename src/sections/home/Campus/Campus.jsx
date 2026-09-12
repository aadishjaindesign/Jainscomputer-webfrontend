"use client";

import "./Campus.css";

import { useState } from "react";

import Image from "next/image";

import { MdSlowMotionVideo } from "react-icons/md";

import locationIcon from "@/assets/Icon/Medal 1.svg";

import { usePopup } from "@/context/PopupContext";

const Campus = () => {
  const [openVideo, setOpenVideo] = useState(false);
  const [videoId, setVideoId] = useState("");

  const { openPopup } = usePopup();

  return (
    <section className="campus" aria-labelledby="campus-heading">

      <div className="campus-inner">

        <div className="campus-left">

          <p className="campus-tag">See Us in Action</p>

          <h2 id="campus-heading">
            Meet Jains Computer: <br />
            <span>
              The professional Computer Training Institute, Jhotwara
            </span>
          </h2>

          <p className="campus-desc">
            We Are Committed To Providing Quality Education That Helps You
            Build Practical Skills And A Successful Career In Digital
            Marketing, Graphic And Motion Design, Programming, Web
            Development, And More.
          </p>

          <ul className="campus-points">
            <li>Practical-based learning approach.</li>
            <li>Experienced and superior trainers.</li>
            <li>Flexible class timings.</li>
            <li>Certification after course completion.</li>
            <li>Career guidance and job support.</li>
          </ul>

          <div className="campus-buttons">

            <button
              className="btn primary"
              onClick={() => openPopup()}
            >
              🎓 Book Free Consultation
            </button>

            <button
              className="btn secondary1"
              onClick={() => {
                setVideoId("CZ3cEVdO57M");
                setOpenVideo(true);
              }}
            >
              ▶ Watch Full Tour
            </button>

          </div>

        </div>

        <div className="campus-right">

          <article className="video-card">

            <span className="video-badge">
              Official Campus Tour
            </span>

            <div
              className="video-wrapper"
              onClick={() => {
                setVideoId("GMBVVHsB-Q8");
                setOpenVideo(true);
              }}
            >

              <Image
  src="https://img.youtube.com/vi/GMBVVHsB-Q8/hqdefault.jpg"
  alt="Campus Tour"
  width={480}
  height={360}
  loading="lazy"
  unoptimized
/>

              <div className="overlay">
                <div className="play-bt">
                  <MdSlowMotionVideo
                    size={65}
                    color="#E31C1C"
                  />
                </div>
              </div>

            </div>

            <div className="rating-box">
              <strong>4.9/5</strong>
              <span>Student Rating</span>
            </div>

            <div className="top-rank">

              <div className="rank-icon-box">
              <Image
  src={locationIcon}
  alt="rank"
  width={60}
  height={60}
/>
              </div>

              <strong>#1</strong>
              <span>IT Institute, Jaipur</span>

            </div>

            <div className="video-info">

              <div className="video-info-top">
                <h3>Top 5 High Paying Careers in 2026</h3>
                <span className="live-badge">Live Tour</span>
              </div>

              <p>
                Campus · Students · Faculty · Placements
              </p>

            </div>

            <div className="video-stats">
              <div><strong>600+</strong><span>Reviews</span></div>
              <div><strong>15K+</strong><span>Students</span></div>
              <div><strong>5K+</strong><span>Placements</span></div>
              <div><strong>6</strong><span>Courses</span></div>
            </div>

          </article>

        </div>

      </div>

      {openVideo && (
        <div className="video-modal">

          <button
            className="close-btn"
            onClick={() => {
              setOpenVideo(false);
              setVideoId("");
            }}
          >
            ✕
          </button>

          <div className="video-modal-content">

            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Campus Tour"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>

          </div>

        </div>
      )}

    </section>
  );
};

export default Campus;