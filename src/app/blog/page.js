import Blog from "@/sections/Blog/Blog";

export const metadata = {

  title: "IT Career Tips & Course Guides | Jains Computer Blog",
  description: "Expert articles on Digital Marketing, AI, Programming, Graphic Design & career growth — written for Jaipur students. Stay ahead with Jains Computer's insights.",
  keywords: ["computer courses blog Jaipur", "IT career tips", "digital marketing articles", "AI learning Jaipur"],

  alternates: {
    canonical:
      "https://jainscomputer.com/blog/",
  },

};

export default function Page() {
  return <Blog />;
}