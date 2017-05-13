var WorldPhysics = function(){
	this.gravity = -980;
	this.friction = 0.5;
	this.terminalVelocity = 800;
	this.elasticity = 0;
}

WorldPhysics.prototype.getGravity = function() {
	return this.gravity;
}

WorldPhysics.prototype.getFriction  = function() {
	return this.friction;
}

WorldPhysics.prototype.setFriction = function(friction) {
	this.friction = friction;
}

WorldPhysics.prototype.getElasticity  = function() {
	return this.elasticity;
}

WorldPhysics.prototype.setElasticity = function(elasticity) {
	this.elasticity = elasticity;
}

WorldPhysics.prototype.getTerminalVelocity = function() {
	return this.terminalVelocity;
}

WorldPhysics.prototype.invertGravity = function() {
	this.gravity = -this.gravity;
}
