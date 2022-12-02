import Phaser from "phaser";
import StartMenu from "./StartMenu.js";
import Main from "./Main.js";
//import Level1 from "./Level1.js";
import Score from "./Score.js";

const config = {
	type: Phaser.AUTO,
	width: 770,
	height: 500,
	backgroundColor: "#01171C",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: false,
		},
	},
	scene: [StartMenu, Main, Score],
	render: {
		pixelArt: true,
	},
};

const game = new Phaser.Game(config);

export default game;
