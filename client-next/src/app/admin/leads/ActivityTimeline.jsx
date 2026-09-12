"use client";

import "./ActivityTimeline.css";

const STAFF_COLORS = {
  "Sanmate Jain": "#E31C1C",
  "Aadish Jain": "#0284c7",
  "Neha": "#8b5cf6",
  "Khushi Soni": "#16a34a",
};

const STATUS_COLORS = {
  "Connected": "#16a34a",
  "Not Answered": "#f59e0b",
  "Switched Off": "#dc2626",
  "Busy": "#f97316",
  "Follow Up Required": "#0284c7",
  "Interested": "#16a34a",
  "Not Interested": "#dc2626",
  "Joined": "#8b5cf6",
  "Wrong Number": "#6b7280",
  "Message Sent": "#25D366",
};

const getInitial = (name) => {
  return name ? name.charAt(0).toUpperCase() : "?";
};

const getStaffColor = (name) => {
  return STAFF_COLORS[name] || "#666";
};

const getStatusColor = (status) => {
  return STATUS_COLORS[status] || "#666";
};

const formatDateTime = (dateStr) => {
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

const formatDateOnly = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ActivityTimeline = ({
  activities,
  onEdit,
  onDelete,
  isAdmin = false,
}) => {
  if (!activities || activities.length === 0) {
    return (
      <div className="at-empty">
        <span>📋</span>
        <p>No activity recorded yet.</p>
      </div>
    );
  }

  const sorted = [...activities].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="at-timeline">
      {sorted.map((activity, idx) => {
        const initial = getInitial(activity.staffName);
        const color = getStaffColor(activity.staffName);
        const statusColor = getStatusColor(activity.callStatus);
        const isLast = idx === sorted.length - 1;

        return (
          <div
            key={activity._id || activity.id || idx}
            className={`at-card ${isLast ? "at-last" : ""}`}
          >
            <div className="at-connector">
              <div
                className="at-avatar"
                style={{ background: color }}
              >
                {initial}
              </div>
              {!isLast && <div className="at-line" />}
            </div>

            <div className="at-content">
              <div className="at-head">
                <span className="at-staff-name">
                  {activity.staffName}
                </span>
                <span className="at-time">
                  {formatDateTime(activity.createdAt)}
                </span>
              </div>

              <div className="at-status-row">
                <span className="at-label">Status:</span>
                <span
                  className="at-status-badge"
                  style={{
                    background: `${statusColor}18`,
                    color: statusColor,
                  }}
                >
                  {activity.callStatus}
                </span>
              </div>

              <p className="at-notes">{activity.notes}</p>

              {activity.followUpDate && (
                <div className="at-followup">
                  <span className="at-followup-icon">📅</span>
                  <span className="at-followup-label">
                    Visit Date: {formatDateOnly(activity.followUpDate)}
                  </span>
                </div>
              )}

              {isAdmin && (
                <div className="at-actions">
                  <button
                    className="at-edit-btn"
                    onClick={() => onEdit && onEdit(activity)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="at-delete-btn"
                    onClick={() => onDelete && onDelete(activity._id || activity.id)}
                    title="Delete"
                  >
                    🗑
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityTimeline;
