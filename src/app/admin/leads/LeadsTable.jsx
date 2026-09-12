"use client";

import { useEffect, useState } from "react";

import "./LeadsTable.css";

import { useRouter } from "next/navigation";

const LeadsTable = () => {

  const router = useRouter();

  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");

  const [courseFilter, setCourseFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchLeads = async () => {

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/leads`,
        {
          headers: {
            Authorization: token,
          },
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

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {

    const matchSearch =
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.phone.includes(search);

    const matchCourse =
      courseFilter === "" || lead.course === courseFilter;

    const matchStatus =
      statusFilter === "" ||
      (lead.status || "pending") === statusFilter;

    return matchSearch && matchCourse && matchStatus;
  });

  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this lead?")) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/lead/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        }
      );

      fetchLeads();

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

  const statusBadge = (status) => {

    const map = {
      pending: {
        label: "Pending",
        cls: "badge-pending",
      },
      contacted: {
        label: "Contacted",
        cls: "badge-contacted",
      },
      converted: {
        label: "Converted",
        cls: "badge-converted",
      },
    };

    return map[status] || map["pending"];
  };

  const uniqueCourses = [
    ...new Set(
      leads
        .map((l) => l.course)
        .filter(Boolean)
    ),
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
    return (
      <p className="table-error">
        {error}
      </p>
    );
  }

  return (

    <div className="leads-section">

      {/* STATS */}
      <div className="stats-row">

        <div className="stat-card">

          <span className="stat-num">
            {leads.length}
          </span>

          <span className="stat-label">
            Total Leads
          </span>

        </div>

        <div className="stat-card">

          <span className="stat-num">
            {
              leads.filter(
                (l) => (l.status || "pending") === "pending"
              ).length
            }
          </span>

          <span className="stat-label">
            Pending
          </span>

        </div>

        <div className="stat-card">

          <span className="stat-num">
            {
              leads.filter(
                (l) => l.status === "contacted"
              ).length
            }
          </span>

          <span className="stat-label">
            Contacted
          </span>

        </div>

        <div className="stat-card stat-card--green">

          <span className="stat-num">
            {
              leads.filter(
                (l) => l.status === "converted"
              ).length
            }
          </span>

          <span className="stat-label">
            Converted
          </span>

        </div>

      </div>

      {/* CONTROLS */}
      <div className="controls-bar">

        <div className="search-box">

          <span className="search-icon"></span>

          <input
            type="text"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              className="clear-search"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}

        </div>

        <div className="filters">

          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >

            <option value="">
              All Courses
            </option>

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

            <option value="">
              All Status
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="converted">
              Converted
            </option>

          </select>

          <button
            className="refresh-btn"
            onClick={fetchLeads}
          >
            ↻ Refresh
          </button>

        </div>

      </div>

      {/* RESULT COUNT */}
      <p className="result-count">

        Showing {filteredLeads.length} lead
        {filteredLeads.length !== 1 ? "s" : ""}

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

              <th>Date</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredLeads.length === 0 ? (

              <tr>

                <td colSpan="10" className="no-data">

                  <div className="empty-state">

                    <span>📭</span>

                    <p>No leads found</p>

                  </div>

                </td>

              </tr>

            ) : (

              filteredLeads.map((lead, index) => {

                const badge = statusBadge(
                  lead.status || "pending"
                );

                return (

                  <tr key={lead._id}>

                    <td className="row-num">
                      {index + 1}
                    </td>

                    <td className="lead-name">
                      {lead.name}
                    </td>

                    <td>

                      <a
                        href={`tel:${lead.phone}`}
                        className="phone-link"
                      >
                        {lead.phone}
                      </a>

                    </td>

                    <td>
                      {lead.email || "—"}
                    </td>

                  
                    <td
                      className="message-cell"
                      onClick={() => lead.message && setSelectedMessage(lead.message)}
                    >
                      {lead.message ? (
                        <span className="message-preview">{lead.message}</span>
                      ) : "—"}
                    </td>

                    <td>

                      <span className="course-pill">
                        {lead.course}
                      </span>

                    </td>

                    <td>

                      <span className="source-tag">
                        {lead.source || "—"}
                      </span>

                    </td>

                    <td>

                      <select
                        className={`status-select ${badge.cls}`}
                        value={lead.status || "pending"}
                        onChange={(e) =>
                          handleStatusChange(
                            lead._id,
                            e.target.value
                          )
                        }
                      >

                        <option value="pending">
                          Pending
                        </option>

                        <option value="contacted">
                          Contacted
                        </option>

                        <option value="converted">
                          Converted
                        </option>

                      </select>

                    </td>

                    <td className="date-cell">

                      {new Date(
                        lead.createdAt
                      ).toLocaleString(
                        "en-IN",
                        {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}

                    </td>

                    <td>

                      <div className="action-btns">

                        <button
                          className="wa-btn"
                          title="WhatsApp"
                          onClick={() =>
                            window.open(
                              `https://wa.me/91${lead.phone}`,
                              "_blank"
                            )
                          }
                        >
                          💬
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(lead._id)
                          }
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


    </div>
  );
};

export default LeadsTable;