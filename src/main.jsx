import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

// Import pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import GuestDashboard from "./pages/GuestDashboard";
import MealPlanPage from "./pages/MealPlanPage";
import MealSuggestionPage from "./pages/MealSuggestionPage";
import GuestMealSuggestion from "./pages/GuestMealSuggestion";
import GuestMealPlan from "./pages/GuestMealPlan";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/guest" element={<GuestDashboard />} />
        <Route path="/meal-plan" element={<MealPlanPage />} />
        <Route path="/meal-plan/guest" element={<MealPlanPage />} />
        <Route path="/meal-suggestion" element={<MealSuggestionPage />} />
        <Route path="/Meal-suggestion/guest" element={<GuestMealSuggestion />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);