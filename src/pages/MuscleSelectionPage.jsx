// src/pages/MuscleSelectionPage.jsx
import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MuscleFigure from "../components/MuscleSelection/MuscleFigure";
import "./MuscleSelectionPage.css";

export default function MuscleSelectionPage() {
  const [activeView, setActiveView] = useState("front");
  const [selectedMuscle, setSelectedMuscle] = useState(null);
  const [activeCategory, setActiveCategory] = useState("weightlifting");
  const [expandedExercise, setExpandedExercise] = useState(null);
  useEffect(() => {
    console.log("Selected Muscle:", selectedMuscle);
  }, [selectedMuscle]);
  const exercises = {
    chest: [
      {
        title: "Bench Press",
        video: "/public/exercices/bench_press.mp4",
        description:
          "The bench press is a compound exercise that primarily targets the pectoralis major. Lie on a flat bench, grip the barbell with hands slightly wider than shoulder-width, lower it to your chest, then press it back up.",
      },
      {
        title: "Push-Ups",
        video: "/public/exercices/push_ups.mp4",
        description:
          "Push-ups work the chest, shoulders, and triceps. Start in a plank position with hands shoulder-width apart, lower your body until your chest nearly touches the floor, then push back up.",
      },
      {
        title: "Chest Flyes",
        video: "/public/exercices/chest_flyes.mp4",
        description:
          "Chest flyes isolate the pectoral muscles. Lie on a bench holding dumbbells above your chest with slightly bent arms, lower the weights out to the sides, then bring them back together in an arc motion.",
      },
      {
        title: "Incline Dumbbell Press",
        video: "/public/exercices/incline_dumbbell_press.mp4",
        description:
          "This exercise targets the upper chest. Sit on an incline bench, hold dumbbells at shoulder level, then press them upward until your arms are extended.",
      },
    ],
    shoulders: [
      {
        title: "Barbell Overhead Press",
        video: "/public/exercices/barbell_overhead_press.mp4",
        description:
          "The Barbell Overhead Press primarily targets the shoulder muscles, especially the deltoids, while also engaging the triceps and upper chest. It builds strength and stability in the shoulders and core.",
      },
      {
        title: "Dumbbell Seated Overhead Press",
        video: "/public/exercices/dumbbell_seated_overhead_press.mp4",
        description:
          "The Dumbbell Seated Overhead Press targets the shoulder muscles, primarily the deltoids, while also engaging the triceps and upper chest. Sitting provides stability, allowing for better control and strict form.",
      },
      {
        title: "Dumbbell Incline Bench Press",
        video: "/public/exercices/dumbbell_incline_bench_press.mp4",
        description:
          "The Dumbbell Incline Bench Press targets the upper chest and front delts, helping to build strength and muscle definition. The incline angle emphasizes the upper portion of the pectoral muscles while engaging the triceps and shoulders.",
      },
      {
        title: "Cable Low Single Arm Lateral Raise",
        video: "/public/exercices/cable_low_single_arm_lateral_raise.mp4",
        description:
          "The Cable Low Single Arm Lateral Raise targets the lateral deltoid, helping to build shoulder width and definition. Using a low pulley, this exercise provides constant tension throughout the movement, enhancing muscle activation.",
      },
    ],
    abs: [
      {
        title: "Hand Plank",
        video: "/public/exercices/Hand Plank.mp4",
        description:
          "The Hand Plank strengthens the core, shoulders, and arms by engaging the abs, obliques, and stabilizing muscles. It improves posture, balance, and overall endurance.",
      },
      {
        title: "Barbell Situp",
        video: "/public/exercices/Barbell Situp.mp4",
        description:
          "The Barbell Sit-Up targets the abdominal muscles while adding resistance to increase strength and core stability. It engages the hip flexors and helps improve overall core endurance.",
      },
      {
        title: "Dumbbell Russian Twist",
        video: "/public/exercices/Dumbbell Russian Twist.mp4",
        description:
          "The Dumbbell Russian Twist targets the obliques and helps improve rotational strength and stability in the core. Holding a dumbbell while twisting side to side engages the muscles along the sides of the abdomen.",
      },
      {
        title: "Laying Leg Raises",
        video: "/public/exercices/Laying Leg Raises.mp4",
        description:
          "Laying Leg Raises primarily target the lower abdominal muscles, especially the lower part of the rectus abdominis. They also engage the hip flexors and help improve core strength and stability.",
      },
    ],
    obliques: [
      {
        title: "Hand Side Plank",
        video: "/public/exercices/Hand Side Plank.mp4",
        description:
          "The Hand Side Plank targets the obliques, shoulders, and core muscles. It improves lateral stability, balance, and strengthens the sides of the abdomen while engaging the glutes and legs for support.",
      },
      {
        title: "Elbow Side Plank",
        video: "/public/exercices/Elbow Side Plank.mp4",
        description:
          "The Elbow Side Plank targets the obliques, shoulders, and core muscles, providing improved lateral stability. It strengthens the sides of the abdomen while also engaging the glutes and hips for better posture and balance.",
      },
      {
        title: "Dumbbell Russian Twist",
        video: "/public/exercices/Dumbbell Russian Twist.mp4",
        description:
          "The Dumbbell Russian Twist targets the obliques and helps improve rotational strength in the core. By holding a dumbbell and twisting the torso from side to side, it also engages the abs and hip flexors for enhanced core stability.",
      },
      {
        title: "Kettlebell Windmill",
        video: "/public/exercices/Kettlebell Windmill.mp4",
        description:
          "The Kettlebell Windmill is a full-body exercise that primarily targets the obliques, shoulders, and hips. It involves holding a kettlebell overhead while performing a controlled lateral bend, engaging the core, improving flexibility, and enhancing shoulder stability.",
      },
    ],
    biceps: [
      {
        title: "Chin Ups",
        video: "/public/exercices/Chin Ups.mp4",
        description:
          "Chin-Ups primarily target the biceps and back muscles, especially the lats. By gripping the bar with your palms facing towards you, this exercise helps build upper body strength, focusing on the arms, shoulders, and core stability.",
      },
      {
        title: "Cable Bayesian Curl",
        video: "/public/exercices/Cable Bayesian Curl.mp4",
        description:
          "The Cable Bayesian Curl is a bicep exercise that uses a cable machine to provide constant tension throughout the movement. By pulling the cable in an arc-like motion, it isolates the biceps, helping to build size and strength while also engaging the forearms.",
      },
      {
        title: "Dumbbell Curl",
        video: "/public/exercices/Dumbbell Curl.mp4",
        description:
          "The Dumbbell Curl is a classic bicep exercise that targets the brachii muscle in the upper arm. By curling a dumbbell towards the shoulder, it isolates the biceps, helping to build arm strength and muscle definition. It can be performed with alternating arms or both simultaneously.",
      },
      {
        title: "Dumbbell Hammer Curl",
        video: "/public/exercices/Dumbbell Hammer Curl.mp4",
        description:
          "The Dumbbell Hammer Curl targets both the biceps and the brachioradialis (forearm muscle). By holding the dumbbells with a neutral grip (palms facing each other), this variation helps build arm strength, improve grip, and enhance forearm development.",
      },
    ],
    quads: [
      {
        title: "Barbell Squat",
        video: "/public/exercices/Barbell Squat.mp4",
        description:
          "The Barbell Squat is a compound exercise that primarily targets the quads, hamstrings, glutes, and lower back. By lowering the body into a squat position while holding a barbell on the shoulders, it helps build lower body strength, stability, and muscle mass.",
      },
      {
        title: "Dumbbell Goblet Squat",
        video: "/public/exercices/Dumbbell Goblet Squat.mp4",
        description:
          "The Dumbbell Goblet Squat is a lower body exercise that targets the quads, glutes, and hamstrings. Holding a dumbbell close to the chest, you squat down while maintaining an upright torso. This variation helps improve squat form, builds strength, and enhances core stability.",
      },
      {
        title: "Machine Leg Extension",
        video: "/public/exercices/Machine Leg Extension.mp4",
        description:
          "The Machine Leg Extension isolates the quadriceps muscles. Sitting on the machine with your legs under the padded bar, you extend your knees to lift the weight. This exercise helps build strength and definition in the quads, especially the upper portion of the muscle.",
      },
      {
        title: "Barbell Step Up",
        video: "/public/exercices/Barbell Step Up.mp4",
        description:
          "The Barbell Step-Up is a lower body exercise that targets the quads, glutes, and hamstrings. By stepping up onto a platform or bench while holding a barbell across the shoulders, it helps improve leg strength, balance, and stability.",
      },
    ],
    forearms: [
      {
        title: "Chin Ups",
        video: "/public/exercices/Chin Ups.mp4",
        description:
          "Chin-Ups primarily target the biceps and back muscles, especially the lats. By gripping the bar with your palms facing towards you, this exercise helps build upper body strength, focusing on the arms, shoulders, and core stability.",
      },
      {
        title: "Dumbbell Row Unilateral",
        video: "/public/exercices/Dumbbell Row Unilateral.mp4",
        description:
          "The Dumbbell Unilateral Row is a single-arm exercise that targets the back muscles, particularly the lats, rhomboids, and traps. By rowing a dumbbell with one arm while supporting your body with the opposite hand and knee on a bench, it helps improve muscle imbalances, strength, and overall back development.",
      },
      {
        title: "Dumbbell Reverse Curl",
        video: "/public/exercices/Dumbbell Reverse Curl.mp4",
        description:
          "The Dumbbell Reverse Curl targets the brachioradialis (forearm muscle) and the brachii (biceps) with a focus on the lower portion of the biceps. By holding the dumbbells with a pronated (palms down) grip and curling the weights up, it helps improve arm strength, forearm development, and grip strength.",
      },
      {
        title: "Barbell Reverse Curl",
        video: "/public/exercices/Barbell Reverse Curl.mp4",
        description:
          "The Barbell Reverse Curl is a bicep exercise that targets the brachioradialis (forearm muscle) and the biceps, particularly the lower part. By using an overhand (pronated) grip on the barbell and curling it towards the body, this movement enhances forearm strength and muscle definition in the upper arm.",
      },
    ],
    back: [
      {
        title: "Pull-Ups",
        video: "/public/exercices/Pull Ups.mp4",
        description:
          "Pull-ups effectively target the lats and upper back. Hang from a bar with arms fully extended, then pull yourself up until your chin is over the bar.",
      },
      {
        title: "Barbell Bent Over Row",
        video: "/public/exercices/Barbell Bent Over Row.mp4",
        description:
          "This exercise targets the middle back muscles. Bend forward at the hips with a slight knee bend, hold a barbell with hands shoulder-width apart, then pull it toward your lower chest.",
      },
      {
        title: "Lat Pulldowns",
        video: "/public/exercices/Machine Pulldown.mp4",
        description:
          "Lat pulldowns target the latissimus dorsi. Sit at a pulldown station, grab the bar with a wide grip, then pull it down to chest level while keeping your back slightly arched.",
      },
      {
        title: "Machine Plate Loaded T Bar Row",
        video: "/public/exercices/Machine Plate Loaded T Bar Row.mp4",
        description:
          "The Machine Plate Loaded T-Bar Row targets the upper back, including the lats, rhomboids, and traps. By gripping a T-bar handle and rowing it towards the chest while seated, it helps build back strength and thickness, while also engaging the biceps and shoulders.",
      },
    ],
    traps: [
      {
        title: "Barbell Silverback Shrug",
        video: "/public/exercices/Barbell Silverback Shrug.mp4",
        description:
          "The Barbell Silverback Shrug is an exercise that targets the upper traps. By holding a barbell with both hands and shrugging the shoulders upward in a controlled motion, it helps build strength and size in the traps, improving upper back stability and posture.",
      },
      {
        title: "Cable 30 Degree Shrug",
        video: "/public/exercices/Cable 30 Degree Shrug.mp4",
        description:
          "The Cable 30 Degree Shrug targets the upper traps by using a cable machine set at a slight angle. By standing and pulling the cable handles upward with your shoulders at a 30-degree angle, it provides continuous tension throughout the movement, helping to build strength and size in the traps.",
      },
      {
        title: "Dumbbell Shrug",
        video: "/public/exercices/Dumbbell Shrug.mp4",
        description:
          "The Dumbbell Shrug targets the upper traps. By holding a dumbbell in each hand and shrugging your shoulders upward toward your ears, this exercise helps build strength and size in the upper back and improve shoulder stability.",
      },
      {
        title: "Barbell Upright Row",
        video: "/public/exercices/Barbell Upright Row.mp4",
        description:
          "The Barbell Upright Row targets the shoulders, particularly the traps and deltoids. By lifting a barbell from waist height to chin level, keeping the elbows higher than the hands, this exercise helps build upper back strength and shoulder definition. It also engages the biceps and forearms to a lesser extent.",
      },
    ],
    posteriorDeltoids: [
      {
        title: "Cable Rope Face Pulls",
        video: "/public/exercices/Cable Rope Face Pulls.mp4",
        description:
          "The Cable Rope Face Pull targets the posterior deltoids, upper traps, and the muscles of the upper back. By pulling a rope attachment towards your face with your elbows flared out, this exercise helps improve shoulder health, posture, and strengthens the rear delts, contributing to a balanced shoulder development.",
      },
      {
        title: "Machine Reverse Fly",
        video: "/public/exercices/Machine Reverse Fly.mp4",
        description:
          "The Machine Reverse Fly targets the posterior deltoids, traps, and rhomboids. By sitting on the machine and extending your arms outward against resistance, it helps strengthen the upper back and shoulders, improving posture and overall shoulder stability.",
      },
      {
        title: "Dumbbell Seated Rear Delt Fly",
        video: "/public/exercices/Dumbbell Seated Rear Delt Fly.mp4",
        description:
          "The Dumbbell Seated Rear Delt Fly targets the posterior deltoids and upper back muscles. While seated and holding dumbbells, you extend your arms out to the sides in a controlled motion, focusing on squeezing the shoulder blades together. This exercise helps improve shoulder stability, posture, and strengthens the rear delts.",
      },
      {
        title: "Band Pull Apart",
        video: "/public/exercices/Band Pull Apart.mp4",
        description:
          "The Band Pull Apart is an exercise that targets the posterior deltoids, traps, and upper back muscles. By holding a resistance band with both hands and pulling it apart while keeping your arms extended in front of you, it helps improve shoulder stability, posture, and upper back strength. This exercise also promotes scapular mobility and enhances shoulder health.",
      },
    ],
    triceps: [
      {
        title: "Cable Rope Pushdown",
        video: "/public/exercices/Cable Rope Pushdown.mp4",
        description:
          "The Cable Rope Pushdown is a tricep exercise that targets all three heads of the triceps. By using a rope attachment on a cable machine, you push the rope downward while keeping your elbows close to your body. This movement helps build tricep strength and muscle definition, focusing on the long head of the triceps for a fuller look.",
      },
      {
        title: "Barbell Close Grip Bench Press",
        video: "/public/exercices/Barbell Close Grip Bench Press.mp4",
        description:
          "The Barbell Close Grip Bench Press targets the triceps, chest, and shoulders. By narrowing your hand placement on the barbell, you emphasize the triceps more than in the regular bench press. This variation helps build upper body pressing strength and improves tricep definition.",
      },
      {
        title: "Dumbbell Skullcrusher",
        video: "/public/exercices/Dumbbell Skullcrusher.mp4",
        description:
          "The Dumbbell Skullcrusher targets the triceps, particularly the long head. Lying on a bench, you hold dumbbells above your chest, then lower them towards your forehead by bending your elbows. This exercise helps build tricep strength and size, improving overall arm definition.",
      },
      {
        title: "Bench Dips",
        video: "/public/exercices/Bench Dips.mp4",
        description:
          "Bench Dips target the triceps, chest, and shoulders. By placing your hands on a bench behind you and lowering your body by bending your elbows, you engage the triceps to lift your body back up. This exercise helps build upper body strength and tone the arms, particularly the triceps.",
      },
    ],
    glutes: [
      {
        title: "Barbell Squat",
        video: "/public/exercices/Barbell Squat.mp4",
        description:
          "The Barbell Squat is a compound lower-body exercise that primarily targets the quads, hamstrings, and glutes. By positioning a barbell across your shoulders and squatting down, you strengthen the legs, improve core stability, and build overall lower-body strength. It's a fundamental movement for developing muscle mass and power.",
      },
      {
        title: "Barbell Stiff Leg Deadlifts",
        video: "/public/exercices/Barbell Stiff Leg Deadlifts.mp4",
        description:
          "The Barbell Stiff Leg Deadlift primarily targets the hamstrings, glutes, and lower back. By keeping your legs slightly bent and lowering the barbell towards the ground while maintaining a straight back, this exercise helps to strengthen the posterior chain and improve flexibility in the hamstrings. It also engages the core for stability.",
      },
      {
        title: "Barbell Hip Thrust",
        video: "/public/exercices/Barbell Hip Thrust.mp4",
        description:
          "The Barbell Hip Thrust primarily targets the glutes, hamstrings, and core. By positioning your upper back on a bench and placing a barbell across your hips, you thrust your hips upward, engaging the glutes and building strength in the lower body. This exercise helps develop hip extension power and improve overall glute strength.",
      },
      {
        title: "Dumbbell Goblet Squat",
        video: "/public/exercices/Dumbbell Goblet Squat.mp4",
        description:
          "The Dumbbell Goblet Squat targets the quads, glutes, and hamstrings. Holding a dumbbell close to your chest, you squat down while keeping your back straight and chest up. This variation helps improve squat form, builds lower body strength, and enhances core stability. It's great for beginners or those focusing on form and mobility.",
      },
    ],
    hamstrings: [
      {
        title: "Barbell Stiff Leg Deadlifts",
        video: "/public/exercices/Barbell Stiff Leg Deadlifts.mp4",
        description:
          "The Barbell Stiff Leg Deadlift is an excellent intermediate exercise targeting the hamstrings, glutes, and lower back. To perform this movement, keep your legs slightly bent, engage your core, and lower the barbell while maintaining a straight back. It builds strength and flexibility in the posterior chain, especially in the hamstrings, and helps improve hip hinge mechanics. It's crucial to maintain proper form to avoid strain on the lower back.",
      },
      {
        title: "Glute Ham Raise",
        video: "/public/exercices/Glute Ham Raise.mp4",
        description:
          "The Glute Ham Raise is a powerful exercise that targets the glutes, hamstrings, and lower back. By lowering your body towards the ground and then lifting yourself back up using your glutes and hamstrings, this movement builds strength, stability, and muscle definition in the posterior chain. It's particularly effective for improving hamstring strength and glute activation.",
      },
      {
        title: "Machine Hamstring Curl",
        video: "/public/exercices/Machine Hamstring Curl.mp4",
        description:
          "The Machine Hamstring Curl isolates the hamstrings. While seated or lying on the machine, you curl the weight towards your glutes by flexing your knees, engaging the hamstring muscles. This exercise helps strengthen the hamstrings and improve muscle definition in the back of the legs. It's great for targeting the hamstrings with controlled resistance.",
      },
      {
        title: "Barbell Low Bar Good Morning",
        video: "/public/exercices/Barbell Low Bar Good Morning.mp4",
        description:
          "The Barbell Low Bar Good Morning is an effective posterior chain exercise targeting the hamstrings, glutes, and lower back. By positioning a barbell across your back and hinging at the hips, you engage the hamstrings and glutes, improving hip extension and strengthening the lower body. This movement also helps with flexibility and posture, while building strength in the back muscles.",
      },
    ],
    calves: [
      {
        title: "Machine Standing Calf Raises",
        video:
          "/MUSCLES SELECTION FOLDER/exercices/Machine Standing Calf Raises.mp4",
        description:
          "The Machine Standing Calf Raise targets the calf muscles, specifically the soleus and gastrocnemius. By standing on the machine with your toes on a platform and the weight resting on your hips, you raise your heels, contracting your calves. This exercise helps build calf strength and muscle definition, focusing on improving ankle stability and lower leg power.",
      },
      {
        title: "Machine Seated Calf Raises",
        video: "/public/exercices/Machine Seated Calf Raises.mp4",
        description:
          "The Machine Seated Calf Raise targets the lower portion of the calf muscles, particularly the soleus. While seated with your knees bent and the weight placed on your thighs, you raise your heels, focusing on calf contraction. This exercise helps strengthen and define the calves, especially the deeper muscles, by isolating them in a seated position.",
      },
      {
        title: "Barbell Calf Raises",
        video: "/public/exercices/Barbell Calf Raises.mp4",
        description:
          "The Barbell Calf Raise targets the calf muscles, specifically the gastrocnemius and soleus. By positioning a barbell across your shoulders and standing with your toes on a raised platform, you raise your heels as high as possible, focusing on contracting the calves. This exercise helps build calf strength and definition, and can be performed with various stances to target different parts of the calves.",
      },
      {
        title: "Calves Stretch Variation One",
        video: "/public/exercices/Calves Stretch Variation One.mp4",
        description:
          "A Calf Stretch Variation One can be done by standing with your feet shoulder-width apart, then stepping one foot back while keeping the back heel on the ground. Bend the front knee and lean forward, feeling a stretch in the calf of the back leg. Hold for 20-30 seconds, then switch legs. This stretch targets both the gastrocnemius and soleus muscles and helps improve flexibility and ankle mobility.",
      },
    ],
  };

  const handleMuscleClick = (muscle) => {
    setSelectedMuscle(muscle === selectedMuscle ? null : muscle);
    setExpandedExercise(null); // Collapse any open exercise when changing muscle
  };

  const toggleExerciseExpansion = (index) => {
    setExpandedExercise(expandedExercise === index ? null : index);
  };

  return (
    <div className="muscle-selection-page">
      <Header />

      <main className="muscle-selection-container">
        <div className="view-controls">
          <div className="view-toggle">
            <button
              className={`view-btn ${activeView === "front" ? "active" : ""}`}
              onClick={() => setActiveView("front")}
            >
              <i className="fas fa-user"></i> Front View
            </button>
            <button
              className={`view-btn ${activeView === "back" ? "active" : ""}`}
              onClick={() => setActiveView("back")}
            >
              <i className="fas fa-user"></i> Back View
            </button>
          </div>

          <div className="category-toggle">
            <button
              className={`toggle-btn ${
                activeCategory === "weightlifting" ? "active" : ""
              }`}
              onClick={() => setActiveCategory("weightlifting")}
            >
              <i className="fas fa-dumbbell"></i> Weightlifting
            </button>
            <button
              className={`toggle-btn ${
                activeCategory === "bodyweight" ? "active" : ""
              }`}
              onClick={() => setActiveCategory("bodyweight")}
            >
              <i className="fas fa-running"></i> Bodyweight
            </button>
            <button
              className={`toggle-btn ${
                activeCategory === "stretches" ? "active" : ""
              }`}
              onClick={() => setActiveCategory("stretches")}
            >
              <i className="fas fa-spa"></i> Stretches
            </button>
          </div>
        </div>

        <div className="muscle-selection-content">
          <div className="muscle-figure-container">
            <MuscleFigure
              view={activeView}
              onMuscleClick={handleMuscleClick}
              selectedMuscle={selectedMuscle}
            />
          </div>

          {selectedMuscle && (
            <div className="muscle-info">
              <div className="muscle-details" data-muscle={selectedMuscle}>
                <h3>
                  {selectedMuscle.charAt(0).toUpperCase() +
                    selectedMuscle.slice(1)}
                </h3>
                <h4>Recommended Exercises:</h4>
                <div className="exercise-list">
                  {exercises[selectedMuscle]?.map((exercise, index) => (
                    <div
                      className={`exercise-item ${
                        expandedExercise === index ? "expanded" : ""
                      }`}
                      key={index}
                    >
                      <div
                        className="exercise-header"
                        onClick={() => toggleExerciseExpansion(index)}
                      >
                        <span className="exercise-title">{exercise.title}</span>
                        <span className="expand-icon">
                          {expandedExercise === index ? "▼" : "▶"}
                        </span>
                      </div>
                      <div
                        className={`exercise-content ${
                          expandedExercise === index ? "visible" : ""
                        }`}
                      >
                        <div className="video-container">
                          <video controls muted>
                            <source src={exercise.video} type="video/mp4" />
                            {exercise.video && (
                              <p>Video not found: {exercise.video}</p>
                            )}
                            Your browser does not support the video tag.
                          </video>
                        </div>
                        <div className="exercise-description">
                          <p>{exercise.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}