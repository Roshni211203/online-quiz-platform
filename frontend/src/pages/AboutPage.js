import React from "react";
import "./HomePage.css";

function AboutPage() {
  return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <div className="quizqueen-step-card" style={{ maxWidth: 700, width: "100%" }}>
          <h2 className="mb-4 quizqueen-title text-center">
            <span className="brand-gradient">About Us</span>
          </h2>
          <p className="lead text-center mb-3">
            Quiz Master is dedicated to making learning fun and competitive! Our mission is to help you test your knowledge, challenge yourself, and climb the leaderboard.
          </p>
          <ul>
            <li>Wide range of quiz categories</li>
            <li>Real-time leaderboard</li>
            <li>Personal analytics and progress tracking</li>
            <li>Friendly support team</li>
          </ul>
          <div className="text-center mt-4">
            <span className="text-muted">Made with <span className="heartbeat" style={{ color: "#e25555" }}>♥</span> for learning.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;