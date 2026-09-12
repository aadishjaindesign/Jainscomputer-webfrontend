"use client";

import { useState, useEffect } from "react";
import "./LeadActivityModal.css";
import {
  createActivity,
  getConnectedActivitiesByLead,
} from "@/services/activityService";

const STAFF_MEMBERS = [
  "Sanmate Jain",
  "Aadish Jain",
  "Neha",
  "Khushi Soni",
];

const CALL_STATUSES = [
  "Connected",
  "Not Answered",
  "Switched Off",
  "Busy",
  "Follow Up Required",
  "Interested",
  "Not Interested",
  "Joined",
  "Wrong Number",
];

const LeadActivityModal = ({ lead, onClose, onSave }) => {
  const [staffName, setStaffName] = useState("");
  const [callStatus, setCallStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [connectedActivities, setConnectedActivities] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const activities = await getConnectedActivitiesByLead(lead._id);
        setConnectedActivities(activities || []);
      } catch (err) {
        console.log("Failed to load connection history:", err);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, [lead._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!staffName) {
      setError("Please select a staff member.");
      return;
    }
    if (!callStatus) {
      setError("Please select a call status.");
      return;
    }
    if (!notes.trim()) {
      setError("Please enter call notes.");
      return;
    }

    setSaving(true);
    try {
      const activity = await createActivity(
        lead._id,
        lead.name,
        staffName,
        callStatus,
        notes,
        followUpDate
      );
      onSave(activity);
      resetForm();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setStaffName("");
    setCallStatus("");
    setNotes("");
    setFollowUpDate("");
  };

  return (
    <div className="lam-overlay" onClick={onClose}>
      <div className="lam-modal" onClick={(e) => e.stopPropagation()}>
        <div className="lam-header">
          <h3>
            Log Activity — {lead.name}
          </h3>
          <button className="lam-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {!loadingHistory && connectedActivities.length > 0 && (
          <div className="lam-connection-history">
            <div className="lam-ch-header">
              <span className="lam-ch-title">
                Previously Connected ({connectedActivities.length} time{connectedActivities.length > 1 ? "s" : ""})
              </span>
            </div>
            <div className="lam-ch-list">
              {connectedActivities.slice(0, 3).map((act) => (
                <div key={act._id || act.id} className="lam-ch-item">
                  <div className="lam-ch-item-head">
                    <strong>{act.staffName}</strong>
                    <span className="lam-ch-item-time">
                      {new Date(act.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="lam-ch-item-notes">{act.notes}</p>
                </div>
              ))}
              {connectedActivities.length > 3 && (
                <div className="lam-ch-more">
                  +{connectedActivities.length - 3} more connection{connectedActivities.length - 3 > 1 ? "s" : ""}
                </div>
              )}
            </div>
          </div>
        )}

        <form className="lam-form" onSubmit={handleSubmit}>
          <div className="lam-field">
            <label className="lam-label">
              Staff Member <span className="lam-required">*</span>
            </label>
            <select
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className="lam-select"
              required
            >
              <option value="">— Select Staff —</option>
              {STAFF_MEMBERS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="lam-field">
            <label className="lam-label">
              Call Status <span className="lam-required">*</span>
            </label>
            <select
              value={callStatus}
              onChange={(e) => setCallStatus(e.target.value)}
              className="lam-select"
              required
            >
              <option value="">— Select Status —</option>
              {CALL_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="lam-field">
            <label className="lam-label">
              Call Notes <span className="lam-required">*</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="lam-textarea"
              rows={4}
              placeholder="Lead is interested in the Video Editing course.&#10;Asked about fees.&#10;Will visit the institute next Tuesday.&#10;Needs to discuss with parents."
              required
            />
          </div>

          <div className="lam-field">
            <label className="lam-label">
              Follow-up / Visit Date <span className="lam-optional">(Optional)</span>
            </label>
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="lam-date"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          {error && <p className="lam-error">{error}</p>}

          <div className="lam-actions">
            <button
              type="button"
              className="lam-cancel"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="lam-save"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="lam-spinner"></span>
                  Saving...
                </>
              ) : (
                "Save Activity"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadActivityModal;
