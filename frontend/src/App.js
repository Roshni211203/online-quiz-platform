import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import LevelPage from "./pages/LevelPage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { setAuthToken } from "./api/api";
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardPage from "./pages/DashboardPage";



function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const user_id = localStorage.getItem("user_id");
    if (token && username && user_id) {
      setUser({ username, user_id });
      setAuthToken(token); // <-- YEH LINE UNCOMMENT KAR DO
    }
    
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          
          
          {/* Protected Routes */}
          <Route
            path="/categories"
            element={
              <ProtectedRoute user={user}>
                <CategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:id/levels"
            element={
              <ProtectedRoute user={user}>
                <LevelPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/category/:id/level/:level"
            element={
              <ProtectedRoute user={user}>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute user={user}>
                <ResultPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;