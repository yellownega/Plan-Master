// src/components/PlanSuggestionModal.jsx
import { Modal, Button, Form } from "react-bootstrap";

export default function PlanSuggestionModal({ show, onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const preferences = {
      dietaryRestrictions: [formData.get("dietary") || "none"], // Ensure array
      goals: [formData.get("goal") || "maintain"], // Ensure array
      cuisinePreferences: [], // Placeholder
      weight: formData.get("weight") ? parseInt(formData.get("weight")) : null,
      height: formData.get("height") ? parseInt(formData.get("height")) : null,
      age: formData.get("age") ? parseInt(formData.get("age")) : null,
      budget: formData.get("budget") ? parseInt(formData.get("budget")) : null,
    };

    // Send only the preferences expected by the backend
    const backendPreferences = {
      dietaryRestrictions: preferences.dietaryRestrictions,
      goals: preferences.goals,
      cuisinePreferences: preferences.cuisinePreferences,
    };

    onSubmit(backendPreferences);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-warning">
          Personalized Meal Plan
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted mb-4">
          Enter your details to get a customized meal plan that fits your goals
          and budget.
        </p>
        <Form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-6">
              <Form.Group controlId="weight">
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control type="number" placeholder="70" name="weight" />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group controlId="height">
                <Form.Label>Height (cm)</Form.Label>
                <Form.Control type="number" placeholder="175" name="height" />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="mb-3" controlId="age">
            <Form.Label>Age</Form.Label>
            <Form.Control type="number" placeholder="30" name="age" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Goal</Form.Label>
            <div>
              <Form.Check
                type="radio"
                id="goal-lose"
                name="goal"
                label="Lose weight"
                value="lose"
              />
              <Form.Check
                type="radio"
                id="goal-maintain"
                name="goal"
                label="Maintain weight"
                value="maintain"
                defaultChecked
              />
              <Form.Check
                type="radio"
                id="goal-gain"
                name="goal"
                label="Gain weight"
                value="gain"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="budget">
            <div className="d-flex justify-content-between">
              <Form.Label>Budget</Form.Label>
              <span className="text-muted small">$150/week</span>
            </div>
            <Form.Range
              min="50"
              max="300"
              step="10"
              defaultValue="150"
              name="budget"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="dietary">
            <Form.Label>Dietary Restrictions</Form.Label>
            <Form.Select name="dietary">
              <option value="none">None</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten-free">Gluten-free</option>
              <option value="dairy-free">Dairy-free</option>
            </Form.Select>
          </Form.Group>
          <Button variant="warning" type="submit" className="w-100 mt-3">
            Submit Preferences
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
