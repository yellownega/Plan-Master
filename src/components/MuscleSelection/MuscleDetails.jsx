import { useState } from "react";
import ExerciseItem from "./ExerciseItem";

export default function MuscleDetails({ muscle, exercises }) {
  const muscleInfo = {
    chest: {
      name: "Chest Muscles (Pectoralis)",
      description:
        "The chest muscles are responsible for movement of the shoulder joint...",
    },
    // b9iyet el muscle
  }[muscle];

  const [activeExercise, setActiveExercise] = useState(null);

  return (
    <div className="muscle-details card p-4">
      <h3>{muscleInfo.name}</h3>
      <p>{muscleInfo.description}</p>

      <h4 className="mt-4">Recommended Exercises:</h4>
      <div className="exercise-list mt-3">
        {exercises.map((exercise, index) => (
          <ExerciseItem
            key={index}
            exercise={exercise}
            isActive={activeExercise === index}
            onClick={() =>
              setActiveExercise(activeExercise === index ? null : index)
            }
          />
        ))}
      </div>
    </div>
  );
}
