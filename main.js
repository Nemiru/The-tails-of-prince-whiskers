import Phaser from "phaser";

const game = new Phaser.Game({
	type: Phaser.AUTO,
	width: 770,
	height: 500,
	backgroundColor: "#01171C",
	physics: {
		default: "arcade",
		arcade: { debug: true },
	},
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
});

let idleKnight;
let cursor;

function preload() {
	this.load.image("forestBackground", "./assets/forestBG.png");

	this.load.spritesheet("idle", "/Knight/Meow-Knight_Idle.png", {
		frameWidth: 16,
		frameHeight: 16,
	});
	this.load.spritesheet("run", "/Knight/Meow-Knight_Run.png", {
		frameWidth: 16,
		frameHeight: 16,
	});
	this.load.spritesheet("jump", "/Knight/Meow-Knight_Jump.png", {
		frameWidth: 16,
		frameHeight: 16,
	});

	this.load.spritesheet("attack1", "/Knight/Meow-Knight_Attack_1.png", {
		frameWidth: 16,
		frameHeight: 16,
	});
	this.load.spritesheet("attack2", "/Knight/Meow-Knight_Attack_2.png", {
		frameWidth: 16,
		frameHeight: 16,
	});
	this.load.spritesheet("attack3", "/Knight/Meow-Knight_Attack_3.png", {
		frameWidth: 16,
		frameHeight: 16,
	});
	this.load.spritesheet("attack4", "/Knight/Meow-Knight_Attack_4.png", {
		frameWidth: 16,
		frameHeight: 16,
	});

	this.load.spritesheet("death", "Knight/Meow-Knight_Death.png", {
		frameWidth: 16,
		frameHeight: 16,
	});
	this.load.spritesheet("dodge", "Knight/Meow-Knight_Dodge.png", {
		frameWidth: 16,
		frameHeight: 16,
	});
	this.load.spritesheet("damage", "Knight/Meow-Knight_Take_Damage.png", {
		frameWidth: 16,
		frameHeight: 16,
	});

	this.load.audio("main-audio", ["zelda-spirit-lullaby.mp3"]);
}

function create() {
	this.add.image(385, 220, "forestBackground").setScale(1.2);

	idleKnight = this.physics.add.sprite(300, 300, "idle").setScale(2);
	idleKnight.setBounce(0.2);
	idleKnight.setCollideWorldBounds(true);

	this.anims.create({
		key: "left",
		frames: this.anims.generateFrameNumbers("run", { start: 1, end: 8 }),
		frameRate: 10,
		repeat: -1,
	});

	this.anims.create({
		key: "right",
		frames: this.anims.generateFrameNumbers("run", { start: 1, end: 8 }),
		frameRate: 10,
		repeat: -1,
	});

	this.anims.create({
		key: "idle",
		frames: this.anims.generateFrameNumbers("idle", { start: 1, end: 6 }),
		frameRate: 10,
		repeat: -1,
	});
}

function update() {
	if (cursor.left.isDown) {
		idleKnight.setVelocityX(-120);
		idleKnight.flipX = true;
	} else if (cursor.right.isDown) {
		idleKnight.flipX = false;
		idleKnight.setVelocityX(120);
		idleKnight.anims.play("right", true);
	} else {
		idleKnight.setVelocityX(0);
		idleKnight.anims.play("idle", true);
	}
}
