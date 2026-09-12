"use client";

import { useState } from "react";

import "./Settings.css";

import "../dashboard/AdminDashboard.css";

import { useRouter } from "next/navigation";

const Settings = () => {

  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const handleLogout = () => {

    localStorage.removeItem("token");

    router.push("/admin/login");
  };

  const updatePassword = async () => {

    if (!oldPassword || !newPassword) {

      setMessage({
        text: "Please fill in both fields",
        type: "error",
      });

      return;
    }

    if (newPassword.length < 6) {

      setMessage({
        text: "New password must be at least 6 characters",
        type: "error",
      });

      return;
    }

    const token = localStorage.getItem("token");

    try {

      setLoading(true);

      setMessage({
        text: "",
        type: "",
      });

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/update-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        setMessage({
          text: data.message || "Something went wrong",
          type: "error",
        });

        return;
      }

      setMessage({
        text: "Password updated successfully ✅",
        type: "success",
      });

      setOldPassword("");

      setNewPassword("");

    } catch {

      setMessage({
        text: "Server error ❌",
        type: "error",
      });

    } finally {

      setLoading(false);

    }
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
      <aside
        className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}
      >

        <div className="sidebar-brand">

          <div className="brand-logo">
            J
          </div>

          <div>
            <h2>Jains</h2>
            <span>Computer</span>
          </div>

          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>

        </div>

        <nav className="sidebar-nav">

          <a
            href="/admin/dashboard"
            className="nav-item"
            onClick={() => setSidebarOpen(false)}
          >
            <span>📊</span>
            <span>Dashboard</span>
          </a>

          <a
            href="/admin/settings"
            className="nav-item active"
            onClick={() => setSidebarOpen(false)}
          >
            <span>⚙️</span>
            <span>Settings</span>
          </a>

        </nav>

        <button
          className="sidebar-logout"
          onClick={handleLogout}
        >
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

          <h1>Settings</h1>

          <button
            className="topbar-logout"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

        {/* DESKTOP HEADER */}
        <div className="main-header">

          <div>
            <h1>Settings</h1>
            <p>Manage your account settings</p>
          </div>

        </div>

        <div className="settings-card">

          <h3>
            🔒 Change Password
          </h3>

          <p>
            Update your admin password
          </p>

          <div className="settings-form">

            <div className="field-group">

              <label>
                Old Password
              </label>

              <input
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(e) => {

                  setOldPassword(e.target.value);

                  setMessage({
                    text: "",
                    type: "",
                  });
                }}
              />

            </div>

            <div className="field-group">

              <label>
                New Password
              </label>

              <input
                type="password"
                placeholder="Enter new password (min 6 characters)"
                value={newPassword}
                onChange={(e) => {

                  setNewPassword(e.target.value);

                  setMessage({
                    text: "",
                    type: "",
                  });
                }}
              />

            </div>

            {message.text && (

              <p
                className={`settings-msg ${
                  message.type === "error"
                    ? "msg-error"
                    : "msg-success"
                }`}
              >
                {message.text}
              </p>

            )}

            <button
              className="update-btn"
              onClick={updatePassword}
              disabled={loading}
            >

              {loading
                ? "Updating..."
                : "Update Password"}

            </button>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Settings;