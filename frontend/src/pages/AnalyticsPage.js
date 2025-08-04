import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./HomePage.css";

function AnalyticsPage() {
  const [data, setData] = useState({});

  useEffect(() => {
    api.get("analytics/").then((res) => setData(res.data.analytics || {}));
  }, []);

  return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column align-items-center">
        <div className="quizqueen-step-card" style={{ maxWidth: 420, width: "100%" }}>
          <h2 className="mb-4 quizqueen-title text-center">
            <span className="brand-gradient">User Analytics</span>
          </h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between">
              <span>Total Attempts</span>
              <span className="fw-bold">{data.total_attempts ?? 0}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Unique Users</span>
              <span className="fw-bold">{data.unique_users ?? 0}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Quizzes Attempted</span>
              <span className="fw-bold">{data.quizzes_attempted ?? 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;