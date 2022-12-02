import Phaser from "phaser";
import eventsCenter from "./EventsCenter.js";

class Score extends Phaser.Scene {
	constructor() {
		super("Score");
	}

	init(data) {}

	preload() {}

	create(data) {
		// let score = data;
		// console.log("score:", score);
		// this.score = score;
		// console.log("this.score:", this.score);
		this.scoreText = this.add.text(0, 0, "Food collected: 0", {
			fontSize: "16px",
			fill: "#FFF",
		});
		eventsCenter.on("update-score", this.updateScore, this);
	}

	updateScore(score) {
		console.log("update", score);
		this.scoreText.text = `Food collected: ${score}`;
	}

	update(time, delta) {}
}

export default Score;
