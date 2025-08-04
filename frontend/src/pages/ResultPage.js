import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./HomePage.css";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result)
    return (
      <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
        <div className="container text-center py-5">
          <div className="quizqueen-step-card mx-auto" style={{ maxWidth: 500 }}>
            No result found.
          </div>
        </div>
      </div>
    );

  // Helper to check skipped
  const isSkipped = (a) =>
    a.user_answer === null ||
    a.user_answer === undefined ||
    a.user_answer === "";

  // Calculate stats
  const correct = result.answers?.filter(a => a.is_correct).length || 0;
  const incorrect = result.answers?.filter(a => !isSkipped(a) && !a.is_correct).length || 0;
  const skipped = result.answers?.filter(isSkipped).length || 0;

  return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column align-items-center">
        <div className="quizqueen-step-card w-100" style={{ maxWidth: 700 }}>
          <h2 className="mb-3 quizqueen-title text-center">
            <span className="brand-gradient">Quiz Completed!</span>
          </h2>
          <div className="mb-3 fs-5 text-center">
            <b>Your Score:</b> <span className="text-success">{result.score}</span> / {result.total_questions}
          </div>
          <div className="row mb-4 text-center">
            <div className="col">
              <span className="badge bg-success fs-6 mb-1">Correct</span>
              <div className="fw-bold">{correct}</div>
            </div>
            <div className="col">
              <span className="badge bg-danger fs-6 mb-1">Incorrect</span>
              <div className="fw-bold">{incorrect}</div>
            </div>
            <div className="col">
              <span className="badge bg-secondary fs-6 mb-1">Skipped</span>
              <div className="fw-bold">{skipped}</div>
            </div>
          </div>
          <h5 className="mb-3 text-primary">Review Your Answers</h5>
          <div className="list-group mb-4">
            {result.answers?.map((a, idx) => (
              <div
                key={idx}
                className={`list-group-item mb-2 d-flex justify-content-between align-items-center ${a.is_correct ? "border-success" : !isSkipped(a) ? "border-danger" : "border-secondary"}`}
                style={{
                  borderLeft: "6px solid",
                  borderLeftColor: a.is_correct
                    ? "#28a745"
                    : !isSkipped(a)
                    ? "#dc3545"
                    : "#6c757d",
                  background: a.is_correct
                    ? "#e9fbe9"
                    : !isSkipped(a)
                    ? "#fdeaea"
                    : "#f4f4f4"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div>
                    <b>Q{idx + 1}:</b> {a.question || <span className="text-danger">No question text</span>}
                  </div>
                  <div>
                    <b>Your Answer:</b>{" "}
                    {!isSkipped(a)
                      ? (
                          a.is_correct
                            ? <span className="text-success">{a.user_answer}</span>
                            : <span className="text-danger">{a.user_answer}</span>
                        )
                      : <span className="text-secondary">Skipped</span>
                    }
                  </div>
                  {!a.is_correct && !isSkipped(a) && (
                    <div>
                      <b>Correct Answer:</b>{" "}
                      <span className="text-success">{a.correct_answer}</span>
                    </div>
                  )}
                  {isSkipped(a) && a.correct_answer && (
                    <div>
                      <b>Correct Answer:</b>{" "}
                      <span className="text-success">{a.correct_answer}</span>
                    </div>
                  )}
                </div>
                <div>
                  {!isSkipped(a)
                    ? <span className="badge bg-primary">Attempted</span>
                    : <span className="badge bg-secondary">Skipped</span>
                  }
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-quizqueen-main w-100" onClick={() => navigate("/")}>
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;