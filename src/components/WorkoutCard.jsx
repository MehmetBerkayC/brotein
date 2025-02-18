import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { exerciseDescriptions } from "../utils";

export default function WorkoutCard(props) {
	const {
		trainingDayPlan,
		workoutIndex,
		workoutType,
		dayNumber,
		icon,
		savedWeights,
		handleSave,
		handleComplete,
	} = props;

	const { warmup, workout } = trainingDayPlan || {};

	const [showExerciseDescription, setShowExerciseDescription] =
		useState(null);
	const [weights, setWeights] = useState(savedWeights || {});

	console.log("Previous weight data: ", savedWeights);
	// if the exercise exists update, if not make it and update the weights
	function handleAddWeight(title, weight) {
		console.log(title, weight);

		setWeights((prevWeights) => ({
			...prevWeights,
			[title]: weight,
		}));
	}

	// Update weights when savedWeights changes
	useEffect(() => {
		if (savedWeights) {
			setWeights(savedWeights);
		}
	}, [savedWeights]); // Runs whenever savedWeights changes

	return (
		<div className="workout-container">
			{showExerciseDescription && (
				<Modal
					showExerciseDescription={showExerciseDescription}
					handleCloseModal={() => {
						setShowExerciseDescription(null);
					}}
				/>
			)}
			<div className="workout-card card">
				<div className="plan-card-header">
					<p>Day {dayNumber}</p>
					{icon}
				</div>
				<div className="plan-card-header">
					<h2>
						<b>{workoutType} Workout</b>
					</h2>
				</div>
			</div>

			<div className="workout-grid">
				<div className="exercise-name">
					<h4>Warmup</h4>
				</div>
				<h6>Sets</h6>
				<h6>Reps</h6>
				<h6 className="weight-input">Max Weight</h6>
				{warmup &&
					warmup.map((warmupExercise, warmupIndex) => {
						return (
							<React.Fragment key={warmupIndex}>
								<div className="exercise-name">
									<p>
										{warmupIndex + 1}. {warmupExercise.name}
									</p>
									<button
										onClick={() => {
											setShowExerciseDescription({
												name: warmupExercise.name,
												description:
													exerciseDescriptions[
														warmupExercise.name
													],
											});
										}}
										className="help-icon"
									>
										<i className="fa-regular fa-circle-question"></i>
									</button>
								</div>
								<p className="exercise-info">
									{warmupExercise.sets}
								</p>
								<p className="exercise-info">
									{warmupExercise.reps}
								</p>
								<input
									className="weight-input"
									placeholder="N/A"
									disabled
								/>
							</React.Fragment>
						);
					})}
			</div>
			<div className="workout-grid">
				<div className="exercise-name">
					<h4>Workout</h4>
				</div>
				<h6>Sets</h6>
				<h6>Reps</h6>
				<h6 className="weight-input">Max Weight</h6>
				{workout &&
					workout.map((workoutExercise, _workoutIndex) => {
						return (
							<React.Fragment key={_workoutIndex}>
								<div className="exercise-name">
									<p>
										{_workoutIndex + 1}.{" "}
										{workoutExercise.name}
									</p>
									<button
										onClick={() => {
											setShowExerciseDescription({
												name: workoutExercise.name,
												description:
													exerciseDescriptions[
														workoutExercise.name
													],
											});
										}}
										className="help-icon"
									>
										<i className="fa-regular fa-circle-question"></i>
									</button>
								</div>
								<p className="exercise-info">
									{workoutExercise.sets}
								</p>
								<p className="exercise-info">
									{workoutExercise.reps}
								</p>
								<input
									value={weights[workoutExercise.name] || ""}
									onChange={(event) => {
										handleAddWeight(
											workoutExercise.name,
											event.target.value
										);
									}}
									className="weight-input"
									placeholder="14"
								/>
							</React.Fragment>
						);
					})}
			</div>

			<div className="workout-buttons">
				<button
					onClick={() => {
						handleSave(workoutIndex, { weights });
					}}
				>
					Save & Exit
				</button>
				<button
					onClick={() => {
						handleComplete(workoutIndex, { weights });
					}}
					disabled={Object.keys(weights).length !== workout.length}
				>
					Complete
				</button>
			</div>
		</div>
	);
}
