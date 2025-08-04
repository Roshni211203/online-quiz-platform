import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";

function QuizDetailPage({ user }) {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`quizzes/${id}/`).then((res) => setQuiz(res.data));
  }, [id]);

  const handleChange = (questionId, choiceId) => {
    setAnswers({ ...answers, [questionId]: choiceId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      quiz: quiz.id,
      total_questions: quiz.questions.length,
      answers: Object.entries(answers).map(([question, selected_choice]) => ({
        question,
        selected_choice,
      })),
    };
    try {
      const res = await api.post("attempts/", payload);
      setResult(res.data);
      setSubmitted(true);
    } catch (err) {
      alert("Error submitting quiz!");
    }
  };

  if (!quiz) return <div className="text-center mt-5">Loading...</div>;
  if (submitted)
    return (
      <div className="container text-center mt-5">
        <h2 className="text-success mb-3">Quiz Submitted!</h2>
        <p className="fs-4">
          Score: <span className="fw-bold">{result.score}</span> / {result.total_questions}
        </p>
      </div>
    );

  return (
    <div className="container">
      <h2 className="mb-4 text-primary">{quiz.title}</h2>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, idx) => (
          <div key={q.id} className="mb-4">
            <div className="mb-2 fw-semibold">
              Q{idx + 1}. {q.text}
            </div>
            <div>
              {q.choices.map((c) => (
                <div className="form-check" key={c.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`q${q.id}`}
                    value={c.id}
                    checked={answers[q.id] === c.id}
                    onChange={() => handleChange(q.id, c.id)}
                    required
                  />
                  <label className="form-check-label">{c.text}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-success btn-lg">
          Submit Quiz
        </button>
      </form>
    </div>
  );
}

export default QuizDetailPage;