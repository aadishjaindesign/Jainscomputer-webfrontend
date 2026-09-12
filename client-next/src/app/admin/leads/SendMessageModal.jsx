"use client";

import { useState } from "react";
import "./SendMessageModal.css";
import { createMessageActivity } from "@/services/activityService";

const STAFF_MEMBERS = [
  "Sanmati Jain",
  "Aadish Jain",
  "Neha",
  "Khushi Soni",
];

const MESSAGE_TEMPLATES = {
  general:
    "Hi {leadName},\n\nThis is {staffName} from Jains Computer. I'm reaching out regarding your inquiry about {course}.\n\nPlease feel free to reach out if you have any questions.\n\nThanks!",
  followUp:
    "Hi {leadName},\n\nThis is {staffName} from Jains Computer. I wanted to follow up on our conversation regarding {course}.\n\nWould you like to visit our institute for a demo?\n\nThanks!",
  visit:
    "Hi {leadName},\n\nThis is {staffName} from Jains Computer. Just a reminder about your upcoming visit to our institute.\n\nWe look forward to meeting you!\n\nAddress: [Institute Address]",
};

const SendMessageModal = ({ lead, onClose, onSave }) => {
  const [staffName, setStaffName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [sending, setSending] = useState(false);

  const fillTemplate = (templateKey) => {
    setSelectedTemplate(templateKey);
    const template = MESSAGE_TEMPLATES[templateKey];
    if (template) {
      setMessage(
        template
          .replace(/{leadName}/g, lead.name)
          .replace(/{staffName}/g, staffName || "[Staff Name]")
          .replace(/{course}/g, lead.course || "the course")
      );
    }
  };

  const handleSend = async () => {
    if (!message.trim() || !staffName) return;
    setSending(true);
    try {
      const encoded = encodeURIComponent(message.trim());
      window.open(`https://wa.me/91${lead.phone}?text=${encoded}`, "_blank");
      await createMessageActivity(lead._id, lead.name, staffName, message.trim());
      if (onSave) onSave();
      onClose();
    } catch (err) {
      console.log("Failed to log message activity:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="smm-overlay" onClick={onClose}>
      <div className="smm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="smm-header">
          <div className="smm-header-left">
            <span className="smm-header-icon">💬</span>
            <div>
              <h3 className="smm-title">Send Message</h3>
              <p className="smm-subtitle">
                To: {lead.name} — {lead.phone}
              </p>
            </div>
          </div>
          <button className="smm-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="smm-body">
          <div className="smm-field">
            <label className="smm-label">
              Send as <span className="smm-required">*</span>
            </label>
            <select
              value={staffName}
              onChange={(e) => {
                setStaffName(e.target.value);
                if (selectedTemplate) fillTemplate(selectedTemplate);
              }}
              className="smm-select"
            >
              <option value="">— Select Staff —</option>
              {STAFF_MEMBERS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="smm-field">
            <label className="smm-label">Quick Templates</label>
            <div className="smm-templates">
              <button
                type="button"
                className={`smm-template-btn ${selectedTemplate === "general" ? "active" : ""}`}
                onClick={() => fillTemplate("general")}
                disabled={!staffName}
              >
                General
              </button>
              <button
                type="button"
                className={`smm-template-btn ${selectedTemplate === "followUp" ? "active" : ""}`}
                onClick={() => fillTemplate("followUp")}
                disabled={!staffName}
              >
                Follow Up
              </button>
              <button
                type="button"
                className={`smm-template-btn ${selectedTemplate === "visit" ? "active" : ""}`}
                onClick={() => fillTemplate("visit")}
                disabled={!staffName}
              >
                Visit Reminder
              </button>
            </div>
          </div>

          <div className="smm-field">
            <label className="smm-label">
              Message <span className="smm-required">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setSelectedTemplate("");
              }}
              className="smm-textarea"
              rows={8}
              placeholder="Type your message here..."
            />
          </div>

          {message && (
            <div className="smm-preview">
              <span className="smm-preview-label">Preview:</span>
              <p className="smm-preview-text">
                {message}
              </p>
            </div>
          )}

          <div className="smm-actions">
            <button className="smm-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className="smm-send"
              onClick={handleSend}
              disabled={!message.trim() || !staffName || sending}
            >
              <span>📤</span>
              {sending ? "Logging..." : "Send via WhatsApp"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendMessageModal;
