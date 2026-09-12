"use client";

import { useEffect, useState } from "react";
import "./StaffDetails.css";
import { getActivitiesByStaff } from "@/services/activityService";
import { useRouter } from "next/navigation";

const STAFF_COLORS = {
  "Sanmate Jain": "#E31C1C",
  "Aadish Jain": "#0284c7",
  "Neha": "#8b5cf6",
  "Khushi Soni": "#16a34a",
};

const CALL_STATUS_COLORS = {
  "Connected": { bg: "#dcfce7", color: "#16a34a" },
  "Not Answered": { bg: "#fff8e1", color: "#f59e0b" },
  "Switched Off": { bg: "#fee2e2", color: "#dc2626" },
  "Busy": { bg: "#fff3e0", color: "#f97316" },
  "Follow Up Required": { bg: "#e0f2fe", color: "#0284c7" },
  "Interested": { bg: "#dcfce7", color: "#16a34a" },
  "Not Interested": { bg: "#fee2e2", color: "#dc2626" },
  "Joined": { bg: "#f3e8ff", color: "#8b5cf6" },
  "Wrong Number": { bg: "#f3f4f6", color: "#6b7280" },
};

const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

const formatDateTime = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

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
  return formatDateTime(dateStr);
};

const StaffDetails = ({ staff, onClose }) => {
  const router = useRouter();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [leadNameMap, setLeadNameMap] = useState({});

  useEffect(() => {
    fetchRecentActivities();
    fetchLeadsMap();
  }, []);

  const fetchLeadsMap = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/leads`,
        { headers: { Authorization: token } }
      );
      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      const leads = data.data || [];
      const map = {};
      leads.forEach((l) => {
        if (l._id) map[l._id] = l.name;
      });
      setLeadNameMap(map);
    } catch (err) {
      console.log("Failed to fetch leads for name map:", err);
    }
  };

  const getLeadName = (activity) => {
    if (activity.leadName) return activity.leadName;
    if (activity.leadId && leadNameMap[activity.leadId]) return leadNameMap[activity.leadId];
    return "Lead";
  };

  const fetchRecentActivities = async () => {
    try {
      setLoading(true);
      const data = await getActivitiesByStaff(staff.staffName, 20);
      setActivities(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const totalLeads = staff.handledLeads || 0;
  const totalCalls = staff.totalCalls || 0;
  const connected = staff.connected || 0;
  const interested = staff.interested || 0;
  const notInterested = staff.notInterested || 0;
  const followUps = staff.followUps || 0;
  const joined = staff.joined || 0;
  const pending = staff.pending || 0;
  const conversionRate =
    totalLeads > 0
      ? ((joined / totalLeads) * 100).toFixed(1)
      : "0.0";

  const color = STAFF_COLORS[staff.staffName] || "#666";
  const initial = getInitial(staff.staffName);

  return (
    <div className="sd-overlay" onClick={onClose}>
      <div className="sd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sd-header">
          <div className="sd-header-left">
            <div className="sd-avatar" style={{ background: color }}>
              {initial}
            </div>
            <div>
              <h2 className="sd-name">{staff.staffName}</h2>
              <span className="sd-subtitle">Staff Performance Report</span>
            </div>
          </div>
          <button className="sd-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="sd-body">
          {/* Stats Grid */}
          <div className="sd-stats-grid">
            <div className="sd-stat-card sd-stat-card--primary">
              <span className="sd-stat-value">{totalLeads}</span>
              <span className="sd-stat-label">Total Leads Handled</span>
            </div>
            <div className="sd-stat-card sd-stat-card--green">
              <span className="sd-stat-value">{connected}</span>
              <span className="sd-stat-label">Connected</span>
            </div>
            <div className="sd-stat-card sd-stat-card--emerald">
              <span className="sd-stat-value">{interested}</span>
              <span className="sd-stat-label">Interested</span>
            </div>
            <div className="sd-stat-card sd-stat-card--red">
              <span className="sd-stat-value">{notInterested}</span>
              <span className="sd-stat-label">Not Interested</span>
            </div>
            <div className="sd-stat-card sd-stat-card--blue">
              <span className="sd-stat-value">{followUps}</span>
              <span className="sd-stat-label">Follow Ups</span>
            </div>
            <div className="sd-stat-card sd-stat-card--purple">
              <span className="sd-stat-value">{joined}</span>
              <span className="sd-stat-label">Joined</span>
            </div>
            <div className="sd-stat-card sd-stat-card--amber">
              <span className="sd-stat-value">{pending}</span>
              <span className="sd-stat-label">Pending</span>
            </div>
            <div className="sd-stat-card sd-stat-card--primary">
              <span className="sd-stat-value">{conversionRate}%</span>
              <span className="sd-stat-label">Conversion Rate</span>
            </div>
          </div>

          {/* Last Activity */}
          <div className="sd-last-activity">
            <strong>Last Activity:</strong>{" "}
            {timeAgo(staff.lastActivity)}
          </div>

          {/* Recent Activities */}
          <h3 className="sd-recent-title">Recent Activities</h3>

          {loading ? (
            <div className="sd-loading">
              <div className="sd-spinner"></div>
              <p>Loading activities...</p>
            </div>
          ) : activities.length === 0 ? (
            <div className="sd-empty">
              <span>📋</span>
              <p>No recent activities found.</p>
            </div>
          ) : (
            <div className="sd-activity-list">
              {activities.slice(0, 10).map((act, idx) => {
                const sc = CALL_STATUS_COLORS[act.callStatus] || {
                  bg: "#f5f5f5",
                  color: "#666",
                };
                return (
                  <div key={act._id || act.id || idx} className="sd-activity-item">
                    <div className="sd-activity-head">
                      <span className="sd-activity-lead">
                        {getLeadName(act)}
                      </span>
                      <span className="sd-activity-time">
                        {formatDateTime(act.createdAt)}
                      </span>
                    </div>
                    <span
                      className="sd-activity-status"
                      style={{
                        background: sc.bg,
                        color: sc.color,
                      }}
                    >
                      {act.callStatus}
                    </span>
                    <p className="sd-activity-notes">{act.notes}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
