import Phaser from "phaser";
import game from "./game.js";
class StartMenu extends Phaser.Scene {
	constructor() {
		super("StartMenu");
	}

	init(data) {
		console.log(data);
	}

	preload() {
		this.load.image("forestBG", "./assets/backgrounds/forestBG.png");
		this.load.image("menuLogo", "./assets/menu/startLogo.png");
		this.load.image("playButton", "./assets/menu/playButton.png");
		this.load.image("blackSushi", "./assets/food/sushi1.png");
	}

	create() {
		this.add
			.image(385, 230, "forestBG")
			.setOrigin(0)
			.setDepth(0)
			.setScale(1.3);
		this.add.image(150, 200, "menuLogo").setDepth(1);
		this.add.image(100, 150, "playButton").setDepth(1);
		setTimeout(() => {
			game.scene.start("Main");
		}, 1000);
	}
}
export default StartMenu;
