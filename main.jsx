import Phaser from "phaser";

// **CONSTANTS**
var score = 0;
var scoreText;
var forestBackground;
let movingMedPlat;
let movingTinyPlat;
let idleKnight;
let cursor;
let jump;
let dodge;
let platforms;
let mainAudio;
let excalipurr;
let knightFloor;
let sushis;
var sushi1;
var sushi2;
var fish;
var salmon;
var shrimp;
let isRunning = false;
let isJumping = false;
let isDodging = false;

// platforms
let platformLong1;

function preload() {
	//background
	this.load.image("forestBackground", "./assets/backgrounds/forestBG.png");

	//platforms
	this.load.image("longTile", "./assets/platforms/bigTile.png");
	this.load.image("mediumTile", "./assets/platforms/medTile.png");
	this.load.image("tinyTile", "./assets/platforms/tinyTile.png");

	//Foodz
	this.load.image("sushi1", "./assets/food/sushi1.png");
	this.load.image("sushi2", "./assets/food/sushi2.png");
	this.load.image("salmon", "./assets/food/salmon.png");
	this.load.image("shrimp", "./assets/food/shrimp.png");
	this.load.image("fish", "./assets/food/fish.png");

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
	this.load.audio("excalipurr", "./assets/music/ultimate-meow.mp3");
}

function create() {
	// **INPUTS**
	cursor = this.input.keyboard.addKeys(
		"W, A, S, D, up, left, right, down, space, shift, E, Q, X, Y, M"
	);
	//jump = this.input.keyboard.addKeys("W, up");

	// **BACKGROUND**
	this.add.image(385, 230, "forestBackground").setScale(1.3);

	// **MOVING BACKGROUND**
	// this.forestBackground = this.add.tileSprite(
	// 	385,
	// 	250,
	// 	"forestBackground".width,
	// 	"forestBackground".height,
	// 	"forestBackground"
	// );

	// **AUDIO**
	mainAudio = this.sound.add("main-audio");
	mainAudio.play({ volume: 0.1, rate: 0.6, detune: 10, loop: true });

	// **CHARACTERS**
	// **KNIGHT**
	idleKnight = this.physics.add.sprite(385, 250, "idle").setScale(3);
	idleKnight.body.setSize(16, 16);
	idleKnight.setBounce(0.1);
	idleKnight.setCollideWorldBounds(true);

	// **ENEMY**

	// **CAMERA**
	//this.cameras.main.setViewport(770, 500, -385, -250);
	//const cam1 = this.cameras.add(770, 500);
	//this.cameras.main.startFollow(idleKnight);
	//cam1.startFollow(idleKnight);

	// **PLATFORMS**
	platforms = this.physics.add.staticGroup();
	platforms.create(500, 600, "longTile").setScale(5).refreshBody();
	platforms.create(650, 430, "mediumTile").setScale(1.5).refreshBody();
	platforms.create(500, 350, "tinyTile").setScale(1.3);

	// **MOVING PLATFORMS**
	movingMedPlat = this.physics.add
		.image(200, 300, "mediumTile")
		.setScale(1.5);
	movingMedPlat.setImmovable(true);
	movingMedPlat.body.allowGravity = false;
	movingMedPlat.setVelocityX(50);
	this.physics.add.collider(idleKnight, movingMedPlat);

	movingTinyPlat = this.physics.add.image(100, 300, "tinyTile").setScale(1.5);
	movingTinyPlat.setImmovable(true);
	movingTinyPlat.body.allowGravity = false;
	movingTinyPlat.setVelocityY(50);
	this.physics.add.collider(idleKnight, movingTinyPlat);

	// **FOOD**
	sushis = this.physics.add.group({
		key: "sushi1",
		repeat: 1,
		setXY: { x: 100, y: 100, stepX: 120 },
		setScale: { x: 1.5, y: 1.5 },
	});
	this.physics.add.overlap(idleKnight, sushis, collectSushi, null, this);
	this.physics.add.collider(sushis, platforms);
	this.physics.add.collider(sushis, movingMedPlat);
	this.physics.add.collider(sushis, movingTinyPlat);

	// **SCORE SET-UP**

	scoreText = this.add.text(16, 16, "Food collected: 0", {
		fontSize: "16px",
		fill: "#FFF",
	});

	// **COLLIDERS**
	this.physics.add.collider(idleKnight, platforms);

	// **ANIMATIONS**
	//this.anims.createFromAseprite("meow-knight");
	//run
	this.anims.create({
		key: "run",
		frames: this.anims.generateFrameNumbers("run"),
		frameRate: 4,
	});
	// //right
	// this.anims.create({
	// 	key: "right",
	// 	frames: this.anims.generateFrameNumbers("run"),
	// 	frameRate: 4,
	// });
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
		frameRate: 12,
	});
	//jumpFinish
	this.anims.create({
		key: "jumpFinish",
		frames: this.anims.generateFrameNumbers("jump", { start: 3 }),
		frameRate: 8,
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
	const knightAnim = idleKnight.anims.getName();
	const knightFloor = idleKnight.body.onFloor();
	const knightVel = idleKnight.body.velocityX;
	const jumpVelocity = -245;
	// functions
	function move(character, direction) {
		isRunning = true;
		if (!isJumping && !isDodging) {
			character.anims.play("run", true);
		}
		if (direction === "left") {
			character.setVelocityX(-120);
			character.flipX = true;
		} else if (direction === "right") {
			character.setVelocityX(120);
			character.flipX = false;
		}
	}
	function checkJump() {
		isJumping = true;
		idleKnight.anims.stop();
		idleKnight.anims.play("jumpStart", true);
		if (knightAnim === "jumpStart") {
			idleKnight.on("animationcomplete", () => {
				idleKnight.anims.play("jumpFinish");
				if (knightAnim === "jumpFinish") {
					jump();
				} else {
					idleKnight.anims.stop();
					idleKnight.anims.play("jumpFinish");
					jump();
				}
			});
		} else {
			idleKnight.anims.stop();
			idleKnight.anims.play("jumpFinish");
			jump();
		}
	}
	function jump() {
		if (knightAnim === "jumpFinish") {
			idleKnight.setVelocityY(jumpVelocity);
			if (cursor.left.isDown || cursor.A.isDown) {
				idleKnight.setVelocityX(-120);
				idleKnight.flipX = true;
			} else if (cursor.right.isDown || cursor.D.isDown) {
				idleKnight.setVelocityX(120);
				idleKnight.flipX = false;
			}
			idleKnight.on("animationcomplete", () => {
				isJumping = false;
			});
		} else {
			isJumping = false;
		}
	}
	function dodge() {
		isDodging = true;
		idleKnight.anims.stop();
		idleKnight.anims.play("dodge", true);

		idleKnight.setVelocityX(knightVel * 2);
		idleKnight.on("animationcomplete", () => {
			isDodging = false;
			idleKnight.setVelocityX(knightVel * 0.5);
		});
	}

	if ((cursor.up.isDown || cursor.W.isDown) && knightFloor) {
		checkJump();
		// **MOVE LEFT**
	} else if (cursor.left.isDown || cursor.A.isDown) {
		move(idleKnight, "left");
		// **DODGE LEFT**
		this.input.keyboard.on("keydown-S", dodge);
		this.input.keyboard.on("keydown-down", dodge);
		// if (cursor.down.isDown || cursor.S.isDown) {
		// 	dodge();
		// }
		// **MOVE RIGHT**
	} else if (cursor.right.isDown || cursor.D.isDown) {
		move(idleKnight, "right");
		// **DODGE RIGHT**
		this.input.keyboard.on("keydown-S", dodge);
		this.input.keyboard.on("keydown-down", dodge);
		// if (cursor.down.isDown || cursor.S.isDown) {
		// 	dodge();
		// }
		// **IDLE**
	} else {
		isRunning = false;
		idleKnight.setVelocityX(0);
		if (!isJumping) {
			idleKnight.anims.play("idle", true);
		}
	}

	//if(excalipurr=true in attack4)
	//if(excalipurr && !audio.isPlaying) {play meow audio}

	if (movingMedPlat.x >= 400) {
		movingMedPlat.setVelocityX(-50);
	} else if (movingMedPlat.x <= 200) {
		movingMedPlat.setVelocityX(50);
	}

	if (movingTinyPlat.y >= 300) {
		movingTinyPlat.setVelocityY(-50);
	} else if (movingTinyPlat.y <= 100) {
		movingTinyPlat.setVelocityY(50);
	}
}

function collectSushi(idleKnight, sushis) {
	sushis.disableBody(true, true);
	score += 1;
	scoreText.setText("Food collected: " + score);
}

// moving onto next page?

console.log("update", forestBackground);
//forestBackground.tilePositionX += 1;

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
