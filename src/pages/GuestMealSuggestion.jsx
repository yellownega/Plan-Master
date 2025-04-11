"use client";

import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

// Meal Detail Modal Component
function MealDetailModal({ meal, show, onClose }) {
  if (!meal) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-warning">{meal.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="position-relative rounded overflow-hidden">
              <img
                src={`/placeholder.svg?height=300&width=500`}
                alt={`Suggested meal ${meal}`}
                width={500}
                height={300}
                className="card-img-top"
              />

              <a
                href={meal.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-50 text-white p-3 rounded-circle"
              >
                <i className="bi bi-play-circle fs-3"></i>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="mb-3">Ingredients</h5>
            <ul className="list-group list-group-flush mb-4">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item bg-transparent px-0">
                  <i className="bi bi-dot text-warning me-2"></i>
                  {ingredient}
                </li>
              ))}
            </ul>
            <Button
              variant="outline-warning"
              size="sm"
              className="d-flex align-items-center"
            >
              <i className="bi bi-hand-thumbs-up me-2"></i>
              Like this recipe
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default function MealSuggestionPage() {
  const [ingredients, setIngredients] = useState([
    "Chicken",
    "Rice",
    "Tomatoes",
    "Onion",
    "Garlic",
  ]);
  const [newIngredient, setNewIngredient] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

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
          <h1 className="display-6 fw-bold text-warning mb-4">
            Meal Suggestions
          </h1>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-transparent">
                  <h2 className="h5 text-warning mb-0">Your Ingredients</h2>
                </div>
                <div className="card-body">
                  <form className="mb-4">
                    <div className="mb-3">
                      <label htmlFor="ingredients" className="form-label">
                        Enter your ingredients
                      </label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          id="ingredients"
                          placeholder="e.g., chicken, rice, tomatoes"
                          value={newIngredient}
                          onChange={(e) => setNewIngredient(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={handleAddIngredient}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {ingredients.map((ingredient) => (
                        <div
                          key={ingredient}
                          className="badge bg-warning bg-opacity-25 text-warning d-flex align-items-center py-2 px-3"
                        >
                          {ingredient}
                          <button
                            type="button"
                            className="btn-close btn-close-sm ms-2"
                            onClick={() => handleRemoveIngredient(ingredient)}
                            aria-label="Remove"
                          ></button>
                        </div>
                      ))}
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Preference</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="preference"
                          id="savory"
                          defaultChecked
                        />
                        <label className="form-check-label" htmlFor="savory">
                          Savory
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="preference"
                          id="sweet"
                        />
                        <label className="form-check-label" htmlFor="sweet">
                          Sweet
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="preference"
                          id="both"
                        />
                        <label className="form-check-label" htmlFor="both">
                          No preference
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="servings" className="form-label">
                        Number of servings
                      </label>
                      <select
                        className="form-select"
                        id="servings"
                        defaultValue="2"
                      >
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="4">4 people</option>
                        <option value="6">6+ people</option>
                      </select>
                    </div>

                    <button type="button" className="btn btn-warning w-100">
                      Find Recipes
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <h2 className="h4 mb-3">Suggested Recipes</h2>
              <div className="row g-4">
                {[1, 2, 3, 4].map((meal) => (
                  <div key={`suggestion-${meal}`} className="col-md-6">
                    <div className="card h-100 shadow-sm">
                      <img
                        src={`/placeholder.svg?height=300&width=500`}
                        alt={`Suggested meal ${meal}`}
                        width={500}
                        height={300}
                        className="card-img-top"
                      />

                      <div className="card-body">
                        <h5 className="card-title">Chicken and Rice Skillet</h5>
                        <div className="d-flex align-items-center text-muted small mb-2">
                          <i className="bi bi-people me-1"></i>
                          <span>Serves 2</span>
                          <span className="mx-2">•</span>
                          <span>30 min</span>
                        </div>
                        <div className="d-flex flex-wrap gap-1 mb-2">
                          {["Chicken", "Rice", "Tomatoes", "Onion"].map(
                            (ingredient) => (
                              <span
                                key={ingredient}
                                className="badge bg-warning bg-opacity-25 text-warning"
                              >
                                {ingredient}
                              </span>
                            )
                          )}
                        </div>
                        <p className="card-text text-muted small mb-3">
                          A simple one-pan meal with chicken, rice, and
                          vegetables.
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-hand-thumbs-up text-warning me-1"></i>
                            <span className="small">{87 + meal * 12}</span>
                          </div>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() =>
                              handleMealClick({
                                name: "Chicken and Rice Skillet",
                                image: "/placeholder.svg?height=500&width=800",
                                ingredients: [
                                  "2 chicken breasts, diced",
                                  "1 cup rice",
                                  "2 tomatoes, diced",
                                  "1 onion, chopped",
                                  "2 cloves garlic, minced",
                                  "2 cups chicken broth",
                                  "1 tbsp olive oil",
                                  "Salt and pepper to taste",
                                  "Fresh herbs for garnish",
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
            </div>
          </div>
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
    </div>
  );
}
