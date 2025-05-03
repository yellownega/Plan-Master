// src/pages/MealPlanPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Tab, Tabs } from "react-bootstrap";
import PlanSuggestionModal from "../components/PlanSuggestionModal";
import MealDetailModal from "../components/MealDetailModal";
import MealTabs from "../components/MealTabs";
import { getMealPlan, saveMealPlan } from "../services/api";
import {
  FaBars,
  FaUtensils,
  FaPlus,
  FaSave,
  FaEye,
  FaUndo,
  FaTrash,
  FaDumbbell,
} from "react-icons/fa";

export default function MealPlanPage() {
  const userId = "test-user";

  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [userPreferences, setUserPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem("userPreferences");
    return savedPreferences ? JSON.parse(savedPreferences) : null;
  });

  // Default meals data with images (same as MealTabs.jsx but with correct image URLs)
  const defaultMealsData = {
    breakfast: [
      {
        name: "Avocado Toast with Eggs",
        image: "Avocado_Toast_with_Eggs.jpg",
        ingredients: [
          "2 slices whole grain bread",
          "1 ripe avocado",
          "2 eggs",
          "Salt and pepper to taste",
          "Red pepper flakes (optional)",
          "1 tbsp olive oil",
        ],
        calories: 460,
        videoUrl: "#",
        likes: 100,
      },
      {
        name: "Greek Yogurt Parfait",
        image: "Greek_Yogurt_Parfait.jpg",
        ingredients: [
          "1 cup Greek yogurt",
          "1/2 cup granola",
          "1/2 cup mixed berries",
          "Honey to taste",
        ],
        calories: 350,
        videoUrl: "#",
        likes: 117,
      },
      {
        name: "Oatmeal with Fruits",
        image: "Oatmeal_with_Fruits.jpg",
        ingredients: [
          "1/2 cup oats",
          "1 cup almond milk",
          "Sliced banana",
          "Chia seeds",
        ],
        calories: 310,
        videoUrl: "#",
        likes: 134,
      },
      {
        name: "Peanut Butter Banana Smoothie",
        image: "Peanut_Butter_Banana_Smoothie.jpg",
        ingredients: [
          "1 banana",
          "2 tbsp peanut butter",
          "1 cup almond milk",
          "Ice cubes",
        ],
        calories: 360,
        videoUrl: "#",
        likes: 151,
      },
      {
        name: "Veggie Omelette",
        image: "Veggie_Omelette.jpg",
        ingredients: [
          "2 eggs",
          "Spinach",
          "Bell peppers",
          "Onions",
          "Cheddar cheese",
        ],
        calories: 280,
        videoUrl: "#",
        likes: 168,
      },
      {
        name: "Chia Pudding",
        image: "Chia_Pudding.jpg",
        ingredients: [
          "1/4 cup chia seeds",
          "1 cup coconut milk",
          "Maple syrup",
          "Sliced strawberries",
        ],
        calories: 320,
        videoUrl: "#",
        likes: 185,
      },
    ],
    lunch: [
      {
        name: "Grilled Chicken Salad",
        image: "Grilled_Chicken_Salad.jpg",
        ingredients: [
          "Grilled chicken breast",
          "Mixed greens",
          "Cherry tomatoes",
          "Cucumber",
          "Olive oil & balsamic vinegar",
        ],
        calories: 400,
        videoUrl: "#",
        likes: 100,
      },
      {
        name: "Quinoa Bowl",
        image: "Quinoa_Bowl.jpg",
        ingredients: [
          "1 cup cooked quinoa",
          "Grilled veggies",
          "Feta cheese",
          "Avocado slices",
        ],
        calories: 450,
        videoUrl: "#",
        likes: 117,
      },
      {
        name: "Mediterranean Tuna Sandwich",
        image: "Mediterranean_Tuna_Sandwich.jpg",
        ingredients: [
          "Whole grain bread",
          "Canned tuna in olive oil",
          "Baby spinach",
          "Sliced cherry tomatoes",
          "Cucumber slices",
          "Crumbled feta cheese",
          "Hummus or Greek yogurt spread",
          "A squeeze of lemon juice",
          "Salt and pepper to taste",
        ],
        calories: 480,
        videoUrl: "#",
        likes: 134,
      },
      {
        name: "Chicken Wrap",
        image: "Chicken_Wrap.jpg",
        ingredients: [
          "Grilled chicken strips",
          "Whole wheat tortilla",
          "Lettuce",
          "Tomato",
          "Greek yogurt dressing",
        ],
        calories: 420,
        videoUrl: "#",
        likes: 151,
      },
      {
        name: "Veggie Burrito Bowl",
        image: "Veggie_Burrito_Bowl.jpg",
        ingredients: [
          "Brown rice",
          "Black beans",
          "Corn",
          "Guacamole",
          "Salsa",
        ],
        calories: 460,
        videoUrl: "#",
        likes: 168,
      },
      {
        name: "Lentil Soup",
        image: "Lentil_Soup.jpg",
        ingredients: [
          "Lentils",
          "Carrots",
          "Celery",
          "Onions",
          "Vegetable broth",
        ],
        calories: 320,
        videoUrl: "#",
        likes: 185,
      },
    ],
    dinner: [
      {
        name: "Baked Salmon with Veggies",
        image: "Baked_Salmon_with_Veggies.jpg",
        ingredients: [
          "Salmon fillet",
          "Steamed broccoli",
          "Carrots",
          "Lemon slices",
        ],
        calories: 500,
        videoUrl: "#",
        likes: 100,
      },
      {
        name: "Spaghetti with Tomato Sauce",
        image: "Spaghetti_with_Tomato_Sauce.jpg",
        ingredients: [
          "Spaghetti",
          "Tomato sauce",
          "Garlic",
          "Basil",
          "Grated Parmesan",
        ],
        calories: 430,
        videoUrl: "#",
        likes: 117,
      },
      {
        name: "Vegetable Stir-Fry",
        image: "Vegetable_Stir_Fry.jpg",
        ingredients: [
          "Mixed vegetables",
          "Soy sauce",
          "Garlic and ginger",
          "Tofu (optional)",
        ],
        calories: 380,
        videoUrl: "#",
        likes: 134,
      },
      {
        name: "Stuffed Bell Peppers",
        image: "Stuffed_Bell_Peppers.jpg",
        ingredients: [
          "Bell peppers",
          "Ground turkey",
          "Quinoa",
          "Tomato sauce",
          "Onions",
        ],
        calories: 450,
        videoUrl: "#",
        likes: 151,
      },
      {
        name: "Chicken Curry with Rice",
        image: "Chicken_Curry_with_Rice.jpg",
        ingredients: [
          "Chicken breast",
          "Curry paste",
          "Coconut milk",
          "Basmati rice",
          "Cilantro",
        ],
        calories: 550,
        videoUrl: "#",
        likes: 168,
      },
      {
        name: "Zucchini Noodles with Pesto",
        image: "Zucchini_Noodles_with_Pesto.jpg",
        ingredients: [
          "Zucchini noodles",
          "Homemade pesto",
          "Cherry tomatoes",
          "Parmesan cheese",
        ],
        calories: 350,
        videoUrl: "#",
        likes: 185,
      },
    ],
  };

  // Initialize mealPlan with defaultMealsData to display all meals on page load
  const [mealPlan, setMealPlan] = useState(defaultMealsData);
  const [savedMealPlan, setSavedMealPlan] = useState(null);
  const [showSavedPlans, setShowSavedPlans] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const data = await getMealPlan(userId);
        setSavedMealPlan(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching meal plan:", error);
        setSavedMealPlan({ breakfast: [], lunch: [], dinner: [] });
        setError(
          "Failed to fetch meal plan. Please ensure the backend server is running."
        );
      }
    };
    fetchMealPlan();
  }, [userId]);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
  };

  const handlePlanSubmit = (preferences) => {
    console.log("Received preferences:", preferences);
    setUserPreferences(preferences);
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    setMealPlan(null); // Clear meal plan to show all default meals unfiltered
    setShowSavedPlans(false); // Reset saved plans view
  };

  const handleGenerateMealPlan = () => {
    if (!userPreferences) {
      alert("Please submit your preferences using Plan Suggestion first.");
      return;
    }

    const filterMeals = (meals) => {
      if (!userPreferences) return meals;

      return meals.filter((meal) => {
        if (!meal || !meal.name) return false;

        if (userPreferences.goal === "lose" && meal.calories > 400)
          return false;
        if (userPreferences.goal === "gain" && meal.calories < 400)
          return false;

        if (userPreferences.dietary !== "none") {
          const restrictedIngredients = {
            vegetarian: ["chicken", "tuna", "salmon", "turkey"],
            vegan: [
              "chicken",
              "tuna",
              "salmon",
              "turkey",
              "cheese",
              "yogurt",
              "egg",
              "milk",
            ],
            "gluten-free": ["bread", "spaghetti", "tortilla"],
            "dairy-free": ["cheese", "yogurt", "milk", "parmesan"],
          };

          const blocked = restrictedIngredients[userPreferences.dietary];
          if (
            blocked &&
            meal.ingredients.some((ingredient) =>
              blocked.some((b) => ingredient.toLowerCase().includes(b))
            )
          ) {
            return false;
          }
        }
        return true;
      });
    };

    const filteredBreakfast = filterMeals(defaultMealsData.breakfast);
    const filteredLunch = filterMeals(defaultMealsData.lunch);
    const filteredDinner = filterMeals(defaultMealsData.dinner);

    if (
      filteredBreakfast.length === 0 ||
      filteredLunch.length === 0 ||
      filteredDinner.length === 0
    ) {
      alert("No meals match your preferences. Please adjust your preferences.");
      return;
    }

    const generatedPlan = {
      breakfast: filteredBreakfast,
      lunch: filteredLunch,
      dinner: filteredDinner,
    };

    setMealPlan(generatedPlan);
    setShowSavedPlans(false);
  };

  const handleSaveMealPlan = async () => {
    if (!mealPlan) {
      alert("Please generate a meal plan first using Generate Meal Plan.");
      return;
    }

    try {
      const planToSave = {
        userId,
        breakfast: mealPlan.breakfast || [],
        lunch: mealPlan.lunch || [],
        dinner: mealPlan.dinner || [],
      };
      await saveMealPlan(planToSave);
      setSavedMealPlan(planToSave);
      alert("Meal plan saved successfully!");
      setError(null);
    } catch (error) {
      console.error("Error saving meal plan:", error);
      alert("Failed to save meal plan.");
      setError(
        "Failed to save meal plan. Please ensure the backend server is running."
      );
    }
  };

  const handleViewSavedPlans = () => {
    if (
      !savedMealPlan ||
      (!savedMealPlan.breakfast?.length &&
        !savedMealPlan.lunch?.length &&
        !savedMealPlan.dinner?.length)
    ) {
      alert("No saved meal plan found.");
      return;
    }
    setMealPlan(savedMealPlan);
    setShowSavedPlans(true);
  };

  const handleResetToDefault = () => {
    setMealPlan(defaultMealsData); // Reset to all meals
    setShowSavedPlans(false);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-soft-grey position-relative">
      {isNavOpen && (
        <div
          className="nav-overlay"
          onClick={toggleNav}
          aria-hidden="true"
        ></div>
      )}

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
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <h1 className="display-6 fw-bold text-warning mb-3 mb-md-0">
              Your Meal Plan
            </h1>
            <div className="hamburger-menu">
              <FaBars
                className="text-warning fs-3 cursor-pointer"
                onClick={toggleNav}
              />
            </div>
          </div>

          <div
            className={`slide-nav ${isNavOpen ? "open" : ""}`}
            role="navigation"
            aria-label="Meal Plan Options"
          >
            <div className="nav-header">
              <h3 className="text-white">Meal Options</h3>
              <button className="close-btn" onClick={toggleNav}>
                ✕
              </button>
            </div>
            <ul className="nav-list">
              <li>
                <button
                  className="nav-option"
                  onClick={() => {
                    setShowPlanModal(true);
                    toggleNav();
                  }}
                >
                  <FaUtensils className="me-2" /> Plan Suggestion
                </button>
              </li>
              <li>
                <button
                  className="nav-option"
                  onClick={() => {
                    handleGenerateMealPlan();
                    toggleNav();
                  }}
                >
                  <FaPlus className="me-2" /> Generate Meal Plan
                </button>
              </li>
              <li>
                <button
                  className="nav-option"
                  onClick={() => {
                    handleSaveMealPlan();
                    toggleNav();
                  }}
                >
                  <FaSave className="me-2" /> Save Plan
                </button>
              </li>
              <li>
                <button
                  className="nav-option"
                  onClick={() => {
                    handleViewSavedPlans();
                    toggleNav();
                  }}
                >
                  <FaEye className="me-2" /> View Saved Plans
                </button>
              </li>
              {showSavedPlans && (
                <li>
                  <button
                    className="nav-option"
                    onClick={() => {
                      handleResetToDefault();
                      toggleNav();
                    }}
                  >
                    <FaUndo className="me-2" /> Back to Default
                  </button>
                </li>
              )}
              <li>
                <button
                  className="nav-option"
                  onClick={() => {
                    setUserPreferences(null);
                    localStorage.removeItem("userPreferences");
                    setMealPlan(defaultMealsData); // Reset to all meals
                    toggleNav();
                  }}
                >
                  <FaTrash className="me-2" /> Clear Preferences
                </button>
              </li>
              <li>
                <Link to="/gym-hub" className="nav-option" onClick={toggleNav}>
                  <FaDumbbell className="me-2" /> Gym Plan
                </Link>
              </li>
            </ul>
          </div>

          <MealTabs
            handleMealClick={handleMealClick}
            preferences={userPreferences}
            mealPlan={mealPlan}
          />
        </div>
      </main>

      <footer className="py-4 border-top">
        <div className="container">
          <p className="small text-muted mb-0">
            © {new Date().getFullYear()} MealMaster. All rights reserved.
          </p>
        </div>
      </footer>

      {selectedMeal && (
        <MealDetailModal
          meal={selectedMeal}
          show={!!selectedMeal}
          onClose={handleCloseModal}
        />
      )}

      <PlanSuggestionModal
        show={showPlanModal}
        onClose={() => setShowPlanModal(false)}
        onSubmit={handlePlanSubmit}
      />
    </div>
  );
}
