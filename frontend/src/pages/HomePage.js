import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column justify-content-center">
        {/* Hero Section */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-3 fw-bold quizqueen-title mb-3">
              Welcome to <span className="brand-gradient">Quiz Master</span>
            </h1>
            <p className="lead mb-4 text-secondary" style={{ fontSize: "1.3rem" }}>
              Test your knowledge, challenge yourself, and climb the leaderboard!
            </p>
            <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center justify-content-lg-start">
              <button
                className="btn btn-quizqueen-main"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="btn btn-outline-quizqueen"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div>
          </div>
          <div className="col-lg-5 d-flex flex-column align-items-end justify-content-center mt-4 mt-lg-0">
            {/* Modern feature cards */}
            <div className="quizqueen-featurebox mb-4">
              <span className="featurebox-icon" role="img" aria-label="Leaderboard">🏅</span>
              <span>Leaderboard</span>
            </div>
            <div className="quizqueen-featurebox">
              <span className="featurebox-icon" role="img" aria-label="Analytics">🏆</span>
              <span>Analytics</span>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="row g-4 justify-content-center mb-5">
          <div className="col-md-4">
            <div className="quizqueen-step-card">
              <div className="quizqueen-step-icon">📚</div>
              <div className="quizqueen-step-title text-primary">Diverse Categories</div>
              <div className="quizqueen-step-desc">
                Choose from a wide range of quiz topics and levels.
              </div>
              <button
                className="btn btn-outline-quizqueen mt-3"
                onClick={() => navigate("/categories")}
              >
                Explore Categories
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="quizqueen-step-card">
              <div className="quizqueen-step-icon">🏆</div>
              <div className="quizqueen-step-title text-warning">Leaderboard</div>
              <div className="quizqueen-step-desc">
                Compete with others and see your rank on the leaderboard.
              </div>
              <button
                className="btn btn-outline-quizqueen mt-3"
                onClick={() => navigate("/leaderboard")}
              >
                View Leaderboard
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="quizqueen-step-card">
              <div className="quizqueen-step-icon">📊</div>
              <div className="quizqueen-step-title text-success">Your Analytics</div>
              <div className="quizqueen-step-desc">
                Track your quiz performance and improve your skills.
              </div>
              <button
                className="btn btn-outline-quizqueen mt-3"
                onClick={() => navigate("/analytics")}
              >
                My Analytics
              </button>
            </div>
          </div>
        </div>

        {/* About & Contact Section */}
        <div className="row g-4 justify-content-center mb-5">
          <div className="col-md-6">
            <div className="quizqueen-step-card">
              <div className="quizqueen-step-icon">ℹ️</div>
              <div className="quizqueen-step-title text-info">About Us</div>
              <div className="quizqueen-step-desc">
                Learn more about our mission and the team behind this platform.
              </div>
              <button
                className="btn btn-outline-quizqueen mt-3"
                onClick={() => navigate("/about")}
              >
                Read More
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="quizqueen-step-card">
              <div className="quizqueen-step-icon">📞</div>
              <div className="quizqueen-step-title text-danger">Contact Us</div>
              <div className="quizqueen-step-desc">
                Have questions or feedback? Reach out to us!
              </div>
              <button
                className="btn btn-outline-quizqueen mt-3"
                onClick={() => navigate("/contact")}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="quizqueen-footer text-center text-muted py-3 mt-auto border-top shadow-sm">
        <div>
          &copy; {new Date().getFullYear()} <span className="fw-bold text-primary">Quiz Master</span> — Made with <span className="heartbeat" style={{ color: "#e25555" }}>♥</span> for learning.
        </div>
        <div>
          <a href="mailto:support@quizplatform.com" className="text-decoration-none text-primary">
            admin123@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;