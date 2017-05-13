var Player = function(){
	this.name = PLAYER;
}

Player.prototype.init = function(triggerColliders, mesh, texture){

  this.texture = texture;
  this.mesh = mesh;
  
  this.mesh.position.set(PLAYER_INIT_X, PLAYER_INIT_Y, PLAYER_INIT_Z);
	//initialize movement
	this.verticalVelocity = 0;
	this.horizontalVelocity = 0;
	this.physics = new WorldPhysics();

  this.triggers = [];
	for (var i = 0; i < triggerColliders.length; i++) {
    this.triggers.push(new CollisionDetector(this, triggerColliders[i]));
  }
  this.updateHitboxes();
}

Player.prototype.height = function() {
  return PLAYER_HEIGHT;
}

Player.prototype.width = function() {
  return PLAYER_WIDTH;
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
Player.prototype.setPosition = function(position) {
	this.mesh.position = position;
}

Player.prototype.startMovingLeft = function() {
	this.startOrKeepMoving(-PLAYER_DEFAULT_VELOCITY);
}

Player.prototype.startMovingRight = function() {
	this.startOrKeepMoving(PLAYER_DEFAULT_VELOCITY);
}

Player.prototype.jump = function(velocity) {
	if (!this.isOnAir()) {
		this.setVerticalVelocity(velocity);
	}
}

Player.prototype.jumpHigh = function(){
	this.jump(PLAYER_JUMP_HIGH_VELOCITY);
}

Player.prototype.jumpLow = function(){
	this.jump(PLAYER_JUMP_LOW_VELOCITY);
}

Player.prototype.stopHorizontally = function() {
	this.physics.setFriction(0);
}

Player.prototype.update = function(game, lapsedMillis) {
	//update animations
	if (typeof this.texture.update === 'function') {
		this.texture.update(lapsedMillis);
	}
	//return;
	//update velocities (gravity and/or friction)
	this.updateVelocities(lapsedMillis);
	this.restrictVelocities();
	//get nearest object in all directions
	//points from where rays are traced

	this.updateHitboxes();
	//distance (from the players CENTER OF MASS) to the respective direction (null if infinite)
	var distanceRight	= getNearestCollisionFrom([this.getHitboxTop(), this.getHitboxBottom()], new THREE.Vector3( 1,  0, 0), game.collidables);
	var distanceLeft	= getNearestCollisionFrom([this.getHitboxTop(), this.getHitboxBottom()], new THREE.Vector3(-1,  0, 0), game.collidables);
	var distanceTop		= getNearestCollisionFrom([this.getHitboxLeft(), this.getHitboxRight()], new THREE.Vector3( 0,  1, 0), game.collidables);
	var distanceBottom	= getNearestCollisionFrom([this.getHitboxLeft(), this.getHitboxRight()], new THREE.Vector3( 0, -1, 0), game.collidables);
	//Check triggers
	for (var trigger of this.triggers) {
		trigger.detectCollision(lapsedMillis);
	}
	//update positions based on the player's velocity (while checking collisions)
	this.updateVerticalPositionAndVelocity(lapsedMillis, distanceBottom, distanceTop);
	this.updateHorizontalPositionAndVelocity(lapsedMillis, distanceLeft, distanceRight);
}
//////////////// END PLAYER API


Player.prototype.updateHitboxes = function() {
  this.hitboxLeft	= this.mesh.position.clone().add(new THREE.Vector3(-this.width()/2 + 2,  0, 0));
  this.hitboxRight = this.mesh.position.clone().add(new THREE.Vector3(this.width()/2 - 2,  0, 0));
  this.hitboxBottom	= this.mesh.position.clone().add(new THREE.Vector3(0, -this.height()/2 + 2, 0));
  this.hitboxTop = this.mesh.position.clone().add(new THREE.Vector3(0,  this.height()/2 - 2, 0));
}

Player.prototype.getHitboxTop = function() {
  return this.hitboxTop;
}

Player.prototype.getHitboxRight = function() {
  return this.hitboxRight;
}

Player.prototype.getHitboxBottom = function() {
  return this.hitboxBottom;
}
Player.prototype.getHitboxLeft = function() {
  return this.hitboxLeft;
}

//////INTERNAL FUNCTIONS
Player.prototype.startOrKeepMoving = function(velocity) {
	//TODO check if begging reached
	this.setHorizontalVelocity(velocity);
	this.physics.setFriction(1);
}

Player.prototype.setVerticalVelocity = function(velocity) {
	this.verticalVelocity = velocity;
}

Player.prototype.getVerticalVelocity = function() {
	return this.verticalVelocity;
}

Player.prototype.setHorizontalVelocity = function (velocity) {
	this.horizontalVelocity = velocity;
}

Player.prototype.getHorizontalVelocity = function() {
	return this.horizontalVelocity;
}

Player.prototype.updateVelocities = function(lapsedMillis) {
	this.verticalVelocity += this.physics.getGravity() * lapsedMillis / 1000;
	this.horizontalVelocity *=  this.physics.getFriction();
}

Player.prototype.restrictVelocities = function() {
	if (this.verticalVelocity > this.physics.getTerminalVelocity())
		this.verticalVelocity = this.physics.getTerminalVelocity();
	if (this.verticalVelocity < -this.physics.getTerminalVelocity())
		this.verticalVelocity = -this.physics.getTerminalVelocity();
	if (this.horizontalVelocity > this.physics.getTerminalVelocity())
		this.horizontalVelocity = this.physics.getTerminalVelocity();
	if (this.horizontalVelocity < -this.physics.getTerminalVelocity())
		this.horizontalVelocity = -this.physics.getTerminalVelocity();
}

Player.prototype.updateHorizontalPositionAndVelocity = function(lapsedMillis, distanceLeft, distanceRight) {
	var movement = getDirectionalMovement(lapsedMillis, this.horizontalVelocity, distanceLeft, distanceRight, PLAYER_WIDTH/2);
	if (movement != 0) {
		this.mesh.position.x += movement;
	} else {
		this.horizontalVelocity = -this.physics.getElasticity()*this.horizontalVelocity;
	}
}

Player.prototype.updateVerticalPositionAndVelocity = function(lapsedMillis, distanceBottom, distanceTop) {
	var movement = getDirectionalMovement(lapsedMillis, this.verticalVelocity, distanceBottom, distanceTop, PLAYER_HEIGHT/2);
	if (movement != 0) {
		this.mesh.position.y += movement;
	} else {
		this.verticalVelocity = -this.physics.getElasticity()*this.verticalVelocity;
	}
}
///////////////////// END INTERNAL FUNCTIONS
