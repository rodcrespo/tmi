var Entity = function(name, mesh, texture, width, height, position){
	this.name = name;
	this.texture = texture;
	this.mesh = mesh;
	this.width = width;
	this.height = height;
	this.mesh.position.set(position.x, position.y, position.z);
	
	this.physics = new WorldPhysics(); //keep this here to allow modification by child class
		
	//initialize movement
	this.verticalVelocity = 0;
	this.horizontalVelocity = 0;
}

Entity.prototype.init = function(triggerColliders){
	this.triggers = [];
	if (triggerColliders != null) {
		for (var i = 0; i < triggerColliders.length; i++) {
			this.triggers.push(new CollisionDetector(this, triggerColliders[i]));
		}
	}
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
	//distance (from the Entitys CENTER OF MASS) to the respective direction (null if infinite)
	var distanceRight	= getNearestCollisionFrom([this.getHitboxTop(), this.getHitboxBottom()], new THREE.Vector3( 1,  0, 0), game.collidables);
	var distanceLeft	= getNearestCollisionFrom([this.getHitboxTop(), this.getHitboxBottom()], new THREE.Vector3(-1,  0, 0), game.collidables);
	var distanceTop		= getNearestCollisionFrom([this.getHitboxLeft(), this.getHitboxRight()], new THREE.Vector3( 0,  1, 0), game.collidables);
	var distanceBottom	= getNearestCollisionFrom([this.getHitboxLeft(), this.getHitboxRight()], new THREE.Vector3( 0, -1, 0), game.collidables);
	//Check triggers 
	for (var trigger of this.triggers) {
		trigger.detectCollision(lapsedMillis);
	}
	//update positions based on the Entity's velocity (while checking collisions)
	this.updateVerticalPositionAndVelocity(lapsedMillis, distanceBottom, distanceTop);
	this.updateHorizontalPositionAndVelocity(lapsedMillis, distanceLeft, distanceRight);
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
	if (movement != 0) {
		this.mesh.position.x += movement;
	} else {
		this.horizontalVelocity = -this.physics.getElasticity()*this.horizontalVelocity;
	}
}

Entity.prototype.updateVerticalPositionAndVelocity = function(lapsedMillis, distanceBottom, distanceTop) {
	var movement = getDirectionalMovement(lapsedMillis, this.verticalVelocity, distanceBottom, distanceTop, this.height/2);
	if (movement != 0) {
		this.mesh.position.y += movement;
	} else {
		this.verticalVelocity = -this.physics.getElasticity()*this.verticalVelocity;
	}
}
///////////////////// END INTERNAL FUNCTIONS
