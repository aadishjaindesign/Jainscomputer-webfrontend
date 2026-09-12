"use client";

import "./PlacementPartners.css";

import { useRef, useEffect } from "react";

import Image from "next/image";

import { memo } from "react";

import brillio from "@/assets/Icon/aryavrat.svg";
import cashify from "@/assets/Icon/Asset-8.svg";
import genpact from "@/assets/Icon/cogent.svg";
import opifi from "@/assets/Icon/digicial-logo.svg";
import paypal from "@/assets/Icon/get-marketed.svg";
import saadaa from "@/assets/Icon/jaipur-social.svg";
import tcs from "@/assets/Icon/Mhender.svg";
import logo from "@/assets/Icon/Next-level.svg";
import tatwansh from "@/assets/Icon/Tatwansh_logo-r63nxb0ibabam51vli4dxo17cuf3zqowa3pzb0g988.svg";

const companies = [
  { name: "Aryavrat", logo: brillio, className: "Brillio" },
  { name: "Asset", logo: cashify, className: "Cashify" },
  { name: "Cogent", logo: genpact, className: "Genpact" },
  { name: "Digital", logo: opifi, className: "Opifi" },
  { name: "Get Marketed", logo: paypal, className: "PayPal" },
  { name: "Jaipur Social", logo: saadaa, className: "saadaa" },
  { name: "Tatwansh", logo: tatwansh, className: "tatwansh" },
  { name: "Mahendra", logo: tcs, className: "mahendra-logo" },
  { name: "Next Level", logo: logo, className: "NextLevel" },
];

const REPEAT = 2;

const allCards = Array.from(
  { length: REPEAT },
  () => companies
).flat();

const CompanyCard = memo(
  ({ name, logo, className }) => (
    <div className="company-card">
      <Image
        src={logo}
        alt={`${name} logo`}
        width={180}
        height={60}
        className={`company-logo ${className || ""}`}
      />
    </div>
  )
);

const PlacementPartners = () => {

  const trackRef = useRef(null);

  const rafRef = useRef(null);

  const posRef = useRef(0);

  const resumeTimerRef = useRef(null);

  const isMobileTablet = useRef(false);

  const SPEED = 0.5;

  useEffect(() => {

    const checkDevice = () => {
      isMobileTablet.current =
        window.innerWidth <= 1024;
    };

    checkDevice();

    window.addEventListener(
      "resize",
      checkDevice
    );

    return () =>
      window.removeEventListener(
        "resize",
        checkDevice
      );

  }, []);

  useEffect(() => {

    const track = trackRef.current;

    if (!track) return;

    let running = false;

    const getHalfWidth = () =>
      track.scrollWidth / REPEAT;

    const step = () => {

      if (!running) return;

      posRef.current -= SPEED;

      const half = getHalfWidth();

      if (Math.abs(posRef.current) >= half) {
        posRef.current += half;
      }

      track.style.transform =
        `translateX(${posRef.current}px)`;

      rafRef.current =
        requestAnimationFrame(step);

    };

    const startAuto = () => {

      if (running) return;

      running = true;

      rafRef.current =
        requestAnimationFrame(step);

    };

    const stopAuto = () => {

      running = false;

      cancelAnimationFrame(rafRef.current);

    };

    track._startAuto = startAuto;

    track._stopAuto = stopAuto;

    const maybeStart = () => {

      if (isMobileTablet.current)
        startAuto();

    };

    maybeStart();

    const onResize = () => {

      if (isMobileTablet.current) {

        startAuto();

      } else {

        stopAuto();

        posRef.current = 0;

        track.style.transform = "";

      }

    };

    window.addEventListener(
      "resize",
      onResize
    );

    return () => {

      stopAuto();

      window.removeEventListener(
        "resize",
        onResize
      );

    };

  }, []);

  useEffect(() => {

    const track = trackRef.current;

    if (!track) return;

    let touchStartX = 0;

    let lastPos = 0;

    let lastTouchX = 0;

    let velocity = 0;

    let momentumRAF = null;

    const getHalfWidth = () =>
      track.scrollWidth / REPEAT;

    const clampPos = (p) => {

      const half = getHalfWidth();

      let clamped = p % half;

      if (clamped > 0)
        clamped -= half;

      return clamped;

    };

    const applyPos = (p) => {

      posRef.current = clampPos(p);

      track.style.transform =
        `translateX(${posRef.current}px)`;

    };

    const onTouchStart = (e) => {

      if (!isMobileTablet.current) return;

      cancelAnimationFrame(momentumRAF);

      clearTimeout(resumeTimerRef.current);

      track._stopAuto?.();

      touchStartX =
        e.touches[0].clientX;

      lastTouchX = touchStartX;

      lastPos = posRef.current;

      velocity = 0;

    };

    const onTouchMove = (e) => {

      if (!isMobileTablet.current) return;

      const currentX =
        e.touches[0].clientX;

      const delta =
        currentX - touchStartX;

      velocity =
        currentX - lastTouchX;

      lastTouchX = currentX;

      applyPos(lastPos + delta);

    };

    const onTouchEnd = () => {

      if (!isMobileTablet.current) return;

      const glide = () => {

        if (Math.abs(velocity) < 0.5) {

          scheduleResume();

          return;

        }

        velocity *= 0.93;

        applyPos(
          posRef.current + velocity
        );

        momentumRAF =
          requestAnimationFrame(glide);

      };

      momentumRAF =
        requestAnimationFrame(glide);

    };

    const scheduleResume = () => {

      clearTimeout(
        resumeTimerRef.current
      );

      resumeTimerRef.current =
        setTimeout(() => {
          track._startAuto?.();
        }, 1500);

    };

    track.addEventListener(
      "touchstart",
      onTouchStart,
      { passive: true }
    );

    track.addEventListener(
      "touchmove",
      onTouchMove,
      { passive: true }
    );

    track.addEventListener(
      "touchend",
      onTouchEnd,
      { passive: true }
    );

    return () => {

      track.removeEventListener(
        "touchstart",
        onTouchStart
      );

      track.removeEventListener(
        "touchmove",
        onTouchMove
      );

      track.removeEventListener(
        "touchend",
        onTouchEnd
      );

      cancelAnimationFrame(momentumRAF);

    };

  }, []);

  return (
    <section className="placement-wrapper">

      <h2 className="placement-title">
        Placement <span>Partners</span>
      </h2>

      <div className="network-scroll">

        <div
          className="scrolle-track"
          ref={trackRef}
        >

          {allCards.map((company, index) => (
            <CompanyCard
              key={index}
              {...company}
            />
          ))}

        </div>

      </div>

    </section>
  );
};

export default PlacementPartners;