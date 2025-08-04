import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import "./AuthPage.css";

function QuizListPage() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    api.get("quizzes/").then((res) => setQuizzes(res.data));
  }, []);

  return (
    <div>
      <h2>Available Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`}>{quiz.title}</Link> ({quiz.category?.name || "No Category"})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizListPage;