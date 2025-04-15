import { Tabs, Tab } from "react-bootstrap";

function MealTabs({ handleMealClick }) {
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
