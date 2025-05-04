// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { getProfile, updateProfile } from "../services/api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({
    goal: "",
    dietary: "none",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  // Get token from localStorage (assuming it's stored after login)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const data = await getProfile(token);
        setUser(data);
        setPreferences(data.preferences || { goal: "", dietary: "none" });
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch profile");
      }
    };
    fetchProfile();
  }, [token, navigate]);

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = await updateProfile(token, preferences);
      setUser(updatedUser);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update profile");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <header className="py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <span className="fs-3 fw-bold text-warning">MealMaster</span>
          </Link>
          <nav>
            <Link to="/dashboard" className="me-3 text-decoration-none">
              Dashboard
            </Link>
            <Link to="/meal-plan" className="me-3 text-decoration-none">
              Meal Plan
            </Link>
            <Link to="/" className="text-warning text-decoration-none">
              Logout
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow-1 py-5">
        <div className="container">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <h1 className="display-6 fw-bold text-warning mb-4">Profile</h1>
          <div className="card shadow border-0 p-4">
            <h2 className="h4 mb-3">Personal Information</h2>
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <h2 className="h4 mb-3 mt-4">Preferences</h2>
            {isEditing ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Goal</Form.Label>
                  <Form.Select
                    name="goal"
                    value={preferences.goal}
                    onChange={handlePreferenceChange}
                  >
                    <option value="">Select Goal</option>
                    <option value="lose">Lose Weight</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="gain">Gain Weight</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Dietary Restriction</Form.Label>
                  <Form.Select
                    name="dietary"
                    value={preferences.dietary}
                    onChange={handlePreferenceChange}
                  >
                    <option value="none">None</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="gluten-free">Gluten-Free</option>
                    <option value="dairy-free">Dairy-Free</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="warning" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button
                  variant="secondary"
                  className="ms-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Form>
            ) : (
              <div>
                <p>
                  <strong>Goal:</strong> {preferences.goal || "Not set"}
                </p>
                <p>
                  <strong>Dietary Restriction:</strong> {preferences.dietary}
                </p>
                <Button variant="warning" onClick={() => setIsEditing(true)}>
                  Edit Preferences
                </Button>
              </div>
            )}

            <h2 className="h4 mb-3 mt-4">Meal Plans</h2>
            <Link to="/meal-plan" className="btn btn-outline-warning">
              View Saved Meal Plans
            </Link>
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
