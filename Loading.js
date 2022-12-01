import Phaser from "phaser";

class Loading extends Phaser.Scene {
	constructor() {
		super("Loading");
	}

	init(data) {
		// used to prepare data
	}

	preload() {
		this.load.image("loading", "./assets/loading.png");
		this.add.image(0, 0, "loading").setOrigin(0);
		// this.add.text(500, 100, "LOADING...");
	}

	create(data) {}

	update(time, delta) {}
}

export default Loading;
