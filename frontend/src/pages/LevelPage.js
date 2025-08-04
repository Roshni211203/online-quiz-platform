import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const levels = [
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

function LevelPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h2>Select Level</h2>
      <div className="d-flex justify-content-center gap-3 mt-4">
        {levels.map((level) => (
          <button
            key={level.value}
            className="btn btn-outline-primary btn-lg"
            onClick={() => navigate(`/category/${id}/level/${level.value}`)}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default LevelPage;