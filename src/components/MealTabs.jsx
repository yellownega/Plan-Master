// src/components/MealTabs.jsx
import { Tabs, Tab } from "react-bootstrap";

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
      ingredients: ["Brown rice", "Black beans", "Corn", "Guacamole", "Salsa"],
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

function MealTabs({ handleMealClick, preferences, mealPlan }) {
  const placeholderImage = "./placeholder.jpg?height=300&width=500";

  // If mealPlan is null, show all default meals unfiltered
  // If mealPlan is an object with arrays, use it directly (e.g., after Generate or View Saved Plans)
  const mealsData =
    mealPlan === null
      ? defaultMealsData // Show all meals unfiltered
      : {
          breakfast: mealPlan?.breakfast || [],
          lunch: mealPlan?.lunch || [],
          dinner: mealPlan?.dinner || [],
        };

  return (
    <Tabs defaultActiveKey="breakfast" className="mb-3">
      {Object.entries(mealsData).map(([mealType, meals]) => (
        <Tab
          eventKey={mealType}
          title={mealType.charAt(0).toUpperCase() + mealType.slice(1)}
          key={mealType}
        >
          <div className="row g-4 bg-soft-grey">
            {meals.length > 0 ? (
              meals.map((meal, index) => (
                <div key={`${mealType}-${index}`} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={meal.image || placeholderImage}
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
                          {meal.calories || "N/A"}{" "}
                          <strong>
                            <span className="text-orange-500">kcal</span>
                          </strong>
                        </span>
                      </div>
                      <p className="card-text text-muted small mb-3">
                        Delicious and nutritious {mealType} option to fuel your
                        day.
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-hand-thumbs-up text-warning me-1"></i>
                          <span className="small">
                            {meal.likes || 100 + index * 17}
                          </span>
                        </div>
                        <div>
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() =>
                              handleMealClick({
                                name: meal.name,
                                image:
                                  meal.image ||
                                  placeholderImage
                                    .replace("300", "500")
                                    .replace("500", "800"),
                                ingredients: meal.ingredients,
                                videoUrl: meal.videoUrl || "#",
                              })
                            }
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <p>No meals available for this {mealType}.</p>
              </div>
            )}
          </div>
        </Tab>
      ))}
    </Tabs>
  );
}

export default MealTabs;
