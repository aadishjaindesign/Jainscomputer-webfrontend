// src/app/blog/[slug]/page.js

import BlogDetail from "@/sections/Blog/BlogDetail";
import {
  getBlogBySlug,
  getAllBlogs,
  getRelatedBlogs,
} from "@/services/blogService";
import { buildBlogMetadata } from "@/lib/blogMetadata";
import { notFound } from "next/navigation";

export const revalidate = 60;

const FETCH_OPTIONS = { next: { revalidate: 60 } };

export async function generateStaticParams() {
  const all = await getAllBlogs();
  return all.map((blog) => ({
    slug: blog.slug || blog.id,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug, FETCH_OPTIONS);

  if (!blog) {
    return {
      title: "Blog Not Found | Jains Computer",
      robots: { index: false },
    };
  }

  return buildBlogMetadata(blog, slug);
}

export default async function Page({ params }) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug, FETCH_OPTIONS);

  if (!blog) notFound();

  const relatedBlogs = await getRelatedBlogs(blog, FETCH_OPTIONS);

  return <BlogDetail blog={blog} relatedBlogs={relatedBlogs} />;
}
