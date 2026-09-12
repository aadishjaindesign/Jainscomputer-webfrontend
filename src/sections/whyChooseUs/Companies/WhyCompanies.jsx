"use client";

import "./WhyCompanies.css";

import { useRef, useEffect } from "react";

import Image from "next/image";

import hiringIcon from "@/assets/Icon/Hiring-Partners.svg";
import coursesIcon from "@/assets/Icon/Coursesfaq.svg";
import feesIcon from "@/assets/Icon/Feesfaq.svg";
import placementIcon from "@/assets/Icon/Placementfaq.svg";

import brillio from "@/assets/Icon/aryavrat.svg";
import cashify from "@/assets/Icon/Asset-8.svg";
import genpact from "@/assets/Icon/cogent.svg";
import opifi from "@/assets/Icon/digicial-logo.svg";
import paypal from "@/assets/Icon/get-marketed.svg";
import saadaa from "@/assets/Icon/jaipur-social.svg";
import tcs from "@/assets/Icon/Mhender.svg";
import logo from "@/assets/Icon/Next-level.svg";
import sage from "@/assets/Icon/sage.svg";
import tatwansh from "@/assets/Icon/Tatwansh_logo-r63nxb0ibabam51vli4dxo17cuf3zqowa3pzb0g988.svg";

const companiesRow1 = [
  { name: "Brillio", logo: brillio },
  { name: "Cashify", logo: cashify },
  { name: "Genpact", logo: genpact },
  { name: "Opifi", logo: opifi },
  { name: "PayPal", logo: paypal },
];

const companiesRow2 = [
  { name: "Saadaa", logo: saadaa },
  { name: "TCS", logo: tcs },
  { name: "Company", logo: logo },
  { name: "Sage", logo: sage },
  { name: "Tatwansh", logo: tatwansh },
];

const REPEAT = 4;

const row1Cards = Array.from(
  { length: REPEAT },
  () => companiesRow1
).flat();

const row2Cards = Array.from(
  { length: REPEAT },
  () => companiesRow2
).flat();

const SPEED = 1.2;

const CompanyCard = ({ name, logo }) => (
  <div className="wc-company-card" role="listitem">

    <Image
      src={logo}
      alt={`${name} company logo`}
      className="wc-company-logo"
      width={140}
      height={60}
    />

  </div>
);

const useScrollRow = (direction = "left") => {

  const trackRef = useRef(null);

  const posRef = useRef(0);

  const rafRef = useRef(null);

  const resumeTimerRef = useRef(null);

  const isMobileTablet = useRef(false);

  const runningRef = useRef(false);

  const speedSign = direction === "right" ? 1 : -1;

  useEffect(() => {

    const checkDevice = () => {
      isMobileTablet.current = window.innerWidth <= 1024;
    };

    checkDevice();

    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };

  }, []);

  useEffect(() => {

    const track = trackRef.current;

    if (!track) return;

    const getHalfWidth = () => track.scrollWidth / REPEAT;

    const clampPos = (p) => {

      const half = getHalfWidth();

      let c = p % half;

      if (c > 0) c -= half;

      return c;

    };

    const applyPos = (p) => {

      posRef.current = clampPos(p);

      track.style.transform = `translateX(${posRef.current}px)`;

    };

    const step = () => {

      if (!runningRef.current) return;

      applyPos(posRef.current + SPEED * speedSign);

      rafRef.current = requestAnimationFrame(step);

    };

    const startAuto = () => {

      if (runningRef.current) return;

      runningRef.current = true;

      rafRef.current = requestAnimationFrame(step);

    };

    const stopAuto = () => {

      runningRef.current = false;

      cancelAnimationFrame(rafRef.current);

    };

    track._startAuto = startAuto;

    track._stopAuto = stopAuto;

    if (isMobileTablet.current) {
      startAuto();
    }

    const onResize = () => {

      if (isMobileTablet.current) {

        startAuto();

      } else {

        stopAuto();

        posRef.current = 0;

        track.style.transform = "";

      }

    };

    window.addEventListener("resize", onResize);

    return () => {

      stopAuto();

      window.removeEventListener("resize", onResize);

    };

  }, [speedSign]);

  useEffect(() => {

    const track = trackRef.current;

    if (!track) return;

    let touchStartX = 0;

    let lastPos = 0;

    let lastTouchX = 0;

    let velocity = 0;

    let momentumRAF = null;

    const getHalfWidth = () => track.scrollWidth / REPEAT;

    const clampPos = (p) => {

      const half = getHalfWidth();

      let c = p % half;

      if (c > 0) c -= half;

      return c;

    };

    const applyPos = (p) => {

      posRef.current = clampPos(p);

      track.style.transform = `translateX(${posRef.current}px)`;

    };

    const onTouchStart = (e) => {

      if (!isMobileTablet.current) return;

      cancelAnimationFrame(momentumRAF);

      clearTimeout(resumeTimerRef.current);

      track._stopAuto?.();

      touchStartX = e.touches[0].clientX;

      lastTouchX = touchStartX;

      lastPos = posRef.current;

      velocity = 0;

    };

    const onTouchMove = (e) => {

      if (!isMobileTablet.current) return;

      const currentX = e.touches[0].clientX;

      velocity = currentX - lastTouchX;

      lastTouchX = currentX;

      applyPos(lastPos + (currentX - touchStartX));

    };

    const onTouchEnd = () => {

      if (!isMobileTablet.current) return;

      const glide = () => {

        if (Math.abs(velocity) < 0.5) {

          clearTimeout(resumeTimerRef.current);

          resumeTimerRef.current = setTimeout(() => {

            track._startAuto?.();

          }, 1500);

          return;

        }

        velocity *= 0.93;

        applyPos(posRef.current + velocity);

        momentumRAF = requestAnimationFrame(glide);

      };

      momentumRAF = requestAnimationFrame(glide);

    };

    track.addEventListener("touchstart", onTouchStart, {
      passive: true,
    });

    track.addEventListener("touchmove", onTouchMove, {
      passive: true,
    });

    track.addEventListener("touchend", onTouchEnd, {
      passive: true,
    });

    return () => {

      track.removeEventListener("touchstart", onTouchStart);

      track.removeEventListener("touchmove", onTouchMove);

      track.removeEventListener("touchend", onTouchEnd);

      cancelAnimationFrame(momentumRAF);

    };

  }, []);

  return trackRef;
};

const WhyCompanies = () => {

  const row1Ref = useScrollRow("left");

  const row2Ref = useScrollRow("right");

  return (
    <section
      className="placement-section"
      aria-labelledby="placement-heading"
    >

      <div className="container">

        {/* HEADER */}
        <header className="placement-header">

          <p className="se-sectionn-label">
            ● CAREER-READY PROGRAMMES
          </p>

          <div className="header-main">

            <div className="text-content">

              <h2 id="placement-heading">

                Extensive Hiring Networks
                <br />

                <span>
                  To Get Placements
                </span>

              </h2>

              <p className="header-desc">

                From reputable local companies to renowned brands
                in the nation, our graduates get enormous opportunities
                to begin their careers.

              </p>

            </div>

            <div className="trust-badges">

              <div className="badge-item">

                <span className="b-icon">

                  <Image
                    src={hiringIcon}
                    alt="Hiring Partners"
                    width={24}
                    height={24}
                  />

                </span>

                200+ Hiring Partners

              </div>

              <a
                className="badge1-item red-text"
                href="https://www.google.com/maps/place/Jains+Computer/@26.9428269,75.752878,17z"
                target="_blank"
                rel="noopener noreferrer"
              >

                <span className="b1-icon">
                  📍
                </span>

                Jaipur & PAN India

              </a>

            </div>

          </div>

        </header>

        {/* SCROLL */}
        <div className="wc-network-scroll" role="list">

          <div className="wc-scroll-row">

            <div className="wc-scroll-track" ref={row1Ref}>

              {row1Cards.map((company, index) => (
                <CompanyCard key={index} {...company} />
              ))}

            </div>

          </div>

          <div className="wc-scroll-row">

            <div className="wc-scroll-track" ref={row2Ref}>

              {row2Cards.map((company, index) => (
                <CompanyCard key={index} {...company} />
              ))}

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="stats-grid">

          <article className="stat-box">

            <div className="s-icon">

              <Image
                src={hiringIcon}
                alt="Hiring Partners"
                width={34}
                height={34}
              />

            </div>

            <strong className="s-number">
              200+
            </strong>

            <p className="s-label">
              Hiring Partners
            </p>

          </article>

          <article className="stat-box">

            <div className="s-icon">

              <Image
                src={coursesIcon}
                alt="Students Placed"
                width={34}
                height={34}
              />

            </div>

            <strong className="s-number">
              85%
            </strong>

            <p className="s-label">
              Students Placed
            </p>

          </article>

          <article className="stat-box">

            <div className="s-icon">

              <Image
                src={feesIcon}
                alt="Time to Hire"
                width={34}
                height={34}
              />

            </div>

            <strong className="s-number">
              60 Days
            </strong>

            <p className="s-label">
              Avg. Time to Hire
            </p>

          </article>

          <article className="stat-box">

            <div className="s-icon">

              <Image
                src={placementIcon}
                alt="Starting Salary"
                width={34}
                height={34}
              />

            </div>

            <strong className="s-number">
              ₹20K+
            </strong>

            <p className="s-label">
              Avg. Starting Salary
            </p>

          </article>

        </div>

      </div>

    </section>
  );
};

export default WhyCompanies;