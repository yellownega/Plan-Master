import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4">
        <Link to="/" className="mb-4">
          <span className="fs-3 fw-bold text-warning">MealMaster</span>
        </Link>

        <div
          className="card shadow-sm border-0"
          style={{ maxWidth: "450px", width: "100%" }}
        >
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h1 className="h3 fw-bold">Welcome back</h1>
              <p className="text-muted">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="hello@example.com"
                  required
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <label htmlFor="password" className="form-label mb-0">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="small text-warning text-decoration-none"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 mb-3"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              <div className="position-relative my-4">
                <hr />
                <div className="position-absolute top-50 start-50 translate-middle bg-white px-3">
                  <span className="text-muted small text-uppercase">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="row g-2 mb-3">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                  >
                    <i className="bi bi-google me-2"></i> Google
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                  >
                    <i className="bi bi-facebook me-2"></i> Facebook
                  </button>
                </div>
              </div>

              <div className="text-center small">
                <p className="mb-1">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-warning text-decoration-none"
                  >
                    Sign up
                  </Link>
                </p>
                <p className="mb-0">
                  <Link
                    to="/dashboard/guest"
                    className="text-muted text-decoration-none"
                  >
                    Continue as guest
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
