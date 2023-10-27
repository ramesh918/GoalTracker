import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import LoginPage from "./components/Login";
import MonthlyGoalsPage from "./components/MonthlyGoals";
import DailyGoalsPage from "./components/DailyGoals";
import { useSelector } from "react-redux";


function App() {
  const isAuthenticated = useSelector(
    (state) => state.auth.token
  );
  alert(isAuthenticated)

  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dailyGoals"
            element= {isAuthenticated ? <DailyGoalsPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/monthlyGoals"
            element= {isAuthenticated ? <MonthlyGoalsPage /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Container>
    </Router>
  );
}


export default App;
