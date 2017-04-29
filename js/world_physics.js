var WorldPhysics = function(){
    this.gravity = -9.8;
	this.friction = 0.5;
	this.terminalVelocity = 8;
}

WorldPhysics.prototype.getGravity = function() {
	return this.gravity;
}

WorldPhysics.prototype.getFriction  = function() {
	return this.friction;
}

WorldPhysics.prototype.getTerminalVelocity = function() {
	return this.terminalVelocity;
}

WorldPhysics.prototype.invertGravity = function() {
	this.gravity = -this.gravity;
}