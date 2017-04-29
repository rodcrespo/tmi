var Player = function(position) {
	//initialize player
	this.verticalVelocity = 0;
	this.horizontalVelocity = 0;
	this.keepHorizontalVelocity = false;
	this.position = position;
}

//////FLAG FUNCTIONS
Player.prototype.isOnAir = function() {
	return this.verticalVelocity != 0;
}

Player.prototype.isMovingUp = function() {
	return this.verticalVelocity > 0;
}

Player.prototype.isMovingDown = function()  {
	return this.verticalVelocity < 0;
}

Player.prototype.isMovingRight = function() {
	return this.horizontalVelocity > 0;
}

Player.prototype.isMovingLeft = function() {
	return this.horizontalVelocity < 0;
}
//////////////// END FLAG FUNCTIONS




//////PLAYER API
Player.prototype.startMovingLeft = function() {
	this.startOrKeepMoving(-3); //TODO ? extract default velocity
}

Player.prototype.startMovingRight = function() {
	this.startOrKeepMoving(3); //TODO ? extract default velocity
}

Player.prototype.jump = function(velocity) {
	if (!this.isOnAir()) {
		this.setVerticalVelocity(velocity);
	}
}

Player.prototype.jumpHigh = function(){
	this.jump(8); //TODO ? extract high jump velocity
}

Player.prototype.jumpLow = function(){
	this.jump(5); //TODO ? extract low jump velocity
}

Player.prototype.stopHorizontally = function() {
	this.keepHorizontalVelocity = false;
}

Player.prototype.update = function(lapsedMillis, colliders) {
	//update velocities (gravity and/or friction)
	this.updateVelocities(lapsedMillis);
	this.restrictVerticalVelocity();
	//get nearest object in all directions
	//points from where rays are traced
	var bboxLeft	= this.position.clone().add(new THREE.Vector3(-playerWidth/2+2,  0, 0));
	var bboxRight	= this.position.clone().add(new THREE.Vector3( playerWidth/2-2,  0, 0));
	var bboxBottom	= this.position.clone().add(new THREE.Vector3(0, -playerHeight/2+2, 0));
	var bboxTop		= this.position.clone().add(new THREE.Vector3(0,  playerHeight/2-2, 0));
	//distance (from the players CENTER OF MASS) to the respective direction (null if infinite)
	var distanceRight	= getNearestCollisionFrom([bboxTop, bboxBottom], new THREE.Vector3(-1,  0, 0), collidablePlatforms);
	var distanceLeft	= getNearestCollisionFrom([bboxTop, bboxBottom], new THREE.Vector3( 1,  0, 0), collidablePlatforms);
	var distanceTop		= getNearestCollisionFrom([bboxLeft, bboxRight], new THREE.Vector3( 0,  1, 0), collidablePlatforms);
	var distanceBottom	= getNearestCollisionFrom([bboxLeft, bboxRight], new THREE.Vector3( 0, -1, 0), collidablePlatforms);
	//update positions based on the player's velocity (while checking collisions)
	this.updateVerticalPositionAndVelocity(lapsedMillis, distanceTop, distanceBottom);
	this.updateHorizontalPositionAndVelocity(lapsedMillis, distanceLeft, distanceRight);
}
//////////////// END PLAYER API




//////INTERNAL FUNCTIONS
Player.prototype.startOrKeepMoving = function(velocity) {
	this.setHorizontalVelocity(velocity);
	this.keepHorizontalVelocity = true;
}

Player.prototype.setVerticalVelocity = function(velocity) {
	this.verticalVelocity = velocity;
}

Player.prototype.setHorizontalVelocity = function (velocity) {
	this.horizontalVelocity = velocity;
	this.keepHorizontalVelocity = true;
}

Player.prototype.updateVelocities = function(lapsedMillis) {
	this.verticalVelocity += gravity * lapsedMillis / 1000;	
	if (!this.keepHorizontalVelocity)
		this.horizontalVelocity *= 0.8; //TODO ? extract drag factor
}

Player.prototype.restrictVelocities = function() {
	if (this.verticalVelocity > 8)
		this.verticalVelocity = 8; //TODO ? extract max velocity
	if (this.verticalVelocity < -8)
		this.verticalVelocity = -8; //TODO ? extract min velocity
}

Player.prototype.updateHorizontalPositionAndVelocity(lapsedMillis, distanceLeft, distanceRight) {
	var movement = getDirectionalMovement(lapsedMillis this.horizontalVelocity, distanceLeft, distanceRight, playerWidth/2);
	if (movement != 0) {
		this.position.x += movement;
	} else {
		this.horizontalVelocity = 0;
	}
}

Player.prototype.updateVerticalPositionAndVelocity(lapsedMillis, distanceBottom, distanceTop) {
	var movement = getDirectionalMovement(lapsedMillis this.horizontalVelocity, distanceBottom, distanceTop, playerWidth/2);
	if (movement != 0) {
		this.position.y += movement;
	} else {
		this.verticalVelocity = 0;
	}
}
///////////////////// END INTERNAL FUNCTIONS