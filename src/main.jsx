import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css"; // MEAL-MATE-VITE global styles

// Import pages from MEAL-MATE-VITE
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import GuestDashboard from "./pages/GuestDashboard";
import MealPlanPage from "./pages/MealPlanPage";
import MealSuggestionPage from "./pages/MealSuggestionPage";
import GuestMealSuggestion from "./pages/GuestMealSuggestion";
import GuestMealPlan from "./pages/GuestMealPlan";
import Profile from "./pages/ProfilePage"; // Import the Profile page component

// Import pages from GYM-HUB-REACT
import HomePage from "./pages/HomePage";
import MuscleSelectionPage from "./pages/MuscleSelectionPage";

import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/guest" element={<GuestDashboard />} />
          <Route path="/meal-plan" element={<MealPlanPage />} />
          <Route path="/meal-plan/guest" element={<GuestMealPlan />} />
          <Route path="/meal-suggestion" element={<MealSuggestionPage />} />
          <Route
            path="/meal-suggestion/guest"
            element={<GuestMealSuggestion />}
          />
          <Route path="/gym-hub" element={<HomePage />} />
          <Route
            path="/gym-hub/muscle-selection"
            element={<MuscleSelectionPage />}
          />
          <Route path="/profile" element={<Profile />} />{" "}
          {/* Add the Profile route */}
          <Route
            path="*"
            element={<div>404: Page Not Found - Check the URL</div>}
          />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
