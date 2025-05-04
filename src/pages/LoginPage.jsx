// src/pages/LoginPage.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    setAnimateCard(true);
  }, []);

  const handleInputChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });

    if (formErrors[id]) {
      setFormErrors({
        ...formErrors,
        [id]: null,
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      console.log(
        "Sending login request to:",
        "http://localhost:5000/api/auth/login",
        formData
      );
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      console.log("Login response:", response.data);

      const token = response.data.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", token);
      console.log("Token saved to localStorage:", token);

      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error.message,
        error.response?.status
      );
      setIsLoading(false);
      setFormErrors({
        ...formErrors,
        general:
          error.response?.status === 404
            ? "Server could not find the login endpoint. Please ensure the backend is running and configured correctly."
            : error.response?.data?.error || "An error occurred during login",
      });
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center p-4">
        <Link to="/" className="mb-4 text-decoration-none">
          <span className="fs-3 fw-bold text-warning">MealMaster</span>
        </Link>

        <div
          className={`card shadow border-0 ${
            animateCard ? "animate__animated animate__fadeIn" : ""
          }`}
          style={{
            maxWidth: "450px",
            width: "100%",
            transition: "all 0.3s ease",
          }}
        >
          <div className="card-body p-4 p-md-5">
            <div className="text-center mb-4">
              <h1 className="h3 fw-bold">Welcome back</h1>
              <p className="text-muted">
                Enter your credentials to access your account
              </p>
            </div>

            {formErrors.general && (
              <div className="alert alert-danger" role="alert">
                {formErrors.general}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="hello@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>
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
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      formErrors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    className="input-group-text bg-white"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi ${
                        showPassword ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </button>
                  {formErrors.password && (
                    <div className="invalid-feedback">
                      {formErrors.password}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 mb-3 position-relative"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
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
                    className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-google me-2"></i> Google
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
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
                    className="text-warning text-decoration-none fw-medium"
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
