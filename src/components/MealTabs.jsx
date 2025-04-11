import { Tabs, Tab } from "react-bootstrap";

function MealTabs({ handleMealClick }) {
  const placeholderImage = "./placeholder.jpg?height=300&width=500";

  const mealsData = {
    breakfast: [
      {
        name: "Avocado Toast with Eggs",
        ingredients: [
          "2 slices whole grain bread",
          "1 ripe avocado",
          "2 eggs",
          "Salt and pepper to taste",
          "Red pepper flakes (optional)",
          "1 tbsp olive oil",
        ],
      },
      {
        name: "Greek Yogurt Parfait",
        ingredients: [
          "1 cup Greek yogurt",
          "1/2 cup granola",
          "1/2 cup mixed berries",
          "Honey to taste",
        ],
      },
      {
        name: "Oatmeal with Fruits",
        ingredients: [
          "1/2 cup oats",
          "1 cup almond milk",
          "Sliced banana",
          "Chia seeds",
        ],
      },
    ],
    lunch: [
      {
        name: "Grilled Chicken Salad",
        ingredients: [
          "Grilled chicken breast",
          "Mixed greens",
          "Cherry tomatoes",
          "Cucumber",
          "Olive oil & balsamic vinegar",
        ],
      },
      {
        name: "Quinoa Bowl",
        ingredients: [
          "1 cup cooked quinoa",
          "Grilled veggies",
          "Feta cheese",
          "Avocado slices",
        ],
      },
      {
        name: "Tuna Sandwich",
        ingredients: [
          "Whole wheat bread",
          "Canned tuna",
          "Lettuce",
          "Tomato slices",
          "Light mayo",
        ],
      },
    ],
    dinner: [
      {
        name: "Baked Salmon with Veggies",
        ingredients: [
          "Salmon fillet",
          "Steamed broccoli",
          "Carrots",
          "Lemon slices",
        ],
      },
      {
        name: "Spaghetti with Tomato Sauce",
        ingredients: [
          "Spaghetti",
          "Tomato sauce",
          "Garlic",
          "Basil",
          "Grated Parmesan",
        ],
      },
      {
        name: "Vegetable Stir-Fry",
        ingredients: [
          "Mixed vegetables",
          "Soy sauce",
          "Garlic and ginger",
          "Tofu (optional)",
        ],
      },
    ],
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
            {meals.map((meal, index) => (
              <div key={`${mealType}-${index}`} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={placeholderImage}
                    alt={`${mealType} meal ${index + 1}`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{meal.name}</h5>
                    <div className="d-flex align-items-center text-muted small mb-2">
                      <i className="bi bi-people me-1"></i>
                      <span>Serves 2</span>
                      <span className="mx-2">•</span>
                      <span>20 min</span>
                    </div>
                    <p className="card-text text-muted small mb-3">
                      Delicious and nutritious {mealType} option to fuel your
                      day.
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
            ))}
          </div>
        </Tab>
      ))}
    </Tabs>
  );
}

export default MealTabs;
