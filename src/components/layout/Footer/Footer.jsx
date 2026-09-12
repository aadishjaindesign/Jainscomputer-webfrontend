"use client";

import "./Footer.css";

import Link from "next/link";

import logo1 from "@/assets/logo/white logo.svg";

import instaIcon from "@/assets/Icon/insta.svg";
import fbIcon from "@/assets/Icon/Fb.svg";
import ytIcon from "@/assets/Icon/yt.svg";
import xIcon from "@/assets/Icon/X.svg";

import locationIcon from "@/assets/Icon/Footer location.svg";
import mailIcon from "@/assets/Icon/Footer Mail.svg";
import callIcon from "@/assets/Icon/Footer call.svg";

import courseData from "@/data/courseData";

const Footer = () => {
  return (
    <footer className="site-footer" role="contentinfo">

      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-WhyChooseUs">

          <img
            src={logo1.src}
            alt="Jains Computer Logo"
          />

          <p>
            Jains Computer believes in offering <br />
            individuals future-ready skills, strong <br />
            values, and the opportunities they <br />
            need to be successful in a competitive environment.
            <br />
          </p>

        </div>

        {/* LINKS */}
        <nav className="footer-links">

          <h3>Useful Links</h3>

          <ul>
            <li><Link href="/">Home</Link></li>

            <li>
              <Link href="/courses">
                Courses
              </Link>
            </li>

            <li>
              <Link href="/why-choose-us">
                Why Choose Us
              </Link>
            </li>

            <li>
              <Link href="/contact">
                Contact Us
              </Link>
            </li>

            <li>
              <Link href="/blog">
                Blog
              </Link>
            </li>
          </ul>

        </nav>

        {/* COURSES 1 */}
        <div className="footer-courses">

          <h3>Our Courses</h3>

          <ul>
           {Object.values(courseData).slice(0, 6).map((course) => (
  <li key={course.slug}>
    <Link href={`/courses/${course.slug}`}>
      {course.shortTitle}
    </Link>
  </li>
))}
          </ul>

        </div>

        {/* COURSES 2 */}
        <div className="footer-courses">

          <h3 style={{ visibility: "hidden" }}>
            Our Courses
          </h3>

          <ul>
            <ul>
  {Object.values(courseData).slice(6, 12).map((course) => (
    <li key={course.slug}>
      <Link href={`/courses/${course.slug}`}>
        {course.shortTitle}
      </Link>
    </li>
  ))}
</ul>
          </ul>

        </div>

        {/* INFO */}
        <address className="footer-info">

          <h3>Information</h3>

          <p className="footer-item">
            <img src={locationIcon.src} alt="" />
            Jhotwara, Jaipur
          </p>

          <p className="footer-item">
            <img src={mailIcon.src} alt="" />
            contact@jainscomputer.com
          </p>

          <p className="footer-item">
            <img src={callIcon.src} alt="" />
            +91-9829498998
          </p>

          <div className="footer-social">

            <a href="https://www.instagram.com/jainscomputer/">
              <img src={instaIcon.src} alt="" />
            </a>

            <a href="https://www.facebook.com/jainscomputer/">
              <img src={fbIcon.src} alt="" />
            </a>

            <a href="https://www.youtube.com/@jainscomputer">
              <img src={ytIcon.src} alt="" />
            </a>

            <a href="https://www.linkedin.com/company/jains-computer/">
              <img src={xIcon.src} alt="" />
            </a>

          </div>

        </address>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom-bar">

        <p>
          © 2026 Jains Computer. All Rights Reserved.
        </p>

        <div className="footer-policy">

          <Link href="/privacy-policy">
            Privacy Policy
          </Link>

          <Link href="/terms-conditions">
            Terms & Conditions
          </Link>

        </div>

      </div>

    </footer>
  );
};

export default Footer;