import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser }) {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // Remove role on logout
    setUser(null);
    navigate("/login");
  };

  const toggleTheme = () => {
    setDark((prev) => !prev);
    document.body.className = !dark ? "bg-dark text-light" : "";
  };

  // Check if user is admin
  const isAdmin = user && user.role === "admin";

  return (
    <nav
      className={`navbar navbar-expand-lg quizqueen-navbar shadow-sm ${dark ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}
      style={{ marginBottom: 20 }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <h3 className="brand-gradient m-0" style={{ fontWeight: 700, letterSpacing: "-1px" }}>
            Quiz Master
          </h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/categories">
                Quizzes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">
                Leaderboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/analytics">
                Analytics
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            {/* Admin-only links */}
            {isAdmin && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-danger" to="/addcategory">
                    Add Category
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-danger" to="/addquiz">
                    Add Quiz
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-danger" to="/addquestion">
                    Add Question
                  </Link>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <button
              className={`btn btn-theme-toggle ${dark ? "btn-light" : "btn-dark"}`}
              onClick={toggleTheme}
              title="Toggle dark/light mode"
            >
              {dark ? (
                <span role="img" aria-label="Light">
                  🌞
                </span>
              ) : (
                <span role="img" aria-label="Dark">
                  🌙
                </span>
              )}
            </button>
            {user ? (
              <>
                <span className="me-2 fw-semibold">Hi, {user.username}</span>
                <button className="btn btn-outline-danger btn-sm rounded-pill" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="btn btn-outline-primary btn-sm rounded-pill" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary btn-sm rounded-pill" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
                                                                                                                            