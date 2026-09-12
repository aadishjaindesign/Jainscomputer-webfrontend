"use client";

import { useEffect, useState } from "react";
import "./StaffPerformance.css";
import { getStaffPerformance } from "@/services/activityService";

const STAFF_COLORS = {
  "Sanmate Jain": "#E31C1C",
  "Aadish Jain": "#0284c7",
  "Neha": "#8b5cf6",
  "Khushi Soni": "#16a34a",
};

const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

const timeAgo = (dateStr) => {
  if (!dateStr) return "—";
  const now = new Date();
  const d = new Date(dateStr);
  const diffMs = now - d;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs} hour${diffHrs > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHrs / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const StaffPerformance = ({ onSelectStaff }) => {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStaffPerformance();
  }, []);

  const fetchStaffPerformance = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getStaffPerformance();
      setStaffData(data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load staff performance ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="sp-loading">
        <div className="sp-spinner"></div>
        <p>Loading staff performance...</p>
      </div>
    );
  }

  if (error) {
    return <p className="sp-error">{error}</p>;
  }

  if (!staffData || staffData.length === 0) {
    return (
      <div className="sp-empty">
        <span>📊</span>
        <p>No staff performance data available yet.</p>
      </div>
    );
  }

  return (
    <div className="sp-section">
      <div className="sp-header">
        <h2 className="sp-title">Staff Performance</h2>
        <button className="sp-refresh" onClick={fetchStaffPerformance}>
          ↻ Refresh
        </button>
      </div>

      <div className="sp-grid">
        {staffData.map((staff) => {
          const color = STAFF_COLORS[staff.staffName] || "#666";
          const initial = getInitial(staff.staffName);

          return (
            <div
              key={staff.staffName}
              className="sp-card"
              onClick={() => onSelectStaff && onSelectStaff(staff)}
            >
              <div className="sp-card-top">
                <div className="sp-avatar" style={{ background: color }}>
                  {initial}
                </div>
                <div className="sp-card-info">
                  <h3 className="sp-card-name">{staff.staffName}</h3>
                  <span className="sp-card-last">
                    Last: {timeAgo(staff.lastActivity)}
                  </span>
                </div>
              </div>

              <div className="sp-stats-grid">
                <div className="sp-stat-item">
                  <span className="sp-stat-value">{staff.handledLeads || 0}</span>
                  <span className="sp-stat-label">Handled</span>
                </div>
                <div className="sp-stat-item">
                  <span className="sp-stat-value sp-stat-value--green">
                    {staff.interested || 0}
                  </span>
                  <span className="sp-stat-label">Interested</span>
                </div>
                <div className="sp-stat-item">
                  <span className="sp-stat-value sp-stat-value--blue">
                    {staff.followUps || 0}
                  </span>
                  <span className="sp-stat-label">Follow Ups</span>
                </div>
                <div className="sp-stat-item">
                  <span className="sp-stat-value sp-stat-value--purple">
                    {staff.joined || 0}
                  </span>
                  <span className="sp-stat-label">Joined</span>
                </div>
                <div className="sp-stat-item">
                  <span className="sp-stat-value sp-stat-value--orange">
                    {staff.totalCalls || 0}
                  </span>
                  <span className="sp-stat-label">Calls</span>
                </div>
                <div className="sp-stat-item">
                  <span className="sp-stat-value sp-stat-value--teal">
                    {staff.connected || 0}
                  </span>
                  <span className="sp-stat-label">Connected</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaffPerformance;
