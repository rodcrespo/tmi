var Player = function(textureManager){
  this.texture = textureManager.getTexture(RUNNER);
	this.name = PLAYER;
}

Player.prototype.init = function(colliders, triggerColliders){
  this.animatedTexture = new TextureAnimator( this.texture, 5, 2, 10, 75 ); // texture, #horiz, #vert, #total, duration.
  var runnerMaterial = new THREE.MeshBasicMaterial( { map: this.texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );

  var runnerGeometry = new THREE.PlaneGeometry(PLAYER_WIDTH, PLAYER_HEIGHT, 1, 1);
  this.runner = new THREE.Mesh(runnerGeometry, runnerMaterial);
  this.runner.position.set(PLAYER_INIT_X, PLAYER_INIT_Y, PLAYER_INIT_Z);
	//initialize movement
	this.verticalVelocity = 0;
	this.horizontalVelocity = 0;
	this.keepHorizontalVelocity = false;
	this.physics = new WorldPhysics();

  this.colliders = colliders;
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
	this.runner.position = position;
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
	this.keepHorizontalVelocity = false;
}

Player.prototype.update = function(lapsedMillis) {
	//update animations
	this.animatedTexture.update(lapsedMillis);
	//return;
	//update velocities (gravity and/or friction)
	this.updateVelocities(lapsedMillis);
	this.restrictVelocities();
	//get nearest object in all directions
	//points from where rays are traced

  this.updateHitboxes();
	//distance (from the players CENTER OF MASS) to the respective direction (null if infinite)
	var distanceRight	= getNearestCollisionFrom([this.getHitboxTop(), this.getHitboxBottom()], new THREE.Vector3( 1,  0, 0), this.colliders);
	var distanceLeft	= getNearestCollisionFrom([this.getHitboxTop(), this.getHitboxBottom()], new THREE.Vector3(-1,  0, 0), this.colliders);
	var distanceTop		= getNearestCollisionFrom([this.getHitboxLeft(), this.getHitboxRight()], new THREE.Vector3( 0,  1, 0), this.colliders);
	var distanceBottom	= getNearestCollisionFrom([this.getHitboxLeft(), this.getHitboxRight()], new THREE.Vector3( 0, -1, 0), this.colliders);
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
  this.hitboxLeft	= this.runner.position.clone().add(new THREE.Vector3(-this.width()/2 + 2,  0, 0));
  this.hitboxRight = this.runner.position.clone().add(new THREE.Vector3(this.width()/2 - 2,  0, 0));
  this.hitboxBottom	= this.runner.position.clone().add(new THREE.Vector3(0, -this.height()/2 + 2, 0));
  this.hitboxTop = this.runner.position.clone().add(new THREE.Vector3(0,  this.height()/2 - 2, 0));
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
	this.keepHorizontalVelocity = true;
}

Player.prototype.setVerticalVelocity = function(velocity) {
	this.verticalVelocity = velocity;
}

Player.prototype.getVerticalVelocity = function() {
	return this.verticalVelocity;
}

Player.prototype.setHorizontalVelocity = function (velocity) {
	this.horizontalVelocity = velocity;
	this.keepHorizontalVelocity = true;
}

Player.prototype.getHorizontalVelocity = function() {
	return this.horizontalVelocity;
}

Player.prototype.updateVelocities = function(lapsedMillis) {
	this.verticalVelocity += this.physics.getGravity() * lapsedMillis / 1000;
	if (!this.keepHorizontalVelocity)
		this.horizontalVelocity *=  this.physics.getFriction();
}

Player.prototype.restrictVelocities = function() {
	if (this.verticalVelocity > this.physics.getTerminalVelocity())
		this.verticalVelocity = this.physics.getTerminalVelocity();
	if (this.verticalVelocity < -this.physics.getTerminalVelocity())
		this.verticalVelocity = -this.physics.getTerminalVelocity();
}

Player.prototype.updateHorizontalPositionAndVelocity = function(lapsedMillis, distanceLeft, distanceRight) {
	var movement = getDirectionalMovement(lapsedMillis, this.horizontalVelocity, distanceLeft, distanceRight, PLAYER_WIDTH/2);
	if (movement != 0) {
		this.runner.position.x += movement;
	} else {
		this.horizontalVelocity = 0;
	}
}

Player.prototype.updateVerticalPositionAndVelocity = function(lapsedMillis, distanceBottom, distanceTop) {
	var movement = getDirectionalMovement(lapsedMillis, this.verticalVelocity, distanceBottom, distanceTop, PLAYER_HEIGHT/2);
	if (movement != 0) {
		this.runner.position.y += movement;
	} else {
		this.verticalVelocity = 0;
	}
}
///////////////////// END INTERNAL FUNCTIONS
