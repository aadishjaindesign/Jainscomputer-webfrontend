"use client";

import "./WhyCertificates.css";

import { useState } from "react";

import Image from "next/image";

import nupur from "@/assets/image/Dumy-Course-Certificate.avif";
import hansa from "@/assets/image/Dumy-Internship Certificate.avif";
import Tallyback from "@/assets/image/Dumy-Tally-Back.avif";
import Tallyfront from "@/assets/image/Dumy-Tally-Front.avif";
import img from "@/assets/image/IMG_1288.webp";

const certificates = [
  {
    id: 1,
    image: nupur,
    alt: "Jains Computer Certificate - Nupur",
  },

  {
    id: 2,
    image: hansa,
    alt: "Jains Computer Certificate - Internship",
  },

  {
    id: 3,
    image: img,
    alt: "Jains Computer Certificate",
  },

  {
    id: 4,
    image: Tallyfront,
    alt: "Jains Computer Certificate",
  },

  {
    id: 5,
    image: Tallyback,
    alt: "Jains Computer Certificate",
  },
];

const WhyCertificates = () => {

  const [selectedImage, setSelectedImage] =
    useState(null);

  return (
    <section
      className="wcert-section"
      aria-labelledby="wcert-heading"
    >

      {/* HEADER */}
      <div className="wcert-header">

        <h2 id="wcert-heading">
          Certificates
        </h2>

        <p>
          Real certificates earned by our
          students after completing courses
          at Jains Computer, Jhotwara, Jaipur.
        </p>

      </div>

      {/* CARDS */}
      <div
        className="wcert-cards"
        role="list"
      >

        {/* FAR LEFT */}
        <div
          className="wcert-card wcert-far-left"
          role="listitem"
          onClick={() =>
            setSelectedImage(certificates[2])
          }
        >

          <Image
            src={certificates[2].image}
            alt={certificates[2].alt}
            width={300}
            height={220}
          />

        </div>

        {/* NEAR LEFT */}
        <div
          className="wcert-card wcert-near-left"
          role="listitem"
          onClick={() =>
            setSelectedImage(certificates[3])
          }
        >

          <Image
            src={certificates[3].image}
            alt={certificates[3].alt}
            width={300}
            height={220}
          />

        </div>

        {/* CENTER */}
        <div
          className="wcert-card wcert-center"
          role="listitem"
          onClick={() =>
            setSelectedImage(certificates[0])
          }
        >

          <Image
            src={certificates[0].image}
            alt={certificates[0].alt}
            width={420}
            height={300}
            priority
          />

        </div>

        {/* NEAR RIGHT */}
        <div
          className="wcert-card wcert-near-right"
          role="listitem"
          onClick={() =>
            setSelectedImage(certificates[1])
          }
        >

          <Image
            src={certificates[1].image}
            alt={certificates[1].alt}
            width={300}
            height={220}
          />

        </div>

        {/* FAR RIGHT */}
        <div
          className="wcert-card wcert-far-right"
          role="listitem"
          onClick={() =>
            setSelectedImage(certificates[4])
          }
        >

          <Image
            src={certificates[4].image}
            alt={certificates[4].alt}
            width={300}
            height={220}
          />

        </div>

      </div>

      {/* POPUP */}
      {selectedImage && (

        <div
          className="wcert-popup-overlay"
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <div
            className="wcert-popup-content"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}
            <button
              className="wcert-close-btn"
              onClick={() =>
                setSelectedImage(null)
              }
            >
              ×
            </button>

            {/* IMAGE */}
            <Image
              src={selectedImage.image}
              alt={selectedImage.alt}
              className="wcert-popup-image"
              width={1000}
              height={700}
            />

          </div>

        </div>

      )}

    </section>
  );
};

export default WhyCertificates;