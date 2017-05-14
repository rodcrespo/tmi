var Player = function(game){
	var texture = game.textureManager.getTexture(RUNNER);
	var animatedTexture = new TextureAnimator( texture, 5, 2, 10, 75 ); // texture, #horiz, #vert, #total, duration.
	var runnerMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );
	var runnerGeometry = new THREE.PlaneGeometry(PLAYER_WIDTH, PLAYER_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);
	
	Entity.call(this, PLAYER, mesh, animatedTexture, PLAYER_WIDTH, PLAYER_HEIGHT, new THREE.Vector3(PLAYER_INIT_X, PLAYER_INIT_Y, PLAYER_INIT_Z));
}

Player.prototype = Object.create(Entity.prototype);

//////PLAYER API
Player.prototype.startMovingLeft = function() {
	this.startOrKeepMoving(-PLAYER_DEFAULT_VELOCITY);
}

Player.prototype.startMovingRight = function() {
	this.startOrKeepMoving(PLAYER_DEFAULT_VELOCITY);
}

Player.prototype.jump = function(velocity) {
	if (!this.isOnAir()) {
		this.setVerticalVelocity(velocity);
		game.audioManager.play(JUMP);
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

Player.prototype.shoot = function() {
	var ball = new Ball(game);
	ball.init(null);
	ball.setHorizontalVelocity
	game.addEntity(ball);
	game.audioManager.play(SHOOT);
}
//////////////// END PLAYER API


Player.prototype.startOrKeepMoving = function(velocity) {
	//TODO check if begging reached
	this.setHorizontalVelocity(velocity);
	this.physics.setFriction(1);
}

