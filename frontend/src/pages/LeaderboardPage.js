import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./HomePage.css";

function LeaderboardPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("leaderboard/").then((res) => setData(res.data.leaderboard || []));
  }, []);

  return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column align-items-center">
        <div className="quizqueen-step-card w-100" style={{ maxWidth: 900 }}>
          <h2 className="mb-4 quizqueen-title text-center">
            <span className="brand-gradient">Leaderboard</span>
          </h2>
          <div className="table-responsive">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Quiz</th>
                  <th>Score</th>
                  <th>Total Questions</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-muted">
                      No data found.
                    </td>
                  </tr>
                ) : (
                  data.map((row, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{row.username}</td>
                      <td>{row.quiz}</td>
                      <td>{row.score}</td>
                      <td>{row.total_questions}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;