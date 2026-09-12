"use client";

import { useState } from "react";

import LeadsTable from "../leads/LeadsTable";
import CertificateAdd from "./CertificateAdd";
import CertificateTable from "./CertificateTable";
import DashboardHome from "./DashboardHome";
import Settings from "../settings/Settings";
import Image from "next/image";
import logo from "@/assets/logo/Logo.svg";

import "./AdminDashboard.css";

import { useRouter } from "next/navigation";

const AdminDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const navItems = [
    { key: "dashboard", icon: "📊", label: "Dashboard" },
    { key: "add-certificate", icon: "🎓", label: "Add Certificate" },
    { key: "all-certificates", icon: "📋", label: "All Certificates" },
    { key: "leads", icon: "👥", label: "Leads" },
    { key: "settings", icon: "⚙️", label: "Settings" },
  ];

  const sectionTitle = {
    "dashboard": { title: "Dashboard", sub: "Overview of your admin panel" },
    "add-certificate": { title: "Add Certificate", sub: "Add new student certificate" },
    "all-certificates": { title: "All Certificates", sub: "View and manage all certificates" },
    "leads": { title: "Leads", sub: "Manage all your leads" },
    "settings": { title: "Settings", sub: "Admin settings" },
  };

  const handleNav = (key) => {
    setActiveSection(key);
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>

        <div className="sidebar-brand">

          <div className="sidebar-logo">
            <Image
              src={logo}
              alt="Jains Computer Logo"
              fill
              priority
              className="sidebar-logo-img"
            />
          </div>

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>

        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`nav-item ${activeSection === item.key ? "active" : ""}`}
              onClick={() => handleNav(item.key)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <span>🚪</span>
          <span>Logout</span>
        </button>

      </aside>

      {/* MAIN */}
      <main className="admin-main">

        {/* MOBILE TOPBAR */}
        <div className="admin-topbar">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1>{sectionTitle[activeSection]?.title}</h1>
          <button className="topbar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* DESKTOP HEADER */}
        {/* <div className="main-header">
          <div>
            <h1>{sectionTitle[activeSection]?.title}</h1>
            <p>{sectionTitle[activeSection]?.sub}</p>
          </div>
        </div> */}

        {/* SECTIONS */}
        {activeSection === "dashboard" && (
          <DashboardHome />
        )}

        {activeSection === "add-certificate" && (
          <CertificateAdd />
        )}

        {activeSection === "all-certificates" && (
          <CertificateTable />
        )}

        {activeSection === "leads" && (
          <LeadsTable />
        )}

        {activeSection === "settings" && (
          <Settings />
        )}

      </main>

    </div>
  );
};

export default AdminDashboard;