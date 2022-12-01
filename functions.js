export function move(character, direction) {
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
export function checkJump() {
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
export function jump() {
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
export function dodge() {
	isDodging = true;
	idleKnight.anims.stop();
	idleKnight.anims.play("dodge", true);

	//idleKnight.setVelocityX(knightVel * 2);
	idleKnight.on("animationcomplete", () => {
		isDodging = false;
		//idleKnight.setVelocityX(knightVel / 2);
	});
}
export function attack4() {
	idleKnight.anims.stop();
	idleKnight.anims.play("attack4", true);
	excalipurr.play();
	this.input.keyboard.on("keyboard-E", attack4);
	idleKnight.on("animationcomplete", () => {
		excalipurr.stop();
	});
}


