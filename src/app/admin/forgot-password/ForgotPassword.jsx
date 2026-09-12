"use client";

import { useState } from "react";

import "../login/Login.css";

import { useRouter } from "next/navigation";

const ForgotPassword = () => {

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const router = useRouter();

  // STEP 1 — Email submit
  const handleSendOtp = async () => {

    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {

      setLoading(true);

      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setStep(2);

      setSuccess("OTP sent to your email!");

    } catch {

      setError("Server error ❌");

    } finally {

      setLoading(false);

    }
  };

  // STEP 2 — OTP + New Password submit
  const handleResetPassword = async () => {

    if (!otp || !newPassword) {
      setError("Please fill all fields");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {

      setLoading(true);

      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      setSuccess("Password reset successfully! Redirecting...");

      setTimeout(() => {
        router.push("/admin/login");
      }, 2000);

    } catch {

      setError("Server error ❌");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">

          

          <h1>Jains Computer</h1>

          <p>
            {step === 1 ? "Forgot Password" : "Enter OTP"}
          </p>

        </div>

        {success && (
          <p
            style={{
              background: "#dcfce7",
              color: "#16a34a",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            {success}
          </p>
        )}

        {error && (
          <p className="login-error">
            ⚠ {error}
          </p>
        )}

        {step === 1 && (

          <div className="login-form">

            <div className="field-group">

              <label>Admin Email</label>

              <input
                type="email"
                placeholder="Enter your admin email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />

            </div>

            <button
              className="login-btn"
              onClick={handleSendOtp}
              disabled={loading}
            >

              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Sending...
                </span>
              ) : (
                "Send OTP →"
              )}

            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "#888",
              }}
            >

              <a
                href="/admin/login"
                style={{
                  color: "#E31C1C",
                  textDecoration: "none",
                }}
              >
                ← Back to Login
              </a>

            </p>

          </div>
        )}

        {step === 2 && (

          <div className="login-form">

            <div className="field-group">

              <label>OTP (Check your email)</label>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                maxLength={6}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setError("");
                }}
              />

            </div>

            <div className="field-group">

              <label>New Password</label>

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setError("");
                }}
              />

            </div>

            <button
              className="login-btn"
              onClick={handleResetPassword}
              disabled={loading}
            >

              {loading ? (
                <span className="btn-loading">
                  <span className="spinner"></span>
                  Resetting...
                </span>
              ) : (
                "Reset Password →"
              )}

            </button>

            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "#888",
              }}
            >

              <a
                href="/admin/login"
                style={{
                  color: "#E31C1C",
                  textDecoration: "none",
                }}
              >
                ← Back to Login
              </a>

            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default ForgotPassword;