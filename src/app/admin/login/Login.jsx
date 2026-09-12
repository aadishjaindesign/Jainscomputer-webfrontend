"use client";

import { useState } from "react";

import "./Login.css";

import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/Icon/JC_Logo_without_text.svg";



const Login = () => {

  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async () => {

    if (!email || !password) {

      setError("Enter your Email and password ");

      return;
    }

    try {

      setLoading(true);

      setError("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {

        setError(data.message || "Login failed");

        return;
      }

      localStorage.setItem("token", data.token);

      router.push("/admin/dashboard");

    } catch (err) {

      console.log(err);

      setError("Server not connected");

    } finally {

      setLoading(false);

    }
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      handleLogin();
    }
  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">
  <div className="brand-icon">
    <Image
      src={logo}
      alt="Jains Computer Logo"
      fill
      priority
      className="logo-image"
    />
  </div>
</div>

        <div className="login-form">

          <div className="field-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your mail"
              value={email}
              onChange={(e) => {

                setEmail(e.target.value);

                setError("");
              }}
              onKeyDown={handleKeyDown}
              autoComplete="email"
            />

          </div>

          <div className="field-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {

                setPassword(e.target.value);

                setError("");
              }}
              onKeyDown={handleKeyDown}
              autoComplete="current-password"
            />

          </div>

          {error && (
            <p className="login-error">
              ⚠ {error}
            </p>
          )}

          <button
            className="login-btn"
            onClick={handleLogin}
            disabled={loading}
          >

            {loading ? (

              <span className="btn-loading">

                <span className="spinner"></span>

                Logging in...

              </span>

            ) : (

              "Login to Dashboard →"

            )}

          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "13px",
              marginTop: "8px",
            }}
          >

            <a
              href="/admin/forgot-password"
              style={{
                color: "#E31C1C",
                textDecoration: "none",
              }}
            >
              Forgot Password?
            </a>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;