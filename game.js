import Phaser from "phaser";
import StartMenu from "./StartMenu.js";
import Main from "./Main.js";
import Level1 from "./Level1.js";
import Level2 from "./Level2.js";

const config = {
	type: Phaser.AUTO,
	width: 770,
	height: 500,
	backgroundColor: "#01171C",
	physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 300 },
			debug: true,
		},
	},
	scene: [StartMenu, Main, Level1, Level2],
	render: {
		pixelArt: true,
	},
};

const game = new Phaser.Game(config);

export default game;
