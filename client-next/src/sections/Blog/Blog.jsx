"use client";

import "./Blog.css";

import { useState, useEffect } from "react";

import Link from "next/link";

import { getAllBlogs } from "@/services/blogService";

import { usePopup } from "@/context/PopupContext";

const Events = () => {

  const { openPopup } = usePopup();

  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {

    let cancelled = false;

    getAllBlogs()
      .then((docs) => {
        if (!cancelled) setAllBlogs(docs);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (

    <section className="events-section">

      <div className="events-top">

        <div>

          <p className="events-tag">
            Welcome to our blog
          </p>

          <h1>
            Explore Insightful Blog
          </h1>

          <p className="events-desc">

            Consistently upgrade your knowledge while staying aligned with
            market trends. Explore expertly written articles
            <br />
            to adopt practical tips, new technology, job-ready skills,
            future-ready abilities, and much more.

          </p>

        </div>

      </div>

      {allBlogs.length > 0 && (
        <div className="events-grid">

          {allBlogs.map((item, index) => (

            <Link
              href={`/blog/${item.id}`}
              className="events-card"
              key={item.id || index}
            >

              <div className="events-img">

                {item.image?.src && (
                  <img
                    src={item.image.src}
                    alt={item.title}
                  />
                )}

                <span className="events-read-time">
                  {item.readingTime} min Read
                </span>

              </div>

              <div className="events-body">

                <span className="events-category">
                  {item.category}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.desc}
                </p>

                <div className="events-footer">

                  <span>
                    {item.date}
                  </span>

                  <span>
                    Read More →
                  </span>

                </div>

              </div>

            </Link>

          ))}

        </div>
      )}

      {/* BLOG PAGE CTA */}
      <div className="events-cta">

        <h3>
          Willing To Get Practical Training From Industry Experts?
        </h3>

        <p>
          Get one-on-one consultation with expert counselors to choose the
          right course to shape your career.
        </p>

        <button onClick={() => openPopup()}>
          Claim Free Consultation
        </button>

      </div>

    </section>

  );
};

export default Events;
