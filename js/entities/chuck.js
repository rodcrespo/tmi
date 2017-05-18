//TODO there are shared functions with player. possible merge them in a superclass

var Chuck = function(game, position){
	var texture = game.textureManager.getTexture("player");
	var map = game.textureManager.getMap("player");
	var animatedTexture = new MapTextureAnimator(texture, map, "idle"); // texture, #horiz, #vert, #total, duration.
	// this.animatedDefault = animatedTexture;
	// this.animatedRun = new TextureAnimator( texture_run, 1, 10, 10, 75 );
	var runnerMaterial = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );
	var runnerGeometry = new THREE.PlaneGeometry(PLAYER_WIDTH, PLAYER_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(runnerGeometry, runnerMaterial);

	Entity.call(this, PLAYER, mesh, animatedTexture, PLAYER_WIDTH, PLAYER_HEIGHT, new THREE.Vector3(PLAYER_INIT_X, PLAYER_INIT_Y, PLAYER_INIT_Z));
	
	
	this.damageTimeout = 0;
	this.jumpTimeout = 0;
}

Chuck.prototype = Object.create(Entity.prototype);

Chuck.prototype.interactWith = function(entity) {
	if (this.damageTimeout = 0) {
		entity.damage(10);
		game.audioManager.play(AUDIO_PUNCH);
		this.damageTimeout = 1000;
	}
}


Chuck.prototype.updateStatus = function() {
	if (this.isOnAir()) {
		this.animatedTexture.setStatus("jump");
	} else if (this.isMovingRight() || this.isMovingLeft()) {
			this.animatedTexture.setStatus("run");
	} else {
			this.animatedTexture.setStatus("idle");
	}
	

}

Chuck.prototype.update = function(game, lapsedMillis) {
	this.updateStatus();
	Entity.prototype.update.call(this, game, lapsedMillis);
	
	this.damageTimeout -= lapsedMillis;
	if (this.damageTimeout < 0)
		this.damageTimeout = 0;
	
	this.jumpTimeout -= lapsedMillis;
	if (this.jumpTimeout <= 0) {
		this.setVerticalVelocity(PLAYER_JUMP_HIGH_VELOCITY * 2);
		this.jumpTimeout = 5000;
	}
}
