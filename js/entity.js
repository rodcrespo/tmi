var Entity = function(name, mesh, animatedTexture, width, height, position){
	this.name = name;
	this.animatedTexture = animatedTexture;
	this.mesh = mesh;
	this.width = width;
	this.height = height;
	this.mesh.position.set(position.x, position.y, position.z);

	this.physics = new WorldPhysics(); //keep this here to allow modification by child class
	this.triggers = [];
	//initialize movement
	this.verticalVelocity = 0;
	this.horizontalVelocity = 0;

	//helper variables to avoid triggering hit() multiple times on the same object
	this.lastTickHorizontalMovement = 0;
	this.lastTickVerticalMovement = 0;
}

Entity.prototype.addTrigger = function(trigger) {
	this.triggers.push(new CollisionDetector(this, trigger));
}

Entity.prototype.init = function(){
	this.updateHitboxes();
}


//////FLAG FUNCTIONS
Entity.prototype.isOnAir = function() {
	return this.verticalVelocity != 0;
}

Entity.prototype.isMovingUp = function() {
	return this.verticalVelocity > 0;
}

Entity.prototype.isMovingDown = function()  {
	return this.verticalVelocity < 0;
}

Entity.prototype.isMovingRight = function() {
	return this.horizontalVelocity > 0;
}

Entity.prototype.isMovingLeft = function() {
	return this.horizontalVelocity < 0;
}
//////////////// END FLAG FUNCTIONS




//////Entity API
Entity.prototype.setPosition = function(position) {
	this.mesh.position = position;
}

Entity.prototype.getPosition = function() {
	return this.mesh.position.clone();
}


Entity.prototype.update = function(game, lapsedMillis) {
	//update animations
	if (typeof this.animatedTexture.update === 'function') {
		this.animatedTexture.update(lapsedMillis);
	}
	//return;
	//update velocities (gravity and/or friction)
	this.updateVelocities(lapsedMillis);
	this.restrictVelocities();
	//get nearest object in all directions
	//points from where rays are traced

	this.updateHitboxes();
	//distance (from the Entitys CENTER OF MASS) to the respective direction (null if infinite)
	this.distanceRight	= getNearestCollisionFrom([this.getHitboxTop(), this.getHitboxBottom()], new THREE.Vector3( 1,  0, 0), game.collidables);
	this.distanceLeft	= getNearestCollisionFrom([this.getHitboxTop(), this.getHitboxBottom()], new THREE.Vector3(-1,  0, 0), game.collidables);
	this.distanceTop		= getNearestCollisionFrom([this.getHitboxLeft(), this.getHitboxRight()], new THREE.Vector3( 0,  1, 0), game.collidables);
	this.distanceBottom	= getNearestCollisionFrom([this.getHitboxLeft(), this.getHitboxRight()], new THREE.Vector3( 0, -1, 0), game.collidables);
	//Check triggers
	for (var trigger of this.triggers) {
		trigger.detectCollision(lapsedMillis);
	}
	//update positions based on the Entity's velocity (while checking collisions)
	this.updateVerticalPositionAndVelocity(lapsedMillis, this.distanceBottom, this.distanceTop);
	this.updateHorizontalPositionAndVelocity(lapsedMillis, this.distanceLeft, this.distanceRight);
}
//////////////// END Entity API


Entity.prototype.updateHitboxes = function() {
  this.hitboxLeft	= this.mesh.position.clone().add(new THREE.Vector3(-this.width/2 + 2,  0, 0));
  this.hitboxRight = this.mesh.position.clone().add(new THREE.Vector3(this.width/2 - 2,  0, 0));
  this.hitboxBottom	= this.mesh.position.clone().add(new THREE.Vector3(0, -this.height/2 + 2, 0));
  this.hitboxTop = this.mesh.position.clone().add(new THREE.Vector3(0,  this.height/2 - 2, 0));
}

Entity.prototype.getHitboxTop = function() {
  return this.hitboxTop;
}

Entity.prototype.getHitboxRight = function() {
  return this.hitboxRight;
}

Entity.prototype.getHitboxBottom = function() {
  return this.hitboxBottom;
}
Entity.prototype.getHitboxLeft = function() {
  return this.hitboxLeft;
}

//////INTERNAL FUNCTIONS
Entity.prototype.setVerticalVelocity = function(velocity) {
	this.verticalVelocity = velocity;
}

Entity.prototype.getVerticalVelocity = function() {
	return this.verticalVelocity;
}

Entity.prototype.setHorizontalVelocity = function (velocity) {
	this.horizontalVelocity = velocity;
}

Entity.prototype.getHorizontalVelocity = function() {
	return this.horizontalVelocity;
}

Entity.prototype.updateVelocities = function(lapsedMillis) {
	// console.log(this.distanceBottom);
	this.verticalVelocity += this.physics.getGravity() * lapsedMillis / 1000;
	this.horizontalVelocity *=  this.physics.getFriction();
}

Entity.prototype.restrictVelocities = function() {
	if (this.verticalVelocity > this.physics.getTerminalVelocity())
		this.verticalVelocity = this.physics.getTerminalVelocity();
	if (this.verticalVelocity < -this.physics.getTerminalVelocity())
		this.verticalVelocity = -this.physics.getTerminalVelocity();
	if (this.horizontalVelocity > this.physics.getTerminalVelocity())
		this.horizontalVelocity = this.physics.getTerminalVelocity();
	if (this.horizontalVelocity < -this.physics.getTerminalVelocity())
		this.horizontalVelocity = -this.physics.getTerminalVelocity();
}

Entity.prototype.updateHorizontalPositionAndVelocity = function(lapsedMillis, distanceLeft, distanceRight) {
	var movement = getDirectionalMovement(lapsedMillis, this.horizontalVelocity, distanceLeft, distanceRight, this.width/2);
	if (movement.movement != 0) {
		this.mesh.position.x += movement.movement;
	}
	if (Math.abs(movement.movement) > 0.2) {
		this.movedHorizontallyLastCycle = true;
	} else {
		this.movedHorizontallyLastCycle = false;
	}
	if (movement.hit) {//this means we are touching an object, not necessarily hit this round
		if (Math.abs(movement.movement) > 0.2) //if we moved, then we hit it this round. > 1 for avoiding false triggers
			this.hit();
		this.horizontalVelocity = -this.physics.getElasticity()*this.horizontalVelocity;
	}
}

Entity.prototype.updateVerticalPositionAndVelocity = function(lapsedMillis, distanceBottom, distanceTop) {
	var movement = getDirectionalMovement(lapsedMillis, this.verticalVelocity, distanceBottom, distanceTop, this.height/2);
	if (movement.movement != 0) {
		this.mesh.position.y += movement.movement;
	}
	if (Math.abs(movement.movement) > 0.2) {
		this.movedVerticallyLastCycle = true;
	} else {
		this.movedVerticallyLastCycle = false;
	}
	if (movement.hit) { //this means we are touching an object, not necessarily hit this round
		if (Math.abs(movement.movement) > 0.2) //if we moved, then we hit it this round. > 1 for avoiding false triggers
			this.hit();
		this.verticalVelocity = -this.physics.getElasticity()*this.verticalVelocity;
	}
	// console.log(movement);

}

Entity.prototype.hit = function() {
	//called when this object is hit by another
}
///////////////////// END INTERNAL FUNCTIONS
