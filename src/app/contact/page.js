import Contact from "@/sections/contact/Contact";
import { contactPageMetadata } from "@/lib/metadata";

// export const metadata = {

//   title:
//     "Contact Jains Computer Jaipur",

//   description:
//     "Get in touch with Jains Computer Jaipur for course admission, counseling and career guidance.",

//   alternates: {
//     canonical:
//       "https://jainscomputer.com/contact",
//   },

// };
export const metadata = contactPageMetadata;

export default function ContactPage() {
  return <Contact />;
}