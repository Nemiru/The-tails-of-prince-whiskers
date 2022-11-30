import Phaser from "phaser";

// **CONSTANTS**
let idleKnight;
let cursor;
let jump;
let dodge;
let platforms;
let mainAudio;
let excalipurr;
let knightFloor;
let isRunning, isJumping;

// platforms
let platformLong1;

function preload() {
	//background
	this.load.image("forestBackground", "./assets/backgrounds/forestBG.png");

	//platforms
	this.load.image("longTile", "./assets/platforms/bigTile.png");
	this.load.image("mediumTile", "./assets/platforms/medTile.png");
	this.load.image("tinyTile", "./assets/platforms/tinyTile.png");

	//Meow Knight
	// this.load.aseprite({
	// 	key: "meow-knight",
	// 	textureURL: "./assets/knight/MK-Sheet.png",
	// 	atlasURL: "./assets/knight/MK-Sheet.json",
	// });
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

	//audio
	this.load.audio("main-audio", "./assets/music/zelda-spirit-lullaby.mp3");
}

function create() {
	// **INPUTS**
	cursor = this.input.keyboard.addKeys(
		"W, A, S, D, up, left, right, down, space, shift, E, Q, X, Y, M"
	);
	//jump = this.input.keyboard.addKeys("W, up");

	// **BACKGROUND**
	this.add.image(385, 220, "forestBackground").setScale(1.3);

	// **AUDIO**
	mainAudio = this.sound.add("main-audio");
	mainAudio.play({ volume: 0.1, rate: 0.6, detune: 10, loop: true });

	// **CHARACTERS**
	// **KNIGHT**
	idleKnight = this.physics.add.sprite(300, 300, "idle").setScale(3);
	idleKnight.body.setSize(16, 16);
	idleKnight.setBounce(0.1);
	idleKnight.setCollideWorldBounds(true);

	// **PLATFORMS**
	platforms = this.physics.add.staticGroup();
	platforms.create(500, 600, "longTile").setScale(5).refreshBody();
	platforms.create(650, 450, "mediumTile").setScale(1.5).refreshBody();
	platforms.create(50, 350, "mediumTile");
	platforms.create(500, 350, "tinyTile").setScale(1.5);

	//Testing moving platforms:

	// **COLLIDERS**
	this.physics.add.collider(idleKnight, platforms);

	// **CAMERA**
	this.cameras.main.startFollow(this.idleKnight);

	// **ANIMATIONS**
	//this.anims.createFromAseprite("meow-knight");
	//left
	this.anims.create({
		key: "left",
		frames: this.anims.generateFrameNumbers("run"),
		frameRate: 4,
	});
	//right
	this.anims.create({
		key: "right",
		frames: this.anims.generateFrameNumbers("run"),
		frameRate: 4,
	});
	//idle
	this.anims.create({
		key: "idle",
		frames: this.anims.generateFrameNumbers("idle"),
		frameRate: 8,
		repeat: -1,
	});
	//jump
	this.anims.create({
		key: "jump",
		frames: this.anims.generateFrameNumbers("jump"),
		frameRate: 4,
	});
	//jumpStart
	this.anims.create({
		key: "jumpStart",
		frames: this.anims.generateFrameNumbers("jump", { start: 0, end: 2 }),
		frameRate: 4,
	});
	//jumpFinish
	this.anims.create({
		key: "jumpFinish",
		frames: this.anims.generateFrameNumbers("jump", { start: 3 }),
		frameRate: 4,
	});
	//dodge
	this.anims.create({
		key: "dodge",
		frames: this.anims.generateFrameNumbers("dodge"),
		frameRate: 4,
	});
	//attack1
	this.anims.create({
		key: "attack1",
		frames: this.anims.generateFrameNumbers("attack1"),
		frameRate: 4,
		repeat: 0,
	});
	//attack2
	this.anims.create({
		key: "attack2",
		frames: this.anims.generateFrameNumbers("attack2"),
		frameRate: 4,
		repeat: 0,
	});
	//attack3
	this.anims.create({
		key: "attack3",
		frames: this.anims.generateFrameNumbers("attack3"),
		frameRate: 4,
		repeat: 0,
	});
	//attack4
	this.anims.create({
		key: "attack4",
		frames: this.anims.generateFrameNumbers("attack4"),
		frameRate: 4,
		repeat: 0,
	});
	//damage
	this.anims.create({
		key: "damage",
		frames: this.anims.generateFrameNumbers("damage"),
		frameRate: 4,
		repeat: 0,
	});
	//death
	this.anims.create({
		key: "death",
		frames: this.anims.generateFrameNumbers("death"),
		frameRate: 4,
		repeat: 0,
	});
}

function update() {
	// functions
	const onFloor = idleKnight.body.touching.down;
	function move(character, direction) {
		isRunning = true;
		const floor = character.body.touching.down;
		if (direction === "left") {
			//console.log(floor);
			if (!isJumping) {
				character.anims.play("left", true);
			}
			character.setVelocityX(-120);
			character.flipX = true;
		} else if (direction === "right") {
			if (!isJumping) {
				character.anims.play("right", true);
			}
			character.setVelocityX(120);
			character.flipX = false;
		}
	}
	function jumpStart() {
		//console.log(onFloor);
		isJumping = true;
		idleKnight.anims.play("jumpStart");
		idleKnight.on("animationcomplete", () => {
			console.log("jump");
		});
	}
	function jumpFinish() {
		isJumping = true;
		idleKnight.anims.play("jumpFinish");
		idleKnight.setVelocityY(-260);
	}
	function dodge() {
		console.log("dodge");
		idleKnight.anims.play("dodge", true);
		idleKnight.body.velocityX *= 2;
	}

	// **JUMP**

	// on jump key press, start animation jumpStart
	this.input.keyboard.on("keydown-W", jumpStart);
	this.input.keyboard.on("keydown-up", jumpStart);
	// // on jump key release, start animation jumpFinish
	// this.input.keyboard.on("keyup-W", jumpFinish);
	// this.input.keyboard.on("keyup-up", jumpFinish);

	// **DODGE**
	// if (cursor.down.isDown || cursor.S.isDown) {w
	// 	idleKnight.anims.startAnimation("dodge");
	// 	idleKnight.setAccelerationX(20);
	// }

	// **MOVE**
	if (!isJumping) {
		if (cursor.left.isDown || cursor.A.isDown) {
			move(idleKnight, "left");
			this.input.keyboard.on("keydown-D", dodge);
			this.input.keyboard.on("keydown-down", dodge);

			// if (cursor.down.isDown || cursor.S.isDown) {
			// 	idleKnight.anims.play("dodge", true);
			// 	idleKnight.setVelocityX(-300);
			// }
			// idleKnight.setVelocityX(-120);
			// idleKnight.flipX = true;
			// idleKnight.anims.play("left", true);
		} else if (cursor.right.isDown || cursor.D.isDown) {
			move(idleKnight, "right");
			this.input.keyboard.on("keydown-D", dodge);
			this.input.keyboard.on("keydown-down", dodge);

			// if (cursor.down.isDown || cursor.S.isDown) {
			// 	idleKnight.anims.play("dodge", true);
			// 	idleKnight.setVelocityX(300);
			// }
			// idleKnight.flipX = false;
			// idleKnight.setVelocityX(120);
			// idleKnight.anims.play("right", true);
		} else {
			idleKnight.setVelocityX(0);
			idleKnight.anims.play("idle", true);
		}
	}

	//if(excalipurr=true in attack4)
	//if(excalipurr && !audio.isPlaying) {play meow audio}
}

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
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
});

export default game;
