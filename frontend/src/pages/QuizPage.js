import React, { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { useParams, useNavigate } from "react-router-dom";
import "./AuthPage.css";

function QuizPage() {
  const { id, level } = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [quizId, setQuizId] = useState(null);
  const [timer, setTimer] = useState(30);
  const [categoryName, setCategoryName] = useState("");
  const timerRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Get category name
    api.get(`categories/${id}/`).then((res) => {
      setCategoryName(res.data.name || "");
    });
    // Get quiz and questions
    api.get(`quizzes/?category=${id}&level=${level}`).then((res) => {
      if (res.data.length > 0) {
        setQuizId(res.data[0].id);
        setQuestions(res.data[0].questions);
      }
    });
  }, [id, level]);

  useEffect(() => {
    setTimer(30);
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          handleSkip();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [current, questions.length]);

  if (questions.length === 0)
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        Loading questions...
      </div>
    );

  const handleSkip = () => {
    clearInterval(timerRef.current);
    const answerObj = { question: questions[current].id, selected_choice: null };
    if (current + 1 < questions.length) {
      setAnswers((prev) => [...prev, answerObj]);
      setSelected(null);
      setCurrent(current + 1);
    } else {
      const finalAnswers = [...answers, answerObj];
      handleSubmit(finalAnswers);
    }
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    const answerObj = { question: questions[current].id, selected_choice: selected };
    if (current + 1 < questions.length) {
      setAnswers((prev) => [...prev, answerObj]);
      setSelected(null);
      setCurrent(current + 1);
    } else {
      const finalAnswers = [...answers, answerObj];
      handleSubmit(finalAnswers);
    }
  };

  const handleSubmit = (finalAnswers) => {
    clearInterval(timerRef.current);
    // Debug: Dekhein kya data ja raha hai
    // console.log({
    //   quiz: quizId,
    //   total_questions: questions.length,
    //   answers: finalAnswers,
    // });
    api
      .post("attempts/", {
        quiz: quizId,
        total_questions: questions.length,
        answers: finalAnswers,
      })
      .then((res) => {
        navigate("/result", { state: { result: res.data } });
      });
  };

  const q = questions[current];

  return (
    <div className="container" style={{ maxWidth: 600 }}>
      {/* Timer top right */}
      <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
        <div></div>
        <span className="badge bg-warning text-dark" style={{ fontSize: "1.1rem" }}>
          Time Left: {timer} sec
        </span>
      </div>
      {/* Category name center */}
      <h4 className="text-center mb-2 text-primary">{categoryName}</h4>
      {/* Question number center */}
      <div className="text-center mb-2">
        <span className="fw-bold">
          Question {current + 1} of {questions.length}
        </span>
      </div>
      {/* Question tab */}
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <h5 className="mb-3 text-center">{q.text}</h5>
          <div>
            {q.choices.map((choice) => (
              <div className="form-check mb-2" key={choice.id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="choice"
                  id={`choice${choice.id}`}
                  value={choice.id}
                  checked={selected === choice.id}
                  onChange={() => setSelected(choice.id)}
                />
                <label className="form-check-label" htmlFor={`choice${choice.id}`}>
                  {choice.text}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Skip left, Submit right */}
      <div className="d-flex justify-content-between align-items-center">
        <button className="btn btn-secondary" onClick={handleSkip}>
          Skip
        </button>
        <button
          className="btn btn-success"
          onClick={handleNext}
          disabled={selected === null}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default QuizPage;