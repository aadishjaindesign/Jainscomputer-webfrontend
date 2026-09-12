"use client";

import { useState } from "react";

import "./CertificateAdd.css";

const CertificateAdd = () => {

  const [studentName, setStudentName] =
    useState("");

  const [
    enrollmentNumber,
    setEnrollmentNumber,
  ] = useState("");

  const [course, setCourse] =
    useState("");

  const [
    courseIssueDate,
    setCourseIssueDate
  ] = useState("");

  const [duration, setDuration] =
    useState("");

  const [internship, setInternship] =
    useState("");

  const [
    internshipDuration,
    setInternshipDuration,
  ] = useState("");

  const [issueDate, setIssueDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleAddCertificate =
    async () => {

      if (
        !studentName ||
        !enrollmentNumber ||
        !course ||
        !courseIssueDate ||
        !duration ||
        !internship ||
        !issueDate
      ) {

        alert("Please fill all fields");


        return;
      }

      try {

        setLoading(true);

        const token =
          localStorage.getItem("token");
        console.log({
          studentName,
          enrollmentNumber,
          course,
          courseIssueDate,
          duration,
          internship,
          internshipDuration,
          issueDate,
        });

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/certificates`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization: token,
            },

            body: JSON.stringify({

              studentName,

              enrollmentNumber,

              course,

              courseIssueDate,

              duration,

              internship,

              internshipDuration,

              issueDate,

            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {

          alert(
            data.message ||
            "Something went wrong"
          );

          return;
        }

        alert(
          "Certificate Added Successfully ✅"
        );

        setStudentName("");

        setEnrollmentNumber("");

        setCourse("");

        setCourseIssueDate("");

        setDuration("");

        setInternship("");

        setInternshipDuration("");

        setIssueDate("");

      } catch (error) {

        console.log(error);

        alert("Server Error ❌");

      } finally {

        setLoading(false);

      }
    };

  return (

    <div className="certificate-admin-card">

      <h3>
        🎓 Add Certificate
      </h3>

      <p>
        Add new student certificate details
      </p>

      <div className="certificate-admin-form">

        <div className="field-group">

          <label>
            Student Name
          </label>

          <input
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) =>
              setStudentName(
                e.target.value
              )
            }
          />

        </div>

        


        <div className="field-group">

          <label>
            Enrollment Number
          </label>

          <input
            type="text"
            placeholder="RJ/2025/...."
            value={enrollmentNumber}
            onChange={(e) => {

              let value = e.target.value;

              // REMOVE RJ/
              value = value.replace("RJ/", "");

              // ONLY NUMBERS
              value = value.replace(/[^0-9]/g, "");

              // YEAR LIMIT 4
              let year = value.slice(0, 4);

              // ENROLLMENT LIMIT 4
              let enroll = value.slice(4, 8);

              let finalValue = "RJ/";

              if (year) {
                finalValue += year;
              }

              if (year.length === 4) {
                finalValue += "/";
              }

              if (enroll) {
                finalValue += enroll;
              }

              setEnrollmentNumber(finalValue);

            }}
          />

        </div>

        <div className="field-group">

          <label>
            Course
          </label>

          <input
            type="text"
            placeholder="Enter course"
            value={course}
            onChange={(e) =>
              setCourse(
                e.target.value
              )
            }
          />

        </div>

        <div className="field-group">

          <label>
            Course Issue Date
          </label>

          <input
            type="text"
            placeholder="12 March 2025"
            value={courseIssueDate}
            onChange={(e) =>
              setCourseIssueDate(
                e.target.value
              )
            }
          />

        </div>

        <div className="field-group">

          <label>
            Duration
          </label>

          <input
            type="text"
            placeholder="6 Months"
            value={duration}
            onChange={(e) =>
              setDuration(
                e.target.value
              )
            }
          />

        </div>

        <div className="field-group">

          <label>
            Internship
          </label>

          <select
            value={internship}
            onChange={(e) =>
              setInternship(
                e.target.value
              )
            }
          >

            <option value="">
              Select
            </option>

            <option value="Yes">
              Yes
            </option>

            <option value="No">
              No
            </option>

          </select>

        </div>

        <div className="field-group">

          <label>
            Internship Duration
          </label>

          <input
            type="text"
            placeholder="3 Months"
            value={internshipDuration}
            onChange={(e) =>
              setInternshipDuration(
                e.target.value
              )
            }
          />

        </div>

        <div className="field-group">

          <label>
            Issue Date
          </label>

          <input
            type="text"
            placeholder="01 Jan 2026"
            value={issueDate}
            onChange={(e) =>
              setIssueDate(
                e.target.value
              )
            }
          />

        </div>

        <button
          className="certificate-save-btn"
          onClick={
            handleAddCertificate
          }
          disabled={loading}
        >

          {loading
            ? "Saving..."
            : "Save Certificate"}

        </button>

      </div>

    </div>
  );
};

export default CertificateAdd;