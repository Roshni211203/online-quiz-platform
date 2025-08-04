import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "", email: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await api.post("register/", { ...form, role });
      setSuccess("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <div className="quizqueen-step-card" style={{ maxWidth: 420, width: "100%" }}>
          <h2 className="mb-4 quizqueen-title text-center">
            <span className="brand-gradient">Register</span>
          </h2>
          {/* Toggle Button
          <div className="d-flex justify-content-center mb-3 gap-2">
            <button
              type="button"
              className={`btn ${role === "student" ? "btn-quizqueen-main" : "btn-outline-quizqueen"}`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
            <button
              type="button"
              className={`btn ${role === "admin" ? "btn-quizqueen-main" : "btn-outline-quizqueen"}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div> */}
          {error && <div className="alert alert-danger py-1">{error}</div>}
          {success && <div className="alert alert-success py-1">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                name="username"
                className="form-control"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-quizqueen-main w-100">
              Register
            </button>
          </form>
          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;