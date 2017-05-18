//TODO there are shared functions with player. possible merge them in a superclass

var Chuck = function(game, position){
	this.texture = game.textureManager.getTexture(CHUCK);
	var material = new THREE.MeshBasicMaterial( { map: this.texture, side: THREE.DoubleSide, transparent: true, depthTest: false } );
	var geometry = new THREE.PlaneGeometry(CHUCK_WIDTH, CHUCK_HEIGHT, 1, 1);
	var mesh = new THREE.Mesh(geometry, material);
	
	Entity.call(this, CHUCK, mesh, this.texture, CHUCK_WIDTH, CHUCK_HEIGHT, position);
	
	this.damageTimeout = 0;
	this.jumpTimeout = 0;
	console.log("chuck created");
}

Chuck.prototype = Object.create(Entity.prototype);

Chuck.prototype.interactWith = function(entity) {
	if (this.damageTimeout == 0) {
		entity.damage(10);
		game.audioManager.play(AUDIO_PUNCH);
		this.damageTimeout = 1000;
	}
}


Chuck.prototype.updateStatus = function() {
	/*if (this.isOnAir()) {
		this.animatedTexture.setStatus("jump");
	} else if (this.isMovingRight() || this.isMovingLeft()) {
			this.animatedTexture.setStatus("run");
	} else {
			this.animatedTexture.setStatus("idle");
	}*/
	

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
