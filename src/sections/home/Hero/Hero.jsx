"use client";

import "./Hero.css";

import { FaArrowRightLong } from "react-icons/fa6";
import { FcGraduationCap } from "react-icons/fc";

import Image from "next/image";
import { useRouter } from "next/navigation";

import locationIcon from "@/assets/Icon/Location.svg";
import officeImg from "@/assets/image/staff.webp";

import { usePopup } from "@/context/PopupContext";

const Hero = () => {
  const router = useRouter();

  const { openPopup } = usePopup();

  return (
    <div className="hero-wrapper">
      <section className="hero">

        <div className="hero-left">

          <div className="hero-badges">
            <div className="badge red dot">
              Jaipur's #1 IT Training Institute
            </div>

            <div className="badge purple dot">
              AI-Powered Curriculum · Updated Every 6 Months
            </div>
          </div>

          <h1>
            Jains Computer - Trusted
            <br />
            <span>Institute In Jhotwara, Jaipur</span>
          </h1>

          <p className="hero-desc">
            Master In-Demand IT Skills From Industry Experts With
            26+ Years Of Excellence, An AI-Powered Curriculum,
            And A 6,000 Sq. Ft. Campus In Jaipur — Everything
            You Need To Launch A Real Career.
          </p>

          {/* MOBILE IMAGE */}
          <div className="hero-right-mobile">
            <div className="hero-image-box">

              <Image
                src={officeImg}
                alt="campus"
                className="hero-img"
              
              />

            </div>
          </div>

          <div className="hero-buttons">

            <button
              className="btn primary"
              onClick={() => openPopup()}
            >
              <FcGraduationCap />
              Book Free Consultation
            </button>

            <button
              className="btn secondaryhero"
              onClick={() => router.push("/courses")}
            >
              Browse Courses

              <FaArrowRightLong
                style={{
                  marginTop: "5px",
                  marginBottom: "-4px",
                }}
              />
            </button>

          </div>

          <div className="hero-stats">
            <div>
              <strong className="hero-stat-num">2.5K+</strong>
              <p>Expert-Led Lessons</p>
            </div>
            <div>
              <strong className="hero-stat-num">15K+</strong>
              <p>Alumni Trained</p>
            </div>
            <div>
              <strong className="hero-stat-num">26+</strong>
              <p>Years of Trust</p>
            </div>
          </div>
        </div>

        <div className="hero-right">

          <div className="float-card star">
            ⭐ <b>600+</b>
            <span>5-Star Reviews</span>
          </div>

          <div className="float-card campuse">

            <Image
              src={locationIcon}
              alt="location"
              className="campuslocation-icon"
            />

            <b>6000</b>
            <span>Sq.Ft. Campus</span>

          </div>

          <div className="float-card update">
            <span className="ai">AI Powered</span>
            <b>Updated Curriculum</b>
            <p>Refreshed every 6 months</p>
          </div>

          <div className="program-box">
            <div className="hero-image-box">
              <Image
                src={officeImg}
                alt="campus"
                className="hero-img"
                priority
                fetchPriority="high"
                sizes="(max-width: 480px) 100vw, (max-width: 1024px) 80vw, 603px"
              />

            </div>
          </div>

        </div>

      </section>
    </div>
  );
};

export default Hero;