"use client";

import "./WhyCampus.css";

import Image from "next/image";

import campusMain from "@/assets/image/Compus.webp";
import img1 from "@/assets/image/Compus1.avif";
import img2 from "@/assets/image/Compus2.avif";
import img3 from "@/assets/image/Compus3.avif";
import img4 from "@/assets/image/Compus4.avif";

const WhyCampus = () => {

  const data = [
    {
      img: img1,
      title: "Computer Labs",
      desc: "50+ High Space Systems",
    },

    {
      img: img2,
      title: "Design Studio",
      desc: "Creative Workspace",
    },

    {
      img: img3,
      title: "Editing Suite",
      desc: "Pro Grade Setup",
    },

    {
      img: img4,
      title: "Resource Library",
      desc: "Course Materials",
    },
  ];

  return (
    <section className="wc-section">

      {/* HEADER */}
      <div className="wc-header">

        <p className="wc-badge">

          <span className="wc-dot"></span>

          Expert Faculty

        </p>

        <h2 className="wc-title">

          6000Sq.Ft. <span>Modern Campus</span>

        </h2>

        <p className="wc-desc">

          A calm and pleasant ambience to stay focused
          on smart learning and growth.

        </p>

      </div>

      {/* GRID */}
      <div className="wc-grid">

        {/* LEFT */}
        <div className="wc-main">

          <Image
            src={campusMain}
            alt="Jains Computer Modern Campus"
            className="wc-bg-img"
            width={900}
            height={700}
          />

          <div className="wc-overlay"></div>

        </div>

        {/* RIGHT */}
        <div className="wc-right">

          {data.map((item, i) => (

            <div className="wc-card" key={i}>

              <Image
                src={item.img}
                alt={item.title}
                className="wc-bg-img"
                width={400}
                height={300}
              />

              <div className="wc-overlay"></div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default WhyCampus;