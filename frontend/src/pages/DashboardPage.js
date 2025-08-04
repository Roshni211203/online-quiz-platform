import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./HomePage.css";

function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("dashboard/")
      .then(res => setData(res.data))
      .catch(() => setData({ error: "Unable to fetch dashboard data" }));
  }, []);

  if (!data) return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <div className="quizqueen-step-card text-center" style={{ maxWidth: 500, width: "100%" }}>
          <span>Loading...</span>
        </div>
      </div>
    </div>
  );
  if (data.error) return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <div className="quizqueen-step-card text-center alert alert-danger" style={{ maxWidth: 500, width: "100%" }}>
          {data.error}
        </div>
      </div>
    </div>
  );

  return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column align-items-center">
        <div className="quizqueen-step-card w-100" style={{ maxWidth: 800 }}>
          <h2 className="mb-4 quizqueen-title text-center">
            <span className="brand-gradient">My Dashboard</span>
          </h2>
          <div className="mb-3">
            <strong>Total Quizzes Attempted:</strong> {data.total_attempts}
          </div>
          <div className="mb-3">
            <strong>Total Score:</strong> {data.total_score}
          </div>
          <h4 className="mt-4 mb-2 text-primary">Quiz History</h4>
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Score</th>
                  <th>Total Questions</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {data.attempts && data.attempts.length > 0 ? (
                  data.attempts.map((a, i) => (
                    <tr key={i}>
                      <td>{a.quiz}</td>
                      <td>{a.score}</td>
                      <td>{a.total_questions}</td>
                      <td>{new Date(a.completed_at).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-muted">
                      No quiz attempts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;