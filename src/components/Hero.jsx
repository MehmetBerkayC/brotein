import React from "react";

export default function Hero() {
	return (
		<>
			<h5>Complete this training program if you want to ...</h5>
			<ol className="benefits-list">
				<li>Follow a simple program with guaranteed results</li>
				<li>Get fit, healthy and strong</li>
				<li>Learn about training and techniques</li>
				<li>Become a gym bro ❤️</li>
			</ol>
			<h3>The Rules</h3>
			<p>
				To complete this program, you <b>MUST</b> follow these 3 simple
				rules:
			</p>
			<ul className="rules-list">
				<div className="rule-item">
					<p>
						<b>Rest</b>
					</p>
					<p>Ensure you are resting your muscles to recover</p>
				</div>
				<div className="rule-item">
					<p>
						<b>Reps</b>
					</p>
					<p>
						Every rep is a pause rep following a{" "}
						<abbr title="2 seconds down - 2 seconds pause - 2 seconds up">
							2 - 2 - 2 tempo
						</abbr>{" "}
					</p>
				</div>
				<div className="rule-item">
					<p>
						<b>Weight*</b>
					</p>
					<p>
						Select the maximum weight that lets you complete the set
						with good form
					</p>
				</div>
			</ul>
			<small>
				* The first and second set should be at 75% and 85% of your
				working weight used for the last two sets
			</small>
			<h3>The Training Plan</h3>
			<p>
				This training plan uses a structure known as the <b>BroSplit</b>
				, and follows this rotation ⤵
			</p>
			<p>
				<b>
					<i>Push &rarr; Pull &rarr; Legs &rarr; Repeat</i>
				</b>
			</p>
			<p>
				Complete all of the workouts below and track your progress along
				the way!
			</p>
		</>
	);
}
