import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-soft-grey">
      <header className="py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <span className="fs-3 fw-bold text-warning">PlanMaster</span>
          </Link>
          <nav>
            <Link to="/login" className="me-3 text-decoration-none">
              Log In
            </Link>
            <Link to="/signup" className="text-warning text-decoration-none">
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow-1 bg-soft-grey">
        <section className="py-5 py-md-7 bg-soft-grey">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <h1 className="display-5 fw-bold text-warning mb-3">
                  Your Personal Health Planning Assistant
                </h1>
                <p className="lead text-muted mb-4">
                  Plan healthy meals, discover recipes with ingredients you
                  already have, and achieve your nutrition goals with ease.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-2">
                  <Link to="/signup" className="btn btn-warning">
                    Sign Up <i className="bi bi-chevron-right"></i>
                  </Link>
                  <Link to="/login" className="btn btn-outline-warning">
                    Log In
                  </Link>
                </div>
                <div className="mt-3">
                  <Link
                    to="/dashboard/guest"
                    className="text-warning text-decoration-none small"
                  >
                    Continue as guest
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="rounded-3 overflow-hidden shadow-lg">
                  <img
                    src="/landingphotoo.png?height=500&width=800"
                    alt="Meal planning dashboard"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-5 py-md-7 bg-soft-grey">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="display-6 fw-bold text-warning mb-3">
                How It Works
              </h2>
              <p
                className="lead text-muted mx-auto"
                style={{ maxWidth: "800px" }}
              >
                Our platform makes Meal , GYM planning and Recipe discovery
                simple and personalized
              </p>
            </div>

            <div className="row align-items-center">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="mb-4">
                  <h3 className="h4 fw-bold text-warning">Daily Meal Plans</h3>
                  <p className="text-muted">
                    Browse through breakfast, lunch, and dinner options. Get
                    personalized meal plans based on your goals and budget.
                  </p>
                </div>
                <div>
                  <h3 className="h4 fw-bold text-warning">
                    Recipe Suggestions
                  </h3>
                  <p className="text-muted">
                    Enter ingredients you already have and get recipe
                    suggestions that match your preferences.
                  </p>
                </div>
                <div>
                  <h3 className="h4 fw-bold text-warning">GYM Plan</h3>
                  <p className="text-muted">
                    gym plan along with your healthy nutrition <br />
                    plan
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="rounded-3 overflow-hidden shadow">
                  <img
                    src="/LandingPmixt.png?height=500&width=800"
                    alt="Feature showcase"
                    className="img-fluid w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-4 border-top">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row justify-content-between">
            <p className="small text-muted">
              © {new Date().getFullYear()} MealMaster. All rights reserved.
            </p>
            <nav>
              <Link
                to="#"
                className="small text-muted text-decoration-none me-3"
              >
                Terms of Service
              </Link>
              <Link to="#" className="small text-muted text-decoration-none">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
