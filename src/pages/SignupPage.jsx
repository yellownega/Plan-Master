import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios

export default function SignupPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
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

    if (id === "password") {
      calculatePasswordStrength(value);
    }

    if (
      id === "confirmPassword" ||
      (id === "password" && formData.confirmPassword)
    ) {
      if (id === "password" && value !== formData.confirmPassword) {
        setFormErrors({
          ...formErrors,
          confirmPassword: "Passwords do not match",
        });
      } else if (id === "confirmPassword" && value !== formData.password) {
        setFormErrors({
          ...formErrors,
          confirmPassword: "Passwords do not match",
        });
      } else {
        setFormErrors({
          ...formErrors,
          confirmPassword: null,
        });
      }
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const getStrengthText = () => {
    switch (passwordStrength) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Medium";
      case 3:
        return "Strong";
      case 4:
        return "Very strong";
      default:
        return "";
    }
  };

  const getStrengthColor = () => {
    switch (passwordStrength) {
      case 0:
        return "danger";
      case 1:
        return "danger";
      case 2:
        return "warning";
      case 3:
        return "info";
      case 4:
        return "success";
      default:
        return "secondary";
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!formData.terms) {
      errors.terms = "You must accept the terms and conditions";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setFormErrors({
        ...formErrors,
        general:
          error.response?.data?.error || "An error occurred during signup",
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
              <h1 className="h3 fw-bold">Create an account</h1>
              <p className="text-muted">
                Enter your information to get started
              </p>
            </div>

            {formErrors.general && (
              <div className="alert alert-danger" role="alert">
                {formErrors.general}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.firstName ? "is-invalid" : ""
                      }`}
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.firstName && (
                      <div className="invalid-feedback">
                        {formErrors.firstName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className={`form-control ${
                        formErrors.lastName ? "is-invalid" : ""
                      }`}
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                    {formErrors.lastName && (
                      <div className="invalid-feedback">
                        {formErrors.lastName}
                      </div>
                    )}
                  </div>
                </div>
              </div>

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
                <label htmlFor="password" className="form-label">
                  Password
                </label>
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
                {formData.password && (
                  <div className="mt-2">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small>
                        Password strength:{" "}
                        <span className={`text-${getStrengthColor()}`}>
                          {getStrengthText()}
                        </span>
                      </small>
                    </div>
                    <div className="progress" style={{ height: "5px" }}>
                      <div
                        className={`progress-bar bg-${getStrengthColor()}`}
                        role="progressbar"
                        style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        aria-valuenow={(passwordStrength / 4) * 100}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${
                      formErrors.confirmPassword ? "is-invalid" : ""
                    }`}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    className="input-group-text bg-white"
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      className={`bi ${
                        showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                      }`}
                    ></i>
                  </button>
                  {formErrors.confirmPassword && (
                    <div className="invalid-feedback">
                      {formErrors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className={`form-check-input ${
                    formErrors.terms ? "is-invalid" : ""
                  }`}
                  id="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  required
                />
                <label className="form-check-label" htmlFor="terms">
                  I agree to the{" "}
                  <Link to="#" className="text-warning text-decoration-none">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-warning text-decoration-none">
                    privacy policy
                  </Link>
                </label>
                {formErrors.terms && (
                  <div className="invalid-feedback">{formErrors.terms}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-warning w-100 mb-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Creating account...
                  </>
                ) : (
                  "Create Account"
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
                    <i className="bi bi-github me-2"></i> GitHub
                  </button>
                </div>
              </div>

              <div className="text-center small">
                <p className="mb-1">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-warning text-decoration-none fw-medium"
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
