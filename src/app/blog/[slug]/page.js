// src/app/blog/[slug]/page.js

import BlogDetail from "@/sections/Blog/BlogDetail";
import { blogs } from "@/data/blogsData";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = blogs.find((b) => b.id === slug);

  if (!blog) {
    return { title: "Blog Not Found | Jains Computer" };
  }

  return {
    title: `${blog.title} | Jains Computer`,
    description: blog.desc,
    alternates: {
      canonical: `https://jainscomputer.com/blog/${slug}/`,
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const blog = blogs.find((b) => b.id === slug);

  if (!blog) notFound();

  const relatedBlogs = blogs
    .filter((b) => b.id !== slug && b.category === blog.category)
    .slice(0, 3);

  return <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />;
}