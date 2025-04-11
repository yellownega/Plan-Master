import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignupPage() {
  const navigate = useNavigate(); // ✅ Use useNavigate instead of useRouter
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard"); // ✅ navigate instead of router.push
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
              <h1 className="h3 fw-bold">Create an account</h1>
              <p className="text-muted">
                Enter your information to get started
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="first-name" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="first-name"
                    placeholder="John"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="last-name" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="last-name"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  required
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms"
                  required
                />
                <label className="form-check-label small" htmlFor="terms">
                  I agree to the{" "}
                  <Link to="#" className="text-warning text-decoration-none">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-warning text-decoration-none">
                    privacy policy
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 mb-3"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
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
                    <i className="bi bi-github me-2"></i> GitHub
                  </button>
                </div>
              </div>

              <div className="text-center small">
                <p className="mb-1">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-warning text-decoration-none"
                  >
                    Sign in
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
