"use client";

import "./WhyHero.css";

import Image from "next/image";

import img1 from "@/assets/image/abhinav.webp";
import img2 from "@/assets/image/Yashika.webp";
import img3 from "@/assets/image/Bhumika.webp";
import img4 from "@/assets/image/Riya.webp";
import img5 from "@/assets/image/Amar.webp";
import img6 from "@/assets/image/Prerna.webp";
import img7 from "@/assets/image/dev.webp";
import img8 from "@/assets/image/Vidit.webp";
import img9 from "@/assets/image/Amaan.webp";
import img10 from "@/assets/image/Shivani.webp";
import img11 from "@/assets/image/Shreya.webp";
import img12 from "@/assets/image/Jayesh.webp";
import img13 from "@/assets/image/Kapil.webp";
import img14 from "@/assets/image/Bhupesh.webp";
import img15 from "@/assets/image/ekansh.webp";
import img16 from "@/assets/image/yogesh.webp";

const students = [
  { name: "Abhinav", img: img1, company: "TCS" },
  { name: "Yashika", img: img2, company: "Infosys" },
  { name: "Bhumika", img: img3, company: "Wipro" },
  { name: "Riya", img: img4, company: "HCL" },
  { name: "Amar", img: img5, company: "Accenture" },
  { name: "Prerna", img: img6, company: "Capgemini" },
  { name: "Dev", img: img7, company: "Capgemini" },
  { name: "Vidit", img: img8, company: "Capgemini" },
  { name: "Amaan", img: img9, company: "Capgemini" },
  { name: "Shivani", img: img10, company: "Capgemini" },
  { name: "Shreya", img: img11, company: "Capgemini" },
  { name: "Jayesh", img: img12, company: "Capgemini" },
  { name: "Kapil", img: img13, company: "Capgemini" },
  { name: "Bhupesh", img: img14, company: "Capgemini" },
  { name: "Ekansh", img: img15, company: "Capgemini" },
  { name: "Yogesh", img: img16, company: "Capgemini" },
];

const Card = ({ item }) => (
  <article
    className="ws-card"
    aria-label={`${item.name} placed at ${item.company}`}
  >
    <Image
      src={item.img}
      alt={`${item.name} — Jains Computer student placed at ${item.company}`}
      width={120}
      height={140}
      loading="lazy"
    />
  </article>
);

const WhyHero = () => {

  const col1 = students.slice(0, 6);
  const col2 = students.slice(5, 11);
  const col3 = students.slice(10, 16);

  return (
    <section
      className="ws-hero"
      aria-labelledby="why-hero-heading"
      itemScope
      itemType="https://schema.org/EducationalOrganization"
    >

      {/* LEFT */}
      <div className="ws-left">

        <p className="ws-breadcrumb">
          <span>Why Choose Us</span>
        </p>

        <p className="ws-tag">
          Student Stories
        </p>

        <h1 id="why-hero-heading">
          The Symbol of <span>Learning Excellence</span>
        </h1>

        <p className="ws-desc">
          We strongly believe that the right mentoring and training can change
          lives. We emphasize comprehensive career development, from personalised
          counselling to one-on-one coaching.
        </p>

        <a
          href="https://www.google.com/maps/place/Jains+Computer/@26.9428269,75.752878,17z"
          target="_blank"
          rel="noopener noreferrer"
          className="ws-btn"
        >
          📍 View on Google Maps
        </a>

      </div>

      {/* RIGHT */}
      <div className="ws-right">

        <div className="ws-col">
          <div className="ws-track ws-track--up">
            {[...col1, ...col1].map((item, i) => (
              <Card key={`c1-${i}`} item={item} />
            ))}
          </div>
        </div>

        <div className="ws-col">
          <div className="ws-track ws-track--down">
            {[...col2, ...col2].map((item, i) => (
              <Card key={`c2-${i}`} item={item} />
            ))}
          </div>
        </div>

        <div className="ws-col">
          <div className="ws-track ws-track--slow">
            {[...col3, ...col3].map((item, i) => (
              <Card key={`c3-${i}`} item={item} />
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

export default WhyHero;