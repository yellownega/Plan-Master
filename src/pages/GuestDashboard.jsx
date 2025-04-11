import { Link } from "react-router-dom";

export default function GuestDashboard() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <span className="fs-3 fw-bold text-warning">MealMaster</span>
          </Link>
          <div className="d-flex align-items-center">
            <span className="badge bg-warning bg-opacity-25 text-warning me-3 px-3 py-2">
              Guest Mode
            </span>
            <Link
              to="/signup"
              className="btn btn-outline-secondary btn-sm me-2"
            >
              <i className="bi bi-person-plus me-1"></i> Sign Up
            </Link>
            <Link to="/login" className="btn btn-warning btn-sm">
              Log In
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow-1 py-5">
        <div className="container">
          <div className="mb-4">
            <h1 className="display-6 fw-bold text-warning mb-2">
              Welcome to MealMaster
            </h1>
            <p className="text-muted">
              You&apos;re browsing as a guest. Some features may be limited.
              <Link
                to="/signup"
                className="ms-1 text-warning text-decoration-none"
              >
                Create an account
              </Link>{" "}
              for the full experience.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <Link to="/meal-plan/guest" className="text-decoration-none">
                <div className="card h-100 shadow-sm hover-shadow">
                  <div className="card-header bg-transparent border-0 pb-0">
                    <h2 className="h4 text-warning d-flex align-items-center">
                      <i className="bi bi-egg-fried me-2"></i>
                      Your Plan
                    </h2>
                    <p className="text-muted">
                      View or generate personalized meal plans
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="position-relative rounded overflow-hidden mb-3">
                      <img
                        src="/placeholder.svg?height=400&width=600"
                        alt="Meal planning"
                        width={600}
                        height={400}
                        className="img-fluid w-100"
                      />
                      <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white p-3">
                        <p className="mb-0 fw-medium">
                          Create a personalized meal plan based on your goals
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-warning w-100">
                      Go to Meal Plans
                    </button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-6">
              <Link
                to="/meal-suggestion/guest"
                className="text-decoration-none"
              >
                <div className="card h-100 shadow-sm hover-shadow">
                  <div className="card-header bg-transparent border-0 pb-0">
                    <h2 className="h4 text-warning d-flex align-items-center">
                      <i className="bi bi-basket me-2"></i>
                      Your Ingredients
                    </h2>
                    <p className="text-muted">
                      Get recipe suggestions based on what you have
                    </p>
                  </div>
                  <div className="card-body">
                    <div className="position-relative rounded overflow-hidden mb-3">
                      <img
                        src="/placeholder.svg?height=400&width=600"
                        alt="Meal planning"
                        width={600}
                        height={400}
                        className="img-fluid w-100"
                      />
                      <div className="position-absolute bottom-0 start-0 end-0 bg-dark bg-opacity-50 text-white p-3">
                        <p className="mb-0 fw-medium">
                          Find recipes using ingredients you already have
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-warning w-100">
                      Find Recipes
                    </button>
                  </div>
                </div>
              </Link>
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
    </div>
  );
}
