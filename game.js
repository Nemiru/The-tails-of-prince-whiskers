import Phaser from "phaser";
import StartMenu from "./startmenu.js";
import Main from "./Main.js";
import Level1 from "./level1.js";
import Level2 from "./level2.js";

const game = new Phaser.Game({
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
});

export default game;
