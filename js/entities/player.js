var Player = function(game){
	var texture = game.textureManager.getTexture("player");
	var map = game.textureManager.getMap("player");
	var animatedTexture = new MapTextureAnimator(texture, map, "idle"); // texture, #horiz, #vert, #total, duration.
	// this.animatedDefault = animatedTexture;
	// this.animatedRun = new TextureAnimator( texture_run, 1, 10, 10, 75 );
	var runnerMaterial = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: true } );
	var runnerGeometry = new THREE.PlaneGeometry(PLAYER_WIDTH, PLAYER_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);

	Entity.call(this, PLAYER, mesh, animatedTexture, PLAYER_WIDTH, PLAYER_HEIGHT, new THREE.Vector3(PLAYER_INIT_X, PLAYER_INIT_Y, PLAYER_INIT_Z));
	
	this.life = PLAYER_MAX_HEALTH/4;
	this.score = 0;
}

Player.prototype = Object.create(Entity.prototype);

//////PLAYER API
Player.prototype.startMovingLeft = function() {
	// this.texture = this.animatedRun;
	this.startOrKeepMoving(-PLAYER_DEFAULT_VELOCITY);

	this.mesh.scale.x = -1;
}

Player.prototype.startMovingRight = function() {
	// this.texture = this.animatedDefault;
	this.startOrKeepMoving(PLAYER_DEFAULT_VELOCITY);

	this.mesh.scale.x = 1;
}

Player.prototype.jump = function(velocity) {
	if (!this.isOnAir()) {
		this.setVerticalVelocity(velocity);
		game.audioManager.play(AUDIO_JUMP);
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
	/*var ball = new Ball(game, this.getPosition());
	ball.init(null);
	ball.setHorizontalVelocity
	game.addEntity(ball);
	game.audioManager.play(AUDIO_SHOOT);*/
	var pos = this.getPosition();
	if (Math.random() > 0.5)
		var entity = new Salmorejo(game, new THREE.Vector3(pos.x, pos.y + this.height, pos.z));
	else
		var entity = new FlowerPot(game, new THREE.Vector3(pos.x, pos.y + this.height, pos.z));
	
	entity.init(null);
	entity.setVerticalVelocity(1000);
	game.addEntity(entity);
}

Player.prototype.getScore = function() {
	return this.score;
}

Player.prototype.giveScore = function(score) {
	this.score += score;
}

Player.prototype.getHealth = function() {
	return this.life;
}

Player.prototype.heal = function(boost) {
	this.life += boost;
	if (this.life > PLAYER_MAX_HEALTH) {
		this.life = PLAYER_MAX_HEALTH;
	}
}

Player.prototype.damage = function(damage) {
	this.life -= damage;
	if (this.life <= PLAYER_MIN_HEALTH) {
		this.life = PLAYER_MIN_HEALTH;
		this.die();
	}
}

Player.prototype.die = function() {
	this.score = 0;
	game.audioManager.play(AUDIO_DEATH);
}
//////////////// END PLAYER API


Player.prototype.startOrKeepMoving = function(velocity) {
	//TODO check if begging reached
	this.setHorizontalVelocity(velocity);
	this.physics.setFriction(1);
}

Player.prototype.updateStatus = function() {
	if (this.isOnAir()) {
		this.animatedTexture.setStatus("jump");
	} else if (this.isMovingRight() || this.isMovingLeft()) {
			this.animatedTexture.setStatus("run");
	} else {
			this.animatedTexture.setStatus("idle");
	}

}

Player.prototype.update = function(game, lapsedMillis) {
	this.updateStatus();
	Entity.prototype.update.call(this, game, lapsedMillis);
	
	//Check collisions with other entities (do this only for the player since
	//it is too costly otherwise
	var entities = game.getEntities();
	for (var i = 0; i < entities.length; i++) {
		if (entities[i].collidesWith(this)) { //avoid self-checking
			entities[i].interactWith(this, false);
		}
	}
}
