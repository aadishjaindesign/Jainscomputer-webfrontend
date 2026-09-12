"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import "./BlogDetail.css";

import { getCategories } from "@/services/categoryService";

import { usePopup } from "@/context/PopupContext";

const BlogDetail = ({ blog, relatedBlogs }) => {

  const router = useRouter();

  const { openPopup } = usePopup();

  const [categories, setCategories] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let cancelled = false;

    getCategories()
      .then((items) => {
        if (!cancelled) setCategories(items);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = (event) => {
    if (event.key !== "Enter") return;
    const query = searchText.trim();
    if (!query) return;
    router.push(`/blog?search=${encodeURIComponent(query)}`);
  };

  if (!blog)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        Blog not found
      </div>
    );

  return (

    <div className="bd-wrapper">

      {/* Breadcrumb */}

      <div className="bd-breadcrumb">

        <Link href="/">
          Home
        </Link>

        &gt;

        <Link href="/blog">
          Blog
        </Link>

        &gt;

        <span className="bd-active">
          {blog.category}
        </span>

      </div>

      <div className="bd-container">

        {/* LEFT - Main Content */}

        <div className="bd-main">

          <p className="bd-category-tag">
            Welcome to our Blog
          </p>

          <h1>
            {blog.title}
          </h1>

          <p className="bd-meta">
            {blog.date} &nbsp;|&nbsp; {blog.readingTime} min read
          </p>

          {/* Big Image */}

          <div className="bd-hero-img">

            {blog.image?.src && (
              <img
                src={blog.image.src}
                alt={blog.title}
              />
            )}

          </div>

          {/* Content */}

          <div
            className="bd-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

        </div>

        {/* RIGHT - Sidebar */}

        <div className="bd-sidebar">

          {/* Search */}

          <div className="bd-sidebar-box">

            <h4>
              Search
            </h4>

            <input
              type="search"
              className="bd-search"
              placeholder="Search blogs..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch}
              aria-label="Search blogs"
            />

          </div>

          {/* Categories */}

          <div className="bd-sidebar-box">

            <h4>
              Categories
            </h4>

            <ul>

              {categories.map((category) => (
                <li key={category.slug || category.id}>
                  <Link href={category.courseSlug ? `/courses/${category.courseSlug}/` : `/blog?category=${encodeURIComponent(category.slug || category.name)}`}>
                    ✦ {category.name}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          {/* Recent Posts */}

          <div className="bd-sidebar-box">

            <h4>
              Recent Posts
            </h4>

            {relatedBlogs.map((item) => (
              <Link href={`/blog/${item.id}`} className="bd-recent-post" key={item.id}>

                {item.image?.src && (
                  <img
                    src={item.image.src}
                    alt={item.title}
                  />
                )}

                <p>
                  {item.title}
                </p>

              </Link>

            ))}

          </div>

        </div>

      </div>

      <div className="bd-ctaa">

        <h3>
          Recommend The Best Learning Path Tailored To Your Needs
        </h3>

        <p>
          Discuss your career goal with experienced trainers for clarity.
        </p>

        <button onClick={() => openPopup()}>
          Book Free Consultation
        </button>

      </div>

    </div>

  );
};

export default BlogDetail;
