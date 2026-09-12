"use client";

import { useEffect, useState } from "react";

import "./CertificateAdd.css";

const CertificateTable = () => {

    const [certificates, setCertificates] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [search, setSearch] = useState("");

    const getCertificates = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/certificates`
            );
            const data = await res.json();
            setCertificates(data.data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCertificates();
    }, []);

    const deleteCertificate = async (id) => {
        const confirmDelete = confirm("Delete certificate?");
        if (!confirmDelete) return;
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/certificates/${id}`,
                { method: "DELETE" }
            );
            getCertificates();
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditSave = async () => {
        if (!editItem) return;
        try {
            setEditLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/certificates/${editItem._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                    body: JSON.stringify(editItem),
                }
            );
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || "Update failed");
                return;
            }
            alert("Certificate Updated ✅");
            setEditItem(null);
            getCertificates();
        } catch (error) {
            console.log(error);
            alert("Server Error ❌");
        } finally {
            setEditLoading(false);
        }
    };

    const filtered = certificates.filter((c) =>
        c.enrollmentNumber?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="certificate-table-wrap">

            <h3>📋 Certificate Records</h3>

            {/* SEARCH */}
            <div className="cert-search-wrap">
                <input
                    type="text"
                    className="cert-search-input"
                    placeholder="🔍 Search by Enrollment Number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="certificate-table-scroll">
                <table className="certificate-table">
                    <thead>
                        <tr>
                            <th>Student</th>
                            <th>Enrollment</th>
                            <th>Course</th>
                            <th>Course Issue Date</th>
                            <th>Duration</th>
                            <th>Internship</th>
                            <th>Internship Duration</th>
                            <th>Issue Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan="9" style={{ textAlign: "center", padding: "20px", color: "#888" }}>
                                    No records found
                                </td>
                            </tr>
                        ) : (
                            filtered.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.studentName}</td>
                                    <td>{item.enrollmentNumber}</td>
                                    <td>{item.course}</td>
                                    <td>{item.courseIssueDate}</td>
                                    <td>{item.duration}</td>
                                    <td>{item.internship}</td>
                                    <td>{item.internshipDuration || "-"}</td>
                                    <td>{item.issueDate}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button
                                                className="edit-btn"
                                                onClick={() => setEditItem({ ...item })}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => deleteCertificate(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* EDIT MODAL */}
            {editItem && (
                <div className="edit-modal-overlay" onClick={() => setEditItem(null)}>
                    <div className="edit-modal" onClick={(e) => e.stopPropagation()}>

                        <h3>✏️ Edit Certificate</h3>

                        <div className="edit-modal-form">

                            <div className="field-group">
                                <label>Student Name</label>
                                <input
                                    type="text"
                                    value={editItem.studentName}
                                    onChange={(e) => setEditItem({ ...editItem, studentName: e.target.value })}
                                />
                            </div>


                            <div className="field-group">
                                <label>Enrollment Number</label>
                                <input
                                    type="text"
                                    value={editItem.enrollmentNumber}
                                    onChange={(e) => setEditItem({ ...editItem, enrollmentNumber: e.target.value })}
                                />
                            </div>

                            <div className="field-group">
                                <label>Course</label>
                                <input
                                    type="text"
                                    value={editItem.course}
                                    onChange={(e) => setEditItem({ ...editItem, course: e.target.value })}
                                />
                            </div>

                            <div className="field-group">
                                <label>Course Issue Date</label>
                                <input
                                    type="text"
                                    value={editItem.courseIssueDate}
                                    onChange={(e) => setEditItem({ ...editItem, courseIssueDate: e.target.value })}
                                />
                            </div>

                            <div className="field-group">
                                <label>Duration</label>
                                <input
                                    type="text"
                                    value={editItem.duration}
                                    onChange={(e) => setEditItem({ ...editItem, duration: e.target.value })}
                                />
                            </div>

                            <div className="field-group">
                                <label>Internship</label>
                                <select
                                    value={editItem.internship}
                                    onChange={(e) => setEditItem({ ...editItem, internship: e.target.value })}
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            <div className="field-group">
                                <label>Internship Duration</label>
                                <input
                                    type="text"
                                    value={editItem.internshipDuration || ""}
                                    onChange={(e) => setEditItem({ ...editItem, internshipDuration: e.target.value })}
                                />
                            </div>

                            <div className="field-group">
                                <label>Issue Date</label>
                                <input
                                    type="text"
                                    value={editItem.issueDate}
                                    onChange={(e) => setEditItem({ ...editItem, issueDate: e.target.value })}
                                />
                            </div>

                        </div>

                        <div className="edit-modal-actions">
                            <button className="edit-btn" onClick={handleEditSave} disabled={editLoading}>
                                {editLoading ? "Saving..." : "Save Changes"}
                            </button>
                            <button className="delete-btn" onClick={() => setEditItem(null)}>
                                Cancel
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default CertificateTable;