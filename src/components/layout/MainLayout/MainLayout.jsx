"use client";

import { usePathname } from "next/navigation";

import TopBar from "../TopBar/TopBar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import FloatingButtons from "../FloatingButtons/FloatingButtons";

import ConsultationPopup from "../../popup/ConsultationPopup";

export default function MainLayout({ children }) {

  const pathname = usePathname();

  const isAdmin =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/admin-login") ||
    pathname.startsWith("/admin-forgot-password");

  return (
    <>
      {!isAdmin && <TopBar />}
      {!isAdmin && <Navbar />}
      {!isAdmin && <ConsultationPopup />}

      {children}

      {!isAdmin && <FloatingButtons />}
      {!isAdmin && <Footer />}
    </>
  );
}