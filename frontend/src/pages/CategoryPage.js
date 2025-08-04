import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const levels = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("categories/").then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1">
        <h2 className="mb-4 quizqueen-title text-center">
          <span className="brand-gradient">Select a Category</span>
        </h2>
        <div className="row g-4 justify-content-center">
          {categories.map((cat) => (
            <div className="col-md-4" key={cat.id}>
              <div className="quizqueen-step-card h-100 d-flex flex-column align-items-center justify-content-between">
                <img
                  src={
                    cat.image
                      ? (cat.image.startsWith("http") ? cat.image : `http://localhost:8000${cat.image}`)
                      : "/no-image.png"
                  }
                  alt={cat.name}
                  className="mb-3"
                  style={{
                    height: "160px",
                    objectFit: "contain",
                    background: "#f8f9fa",
                    borderRadius: "8px",
                    width: "100%",
                    maxWidth: "220px"
                  }}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = "/no-image.png";
                  }}
                />
                <div className="quizqueen-step-title mb-2">{cat.name}</div>
                <div className="dropdown w-100">
                  <button
                    className="btn btn-quizqueen-main w-100 dropdown-toggle"
                    type="button"
                    id={`dropdownMenuButton-${cat.id}`}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Select Level
                  </button>
                  <ul className="dropdown-menu w-100" aria-labelledby={`dropdownMenuButton-${cat.id}`}>
                    {levels.map(level => (
                      <li key={level.value}>
                        <button
                          className="dropdown-item"
                          onClick={() => navigate(`/category/${cat.id}/level/${level.value}`)}
                        >
                          {level.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          {categories.length === 0 && (
            <div className="col-12 text-center text-muted">No categories found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;