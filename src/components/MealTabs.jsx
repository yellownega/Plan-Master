import { Tabs, Tab } from "react-bootstrap";

function MealTabs({ handleMealClick, preferences }) {
  const placeholderImage = "./placeholder.jpg?height=300&width=500";

  const mealsData = {
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
      },
    ],
  };
  const filterMeals = (meals) => {
    console.log("Filtering meals with preferences:", preferences);
    if (!preferences) return meals;

    return meals.filter((meal) => {
      // Calorie filtering
      if (preferences.goal === "lose" && meal.calories > 400) return false;
      if (preferences.goal === "gain" && meal.calories < 400) return false;

      // Dietary restrictions
      if (preferences.dietary !== "none") {
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

        const blocked = restrictedIngredients[preferences.dietary];
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

  return (
    <Tabs defaultActiveKey="breakfast" className="mb-3">
      {Object.entries(mealsData).map(([mealType, meals]) => {
        const filteredMeals = filterMeals(meals);

        return (
          <Tab
            eventKey={mealType}
            title={mealType.charAt(0).toUpperCase() + mealType.slice(1)}
            key={mealType}
          >
            <div className="row g-4 bg-soft-grey">
              {filteredMeals.length > 0 ? (
                filteredMeals.map((meal, index) => (
                  <div
                    key={`${mealType}-${index}`}
                    className="col-md-6 col-lg-4"
                  >
                    <div className="card h-100 shadow-sm">
                      <img
                        src={`./${meal.image}`}
                        alt={`${mealType} meal ${index + 1}`}
                        className="card-img-top"
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{meal.name}</h5>
                        <div className="d-flex align-items-center text-muted small mb-2">
                          <i className="bi bi-people me-1"></i>
                          <span>Serves 2</span>
                          <span className="mx-2">•</span>
                          <span>20 min</span>
                          <span className="mx-2">•</span>
                          <span>
                            {meal.calories}{" "}
                            <strong>
                              <span className="text-orange-500">kcal</span>
                            </strong>
                          </span>
                        </div>
                        <p className="card-text text-muted small mb-3">
                          Delicious and nutritious {mealType} option to fuel
                          your day.
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <i className="bi bi-hand-thumbs-up text-warning me-1"></i>
                            <span className="small">{100 + index * 17}</span>
                          </div>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() =>
                              handleMealClick({
                                name: meal.name,
                                image: placeholderImage
                                  .replace("300", "500")
                                  .replace("500", "800"),
                                ingredients: meal.ingredients,
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
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <p>No meals match your current filters.</p>
                </div>
              )}
            </div>
          </Tab>
        );
      })}
    </Tabs>
  );
}

export default MealTabs;
