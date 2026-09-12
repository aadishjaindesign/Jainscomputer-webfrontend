"use client";

// import { useParams } from "next/navigation";

import Link from "next/link";

// import { blogs } from "@/data/blogsData";

import "./BlogDetail.css";

import { usePopup } from "@/context/PopupContext";

const BlogDetail = ({ blog, relatedBlogs }) => {

  // const params = useParams();


  // const slug = Array.isArray(params.slug)
  //   ? params.slug[0]
  //   : params.slug;

  const { openPopup } = usePopup();

  // const blog = blogs.find((b) => b.id === slug);

  if (!blog)
    return (
      <div style={{ padding: "100px", textAlign: "center" }}>
        Blog not found
      </div>
    );

  // const related = blogs.filter((b) => b.id !== slug).slice(0, 3);

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
            {blog.date} &nbsp;|&nbsp; 5 min read
          </p>

          {/* Big Image */}

          <div className="bd-hero-img">

            <img
              src={blog.image.src}
              alt={blog.title}
            />

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



          {/* Categories */}

          <div className="bd-sidebar-box">

            <h4>
              Categories
            </h4>

            <ul>

              <li>
                <Link href="/courses/graphic-designing">
                  ✦ Graphic Design
                </Link>
              </li>

              <li>
                <Link href="/courses/digital-marketing">
                  ✦ Digital Marketing
                </Link>
              </li>

              <li>
                <Link href="/courses/video-editing">
                  ✦ Video Editing
                </Link>
              </li>

              <li>
                <Link href="/courses/artificial-intelligence">
                  ✦ Artificial Intelligence
                </Link>
              </li>

            </ul>

          </div>

          {/* Recent Posts */}

          <div className="bd-sidebar-box">

            <h4>
              Recent Posts
            </h4>

            {relatedBlogs.map((item) => (
              <Link href={`/blog/${item.id}`} className="bd-recent-post" key={item.id}>

                <img
                  src={item.image.src}
                  alt={item.title}
                />

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