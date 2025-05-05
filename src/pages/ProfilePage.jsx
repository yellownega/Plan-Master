import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import { getProfile, updateProfile } from "../services/api";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({
    dietaryRestrictions: [],
    goals: [],
    cuisinePreferences: [],
  });
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [photo, setPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [hasImageFailed, setHasImageFailed] = useState(false); // Track if image failed to load

  useEffect(() => {
    let isMounted = true;
    const fetchProfile = async () => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
        return;
      }
      setLoading(true);
      try {
        const data = await getProfile();
        if (isMounted) {
          setUser(data);
          setPersonalInfo({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: data.email || "",
          });
          setPreferences({
            dietaryRestrictions: data.preferences?.dietaryRestrictions || [],
            goals: data.preferences?.goals || [],
            cuisinePreferences: data.preferences?.cuisinePreferences || [],
          });
          const photoUrl = data.photo
            ? `http://localhost:5000${data.photo}`
            : "/default-avatar.png";
          console.log("Initial photoPreview set to:", photoUrl); // Debug log
          setPhotoPreview(photoUrl);
        }
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        if (isMounted) {
          setError(
            err.response?.data?.error ||
              "Failed to fetch profile. Please log in again."
          );
          if (err.message.includes("token")) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProfile();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prev) => {
      const fieldName =
        name === "goal"
          ? "goals"
          : name === "dietary"
          ? "dietaryRestrictions"
          : "cuisinePreferences";
      return {
        ...prev,
        [fieldName]: value ? [value] : [],
      };
    });
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const previewUrl = URL.createObjectURL(file);
      console.log("Photo preview set to:", previewUrl); // Debug log
      setPhotoPreview(previewUrl);
      setHasImageFailed(false); // Reset image failure state
    }
  };

  const handleSave = async () => {
    if (
      !personalInfo.firstName ||
      !personalInfo.lastName ||
      !personalInfo.email
    ) {
      setError("Please fill in all personal information fields.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", personalInfo.firstName);
      formData.append("lastName", personalInfo.lastName);
      formData.append("email", personalInfo.email);
      formData.append("preferences", JSON.stringify(preferences));
      if (photo) formData.append("photo", photo);
      const updatedUser = await updateProfile(formData);
      console.log("Updated user:", updatedUser);
      const newPhotoUrl = updatedUser.photo
        ? `http://localhost:5000${updatedUser.photo}`
        : "/default-avatar.png";
      console.log("New photoPreview set to:", newPhotoUrl); // Debug log
      setUser(updatedUser);
      setPhotoPreview(newPhotoUrl);
      setHasImageFailed(false); // Reset image failure state
      setIsEditing(false);
      setError(null);
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response?.data?.error || err.message
      );
      setError(
        err.response?.data?.error ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="container mt-5 text-center">
        <Spinner animation="border" variant="warning" />
        <p>Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mt-5">
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      </div>
    );

  if (!user)
    return <div className="container mt-5 text-center">Loading...</div>;

  return (
    <div
      className="min-vh-100 d-flex flex-column bg-gradient"
      style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <header className="py-3 border-bottom bg-white shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" className="text-decoration-none">
            <span className="fs-3 fw-bold text-warning">MealMaster</span>
          </Link>
          <nav>
            <Link
              to="/dashboard"
              className="me-3 text-dark text-decoration-none"
            >
              Dashboard
            </Link>
            <Link
              to="/meal-plan"
              className="me-3 text-dark text-decoration-none"
            >
              Meal Plan
            </Link>
            <Link
              to="/"
              className="text-warning text-decoration-none"
              onClick={() => localStorage.removeItem("token")}
            >
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
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card border-0 shadow-lg p-4 bg-white rounded-4 animate__animated animate__fadeIn">
                <div className="text-center mb-4">
                  <div className="position-relative">
                    <img
                      src={
                        hasImageFailed
                          ? "/default-avatar.png"
                          : photoPreview || "/default-avatar.png"
                      }
                      alt="User Profile"
                      className="rounded-circle border border-4 border-warning"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        if (!hasImageFailed) {
                          console.log("Image failed to load:", e.target.src);
                          setHasImageFailed(true); // Prevent loop by setting flag
                        }
                      }}
                    />
                    {isEditing && (
                      <label
                        htmlFor="photoUpload"
                        className="position-absolute bottom-0 end-0 bg-warning rounded-circle p-2 cursor-pointer"
                        style={{ transform: "translate(20%, 20%)" }}
                        aria-label="Upload profile photo"
                      >
                        <i className="bi bi-camera-fill text-white"></i>
                        <input
                          id="photoUpload"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="d-none"
                        />
                      </label>
                    )}
                  </div>
                  <h1 className="display-6 fw-bold text-warning mt-3">
                    Profile
                  </h1>
                </div>
                <div className="mb-4">
                  <h2 className="h4 mb-3 text-dark">Personal Information</h2>
                  {isEditing ? (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={personalInfo.firstName}
                          onChange={handlePersonalInfoChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={personalInfo.lastName}
                          onChange={handlePersonalInfoChange}
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          required
                        />
                      </Form.Group>
                    </Form>
                  ) : (
                    <>
                      <p>
                        <strong>Name:</strong> {user.firstName} {user.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {user.email}
                      </p>
                    </>
                  )}
                </div>

                <div className="mb-4">
                  <h2 className="h4 mb-3 text-dark">Preferences</h2>
                  {isEditing ? (
                    <Form>
                      <Form.Group className="mb-3">
                        <Form.Label>Goal</Form.Label>
                        <Form.Select
                          name="goal"
                          value={preferences.goals[0] || ""}
                          onChange={handlePreferenceChange}
                          required
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
                          value={preferences.dietaryRestrictions[0] || "none"}
                          onChange={handlePreferenceChange}
                          required
                        >
                          <option value="none">None</option>
                          <option value="vegetarian">Vegetarian</option>
                          <option value="vegan">Vegan</option>
                          <option value="gluten-free">Gluten-Free</option>
                          <option value="dairy-free">Dairy-Free</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Cuisine Preference</Form.Label>
                        <Form.Select
                          name="cuisine"
                          value={preferences.cuisinePreferences[0] || ""}
                          onChange={handlePreferenceChange}
                          required
                        >
                          <option value="">Select Cuisine</option>
                          <option value="italian">Italian</option>
                          <option value="mexican">Mexican</option>
                          <option value="asian">Asian</option>
                        </Form.Select>
                      </Form.Group>
                      <div className="d-flex gap-2">
                        <Button
                          variant="warning"
                          onClick={handleSave}
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setIsEditing(false)}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <div>
                      <p>
                        <strong>Goal:</strong>{" "}
                        {preferences.goals[0] || "Not set"}
                      </p>
                      <p>
                        <strong>Dietary Restriction:</strong>{" "}
                        {preferences.dietaryRestrictions[0] || "None"}
                      </p>
                      <p>
                        <strong>Cuisine Preference:</strong>{" "}
                        {preferences.cuisinePreferences[0] || "Not set"}
                      </p>
                      <Button
                        variant="warning"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Preferences
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <h2 className="h4 mb-3 text-dark">Meal Plans</h2>
                  <Link to="/meal-plan" className="btn btn-outline-warning">
                    View Saved Meal Plans
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 border-top bg-white">
        <div className="container">
          <p className="small text-muted mb-0 text-center">
            © {new Date().getFullYear()} MealMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
