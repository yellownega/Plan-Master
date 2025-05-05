// src/pages/MealPlanPage.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Button, Tab, Tabs } from "react-bootstrap";
import PlanSuggestionModal from "../components/PlanSuggestionModal";
import MealDetailModal from "../components/MealDetailModal";
import MealTabs from "../components/MealTabs";
import {
  getMealPlan,
  saveMealPlan,
  getProfile,
  updateProfile,
} from "../services/api";
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
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token from localStorage
  const [userId, setUserId] = useState(null); // Will be set from token
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [userPreferences, setUserPreferences] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [savedMealPlan, setSavedMealPlan] = useState(null);
  const [showSavedPlans, setShowSavedPlans] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [error, setError] = useState(null);

  // Default meals data with images
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

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      console.log("Token from localStorage:", token);
      if (!token) {
        console.log("No token found, redirecting to login");
        navigate("/login");
        return;
      }
      try {
        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) {
          throw new Error("Invalid token format");
        }
        const decoded = JSON.parse(atob(tokenParts[1]));
        console.log("Decoded token:", decoded);
        const userIdField = decoded._id || decoded.userId || decoded.sub;
        if (!userIdField) {
          throw new Error("Token does not contain a user ID");
        }
        setUserId(userIdField);
        const profile = await getProfile();
        console.log("Profile data:", profile);
        setUserPreferences(
          profile.preferences || {
            dietaryRestrictions: [],
            goals: [],
            cuisinePreferences: [],
          }
        );
      } catch (err) {
        console.error("Error in fetchUserAndProfile:", err.message);
        setError("Failed to authenticate or fetch profile: " + err.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchUserAndProfile();
  }, [token, navigate]);

  useEffect(() => {
    const fetchMealPlan = async () => {
      if (!userId) return;
      try {
        const data = await getMealPlan(userId);
        setSavedMealPlan(data);
        setMealPlan(data);
        setError(null);
      } catch (error) {
        if (error.response?.status === 404) {
          console.log("No meal plan found for user, initializing empty plan");
          setSavedMealPlan(defaultMealsData);
          setMealPlan(defaultMealsData);
        } else {
          console.error("Error fetching meal plan:", error.message);
          setSavedMealPlan(defaultMealsData);
          setMealPlan(defaultMealsData);
          setError(error.message || "Failed to fetch meal plan.");
        }
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

  const handlePlanSubmit = async (preferences) => {
    try {
      if (
        !preferences ||
        typeof preferences !== "object" ||
        Object.keys(preferences).length === 0
      ) {
        throw new Error("Invalid preferences data");
      }
      const updatedProfile = await updateProfile(preferences);
      setUserPreferences(updatedProfile.preferences);
      setError(null);
    } catch (error) {
      console.error(
        "Failed to update preferences:",
        error.response?.data?.error || error.message
      );
      setError(
        `Failed to update preferences: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  const handleGenerateMealPlan = () => {
    if (!userPreferences || !userPreferences.goals?.length) {
      alert("Please submit your preferences using Plan Suggestion first.");
      return;
    }

    const filterMeals = (meals) => {
      return meals.filter((meal) => {
        if (!meal || !meal.name) return false;

        // Check goals (use the first goal for now)
        const goal = userPreferences.goals[0];
        if (goal === "lose" && meal.calories > 400) return false;
        if (goal === "gain" && meal.calories < 400) return false;

        // Check dietary restrictions
        if (userPreferences.dietaryRestrictions?.length) {
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

          const restrictions = userPreferences.dietaryRestrictions;
          return !restrictions.some((restriction) => {
            const blocked = restrictedIngredients[restriction];
            return (
              blocked &&
              meal.ingredients.some((ingredient) =>
                blocked.some((b) => ingredient.toLowerCase().includes(b))
              )
            );
          });
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
    if (!mealPlan || !userId) {
      alert(
        "Please generate a meal plan first using Generate Meal Plan or log in."
      );
      return;
    }
    if (
      JSON.stringify(mealPlan) === JSON.stringify(savedMealPlan) &&
      savedMealPlan
    ) {
      alert("No changes to save.");
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
    setMealPlan(defaultMealsData);
    setShowSavedPlans(false);
  };

  const handleClearPreferences = async () => {
    try {
      const clearedPreferences = {
        dietaryRestrictions: [],
        goals: [],
        cuisinePreferences: [],
      };
      const updatedProfile = await updateProfile(clearedPreferences);
      setUserPreferences(updatedProfile.preferences);
      setMealPlan(defaultMealsData);
      setError(null);
    } catch (error) {
      console.error(
        "Failed to clear preferences:",
        error.response?.data?.error || error.message
      );
      setError(
        `Failed to clear preferences: ${
          error.response?.data?.error || error.message
        }`
      );
    }
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
          role="presentation"
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
            <Link
              to="/"
              className="text-warning text-decoration-none"
              onClick={() => localStorage.removeItem("token")}
            >
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
                aria-label="Toggle navigation menu"
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
                    handleClearPreferences();
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
            mealPlan={mealPlan || defaultMealsData}
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
