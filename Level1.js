import Phaser from "phaser";

class Level1 extends Phaser.Scene {
	constructor() {
		super("Level1");
	}

	init(data) {
		// used to prepare data
	}

	preload() {
		this.load.image("forestBG", "./assets/backgrounds/forestBG.png");
		this.load.image("longTile", "./assets/platforms/bigTile.png");
		this.load.image("mediumTile", "./assets/platforms/medTile.png");
		this.load.image("tinyTile", "./assets/platforms/tinyTile.png");
		this.load.image("fish", "./assets/food/fish.png");

		this.load.spritesheet("idle", "./assets/knight/MK-Idle.png", {
			frameWidth: 64,
			frameHeight: 48,
		});
		this.load.spritesheet("run", "./assets/knight/MK-Run.png", {
			frameWidth: 64,
			frameHeight: 48,
		});
		this.load.spritesheet("jump", "./assets/knight/MK-Jump.png", {
			frameWidth: 64,
			frameHeight: 48,
		});
		this.load.spritesheet("attack1", "./assets/knight/MK-Attack1.png", {
			frameWidth: 64,
			frameHeight: 48,
		});
		this.load.spritesheet("attack2", "./assets/knight/MK-Attack2.png", {
			frameWidth: 64,
			frameHeight: 48,
		});
		this.load.spritesheet("attack3", "./assets/knight/MK-Attack3.png", {
			frameWidth: 64,
			frameHeight: 48,
		});
		this.load.spritesheet("attack4", "./assets/knight/MK-Attack4.png", {
			frameWidth: 64,
			frameHeight: 48,
		});
		this.load.spritesheet("death", "./assets/knight/MK-Death.png", {
			frameWidth: 64,
			frameHeight: 48,
		});
		this.load.spritesheet("dodge", "./assets/knight/MK-Dodge.png", {
			frameWidth: 64,
			frameHeight: 48,
		});
		this.load.spritesheet("damage", "./assets/knight/MK-Damage.png", {
			frameWidth: 64,
			frameHeight: 48,
		});

		this.load.audio(
			"main-audio",
			"./assets/music/zelda-spirit-lullaby.mp3"
		);
		this.load.audio("excalipurr", "./assets/music/ultimate-meow.mp3");
	}

	create() {
		this.add.image(0, 0, "forestBG").setOrigin(0).setDepth(0).setScale(1.3);

		idleKnight = this.physics.add
			.sprite(385, 250, "idle")
			.setScale(3)
			.setDepth(1);

		idleKnight.body.setSize(16, 16);
		idleKnight.setBounce(0.1);
		idleKnight.setCollideWorldBounds(true);

		cursor = this.input.keyboard.addKeys(
			"W, A, S, D, up, left, right, down, space, shift, E, Q, X, Y, M"
		);

		mainAudio = this.sound.add("main-audio");
		excalipurr = this.sound.add("excalipurr");
		mainAudio.play({ volume: 0.1, rate: 0.6, detune: 10, loop: true });
	}

	update(time, delta) {}
}

export default Level1;
