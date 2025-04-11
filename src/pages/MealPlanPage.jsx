import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Tab, Tabs } from "react-bootstrap";
import PlanSuggestionModal from "../components/PlanSuggestionModal";
import MealDetailModal from "../components/MealDetailModal";
import MealTabs from "../components/MealTabs";


export default function MealPlanPage() {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-soft-grey">
      <header className="py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <span className="fs-3 fw-bold text-warning">PlanMaster</span>
          </Link>
          <nav>
            <Link to="/dashboard" className="me-3 text-decoration-none">
              Dashboard
            </Link>
            <Link to="/profile" className="me-3 text-decoration-none">
              Profile
            </Link>
            <Link to="/" className="text-warning text-decoration-none">
              Logout
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow-1 py-5">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <h1 className="display-6 fw-bold text-warning mb-3 mb-md-0">
              Your Meal Plan
            </h1>
            <button
              className="btn btn-warning"
              onClick={() => setShowPlanModal(true)}
            >
              Plan Suggestion
            </button>
          </div>

          <MealTabs handleMealClick={handleMealClick} />
        </div>
      </main>

      <footer className="py-4 border-top">
        <div className="container">
          <p className="small text-muted mb-0">
            © {new Date().getFullYear()} MealMaster. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <MealDetailModal
          meal={selectedMeal}
          show={!!selectedMeal}
          onClose={handleCloseModal}
        />
      )}

      {/* Plan Suggestion Modal */}
      <PlanSuggestionModal
        show={showPlanModal}
        onClose={() => setShowPlanModal(false)}
      />
    </div>
  );
}
