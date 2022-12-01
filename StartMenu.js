import Phaser from "phaser";
class StartMenu extends Phaser.Scene {
	constructor() {
		super("StartMenu");
	}

	init(data) {}

	preload() {
		this.load.image("princeCrown", "./assets/princeCrown.png");
		this.load.image("forestBG", "./assets/backgrounds/forestBG.png");
		this.load.image("menuLogo", "./assets/menu/startLogo.png");
		this.load.image("playButton", "./assets/menu/playButton.png");
		this.load.image("blackSushi", "./assets/food/sushi1.png");
	}

	create() {
		// **ADDING SPRITES/IMAGES

		this.add.image(0, 0, "forestBG").setOrigin(0).setDepth(0).setScale(1.3);
		this.add.image(400, 100, "menuLogo").setDepth(1).setScale(0.7);
		this.add.image(380, 250, "princeCrown").setScale(0.6);
		let hoverSushi = this.add.sprite(100, 100, "blackSushi");
		hoverSushi.setScale(2);
		hoverSushi.setVisible(false);

		let playButton = this.add
			.image(380, 350, "playButton")
			.setDepth(1)
			.setScale(0.6);

		// **INTERACTIVITY
		playButton.setInteractive();
		playButton.on("pointerover", () => {
			hoverSushi.setVisible(true);
			hoverSushi.x = playButton.x - 100;
			hoverSushi.y = playButton.y;
			//console.log("hovaering");
		});
		playButton.on("pointerout", () => {
			hoverSushi.setVisible(false);
			//console.log("No more ohver");
		});
		playButton.on("pointerup", () => {
			this.scene.start("Main");
			//console.log("WHISKERSSSSSSSSSSSS");
		});

		//** FOOTER TEXT */
		this.add.text(220, 470, "Created By Sasha, Melanie and Ihsan");
	}
}
export default StartMenu;
