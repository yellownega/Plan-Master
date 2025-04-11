import { Modal, Button } from "react-bootstrap";

export default function MealDetailModal({ meal, show, onClose }) {
  if (!meal) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-warning">{meal.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="position-relative rounded overflow-hidden">
              <img
                src={meal.image || "/placeholder.svg"}
                alt={meal.name}
                className="img-fluid w-100"
              />
              <a
                href={meal.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-50 text-white p-3 rounded-circle"
              >
                <i className="bi bi-play-circle fs-3"></i>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <h5 className="mb-3">Ingredients</h5>
            <ul className="list-group list-group-flush mb-4">
              {meal.ingredients.map((ingredient, index) => (
                <li key={index} className="list-group-item bg-transparent px-0">
                  <i className="bi bi-dot text-warning me-2"></i>
                  {ingredient}
                </li>
              ))}
            </ul>
            <Button
              variant="outline-warning"
              size="sm"
              className="d-flex align-items-center"
            >
              <i className="bi bi-hand-thumbs-up me-2"></i>
              Like this recipe
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
