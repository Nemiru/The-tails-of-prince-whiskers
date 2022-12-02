import Phaser from "phaser";
import eventsCenter from "./EventsCenter.js";

// **CONSTANTS**
//var score = 0;
var scoreText;
var forestBackground;
let movingMedPlat;
let movingTinyPlat;
let idleKnight, enemyDog;
let cursor;
let shop;
let lamp;
let sign;
let fence;
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
let dogActive = false;
let isRunning = false;
let isJumping = false;
let isDodging = false;

// platforms
let platformLong1;
class Main extends Phaser.Scene {
	constructor() {
		super("Main");
	}
	init(data) {}
	preload() {
		//loading
		// this.load.image("loading", "./assets/loading.png");
		// this.add.image(385, 250, "loading");
		this.add.text(350, 250, "LOADING...");

		//background
		this.load.image(
			"forestBackground",
			"./assets/backgrounds/forestBG.png"
		);

		//platforms
		this.load.image("bigTile", "./assets/platforms/bigTile.png");
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

		// **ENEMY**
		// this.load.spritesheet("dog-idle", "./assets/enemy/Dog-Idle.png", {
		// 	frameWidth: 64,
		// 	frameHeight: 32,
		// });
		// this.load.spritesheet("dog-run", "./assets/enemy/Dog-Run.png", {
		// 	frameWidth: 64,
		// 	frameHeight: 32,
		// });

		//DECORATIONS
		this.load.spritesheet("shop", "./assets/decorations/shop_anim.png", {
			frameWidth: 118,
			frameHeight: 118,
		});
		this.load.image("lamp", "./assets/decorations/lamp.png");
		this.load.image("fence", "./assets/decorations/fence_1.png");
		this.load.image("sign", "./assets/decorations/sign.png");

		//audio
		this.load.audio(
			"main-audio",
			"./assets/music/zelda-spirit-lullaby.mp3"
		);
		this.load.audio("excalipurr", "./assets/music/ultimate-meow.mp3");
	}

	create(data) {
		// **INPUTS**
		cursor = this.input.keyboard.addKeys(
			"W, A, S, D, up, left, right, down, space, shift, E, Q, X, Y, M"
		);

		// // **BACKGROUND**
		//this.add.image(385, 230, "forestBackground").setScale(1.3);

		// **MOVING BACKGROUND**
		this.forestBackground = this.add.tileSprite(
			385,
			250,
			2695,
			500,
			"forestBackground"
		);
		this.forestBackground.fixedToCamera = true;

		// **WORLD BOUNDS**
		this.physics.world.setBounds(-800, 0, 1540, 500);

		// **AUDIO**
		mainAudio = this.sound.add("main-audio");
		excalipurr = this.sound.add("excalipurr");
		mainAudio.play({ volume: 0.1, rate: 0.6, detune: 10, loop: true });

		// **SCORE
		this.score = 0;
		this.scene.launch("Score");

		// **CHARACTERS**
		// **KNIGHT**
		idleKnight = this.physics.add.sprite(385, 250, "idle").setScale(3);
		idleKnight.body.setSize(16, 16);
		idleKnight.setBounce(0.1);
		idleKnight.setCollideWorldBounds(true);

		// **ENEMY**
		// enemyDog = this.physics.add.sprite(100, 430, "dog-idle").setScale(2.5);
		// enemyDog.setSize(48, 32);
		// enemyDog.setCollideWorldBounds(true);

		// **CAMERA**
		this.cameras.main
			.setViewport(770, 500, -385, -250)
			.setBounds(
				0,
				500,
				this.forestBackground.width,
				this.forestBackground.height
			);

		//const cam1 = this.cameras.add(770, 500);
		this.cameras.main.startFollow(idleKnight, true, 1, 0);
		//cam1.startFollow(idleKnight);

		// **PLATFORMS**
		platforms = this.physics.add.staticGroup();
		// platforms.create(500, 600, "longTile").setScale(5).refreshBody();
		platforms.create(650, 440, "mediumTile").setScale(1.5).refreshBody();
		platforms.create(500, 350, "tinyTile").setScale(1.5).refreshBody();
		platforms.create(-50, 300, "mediumTile").setScale(1.5).refreshBody();
		platforms.create(-250, 250, "bigTile").setScale(1.5).refreshBody();
		platforms.create(-420, 350, "tinyTile").setScale(1.5).refreshBody();

		// **MOVING PLATFORMS**
		movingMedPlat = this.physics.add
			.image(200, 300, "mediumTile")
			.setScale(1.5);
		movingMedPlat.setImmovable(true);
		movingMedPlat.body.allowGravity = false;
		movingMedPlat.setVelocityX(50);
		this.physics.add.collider(idleKnight, movingMedPlat);

		movingTinyPlat = this.physics.add
			.image(100, 300, "tinyTile")
			.setScale(1.5);
		movingTinyPlat.setImmovable(true);
		movingTinyPlat.body.allowGravity = false;
		movingTinyPlat.setVelocityY(50);
		this.physics.add.collider(idleKnight, movingTinyPlat);

		// **FOOD**
		// sushis = this.physics.add.group({
		// 	key: "sushi1",
		// 	repeat: 2,
		// 	setXY: { x: 100, y: 100, stepX: 120 },
		// 	setScale: { x: 1.5, y: 1.5 },
		// });

		// this.physics.add.overlap(idleKnight, sushis, collectSushi);
		// this.physics.add.collider(sushis, platforms);
		// this.physics.add.collider(sushis, movingMedPlat);
		// this.physics.add.collider(sushis, movingTinyPlat);

		// function collectSushi(idleKnight, sushis) {
		// 	sushis.disableBody(true, true);
		// 	++this.score;
		// 	eventsCenter.emit("update-score", this.score);
		// }

		let fish1 = this.physics.add.image(-420, 300, "fish").setScale(1.5);
		this.physics.add.collider(fish1, platforms);
		this.physics.add.collider(idleKnight, fish1, () => {
			fish1.destroy();
			++this.score;
			eventsCenter.emit("update-score", this.score);
		});

		let shrimp1 = this.physics.add.image(-190, 100, "shrimp").setScale(1.5);
		this.physics.add.collider(shrimp1, platforms);
		this.physics.add.collider(idleKnight, shrimp1, () => {
			shrimp1.destroy();
			++this.score;
			eventsCenter.emit("update-score", this.score);
		});

		let salmon1 = this.physics.add.image(220, 100, "salmon").setScale(1.5);
		this.physics.add.collider(salmon1, movingMedPlat);
		this.physics.add.collider(idleKnight, salmon1, () => {
			salmon1.destroy();
			++this.score;
			eventsCenter.emit("update-score", this.score);
		});

		sushi2 = this.physics.add.image(500, 300, "sushi2").setScale(1.5);
		this.physics.add.collider(sushi2, platforms);
		this.physics.add.collider(idleKnight, sushi2, () => {
			sushi2.destroy();
			++this.score;
			eventsCenter.emit("update-score", this.score);
		});

		let blkSushi1 = this.physics.add
			.image(100, 100, "sushi1")
			.setScale(1.5);
		this.physics.add.collider(blkSushi1, movingTinyPlat);
		this.physics.add.collider(idleKnight, blkSushi1, () => {
			blkSushi1.destroy();
			++this.score;
			eventsCenter.emit("update-score", this.score);
		});

		// **SHOP**
		shop = this.physics.add
			.sprite(-650, 365, "shop")
			.setScale(2.2)
			.setDepth(0);
		shop.setImmovable(true);
		shop.body.allowGravity = false;
		//shop.bringTotop(idleKnight);
		//idleKnight.bringTotop(shop);
		this.physics.add.collider(shop, idleKnight);

		sign = this.physics.add.image(630, 398, "sign").setScale(1.2);
		sign.setImmovable(true);
		sign.body.allowGravity = false;
		lamp = this.physics.add.image(-200, 170, "lamp").setScale(2);
		lamp.setImmovable(true);
		lamp.body.allowGravity = false;
		// fence = this.physics.add.image(-400, 479, "fence").setScale(2);
		// fence.setImmovable(true);
		// fence.body.allowGravity = false;

		this.physics.add.collider(sign, lamp, idleKnight);

		// **SCORE SET-UP**

		// scoreText = this.add.text(0, 0, "Food collected: 0", {
		// 	fontSize: "16px",
		// 	fill: "#FFF",
		// });
		//scoreText.fixedToCamera = true;

		// **COLLIDERS**
		this.physics.add.collider(idleKnight, platforms);

		// **ANIMATIONS**
		//this.anims.createFromAseprite("meow-knight");
		//run
		this.anims.create({
			key: "run",
			frames: this.anims.generateFrameNumbers("run"),
			frameRate: 8,
			//repeat: -1,
		});
		// //right
		// this.anims.create({
		// 	key: "right",
		// 	frames: this.anims.generateFrameNumbers("run"),
		// 	frameRate: 8,
		// 	repeat: -1,
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
			frameRate: 8,
		});
		//jumpStart
		this.anims.create({
			key: "jumpStart",
			frames: this.anims.generateFrameNumbers("jump", {
				start: 0,
				end: 2,
			}),
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
			frameRate: 8,
		});
		//attack1
		this.anims.create({
			key: "attack1",
			frames: this.anims.generateFrameNumbers("attack1"),
			frameRate: 8,
			repeat: 0,
		});
		//attack2
		this.anims.create({
			key: "attack2",
			frames: this.anims.generateFrameNumbers("attack2"),
			frameRate: 8,
			repeat: 0,
		});
		//attack3
		this.anims.create({
			key: "attack3",
			frames: this.anims.generateFrameNumbers("attack3"),
			frameRate: 8,
			repeat: 0,
		});
		//attack4
		this.anims.create({
			key: "attack4",
			frames: this.anims.generateFrameNumbers("attack4"),
			frameRate: 8,
		});
		//damage
		this.anims.create({
			key: "damage",
			frames: this.anims.generateFrameNumbers("damage"),
			frameRate: 8,
			repeat: 0,
		});
		//death
		this.anims.create({
			key: "death",
			frames: this.anims.generateFrameNumbers("death"),
			frameRate: 8,
			repeat: 0,
		});
		//**ENEMY**
		//idle
		// this.anims.create({
		// 	key: "dog-idle",
		// 	frames: this.anims.generateFrameNumbers("dog-idle"),
		// 	frameRate: 8,
		// 	repeat: 0,
		// });
		//run
		// this.anims.create({
		// 	key: "dog-run",
		// 	frames: this.anims.generateFrameNumbers("dog-run"),
		// 	frameRate: 8,
		// 	repeat: -1,
		// });
		// ***DECORATIONS**
		//shop
		this.anims.create({
			key: "shop",
			frames: this.anims.generateFrameNumbers("shop"),
			frameRate: 8,
			repeat: -1,
		});
	}

	update(time, delta) {
		const knightAnim = idleKnight.anims.getName();
		//const dogAnim = enemyDog.anims.getName();
		const knightFloor = idleKnight.body.onFloor();
		const knightVel = idleKnight.body.velocityX;
		const jumpVelocity = -235;
		const scorePosition = 1540;
		// functions
		function move(character, direction) {
			isRunning = true;
			if (!isJumping && !isDodging) {
				//character.anims.stop();
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

			//idleKnight.setVelocityX(knightVel * 2);
			idleKnight.on("animationcomplete", () => {
				isDodging = false;
				//idleKnight.setVelocityX(knightVel / 2);
			});
		}

		// background
		this.forestBackground.tilePositionX = this.cameras.main.x;
		//scoreText.x = this.cameras.worldView.x;

		// shop
		shop.anims.play("shop", true);

		if ((cursor.up.isDown || cursor.W.isDown) && knightFloor) {
			checkJump();
			// **MOVE LEFT**
		} else if (cursor.left.isDown || cursor.A.isDown) {
			move(idleKnight, "left");
			// **DODGE LEFT**
			this.input.keyboard.on("keydown-S", dodge);
			this.input.keyboard.on("keydown-down", dodge);
			// **MOVE RIGHT**
		} else if (cursor.right.isDown || cursor.D.isDown) {
			move(idleKnight, "right");
			// **DODGE RIGHT**
			this.input.keyboard.on("keydown-S", dodge);
			this.input.keyboard.on("keydown-down", dodge);
			// **IDLE**
		} else {
			isRunning = false;
			idleKnight.setVelocityX(0);
			if (knightAnim === "run" || !knightAnim) {
				idleKnight.anims.play("idle", true);
			} else {
				idleKnight.on("animationcomplete", () => {
					idleKnight.anims.play("idle", true);
				});
			}
		}
		// **ATTACKS**
		this.input.keyboard.on("keydown-Q", () => {
			idleKnight.anims.stop();
			idleKnight.anims.play("attack1", true);
		});
		this.input.keyboard.on("keydown-X", () => {
			idleKnight.anims.stop();
			idleKnight.anims.play("attack2", true);
		});
		this.input.keyboard.on("keydown-F", () => {
			idleKnight.anims.stop();
			idleKnight.anims.play("attack3", true);
		});
		this.input.keyboard.on("keydown-E", () => {
			idleKnight.anims.stop();
			idleKnight.anims.play("attack4", true);
			excalipurr.play({ volume: 0.1, loop: false });
			idleKnight.on("animationcomplete", () => {
				excalipurr.stop();
			});
		});

		//if (cursor.E.justDown && !excalipurr.isPlaying) {
		// 	idleKnight.anims.stop();
		// 	idleKnight.anims.play("attack4", true);
		//
		// 	excalipurr.play();
		// else {
		// 	excalipurr.stop();
		// }
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
		// function sniff() {
		// 	enemyDog.setVelocityX(0);
		// 	enemyDog.anims.play("dog-idle", true);
		// }
		// console.log(enemyDog.x);
		// if (!dogAnim) {
		// 	enemyDog.flipX = true;
		// 	enemyDog.anims.play("dog-idle", true);
		// 	enemyDog.on("animationcomplete", () => {
		// 		dogActive = true;
		// 	});
		// }
		// if (dogActive) {

		// // ** ENEMY DOG */

		// if (enemyDog.x >= 550) {
		// 	//if (dogAnim !== "dog-idle") {
		// 	sniff();

		// 	enemyDog.on("animationcomplete", () => {
		// 		enemyDog.anims.stop();
		// 		enemyDog.flipX = false;
		// 		enemyDog.setVelocityX(-150);
		// 		enemyDog.anims.play("dog-run", true);
		// 	});
		// 	//}
		// } else if (enemyDog.x <= 100) {
		// 	//if (dogAnim !== "dog-idle") {
		// 	sniff(true);

		// 	enemyDog.on("animationcomplete", () => {
		// 		enemyDog.anims.stop();
		// 		enemyDog.flipX = true;
		// 		enemyDog.setVelocityX(150);

		// 		enemyDog.anims.play("dog-run", true);
		// 	});
		// 	//}
		// }
		// }
	}
}

export default Main;
