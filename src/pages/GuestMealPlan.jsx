import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Tab, Tabs } from "react-bootstrap";
import PlanSuggestionModal from "../components/PlanSuggestionModal";
import MealDetailModal from "../components/MealDetailModal";

export default function MealPlanPage() {
  const [activeTab, setActiveTab] = useState("breakfast");
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <span className="fs-3 fw-bold text-warning">MealMaster</span>
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

          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
            fill
          >
            <Tab eventKey="breakfast" title="Breakfast">
              <div className="row g-4">
                {[1, 2, 3].map((meal) => (
                  <div key={`breakfast-${meal}`} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                      <img
                        src={`/placeholder.svg?height=300&width=500`}
                        alt={`Breakfast meal ${meal}`}
                        className="card-img-top"
                      />
                      <div className="card-body">
                        <h5 className="card-title">Avocado Toast with Eggs</h5>
                        <div className="d-flex align-items-center text-muted small mb-2">
                          <i className="bi bi-people me-1"></i>
                          <span>Serves 2</span>
                          <span className="mx-2">•</span>
                          <span>15 min</span>
                        </div>
                        <p className="card-text text-muted small mb-3">
                          A nutritious breakfast with creamy avocado and
                          perfectly poached eggs on whole grain toast.
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-hand-thumbs-up text-warning me-1"></i>
                            <span className="small">{120 + meal * 11}</span>
                          </div>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() =>
                              handleMealClick({
                                name: "Avocado Toast with Eggs",
                                image: "/placeholder.svg?height=500&width=800",
                                ingredients: [
                                  "2 slices whole grain bread",
                                  "1 ripe avocado",
                                  "2 eggs",
                                  "Salt and pepper to taste",
                                  "Red pepper flakes (optional)",
                                  "1 tbsp olive oil",
                                ],
                                videoUrl: "#",
                              })
                            }
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab>
            {/* Similar code for lunch and dinner tabs */}
          </Tabs>
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
