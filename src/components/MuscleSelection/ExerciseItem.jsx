import { useState } from "react";

export default function ExerciseItem({ exercise, isActive, onClick }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className={`exercise-item card mb-3 ${isActive ? "active" : ""}`}>
      <div
        className="exercise-title card-header d-flex justify-content-between align-items-center"
        onClick={onClick}
      >
        <span>{exercise.title}</span>
        <i className={`fas fa-chevron-${isActive ? "up" : "down"}`}></i>
      </div>

      {isActive && (
        <div className="exercise-content card-body">
          <div className="video-container ratio ratio-16x9 mb-3">
            <video
              controls
              muted
              onLoadedData={() => setIsVideoLoaded(true)}
              style={{ display: isVideoLoaded ? "block" : "none" }}
            >
              <source src={exercise.video} type="video/mp4" />
            </video>
            {!isVideoLoaded && (
              <div
                className="d-flex justify-content-center align-items-center bg-light"
                style={{ height: "100%" }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
          <div className="exercise-description">
            <p>{exercise.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
