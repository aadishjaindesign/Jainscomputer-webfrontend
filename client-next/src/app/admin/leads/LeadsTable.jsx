"use client";

import { useEffect, useState } from "react";
import "./LeadsTable.css";
import "./LeadActivityModal.css";
import { useRouter } from "next/navigation";
import LeadActivityModal from "./LeadActivityModal";
import SendMessageModal from "./SendMessageModal";
import ActivityTimeline from "./ActivityTimeline";
import {
  getActivitiesByLead,
  getStaffSummary,
  updateActivity,
  deleteActivity,
} from "@/services/activityService";

const STAFF_MEMBERS = [
  "Sanmati Jain",
  "Aadish Jain",
  "Neha",
  "Khushi Soni",
];

const timeAgo = (dateStr) => {
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

const LeadsTable = () => {
  const router = useRouter();
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Activity & Message state
  const [activityModalLead, setActivityModalLead] = useState(null);
  const [messageModalLead, setMessageModalLead] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [latestActivities, setLatestActivities] = useState({});
  const [staffSummaryLoading, setStaffSummaryLoading] = useState(false);
  const [staffLeadsMap, setStaffLeadsMap] = useState({});
  const [connectedLeads, setConnectedLeads] = useState({});

  // Edit state
  const [editingActivity, setEditingActivity] = useState(null);
  const [editForm, setEditForm] = useState({
    staffName: "",
    callStatus: "",
    notes: "",
    followUpDate: "",
  });
  const [editSaving, setEditSaving] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/leads`,
        {
          headers: { Authorization: token },
        }
      );
      if (res.status === 401) {
        localStorage.removeItem("token");
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setLeads(data.data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load leads ❌");
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffSummary = async () => {
    try {
      setStaffSummaryLoading(true);
      const summary = await getStaffSummary();
      const latestMap = {};
      const staffMap = {};
      const connected = {};
      (summary || []).forEach((item) => {
        if (item.leadId) {
          latestMap[item.leadId] = {
            staffName: item.staffName,
            callStatus: item.callStatus,
            createdAt: item.createdAt,
          };
          if (!staffMap[item.staffName]) {
            staffMap[item.staffName] = new Set();
          }
          staffMap[item.staffName].add(item.leadId);
          if (
            item.callStatus === "Connected" ||
            item.callStatus === "Message Sent"
          ) {
            if (!connected[item.leadId]) {
              connected[item.leadId] = { staff: new Set() };
            }
            connected[item.leadId].staff.add(item.staffName);
          }
        }
      });
      setLatestActivities(latestMap);
      const connectedMap = {};
      Object.entries(connected).forEach(([id, data]) => {
        connectedMap[id] = { staff: [...data.staff] };
      });
      setConnectedLeads(connectedMap);
      const staffLeads = {};
      Object.keys(staffMap).forEach((name) => {
        staffLeads[name] = [...staffMap[name]];
      });
      setStaffLeadsMap(staffLeads);
    } catch (err) {
      console.log("Staff summary fetch failed:", err);
    } finally {
      setStaffSummaryLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    if (leads.length > 0) {
      fetchStaffSummary();
    }
  }, [leads.length]);

  const fetchActivities = async (leadId) => {
    try {
      setActivitiesLoading(true);
      const data = await getActivitiesByLead(leadId);
      setActivities(data || []);
    } catch (err) {
      console.log("Failed to fetch activities:", err);
      setActivities([]);
    } finally {
      setActivitiesLoading(false);
    }
  };

  const handleActivitySaved = (activity) => {
    setActivities((prev) => [activity, ...prev]);
    setActivityModalLead(null);
    showToast("Activity saved successfully!");
    fetchStaffSummary();
  };

  const openLeadDetails = async (lead) => {
    setSelectedLead(lead);
    setActivities([]);
    fetchActivities(lead._id);
  };

  const closeLeadDetails = () => {
    setSelectedLead(null);
    setActivities([]);
    setEditingActivity(null);
  };

  // Filter logic
  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search) ||
      STAFF_MEMBERS.some(
        (s) =>
          s.toLowerCase().includes(search.toLowerCase()) &&
          staffLeadsMap[s]?.includes(lead._id)
      );

    const matchCourse =
      courseFilter === "" || lead.course === courseFilter;

    const matchStatus =
      statusFilter === "" ||
      (lead.status || "pending") === statusFilter;

    const latest = latestActivities[lead._id];
    const matchStaff =
      staffFilter === "" ||
      (latest && latest.staffName === staffFilter);

    return matchSearch && matchCourse && matchStatus && matchStaff;
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lead/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: token },
        }
      );
      fetchLeads();
      showToast("Lead deleted", "success");
    } catch (err) {
      alert("Delete failed ❌");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lead/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ status }),
        }
      );
      fetchLeads();
    } catch (err) {
      alert("Update failed ❌");
    }
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setEditForm({
      staffName: activity.staffName || "",
      callStatus: activity.callStatus || "",
      notes: activity.notes || "",
      followUpDate: activity.followUpDate
        ? new Date(activity.followUpDate).toISOString().split("T")[0]
        : "",
    });
  };

  const handleEditSave = async () => {
    if (!editForm.staffName || !editForm.callStatus || !editForm.notes.trim()) {
      showToast("Please fill in all required fields.", "error");
      return;
    }
    setEditSaving(true);
    try {
      const updated = await updateActivity(
        editingActivity._id || editingActivity.id,
        {
          staffName: editForm.staffName,
          callStatus: editForm.callStatus,
          notes: editForm.notes.trim(),
          followUpDate: editForm.followUpDate || null,
        }
      );
      setActivities((prev) =>
        prev.map((a) =>
          (a._id || a.id) === (editingActivity._id || editingActivity.id)
            ? { ...a, ...updated }
            : a
        )
      );
      setEditingActivity(null);
      showToast("Activity updated successfully!");
    } catch (err) {
      showToast("Failed to update activity", "error");
    } finally {
      setEditSaving(false);
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;
    try {
      await deleteActivity(activityId);
      setActivities((prev) =>
        prev.filter((a) => (a._id || a.id) !== activityId)
      );
      showToast("Activity deleted");
      fetchStaffSummary();
    } catch (err) {
      showToast("Failed to delete activity", "error");
    }
  };

  const statusBadge = (status) => {
    const map = {
      pending: { label: "Pending", cls: "badge-pending" },
      contacted: { label: "Contacted", cls: "badge-contacted" },
      converted: { label: "Converted", cls: "badge-converted" },
    };
    return map[status] || map["pending"];
  };

  const uniqueCourses = [
    ...new Set(leads.map((l) => l.course).filter(Boolean)),
  ];

  if (loading) {
    return (
      <div className="table-loading">
        <div className="loading-spinner"></div>
        <p>Loading leads...</p>
      </div>
    );
  }

  if (error) {
    return <p className="table-error">{error}</p>;
  }

  // Lead Detail View
  if (selectedLead) {
    return (
      <div className="leads-section">
        <button className="back-btn" onClick={closeLeadDetails}>
          ← Back to Leads
        </button>

        <div className="lead-detail-header">
          <div className="lead-detail-info">
            <h2 className="lead-detail-name">{selectedLead.name}</h2>
            <div className="lead-detail-meta">
              <span>📞 {selectedLead.phone}</span>
              {selectedLead.email && <span>✉️ {selectedLead.email}</span>}
              <span>📚 {selectedLead.course}</span>
              <span>📌 {selectedLead.source || "—"}</span>
              <span>
                🏷{" "}
                <span
                  className={`status-select ${statusBadge(selectedLead.status || "pending").cls}`}
                  style={{ padding: "2px 10px", borderRadius: "20px", fontSize: "12px" }}
                >
                  {statusBadge(selectedLead.status || "pending").label}
                </span>
              </span>
            </div>
            {selectedLead.message && (
              <p className="lead-detail-msg">{selectedLead.message}</p>
            )}
          </div>
          <button
            className="add-activity-btn"
            onClick={() => setActivityModalLead(selectedLead)}
          >
            + Add Activity
          </button>
        </div>

        {/* Connection Summary */}
        {activities.length > 0 && (
          <div className="lead-connection-summary">
            <h3 className="section-title">Connection Summary</h3>
            <div className="lcs-stats">
              <div className="lcs-stat">
                <span className="lcs-stat-num">
                  {activities.filter(a => a.callStatus === "Connected" || a.callStatus === "Message Sent").length}
                </span>
                <span className="lcs-stat-label">Connected</span>
              </div>
              <div className="lcs-stat">
                <span className="lcs-stat-num">
                  {[...new Set(activities.map(a => a.staffName))].length}
                </span>
                <span className="lcs-stat-label">Staff Engaged</span>
              </div>
              <div className="lcs-stat">
                <span className="lcs-stat-num">{activities.length}</span>
                <span className="lcs-stat-label">Total Activities</span>
              </div>
            </div>

            {/* Connected staff breakdown */}
            {(() => {
              const connected = activities.filter(
                a => a.callStatus === "Connected" || a.callStatus === "Message Sent"
              );
              if (connected.length === 0) return null;
              const staffConnections = {};
              connected.forEach(a => {
                if (!staffConnections[a.staffName]) {
                  staffConnections[a.staffName] = { count: 0, lastNote: a.notes, lastTime: a.createdAt };
                }
                staffConnections[a.staffName].count += 1;
                if (new Date(a.createdAt) > new Date(staffConnections[a.staffName].lastTime)) {
                  staffConnections[a.staffName].lastNote = a.notes;
                  staffConnections[a.staffName].lastTime = a.createdAt;
                }
              });
              return (
                <div className="lcs-staff-list">
                  {Object.entries(staffConnections).map(([name, data]) => (
                    <div key={name} className="lcs-staff-card">
                      <div className="lcs-staff-avatar" style={{
                        background: name === "Sanmate Jain" ? "#E31C1C" :
                          name === "Aadish Jain" ? "#0284c7" :
                          name === "Neha" ? "#8b5cf6" : "#16a34a"
                      }}>
                        {name.charAt(0)}
                      </div>
                      <div className="lcs-staff-info">
                        <span className="lcs-staff-name">{name}</span>
                        <span className="lcs-staff-count">{data.count} connection{data.count > 1 ? "s" : ""}</span>
                        <p className="lcs-staff-note">{data.lastNote}</p>
                        <span className="lcs-staff-time">
                          {new Date(data.lastTime).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        )}

        {/* Activity Timeline */}
        <div className="lead-activities-section">
          <h3 className="section-title">Activity Timeline</h3>
          {activitiesLoading ? (
            <div className="table-loading" style={{ padding: "40px" }}>
              <div className="loading-spinner"></div>
              <p>Loading activities...</p>
            </div>
          ) : (
            <ActivityTimeline
              activities={activities}
              isAdmin={true}
              onEdit={handleEditActivity}
              onDelete={handleDeleteActivity}
            />
          )}
        </div>

        {/* Edit Activity Modal */}
        {editingActivity && (
          <div className="lam-overlay" onClick={() => setEditingActivity(null)}>
            <div className="lam-modal" onClick={(e) => e.stopPropagation()}>
              <div className="lam-header">
                <h3>Edit Activity</h3>
                <button className="lam-close" onClick={() => setEditingActivity(null)}>✕</button>
              </div>
              <form
                className="lam-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditSave();
                }}
              >
                <div className="lam-field">
                  <label className="lam-label">Staff Member <span className="lam-required">*</span></label>
                  <select
                    className="lam-select"
                    value={editForm.staffName}
                    onChange={(e) => setEditForm({ ...editForm, staffName: e.target.value })}
                    required
                  >
                    <option value="">— Select Staff —</option>
                    {STAFF_MEMBERS.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <div className="lam-field">
                  <label className="lam-label">Call Status <span className="lam-required">*</span></label>
                  <select
                    className="lam-select"
                    value={editForm.callStatus}
                    onChange={(e) => setEditForm({ ...editForm, callStatus: e.target.value })}
                    required
                  >
                    <option value="">— Select Status —</option>
                    {["Connected", "Not Answered", "Switched Off", "Busy", "Follow Up Required", "Interested", "Not Interested", "Joined", "Wrong Number"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="lam-field">
                  <label className="lam-label">Call Notes <span className="lam-required">*</span></label>
                  <textarea
                    className="lam-textarea"
                    rows={4}
                    value={editForm.notes}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    required
                  />
                </div>
                <div className="lam-field">
                  <label className="lam-label">Follow-up Date <span className="lam-optional">(Optional)</span></label>
                  <input
                    type="date"
                    className="lam-date"
                    value={editForm.followUpDate}
                    onChange={(e) => setEditForm({ ...editForm, followUpDate: e.target.value })}
                  />
                </div>
                <div className="lam-actions">
                  <button type="button" className="lam-cancel" onClick={() => setEditingActivity(null)}>Cancel</button>
                  <button type="submit" className="lam-save" disabled={editSaving}>
                    {editSaving ? <> <span className="lam-spinner"></span>Saving...</> : "Update Activity"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Activity Modal */}
        {activityModalLead && (
          <LeadActivityModal
            lead={activityModalLead}
            onClose={() => setActivityModalLead(null)}
            onSave={handleActivitySaved}
          />
        )}

        {toast && (
          <div className={`lt-toast lt-toast--${toast.type}`}>
            {toast.type === "success" ? "✅" : "❌"} {toast.message}
          </div>
        )}
      </div>
    );
  }

  // Main Leads Table View
  return (
    <div className="leads-section">
      {/* STATS */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{leads.length}</span>
          <span className="stat-label">Total Leads</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">
            {leads.filter((l) => (l.status || "pending") === "pending").length}
          </span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card">
          <span className="stat-num">
            {leads.filter((l) => l.status === "contacted").length}
          </span>
          <span className="stat-label">Contacted</span>
        </div>
        <div className="stat-card stat-card--green">
          <span className="stat-num">
            {leads.filter((l) => l.status === "converted").length}
          </span>
          <span className="stat-label">Converted</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="controls-bar">
        <div className="search-box">
          <span className="search-icon"></span>
          <input
            type="text"
            placeholder="Search by name, phone or staff..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="clear-search" onClick={() => setSearch("")}>
              ×
            </button>
          )}
        </div>

        <div className="filters">
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option value="">All Courses</option>
            {uniqueCourses.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>

          <select
            value={staffFilter}
            onChange={(e) => setStaffFilter(e.target.value)}
          >
            <option value="">All Staff</option>
            {STAFF_MEMBERS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          <button className="refresh-btn" onClick={() => { fetchLeads(); fetchStaffSummary(); }}>
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* RESULT COUNT */}
      <p className="result-count">
        Showing {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""}
      </p>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="leads-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Message</th>
              <th>Course</th>
              <th>Source</th>
              <th>Status</th>
              <th>Latest Activity</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan="11" className="no-data">
                  <div className="empty-state">
                    <span>📭</span>
                    <p>No leads found</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead, index) => {
                const badge = statusBadge(lead.status || "pending");
                const latest = latestActivities[lead._id];

                return (
                  <tr key={lead._id}>
                    <td className="row-num">{index + 1}</td>
                    <td
                      className="lead-name lead-name-clickable"
                      onClick={() => openLeadDetails(lead)}
                    >
                      <span className="lead-name-wrap">
                        {lead.name}
                        {connectedLeads[lead._id] ? (
                          <span className="lead-staff-tooltip">
                            <span className="lst-staff">Connected</span>
                            <span className="lst-status">
                              by {connectedLeads[lead._id].staff.join(", ")}
                            </span>
                            {latest && (
                              <span className="lst-latest">
                                Latest: {latest.staffName} — {latest.callStatus}
                              </span>
                            )}
                          </span>
                        ) : latest ? (
                          <span className="lead-staff-tooltip">
                            <span className="lst-staff">{latest.staffName}</span>
                            <span className="lst-status">{latest.callStatus}</span>
                          </span>
                        ) : null}
                      </span>
                    </td>
                    <td>
                      <a href={`tel:${lead.phone}`} className="phone-link">
                        {lead.phone}
                      </a>
                    </td>
                    <td>{lead.email || "—"}</td>
                    <td
                      className="message-cell"
                      onClick={() => lead.message && setSelectedMessage(lead.message)}
                    >
                      {lead.message ? (
                        <span className="message-preview">{lead.message}</span>
                      ) : "—"}
                    </td>
                    <td>
                      <span className="course-pill">{lead.course}</span>
                    </td>
                    <td>
                      <span className="source-tag">{lead.source || "—"}</span>
                    </td>
                    <td>
                      <select
                        className={`status-select ${badge.cls}`}
                        value={lead.status || "pending"}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                      </select>
                    </td>
                    <td className="latest-activity-cell">
                      {connectedLeads[lead._id] ? (
                        <div className="latest-activity-info">
                          <span className="latest-connected-badge">Connected</span>
                          {latest && (
                            <>
                              <span className="latest-staff">{latest.staffName}</span>
                              <span className="latest-status">{latest.callStatus}</span>
                              <span className="latest-time">{timeAgo(latest.createdAt)}</span>
                            </>
                          )}
                        </div>
                      ) : latest ? (
                        <div className="latest-activity-info">
                          <span className="latest-staff">{latest.staffName}</span>
                          <span className="latest-status">{latest.callStatus}</span>
                          <span className="latest-time">{timeAgo(latest.createdAt)}</span>
                        </div>
                      ) : (
                        <span className="latest-none">—</span>
                      )}
                    </td>
                    <td className="date-cell">
                      {new Date(lead.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </td>
                    <td>
                      <div className="action-btns">
                        <button
                          className="activity-btn"
                          title="Log Activity"
                          onClick={() => setActivityModalLead(lead)}
                        >
                          📞
                        </button>
                        <button
                          className="wa-btn"
                          title="Send Message"
                          onClick={() => setMessageModalLead(lead)}
                        >
                          💬
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(lead._id)}
                          title="Delete"
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Message Modal */}
      {selectedMessage && (
        <div className="msg-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="msg-modal" onClick={(e) => e.stopPropagation()}>
            <div className="msg-modal-header">
              <h4>Message</h4>
              <button onClick={() => setSelectedMessage(null)}>✕</button>
            </div>
            <p className="msg-modal-body">{selectedMessage}</p>
          </div>
        </div>
      )}

      {/* Activity Modal (from table) */}
      {activityModalLead && (
        <LeadActivityModal
          lead={activityModalLead}
          onClose={() => setActivityModalLead(null)}
          onSave={(activity) => {
            showToast("Activity saved successfully!");
            setActivityModalLead(null);
            fetchStaffSummary();
          }}
        />
      )}

      {/* Send Message Modal */}
      {messageModalLead && (
        <SendMessageModal
          lead={messageModalLead}
          onClose={() => setMessageModalLead(null)}
          onSave={() => {
            showToast("Message sent & logged successfully!");
            fetchStaffSummary();
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`lt-toast lt-toast--${toast.type}`}>
          {toast.type === "success" ? "✅" : "❌"} {toast.message}
        </div>
      )}
    </div>
  );
};

export default LeadsTable;
