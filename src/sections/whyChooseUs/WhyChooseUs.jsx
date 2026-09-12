"use client";

// import "./WhyChooseUs.css";

import WhyHero from "./Hero/WhyHero";

import WhyStats from "./Stats/WhyStats";

import WhyHighlights from "./WhyHighlights/WhyHighlights";

import WhyAbout from "./WhyAbout/WhyAbout";

import WhyReviews from "./Reviews/WhyReviews";



import WhyCompanies from "./Companies/WhyCompanies";

import WhyMentors from "./Mentors/WhyMentors";

import WhyCampus from "./Campus/WhyCampus";

import WhyCTA from "./CTA/WhyCTA";

import WhyCertificates from "./WhyCertificates/WhyCertificates";

import CertificateVerification from "./CertificateVerification/CertificateVerification";

const WhyChooseUs = () => {
  return (
    <div className="why-page">

      <WhyHero />
      <WhyStats />
      <WhyHighlights />
      <WhyAbout />
      <WhyReviews />
      <WhyCompanies />
      <WhyMentors />
      <WhyCertificates />
      <CertificateVerification />
      <WhyCampus />
      <WhyCTA />

    </div>
  );
};

export default WhyChooseUs;