"use client";

import { useState } from "react";

import Link from "next/link";

import "./Navbar.css";

import logo from "@/assets/logo/Logo.svg";

import { usePopup } from "@/context/PopupContext";

import {
  IconHome,
  IconBook,
  IconStar,
  IconPhone,
  IconNews,
} from "@tabler/icons-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { openPopup } = usePopup();

  return (
    <nav className="navbar">

      <div className="nav-left">
        <Link href="/">
          <img
            src={logo.src}
            alt="Jains Computer Logo"
          />
        </Link>
      </div>

      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>

        <li>
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
          >
            <IconHome
              className="nav-icon"
              size={18}
              stroke={1.5}
              aria-hidden="true"
            />
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/courses"
            onClick={() => setMenuOpen(false)}
          >
            <IconBook
              className="nav-icon"
              size={18}
              stroke={1.5}
              aria-hidden="true"
            />
            Courses
          </Link>
        </li>

        <li>
          <Link
            href="/why-choose-us"
            onClick={() => setMenuOpen(false)}
          >
            <IconStar
              className="nav-icon"
              size={18}
              stroke={1.5}
              aria-hidden="true"
            />
            Why Choose Us
          </Link>
        </li>

        <li>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
          >
            <IconPhone
              className="nav-icon"
              size={18}
              stroke={1.5}
              aria-hidden="true"
            />
            Contact Us
          </Link>
        </li>

        <li>
          <Link
            href="/blog"
            onClick={() => setMenuOpen(false)}
          >
            <IconNews
              className="nav-icon"
              size={18}
              stroke={1.5}
              aria-hidden="true"
            />
            Blog
          </Link>
        </li>

        {/* Mobile only */}
        <li className="nav-menu-footer">
          <button
            className="consult-btn-mobile"
            onClick={() => {
              openPopup();
              setMenuOpen(false);
            }}
          >
            Book Free Consultation
          </button>
        </li>

      </ul>

      <div className="nav-right">
        <button
          className="consult-btn"
          onClick={() => openPopup()}
        >
          Book Free Consultation
        </button>
      </div>

      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

    </nav>
  );
};

export default Navbar;