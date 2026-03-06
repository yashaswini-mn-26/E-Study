import React, { useState } from "react";
import { BookOpen, Lock, Eye, EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../styles/Login.module.css";
import { API } from "../config/api";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // typed params
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing reset token.");
      return;
    }

    setMessage("");
    setError("");

    // Password validation
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters with 1 number and 1 special character."
      );
      return;
    }

    try {
      const response = await fetch(API.reset(token), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/Login"), 3000);
      } else {
        setError(data.msg || "Invalid or expired token.");
      }
    } catch (err) {
      setError("Server is not responding.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <nav className={styles.navbar}>
        <div
          className={styles.logo}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <BookOpen size={24} />
          <span>E-Study</span>
        </div>
      </nav>

      <main className={styles.mainContent}>
        <div
          className={styles.formWrapper}
          style={{ justifyContent: "center" }}
        >
          <div
            className={styles.formSection}
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <h2 className={styles.formTitle}>Create New Password</h2>

            <p style={{ color: "#666", marginBottom: "1.5rem" }}>
              Please enter your new strong password below.
            </p>

            {message && (
              <p
                style={{
                  color: "#7CA152",
                  background: "#f0f9eb",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              >
                {message}
              </p>
            )}

            {error && (
              <p
                style={{
                  color: "#ff4d4d",
                  background: "#fff5f5",
                  padding: "10px",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              >
                {error}
              </p>
            )}

            <form className={styles.loginForm} onSubmit={handleReset}>
              <div className={styles.inputGroup}>
                <label>New Password</label>

                <div className={styles.inputWrapper}>
                  <Lock className={styles.fieldIcon} size={20} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 chars, 1 num, 1 special"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div
                    className={styles.eyeIconWrapper}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </div>
                </div>
              </div>

              <button type="submit" className={styles.loginBtn}>
                Save New Password
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;