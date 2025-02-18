import React, { useState, useEffect } from "react";
import { workoutProgram as trainingPlan } from "../utils/index.js";
import WorkoutCard from "./WorkoutCard";

export default function Grid() {
	const [savedWorkouts, setSavedWorkouts] = useState(null);
	const [selectedWorkout, setSelectedWorkout] = useState(null);
	const completedWorkouts = Object.keys(savedWorkouts || {}).filter(
		(value) => {
			const entry = savedWorkouts[value];
			return entry.isComplete;
		}
	);

	function handleSave(index, data) {
		// save to local storage and modify the saved workouts state
		const newObject = {
			...savedWorkouts,
			[index]: {
				...data,
				isComplete:
					(data.isComplete ? true : false) ||
					(savedWorkouts?.[index]?.isComplete ? true : false),
			},
		};

		setSavedWorkouts(newObject);
		localStorage.setItem("brotein", JSON.stringify(newObject));
		setSelectedWorkout(null);

		console.log("Saving Weights:", data.weights);
		console.log("New Saved Workouts Object:", newObject);
	}

	function handleComplete(index, data) {
		// mark the workout as completed and update the completed workouts state
		const newObject = { ...data };
		newObject.isComplete = true;
		handleSave(index, newObject);
	}

	useEffect(() => {
		if (!localStorage) return;
		let savedData = {};
		if (localStorage.getItem("brotein")) {
			savedData = JSON.parse(localStorage.getItem("brotein"));
		}

		console.log("Saved Data from Local Storage:", savedData);
		setSavedWorkouts(savedData);
	}, []);

	return (
		<div className="training-plan-grid">
			{Object.keys(trainingPlan).map((workout, workoutIndex) => {
				const isLocked =
					workoutIndex === 0
						? false
						: !completedWorkouts.includes(`${workoutIndex - 1}`);
				// console.log(workoutIndex, isLocked);
				const workoutType =
					workoutIndex % 3 === 0
						? "Push"
						: workoutIndex % 3 === 1
						? "Pull"
						: "Legs";

				const trainingDayPlan = trainingPlan[workoutIndex];

				const dayNumber =
					workoutIndex / 8 <= 1
						? "0" + (workoutIndex + 1)
						: workoutIndex + 1;

				const icon =
					workoutIndex % 3 === 0 ? (
						<i className="fa-solid fa-dumbbell"></i>
					) : workoutIndex % 3 === 1 ? (
						<i className="fa-solid fa-weight-hanging"></i>
					) : (
						<i className="fa-solid fa-bolt"></i>
					);

				if (workoutIndex === selectedWorkout) {
					return (
						<WorkoutCard
							key={workoutIndex}
							trainingDayPlan={trainingDayPlan}
							workoutIndex={workoutIndex}
							workoutType={workoutType}
							dayNumber={dayNumber}
							icon={icon}
							handleSave={handleSave}
							handleComplete={handleComplete}
							savedWeights={
								savedWorkouts?.[workoutIndex]?.weights ?? {}
							}
						/>
					);
				}

				return (
					<button
						onClick={() => {
							if (isLocked) return;
							setSelectedWorkout(workoutIndex);
						}}
						key={workoutIndex}
						className={
							"card plan-card " + (isLocked ? "inactive " : "")
						}
					>
						<div className="plan-card-header">
							<p>Day {dayNumber}</p>
						</div>
						{isLocked ? <i className="fa-solid fa-lock"></i> : icon}
						<div className="plan-card header">
							<h4>
								<b>{workoutType}</b>
							</h4>
						</div>
					</button>
				);
			})}
		</div>
	);
}
